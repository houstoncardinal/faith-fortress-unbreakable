import { BookOpen, Share2, Sparkles, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const DailyHadith = () => {
  return (
    <Card className="border-0 shadow-luxury-lg overflow-hidden h-full group hover:shadow-luxury-xl transition-all duration-500">
      {/* Top accent line */}
      <div className="h-0.5 bg-gradient-to-r from-accent/60 via-primary/60 to-accent/60" />

      <CardContent className="p-6 space-y-5 h-full flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/[0.08] flex items-center justify-center group-hover:bg-accent/[0.12] transition-colors">
              <BookOpen className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-base">Hadith of the Day</h3>
              <p className="text-[10px] text-muted-foreground">Prophetic Wisdom</p>
            </div>
          </div>
          <Sparkles className="w-4 h-4 text-primary/40" />
        </div>

        <div className="flex-1 space-y-4">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-br from-accent/[0.05] to-primary/[0.03] rounded-2xl p-6 border border-accent/[0.08] relative overflow-hidden"
          >
            <div className="absolute bottom-2 left-3 text-4xl opacity-[0.04] font-arabic">❝</div>
            <div className="font-arabic text-xl leading-[2.2] text-primary text-right relative">
              مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ
            </div>
          </motion.div>
          
          <p className="text-sm text-foreground/80 leading-relaxed italic">
            "Whoever believes in Allah and the Last Day should speak good or remain silent."
          </p>
          
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground/70">
            <span className="px-2 py-1 rounded-lg bg-muted/50 font-medium">Abu Huraira (RA)</span>
            <span className="px-2 py-1 rounded-lg bg-muted/50">Sahih al-Bukhari 6018</span>
          </div>

          <div className="bg-gradient-to-r from-muted/40 to-muted/20 p-4 rounded-xl border border-border/30">
            <p className="text-[10px] font-medium text-foreground/60 mb-1 uppercase tracking-wider">Reflection</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This hadith teaches us the importance of mindful speech. Before speaking, consider whether your words bring benefit.
            </p>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="gap-2 flex-1 rounded-xl border-border/50 hover:border-accent/30 hover:bg-accent/[0.04] transition-all">
            <Share2 className="w-3.5 h-3.5" />
            Share
          </Button>
          <Button size="sm" className="flex-1 gradient-islamic border-0 rounded-xl text-white shadow-md hover:shadow-lg transition-all">
            More Hadiths
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyHadith;
