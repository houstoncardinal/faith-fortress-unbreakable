
import { useState } from "react";
import { Moon, Sun, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import PrayerTimesCard from "@/components/PrayerTimesCard";
import QuranCard from "@/components/QuranCard";
import DhikrCounter from "@/components/DhikrCounter";
import QiblaCompass from "@/components/QiblaCompass";
import IslamicCalendar from "@/components/IslamicCalendar";
import DailyHadith from "@/components/DailyHadith";
import NotificationPermission from "@/components/NotificationPermission";
import MobileToolbar from "@/components/MobileToolbar";

const Index = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen pattern-islamic transition-colors duration-500 ${isDark ? 'dark' : ''}`}>
      {/* Luxury Header with Islamic elegance */}
      <header className="sticky top-0 z-50 bg-glass-gold shadow-xl border-b border-gold">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full gradient-kaaba flex items-center justify-center shadow-2xl animate-divine-pulse border-2 border-gold">
                <span className="text-white font-arabic text-2xl text-shadow-gold">☪</span>
              </div>
              <div>
                <h1 className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-islamic-green via-islamic-gold to-islamic-green text-shadow-gold">
                  Deen
                </h1>
                <p className="text-xs text-muted-foreground font-medium bg-gradient-to-r from-islamic-gold to-islamic-green bg-clip-text text-transparent">
                  Your Sacred Islamic Companion
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="hover:bg-glass-gold transition-all duration-300 border border-transparent hover:border-gold"
              >
                {isDark ? <Sun className="w-5 h-5 text-islamic-gold" /> : <Moon className="w-5 h-5 text-islamic-green" />}
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-glass-gold transition-all duration-300 border border-transparent hover:border-gold">
                <Settings className="w-5 h-5 text-islamic-green" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-glass-gold transition-all duration-300 border border-transparent hover:border-gold">
                <User className="w-5 h-5 text-islamic-green" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Divine Welcome Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="relative">
            <div className="absolute inset-0 animate-shimmer-gold rounded-2xl"></div>
            <div className="relative bg-glass-gold p-8 rounded-2xl border-islamic shadow-2xl">
              <div className="font-arabic text-6xl text-transparent bg-clip-text bg-gradient-to-r from-islamic-green via-islamic-gold to-islamic-green mb-4 leading-relaxed text-shadow-gold animate-float-divine">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
              <div className="text-muted-foreground mb-3 font-medium text-lg">In the name of Allah, the Most Gracious, the Most Merciful</div>
              <div className="font-arabic text-4xl text-transparent bg-clip-text bg-gradient-to-r from-islamic-gold to-islamic-green mb-4 leading-relaxed text-shadow">
                السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
              </div>
              <p className="text-muted-foreground font-medium text-lg">Assalamu Alaikum wa Rahmatullahi wa Barakatuh</p>
              <p className="text-sm text-muted-foreground mt-3 italic">May Allah's peace, mercy, and blessings be upon you</p>
            </div>
          </div>
        </div>

        {/* Notification Permission */}
        <div className="mb-8 animate-fade-in">
          <NotificationPermission />
        </div>

        {/* Luxury Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Prayer Times */}
            <div id="prayer-times" className="animate-fade-in">
              <PrayerTimesCard />
            </div>
            
            {/* Quran and Hadith Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
              <div id="quran-section">
                <QuranCard />
              </div>
              <DailyHadith />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div id="dhikr-section" className="animate-fade-in">
              <DhikrCounter />
            </div>
            <div id="qibla-section" className="animate-fade-in">
              <QiblaCompass />
            </div>
            <div id="calendar-section" className="animate-fade-in">
              <IslamicCalendar />
            </div>
          </div>
        </div>

        {/* Divine Supplication Section */}
        <div className="mt-12 text-center animate-fade-in">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-islamic-gold/20 via-islamic-green/20 to-islamic-gold/20 rounded-2xl blur-xl"></div>
            <div className="relative card-luxury p-10 rounded-2xl border-2 border-gold shadow-2xl">
              <div className="font-arabic text-4xl text-transparent bg-clip-text bg-gradient-to-r from-islamic-green via-islamic-gold to-islamic-green mb-6 leading-relaxed text-shadow-gold">
                رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ
              </div>
              <p className="text-muted-foreground italic font-medium mb-3 text-lg">
                "Our Lord, give us good in this world and good in the next world, and save us from the punishment of the Fire."
              </p>
              <p className="text-sm text-islamic-gold font-semibold">Surah Al-Baqarah (2:201)</p>
            </div>
          </div>
        </div>

        {/* Prophetic Wisdom */}
        <div className="mt-8 text-center animate-fade-in">
          <div className="bg-glass-green p-8 rounded-xl border-2 border-islamic-green/30 shadow-xl">
            <div className="font-arabic text-2xl text-transparent bg-clip-text bg-gradient-to-r from-islamic-green to-islamic-gold mb-4 leading-relaxed text-shadow">
              إِنَّمَا بُعِثْتُ لِأُتَمِّمَ مَكَارِمَ الْأَخْلَاقِ
            </div>
            <p className="text-sm text-muted-foreground italic mb-2 font-medium">
              "I was sent only to perfect good character."
            </p>
            <p className="text-xs text-islamic-gold font-semibold">- Prophet Muhammad ﷺ</p>
          </div>
        </div>
      </main>

      {/* Luxury Footer */}
      <footer className="mt-16 border-t-2 border-gold bg-glass-gold pattern-kaaba">
        <div className="container mx-auto px-4 py-10 text-center">
          <div className="font-arabic text-3xl text-transparent bg-clip-text bg-gradient-to-r from-islamic-green via-islamic-gold to-islamic-green mb-4 leading-relaxed text-shadow-gold">
            وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ
          </div>
          <p className="text-sm text-muted-foreground mb-3 italic font-medium">
            "And enjoin upon each other truth and enjoin upon each other patience."
          </p>
          <div className="font-arabic text-xl text-transparent bg-clip-text bg-gradient-to-r from-islamic-gold to-islamic-green mb-4 text-shadow">
            بَارَكَ اللَّهُ فِيكُمْ
          </div>
          <p className="text-sm text-muted-foreground mb-6 font-medium">May Allah bless you all</p>
          <div className="border-t border-gold pt-4">
            <p className="text-xs text-muted-foreground bg-gradient-to-r from-islamic-green to-islamic-gold bg-clip-text text-transparent font-medium">
              Built with love and reverence for the Muslim Ummah • صُنِعَ بِحُبٍّ وَاحْتِرَامٍ لِلأُمَّةِ الإِسْلاَمِيَّة
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Toolbar */}
      <MobileToolbar />
    </div>
  );
};

export default Index;
