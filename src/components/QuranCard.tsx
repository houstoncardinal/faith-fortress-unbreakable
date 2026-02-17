import { Book, Heart, MessageSquareHeart, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const QuranCard = () => {
  return (
    <Card className="border-0 shadow-luxury-lg overflow-hidden h-full group hover:shadow-luxury-xl transition-all duration-500">
      {/* Top accent line */}
      <div className="h-0.5 bg-gradient-to-r from-primary/60 via-accent/60 to-primary/60" />
      
      <CardContent className="p-6 space-y-5 h-full flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/[0.08] flex items-center justify-center group-hover:bg-primary/[0.12] transition-colors">
              <Book className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-base">Today's Verse</h3>
              <p className="text-[10px] text-muted-foreground">Daily Quran Inspiration</p>
            </div>
          </div>
          <Sparkles className="w-4 h-4 text-accent/40" />
        </div>

        <div className="flex-1 space-y-4">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-br from-primary/[0.05] to-accent/[0.03] rounded-2xl p-6 border border-primary/[0.08] relative overflow-hidden"
          >
            <div className="absolute top-2 right-3 text-4xl opacity-[0.04] font-arabic">﴿</div>
            <div className="font-arabic text-2xl leading-[2.2] text-primary text-center relative">
              وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا
            </div>
          </motion.div>
          <p className="text-sm text-foreground/80 italic text-center leading-relaxed">
            "And whoever fears Allah — He will make for him a way out."
          </p>
          <p className="text-[10px] text-center text-muted-foreground/60 font-medium tracking-wider uppercase">Surah At-Talaq · 65:2</p>
        </div>
        
        <div className="space-y-2 pt-2">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2 flex-1 rounded-xl border-border/50 hover:border-primary/30 hover:bg-primary/[0.04] transition-all">
              <Heart className="w-3.5 h-3.5" />
              Save
            </Button>
            <Button size="sm" className="flex-1 gradient-islamic border-0 rounded-xl text-white shadow-md hover:shadow-lg transition-all">
              Read More
            </Button>
          </div>
          <Link to="/duas">
            <Button variant="ghost" size="sm" className="w-full gap-2 text-muted-foreground hover:text-primary rounded-xl transition-all text-xs">
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
