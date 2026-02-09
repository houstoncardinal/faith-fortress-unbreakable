import { useState, useEffect, useCallback, useRef } from 'react';
import { Motion } from '@capacitor/motion';
import { Capacitor } from '@capacitor/core';

interface MotionState {
  alpha: number | null; // compass heading (Z-axis)
  beta: number | null;
  gamma: number | null;
  supported: boolean;
  permissionGranted: boolean;
  error: string | null;
}

export const useCapacitorMotion = () => {
  const [state, setState] = useState<MotionState>({
    alpha: null,
    beta: null,
    gamma: null,
    supported: false,
    permissionGranted: false,
    error: null,
  });
  const listenerRef = useRef<any>(null);
  const webListenerRef = useRef<((e: DeviceOrientationEvent) => void) | null>(null);

  const startNativeListening = useCallback(async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        listenerRef.current = await Motion.addListener('orientation', (event) => {
          setState(prev => ({
            ...prev,
            alpha: event.alpha,
            beta: event.beta,
            gamma: event.gamma,
            supported: true,
            permissionGranted: true,
            error: null,
          }));
        });
        setState(prev => ({ ...prev, supported: true, permissionGranted: true }));
      } catch (err: any) {
        setState(prev => ({
          ...prev,
          error: err?.message || 'Motion sensor not available',
          supported: false,
        }));
      }
    }
  }, []);

  const startWebListening = useCallback(() => {
    if (!window.DeviceOrientationEvent) {
      setState(prev => ({ ...prev, supported: false, error: 'Device orientation not supported' }));
      return;
    }

    setState(prev => ({ ...prev, supported: true }));

    const handler = (event: DeviceOrientationEvent) => {
      setState(prev => ({
        ...prev,
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma,
        permissionGranted: true,
        error: null,
      }));
    };

    // iOS 13+ needs explicit permission
    const requestAndListen = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handler, true);
            webListenerRef.current = handler;
            setState(prev => ({ ...prev, permissionGranted: true }));
          } else {
            setState(prev => ({
              ...prev,
              permissionGranted: false,
              error: 'Motion permission denied. Enable in Settings > Safari > Motion & Orientation Access',
            }));
          }
        } catch {
          setState(prev => ({
            ...prev,
            permissionGranted: false,
            error: 'Failed to request motion permission.',
          }));
        }
      } else {
        window.addEventListener('deviceorientation', handler, true);
        webListenerRef.current = handler;
        setState(prev => ({ ...prev, permissionGranted: true }));
      }
    };

    requestAndListen();
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (Capacitor.isNativePlatform()) {
      await startNativeListening();
      return true;
    }

    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          setState(prev => ({ ...prev, permissionGranted: true, error: null }));
          startWebListening();
          return true;
        }
      } catch {
        // ignore
      }
    }
    return false;
  }, [startNativeListening, startWebListening]);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      startNativeListening();
    } else {
      startWebListening();
    }

    return () => {
      if (listenerRef.current) {
        listenerRef.current.remove();
      }
      if (webListenerRef.current) {
        window.removeEventListener('deviceorientation', webListenerRef.current, true);
      }
    };
  }, [startNativeListening, startWebListening]);

  return { ...state, requestPermission };
};
