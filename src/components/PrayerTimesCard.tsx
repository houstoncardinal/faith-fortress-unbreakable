
import { Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrayerTimesCard = () => {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  const prayerTimes = [
    { name: "Fajr", time: "05:30", arabic: "الفجر" },
    { name: "Dhuhr", time: "12:45", arabic: "الظهر" },
    { name: "Asr", time: "16:20", arabic: "العصر" },
    { name: "Maghrib", time: "18:45", arabic: "المغرب" },
    { name: "Isha", time: "20:15", arabic: "العشاء" }
  ];

  const getNextPrayer = () => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    for (const prayer of prayerTimes) {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      const prayerMinutes = hours * 60 + minutes;
      if (prayerMinutes > currentMinutes) {
        return prayer;
      }
    }
    return prayerTimes[0]; // Next day's Fajr
  };

  const nextPrayer = getNextPrayer();

  return (
    <Card className="gradient-islamic text-white border-0 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="w-5 h-5" />
          Prayer Times
        </CardTitle>
        <div className="flex items-center gap-2 text-sm opacity-90">
          <MapPin className="w-4 h-4" />
          <span>Current Location</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
          <div className="text-sm opacity-90 mb-1">Next Prayer</div>
          <div className="flex justify-between items-center">
            <div>
              <div className="font-semibold">{nextPrayer.name}</div>
              <div className="font-arabic text-lg">{nextPrayer.arabic}</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{nextPrayer.time}</div>
              <div className="text-sm opacity-75">in 2h 30m</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {prayerTimes.map((prayer, index) => (
            <div key={index} className="flex justify-between items-center py-2 px-3 rounded-md bg-white/5">
              <div>
                <div className="font-medium text-sm">{prayer.name}</div>
                <div className="font-arabic text-xs opacity-75">{prayer.arabic}</div>
              </div>
              <div className="font-mono font-semibold text-sm">{prayer.time}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PrayerTimesCard;
