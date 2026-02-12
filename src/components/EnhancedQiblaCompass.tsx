import { useState, useEffect, useCallback } from "react";
import { Navigation, MapPin, Compass, AlertCircle, RefreshCw, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { calculateQiblaDirection, calculateDistanceToKaaba, getDirectionName } from "@/utils/qiblaCalculation";
import { QiblaSettings, defaultQiblaSettings } from "@/types/qiblaTypes";
import QiblaSettingsComponent from "./QiblaSettings";
import { useCapacitorGeolocation } from "@/hooks/useCapacitorGeolocation";
import { useCapacitorMotion } from "@/hooks/useCapacitorMotion";
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';

const EnhancedQiblaCompass = () => {
  const geo = useCapacitorGeolocation();
  const motion = useCapacitorMotion();
  
  const [smoothedHeading, setSmoothedHeading] = useState<number | null>(null);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [isPointingToQibla, setIsPointingToQibla] = useState(false);
  const [lastVibration, setLastVibration] = useState(0);
  const [settings, setSettings] = useState<QiblaSettings>(defaultQiblaSettings);

  const smoothHeading = useCallback((newHeading: number, previousHeading: number | null, factor: number): number => {
    if (previousHeading === null) return newHeading;
    let diff = newHeading - previousHeading;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    return (((previousHeading + diff * factor) % 360) + 360) % 360;
  }, []);

  useEffect(() => {
    if (motion.alpha !== null) {
      let heading = motion.alpha + settings.magneticDeclination + settings.calibrationOffset;
      heading = ((heading % 360) + 360) % 360;
      setSmoothedHeading(prev => settings.compassSmoothing ? smoothHeading(heading, prev, 1 - settings.smoothingFactor) : heading);
    }
  }, [motion.alpha, settings.magneticDeclination, settings.calibrationOffset, settings.compassSmoothing, settings.smoothingFactor, smoothHeading]);

  const location = settings.manualLocation && settings.latitude && settings.longitude
    ? { latitude: settings.latitude, longitude: settings.longitude, accuracy: 0 }
    : geo.latitude && geo.longitude
      ? { latitude: geo.latitude, longitude: geo.longitude, accuracy: geo.accuracy || 0 }
      : null;

  const loading = !settings.manualLocation && geo.loading;
  const error = motion.error || (!settings.manualLocation ? geo.error : null);
  const qiblaDirection = location ? calculateQiblaDirection(location.latitude, location.longitude) : null;
  const distanceToKaaba = location ? calculateDistanceToKaaba(location.latitude, location.longitude) : null;
  
  const getQiblaArrowRotation = () => {
    if (qiblaDirection === null || smoothedHeading === null) return 0;
    let relativeAngle = qiblaDirection - smoothedHeading;
    if (relativeAngle > 180) relativeAngle -= 360;
    if (relativeAngle < -180) relativeAngle += 360;
    return relativeAngle;
  };

  const qiblaArrowRotation = getQiblaArrowRotation();

  useEffect(() => {
    const isPointing = Math.abs(qiblaArrowRotation) <= 5;
    setIsPointingToQibla(isPointing);
    if (isPointing && settings.vibrationFeedback) {
      const now = Date.now();
      if (now - lastVibration > 2000) {
        if (Capacitor.isNativePlatform()) {
          Haptics.impact({ style: ImpactStyle.Medium }).catch(() => {});
        } else if (navigator.vibrate) {
          navigator.vibrate(200);
        }
        setLastVibration(now);
      }
    }
  }, [qiblaArrowRotation, settings.vibrationFeedback, lastVibration]);

  const handleCalibrate = async () => {
    setIsCalibrating(true);
    if (!motion.permissionGranted) await motion.requestPermission();
    setSmoothedHeading(motion.alpha);
    setTimeout(() => setIsCalibrating(false), 2000);
  };

  const formatDistance = (km: number) => {
    if (settings.units === 'imperial') return `${(km * 0.621371).toLocaleString()} mi`;
    return `${km.toLocaleString()} km`;
  };

  return (
    <Card className="card-elevated overflow-hidden">
      <CardContent className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Navigation className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground">Qibla Compass</h3>
              {isPointingToQibla && (
                <Badge className="bg-emerald/10 text-emerald border-emerald/20 text-[10px] mt-0.5">Qibla Found ✓</Badge>
              )}
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-xl w-9 h-9"><Settings className="w-4 h-4" /></Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl">
              <DialogHeader><DialogTitle className="font-display">Compass Settings</DialogTitle></DialogHeader>
              <QiblaSettingsComponent currentSettings={settings} onSettingsChange={setSettings} />
            </DialogContent>
          </Dialog>
        </div>
        
        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/40 rounded-xl p-3">
            <RefreshCw className="w-4 h-4 animate-spin" /><span>Getting location...</span>
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/5 rounded-xl p-3">
            <AlertCircle className="w-4 h-4" /><span>{error}</span>
          </div>
        )}

        {/* Compass */}
        <div className="flex justify-center">
          <div className="relative w-48 h-48">
            <div className={`w-full h-full rounded-full border-2 flex items-center justify-center relative shadow-lg transition-colors duration-500 ${
              isPointingToQibla ? 'border-emerald/40 bg-emerald/5' : 'border-primary/15 bg-primary/3'
            }`}>
              <div className="absolute top-3 text-[10px] font-bold text-primary tracking-wider">N</div>
              <div className="absolute right-3 text-[10px] font-medium text-muted-foreground">E</div>
              <div className="absolute bottom-3 text-[10px] font-medium text-muted-foreground">S</div>
              <div className="absolute left-3 text-[10px] font-medium text-muted-foreground">W</div>
              
              {Array.from({ length: 36 }, (_, i) => i * 10).map((deg) => (
                <div key={deg}
                  className={`absolute w-px ${deg % 30 === 0 ? 'h-3 bg-muted-foreground/40' : 'h-1.5 bg-muted-foreground/15'}`}
                  style={{ top: '14px', left: '50%', transformOrigin: '50% 82px', transform: `translateX(-50%) rotate(${deg}deg)` }}
                />
              ))}
              
              {qiblaDirection !== null && (
                <div className={`absolute w-1 h-20 origin-bottom transition-all duration-300 ease-out rounded-full ${
                  isPointingToQibla ? 'bg-gradient-to-t from-emerald to-emerald/70' : 'bg-gradient-to-t from-primary to-accent'
                }`}
                  style={{ transform: `rotate(${qiblaArrowRotation}deg) translateY(-50%)`, transformOrigin: 'center bottom' }}>
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[7px] border-l-transparent border-r-transparent ${
                    isPointingToQibla ? 'border-b-emerald' : 'border-b-primary'
                  }`} />
                </div>
              )}
              
              <div className="w-3 h-3 rounded-full bg-primary shadow-md border-2 border-background" />
              {isPointingToQibla && <div className="absolute inset-0 rounded-full border-2 border-emerald/30 animate-pulse" />}
            </div>
          </div>
        </div>

        {qiblaDirection !== null && (
          <div className="text-center space-y-1">
            <p className="text-3xl font-bold text-primary font-mono">{qiblaDirection}°</p>
            <p className="text-xs text-muted-foreground">{getDirectionName(qiblaDirection)}</p>
          </div>
        )}

        {distanceToKaaba && (
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground bg-muted/30 rounded-xl p-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>{formatDistance(distanceToKaaba)} to Kaaba</span>
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={handleCalibrate} variant="outline" size="sm" disabled={isCalibrating} className="flex-1 rounded-xl">
            {isCalibrating ? <RefreshCw className="w-3.5 h-3.5 animate-spin mr-2" /> : <Compass className="w-3.5 h-3.5 mr-2" />}
            {isCalibrating ? 'Calibrating...' : 'Calibrate'}
          </Button>
          <Button onClick={geo.refresh} variant="outline" size="sm" className="flex-1 rounded-xl">
            <RefreshCw className="w-3.5 h-3.5 mr-2" />Refresh
          </Button>
        </div>

        <div className="text-center pt-2 border-t border-border/30">
          <div className="font-arabic text-base text-primary/70">الكعبة المشرفة</div>
          <p className="text-[10px] text-muted-foreground mt-0.5">Al-Kaaba Al-Musharrafa</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedQiblaCompass;
