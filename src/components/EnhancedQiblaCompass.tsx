import { useState, useEffect, useRef, useCallback } from "react";
import { Navigation, MapPin, Compass, AlertCircle, RefreshCw, Settings, Volume2, Vibrate } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  // Smooth heading calculation
  const smoothHeading = useCallback((newHeading: number, previousHeading: number | null, factor: number): number => {
    if (previousHeading === null) return newHeading;
    let diff = newHeading - previousHeading;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    const smoothed = previousHeading + diff * factor;
    return ((smoothed % 360) + 360) % 360;
  }, []);

  // Process motion data into heading
  useEffect(() => {
    if (motion.alpha !== null) {
      let heading = motion.alpha + settings.magneticDeclination + settings.calibrationOffset;
      heading = ((heading % 360) + 360) % 360;
      
      if (settings.compassSmoothing) {
        setSmoothedHeading(prev => smoothHeading(heading, prev, 1 - settings.smoothingFactor));
      } else {
        setSmoothedHeading(heading);
      }
    }
  }, [motion.alpha, settings.magneticDeclination, settings.calibrationOffset, settings.compassSmoothing, settings.smoothingFactor, smoothHeading]);

  // Use manual location or Capacitor geolocation
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

  // Check if pointing to Qibla (within 5 degrees)
  useEffect(() => {
    const isPointing = Math.abs(qiblaArrowRotation) <= 5;
    setIsPointingToQibla(isPointing);

    // Vibration feedback - use Capacitor Haptics on native, web vibrate as fallback
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

    // Voice announcements
    if (isPointing && settings.voiceAnnouncements && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("Qibla direction found");
      utterance.volume = 0.5;
      speechSynthesis.speak(utterance);
    }
  }, [qiblaArrowRotation, settings.vibrationFeedback, settings.voiceAnnouncements, lastVibration]);

  const handleCalibrate = async () => {
    setIsCalibrating(true);
    
    // Request permission via Capacitor motion hook
    if (!motion.permissionGranted) {
      await motion.requestPermission();
    }
    
    // Reset smoothed heading
    setSmoothedHeading(motion.alpha);
    
    setTimeout(() => {
      setIsCalibrating(false);
    }, 2000);
  };

  const renderCompass = () => {
    return (
      <div className="relative w-48 h-48">
        {/* Compass Circle */}
        <div className="w-full h-full rounded-full border-2 border-primary/20 bg-gradient-to-br from-primary/[0.08] to-accent/[0.12] flex items-center justify-center relative shadow-luxury-lg"
             style={{ boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.06), 0 8px 30px -8px hsl(var(--primary)/0.15)' }}>
          
          {/* Accuracy indicator */}
          {location && location.accuracy <= 10 && (
            <div className="absolute -top-2 -right-2">
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                High Precision
              </Badge>
            </div>
          )}

          {/* Cardinal directions */}
          <div className="absolute top-3 text-sm font-bold text-primary">N</div>
          <div className="absolute right-3 text-sm font-bold text-muted-foreground">E</div>
          <div className="absolute bottom-3 text-sm font-bold text-muted-foreground">S</div>
          <div className="absolute left-3 text-sm font-bold text-muted-foreground">W</div>
          
          {/* Degree markings */}
          {Array.from({ length: 36 }, (_, i) => i * 10).map((deg) => (
            <div
              key={deg}
              className={`absolute w-0.5 ${deg % 30 === 0 ? 'h-4 bg-muted-foreground' : 'h-2 bg-muted-foreground/30'}`}
              style={{
                top: '12px',
                left: '50%',
                transformOrigin: '50% 84px',
                transform: `translateX(-50%) rotate(${deg}deg)`,
              }}
            />
          ))}
          
          {/* Qibla direction arrow */}
          {qiblaDirection !== null && (
            <div 
              className={`absolute w-1.5 h-20 origin-bottom transition-all duration-300 ease-out ${
                isPointingToQibla 
                  ? 'bg-gradient-to-t from-green-500 to-green-400 shadow-lg shadow-green-500/50' 
                  : 'bg-gradient-to-t from-primary to-accent'
              }`}
              style={{ 
                transform: `rotate(${qiblaArrowRotation}deg) translateY(-50%)`,
                transformOrigin: 'center bottom',
                borderRadius: '2px'
              }}
            >
              {/* Arrow head */}
              <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent ${
                isPointingToQibla ? 'border-b-green-500' : 'border-b-primary'
              }`}></div>
            </div>
          )}
          
          {/* Center dot */}
          <div className="w-4 h-4 rounded-full bg-primary shadow-md border-2 border-background"></div>
          
          {/* Device orientation indicator */}
          {smoothedHeading !== null && (
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-accent shadow-sm"></div>
          )}

          {/* Qibla found indicator */}
          {isPointingToQibla && (
            <div className="absolute inset-0 rounded-full border-4 border-green-500 animate-pulse"></div>
          )}
        </div>
      </div>
    );
  };

  const formatDistance = (km: number) => {
    if (settings.units === 'imperial') {
      const miles = km * 0.621371;
      return `${miles.toLocaleString()} miles`;
    }
    return `${km.toLocaleString()} km`;
  };

  return (
    <Card className={`border-accent/20 shadow-luxury-lg overflow-hidden relative transition-all duration-500 ${
      isPointingToQibla ? 'shadow-[0_0_30px_rgba(34,197,94,0.15)]' : ''
    }`}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-accent/[0.02] pointer-events-none" />

      <CardHeader className="pb-3 relative">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-primary">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <Navigation className="w-4 h-4" />
            </div>
            Qibla Compass
            {isPointingToQibla && (
              <Badge className="bg-green-100 text-green-800 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.3)]">
                Qibla Found!
              </Badge>
            )}
          </CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Qibla Compass Settings</DialogTitle>
              </DialogHeader>
              <QiblaSettingsComponent
                currentSettings={settings}
                onSettingsChange={setSettings}
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Status Messages */}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Getting precise location...</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-lg p-3">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        {/* Compass Display */}
        <div className="flex justify-center">
          {renderCompass()}
        </div>

        {/* Qibla Information */}
        {qiblaDirection !== null && (
          <div className="text-center space-y-2 p-3 bg-gradient-to-br from-primary/[0.04] to-accent/[0.04] rounded-xl border border-primary/10">
            <div className="font-semibold text-primary text-sm tracking-wide">Qibla Direction</div>
            <div className="text-3xl font-bold text-accent" style={{ textShadow: '0 0 15px hsl(var(--accent)/0.2)' }}>{qiblaDirection}°</div>
            <div className="text-sm text-muted-foreground">{getDirectionName(qiblaDirection)}</div>
            
            {smoothedHeading !== null && (
              <div className="text-xs text-muted-foreground space-y-1">
                <div>Device Heading: {Math.round(smoothedHeading)}°</div>
                <div>Relative Angle: {Math.round(qiblaArrowRotation)}°</div>
                {Math.abs(qiblaArrowRotation) <= 5 && (
                  <div className="text-green-600 font-semibold">✓ Pointing to Qibla!</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Distance to Kaaba */}
        {distanceToKaaba && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
            <MapPin className="w-4 h-4" />
            <span>Distance to Kaaba: {formatDistance(distanceToKaaba)}</span>
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={handleCalibrate} 
            variant="outline" 
            size="sm" 
            disabled={isCalibrating}
            className="flex-1"
          >
            {isCalibrating ? (
              <RefreshCw className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Compass className="w-4 h-4 mr-2" />
            )}
            {isCalibrating ? 'Calibrating...' : 'Calibrate'}
          </Button>
          
          <Button 
            onClick={geo.refresh} 
            variant="outline" 
            size="sm"
            className="flex-1"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Enhanced Features Indicators */}
        <div className="flex justify-center gap-2">
          {settings.vibrationFeedback && (
            <Badge variant="outline" className="text-xs">
              <Vibrate className="w-3 h-3 mr-1" />
              Vibration
            </Badge>
          )}
          {settings.voiceAnnouncements && (
            <Badge variant="outline" className="text-xs">
              <Volume2 className="w-3 h-3 mr-1" />
              Voice
            </Badge>
          )}
          {settings.autoUpdate && (
            <Badge variant="outline" className="text-xs">
              <RefreshCw className="w-3 h-3 mr-1" />
              Auto-Update
            </Badge>
          )}
        </div>

        {/* Debug Information */}
        {settings.showDebugInfo && location && (
          <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-3 space-y-1">
            <div>Coordinates: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}</div>
            <div>Accuracy: ±{Math.round(location.accuracy)}m</div>
            <div>Platform: {Capacitor.isNativePlatform() ? 'Native' : 'Web'}</div>
            {motion.alpha !== null && (
              <div>Raw Heading: {Math.round(motion.alpha)}°</div>
            )}
            {smoothedHeading !== null && (
              <div>Smoothed Heading: {Math.round(smoothedHeading)}°</div>
            )}
            <div>Magnetic Declination: {settings.magneticDeclination}°</div>
            <div>Calibration Offset: {settings.calibrationOffset}°</div>
          </div>
        )}

        {/* Sacred Text */}
        <div className="text-center p-3 bg-accent/[0.06] rounded-xl border border-accent/10">
          <div className="font-arabic text-lg text-primary mb-1 text-shadow-sm">الكعبة المشرفة</div>
          <div className="text-xs text-muted-foreground">Al-Kaaba Al-Musharrafa</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedQiblaCompass;