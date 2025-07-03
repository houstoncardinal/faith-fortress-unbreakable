
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
      {/* Enhanced Desktop Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-primary/10 shadow-lg safe-area-pt">
        <div className="container mx-auto px-4 lg:px-8 py-4 lg:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 lg:gap-6">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-xl relative overflow-hidden">
                {/* Islamic Geometric Pattern */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <svg
                  className="w-6 h-6 lg:w-7 lg:h-7 text-white relative z-10"
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
                <h1 className="font-bold text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Deen</h1>
                <p className="text-sm lg:text-base text-muted-foreground font-medium hidden sm:block">Your Sacred Islamic Companion</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <Button variant="ghost" className="text-sm font-medium hover:text-primary transition-colors">
                Prayer Times
              </Button>
              <Button variant="ghost" className="text-sm font-medium hover:text-primary transition-colors">
                Quran
              </Button>
              <Button variant="ghost" className="text-sm font-medium hover:text-primary transition-colors">
                Duas
              </Button>
              <Button variant="ghost" className="text-sm font-medium hover:text-primary transition-colors">
                Qibla
              </Button>
            </nav>
            
            <div className="flex items-center gap-2 lg:gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="hover:bg-primary/10 transition-colors w-10 h-10 lg:w-11 lg:h-11"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-colors w-10 h-10 lg:w-11 lg:h-11 hidden sm:flex">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-colors w-10 h-10 lg:w-11 lg:h-11 hidden sm:flex">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Desktop Main Content */}
      <main className="container mx-auto px-4 lg:px-8 py-8 lg:py-12 pb-20 lg:pb-12">
        {/* Enhanced Welcome Section */}
        <div className="text-center mb-12 lg:mb-16 animate-fade-in">
          <div className="font-arabic text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary mb-4 lg:mb-6 leading-relaxed px-2">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
          <div className="text-muted-foreground mb-3 lg:mb-4 font-medium text-base lg:text-lg px-2">In the name of Allah, the Most Gracious, the Most Merciful</div>
          <div className="font-arabic text-3xl sm:text-4xl lg:text-5xl text-primary mb-3 lg:mb-4 leading-relaxed px-2">
            السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
          </div>
          <p className="text-muted-foreground font-medium text-base lg:text-lg px-2 mb-2">Assalamu Alaikum wa Rahmatullahi wa Barakatuh</p>
          <p className="text-sm lg:text-base text-muted-foreground italic px-2">May Allah's peace, mercy, and blessings be upon you</p>
        </div>

        {/* Notification Permission - Desktop Styled */}
        <div className="mb-8 lg:mb-12 animate-fade-in max-w-md mx-auto lg:max-w-lg">
          <NotificationPermission />
        </div>

        {/* Enhanced Desktop Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
          {/* Enhanced Left Column - Main Content */}
          <div className="xl:col-span-3 lg:col-span-2 space-y-8 lg:space-y-10">
            {/* Prayer Times - Enhanced Desktop Layout */}
            <div id="prayer-times" className="animate-fade-in">
              <PrayerTimesCard />
            </div>
            
            {/* Guided Prayer Sessions */}
            <div className="animate-fade-in">
              <GuidedPrayerLauncher />
            </div>
            
            {/* Quran and Hadith Row - Enhanced Desktop Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-10 animate-fade-in">
              <div id="quran-section" className="lg:h-fit">
                <QuranCard />
              </div>
              <div className="lg:h-fit">
                <DailyHadith />
              </div>
            </div>

            {/* Desktop-Optimized Divine Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-10 animate-fade-in">
              {/* Divine Supplication Section */}
              <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-6 lg:p-8 rounded-2xl border border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
                <div className="font-arabic text-xl lg:text-2xl xl:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-3 lg:mb-4 leading-relaxed">
                  رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ
                </div>
                <p className="text-muted-foreground italic font-medium mb-2 text-sm lg:text-base">
                  "Our Lord, give us good in this world and good in the next world, and save us from the punishment of the Fire."
                </p>
                <p className="text-xs lg:text-sm text-muted-foreground">Surah Al-Baqarah (2:201)</p>
              </div>

              {/* Prophetic Wisdom */}
              <div className="bg-gradient-to-r from-accent/5 to-primary/5 p-6 lg:p-8 rounded-xl border border-accent/20 hover:shadow-lg transition-shadow">
                <div className="font-arabic text-lg lg:text-xl xl:text-2xl text-primary mb-2 lg:mb-3 leading-relaxed">
                  إِنَّمَا بُعِثْتُ لِأُتَمِّمَ مَكَارِمَ الْأَخْلَاقِ
                </div>
                <p className="text-sm lg:text-base text-muted-foreground italic mb-1">
                  "I was sent only to perfect good character."
                </p>
                <p className="text-xs lg:text-sm text-muted-foreground">- Prophet Muhammad ﷺ</p>
              </div>
            </div>
          </div>

          {/* Enhanced Right Sidebar - Desktop Optimized */}
          <div className="xl:col-span-1 lg:col-span-1 space-y-6 lg:space-y-8">
            {/* Luxury Digital Clock */}
            <div className="animate-fade-in">
              <LuxuryDigitalClock />
            </div>
            
            {/* Dhikr Counter */}
            <div id="dhikr-section" className="animate-fade-in">
              <DhikrCounter />
            </div>
            
            {/* Qibla Compass */}
            <div id="qibla-section" className="animate-fade-in">
              <EnhancedQiblaCompass />
            </div>
            
            {/* Islamic Calendar */}
            <div id="calendar-section" className="animate-fade-in">
              <IslamicCalendar />
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Desktop Footer */}
      <footer className="mt-16 lg:mt-20 border-t border-primary/10 bg-gradient-to-r from-primary/5 to-accent/5 pb-20 lg:pb-0">
        <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12 text-center">
          <div className="font-arabic text-2xl lg:text-3xl xl:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-3 lg:mb-4 leading-relaxed px-2">
            وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ
          </div>
          <p className="text-base lg:text-lg text-muted-foreground mb-3 lg:mb-4 italic px-2">
            "And enjoin upon each other truth and enjoin upon each other patience."
          </p>
          <div className="font-arabic text-lg lg:text-xl xl:text-2xl text-primary mb-3 lg:mb-4 px-2">
            بَارَكَ اللَّهُ فِيكُمْ
          </div>
          <p className="text-base lg:text-lg text-muted-foreground mb-4 lg:mb-6 px-2">May Allah bless you all</p>
          <p className="text-sm lg:text-base text-muted-foreground px-2 max-w-4xl mx-auto">
            Built with love and reverence for the Muslim Ummah • صُنِعَ بِحُبٍّ وَاحْتِرَامٍ لِلأُمَّةِ الإِسْلاَمِيَّة
          </p>
        </div>
      </footer>

      {/* Mobile Toolbar - Hidden on Desktop */}
      <div className="lg:hidden">
        <MobileToolbar />
      </div>
      </div>
    </>
  );
};

export default Index;
