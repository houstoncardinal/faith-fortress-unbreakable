import { useState } from "react";
import { Moon, Sun, User, Settings } from "lucide-react";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import PrayerTimesCard from "@/components/PrayerTimesCard";
import QuranCard from "@/components/QuranCard";
import DhikrCounter from "@/components/DhikrCounter";
import EnhancedQiblaCompass from "@/components/EnhancedQiblaCompass";
import EnhancedIslamicCalendar from "@/components/EnhancedIslamicCalendar";
import DailyHadith from "@/components/DailyHadith";
import NotificationPermission from "@/components/NotificationPermission";
import MobileToolbar from "@/components/MobileToolbar";
import GuidedPrayerLauncher from "@/components/GuidedPrayerLauncher";
import LuxuryDigitalClock from "@/components/LuxuryDigitalClock";
import KaabaExperience from "@/components/KaabaExperience";
import IslamicLessons from "@/components/IslamicLessons";
import IslamicAIAssistant from "@/components/IslamicAIAssistant";

const Index = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Deen. By Cardinal",
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
      "name": "Cardinal"
    }
  };

  return (
    <>
      <SEOHead
        title="Deen. By Cardinal | Prayer Times, Quran & Islamic Companion"
        description="Strengthen your faith with comprehensive Islamic features: accurate prayer times, Quran verses, dhikr counter, Qibla direction, Islamic calendar, and guided prayers. The ultimate Muslim companion app by Cardinal."
        keywords="Deen app, prayer times, Quran, dhikr counter, Muslim app, Islamic calendar, Qibla direction, duas, prayer guide, Islamic companion, Cardinal"
        ogImage="/src/assets/og-main.jpg"
        canonical="https://deen-app.com"
        structuredData={structuredData}
      />
      <div className={`min-h-screen bg-gradient-to-br from-background via-background to-primary/5 transition-colors duration-500 ${isDark ? 'dark' : ''}`}>
      {/* Luxury Glassmorphism Header */}
      <header className="sticky top-0 z-50 safe-area-pt"
              style={{ WebkitBackdropFilter: 'blur(24px) saturate(200%)', backdropFilter: 'blur(24px) saturate(200%)' }}>
        <div className="bg-background/80 dark:bg-background/70">
        {/* Bottom edge glow line */}
        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 py-4 lg:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 lg:gap-5">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl gradient-luxury flex items-center justify-center shadow-luxury-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" style={{ boxShadow: '0 0 20px hsl(var(--accent)/0.4)' }} />
                <svg
                  className="w-6 h-6 lg:w-7 lg:h-7 text-white relative z-10 drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g stroke="currentColor" strokeWidth="1.5" fill="none">
                    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" opacity="0.8"/>
                    <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
                    <path d="M12 8V6M12 18V16M16 12H18M6 12H8" strokeLinecap="round"/>
                  </g>
                </svg>
              </div>
              <div>
                <h1 className="font-bold text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Deen.</h1>
                <p className="text-xs lg:text-sm text-muted-foreground font-medium hidden sm:block tracking-[0.15em] uppercase">By Cardinal</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Button variant="ghost" className="text-sm font-medium hover:text-primary hover:bg-primary/[0.06] rounded-xl transition-all px-5">
                Prayer Times
              </Button>
              <Button variant="ghost" className="text-sm font-medium hover:text-primary hover:bg-primary/[0.06] rounded-xl transition-all px-5">
                Quran
              </Button>
              <Button variant="ghost" className="text-sm font-medium hover:text-primary hover:bg-primary/[0.06] rounded-xl transition-all px-5">
                Duas
              </Button>
              <Button variant="ghost" className="text-sm font-medium hover:text-primary hover:bg-primary/[0.06] rounded-xl transition-all px-5">
                Qibla
              </Button>
            </nav>

            <div className="flex items-center gap-1 lg:gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="hover:bg-primary/10 rounded-xl transition-all w-10 h-10 lg:w-11 lg:h-11"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 rounded-xl transition-all w-10 h-10 lg:w-11 lg:h-11 hidden sm:flex">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 rounded-xl transition-all w-10 h-10 lg:w-11 lg:h-11 hidden sm:flex">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
        </div>
      </header>

      {/* Enhanced Desktop Main Content */}
      <main className="container mx-auto px-4 lg:px-8 py-8 lg:py-12 pb-20 lg:pb-12">
        {/* Enhanced Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-12 lg:mb-16 relative"
        >
          {/* Ambient background glow */}
          <div className="absolute inset-0 -z-10 blur-3xl opacity-20">
            <div className="absolute inset-x-1/4 top-0 h-32 bg-gradient-to-r from-primary/40 via-accent/30 to-primary/40 rounded-full" />
          </div>

          <div className="font-arabic text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary mb-4 lg:mb-6 leading-relaxed px-2 animate-divine-pulse">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
          <div className="text-muted-foreground mb-4 lg:mb-5 font-medium text-base lg:text-lg px-2 tracking-wide">In the name of Allah, the Most Gracious, the Most Merciful</div>

          {/* Luxury Separator */}
          <div className="flex items-center justify-center gap-3 mb-4 lg:mb-5">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="w-1.5 h-1.5 rounded-full bg-accent/50 shadow-[0_0_8px_hsl(var(--accent)/0.3)]" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>

          <div className="font-arabic text-3xl sm:text-4xl lg:text-5xl text-primary mb-3 lg:mb-4 leading-relaxed px-2">
            السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
          </div>
          <p className="text-muted-foreground font-medium text-base lg:text-lg px-2 mb-2">Assalamu Alaikum wa Rahmatullahi wa Barakatuh</p>
          <p className="text-sm lg:text-base text-muted-foreground/70 italic px-2">May Allah's peace, mercy, and blessings be upon you</p>
        </motion.div>

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
            
            {/* 3D Kaaba Experience */}
            <div className="animate-fade-in">
              <KaabaExperience />
            </div>
            
            {/* Islamic Lessons */}
            <div className="animate-fade-in">
              <IslamicLessons />
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
              <div className="bg-gradient-to-br from-primary/[0.08] via-accent/[0.06] to-primary/[0.08] p-6 lg:p-8 rounded-2xl border border-primary/15 shadow-luxury hover:shadow-luxury-lg transition-all duration-300 relative overflow-hidden">
                {/* Subtle corner glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="font-arabic text-xl lg:text-2xl xl:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-3 lg:mb-4 leading-relaxed relative">
                  رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ
                </div>
                <p className="text-muted-foreground italic font-medium mb-2 text-sm lg:text-base relative">
                  "Our Lord, give us good in this world and good in the next world, and save us from the punishment of the Fire."
                </p>
                <p className="text-xs lg:text-sm text-muted-foreground/70 relative">Surah Al-Baqarah (2:201)</p>
              </div>

              {/* Prophetic Wisdom */}
              <div className="bg-gradient-to-br from-accent/[0.05] to-primary/[0.05] p-6 lg:p-8 rounded-2xl border border-accent/15 shadow-luxury hover:shadow-luxury-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-primary/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
                <div className="font-arabic text-lg lg:text-xl xl:text-2xl text-primary mb-2 lg:mb-3 leading-relaxed relative">
                  إِنَّمَا بُعِثْتُ لِأُتَمِّمَ مَكَارِمَ الْأَخْلَاقِ
                </div>
                <p className="text-sm lg:text-base text-muted-foreground italic mb-1 relative">
                  "I was sent only to perfect good character."
                </p>
                <p className="text-xs lg:text-sm text-muted-foreground/70 relative">- Prophet Muhammad ﷺ</p>
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
              <EnhancedIslamicCalendar />
            </div>
          </div>
        </div>
      </main>

      {/* Luxury Footer */}
      <footer className="mt-16 lg:mt-20 relative pb-20 lg:pb-0 overflow-hidden">
        {/* Top edge glow */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-accent/[0.03] to-primary/[0.04] pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-14 text-center relative">
          <div className="font-arabic text-2xl lg:text-3xl xl:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-3 lg:mb-4 leading-relaxed px-2">
            وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ
          </div>
          <p className="text-base lg:text-lg text-muted-foreground mb-4 lg:mb-5 italic px-2">
            "And enjoin upon each other truth and enjoin upon each other patience."
          </p>

          {/* Luxury Separator */}
          <div className="flex items-center justify-center gap-3 mb-4 lg:mb-5">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
            <div className="w-1.5 h-1.5 rounded-full bg-accent/40 shadow-[0_0_6px_hsl(var(--accent)/0.3)]" />
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          </div>

          <div className="font-arabic text-lg lg:text-xl xl:text-2xl text-primary mb-3 lg:mb-4 px-2">
            بَارَكَ اللَّهُ فِيكُمْ
          </div>
          <p className="text-base lg:text-lg text-muted-foreground mb-5 lg:mb-7 px-2">May Allah bless you all</p>
          <p className="text-sm text-muted-foreground/60 px-2 max-w-4xl mx-auto tracking-wide">
            Deen. By Cardinal &bull; Built with love and reverence for the Muslim Ummah &bull; صُنِعَ بِحُبٍّ وَاحْتِرَامٍ لِلأُمَّةِ الإِسْلاَمِيَّة
          </p>
        </div>
      </footer>

      {/* AI Assistant */}
      <IslamicAIAssistant />

      {/* Mobile Toolbar - Hidden on Desktop */}
      <div className="lg:hidden">
        <MobileToolbar />
      </div>
      </div>
    </>
  );
};

export default Index;
