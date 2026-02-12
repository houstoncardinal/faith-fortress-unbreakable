import { Book, Heart, MessageSquareHeart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const QuranCard = () => {
  return (
    <Card className="card-elevated overflow-hidden h-full">
      <CardContent className="p-6 space-y-5 h-full flex flex-col">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <Book className="w-4 h-4 text-primary" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground">Today's Verse</h3>
        </div>

        <div className="flex-1 space-y-4">
          <div className="bg-primary/3 rounded-xl p-5 border border-primary/8">
            <div className="font-arabic text-2xl leading-[2] text-primary text-center">
              وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا
            </div>
          </div>
          <p className="text-sm text-muted-foreground italic text-center leading-relaxed">
            "And whoever fears Allah — He will make for him a way out."
          </p>
          <p className="text-xs text-center text-muted-foreground/70 font-medium">Surah At-Talaq · 65:2</p>
        </div>
        
        <div className="space-y-2 pt-2">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2 flex-1 rounded-xl">
              <Heart className="w-3.5 h-3.5" />
              Save
            </Button>
            <Button size="sm" className="flex-1 gradient-islamic border-0 rounded-xl text-white">
              Read More
            </Button>
          </div>
          <Link to="/duas">
            <Button variant="ghost" size="sm" className="w-full gap-2 text-muted-foreground hover:text-primary rounded-xl">
              <MessageSquareHeart className="w-3.5 h-3.5" />
              Explore Duas & Supplications
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuranCard;
