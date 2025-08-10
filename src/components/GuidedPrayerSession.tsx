
import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, ChevronLeft, ChevronRight, X, Languages } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useTextToSpeech, Language } from '@/hooks/useTextToSpeech';
import AudioSettings from './AudioSettings';

interface PrayerStep {
  id: number;
  arabic: string;
  transliteration: string;
  translation: string;
  instruction: string;
  duration: number; // in seconds
  position: 'standing' | 'bowing' | 'prostrating' | 'sitting';
  audioFile?: string;
}

interface GuidedPrayerSessionProps {
  prayerName: string;
  prayerSteps: PrayerStep[];
  onComplete: () => void;
  onExit: () => void;
}

const GuidedPrayerSession = ({ prayerName, prayerSteps, onComplete, onExit }: GuidedPrayerSessionProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showAudioSettings, setShowAudioSettings] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();
  const { toast } = useToast();
  
  // Text-to-Speech integration
  const {
    speak,
    stop: stopTTS,
    isLoading: isTTSLoading,
    isPlaying: isTTSPlaying,
    currentLanguage,
    setLanguage,
    error: ttsError,
    setError: setTTSError,
    apiKeyInput,
    setApiKeyInput,
    availableLanguages,
  } = useTextToSpeech();

  const currentPrayerStep = prayerSteps[currentStep];

  // Initialize time remaining when step changes
  useEffect(() => {
    if (currentPrayerStep) {
      setTimeRemaining(currentPrayerStep.duration);
      setProgress(0);
      console.log(`Starting step ${currentStep + 1}: ${currentPrayerStep.transliteration}`);
    }
  }, [currentStep, currentPrayerStep]);

  // Handle timer and progress
  useEffect(() => {
    if (isPlaying && timeRemaining > 0 && currentPrayerStep) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            handleNextStep();
            return 0;
          }
          return newTime;
        });
        setProgress(prev => {
          const newProgress = ((currentPrayerStep.duration - timeRemaining + 1) / currentPrayerStep.duration) * 100;
          return Math.min(newProgress, 100);
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, timeRemaining, currentPrayerStep]);

  // Auto-speak on step change when playing
  useEffect(() => {
    if (isPlaying && currentPrayerStep) {
      const textToSpeak = getTextForLanguage(currentPrayerStep, currentLanguage);
      speak({ text: textToSpeak, language: currentLanguage });
    }
  }, [currentStep, isPlaying, currentLanguage, speak, currentPrayerStep]);

  const handlePlayPause = async () => {
    console.log(`${isPlaying ? 'Pausing' : 'Playing'} step ${currentStep + 1}`);
    
    if (isPlaying || isTTSPlaying) {
      // Stop everything
      setIsPlaying(false);
      stopTTS();
    } else {
      // Start the step timer
      setIsPlaying(true);
      
      // Start TTS for current step
      if (currentPrayerStep) {
        const textToSpeak = getTextForLanguage(currentPrayerStep, currentLanguage);
        await speak({
          text: textToSpeak,
          language: currentLanguage,
        });
      }
    }
  };

  const getTextForLanguage = (step: PrayerStep, language: Language): string => {
    switch (language) {
      case 'arabic':
        return step.arabic;
      case 'urdu':
        // For Urdu, we'll use transliteration as a fallback since we don't have Urdu text
        return step.transliteration;
      case 'english':
      default:
        return step.translation;
    }
  };

  const handleNextStep = () => {
    console.log(`Moving to next step. Current: ${currentStep}, Total: ${prayerSteps.length}`);
    if (currentStep < prayerSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      // Keep playing seamlessly into the next step
      setIsPlaying(true);
    } else {
      handleComplete();
    }
  };
  const handlePrevStep = () => {
    if (currentStep > 0) {
      console.log(`Moving to previous step. Current: ${currentStep}`);
      setCurrentStep(prev => prev - 1);
      setIsPlaying(false);
    }
  };

  const handleComplete = () => {
    console.log(`Prayer ${prayerName} completed successfully`);
    setIsPlaying(false);
    toast({
      title: "🤲 Prayer Completed",
      description: `May Allah accept your ${prayerName} prayer. Ameen.`,
      duration: 5000,
    });
    onComplete();
  };

  const handleRestart = () => {
    console.log(`Restarting prayer ${prayerName}`);
    setCurrentStep(0);
    setIsPlaying(false);
    setProgress(0);
  };

  // Show TTS error in toast if exists
  useEffect(() => {
    if (ttsError) {
      toast({
        title: "Audio Error",
        description: ttsError,
        variant: "destructive",
      });
      setTTSError(null);
    }
  }, [ttsError, toast, setTTSError]);

  const getPositionIcon = (position: string) => {
    switch (position) {
      case 'standing': return '🧍';
      case 'bowing': return '🙇';
      case 'prostrating': return '🙇‍♂️';
      case 'sitting': return '🧘';
      default: return '🤲';
    }
  };

  const getPositionAnimation = (position: string) => {
    switch (position) {
      case 'standing': return 'animate-fade-in';
      case 'bowing': return 'animate-bounce';
      case 'prostrating': return 'animate-pulse';
      case 'sitting': return 'animate-fade-in';
      default: return 'animate-fade-in';
    }
  };

  // Safety check - return null if no current step
  if (!currentPrayerStep) {
    console.error('No current prayer step available');
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-primary/20 via-background to-accent/20 backdrop-blur-xl overflow-y-auto">
      {/* Audio Settings - Show initially if no API key */}
      {(!apiKeyInput || showAudioSettings) && (
        <div className="fixed top-20 left-4 right-4 z-20 max-w-md mx-auto">
          <AudioSettings
            currentLanguage={currentLanguage}
            onLanguageChange={setLanguage}
            apiKeyInput={apiKeyInput}
            setApiKeyInput={setApiKeyInput}
            availableLanguages={availableLanguages}
          />
        </div>
      )}

      {/* Mobile-optimized Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-xl border-b border-primary/10 safe-area-pt">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onExit} 
              className="hover:bg-primary/10 p-2"
            >
              <X className="w-5 h-5" />
            </Button>
            
            <div className="flex-1 text-center">
              <h1 className="text-lg md:text-xl font-bold text-primary">Guided {prayerName}</h1>
              <p className="text-xs text-muted-foreground">
                Step {currentStep + 1} of {prayerSteps.length}
              </p>
            </div>
            
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowAudioSettings(!showAudioSettings)} 
                className="p-2"
              >
                <Languages className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleRestart} className="p-2">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Mobile-optimized Progress Bar */}
          <div className="space-y-2">
            <Progress value={(currentStep / prayerSteps.length) * 100} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Overall Progress</span>
              <span>{Math.round((currentStep / prayerSteps.length) * 100)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-optimized Main Content */}
      <div className="px-4 py-6 pb-24 min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full">
          {/* Position Indicator - Mobile Optimized */}
          <div className="text-center mb-6">
            <div className={`text-6xl md:text-8xl mb-3 ${getPositionAnimation(currentPrayerStep.position)}`}>
              {getPositionIcon(currentPrayerStep.position)}
            </div>
            <div className="bg-primary/10 px-3 py-2 rounded-full inline-block">
              <span className="text-sm font-medium text-primary capitalize">
                {currentPrayerStep.position}
              </span>
            </div>
          </div>

          {/* Arabic Text - Mobile Responsive */}
          <div className="text-center mb-6 px-2">
            <div className="font-arabic text-2xl sm:text-3xl md:text-4xl text-primary mb-3 leading-relaxed animate-fade-in break-words">
              {currentPrayerStep.arabic}
            </div>
            <div className="text-base md:text-lg font-medium text-accent mb-2 break-words">
              {currentPrayerStep.transliteration}
            </div>
            <div className="text-sm md:text-base text-muted-foreground italic leading-relaxed">
              {currentPrayerStep.translation}
            </div>
          </div>

          {/* Instruction - Mobile Optimized */}
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-4 md:p-6 rounded-xl mb-6 border border-primary/10">
            <h3 className="font-semibold text-primary mb-2 text-sm md:text-base">Instructions:</h3>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{currentPrayerStep.instruction}</p>
          </div>

          {/* Step Progress - Mobile Optimized */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Step Progress</span>
              <span className="text-sm font-mono text-primary">
                {Math.max(0, timeRemaining)}s remaining
              </span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {/* Completion Message - Mobile Optimized */}
          {currentStep === prayerSteps.length - 1 && (
            <div className="text-center p-4 md:p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 mb-6">
              <div className="font-arabic text-xl md:text-2xl text-green-700 mb-2">
                تَقَبَّلَ اللَّهُ مِنَّا وَمِنكُمْ
              </div>
              <p className="text-green-600 font-medium text-sm md:text-base">
                May Allah accept (this worship) from us and from you
              </p>
            </div>
          )}
        </div>

        {/* Mobile-optimized Controls - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-primary/10 p-4 safe-area-pb">
          <div className="flex items-center justify-center gap-3 max-w-sm mx-auto">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              className="flex-1 gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </Button>
            
            <Button
              onClick={handlePlayPause}
              disabled={isTTSLoading}
              className="gap-2 gradient-islamic border-0 text-white px-6 py-3 text-base font-medium"
            >
              {isTTSLoading ? (
                <>
                  <div className="w-5 h-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Loading...
                </>
              ) : isPlaying || isTTSPlaying ? (
                <>
                  <Pause className="w-5 h-5" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Start
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleNextStep}
              className="flex-1 gap-2"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidedPrayerSession;
