import { useState, useEffect } from "react";
import { Settings, Compass, MapPin, RefreshCw, Clock, Satellite, Navigation, Save, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { QiblaSettings } from "@/types/qiblaTypes";

interface QiblaSettingsProps {
  onSettingsChange: (settings: QiblaSettings) => void;
  currentSettings: QiblaSettings;
}

const QiblaSettings = ({ onSettingsChange, currentSettings }: QiblaSettingsProps) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<QiblaSettings>(currentSettings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const hasChanged = JSON.stringify(settings) !== JSON.stringify(currentSettings);
    setHasChanges(hasChanged);
  }, [settings, currentSettings]);

  const handleSettingChange = (key: keyof QiblaSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSettingsChange(settings);
    setHasChanges(false);
    toast({
      title: "Settings Saved",
      description: "Qibla compass settings have been updated successfully"
    });
  };

  const handleReset = () => {
    const defaultSettings: QiblaSettings = {
      autoUpdate: true,
      updateInterval: 1,
      highAccuracy: true,
      maxAge: 60000,
      timeout: 15000,
      compassSmoothing: true,
      smoothingFactor: 0.8,
      manualLocation: false,
      latitude: null,
      longitude: null,
      magneticDeclination: 0,
      calibrationOffset: 0,
      showDebugInfo: false,
      vibrationFeedback: true,
      voiceAnnouncements: false,
      units: 'metric'
    };
    setSettings(defaultSettings);
    onSettingsChange(defaultSettings);
    setHasChanges(false);
    toast({
      title: "Settings Reset",
      description: "All settings have been restored to defaults"
    });
  };

  const testLocation = async () => {
    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "Geolocation is not supported by this browser",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Testing Location",
      description: "Requesting current location..."
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        toast({
          title: "Location Test Successful",
          description: `Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)} (±${Math.round(accuracy)}m)`
        });
      },
      (error) => {
        toast({
          title: "Location Test Failed",
          description: error.message,
          variant: "destructive"
        });
      },
      {
        enableHighAccuracy: settings.highAccuracy,
        timeout: settings.timeout,
        maximumAge: settings.maxAge
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Settings className="w-6 h-6 text-primary" />
          <div>
            <h2 className="text-xl font-semibold text-foreground">Qibla Compass Settings</h2>
            <p className="text-sm text-muted-foreground">Configure accuracy and behavior</p>
          </div>
        </div>
        {hasChanges && (
          <Badge variant="secondary" className="animate-pulse">
            Unsaved Changes
          </Badge>
        )}
      </div>

      {/* Location Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Location Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-update">Auto Update Location</Label>
              <p className="text-xs text-muted-foreground">Continuously track location changes</p>
            </div>
            <Switch
              id="auto-update"
              checked={settings.autoUpdate}
              onCheckedChange={(checked) => handleSettingChange('autoUpdate', checked)}
            />
          </div>

          {settings.autoUpdate && (
            <div className="space-y-2">
              <Label>Update Interval: {settings.updateInterval}s</Label>
              <Slider
                value={[settings.updateInterval]}
                onValueChange={([value]) => handleSettingChange('updateInterval', value)}
                min={1}
                max={60}
                step={1}
                className="w-full"
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="high-accuracy">High Accuracy Mode</Label>
              <p className="text-xs text-muted-foreground">Uses GPS for better precision</p>
            </div>
            <Switch
              id="high-accuracy"
              checked={settings.highAccuracy}
              onCheckedChange={(checked) => handleSettingChange('highAccuracy', checked)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Timeout (ms)</Label>
              <Input
                type="number"
                value={settings.timeout}
                onChange={(e) => handleSettingChange('timeout', parseInt(e.target.value) || 0)}
                min={5000}
                max={60000}
                step={1000}
              />
            </div>
            <div className="space-y-2">
              <Label>Max Age (ms)</Label>
              <Input
                type="number"
                value={settings.maxAge}
                onChange={(e) => handleSettingChange('maxAge', parseInt(e.target.value) || 0)}
                min={0}
                max={600000}
                step={10000}
              />
            </div>
          </div>

          <Button variant="outline" onClick={testLocation} className="w-full">
            <Satellite className="w-4 h-4 mr-2" />
            Test Location Accuracy
          </Button>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="manual-location">Manual Location</Label>
              <p className="text-xs text-muted-foreground">Set location manually instead of GPS</p>
            </div>
            <Switch
              id="manual-location"
              checked={settings.manualLocation}
              onCheckedChange={(checked) => handleSettingChange('manualLocation', checked)}
            />
          </div>

          {settings.manualLocation && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Latitude</Label>
                <Input
                  type="number"
                  value={settings.latitude || ''}
                  onChange={(e) => handleSettingChange('latitude', parseFloat(e.target.value) || null)}
                  placeholder="e.g., 40.7128"
                  step="0.0001"
                />
              </div>
              <div className="space-y-2">
                <Label>Longitude</Label>
                <Input
                  type="number"
                  value={settings.longitude || ''}
                  onChange={(e) => handleSettingChange('longitude', parseFloat(e.target.value) || null)}
                  placeholder="e.g., -74.0060"
                  step="0.0001"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Compass Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Compass className="w-5 h-5" />
            Compass Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="compass-smoothing">Compass Smoothing</Label>
              <p className="text-xs text-muted-foreground">Reduce compass needle jitter</p>
            </div>
            <Switch
              id="compass-smoothing"
              checked={settings.compassSmoothing}
              onCheckedChange={(checked) => handleSettingChange('compassSmoothing', checked)}
            />
          </div>

          {settings.compassSmoothing && (
            <div className="space-y-2">
              <Label>Smoothing Factor: {settings.smoothingFactor}</Label>
              <Slider
                value={[settings.smoothingFactor]}
                onValueChange={([value]) => handleSettingChange('smoothingFactor', value)}
                min={0.1}
                max={1}
                step={0.1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">Higher values = smoother but slower response</p>
            </div>
          )}

          <div className="space-y-2">
            <Label>Magnetic Declination (°)</Label>
            <Input
              type="number"
              value={settings.magneticDeclination}
              onChange={(e) => handleSettingChange('magneticDeclination', parseFloat(e.target.value) || 0)}
              placeholder="0"
              step="0.1"
            />
            <p className="text-xs text-muted-foreground">Adjust for local magnetic variation</p>
          </div>

          <div className="space-y-2">
            <Label>Calibration Offset (°)</Label>
            <Input
              type="number"
              value={settings.calibrationOffset}
              onChange={(e) => handleSettingChange('calibrationOffset', parseFloat(e.target.value) || 0)}
              placeholder="0"
              step="1"
            />
            <p className="text-xs text-muted-foreground">Manual compass calibration adjustment</p>
          </div>
        </CardContent>
      </Card>

      {/* Interface Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="w-5 h-5" />
            Interface Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="debug-info">Show Debug Information</Label>
              <p className="text-xs text-muted-foreground">Display technical details</p>
            </div>
            <Switch
              id="debug-info"
              checked={settings.showDebugInfo}
              onCheckedChange={(checked) => handleSettingChange('showDebugInfo', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="vibration">Vibration Feedback</Label>
              <p className="text-xs text-muted-foreground">Vibrate when pointing to Qibla</p>
            </div>
            <Switch
              id="vibration"
              checked={settings.vibrationFeedback}
              onCheckedChange={(checked) => handleSettingChange('vibrationFeedback', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="voice">Voice Announcements</Label>
              <p className="text-xs text-muted-foreground">Audio guidance for direction</p>
            </div>
            <Switch
              id="voice"
              checked={settings.voiceAnnouncements}
              onCheckedChange={(checked) => handleSettingChange('voiceAnnouncements', checked)}
            />
          </div>

          <div className="space-y-2">
            <Label>Distance Units</Label>
            <Select
              value={settings.units}
              onValueChange={(value: 'metric' | 'imperial') => handleSettingChange('units', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">Metric (km)</SelectItem>
                <SelectItem value="imperial">Imperial (miles)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={handleSave}
          disabled={!hasChanges}
          className="flex-1"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
        <Button
          variant="outline"
          onClick={handleReset}
          className="flex-1"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
};

export default QiblaSettings;