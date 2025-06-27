
import { Navigation, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const QiblaCompass = () => {
  // Mock Qibla direction (in real app, this would be calculated based on user's location)
  const qiblaDirection = 285; // degrees from North

  return (
    <Card className="border-accent/30 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-primary">
          <Navigation className="w-5 h-5" />
          Qibla Direction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <div className="relative w-32 h-32">
            {/* Compass Circle */}
            <div className="w-full h-full rounded-full border-4 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/10 flex items-center justify-center relative">
              {/* North indicator */}
              <div className="absolute top-1 text-xs font-bold text-primary">N</div>
              
              {/* Qibla direction arrow */}
              <div 
                className="absolute w-1 h-12 bg-primary rounded-full origin-bottom"
                style={{ 
                  transform: `rotate(${qiblaDirection}deg) translateY(-50%)`,
                  transformOrigin: 'center bottom'
                }}
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-2 border-r-2 border-b-3 border-l-transparent border-r-transparent border-b-primary"></div>
              </div>
              
              {/* Center dot */}
              <div className="w-2 h-2 rounded-full bg-primary"></div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-2">
          <div className="font-semibold text-primary">Qibla Direction</div>
          <div className="text-2xl font-bold text-accent">{qiblaDirection}°</div>
          <div className="text-sm text-muted-foreground">West-Northwest</div>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
          <MapPin className="w-4 h-4" />
          <span>Distance to Kaaba: 11,247 km</span>
        </div>

        <div className="text-center">
          <div className="font-arabic text-lg text-primary mb-1">الكعبة المشرفة</div>
          <div className="text-xs text-muted-foreground">Al-Kaaba Al-Musharrafa</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QiblaCompass;
