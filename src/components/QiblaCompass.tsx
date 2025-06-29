
import { useState } from "react";
import { Navigation, MapPin, Compass, AlertCircle, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useDeviceOrientation } from "@/hooks/useDeviceOrientation";
import { calculateQiblaDirection, calculateDistanceToKaaba, getDirectionName } from "@/utils/qiblaCalculation";

const QiblaCompass = () => {
  const geolocation = useGeolocation();
  const deviceOrientation = useDeviceOrientation();
  const [calibrating, setCalibrating] = useState(false);

  // Calculate Qibla direction if we have location
  const qiblaDirection = geolocation.latitude && geolocation.longitude 
    ? calculateQiblaDirection(geolocation.latitude, geolocation.longitude)
    : null;

  // Calculate distance to Kaaba
  const distanceToKaaba = geolocation.latitude && geolocation.longitude
    ? calculateDistanceToKaaba(geolocation.latitude, geolocation.longitude)
    : null;

  // Get device heading (compass direction)
  const deviceHeading = deviceOrientation.alpha !== null ? Math.round(deviceOrientation.alpha) : null;

  // Calculate the relative angle for the Qibla arrow
  const getQiblaArrowRotation = () => {
    if (qiblaDirection === null || deviceHeading === null) return 0;
    
    // Calculate relative angle between device heading and Qibla direction
    let relativeAngle = qiblaDirection - deviceHeading;
    
    // Normalize to -180 to 180 range
    if (relativeAngle > 180) relativeAngle -= 360;
    if (relativeAngle < -180) relativeAngle += 360;
    
    return relativeAngle;
  };

  const handleCalibrate = async () => {
    setCalibrating(true);
    
    if (!deviceOrientation.permissionGranted && deviceOrientation.supported) {
      await deviceOrientation.requestPermission();
    }
    
    setTimeout(() => setCalibrating(false), 2000);
  };

  const renderCompass = () => {
    const arrowRotation = getQiblaArrowRotation();
    
    return (
      <div className="relative w-40 h-40">
        {/* Compass Circle */}
        <div className="w-full h-full rounded-full border-4 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center relative shadow-lg">
          
          {/* Cardinal directions */}
          <div className="absolute top-2 text-sm font-bold text-primary">N</div>
          <div className="absolute right-2 text-sm font-bold text-muted-foreground">E</div>
          <div className="absolute bottom-2 text-sm font-bold text-muted-foreground">S</div>
          <div className="absolute left-2 text-sm font-bold text-muted-foreground">W</div>
          
          {/* Degree markings */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <div
              key={deg}
              className="absolute w-0.5 h-3 bg-muted-foreground/50"
              style={{
                top: '10px',
                left: '50%',
                transformOrigin: '50% 70px',
                transform: `translateX(-50%) rotate(${deg}deg)`,
              }}
            />
          ))}
          
          {/* Qibla direction arrow */}
          {qiblaDirection !== null && (
            <div 
              className="absolute w-1 h-16 bg-gradient-to-t from-primary to-accent rounded-full origin-bottom transition-transform duration-300 ease-out"
              style={{ 
                transform: `rotate(${arrowRotation}deg) translateY(-50%)`,
                transformOrigin: 'center bottom'
              }}
            >
              {/* Arrow head */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-3 border-r-3 border-b-4 border-l-transparent border-r-transparent border-b-primary"></div>
            </div>
          )}
          
          {/* Center dot */}
          <div className="w-3 h-3 rounded-full bg-primary shadow-md"></div>
          
          {/* Device orientation indicator */}
          {deviceHeading !== null && (
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-accent shadow-sm"></div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="border-accent/30 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-primary">
          <Navigation className="w-5 h-5" />
          Qibla Compass
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Status Messages */}
        {geolocation.loading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Getting your location...</span>
          </div>
        )}

        {geolocation.error && (
          <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-lg p-3">
            <AlertCircle className="w-4 h-4" />
            <span>{geolocation.error}</span>
          </div>
        )}

        {!deviceOrientation.supported && (
          <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 rounded-lg p-3">
            <AlertCircle className="w-4 h-4" />
            <span>Device orientation not supported</span>
          </div>
        )}

        {deviceOrientation.supported && !deviceOrientation.permissionGranted && (
          <div className="text-center space-y-2">
            <div className="text-sm text-muted-foreground">Compass permission needed</div>
            <Button onClick={handleCalibrate} variant="outline" size="sm" className="gap-2">
              <Compass className="w-4 h-4" />
              Enable Compass
            </Button>
          </div>
        )}

        {/* Compass Display */}
        <div className="flex justify-center">
          {renderCompass()}
        </div>

        {/* Qibla Information */}
        {qiblaDirection !== null && (
          <div className="text-center space-y-2">
            <div className="font-semibold text-primary">Qibla Direction</div>
            <div className="text-3xl font-bold text-accent">{qiblaDirection}°</div>
            <div className="text-sm text-muted-foreground">{getDirectionName(qiblaDirection)}</div>
            
            {deviceHeading !== null && (
              <div className="text-xs text-muted-foreground">
                Device: {deviceHeading}° | Relative: {Math.round(getQiblaArrowRotation())}°
              </div>
            )}
          </div>
        )}

        {/* Distance to Kaaba */}
        {distanceToKaaba && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
            <MapPin className="w-4 h-4" />
            <span>Distance to Kaaba: {distanceToKaaba.toLocaleString()} km</span>
          </div>
        )}

        {/* Calibration Button */}
        {deviceOrientation.supported && deviceOrientation.permissionGranted && (
          <div className="text-center">
            <Button 
              onClick={handleCalibrate} 
              variant="outline" 
              size="sm" 
              disabled={calibrating}
              className="gap-2"
            >
              {calibrating ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Compass className="w-4 h-4" />
              )}
              {calibrating ? 'Calibrating...' : 'Calibrate Compass'}
            </Button>
          </div>
        )}

        {/* Location Info */}
        {geolocation.latitude && geolocation.longitude && (
          <div className="text-xs text-muted-foreground text-center space-y-1">
            <div>Lat: {geolocation.latitude.toFixed(4)}, Lng: {geolocation.longitude.toFixed(4)}</div>
            {geolocation.accuracy && (
              <div>Accuracy: ±{Math.round(geolocation.accuracy)}m</div>
            )}
          </div>
        )}

        {/* Sacred Text */}
        <div className="text-center pt-2 border-t border-primary/10">
          <div className="font-arabic text-lg text-primary mb-1">الكعبة المشرفة</div>
          <div className="text-xs text-muted-foreground">Al-Kaaba Al-Musharrafa</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QiblaCompass;
