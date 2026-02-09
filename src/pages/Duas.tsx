
import { useState } from "react";
import { Heart, Search, Book, ArrowLeft, Copy, Share } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface Dua {
  id: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference?: string;
  situation: string;
}

const Duas = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  const duasData: Dua[] = [
    {
      id: "1",
      title: "Before Exams/Studies",
      arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
      transliteration: "Rabbi ishrah li sadri wa yassir li amri",
      translation: "My Lord, expand for me my breast and ease for me my task",
      reference: "Quran 20:25-26",
      situation: "study"
    },
    {
      id: "2",
      title: "For Anxiety & Stress",
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
      transliteration: "Allahumma inni a'udhu bika min al-hammi wal-hazan",
      translation: "O Allah, I seek refuge in You from anxiety and sorrow",
      reference: "Sahih Bukhari",
      situation: "stress"
    },
    {
      id: "3",
      title: "Before Travel",
      arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ",
      transliteration: "Subhan alladhi sakhkhara lana hadha wa ma kunna lahu muqrinin",
      translation: "Exalted is He who has subjected this to us, and we could not have [otherwise] subdued it",
      reference: "Quran 43:13",
      situation: "travel"
    },
    {
      id: "4",
      title: "For Marriage & Relationships",
      arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ",
      transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yun",
      translation: "Our Lord, grant us from among our wives and offspring comfort to our eyes",
      reference: "Quran 25:74",
      situation: "family"
    },
    {
      id: "5",
      title: "For Forgiveness",
      arabic: "رَبِّ اغْفِرْ لِي ذَنْبِي وَخَطَئِي وَجَهْلِي",
      transliteration: "Rabbi ighfir li dhanbi wa khata'i wa jahli",
      translation: "My Lord, forgive me my sin and my error and my ignorance",
      reference: "Sahih Bukhari",
      situation: "forgiveness"
    },
    {
      id: "6",
      title: "For Health & Healing",
      arabic: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَاسَ اشْفِ أَنْتَ الشَّافِي",
      transliteration: "Allahumma Rabb an-nas, adhhib al-ba's, ishfi anta ash-shafi",
      translation: "O Allah, Lord of mankind, remove the hardship and heal, You are the Healer",
      reference: "Sahih Bukhari",
      situation: "health"
    },
    {
      id: "7",
      title: "For Financial Difficulties",
      arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
      transliteration: "Allahumma ikfini bi halalika 'an haramika wa aghnini bi fadlika 'amman siwaka",
      translation: "O Allah, make what is lawful enough for me, as opposed to what is unlawful, and spare me by Your grace from need of others",
      reference: "Tirmidhi",
      situation: "financial"
    },
    {
      id: "8",
      title: "Before Sleep",
      arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
      transliteration: "Bismika Allahumma amutu wa ahya",
      translation: "In Your name, O Allah, I live and die",
      reference: "Sahih Bukhari",
      situation: "daily"
    }
  ];

  const categories = [
    { id: "all", label: "All Duas", icon: Book },
    { id: "daily", label: "Daily Life", icon: Heart },
    { id: "study", label: "Studies", icon: Book },
    { id: "stress", label: "Stress & Anxiety", icon: Heart },
    { id: "travel", label: "Travel", icon: Book },
    { id: "family", label: "Family", icon: Heart },
    { id: "health", label: "Health", icon: Heart },
    { id: "financial", label: "Financial", icon: Book },
    { id: "forgiveness", label: "Forgiveness", icon: Heart }
  ];

  const filteredDuas = duasData.filter(dua => 
    dua.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dua.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dua.transliteration.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDuasByCategory = (category: string) => {
    if (category === "all") return filteredDuas;
    return filteredDuas.filter(dua => dua.situation === category);
  };

  const toggleFavorite = (duaId: string) => {
    setFavorites(prev => 
      prev.includes(duaId) 
        ? prev.filter(id => id !== duaId)
        : [...prev, duaId]
    );
  };

  const copyDua = (dua: Dua) => {
    const text = `${dua.title}\n\n${dua.arabic}\n\n${dua.transliteration}\n\n${dua.translation}\n\n- ${dua.reference || 'Islamic Tradition'}`;
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Dua has been copied to your clipboard"
    });
  };

  const shareDua = (dua: Dua) => {
    if (navigator.share) {
      navigator.share({
        title: dua.title,
        text: `${dua.arabic}\n\n${dua.translation}\n\n- ${dua.reference || 'Islamic Tradition'}`
      });
    } else {
      copyDua(dua);
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Islamic Duas & Supplications",
    "description": "Comprehensive collection of authentic Islamic duas and supplications for every life situation with Arabic text, transliteration, and translation",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": duasData.map((dua, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Article",
          "name": dua.title,
          "description": dua.translation,
          "inLanguage": ["ar", "en"],
          "text": dua.arabic
        }
      }))
    }
  };

  return (
    <>
      <SEOHead
        title="Islamic Duas & Supplications | Authentic Prayer Collection | Deen. By Cardinal"
        description="Discover authentic Islamic duas and supplications for every life situation. Complete collection with Arabic text, transliteration, and English translation. Perfect for daily prayers, stress relief, travel, studies, and more."
        keywords="Islamic duas, Muslim supplications, Arabic prayers, Islamic prayer collection, daily duas, travel duas, study prayers, anxiety relief prayers, authentic supplications, Quran duas"
        ogImage="/src/assets/og-duas.jpg"
        canonical="https://deen-app.com/duas"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-primary/10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Duas & Supplications
              </h1>
              <p className="text-xs text-muted-foreground font-medium">
                Divine guidance for every situation
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <div className="font-arabic text-3xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary mb-4 leading-relaxed">
            ادْعُونِي أَسْتَجِبْ لَكُمْ
          </div>
          <p className="text-muted-foreground mb-2 font-medium">
            "Call upon Me; I will respond to you"
          </p>
          <p className="text-sm text-muted-foreground">Quran 40:60</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search duas by situation, translation, or title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Categories Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 mb-6">
            {categories.slice(0, 5).map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex items-center gap-2 text-xs"
              >
                <category.icon className="w-3 h-3" />
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid gap-6">
                {getDuasByCategory(category.id).map((dua) => (
                  <Card key={dua.id} className="border-primary/20 shadow-md hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg text-primary flex items-center gap-2">
                          <Book className="w-5 h-5" />
                          {dua.title}
                        </CardTitle>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleFavorite(dua.id)}
                            className={favorites.includes(dua.id) ? "text-red-500" : "text-muted-foreground"}
                          >
                            <Heart className={`w-4 h-4 ${favorites.includes(dua.id) ? "fill-current" : ""}`} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => copyDua(dua)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => shareDua(dua)}
                          >
                            <Share className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Arabic Text */}
                      <div className="text-center">
                        <div className="font-arabic text-2xl leading-relaxed text-primary bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-lg border-r-4 border-accent">
                          {dua.arabic}
                        </div>
                      </div>
                      
                      {/* Transliteration */}
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground italic bg-muted/30 p-3 rounded-lg">
                          {dua.transliteration}
                        </div>
                      </div>
                      
                      {/* Translation */}
                      <div className="text-center">
                        <div className="text-foreground font-medium bg-gradient-to-r from-background to-primary/5 p-4 rounded-lg border border-primary/10">
                          "{dua.translation}"
                        </div>
                      </div>
                      
                      {/* Reference */}
                      {dua.reference && (
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground">
                            - {dua.reference}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                
                {getDuasByCategory(category.id).length === 0 && (
                  <div className="text-center py-12">
                    <Book className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No duas found for this search.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Islamic Guidance Section */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-8 rounded-2xl border border-primary/20 shadow-lg">
            <div className="font-arabic text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4 leading-relaxed">
              وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ
            </div>
            <p className="text-muted-foreground italic font-medium mb-2">
              "And your Lord says: Call upon Me; I will respond to you."
            </p>
            <p className="text-sm text-muted-foreground">Quran 40:60</p>
          </div>
        </div>
      </main>
      </div>
    </>
  );
};

export default Duas;
