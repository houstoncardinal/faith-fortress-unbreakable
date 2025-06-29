
import { useState, useEffect } from 'react';

interface DeviceOrientationState {
  alpha: number | null; // Z-axis rotation (compass heading)
  beta: number | null;  // X-axis rotation
  gamma: number | null; // Y-axis rotation
  absolute: boolean;
  supported: boolean;
  permissionGranted: boolean;
}

export const useDeviceOrientation = () => {
  const [orientation, setOrientation] = useState<DeviceOrientationState>({
    alpha: null,
    beta: null,
    gamma: null,
    absolute: false,
    supported: false,
    permissionGranted: false,
  });

  useEffect(() => {
    // Check if device orientation is supported
    if (!window.DeviceOrientationEvent) {
      setOrientation(prev => ({ ...prev, supported: false }));
      return;
    }

    setOrientation(prev => ({ ...prev, supported: true }));

    const handleOrientation = (event: DeviceOrientationEvent) => {
      setOrientation(prev => ({
        ...prev,
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma,
        absolute: event.absolute || false,
        permissionGranted: true,
      }));
    };

    // Request permission for iOS 13+ devices
    const requestPermission = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation, true);
            setOrientation(prev => ({ ...prev, permissionGranted: true }));
          } else {
            setOrientation(prev => ({ ...prev, permissionGranted: false }));
          }
        } catch (error) {
          console.error('Error requesting device orientation permission:', error);
          setOrientation(prev => ({ ...prev, permissionGranted: false }));
        }
      } else {
        // For non-iOS devices or older iOS versions
        window.addEventListener('deviceorientation', handleOrientation, true);
        setOrientation(prev => ({ ...prev, permissionGranted: true }));
      }
    };

    requestPermission();

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, []);

  const requestPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          setOrientation(prev => ({ ...prev, permissionGranted: true }));
          return true;
        }
      } catch (error) {
        console.error('Error requesting permission:', error);
      }
    }
    return false;
  };

  return { ...orientation, requestPermission };
};
