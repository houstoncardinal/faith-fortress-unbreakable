import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Clock, ChevronRight, X, Star, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { islamicLessons, categories, getLessonsByCategory, type IslamicLesson } from '@/data/islamicLessons';

const difficultyColors = {
  beginner: 'bg-emerald/10 text-emerald border-emerald/20',
  intermediate: 'bg-accent/10 text-accent border-accent/20',
  advanced: 'bg-destructive/10 text-destructive border-destructive/20'
};

function LessonCard({ lesson, onClick }: { lesson: IslamicLesson; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <button className="w-full text-left p-4 rounded-xl hover:bg-muted/40 transition-all border border-transparent hover:border-border/50" onClick={onClick}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="font-arabic text-lg text-primary mb-0.5">{lesson.arabicTitle}</div>
            <h4 className="font-semibold text-sm text-foreground">{lesson.title}</h4>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{lesson.description}</p>
            <div className="flex items-center gap-2 mt-2.5">
              <Badge variant="outline" className={`text-[10px] ${difficultyColors[lesson.difficulty]}`}>{lesson.difficulty}</Badge>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Clock className="w-3 h-3" />{lesson.duration}m
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground/40 mt-2 flex-shrink-0" />
        </div>
      </button>
    </motion.div>
  );
}

function LessonDetail({ lesson, onClose }: { lesson: IslamicLesson; onClose: () => void }) {
  return (
    <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden rounded-2xl">
      <DialogHeader className="p-6 pb-0">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-arabic text-2xl text-primary mb-1">{lesson.arabicTitle}</div>
            <DialogTitle className="font-display text-xl">{lesson.title}</DialogTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-xl"><X className="w-4 h-4" /></Button>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <Badge variant="outline" className={difficultyColors[lesson.difficulty]}>{lesson.difficulty}</Badge>
          <span className="flex items-center gap-1 text-sm text-muted-foreground"><Clock className="w-4 h-4" />{lesson.duration} min</span>
        </div>
      </DialogHeader>
      <ScrollArea className="h-[60vh] px-6 pb-6">
        <div className="space-y-6 pt-4">
          {lesson.arabicQuote && (
            <div className="bg-primary/3 p-5 rounded-xl border border-primary/8">
              <div className="font-arabic text-xl text-primary text-center leading-[2] mb-3">{lesson.arabicQuote}</div>
              <p className="text-center text-sm text-muted-foreground italic">"{lesson.quoteTranslation}"</p>
              {lesson.quoteSource && <p className="text-center text-xs text-muted-foreground/60 mt-2">— {lesson.quoteSource}</p>}
            </div>
          )}
          <div className="space-y-4">
            {lesson.content.map((p, i) => <p key={i} className="text-sm text-foreground/80 leading-relaxed">{p}</p>)}
          </div>
          <div className="bg-muted/40 p-5 rounded-xl">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2"><Star className="w-4 h-4 text-accent" />Key Points</h4>
            <ul className="space-y-2">
              {lesson.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Sparkles className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" /><span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ScrollArea>
    </DialogContent>
  );
}

export default function IslamicLessons() {
  const [selectedCategory, setSelectedCategory] = useState<string>('pillars');
  const [selectedLesson, setSelectedLesson] = useState<IslamicLesson | null>(null);
  const filteredLessons = getLessonsByCategory(selectedCategory as IslamicLesson['category']);

  return (
    <Card className="card-elevated overflow-hidden">
      <CardContent className="p-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">Islamic Knowledge</h3>
            <p className="text-xs text-muted-foreground">Explore the foundations of Islam</p>
          </div>
        </div>

        <ScrollArea className="w-full pb-2">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <Button key={cat.id} variant={selectedCategory === cat.id ? 'default' : 'outline'} size="sm" onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 rounded-xl ${selectedCategory === cat.id ? 'gradient-islamic border-0 text-white' : ''}`}>
                <span className="mr-1.5">{cat.icon}</span>{cat.name}
              </Button>
            ))}
          </div>
        </ScrollArea>

        <div className="space-y-1">
          <AnimatePresence mode="popLayout">
            {filteredLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} onClick={() => setSelectedLesson(lesson)} />
            ))}
          </AnimatePresence>
          {filteredLessons.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-20" />
              <p className="text-sm">More lessons coming soon</p>
            </div>
          )}
        </div>
      </CardContent>

      <Dialog open={!!selectedLesson} onOpenChange={() => setSelectedLesson(null)}>
        {selectedLesson && <LessonDetail lesson={selectedLesson} onClose={() => setSelectedLesson(null)} />}
      </Dialog>
    </Card>
  );
}
