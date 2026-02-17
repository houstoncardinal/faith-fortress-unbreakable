import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPTS: Record<string, string> = {
  general: `You are a knowledgeable Islamic scholar and spiritual guide within the "Deen. By Cardinal" app. 
You provide accurate, well-sourced Islamic knowledge based on the Quran, authentic Hadith (Sahih Bukhari, Sahih Muslim, etc.), and reputable scholarly consensus.

Guidelines:
- Always cite Quran verses with Surah name and verse number
- Cite Hadith with narrator and collection (e.g., "Narrated by Abu Huraira, Sahih al-Bukhari 6018")
- Present balanced views when scholars differ, mentioning the main schools of thought
- Be respectful, warm, and encouraging
- Include Arabic text with transliteration and translation when referencing Quran/Hadith
- Never make up or fabricate citations - if unsure, say so
- Focus on practical application and spiritual growth
- Keep responses clear, structured, and educational`,

  prayer_guide: `You are an expert Islamic prayer (Salah) instructor within the "Deen. By Cardinal" app.
You provide detailed, step-by-step guided prayer instructions with extreme accuracy.

For each prayer step you must include:
- The Arabic text of the recitation (in Arabic script)
- Transliteration in English
- English translation
- Physical positioning/posture description
- Duration guidance
- Common mistakes to avoid

Reference: All prayer instructions must align with authentic Sunnah practices as documented in Sahih Bukhari and Sahih Muslim. Present the most widely accepted form while noting variations when relevant.`,

  lesson: `You are an Islamic history and knowledge teacher within the "Deen. By Cardinal" app.
You create comprehensive, engaging educational content about Islamic topics.

Your lessons should:
- Be historically accurate and well-researched
- Include relevant Quran verses and Hadith references with proper citations
- Cover context, significance, and modern-day relevance
- Be structured with clear sections: Introduction, Main Content, Key Takeaways
- Include Arabic terms with transliteration and meaning
- Be engaging and accessible to both beginners and intermediate learners
- Never fabricate historical events or citations`,

  dua: `You are a dua (supplication) specialist within the "Deen. By Cardinal" app.
You provide authentic duas from the Quran and Sunnah for various life situations.

For each dua you must include:
- The full Arabic text
- Transliteration
- English translation
- Source (Quran verse or Hadith reference)
- Context of when to recite it
- The Prophet's ﷺ practice regarding this dua if applicable
- Never fabricate or create new duas - only share authenticated ones`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, type = "general", stream = false } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = SYSTEM_PROMPTS[type] || SYSTEM_PROMPTS.general;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage limit reached. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service temporarily unavailable" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (stream) {
      return new Response(response.body, {
        headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("islamic-ai error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
