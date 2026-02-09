import { useState, useEffect, useCallback, useRef } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  error: string | null;
  loading: boolean;
}

export const useCapacitorGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    accuracy: null,
    error: null,
    loading: true,
  });
  const watchIdRef = useRef<string | null>(null);

  const requestPermissions = useCallback(async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        const status = await Geolocation.requestPermissions();
        return status.location === 'granted';
      } catch {
        return false;
      }
    }
    return true; // Web doesn't need explicit permission request via Capacitor
  }, []);

  const getCurrentPosition = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));

      if (Capacitor.isNativePlatform()) {
        // Use Capacitor native API
        const granted = await requestPermissions();
        if (!granted) {
          setState(prev => ({
            ...prev,
            error: 'Location permission denied. Please enable in device settings.',
            loading: false,
          }));
          return;
        }

        const position = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000,
        });

        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          error: null,
          loading: false,
        });
      } else {
        // Web fallback
        if (!navigator.geolocation) {
          setState(prev => ({
            ...prev,
            error: 'Geolocation is not supported by this browser',
            loading: false,
          }));
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
              error: null,
              loading: false,
            });
          },
          (error) => {
            let msg = 'Unable to retrieve your location';
            if (error.code === error.PERMISSION_DENIED) msg = 'Location access denied. Please enable location permissions.';
            else if (error.code === error.POSITION_UNAVAILABLE) msg = 'Location information is unavailable.';
            else if (error.code === error.TIMEOUT) msg = 'Location request timed out.';
            setState(prev => ({ ...prev, error: msg, loading: false }));
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 300000 }
        );
      }
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        error: err?.message || 'Failed to get location',
        loading: false,
      }));
    }
  }, [requestPermissions]);

  const startWatching = useCallback(async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        const id = await Geolocation.watchPosition(
          { enableHighAccuracy: true },
          (position, err) => {
            if (err) {
              setState(prev => ({ ...prev, error: err.message }));
              return;
            }
            if (position) {
              setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                error: null,
                loading: false,
              });
            }
          }
        );
        watchIdRef.current = id;
      } catch (err: any) {
        setState(prev => ({ ...prev, error: err?.message || 'Watch position failed' }));
      }
    } else if (navigator.geolocation) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            error: null,
            loading: false,
          });
        },
        (error) => {
          setState(prev => ({ ...prev, error: error.message }));
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 300000 }
      );
      watchIdRef.current = String(id);
    }
  }, []);

  useEffect(() => {
    getCurrentPosition();
    startWatching();

    return () => {
      if (watchIdRef.current) {
        if (Capacitor.isNativePlatform()) {
          Geolocation.clearWatch({ id: watchIdRef.current });
        } else {
          navigator.geolocation.clearWatch(Number(watchIdRef.current));
        }
      }
    };
  }, [getCurrentPosition, startWatching]);

  return { ...state, refresh: getCurrentPosition };
};
