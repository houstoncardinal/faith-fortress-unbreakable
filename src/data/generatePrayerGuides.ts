export interface PrayerStep {
  id: number;
  arabic: string;
  transliteration: string;
  translation: string;
  instruction: string;
  duration: number; // seconds
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

const TEXTS = {
  takbir: {
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar',
    translation: 'Allah is the Greatest',
  },
  bismillah: {
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    transliteration: 'Bismillahi Rahmanir Raheem',
    translation: 'In the name of Allah, the Most Gracious, the Most Merciful',
  },
  fatihaStart: {
    arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    transliteration: 'Alhamdu lillahi rabbil alameen',
    translation: 'All praise is due to Allah, Lord of all the worlds',
  },
  rukuDhikr: {
    arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
    transliteration: 'Subhana Rabbiyal Adheem',
    translation: 'Glory be to my Lord, the Magnificent',
  },
  standFromRuku: {
    arabic: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ',
    transliteration: 'Sami Allahu liman hamidah',
    translation: 'Allah hears those who praise Him',
  },
  sujudDhikr: {
    arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَىٰ',
    transliteration: "Subhana Rabbiyal A'la",
    translation: 'Glory be to my Lord, the Most High',
  },
  tashahhud: {
    arabic: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ',
    transliteration: 'At-tahiyyatu lillahi was-salawatu wat-tayyibat',
    translation: 'All greetings, prayers and pure words are due to Allah',
  },
  salam: {
    arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
    transliteration: 'Assalamu alaikum wa rahmatullah',
    translation: 'Peace be upon you and the mercy of Allah',
  },
};

let globalId = 1;
const nextId = () => globalId++;

const addOpeningTakbir = (steps: PrayerStep[]) => {
  steps.push({
    id: nextId(),
    ...TEXTS.takbir,
    instruction:
      'Raise your hands to your ears and say Takbir to begin the prayer. Face the Qibla and make your intention.',
    duration: 5,
    position: 'standing',
  });
};

const addRecitation = (steps: PrayerStep[], rakat: number) => {
  steps.push({
    id: nextId(),
    ...TEXTS.bismillah,
    instruction:
      'Place your right hand over your left hand on your chest and begin the recitation quietly (or aloud where applicable).',
    duration: 8,
    position: 'standing',
  });
  steps.push({
    id: nextId(),
    ...TEXTS.fatihaStart,
    instruction: 'Continue reciting Al-Fatiha with focus and reverence.',
    duration: 10,
    position: 'standing',
  });
};

const addRuku = (steps: PrayerStep[]) => {
  steps.push({
    id: nextId(),
    ...TEXTS.takbir,
    instruction: 'Say Takbir and bow down for Ruku. Place your hands on your knees.',
    duration: 3,
    position: 'bowing',
  });
  steps.push({
    id: nextId(),
    ...TEXTS.rukuDhikr,
    instruction: 'While in Ruku, say this dhikr at least 3 times. Keep your back straight.',
    duration: 8,
    position: 'bowing',
  });
  steps.push({
    id: nextId(),
    ...TEXTS.standFromRuku,
    instruction: 'Rise from Ruku and stand straight while saying this.',
    duration: 3,
    position: 'standing',
  });
};

const addSujudPair = (steps: PrayerStep[]) => {
  steps.push({
    id: nextId(),
    ...TEXTS.takbir,
    instruction: 'Say Takbir and go down for Sujud. Touch your forehead to the ground.',
    duration: 3,
    position: 'prostrating',
  });
  steps.push({
    id: nextId(),
    ...TEXTS.sujudDhikr,
    instruction:
      'In Sujud, say this dhikr at least 3 times. Your forehead, nose, palms, knees, and toes should touch the ground.',
    duration: 8,
    position: 'prostrating',
  });
  steps.push({
    id: nextId(),
    ...TEXTS.takbir,
    instruction: 'Rise from Sujud and sit between the two prostrations.',
    duration: 3,
    position: 'sitting',
  });
  steps.push({
    id: nextId(),
    ...TEXTS.takbir,
    instruction: 'Go down for the second Sujud.',
    duration: 3,
    position: 'prostrating',
  });
  steps.push({
    id: nextId(),
    ...TEXTS.sujudDhikr,
    instruction: 'In the second Sujud, repeat the dhikr at least 3 times.',
    duration: 8,
    position: 'prostrating',
  });
};

const addRiseForNextRakat = (steps: PrayerStep[]) => {
  steps.push({
    id: nextId(),
    ...TEXTS.takbir,
    instruction: 'Rise for the next Rakat.',
    duration: 3,
    position: 'standing',
  });
};

const addTashahhud = (steps: PrayerStep[], isFinal: boolean) => {
  steps.push({
    id: nextId(),
    ...TEXTS.tashahhud,
    instruction: isFinal
      ? 'Final Tashahhud: Sit and recite with humility before concluding the prayer.'
      : 'Middle Tashahhud: Sit and recite before standing for the next Rakat.',
    duration: isFinal ? 15 : 10,
    position: 'sitting',
  });
};

const addSalam = (steps: PrayerStep[]) => {
  steps.push({
    id: nextId(),
    ...TEXTS.salam,
    instruction:
      'Turn your head to the right and give Salam, then to the left and repeat. This ends the prayer.',
    duration: 5,
    position: 'sitting',
  });
};

function buildPrayer(name: 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha') : PrayerGuide {
  globalId = 1; // reset ids per guide
  const meta = {
    Fajr: { arabicName: 'الفجر', rakats: 2, description: 'The Dawn Prayer - 2 Rakats' },
    Dhuhr: { arabicName: 'الظهر', rakats: 4, description: 'The Midday Prayer - 4 Rakats' },
    Asr: { arabicName: 'العصر', rakats: 4, description: 'The Afternoon Prayer - 4 Rakats' },
    Maghrib: { arabicName: 'المغرب', rakats: 3, description: 'The Sunset Prayer - 3 Rakats' },
    Isha: { arabicName: 'العشاء', rakats: 4, description: 'The Night Prayer - 4 Rakats' },
  }[name];

  const steps: PrayerStep[] = [];
  addOpeningTakbir(steps);

  for (let r = 1; r <= meta.rakats; r++) {
    addRecitation(steps, r);
    addRuku(steps);
    addSujudPair(steps);

    // Middle tashahhud after 2nd rakat for 3 or 4 rakat prayers
    const needsMiddle = meta.rakats > 2 && r === 2 && meta.rakats !== 2;
    const isLast = r === meta.rakats;

    if (needsMiddle) {
      addTashahhud(steps, false);
      addRiseForNextRakat(steps);
    } else if (!isLast) {
      addRiseForNextRakat(steps);
    }

    if (isLast) {
      addTashahhud(steps, true);
      addSalam(steps);
    }
  }

  return {
    name,
    arabicName: meta.arabicName,
    description: meta.description,
    totalRakats: meta.rakats,
    steps,
  };
}

export const getPrayerGuide = (prayerName: string): PrayerGuide | null => {
  const key = prayerName.trim().toLowerCase();
  switch (key) {
    case 'fajr':
      return buildPrayer('Fajr');
    case 'dhuhr':
      return buildPrayer('Dhuhr');
    case 'asr':
      return buildPrayer('Asr');
    case 'maghrib':
      return buildPrayer('Maghrib');
    case 'isha':
      return buildPrayer('Isha');
    default:
      return null;
  }
};
