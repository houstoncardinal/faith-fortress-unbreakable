
import { Book, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const QuranCard = () => {
  return (
    <Card className="border-primary/20 shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-primary">
          <Book className="w-5 h-5" />
          Today's Verse
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-3">
          <div className="font-arabic text-2xl leading-relaxed text-primary border-l-4 border-accent pl-4 py-2">
            وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا
          </div>
          <div className="text-sm text-muted-foreground italic">
            "And whoever fears Allah - He will make for him a way out."
          </div>
          <div className="text-xs text-muted-foreground font-medium">
            Surah At-Talaq (65:2)
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2 flex-1">
            <Heart className="w-4 h-4" />
            Save
          </Button>
          <Button size="sm" className="flex-1 gradient-islamic border-0">
            Read More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuranCard;
