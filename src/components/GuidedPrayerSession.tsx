
import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

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
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(prayerSteps[0]?.duration || 0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();
  const { toast } = useToast();

  const currentPrayerStep = prayerSteps[currentStep];

  useEffect(() => {
    if (currentPrayerStep) {
      setTimeRemaining(currentPrayerStep.duration);
      setProgress(0);
    }
  }, [currentStep, currentPrayerStep]);

  useEffect(() => {
    if (isPlaying && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleNextStep();
            return 0;
          }
          return prev - 1;
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

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    
    if (!isMuted && currentPrayerStep.audioFile) {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play().catch(() => {
            // Silent fail if audio doesn't exist
          });
        }
      }
    }
  };

  const handleNextStep = () => {
    if (currentStep < prayerSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setIsPlaying(false);
    } else {
      handleComplete();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setIsPlaying(false);
    }
  };

  const handleComplete = () => {
    setIsPlaying(false);
    toast({
      title: "🤲 Prayer Completed",
      description: `May Allah accept your ${prayerName} prayer. Ameen.`,
      duration: 5000,
    });
    onComplete();
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setProgress(0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

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

  if (!currentPrayerStep) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-primary/20 via-background to-accent/20 backdrop-blur-xl">
      {/* Audio element */}
      {currentPrayerStep.audioFile && (
        <audio
          ref={audioRef}
          src={currentPrayerStep.audioFile}
          muted={isMuted}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onExit} className="hover:bg-primary/10">
              <ChevronLeft className="w-5 h-5" />
              Exit
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-primary">Guided {prayerName}</h1>
              <p className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {prayerSteps.length}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleMute}>
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={handleRestart}>
              <RotateCcw className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={(currentStep / prayerSteps.length) * 100} className="h-2 mb-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Overall Progress</span>
            <span>{Math.round((currentStep / prayerSteps.length) * 100)}%</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 flex-1 flex items-center justify-center">
        <Card className="w-full max-w-4xl border-primary/20 shadow-2xl">
          <CardContent className="p-8">
            {/* Position Indicator */}
            <div className="text-center mb-8">
              <div className={`text-8xl mb-4 ${getPositionAnimation(currentPrayerStep.position)}`}>
                {getPositionIcon(currentPrayerStep.position)}
              </div>
              <div className="bg-primary/10 px-4 py-2 rounded-full inline-block">
                <span className="text-sm font-medium text-primary capitalize">
                  {currentPrayerStep.position}
                </span>
              </div>
            </div>

            {/* Arabic Text */}
            <div className="text-center mb-8">
              <div className="font-arabic text-4xl md:text-5xl text-primary mb-4 leading-relaxed animate-fade-in">
                {currentPrayerStep.arabic}
              </div>
              <div className="text-lg font-medium text-accent mb-2">
                {currentPrayerStep.transliteration}
              </div>
              <div className="text-muted-foreground italic max-w-2xl mx-auto">
                {currentPrayerStep.translation}
              </div>
            </div>

            {/* Instruction */}
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6 rounded-xl mb-8 border border-primary/10">
              <h3 className="font-semibold text-primary mb-2">Instructions:</h3>
              <p className="text-muted-foreground">{currentPrayerStep.instruction}</p>
            </div>

            {/* Step Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Step Progress</span>
                <span className="text-sm font-mono text-primary">
                  {Math.max(0, timeRemaining)}s remaining
                </span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button 
                variant="outline" 
                onClick={handlePrevStep}
                disabled={currentStep === 0}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <Button
                onClick={handlePlayPause}
                className="gap-2 gradient-islamic border-0 text-white px-8 py-6 text-lg"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                {isPlaying ? 'Pause' : 'Start'}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleNextStep}
                className="gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Completion Message */}
            {currentStep === prayerSteps.length - 1 && (
              <div className="text-center mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="font-arabic text-2xl text-green-700 mb-2">
                  تَقَبَّلَ اللَّهُ مِنَّا وَمِنكُمْ
                </div>
                <p className="text-green-600 font-medium">
                  May Allah accept (this worship) from us and from you
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuidedPrayerSession;
