
import { useState } from 'react';
import { Clock, Book, Navigation, Calendar, Heart, Settings, MessageSquareHeart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Link } from 'react-router-dom';

const MobileToolbar = () => {
  const [activeSection, setActiveSection] = useState<string>('prayer');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const toolbarItems = [
    { id: 'prayer', icon: Clock, label: 'Prayer', action: () => scrollToSection('prayer-times') },
    { id: 'quran', icon: Book, label: 'Quran', action: () => scrollToSection('quran-section') },
    { id: 'qibla', icon: Navigation, label: 'Qibla', action: () => scrollToSection('qibla-section') },
    { id: 'calendar', icon: Calendar, label: 'Calendar', action: () => scrollToSection('calendar-section') },
    { id: 'dhikr', icon: Heart, label: 'Dhikr', action: () => scrollToSection('dhikr-section') },
  ];

  return (
    <>
      {/* Luxury Mobile Toolbar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        {/* Gradient edge glow */}
        <div className="absolute -top-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

        {/* Glass background */}
        <div className="mx-2 mb-2 rounded-2xl bg-white/80 dark:bg-black/60 backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-luxury-xl safe-area-pb"
             style={{ WebkitBackdropFilter: 'blur(40px) saturate(200%)' }}>
          <div className="flex items-center justify-around px-1 py-1.5">
            {toolbarItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className={`relative flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground active:scale-95'
                  }`}
                >
                  {/* Active glow background */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl bg-primary/10 shadow-glow-primary" />
                  )}

                  <div className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
                    <item.icon className={`w-5 h-5 transition-all duration-300 ${isActive ? 'drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)]' : ''}`} />
                  </div>
                  <span className={`relative z-10 text-[10px] font-semibold tracking-wide transition-all duration-300 ${
                    isActive ? 'text-primary' : ''
                  }`}>
                    {item.label}
                  </span>

                  {/* Active dot indicator */}
                  {isActive && (
                    <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent shadow-glow-accent" />
                  )}
                </button>
              );
            })}

            {/* More / Settings */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl text-muted-foreground active:scale-95 transition-all duration-300">
                  <Settings className="w-5 h-5" />
                  <span className="text-[10px] font-semibold tracking-wide">More</span>
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-3xl border-t-0">
                {/* Sheet handle */}
                <div className="flex justify-center pt-2 pb-4">
                  <div className="w-10 h-1 rounded-full bg-muted-foreground/20" />
                </div>
                <SheetHeader>
                  <SheetTitle className="text-center text-lg">Settings & More</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4 pb-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-20 flex flex-col gap-2 rounded-2xl border-primary/15 shadow-luxury hover:shadow-luxury-lg transition-all">
                      <Settings className="w-6 h-6 text-primary" />
                      <span className="text-sm font-medium">Settings</span>
                    </Button>
                    <Link to="/duas">
                      <Button variant="outline" className="h-20 flex flex-col gap-2 w-full rounded-2xl border-accent/15 shadow-luxury hover:shadow-luxury-lg transition-all">
                        <MessageSquareHeart className="w-6 h-6 text-accent" />
                        <span className="text-sm font-medium">Duas</span>
                      </Button>
                    </Link>
                  </div>
                  <div className="bg-gradient-to-r from-primary/8 via-accent/8 to-primary/8 p-5 rounded-2xl text-center border border-primary/10">
                    <div className="font-arabic text-xl text-primary mb-2 leading-relaxed">
                      بَارَكَ اللَّهُ فِيكُمْ
                    </div>
                    <p className="text-sm text-muted-foreground">May Allah bless you</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-20 md:hidden" />
    </>
  );
};

export default MobileToolbar;
