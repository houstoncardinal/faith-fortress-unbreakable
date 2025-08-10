import { useState, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type Language = 'english' | 'arabic' | 'urdu';

interface UseTextToSpeechProps {
  apiKey?: string;
}

interface TextToSpeechOptions {
  text: string;
  language: Language;
  voiceId?: string;
}

const VOICE_IDS = {
  english: 'EXAVITQu4vr4xnSDxMaL', // Sarah - clear English voice
  arabic: 'pNInz6obpgDQGcFmaJgB', // Custom Arabic voice (Adam in Arabic)
  urdu: 'TX3LPaxmHKxFdv7VOQHJ', // Liam adapted for Urdu
};

const LANGUAGE_CODES = {
  english: 'en',
  arabic: 'ar',
  urdu: 'ur',
};

export const useTextToSpeech = ({ apiKey }: UseTextToSpeechProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('english');
  const [error, setError] = useState<string | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState(apiKey || '');
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const speak = useCallback(async ({ text, language, voiceId }: TextToSpeechOptions) => {
    setIsLoading(true);
    setError(null);

    // Stop any current playback
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      const selectedVoiceId = voiceId || VOICE_IDS[language];

      if (apiKeyInput) {
        // Direct call to ElevenLabs when user provides their own key
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${selectedVoiceId}`, {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': apiKeyInput,
          },
          body: JSON.stringify({
            text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.8,
              style: 0.2,
              use_speaker_boost: true,
            },
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.detail?.message || `HTTP error! status: ${response.status}`);
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.onplay = () => setIsPlaying(true);
        audio.onended = () => {
          setIsPlaying(false);
          URL.revokeObjectURL(audioUrl);
        };
        audio.onerror = () => {
          setError('Audio playback failed');
          setIsPlaying(false);
          URL.revokeObjectURL(audioUrl);
        };

        await audio.play();
      } else {
        // Use Supabase Edge Function with server-side secret
        const { data, error: fnError } = await supabase.functions.invoke('tts', {
          body: { text, language, voiceId: selectedVoiceId },
        });
        if (fnError) throw new Error(fnError.message || 'TTS service error');
        if (!data?.audioContent) throw new Error('No audio returned');

        // Decode base64 -> Blob
        const binary = atob(data.audioContent as string);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        const audioBlob = new Blob([bytes], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);

        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.onplay = () => setIsPlaying(true);
        audio.onended = () => {
          setIsPlaying(false);
          URL.revokeObjectURL(audioUrl);
        };
        audio.onerror = () => {
          setError('Audio playback failed');
          setIsPlaying(false);
          URL.revokeObjectURL(audioUrl);
        };

        await audio.play();
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Text-to-speech error:', error);
        setError(error.message || 'Failed to generate speech');
      }
    } finally {
      setIsLoading(false);
    }
  }, [apiKeyInput]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsPlaying(false);
    setIsLoading(false);
  }, []);

  const setLanguage = useCallback((language: Language) => {
    setCurrentLanguage(language);
    // Stop current playback when changing language
    stop();
  }, [stop]);

  return {
    speak,
    stop,
    isLoading,
    isPlaying,
    currentLanguage,
    setLanguage,
    error,
    setError,
    apiKeyInput,
    setApiKeyInput,
    availableLanguages: Object.keys(VOICE_IDS) as Language[],
  };
};