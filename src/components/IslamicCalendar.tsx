import { Calendar, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const IslamicCalendar = () => {
  const islamicDate = "15 Jumada al-Awwal 1446";
  
  const upcomingEvents = [
    { name: "Lailat al-Miraj", date: "27 Rajab", days: 45, arabic: "ليلة المعراج" },
    { name: "Ramadan Begins", date: "1 Ramadan", days: 89, arabic: "رمضان" },
    { name: "Lailat al-Qadr", date: "27 Ramadan", days: 115, arabic: "ليلة القدر" }
  ];

  return (
    <Card className="card-elevated overflow-hidden">
      <CardContent className="p-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-primary" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground">Islamic Calendar</h3>
        </div>

        <div className="text-center p-5 bg-primary/5 rounded-xl border border-primary/8">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Today's Islamic Date</p>
          <p className="font-display text-lg font-semibold text-primary">{islamicDate}</p>
          <div className="font-arabic text-xl mt-1 text-accent">١٥ جمادى الأولى ١٤٤٦</div>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Upcoming</p>
          {upcomingEvents.map((event, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/40 transition-colors">
              <div className="flex items-center gap-3">
                <Star className="w-3.5 h-3.5 text-accent" />
                <div>
                  <p className="font-medium text-sm">{event.name}</p>
                  <p className="font-arabic text-xs text-muted-foreground">{event.arabic}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-primary">{event.date}</p>
                <p className="text-[10px] text-muted-foreground">{event.days}d away</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default IslamicCalendar;
