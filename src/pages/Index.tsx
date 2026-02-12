import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
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
import KaabaExperience from "@/components/KaabaExperience";
import IslamicLessons from "@/components/IslamicLessons";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

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
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "author": { "@type": "Organization", "name": "Cardinal" }
  };

  return (
    <>
      <SEOHead
        title="Deen. By Cardinal | Prayer Times, Quran & Islamic Companion"
        description="Strengthen your faith with comprehensive Islamic features: accurate prayer times, Quran verses, dhikr counter, Qibla direction, Islamic calendar, and guided prayers."
        keywords="Deen app, prayer times, Quran, dhikr counter, Muslim app, Islamic calendar, Qibla direction, duas, prayer guide, Islamic companion, Cardinal"
        ogImage="/src/assets/og-main.jpg"
        canonical="https://deen-app.com"
        structuredData={structuredData}
      />
      <div className={`min-h-screen gradient-subtle transition-colors duration-500 ${isDark ? 'dark' : ''}`}>
        {/* Minimal Premium Header */}
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40 safe-area-pt">
          <div className="container mx-auto px-5 lg:px-8 h-16 lg:h-18 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl gradient-islamic flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" opacity="0.9"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1" fill="none"/>
                </svg>
              </div>
              <div>
                <h1 className="font-display font-semibold text-xl lg:text-2xl tracking-tight text-foreground">Deen.</h1>
                <p className="text-[10px] lg:text-xs text-muted-foreground font-medium tracking-widest uppercase hidden sm:block">By Cardinal</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full w-9 h-9 hover:bg-primary/8"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <motion.section 
          initial="hidden" 
          animate="show" 
          variants={stagger}
          className="container mx-auto px-5 lg:px-8 pt-12 lg:pt-20 pb-8 lg:pb-12"
        >
          <motion.div variants={fadeUp} className="text-center max-w-3xl mx-auto">
            <div className="font-arabic text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-primary/90 leading-[1.8] mb-4">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <p className="text-muted-foreground text-sm lg:text-base mb-6">In the name of Allah, the Most Gracious, the Most Merciful</p>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/5 border border-primary/10">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-muted-foreground font-medium">Assalamu Alaikum — Peace be upon you</span>
            </div>
          </motion.div>
          
          <motion.div variants={fadeUp} className="mt-8 max-w-md mx-auto lg:max-w-lg">
            <NotificationPermission />
          </motion.div>
        </motion.section>

        {/* Main Content */}
        <main className="container mx-auto px-5 lg:px-8 pb-24 lg:pb-16">
          <motion.div 
            initial="hidden" 
            animate="show" 
            variants={stagger}
            className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {/* Main Column */}
            <div className="xl:col-span-3 lg:col-span-2 space-y-6 lg:space-y-8">
              <motion.div variants={fadeUp} id="prayer-times">
                <PrayerTimesCard />
              </motion.div>
              
              <motion.div variants={fadeUp}>
                <KaabaExperience />
              </motion.div>
              
              <motion.div variants={fadeUp}>
                <IslamicLessons />
              </motion.div>
              
              <motion.div variants={fadeUp}>
                <GuidedPrayerLauncher />
              </motion.div>
              
              <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <div id="quran-section"><QuranCard /></div>
                <div><DailyHadith /></div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1 lg:col-span-1 space-y-6 lg:space-y-8">
              <motion.div variants={fadeUp}>
                <LuxuryDigitalClock />
              </motion.div>
              <motion.div variants={fadeUp} id="dhikr-section">
                <DhikrCounter />
              </motion.div>
              <motion.div variants={fadeUp} id="qibla-section">
                <EnhancedQiblaCompass />
              </motion.div>
              <motion.div variants={fadeUp} id="calendar-section">
                <IslamicCalendar />
              </motion.div>
            </div>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/40 bg-card/50 pb-20 lg:pb-0">
          <div className="container mx-auto px-5 lg:px-8 py-10 lg:py-14 text-center">
            <div className="font-arabic text-xl lg:text-2xl text-primary/80 mb-3 leading-relaxed">
              بَارَكَ اللَّهُ فِيكُمْ
            </div>
            <p className="text-sm text-muted-foreground mb-6">May Allah bless you all</p>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/60">
              <span className="font-display">Deen.</span>
              <span>·</span>
              <span>By Cardinal</span>
              <span>·</span>
              <span>Built with reverence</span>
            </div>
          </div>
        </footer>

        <div className="lg:hidden">
          <MobileToolbar />
        </div>
      </div>
    </>
  );
};

export default Index;
