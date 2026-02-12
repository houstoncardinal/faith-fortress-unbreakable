import { useState, useEffect } from 'react';
import { Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const NotificationPermission = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [showCard, setShowCard] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
      setShowCard(Notification.permission === 'default');
    }
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      try {
        const result = await Notification.requestPermission();
        setPermission(result);
        if (result === 'granted') {
          toast({ title: "🕌 Notifications Enabled", description: "You'll receive azaan alerts at prayer times.", duration: 3000 });
          setShowCard(false);
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    }
  };

  if (!showCard && permission !== 'default') return null;

  return (
    <div className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-accent/5 border border-accent/10">
      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
        {permission === 'granted' ? <Bell className="w-5 h-5 text-accent" /> : <BellOff className="w-5 h-5 text-accent" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-foreground">Prayer Notifications</p>
        <p className="text-xs text-muted-foreground">Get azaan alerts at prayer times</p>
      </div>
      <Button onClick={requestPermission} size="sm" className="gradient-islamic border-0 rounded-xl text-white flex-shrink-0">
        Enable
      </Button>
    </div>
  );
};

export default NotificationPermission;
