import { useState } from 'react';
import { Settings, Eye, EyeOff, Languages, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTextToSpeech, Language } from '@/hooks/useTextToSpeech';

interface AudioSettingsProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  apiKeyInput: string;
  setApiKeyInput: (key: string) => void;
  availableLanguages: Language[];
}

const AudioSettings = ({ 
  currentLanguage, 
  onLanguageChange, 
  apiKeyInput, 
  setApiKeyInput, 
  availableLanguages 
}: AudioSettingsProps) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!apiKeyInput);

  const languageLabels = {
    english: 'English',
    arabic: 'العربية (Arabic)',
    urdu: 'اردو (Urdu)',
  };

  if (!isExpanded && apiKeyInput) {
    return (
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Audio: {languageLabels[currentLanguage]}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(true)}
          className="p-2"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <Card className="border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4" />
            Audio Settings
          </div>
          {apiKeyInput && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(false)}
              className="p-1"
            >
              <EyeOff className="w-4 h-4" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* API Key Input */}
        <div className="space-y-2">
          <Label htmlFor="apiKey" className="text-sm font-medium">
            ElevenLabs API Key
          </Label>
          <div className="relative">
            <Input
              id="apiKey"
              type={showApiKey ? 'text' : 'password'}
              placeholder="sk-..."
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 p-1"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Get your API key from{' '}
            <a 
              href="https://elevenlabs.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              elevenlabs.io
            </a>
          </p>
        </div>

        {/* Language Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Recitation Language</Label>
          <Select value={currentLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {availableLanguages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {languageLabels[lang]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Info */}
        <div className="bg-primary/5 p-3 rounded-lg">
          <p className="text-xs text-muted-foreground">
            High-quality AI voice recitations will be generated for each prayer step in your selected language.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioSettings;