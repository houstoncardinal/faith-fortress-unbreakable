
import { Calendar, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const IslamicCalendar = () => {
  const today = new Date();
  const islamicDate = "15 Jumada al-Awwal 1446";
  
  const upcomingEvents = [
    { name: "Lailat al-Miraj", date: "27 Rajab", days: 45, arabic: "ليلة المعراج" },
    { name: "Ramadan Begins", date: "1 Ramadan", days: 89, arabic: "رمضان" },
    { name: "Lailat al-Qadr", date: "27 Ramadan", days: 115, arabic: "ليلة القدر" }
  ];

  return (
    <Card className="border-accent/30 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-primary">
          <Calendar className="w-5 h-5" />
          Islamic Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Today's Islamic Date</div>
          <div className="font-semibold text-lg text-primary">{islamicDate}</div>
          <div className="font-arabic text-xl mt-2 text-accent">
            ١٥ جمادى الأولى ١٤٤٦
          </div>
        </div>

        <div className="space-y-3">
          <div className="font-medium text-sm text-primary mb-2">Upcoming Events</div>
          {upcomingEvents.map((event, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <Star className="w-4 h-4 text-accent" />
                <div>
                  <div className="font-medium text-sm">{event.name}</div>
                  <div className="font-arabic text-xs text-muted-foreground">{event.arabic}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-primary">{event.date}</div>
                <div className="text-xs text-muted-foreground">in {event.days} days</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center p-3 bg-accent/10 rounded-lg">
          <div className="font-arabic text-lg text-primary mb-1">
            أَللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا
          </div>
          <div className="text-xs text-muted-foreground italic">
            "O Allah, bless us in what You have provided for us"
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IslamicCalendar;
