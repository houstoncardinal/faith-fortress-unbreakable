
import { useState } from "react";
import { Moon, Sun, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import PrayerTimesCard from "@/components/PrayerTimesCard";
import QuranCard from "@/components/QuranCard";
import DhikrCounter from "@/components/DhikrCounter";
import QiblaCompass from "@/components/QiblaCompass";
import IslamicCalendar from "@/components/IslamicCalendar";
import DailyHadith from "@/components/DailyHadith";
import Kaaba3DCard from "@/components/Kaaba3DCard";

const Index = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen bg-background transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full gradient-islamic flex items-center justify-center">
                <span className="text-white font-arabic text-lg">☪</span>
              </div>
              <div>
                <h1 className="font-bold text-xl text-primary">Deen</h1>
                <p className="text-xs text-muted-foreground">Your Islamic Companion</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="hover:bg-primary/10"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="font-arabic text-4xl text-primary mb-2">
            السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
          </div>
          <p className="text-muted-foreground">Assalamu Alaikum wa Rahmatullahi wa Barakatuh</p>
          <p className="text-sm text-muted-foreground mt-1">May Allah's peace and blessings be upon you</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Prayer Times - Full Width */}
            <div className="animate-fade-in">
              <PrayerTimesCard />
            </div>
            
            {/* 3D Kaaba - Full Width */}
            <div className="animate-fade-in">
              <Kaaba3DCard />
            </div>
            
            {/* Quran and Hadith Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              <QuranCard />
              <DailyHadith />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="animate-fade-in">
              <DhikrCounter />
            </div>
            <div className="animate-fade-in">
              <QiblaCompass />
            </div>
            <div className="animate-fade-in">
              <IslamicCalendar />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 text-center animate-fade-in">
          <div className="font-arabic text-2xl text-primary mb-2">
            رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ
          </div>
          <p className="text-sm text-muted-foreground italic">
            "Our Lord, give us good in this world and good in the next world, and save us from the punishment of the Fire."
          </p>
          <p className="text-xs text-muted-foreground mt-1">Surah Al-Baqarah (2:201)</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 py-6 text-center">
          <div className="font-arabic text-lg text-primary mb-2">
            بَارَكَ اللَّهُ فِيكُمْ
          </div>
          <p className="text-sm text-muted-foreground">May Allah bless you all</p>
          <p className="text-xs text-muted-foreground mt-2">
            Built with love for the Muslim Ummah • جُعِلَ بِحُبٍّ لِلأُمَّةِ الإِسْلاَمِيَّة
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
