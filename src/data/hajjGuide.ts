export interface HajjRitual {
  id: string;
  name: string;
  arabicName: string;
  description: string;
  detailedSteps: string[];
  dua?: {
    arabic: string;
    transliteration: string;
    translation: string;
  };
  significance: string;
  tips: string[];
}

export interface HajjDay {
  day: number;
  islamicDate: string;
  name: string;
  arabicName: string;
  location: string;
  description: string;
  rituals: HajjRitual[];
  scene: 'makkah' | 'mina' | 'arafat' | 'muzdalifah' | 'jamarat';
}

export interface HajjLocation {
  id: string;
  name: string;
  arabicName: string;
  description: string;
  coordinates: { lat: number; lng: number };
  facts: string[];
}

export const hajjLocations: HajjLocation[] = [
  {
    id: 'makkah',
    name: 'Makkah al-Mukarramah',
    arabicName: 'مكة المكرمة',
    description: 'The holiest city in Islam, home to the Kaaba and Masjid al-Haram',
    coordinates: { lat: 21.4225, lng: 39.8262 },
    facts: [
      'Birthplace of Prophet Muhammad ﷺ',
      'Contains the first house of worship on Earth',
      'Muslims worldwide face this city in prayer',
      'Entry is restricted to Muslims only'
    ]
  },
  {
    id: 'mina',
    name: 'Mina',
    arabicName: 'مِنَى',
    description: 'The tent city where pilgrims stay during the days of Hajj',
    coordinates: { lat: 21.4133, lng: 39.8933 },
    facts: [
      'Known as the "City of Tents"',
      'Approximately 5km from Makkah',
      'Houses over 100,000 air-conditioned tents',
      'Site of the Jamarat (stone pillars)'
    ]
  },
  {
    id: 'arafat',
    name: 'Plain of Arafat',
    arabicName: 'عَرَفَات',
    description: 'The most important site of Hajj where pilgrims gather on the 9th of Dhul Hijjah',
    coordinates: { lat: 21.3549, lng: 39.9842 },
    facts: [
      'Standing at Arafat is the essence of Hajj',
      'Site of Prophet Muhammad\'s ﷺ farewell sermon',
      'Mount Arafat (Jabal ar-Rahmah) is located here',
      'Missing this day invalidates the Hajj'
    ]
  },
  {
    id: 'muzdalifah',
    name: 'Muzdalifah',
    arabicName: 'مُزْدَلِفَة',
    description: 'Open area between Mina and Arafat where pilgrims spend the night',
    coordinates: { lat: 21.3833, lng: 39.9333 },
    facts: [
      'Pilgrims collect pebbles here for stoning',
      'Night is spent under the open sky',
      'Maghrib and Isha prayers are combined here',
      'Also known as al-Mash\'ar al-Haram'
    ]
  },
  {
    id: 'jamarat',
    name: 'Jamarat Bridge',
    arabicName: 'الجَمَرَات',
    description: 'The site where pilgrims stone the three pillars representing Satan',
    coordinates: { lat: 21.4203, lng: 39.8728 },
    facts: [
      'Three pillars: Jamrat al-Ula, Wusta, and Aqaba',
      'Commemorates Ibrahim\'s rejection of Satan',
      'Multi-level bridge facilitates millions of pilgrims',
      'Each pilgrim throws 7 pebbles at each pillar'
    ]
  }
];

export const hajjDays: HajjDay[] = [
  {
    day: 0,
    islamicDate: '8th Dhul Hijjah',
    name: 'Day of Tarwiyah',
    arabicName: 'يَوْمُ التَّرْوِيَة',
    location: 'Makkah → Mina',
    description: 'The day of preparation. Pilgrims enter the state of Ihram and head to Mina.',
    scene: 'makkah',
    rituals: [
      {
        id: 'ihram',
        name: 'Entering Ihram',
        arabicName: 'الإِحْرَام',
        description: 'The sacred state of purity and consecration for Hajj',
        detailedSteps: [
          'Perform Ghusl (full body ablution) for purification',
          'Men wear two white unstitched cloths; women wear modest clothing',
          'Make the intention (Niyyah) for Hajj',
          'Recite the Talbiyah: "Labbayk Allahumma Labbayk..."',
          'Proceed to Mina before Dhuhr prayer'
        ],
        dua: {
          arabic: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ',
          transliteration: 'Labbayk Allahumma Labbayk, Labbayk La Shareeka Laka Labbayk, Innal Hamda Wan-Ni\'mata Laka Wal-Mulk, La Shareeka Lak',
          translation: 'Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Indeed, all praise, grace, and sovereignty belong to You. You have no partner.'
        },
        significance: 'Ihram symbolizes equality before Allah - all pilgrims dressed the same regardless of wealth or status.',
        tips: [
          'Avoid perfumed products before entering Ihram',
          'Keep reciting Talbiyah frequently',
          'Stay patient and maintain a peaceful demeanor'
        ]
      },
      {
        id: 'mina-stay-day1',
        name: 'Stay in Mina',
        arabicName: 'المَبِيتُ بِمِنَى',
        description: 'Spending the night in Mina in preparation for the Day of Arafat',
        detailedSteps: [
          'Arrive at your designated tent in Mina',
          'Pray Dhuhr, Asr, Maghrib, Isha, and Fajr at their times (shortened)',
          'Engage in dhikr, Quran recitation, and dua',
          'Rest and prepare for the journey to Arafat',
          'Maintain the state of Ihram'
        ],
        significance: 'A time of spiritual preparation and reflection before the most important day of Hajj.',
        tips: [
          'Stay hydrated and rest well',
          'Use this time for sincere supplication',
          'Memorize key duas for Arafat'
        ]
      }
    ]
  },
  {
    day: 1,
    islamicDate: '9th Dhul Hijjah',
    name: 'Day of Arafat',
    arabicName: 'يَوْمُ عَرَفَة',
    location: 'Mina → Arafat → Muzdalifah',
    description: 'The most important day of Hajj. Standing at Arafat is the pinnacle of Hajj.',
    scene: 'arafat',
    rituals: [
      {
        id: 'wuquf-arafat',
        name: 'Standing at Arafat',
        arabicName: 'الوُقُوفُ بِعَرَفَة',
        description: 'The essential pillar of Hajj - standing in supplication at the plain of Arafat',
        detailedSteps: [
          'Proceed to Arafat after sunrise',
          'Listen to the Hajj sermon at Masjid Namirah',
          'Pray Dhuhr and Asr combined and shortened',
          'Stand facing the Qibla, making dua until sunset',
          'Cry and beseech Allah for forgiveness',
          'Depart for Muzdalifah immediately after sunset'
        ],
        dua: {
          arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
          transliteration: 'La ilaha illallahu wahdahu la shareeka lah, lahul mulku wa lahul hamdu wa huwa ala kulli shay\'in qadeer',
          translation: 'There is no god but Allah alone, with no partner. His is the sovereignty and His is the praise, and He is able to do all things.'
        },
        significance: 'The Prophet ﷺ said: "Hajj is Arafat." This is when Allah descends to the lowest heaven and forgives sins.',
        tips: [
          'Stay in the boundaries of Arafat',
          'Make abundant dua - this is the best day for it',
          'Fast on this day if you are not performing Hajj (great reward)'
        ]
      },
      {
        id: 'muzdalifah-night',
        name: 'Night at Muzdalifah',
        arabicName: 'المَبِيتُ بِمُزْدَلِفَة',
        description: 'Spending the night at Muzdalifah and collecting pebbles for stoning',
        detailedSteps: [
          'Arrive at Muzdalifah after sunset from Arafat',
          'Pray Maghrib and Isha combined (shortened)',
          'Collect 49-70 pebbles for the stoning ritual',
          'Sleep under the open sky',
          'Pray Fajr at its earliest time',
          'Make dua at al-Mash\'ar al-Haram until sunrise',
          'Depart for Mina before sunrise (after Fajr)'
        ],
        significance: 'A night of rest and preparation, connecting pilgrims with the practice of Prophet Ibrahim عليه السلام.',
        tips: [
          'Pebbles should be small, like chickpeas',
          'Elderly and women may leave after midnight',
          'Use this time for quiet reflection'
        ]
      }
    ]
  },
  {
    day: 2,
    islamicDate: '10th Dhul Hijjah',
    name: 'Day of Sacrifice (Eid al-Adha)',
    arabicName: 'يَوْمُ النَّحْر',
    location: 'Muzdalifah → Mina → Makkah → Mina',
    description: 'The busiest day of Hajj with multiple important rituals.',
    scene: 'jamarat',
    rituals: [
      {
        id: 'ramy-jamrat-aqaba',
        name: 'Stoning Jamrat al-Aqaba',
        arabicName: 'رَمْيُ جَمْرَةِ العَقَبَة',
        description: 'Throwing seven pebbles at the largest pillar',
        detailedSteps: [
          'Proceed to Jamrat al-Aqaba (the largest pillar)',
          'Stop reciting Talbiyah upon reaching',
          'Throw 7 pebbles, one at a time',
          'Say "Allahu Akbar" with each throw',
          'Aim for the basin around the pillar',
          'This can be done after sunrise until night'
        ],
        dua: {
          arabic: 'اللَّهُ أَكْبَرُ',
          transliteration: 'Allahu Akbar',
          translation: 'Allah is the Greatest'
        },
        significance: 'Symbolizes rejection of Satan, commemorating Ibrahim\'s عليه السلام defiance of Shaytan.',
        tips: [
          'Stay calm in the crowd',
          'Don\'t throw shoes or large stones',
          'Delegate if elderly or ill'
        ]
      },
      {
        id: 'sacrifice',
        name: 'Animal Sacrifice',
        arabicName: 'الهَدْي',
        description: 'Offering a sacrificial animal as an act of worship',
        detailedSteps: [
          'After stoning, arrange for your sacrifice',
          'The animal can be a sheep, goat, cow, or camel',
          'Sacrifice should be done on this day if possible',
          'The meat is distributed to the poor',
          'Say Bismillah and Allahu Akbar before slaughter'
        ],
        significance: 'Commemorates Ibrahim\'s عليه السلام willingness to sacrifice his son Ismail for Allah\'s sake.',
        tips: [
          'Many pilgrims use voucher systems',
          'The sacrifice can be done until the 13th',
          'One sheep suffices for one person'
        ]
      },
      {
        id: 'halq-taqsir',
        name: 'Shaving or Trimming Hair',
        arabicName: 'الحَلْق أَو التَّقْصِير',
        description: 'Men shave their heads; women trim a fingertip length of hair',
        detailedSteps: [
          'After sacrifice, proceed to shave or trim',
          'Men: Complete shaving (Halq) is preferred',
          'Women: Cut a fingertip length from the end',
          'This marks partial exit from Ihram',
          'Change into regular clothes',
          'All Ihram restrictions lifted except marital relations'
        ],
        significance: 'Symbolizes humility, renewal, and shedding of past sins.',
        tips: [
          'Use licensed barbers in Mina',
          'Shaving is more rewarding than trimming for men',
          'Women should not shave their heads'
        ]
      },
      {
        id: 'tawaf-ifadah',
        name: 'Tawaf al-Ifadah',
        arabicName: 'طَوَافُ الإِفَاضَة',
        description: 'The essential Tawaf of Hajj around the Kaaba',
        detailedSteps: [
          'Travel to Makkah from Mina',
          'Perform Tawaf around the Kaaba 7 times',
          'Start from the Black Stone corner',
          'Walk counter-clockwise',
          'Pray 2 rakats behind Maqam Ibrahim',
          'Drink from Zamzam water'
        ],
        significance: 'This Tawaf is a pillar of Hajj and must be performed for Hajj to be valid.',
        tips: [
          'Can be delayed until the 13th if needed',
          'Maintain wudu throughout',
          'Kiss or point to the Black Stone if possible'
        ]
      },
      {
        id: 'sai',
        name: 'Sa\'i between Safa and Marwa',
        arabicName: 'السَّعْي',
        description: 'Walking between the hills of Safa and Marwa seven times',
        detailedSteps: [
          'Begin at Safa after Tawaf',
          'Walk to Marwa (counts as one)',
          'Return to Safa (counts as two)',
          'Complete 7 lengths ending at Marwa',
          'Men should jog in the green-lit section',
          'Make dua throughout'
        ],
        dua: {
          arabic: 'إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ',
          transliteration: 'Innas-Safa wal-Marwata min sha\'a\'irillah',
          translation: 'Indeed, Safa and Marwa are among the symbols of Allah'
        },
        significance: 'Commemorates Hajar\'s search for water for her son Ismail, which led to the miracle of Zamzam.',
        tips: [
          'Use wheelchairs if needed',
          'The path is air-conditioned',
          'Stay focused on remembrance of Allah'
        ]
      }
    ]
  },
  {
    day: 3,
    islamicDate: '11th Dhul Hijjah',
    name: 'First Day of Tashreeq',
    arabicName: 'أَوَّلُ أَيَّامِ التَّشْرِيق',
    location: 'Mina',
    description: 'Days of eating, drinking, and remembering Allah.',
    scene: 'jamarat',
    rituals: [
      {
        id: 'ramy-three-day2',
        name: 'Stoning All Three Pillars',
        arabicName: 'رَمْيُ الجَمَرَات الثَّلَاث',
        description: 'Throwing pebbles at all three Jamarat after Dhuhr',
        detailedSteps: [
          'Wait until after Dhuhr prayer',
          'Begin with Jamrat al-Ula (smallest)',
          'Throw 7 pebbles saying Allahu Akbar',
          'Make dua facing Qibla after',
          'Move to Jamrat al-Wusta (middle)',
          'Repeat stoning and dua',
          'End with Jamrat al-Aqaba (largest)',
          'Do not make dua after the last one'
        ],
        significance: 'Continuing the rejection of Satan and following the Sunnah of Ibrahim عليه السلام.',
        tips: [
          'Best time is after Asr when less crowded',
          'Stay overnight in Mina',
          'Continue dhikr and Takbeer'
        ]
      }
    ]
  },
  {
    day: 4,
    islamicDate: '12th Dhul Hijjah',
    name: 'Second Day of Tashreeq',
    arabicName: 'ثَانِي أَيَّامِ التَّشْرِيق',
    location: 'Mina → Makkah (optional)',
    description: 'Pilgrims may leave for Makkah after stoning if they wish to shorten their Hajj.',
    scene: 'jamarat',
    rituals: [
      {
        id: 'ramy-three-day3',
        name: 'Stoning All Three Pillars',
        arabicName: 'رَمْيُ الجَمَرَات الثَّلَاث',
        description: 'Repeat the stoning of all three pillars after Dhuhr',
        detailedSteps: [
          'Same procedure as the previous day',
          'Stone Jamrat al-Ula first with 7 pebbles',
          'Make dua after stoning',
          'Stone Jamrat al-Wusta with 7 pebbles',
          'Make dua after stoning',
          'Stone Jamrat al-Aqaba with 7 pebbles',
          'Option to leave for Makkah before sunset'
        ],
        significance: 'Completing the minimum days of stoning. Staying longer is more rewarding.',
        tips: [
          'If leaving, depart before sunset',
          'If sunset catches you in Mina, stay for day 5',
          'Perform Tawaf al-Wida before leaving Makkah'
        ]
      }
    ]
  },
  {
    day: 5,
    islamicDate: '13th Dhul Hijjah',
    name: 'Third Day of Tashreeq (Optional)',
    arabicName: 'ثَالِثُ أَيَّامِ التَّشْرِيق',
    location: 'Mina → Makkah',
    description: 'The final day for those who stayed. More rewarding to stay until this day.',
    scene: 'mina',
    rituals: [
      {
        id: 'ramy-three-day4',
        name: 'Final Stoning',
        arabicName: 'الرَّمْيُ الأَخِير',
        description: 'Final stoning of all three pillars',
        detailedSteps: [
          'Perform stoning after Dhuhr as before',
          'Complete all three pillars',
          'Depart for Makkah after stoning',
          'Perform Tawaf al-Wida (farewell Tawaf)'
        ],
        significance: 'Completing the Sunnah of staying all days of Tashreeq.',
        tips: [
          'This is the last ritual day',
          'Don\'t forget Tawaf al-Wida',
          'Make abundant dua in your final moments'
        ]
      },
      {
        id: 'tawaf-wida',
        name: 'Tawaf al-Wida (Farewell Tawaf)',
        arabicName: 'طَوَافُ الوَدَاع',
        description: 'The final circumambulation before leaving Makkah',
        detailedSteps: [
          'This is the last act before leaving Makkah',
          'Perform 7 circuits around the Kaaba',
          'Pray 2 rakats behind Maqam Ibrahim',
          'Drink Zamzam water',
          'Make final dua facing the Kaaba',
          'Leave the Haram walking backwards (optional Sunnah)',
          'Depart from Makkah immediately after'
        ],
        dua: {
          arabic: 'اللَّهُمَّ إِنَّ الْبَيْتَ بَيْتُكَ، وَالْعَبْدَ عَبْدُكَ، وَابْنُ عَبْدِكَ، وَابْنُ أَمَتِكَ',
          transliteration: 'Allahumma innal-bayta baytuka, wal-\'abdu \'abduka, wabnu \'abdika, wabnu amatika',
          translation: 'O Allah, the House is Your House, and the servant is Your servant, the son of Your servant, the son of Your handmaid'
        },
        significance: 'Bidding farewell to the sacred House of Allah until the next visit, insha\'Allah.',
        tips: [
          'This Tawaf is obligatory',
          'Menstruating women are exempt',
          'Do not delay departure after this Tawaf'
        ]
      }
    ]
  }
];

export const getHajjDayByNumber = (dayNumber: number): HajjDay | undefined => {
  return hajjDays.find(day => day.day === dayNumber);
};

export const getLocationById = (locationId: string): HajjLocation | undefined => {
  return hajjLocations.find(loc => loc.id === locationId);
};
