
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
    <div className={`min-h-screen bg-gradient-to-br from-background via-background to-primary/5 transition-colors duration-500 ${isDark ? 'dark' : ''}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-primary/10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full gradient-islamic flex items-center justify-center shadow-lg">
                <span className="text-white font-arabic text-xl">☪</span>
              </div>
              <div>
                <h1 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Deen</h1>
                <p className="text-xs text-muted-foreground font-medium">Your Sacred Islamic Companion</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="hover:bg-primary/10 transition-colors"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-colors">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-colors">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section with Divine Blessing */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="font-arabic text-5xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary mb-4 leading-relaxed">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
          <div className="text-muted-foreground mb-2 font-medium">In the name of Allah, the Most Gracious, the Most Merciful</div>
          <div className="font-arabic text-3xl text-primary mb-3 leading-relaxed">
            السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
          </div>
          <p className="text-muted-foreground font-medium">Assalamu Alaikum wa Rahmatullahi wa Barakatuh</p>
          <p className="text-sm text-muted-foreground mt-2 italic">May Allah's peace, mercy, and blessings be upon you</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Prayer Times - Full Width */}
            <div className="animate-fade-in">
              <PrayerTimesCard />
            </div>
            
            {/* 3D Kaaba - Full Width */}
            <div className="animate-fade-in">
              <Kaaba3DCard />
            </div>
            
            {/* Quran and Hadith Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
              <QuranCard />
              <DailyHadith />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
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

        {/* Divine Supplication Section */}
        <div className="mt-12 text-center animate-fade-in">
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-8 rounded-2xl border border-primary/20 shadow-lg">
            <div className="font-arabic text-3xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4 leading-relaxed">
              رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ
            </div>
            <p className="text-muted-foreground italic font-medium mb-2">
              "Our Lord, give us good in this world and good in the next world, and save us from the punishment of the Fire."
            </p>
            <p className="text-sm text-muted-foreground">Surah Al-Baqarah (2:201)</p>
          </div>
        </div>

        {/* Prophetic Wisdom */}
        <div className="mt-8 text-center animate-fade-in">
          <div className="bg-gradient-to-r from-accent/5 to-primary/5 p-6 rounded-xl border border-accent/20">
            <div className="font-arabic text-xl text-primary mb-3 leading-relaxed">
              إِنَّمَا بُعِثْتُ لِأُتَمِّمَ مَكَارِمَ الْأَخْلَاقِ
            </div>
            <p className="text-sm text-muted-foreground italic mb-1">
              "I was sent only to perfect good character."
            </p>
            <p className="text-xs text-muted-foreground">- Prophet Muhammad ﷺ</p>
          </div>
        </div>
      </main>

      {/* Footer with Blessed Conclusion */}
      <footer className="mt-16 border-t border-primary/10 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="font-arabic text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-3 leading-relaxed">
            وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ
          </div>
          <p className="text-sm text-muted-foreground mb-2 italic">
            "And enjoin upon each other truth and enjoin upon each other patience."
          </p>
          <div className="font-arabic text-lg text-primary mb-3">
            بَارَكَ اللَّهُ فِيكُمْ
          </div>
          <p className="text-sm text-muted-foreground mb-4">May Allah bless you all</p>
          <p className="text-xs text-muted-foreground">
            Built with love and reverence for the Muslim Ummah • صُنِعَ بِحُبٍّ وَاحْتِرَامٍ لِلأُمَّةِ الإِسْلاَمِيَّة
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
