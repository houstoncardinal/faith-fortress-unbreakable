import { BookOpen, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DailyHadith = () => {
  return (
    <Card className="card-elevated overflow-hidden h-full">
      <CardContent className="p-6 space-y-5 h-full flex flex-col">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-accent" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground">Hadith of the Day</h3>
        </div>

        <div className="flex-1 space-y-4">
          <div className="bg-accent/5 rounded-xl p-5 border border-accent/10">
            <div className="font-arabic text-xl leading-[2] text-primary text-right">
              مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ
            </div>
          </div>
          
          <p className="text-sm text-foreground/80 leading-relaxed">
            "Whoever believes in Allah and the Last Day should speak good or remain silent."
          </p>
          
          <div className="text-xs text-muted-foreground space-y-0.5">
            <p><span className="font-medium">Narrated by:</span> Abu Huraira (RA)</p>
            <p><span className="font-medium">Source:</span> Sahih al-Bukhari 6018</p>
          </div>

          <div className="bg-muted/40 p-4 rounded-xl">
            <p className="text-xs font-medium text-foreground/70 mb-1">Reflection</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This hadith teaches us the importance of mindful speech. Before speaking, consider whether your words bring benefit.
            </p>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="gap-2 flex-1 rounded-xl">
            <Share2 className="w-3.5 h-3.5" />
            Share
          </Button>
          <Button size="sm" className="flex-1 gradient-islamic border-0 rounded-xl text-white">
            More Hadiths
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyHadith;
