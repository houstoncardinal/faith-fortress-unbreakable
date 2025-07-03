import { useEffect, useState } from "react";
import { Settings, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import QiblaSettings from "@/components/QiblaSettings";
import EnhancedQiblaCompass from "@/components/EnhancedQiblaCompass";
import { QiblaSettings as QiblaSettingsType, defaultQiblaSettings } from "@/types/qiblaTypes";

const QiblaPage = () => {
  const [settings, setSettings] = useState<QiblaSettingsType>(defaultQiblaSettings);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Qibla Compass & Direction Finder",
    "description": "High-accuracy Qibla compass and direction finder with GPS location, real-time updates, and comprehensive settings for precise prayer direction",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "Enhanced Qibla Compass",
      "applicationCategory": "ReligiousApplication",
      "operatingSystem": "Web Browser",
      "description": "Advanced Qibla direction finder with real-time GPS tracking, magnetic declination adjustment, and vibration feedback"
    }
  };

  return (
    <>
      <SEOHead
        title="Qibla Compass & Direction Settings | High-Accuracy Prayer Direction | Deen App"
        description="Find precise Qibla direction with our advanced compass featuring GPS accuracy, real-time updates, magnetic declination adjustment, and comprehensive settings. Perfect for accurate prayer direction anywhere in the world."
        keywords="Qibla compass, prayer direction, Kaaba direction, GPS compass, Islamic compass, magnetic declination, prayer direction finder, accurate Qibla, Muslim compass"
        canonical="https://deen-app.com/qibla"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-primary/10 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Qibla Compass & Settings
                </h1>
                <p className="text-xs text-muted-foreground font-medium">
                  High-precision prayer direction finder
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <div className="font-arabic text-3xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary mb-4 leading-relaxed">
              وَلِلَّهِ الْمَشْرِقُ وَالْمَغْرِبُ فَأَيْنَمَا تُوَلُّوا فَثَمَّ وَجْهُ اللَّهِ
            </div>
            <p className="text-muted-foreground mb-2 font-medium">
              "And to Allah belongs the east and the west. So wherever you turn, there is the face of Allah."
            </p>
            <p className="text-sm text-muted-foreground">Quran 2:115</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Enhanced Compass */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Live Compass
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <EnhancedQiblaCompass />
                </CardContent>
              </Card>
            </div>

            {/* Settings Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Compass Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <QiblaSettings
                    currentSettings={settings}
                    onSettingsChange={setSettings}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Information Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">GPS Accuracy</div>
                <p className="text-sm text-muted-foreground">
                  High-precision GPS location for exact Qibla direction calculation
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">Real-time Updates</div>
                <p className="text-sm text-muted-foreground">
                  Continuous location and direction monitoring for accuracy
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">Smart Features</div>
                <p className="text-sm text-muted-foreground">
                  Vibration feedback, voice guidance, and magnetic declination adjustment
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sacred Text */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-8 rounded-2xl border border-primary/20 shadow-lg">
              <div className="font-arabic text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4 leading-relaxed">
                فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ
              </div>
              <p className="text-muted-foreground italic font-medium mb-2">
                "So turn your face toward al-Masjid al-Haram [the Sacred Mosque]"
              </p>
              <p className="text-sm text-muted-foreground">Quran 2:144</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default QiblaPage;