
export interface PrayerStep {
  id: number;
  arabic: string;
  transliteration: string;
  translation: string;
  instruction: string;
  duration: number;
  position: 'standing' | 'bowing' | 'prostrating' | 'sitting';
  audioFile?: string;
}

export interface PrayerGuide {
  name: string;
  arabicName: string;
  description: string;
  totalRakats: number;
  steps: PrayerStep[];
}

export const prayerGuides: Record<string, PrayerGuide> = {
  fajr: {
    name: "Fajr",
    arabicName: "الفجر",
    description: "The Dawn Prayer - 2 Rakats",
    totalRakats: 2,
    steps: [
      {
        id: 1,
        arabic: "اللَّهُ أَكْبَرُ",
        transliteration: "Allahu Akbar",
        translation: "Allah is the Greatest",
        instruction: "Raise your hands to your ears and say Takbir to begin the prayer. Face the Qibla and make your intention.",
        duration: 5,
        position: 'standing'
      },
      {
        id: 2,
        arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        transliteration: "Bismillahi Rahmanir Raheem",
        translation: "In the name of Allah, the Most Gracious, the Most Merciful",
        instruction: "Place your right hand over your left hand on your chest and recite Al-Fatiha quietly.",
        duration: 8,
        position: 'standing'
      },
      {
        id: 3,
        arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        transliteration: "Alhamdu lillahi rabbil alameen",
        translation: "All praise is due to Allah, Lord of all the worlds",
        instruction: "Continue reciting Al-Fatiha with focus and reverence.",
        duration: 10,
        position: 'standing'
      },
      {
        id: 4,
        arabic: "اللَّهُ أَكْبَرُ",
        transliteration: "Allahu Akbar",
        translation: "Allah is the Greatest",
        instruction: "Say Takbir and bow down for Ruku. Place your hands on your knees.",
        duration: 3,
        position: 'bowing'
      },
      {
        id: 5,
        arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
        transliteration: "Subhana Rabbiyal Adheem",
        translation: "Glory be to my Lord, the Magnificent",
        instruction: "While in Ruku, say this dhikr at least 3 times. Keep your back straight.",
        duration: 8,
        position: 'bowing'
      },
      {
        id: 6,
        arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ",
        transliteration: "Sami Allahu liman hamidah",
        translation: "Allah hears those who praise Him",
        instruction: "Rise from Ruku and stand straight while saying this.",
        duration: 3,
        position: 'standing'
      },
      {
        id: 7,
        arabic: "اللَّهُ أَكْبَرُ",
        transliteration: "Allahu Akbar",
        translation: "Allah is the Greatest",
        instruction: "Say Takbir and go down for the first Sujud (prostration). Touch your forehead to the ground.",
        duration: 3,
        position: 'prostrating'
      },
      {
        id: 8,
        arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَىٰ",
        transliteration: "Subhana Rabbiyal A'la",
        translation: "Glory be to my Lord, the Most High",
        instruction: "In Sujud, say this dhikr at least 3 times. Your forehead, nose, palms, knees, and toes should touch the ground.",
        duration: 8,
        position: 'prostrating'
      },
      {
        id: 9,
        arabic: "اللَّهُ أَكْبَرُ",
        transliteration: "Allahu Akbar",
        translation: "Allah is the Greatest",
        instruction: "Rise from Sujud and sit between the two prostrations.",
        duration: 3,
        position: 'sitting'
      },
      {
        id: 10,
        arabic: "اللَّهُ أَكْبَرُ",
        transliteration: "Allahu Akbar",
        translation: "Allah is the Greatest",
        instruction: "Go down for the second Sujud.",
        duration: 3,
        position: 'prostrating'
      },
      {
        id: 11,
        arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَىٰ",
        transliteration: "Subhana Rabbiyal A'la",
        translation: "Glory be to my Lord, the Most High",
        instruction: "In the second Sujud, repeat the dhikr at least 3 times.",
        duration: 8,
        position: 'prostrating'
      },
      {
        id: 12,
        arabic: "اللَّهُ أَكْبَرُ",
        transliteration: "Allahu Akbar",
        translation: "Allah is the Greatest",
        instruction: "Rise for the second Rakat. This completes the first Rakat.",
        duration: 3,
        position: 'standing'
      },
      {
        id: 13,
        arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ",
        transliteration: "At-tahiyyatu lillahi was-salawatu wat-tayyibat",
        translation: "All greetings, prayers and pure words are due to Allah",
        instruction: "After completing 2 Rakats, sit for Tashahhud and recite this.",
        duration: 15,
        position: 'sitting'
      },
      {
        id: 14,
        arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
        transliteration: "Assalamu alaikum wa rahmatullah",
        translation: "Peace be upon you and the mercy of Allah",
        instruction: "Turn your head to the right and give Salam, then to the left and repeat. This ends the prayer.",
        duration: 5,
        position: 'sitting'
      }
    ]
  },
  
  dhuhr: {
    name: "Dhuhr",
    arabicName: "الظهر",
    description: "The Midday Prayer - 4 Rakats",
    totalRakats: 4,
    steps: [
      {
        id: 1,
        arabic: "اللَّهُ أَكْبَرُ",
        transliteration: "Allahu Akbar",
        translation: "Allah is the Greatest",
        instruction: "Begin with Takbir. This is a longer prayer with 4 Rakats. Stay focused and take your time.",
        duration: 5,
        position: 'standing'
      },
      // ... More steps would be added for a complete 4-rakat prayer
      {
        id: 2,
        arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        transliteration: "Alhamdu lillahi rabbil alameen",
        translation: "All praise is due to Allah, Lord of all the worlds",
        instruction: "Recite Al-Fatiha in the first Rakat.",
        duration: 10,
        position: 'standing'
      }
      // Additional steps would continue here...
    ]
  }
};

export const getPrayerGuide = (prayerName: string): PrayerGuide | null => {
  return prayerGuides[prayerName.toLowerCase()] || null;
};
