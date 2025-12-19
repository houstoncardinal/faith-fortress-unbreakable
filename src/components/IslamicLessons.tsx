import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Clock, ChevronRight, X, Star, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { islamicLessons, categories, getLessonsByCategory, type IslamicLesson } from '@/data/islamicLessons';

const difficultyColors = {
  beginner: 'bg-green-500/10 text-green-600 border-green-500/20',
  intermediate: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  advanced: 'bg-red-500/10 text-red-600 border-red-500/20'
};

interface LessonCardProps {
  lesson: IslamicLesson;
  onClick: () => void;
}

function LessonCard({ lesson, onClick }: LessonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className="cursor-pointer hover:shadow-lg transition-all border-primary/10 hover:border-primary/30 bg-gradient-to-br from-card to-primary/5"
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="font-arabic text-lg text-primary mb-1">{lesson.arabicTitle}</div>
              <h4 className="font-semibold text-foreground mb-1">{lesson.title}</h4>
              <p className="text-sm text-muted-foreground line-clamp-2">{lesson.description}</p>
              
              <div className="flex items-center gap-2 mt-3">
                <Badge variant="outline" className={difficultyColors[lesson.difficulty]}>
                  {lesson.difficulty}
                </Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {lesson.duration} min
                </span>
              </div>
            </div>
            
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface LessonDetailProps {
  lesson: IslamicLesson;
  onClose: () => void;
}

function LessonDetail({ lesson, onClose }: LessonDetailProps) {
  return (
    <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden">
      <DialogHeader className="p-6 pb-0">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-arabic text-2xl text-primary mb-2">{lesson.arabicTitle}</div>
            <DialogTitle className="text-xl">{lesson.title}</DialogTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2 mt-3">
          <Badge variant="outline" className={difficultyColors[lesson.difficulty]}>
            {lesson.difficulty}
          </Badge>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            {lesson.duration} minutes
          </span>
        </div>
      </DialogHeader>
      
      <ScrollArea className="h-[60vh] px-6 pb-6">
        <div className="space-y-6">
          {/* Featured Quote */}
          {lesson.arabicQuote && (
            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-5 rounded-xl border border-primary/20">
              <div className="font-arabic text-xl text-primary text-center mb-3 leading-relaxed">
                {lesson.arabicQuote}
              </div>
              <p className="text-center text-muted-foreground italic">
                "{lesson.quoteTranslation}"
              </p>
              {lesson.quoteSource && (
                <p className="text-center text-xs text-muted-foreground mt-2">
                  — {lesson.quoteSource}
                </p>
              )}
            </div>
          )}
          
          {/* Content */}
          <div className="space-y-4">
            {lesson.content.map((paragraph, index) => (
              <p key={index} className="text-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          
          {/* Key Points */}
          <div className="bg-muted/50 p-5 rounded-xl">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Star className="w-4 h-4 text-accent" />
              Key Points
            </h4>
            <ul className="space-y-2">
              {lesson.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{point}</span>
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
    <Card className="border-primary/20 shadow-xl bg-gradient-to-br from-card to-primary/5">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <span className="text-xl">Islamic Knowledge</span>
            <p className="text-sm text-muted-foreground font-normal mt-0.5">
              Explore the foundations of Islam
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Category Tabs */}
        <ScrollArea className="w-full pb-2">
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex-shrink-0"
              >
                <span className="mr-1.5">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </ScrollArea>
        
        {/* Lessons List */}
        <div className="grid gap-3">
          <AnimatePresence mode="popLayout">
            {filteredLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                onClick={() => setSelectedLesson(lesson)}
              />
            ))}
          </AnimatePresence>
          
          {filteredLessons.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>More lessons coming soon in this category</p>
            </div>
          )}
        </div>
      </CardContent>
      
      {/* Lesson Detail Dialog */}
      <Dialog open={!!selectedLesson} onOpenChange={() => setSelectedLesson(null)}>
        {selectedLesson && (
          <LessonDetail 
            lesson={selectedLesson} 
            onClose={() => setSelectedLesson(null)} 
          />
        )}
      </Dialog>
    </Card>
  );
}
