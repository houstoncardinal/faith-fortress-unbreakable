import { useState } from 'react';
import { Clock, Book, Navigation, Calendar, Heart, MoreHorizontal, MessageSquareHeart } from 'lucide-react';
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

  const items = [
    { id: 'prayer', icon: Clock, label: 'Prayer', action: () => scrollToSection('prayer-times') },
    { id: 'quran', icon: Book, label: 'Quran', action: () => scrollToSection('quran-section') },
    { id: 'qibla', icon: Navigation, label: 'Qibla', action: () => scrollToSection('qibla-section') },
    { id: 'dhikr', icon: Heart, label: 'Dhikr', action: () => scrollToSection('dhikr-section') },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="mx-3 mb-3 safe-area-pb">
        <div className="flex items-center justify-around bg-card/95 backdrop-blur-xl rounded-2xl shadow-xl border border-border/40 px-2 py-2">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={item.action}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200 ${
                activeSection === item.id
                  ? 'text-primary bg-primary/8'
                  : 'text-muted-foreground'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
          
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center gap-1 py-2 px-4 rounded-xl text-muted-foreground">
                <MoreHorizontal className="w-5 h-5" />
                <span className="text-[10px] font-medium">More</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl">
              <SheetHeader>
                <SheetTitle className="font-display text-center">More Features</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-3 pb-6">
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => scrollToSection('calendar-section')}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-muted/40 hover:bg-muted/60 transition-colors"
                  >
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">Calendar</span>
                  </button>
                  <Link to="/duas">
                    <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-muted/40 hover:bg-muted/60 transition-colors">
                      <MessageSquareHeart className="w-5 h-5 text-accent" />
                      <span className="text-sm font-medium">Duas</span>
                    </div>
                  </Link>
                </div>
                <div className="text-center p-4 rounded-2xl bg-primary/3 border border-primary/8">
                  <div className="font-arabic text-lg text-primary mb-1">بَارَكَ اللَّهُ فِيكُمْ</div>
                  <p className="text-xs text-muted-foreground">May Allah bless you</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default MobileToolbar;
