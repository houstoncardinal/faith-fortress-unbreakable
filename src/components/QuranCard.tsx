
import { Book, Heart, MessageSquareHeart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const QuranCard = () => {
  return (
    <Card className="card-luxury border-2 border-islamic-green/50 shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader className="pb-4 bg-glass-green">
        <CardTitle className="flex items-center gap-3 text-islamic-green">
          <div className="p-2 bg-islamic-green/20 rounded-full border border-islamic-gold">
            <Book className="w-6 h-6 text-islamic-gold" />
          </div>
          <span className="text-xl">Today's Verse</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-islamic-gold/10 to-islamic-green/10 rounded-lg blur-sm"></div>
            <div className="relative font-arabic text-3xl leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-islamic-green to-islamic-gold border-l-4 border-islamic-gold pl-6 py-4 text-shadow">
              وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا
            </div>
          </div>
          <div className="text-base text-muted-foreground italic font-medium bg-glass-gold p-4 rounded-lg border border-islamic-gold/30">
            "And whoever fears Allah - He will make for him a way out."
          </div>
          <div className="text-sm text-islamic-green font-bold bg-islamic-green/10 px-4 py-2 rounded-full border border-islamic-green/30">
            Surah At-Talaq (65:2)
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 flex-1 border-islamic-green/30 hover:bg-glass-green hover:border-islamic-gold transition-all duration-300"
          >
            <Heart className="w-4 h-4 text-islamic-gold" />
            Save
          </Button>
          <Button size="sm" className="btn-luxury flex-1">
            Read More
          </Button>
        </div>
        
        <div className="pt-4 border-t-2 border-islamic-gold/20">
          <Link to="/duas">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full gap-2 border-islamic-gold/50 hover:bg-glass-gold hover:border-islamic-gold transition-all duration-300"
            >
              <MessageSquareHeart className="w-5 h-5 text-islamic-gold" />
              Explore Duas & Supplications
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuranCard;
