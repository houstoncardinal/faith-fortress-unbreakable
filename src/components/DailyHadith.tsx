
import { BookOpen, Share2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DailyHadith = () => {
  return (
    <Card className="border-primary/20 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-primary">
          <BookOpen className="w-5 h-5" />
          Hadith of the Day
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="font-arabic text-lg leading-relaxed text-primary border-r-4 border-accent pr-4 py-2">
            مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ
          </div>
          
          <div className="text-sm text-foreground leading-relaxed bg-muted/30 p-4 rounded-lg">
            "Whoever believes in Allah and the Last Day should speak good or remain silent."
          </div>
          
          <div className="text-xs text-muted-foreground">
            <strong>Narrated by:</strong> Abu Huraira (RA)
          </div>
          
          <div className="text-xs text-muted-foreground">
            <strong>Source:</strong> Sahih al-Bukhari 6018, Sahih Muslim 47
          </div>
        </div>

        <div className="bg-accent/10 p-3 rounded-lg">
          <div className="text-sm font-medium text-primary mb-1">Reflection</div>
          <div className="text-xs text-muted-foreground">
            This hadith teaches us the importance of mindful speech. Before speaking, we should consider whether our words will bring benefit or harm.
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2 flex-1">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
          <Button size="sm" className="flex-1 gradient-islamic border-0">
            More Hadiths
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyHadith;
