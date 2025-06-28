
import { useState } from 'react';
import { Clock, Book, Navigation, Calendar, Heart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

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
    {
      id: 'prayer',
      icon: Clock,
      label: 'Prayer',
      action: () => scrollToSection('prayer-times')
    },
    {
      id: 'quran',
      icon: Book,
      label: 'Quran',
      action: () => scrollToSection('quran-section')
    },
    {
      id: 'qibla',
      icon: Navigation,
      label: 'Qibla',
      action: () => scrollToSection('qibla-section')
    },
    {
      id: 'calendar',
      icon: Calendar,
      label: 'Calendar',
      action: () => scrollToSection('calendar-section')
    },
    {
      id: 'dhikr',
      icon: Heart,
      label: 'Dhikr',
      action: () => scrollToSection('dhikr-section')
    }
  ];

  return (
    <>
      {/* Mobile Toolbar - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-primary/10 shadow-lg md:hidden">
        <div className="flex items-center justify-around px-2 py-2 safe-area-pb">
          {toolbarItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={item.action}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 transition-all duration-200 ${
                activeSection === item.id
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          ))}
          
          {/* Settings Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center gap-1 h-auto py-2 px-3 text-muted-foreground hover:text-primary hover:bg-primary/5"
              >
                <Settings className="w-4 h-4" />
                <span className="text-xs font-medium">More</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[60vh]">
              <SheetHeader>
                <SheetTitle className="text-center">Settings & More</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-16 flex flex-col gap-2">
                    <Settings className="w-5 h-5" />
                    <span className="text-sm">Settings</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col gap-2">
                    <Heart className="w-5 h-5" />
                    <span className="text-sm">Favorites</span>
                  </Button>
                </div>
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-lg text-center">
                  <div className="font-arabic text-lg text-primary mb-2">
                    بَارَكَ اللَّهُ فِيكُمْ
                  </div>
                  <p className="text-sm text-muted-foreground">May Allah bless you</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Spacer for mobile toolbar */}
      <div className="h-16 md:hidden" />
    </>
  );
};

export default MobileToolbar;
