
import { useState, useEffect } from 'react';
import { Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const NotificationPermission = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [showCard, setShowCard] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check current notification permission
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
          toast({
            title: "🕌 Notifications Enabled",
            description: "You will now receive azaan notifications for prayer times.",
            duration: 3000,
          });
          setShowCard(false);
        } else {
          toast({
            title: "Notifications Disabled",
            description: "You can enable them later in your browser settings.",
            duration: 3000,
          });
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    }
  };

  if (!showCard && permission !== 'default') {
    return null;
  }

  return (
    <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 rounded-full">
            {permission === 'granted' ? (
              <Bell className="w-5 h-5 text-amber-600" />
            ) : (
              <BellOff className="w-5 h-5 text-amber-600" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-amber-900">Prayer Notifications</h3>
            <p className="text-sm text-amber-700">
              Enable notifications to receive azaan alerts at prayer times
            </p>
          </div>
          <Button
            onClick={requestPermission}
            size="sm"
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            Enable
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationPermission;
