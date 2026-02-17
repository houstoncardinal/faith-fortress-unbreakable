import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Sparkles, BookOpen, Heart, Loader2, AlertCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIslamicAI } from '@/hooks/useIslamicAI';

function SimpleMarkdown({ content }: { content: string }) {
  // Simple markdown renderer - handles bold, italic, headers, lists, code
  const lines = content.split('\n');
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        if (!line.trim()) return <br key={i} />;
        // Headers
        if (line.startsWith('### ')) return <h4 key={i} className="font-semibold text-sm mt-2">{line.slice(4)}</h4>;
        if (line.startsWith('## ')) return <h3 key={i} className="font-semibold text-sm mt-2">{line.slice(3)}</h3>;
        if (line.startsWith('# ')) return <h2 key={i} className="font-semibold text-base mt-2">{line.slice(2)}</h2>;
        // List items
        if (line.match(/^[-*] /)) return <li key={i} className="ml-4 list-disc text-sm">{formatInline(line.slice(2))}</li>;
        if (line.match(/^\d+\. /)) return <li key={i} className="ml-4 list-decimal text-sm">{formatInline(line.replace(/^\d+\.\s/, ''))}</li>;
        return <p key={i} className="text-sm">{formatInline(line)}</p>;
      })}
    </div>
  );
}

function formatInline(text: string) {
  // Handle **bold** and *italic*
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('*') && part.endsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}

const QUICK_PROMPTS = [
  { icon: '🤲', label: 'Morning Dua', message: 'What are the authentic morning duas from the Sunnah? Please include Arabic text, transliteration, and translation.' },
  { icon: '📖', label: 'Surah Al-Fatiha', message: 'Explain the deep meaning and significance of Surah Al-Fatiha with Tafsir insights.' },
  { icon: '🕌', label: 'Prayer Guide', message: 'Guide me through how to pray Fajr step by step with all the Arabic recitations.' },
  { icon: '✨', label: 'Prophet Stories', message: 'Tell me the story of Prophet Ibrahim (AS) and the building of the Kaaba.' },
];

export default function IslamicAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { messages, isLoading, error, sendMessage, clearMessages, setError } = useIslamicAI();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating AI Button */}
      <motion.div
        className="fixed bottom-24 right-4 lg:bottom-8 lg:right-8 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-2xl gradient-luxury border-0 shadow-luxury-xl hover:shadow-glow-primary transition-all duration-300 group"
          size="icon"
        >
          <Sparkles className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </Button>
        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-accent border-2 border-background animate-pulse" />
      </motion.div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 lg:inset-auto lg:bottom-8 lg:right-8 lg:w-[420px] lg:h-[600px] z-50 flex flex-col"
          >
            <Card className="flex-1 flex flex-col overflow-hidden border-primary/15 shadow-luxury-xl bg-card/95 backdrop-blur-xl">
              {/* Header */}
              <div className="p-4 border-b border-border/50 bg-gradient-to-r from-primary/[0.06] to-accent/[0.04]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl gradient-luxury flex items-center justify-center shadow-md">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Islamic AI Scholar</h3>
                      <p className="text-[10px] text-muted-foreground">Powered by authentic sources</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {messages.length > 0 && (
                      <Button variant="ghost" size="icon" onClick={clearMessages} className="w-8 h-8 rounded-xl">
                        <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-xl">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center px-4">
                    <div className="w-16 h-16 rounded-2xl gradient-luxury flex items-center justify-center mb-4 shadow-luxury-lg">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-base mb-1">Assalamu Alaikum</h4>
                    <p className="text-xs text-muted-foreground mb-6">Ask me anything about Islam — prayers, Quran, Hadith, history, and more.</p>
                    <div className="grid grid-cols-2 gap-2 w-full">
                      {QUICK_PROMPTS.map((qp, i) => (
                        <button
                          key={i}
                          onClick={() => sendMessage(qp.message)}
                          className="text-left p-3 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-primary/[0.04] transition-all text-xs"
                        >
                          <span className="text-base mb-1 block">{qp.icon}</span>
                          <span className="font-medium">{qp.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'gradient-islamic text-white rounded-br-md'
                          : 'bg-muted/50 border border-border/30 rounded-bl-md'
                      }`}>
                        {msg.role === 'assistant' ? (
                          <div className="[&_p]:mb-2 [&_ul]:mb-2 [&_ol]:mb-2 [&_li]:mb-0.5 [&_h2]:text-sm [&_h3]:text-sm [&_h2]:font-semibold [&_h3]:font-medium">
                            <SimpleMarkdown content={msg.content} />
                          </div>
                        ) : msg.content}
                      </div>
                    </motion.div>
                  ))
                )}
                {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
                  <div className="flex justify-start">
                    <div className="bg-muted/50 rounded-2xl rounded-bl-md px-4 py-3 border border-border/30">
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    </div>
                  </div>
                )}
              </div>

              {/* Error */}
              {error && (
                <div className="mx-4 mb-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                  <p className="text-xs text-destructive">{error}</p>
                  <button onClick={() => setError(null)} className="ml-auto">
                    <X className="w-3 h-3 text-destructive" />
                  </button>
                </div>
              )}

              {/* Input */}
              <div className="p-3 border-t border-border/50 bg-card">
                <div className="flex items-end gap-2">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about Islam..."
                    rows={1}
                    className="flex-1 resize-none rounded-xl border border-border/50 bg-muted/30 px-4 py-3 text-sm focus:outline-none focus:border-primary/40 transition-colors placeholder:text-muted-foreground/50"
                    style={{ maxHeight: '100px' }}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    size="icon"
                    className="w-11 h-11 rounded-xl gradient-islamic border-0 shadow-md hover:shadow-lg transition-all disabled:opacity-40"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </Button>
                </div>
                <p className="text-[9px] text-muted-foreground/50 text-center mt-2">AI responses reference Quran & authentic Hadith. Always verify with scholars.</p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
