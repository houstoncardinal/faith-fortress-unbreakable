
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
      {/* Luxury Mobile Toolbar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-glass-gold border-t-2 border-islamic-gold shadow-2xl md:hidden">
        <div className="flex items-center justify-around px-2 py-3 safe-area-pb">
          {toolbarItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={item.action}
              className={`flex flex-col items-center gap-1 h-auto py-3 px-4 transition-all duration-300 rounded-xl ${
                activeSection === item.id
                  ? 'text-islamic-green bg-glass-green border-2 border-islamic-gold shadow-lg'
                  : 'text-muted-foreground hover:text-islamic-gold hover:bg-glass-gold border border-transparent hover:border-islamic-gold'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-semibold">{item.label}</span>
            </Button>
          ))}
          
          {/* Settings Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex flex-col items-center gap-1 h-auto py-3 px-4 text-muted-foreground hover:text-islamic-gold hover:bg-glass-gold border border-transparent hover:border-islamic-gold transition-all duration-300 rounded-xl"
              >
                <Settings className="w-5 h-5" />
                <span className="text-xs font-semibold">More</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[60vh] bg-glass-gold border-t-2 border-islamic-gold">
              <SheetHeader>
                <SheetTitle className="text-center text-2xl text-transparent bg-clip-text bg-gradient-to-r from-islamic-green to-islamic-gold">
                  Settings & More
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col gap-3 card-luxury border-2 border-islamic-green/30 hover:border-islamic-gold"
                  >
                    <Settings className="w-6 h-6 text-islamic-gold" />
                    <span className="text-sm font-semibold text-islamic-green">Settings</span>
                  </Button>
                  <Link to="/duas">
                    <Button 
                      variant="outline" 
                      className="h-20 flex flex-col gap-3 w-full card-luxury border-2 border-islamic-green/30 hover:border-islamic-gold"
                    >
                      <MessageSquareHeart className="w-6 h-6 text-islamic-gold" />
                      <span className="text-sm font-semibold text-islamic-green">Duas</span>
                    </Button>
                  </Link>
                </div>
                <div className="bg-glass-green p-6 rounded-xl text-center border-2 border-islamic-green/30 shadow-lg">
                  <div className="font-arabic text-2xl text-transparent bg-clip-text bg-gradient-to-r from-islamic-green to-islamic-gold mb-3 text-shadow">
                    بَارَكَ اللَّهُ فِيكُمْ
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">May Allah bless you</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Spacer for mobile toolbar */}
      <div className="h-20 md:hidden" />
    </>
  );
};

export default MobileToolbar;
