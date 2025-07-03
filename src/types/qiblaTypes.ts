// Shared interface for Qibla settings
export interface QiblaSettings {
  autoUpdate: boolean;
  updateInterval: number;
  highAccuracy: boolean;
  maxAge: number;
  timeout: number;
  compassSmoothing: boolean;
  smoothingFactor: number;
  manualLocation: boolean;
  latitude: number | null;
  longitude: number | null;
  magneticDeclination: number;
  calibrationOffset: number;
  showDebugInfo: boolean;
  vibrationFeedback: boolean;
  voiceAnnouncements: boolean;
  units: 'metric' | 'imperial';
}

export const defaultQiblaSettings: QiblaSettings = {
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