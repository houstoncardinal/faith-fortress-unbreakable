
import { useState } from "react";
import { Moon, Sun, User, Settings } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import PrayerTimesCard from "@/components/PrayerTimesCard";
import QuranCard from "@/components/QuranCard";
import DhikrCounter from "@/components/DhikrCounter";
import EnhancedQiblaCompass from "@/components/EnhancedQiblaCompass";
import IslamicCalendar from "@/components/IslamicCalendar";
import DailyHadith from "@/components/DailyHadith";
import NotificationPermission from "@/components/NotificationPermission";
import MobileToolbar from "@/components/MobileToolbar";
import GuidedPrayerLauncher from "@/components/GuidedPrayerLauncher";
import LuxuryDigitalClock from "@/components/LuxuryDigitalClock";

const Index = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Deen - Your Ultimate Islamic Companion",
    "description": "The ultimate Muslim app to strengthen your deen with prayer times, Quran, dhikr counter, Qibla direction, and Islamic calendar",
    "applicationCategory": "ReligiousApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "Deen App"
    }
  };

  return (
    <>
      <SEOHead
        title="Deen - Your Ultimate Islamic Companion | Prayer Times, Quran & More"
        description="Strengthen your faith with comprehensive Islamic features: accurate prayer times, Quran verses, dhikr counter, Qibla direction, Islamic calendar, and guided prayers. The ultimate Muslim companion app."
        keywords="Islamic app, prayer times, Quran, dhikr counter, Muslim app, Islamic calendar, Qibla direction, duas, prayer guide, Islamic companion, Muslim prayers, salah times"
        ogImage="/src/assets/og-main.jpg"
        canonical="https://deen-app.com"
        structuredData={structuredData}
      />
      <div className={`min-h-screen bg-gradient-to-br from-background via-background to-primary/5 transition-colors duration-500 ${isDark ? 'dark' : ''}`}>
      {/* Mobile-optimized Header */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-primary/10 shadow-sm safe-area-pt">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-lg relative overflow-hidden">
                {/* Islamic Geometric Pattern */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-white relative z-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Professional Islamic star pattern */}
                  <g stroke="currentColor" strokeWidth="1.5" fill="none">
                    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" opacity="0.8"/>
                    <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
                    <path d="M12 8V6M12 18V16M16 12H18M6 12H8" strokeLinecap="round"/>
                  </g>
                </svg>
              </div>
              <div>
                <h1 className="font-bold text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Deen</h1>
                <p className="text-xs text-muted-foreground font-medium hidden sm:block">Your Sacred Islamic Companion</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 md:gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="hover:bg-primary/10 transition-colors w-8 h-8 md:w-10 md:h-10"
              >
                {isDark ? <Sun className="w-4 h-4 md:w-5 md:h-5" /> : <Moon className="w-4 h-4 md:w-5 md:h-5" />}
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-colors w-8 h-8 md:w-10 md:h-10 hidden sm:flex">
                <Settings className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-colors w-8 h-8 md:w-10 md:h-10 hidden sm:flex">
                <User className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Mobile Optimized */}
      <main className="container mx-auto px-4 py-6 md:py-8 pb-20 md:pb-8">
        {/* Welcome Section - Mobile Responsive */}
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <div className="font-arabic text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary mb-3 md:mb-4 leading-relaxed px-2">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
          <div className="text-muted-foreground mb-2 font-medium text-sm md:text-base px-2">In the name of Allah, the Most Gracious, the Most Merciful</div>
          <div className="font-arabic text-2xl sm:text-3xl text-primary mb-2 md:mb-3 leading-relaxed px-2">
            السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
          </div>
          <p className="text-muted-foreground font-medium text-sm md:text-base px-2">Assalamu Alaikum wa Rahmatullahi wa Barakatuh</p>
          <p className="text-xs md:text-sm text-muted-foreground mt-2 italic px-2">May Allah's peace, mercy, and blessings be upon you</p>
        </div>

        {/* Notification Permission */}
        <div className="mb-6 md:mb-8 animate-fade-in">
          <NotificationPermission />
        </div>

        {/* Main Grid - Mobile Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Prayer Times - Full Width */}
            <div id="prayer-times" className="animate-fade-in">
              <PrayerTimesCard />
            </div>
            
            {/* Guided Prayer Sessions */}
            <div className="animate-fade-in">
              <GuidedPrayerLauncher />
            </div>
            
            {/* Quran and Hadith Row - Mobile Stacked */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 animate-fade-in">
              <div id="quran-section">
                <QuranCard />
              </div>
              <DailyHadith />
            </div>
          </div>

          {/* Right Column - Mobile Stacked */}
          <div className="space-y-6 md:space-y-8">
            {/* Luxury Digital Clock */}
            <div className="animate-fade-in">
              <LuxuryDigitalClock />
            </div>
            <div id="dhikr-section" className="animate-fade-in">
              <DhikrCounter />
            </div>
            <div id="qibla-section" className="animate-fade-in">
              <EnhancedQiblaCompass />
            </div>
            <div id="calendar-section" className="animate-fade-in">
              <IslamicCalendar />
            </div>
          </div>
        </div>

        {/* Divine Supplication Section - Mobile Optimized */}
        <div className="mt-8 md:mt-12 text-center animate-fade-in">
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-6 md:p-8 rounded-2xl border border-primary/20 shadow-lg">
            <div className="font-arabic text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-3 md:mb-4 leading-relaxed px-2">
              رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ
            </div>
            <p className="text-muted-foreground italic font-medium mb-2 text-sm md:text-base px-2">
              "Our Lord, give us good in this world and good in the next world, and save us from the punishment of the Fire."
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">Surah Al-Baqarah (2:201)</p>
          </div>
        </div>

        {/* Prophetic Wisdom - Mobile Optimized */}
        <div className="mt-6 md:mt-8 text-center animate-fade-in">
          <div className="bg-gradient-to-r from-accent/5 to-primary/5 p-4 md:p-6 rounded-xl border border-accent/20">
            <div className="font-arabic text-lg md:text-xl text-primary mb-2 md:mb-3 leading-relaxed px-2">
              إِنَّمَا بُعِثْتُ لِأُتَمِّمَ مَكَارِمَ الْأَخْلَاقِ
            </div>
            <p className="text-sm text-muted-foreground italic mb-1 px-2">
              "I was sent only to perfect good character."
            </p>
            <p className="text-xs text-muted-foreground">- Prophet Muhammad ﷺ</p>
          </div>
        </div>
      </main>

      {/* Footer - Mobile Optimized */}
      <footer className="mt-12 md:mt-16 border-t border-primary/10 bg-gradient-to-r from-primary/5 to-accent/5 pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-6 md:py-8 text-center">
          <div className="font-arabic text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2 md:mb-3 leading-relaxed px-2">
            وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ
          </div>
          <p className="text-sm text-muted-foreground mb-2 italic px-2">
            "And enjoin upon each other truth and enjoin upon each other patience."
          </p>
          <div className="font-arabic text-base md:text-lg text-primary mb-2 md:mb-3 px-2">
            بَارَكَ اللَّهُ فِيكُمْ
          </div>
          <p className="text-sm text-muted-foreground mb-3 md:mb-4 px-2">May Allah bless you all</p>
          <p className="text-xs text-muted-foreground px-2">
            Built with love and reverence for the Muslim Ummah • صُنِعَ بِحُبٍّ وَاحْتِرَامٍ لِلأُمَّةِ الإِسْلاَمِيَّة
          </p>
        </div>
      </footer>

      {/* Mobile Toolbar */}
      <MobileToolbar />
      </div>
    </>
  );
};

export default Index;
