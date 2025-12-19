export interface IslamicLesson {
  id: string;
  title: string;
  arabicTitle: string;
  category: 'pillars' | 'prophets' | 'quran' | 'history' | 'ethics' | 'sacred-places';
  description: string;
  content: string[];
  keyPoints: string[];
  arabicQuote?: string;
  quoteTranslation?: string;
  quoteSource?: string;
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const islamicLessons: IslamicLesson[] = [
  // The Five Pillars of Islam
  {
    id: 'shahada',
    title: 'The Shahada - Declaration of Faith',
    arabicTitle: 'الشَّهَادَة',
    category: 'pillars',
    description: 'The foundation of Islam - bearing witness to the oneness of Allah and the prophethood of Muhammad ﷺ',
    content: [
      'The Shahada is the first and most important pillar of Islam. It is the declaration that there is no god but Allah, and Muhammad is His messenger.',
      'This simple yet profound statement is what distinguishes a Muslim from a non-Muslim. When one sincerely declares the Shahada with understanding and conviction, they enter the fold of Islam.',
      'The Shahada consists of two parts: "Ash-hadu an la ilaha illa Allah" (I bear witness that there is no god but Allah) and "Wa ash-hadu anna Muhammadan rasul Allah" (And I bear witness that Muhammad is the messenger of Allah).',
      'The significance of Tawhid (Oneness of Allah) permeates every aspect of a Muslim\'s life. It means dedicating all worship exclusively to Allah and rejecting any form of polytheism or idolatry.',
      'By accepting Muhammad ﷺ as the final messenger, a Muslim commits to following his teachings, his Sunnah, and the guidance revealed through him in the Quran.'
    ],
    keyPoints: [
      'Foundation of Islamic faith',
      'Affirms monotheism (Tawhid)',
      'Recognizes Prophet Muhammad ﷺ as final messenger',
      'Must be declared with sincerity and understanding',
      'Opens the door to salvation'
    ],
    arabicQuote: 'لَا إِلَٰهَ إِلَّا اللَّهُ مُحَمَّدٌ رَسُولُ اللَّهِ',
    quoteTranslation: 'There is no god but Allah, Muhammad is the messenger of Allah',
    duration: 15,
    difficulty: 'beginner'
  },
  {
    id: 'salah',
    title: 'Salah - The Five Daily Prayers',
    arabicTitle: 'الصَّلَاة',
    category: 'pillars',
    description: 'The spiritual connection between a Muslim and Allah, performed five times daily',
    content: [
      'Salah is the second pillar of Islam and the most important act of worship after the Shahada. It was prescribed during the Prophet\'s ﷺ miraculous night journey (Isra and Mi\'raj).',
      'Muslims pray five times daily: Fajr (dawn), Dhuhr (midday), Asr (afternoon), Maghrib (sunset), and Isha (night). Each prayer has a specific number of units (rakats) and prescribed times.',
      'Prayer serves as a direct connection between the worshipper and Allah. There is no intermediary - every Muslim stands directly before their Creator in humble submission.',
      'The physical movements of prayer - standing, bowing, prostrating, and sitting - reflect complete submission to Allah. The prostration (sujud) is the position in which a person is closest to Allah.',
      'Salah purifies the soul, reminds us of our purpose, and prevents us from wrongdoing. The Prophet ﷺ said: "The first matter that the slave will be brought to account for on the Day of Judgment is the prayer."'
    ],
    keyPoints: [
      'Five daily prayers at prescribed times',
      'Direct connection with Allah',
      'Physical and spiritual purification',
      'Prevents wrongdoing and immorality',
      'First deed to be accounted for on Judgment Day'
    ],
    arabicQuote: 'إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ',
    quoteTranslation: 'Indeed, prayer prohibits immorality and wrongdoing',
    quoteSource: 'Surah Al-Ankabut 29:45',
    duration: 20,
    difficulty: 'beginner'
  },
  {
    id: 'zakat',
    title: 'Zakat - Obligatory Charity',
    arabicTitle: 'الزَّكَاة',
    category: 'pillars',
    description: 'Purification of wealth through giving to those in need',
    content: [
      'Zakat is the third pillar of Islam, an obligatory charity that purifies both wealth and the soul. It is a right that the poor have upon the wealth of the rich.',
      'Muslims who possess wealth above a certain threshold (nisab) for a complete lunar year must give 2.5% of their savings to those in need.',
      'The recipients of Zakat are clearly defined in the Quran: the poor, the needy, those employed to collect it, those whose hearts are to be reconciled, freeing captives, those in debt, in the way of Allah, and the stranded traveler.',
      'Zakat creates a society of mutual care and social justice. It prevents the hoarding of wealth and ensures resources flow throughout the community.',
      'Unlike voluntary charity (sadaqah), Zakat is an obligation. Withholding it is considered a serious sin, while giving it brings immense blessings and purification.'
    ],
    keyPoints: [
      '2.5% of savings annually',
      'Purifies wealth and soul',
      'Eight categories of recipients',
      'Creates social justice',
      'Obligatory, not optional'
    ],
    arabicQuote: 'خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا',
    quoteTranslation: 'Take from their wealth a charity by which you purify them and cause them increase',
    quoteSource: 'Surah At-Tawbah 9:103',
    duration: 15,
    difficulty: 'beginner'
  },
  {
    id: 'sawm',
    title: 'Sawm - Fasting in Ramadan',
    arabicTitle: 'الصَّوْم',
    category: 'pillars',
    description: 'Spiritual discipline through fasting during the blessed month of Ramadan',
    content: [
      'Sawm, or fasting during Ramadan, is the fourth pillar of Islam. Muslims abstain from food, drink, and other physical needs from dawn to sunset throughout the ninth month of the Islamic calendar.',
      'Ramadan is the month in which the Quran was revealed. Fasting during this blessed month was made obligatory in the second year after the Hijrah.',
      'The fast is not merely abstaining from physical needs - it is a comprehensive spiritual exercise. One must also guard their tongue, eyes, and heart from sin.',
      'Fasting teaches patience, self-discipline, and empathy for the less fortunate. It breaks the routine of worldly life and focuses the soul on worship and reflection.',
      'The reward for fasting is immense. Allah says in a Hadith Qudsi: "Every deed of the son of Adam is for him except fasting; it is for Me and I shall reward for it."'
    ],
    keyPoints: [
      'Month-long fast from dawn to sunset',
      'Physical and spiritual discipline',
      'Month of Quran revelation',
      'Develops patience and empathy',
      'Reward known only to Allah'
    ],
    arabicQuote: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ',
    quoteTranslation: 'O you who have believed, decreed upon you is fasting',
    quoteSource: 'Surah Al-Baqarah 2:183',
    duration: 18,
    difficulty: 'beginner'
  },
  {
    id: 'hajj',
    title: 'Hajj - The Pilgrimage to Makkah',
    arabicTitle: 'الحَجّ',
    category: 'pillars',
    description: 'The sacred journey to the House of Allah, obligatory once in a lifetime',
    content: [
      'Hajj is the fifth pillar of Islam, a pilgrimage to the sacred city of Makkah that every able Muslim must undertake at least once in their lifetime.',
      'The rituals of Hajj trace back to Prophet Ibrahim (Abraham) عليه السلام and commemorate the trials of his family, including Hajar\'s search for water and his willingness to sacrifice his son Ismail.',
      'During Hajj, millions of Muslims from around the world gather in unity, wearing simple white garments that erase distinctions of wealth and status. All stand equal before Allah.',
      'Key rituals include circumambulating the Kaaba (Tawaf), walking between Safa and Marwa (Sa\'i), standing at Arafat, spending the night at Muzdalifah, and stoning the pillars at Mina.',
      'The Prophet ﷺ said: "Whoever performs Hajj for the sake of Allah and does not utter any obscene speech or do any evil deed, will go back (free from sin) as his mother bore him."'
    ],
    keyPoints: [
      'Once-in-a-lifetime obligation for the able',
      'Commemorates Prophet Ibrahim\'s family',
      'Millions gather in equality',
      'Multiple sacred rituals',
      'Returns one pure as a newborn'
    ],
    arabicQuote: 'وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا',
    quoteTranslation: 'And due to Allah from the people is a pilgrimage to the House - for whoever is able to find thereto a way',
    quoteSource: 'Surah Aal-Imran 3:97',
    duration: 25,
    difficulty: 'intermediate'
  },

  // Sacred Places
  {
    id: 'kaaba',
    title: 'The Kaaba - House of Allah',
    arabicTitle: 'الكَعْبَة',
    category: 'sacred-places',
    description: 'The most sacred site in Islam, the direction of prayer for all Muslims',
    content: [
      'The Kaaba, located in the center of Masjid al-Haram in Makkah, is the holiest site in Islam. It is the direction (Qibla) that all Muslims face during their prayers, unifying the Ummah worldwide.',
      'The Kaaba was originally built by Prophet Ibrahim عليه السلام and his son Ismail عليه السلام upon divine command. Its construction marked the first house of worship dedicated to the One God.',
      'The cube-shaped structure stands approximately 15 meters tall and is draped in the Kiswah, a black silk cloth embroidered with gold Quranic verses, which is replaced annually during Hajj.',
      'Allah says in the Quran: "Indeed, the first House of worship established for mankind was that at Bakkah (Makkah) - blessed and a guidance for the worlds."',
      'The Kaaba represents not a place of worship for its own sake, but a focal point that unites Muslims in worship of Allah alone. Muslims do not worship the Kaaba; they worship Allah while facing it.'
    ],
    keyPoints: [
      'First house of worship on Earth',
      'Built by Prophet Ibrahim عليه السلام',
      'Direction of prayer (Qibla) for all Muslims',
      'Located in Masjid al-Haram, Makkah',
      'Symbol of Muslim unity worldwide'
    ],
    arabicQuote: 'إِنَّ أَوَّلَ بَيْتٍ وُضِعَ لِلنَّاسِ لَلَّذِي بِبَكَّةَ مُبَارَكًا وَهُدًى لِّلْعَالَمِينَ',
    quoteTranslation: 'Indeed, the first House of worship established for mankind was that at Makkah - blessed and a guidance for the worlds',
    quoteSource: 'Surah Aal-Imran 3:96',
    duration: 20,
    difficulty: 'beginner'
  },
  {
    id: 'black-stone',
    title: 'Al-Hajar Al-Aswad - The Black Stone',
    arabicTitle: 'الحَجَر الأَسْوَد',
    category: 'sacred-places',
    description: 'The sacred stone from Paradise, embedded in the corner of the Kaaba',
    content: [
      'The Black Stone (Al-Hajar Al-Aswad) is a sacred stone set into the eastern corner of the Kaaba. It marks the starting point of the Tawaf (circumambulation) and holds immense spiritual significance.',
      'According to Islamic tradition, the Black Stone descended from Paradise and was originally white as snow. The Prophet ﷺ said: "The Black Stone came down from Paradise and it was whiter than milk, but the sins of the sons of Adam turned it black."',
      'When Prophet Ibrahim عليه السلام was building the Kaaba, Angel Jibril (Gabriel) brought the stone from Paradise to be placed as a corner marker.',
      'During Hajj and Umrah, pilgrims attempt to kiss or touch the Black Stone, following the Sunnah of Prophet Muhammad ﷺ. However, it is important to understand that the stone itself is not worshipped.',
      'Umar ibn al-Khattab رضي الله عنه said while kissing the stone: "I know that you are a stone and can neither benefit nor harm. Had I not seen the Prophet ﷺ kiss you, I would never have kissed you."'
    ],
    keyPoints: [
      'Descended from Paradise originally pure white',
      'Set by Prophet Ibrahim عليه السلام',
      'Marks the starting point of Tawaf',
      'Kissing it follows the Sunnah',
      'Not worshipped, only respected'
    ],
    arabicQuote: 'نَزَلَ الْحَجَرُ الأَسْوَدُ مِنَ الْجَنَّةِ وَهُوَ أَشَدُّ بَيَاضًا مِنَ اللَّبَنِ',
    quoteTranslation: 'The Black Stone came down from Paradise whiter than milk',
    quoteSource: 'Hadith - Tirmidhi',
    duration: 15,
    difficulty: 'intermediate'
  },
  {
    id: 'masjid-nabawi',
    title: 'Masjid An-Nabawi - The Prophet\'s Mosque',
    arabicTitle: 'المَسْجِد النَّبَوِي',
    category: 'sacred-places',
    description: 'The second holiest mosque in Islam, built by the Prophet ﷺ himself',
    content: [
      'Masjid An-Nabawi in Madinah is the second holiest mosque in Islam. It was built by Prophet Muhammad ﷺ himself after his migration (Hijrah) from Makkah in 622 CE.',
      'The Prophet ﷺ actively participated in building the mosque, carrying bricks and constructing alongside his companions. The original structure was simple, made of palm trunks and mud bricks.',
      'The mosque contains the Rawdah - the blessed area between the Prophet\'s ﷺ pulpit and his house (now his tomb). The Prophet ﷺ said: "Between my house and my pulpit is a garden from the gardens of Paradise."',
      'Prayer in Masjid An-Nabawi carries immense reward. The Prophet ﷺ said: "A prayer in my mosque is better than a thousand prayers elsewhere, except for Masjid Al-Haram."',
      'The Green Dome, the mosque\'s most distinctive feature today, marks the location where the Prophet ﷺ is buried, alongside his closest companions Abu Bakr and Umar رضي الله عنهما.'
    ],
    keyPoints: [
      'Second holiest mosque in Islam',
      'Built by Prophet Muhammad ﷺ',
      'Contains the Rawdah - garden of Paradise',
      'Prayer reward multiplied 1000x',
      'Prophet\'s ﷺ final resting place'
    ],
    arabicQuote: 'صَلاَةٌ فِي مَسْجِدِي هَذَا أَفْضَلُ مِنْ أَلْفِ صَلاَةٍ فِيمَا سِوَاهُ إِلاَّ الْمَسْجِدَ الْحَرَامَ',
    quoteTranslation: 'A prayer in my mosque is better than a thousand prayers elsewhere, except Masjid Al-Haram',
    quoteSource: 'Hadith - Bukhari & Muslim',
    duration: 18,
    difficulty: 'beginner'
  },
  {
    id: 'masjid-aqsa',
    title: 'Masjid Al-Aqsa - The Farthest Mosque',
    arabicTitle: 'المَسْجِد الأَقْصَى',
    category: 'sacred-places',
    description: 'The third holiest mosque in Islam, destination of the Prophet\'s ﷺ Night Journey',
    content: [
      'Masjid Al-Aqsa in Jerusalem is the third holiest site in Islam. It was the first Qibla (direction of prayer) before Muslims were commanded to face the Kaaba.',
      'The Prophet ﷺ was miraculously transported to Masjid Al-Aqsa during the Night Journey (Isra). From there, he ascended through the heavens (Mi\'raj) to receive the command for the five daily prayers.',
      'The site is blessed and mentioned in the Quran: "Exalted is He who took His Servant by night from al-Masjid al-Haram to al-Masjid al-Aqsa, whose surroundings We have blessed."',
      'Many prophets, including Ibrahim, Musa, Isa, and others عليهم السلام, have a connection to this blessed land. The Prophet ﷺ led all the prophets in prayer here during the Night Journey.',
      'Prayer in Masjid Al-Aqsa carries great reward. The Prophet ﷺ encouraged Muslims to visit it and pray there when possible.'
    ],
    keyPoints: [
      'Third holiest mosque in Islam',
      'First Qibla of Muslims',
      'Destination of Isra (Night Journey)',
      'Starting point of Mi\'raj (Ascension)',
      'Blessed in the Quran'
    ],
    arabicQuote: 'سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى',
    quoteTranslation: 'Exalted is He who took His Servant by night from al-Masjid al-Haram to al-Masjid al-Aqsa',
    quoteSource: 'Surah Al-Isra 17:1',
    duration: 20,
    difficulty: 'intermediate'
  },

  // Ethics and Character
  {
    id: 'ihsan',
    title: 'Ihsan - Excellence in Worship',
    arabicTitle: 'الإِحْسَان',
    category: 'ethics',
    description: 'The highest level of faith - worshipping Allah as if you see Him',
    content: [
      'Ihsan represents the pinnacle of Islamic spirituality. In the famous Hadith of Jibril, when asked about Ihsan, the Prophet ﷺ replied: "It is to worship Allah as though you see Him, and if you cannot see Him, then truly He sees you."',
      'While Iman (faith) is in the heart and Islam is the outward practice, Ihsan is the perfection of both - achieving such consciousness of Allah that every action becomes an act of devotion.',
      'Ihsan transforms ordinary acts into worship. Eating, sleeping, working - all become worship when done with the awareness of Allah and the intention to please Him.',
      'The one who achieves Ihsan is called a Muhsin. Such a person does not only fulfill obligations but excels in them, always seeking the pleasure of Allah.',
      'Ihsan also extends to our treatment of others. The Prophet ﷺ said: "Verily, Allah has prescribed excellence (Ihsan) in all things."'
    ],
    keyPoints: [
      'Highest level of faith',
      'Worship as if you see Allah',
      'Perfection in all deeds',
      'Transforms ordinary acts to worship',
      'Excellence in treating others'
    ],
    arabicQuote: 'أَنْ تَعْبُدَ اللَّهَ كَأَنَّكَ تَرَاهُ فَإِنْ لَمْ تَكُنْ تَرَاهُ فَإِنَّهُ يَرَاكَ',
    quoteTranslation: 'To worship Allah as if you see Him, and if you cannot see Him, then truly He sees you',
    quoteSource: 'Hadith Jibril - Bukhari & Muslim',
    duration: 15,
    difficulty: 'advanced'
  },
  {
    id: 'tawakkul',
    title: 'Tawakkul - Trust in Allah',
    arabicTitle: 'التَّوَكُّل',
    category: 'ethics',
    description: 'Complete reliance on Allah while taking necessary means',
    content: [
      'Tawakkul is the complete trust and reliance upon Allah in all matters while taking the necessary practical steps. It is the balance between effort and faith.',
      'A man asked the Prophet ﷺ: "Should I tie my camel and trust in Allah, or should I leave it untied and trust in Allah?" The Prophet ﷺ replied: "Tie your camel and trust in Allah."',
      'True Tawakkul is not passive resignation. It means doing everything within one\'s power and then placing the outcome in Allah\'s hands, knowing He is the best of planners.',
      'Allah says: "And whoever relies upon Allah - then He is sufficient for him." This promise brings peace and contentment to the heart of the believer.',
      'Tawakkul removes anxiety about the future. When a Muslim has done their best and placed their trust in Allah, they can be at peace regardless of the outcome.'
    ],
    keyPoints: [
      'Trust while taking action',
      'Balance of effort and faith',
      'Not passive resignation',
      'Allah is sufficient for the believer',
      'Brings peace and removes anxiety'
    ],
    arabicQuote: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',
    quoteTranslation: 'And whoever relies upon Allah - then He is sufficient for him',
    quoteSource: 'Surah At-Talaq 65:3',
    duration: 12,
    difficulty: 'intermediate'
  },
  {
    id: 'sabr',
    title: 'Sabr - Patience and Perseverance',
    arabicTitle: 'الصَّبْر',
    category: 'ethics',
    description: 'Steadfastness in the face of hardship and in obedience to Allah',
    content: [
      'Sabr is one of the most emphasized virtues in Islam. It encompasses patience in hardship, perseverance in obedience, and restraint from sin.',
      'Allah mentions patience over 90 times in the Quran and promises that "Indeed, Allah is with the patient." This divine companionship is the greatest reward for patience.',
      'There are three types of Sabr: patience in obeying Allah\'s commands, patience in avoiding what Allah has forbidden, and patience in bearing the trials Allah has decreed.',
      'The Prophet ﷺ said: "No fatigue, nor disease, nor sorrow, nor sadness, nor hurt, nor distress befalls a Muslim, even if it were the prick of a thorn, but that Allah expiates some of his sins for that."',
      'True Sabr is not mere passive endurance but active perseverance with faith, seeking Allah\'s reward and pleasure through difficulties.'
    ],
    keyPoints: [
      'Patience in hardship, obedience, and restraint',
      'Allah is with the patient',
      'Trials expiate sins',
      'Active perseverance with faith',
      'Leads to Paradise'
    ],
    arabicQuote: 'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
    quoteTranslation: 'Indeed, Allah is with the patient',
    quoteSource: 'Surah Al-Baqarah 2:153',
    duration: 15,
    difficulty: 'beginner'
  }
];

export const getLessonsByCategory = (category: IslamicLesson['category']): IslamicLesson[] => {
  return islamicLessons.filter(lesson => lesson.category === category);
};

export const getLessonById = (id: string): IslamicLesson | undefined => {
  return islamicLessons.find(lesson => lesson.id === id);
};

export const categories = [
  { id: 'pillars', name: 'Five Pillars', arabicName: 'أركان الإسلام', icon: '🕌' },
  { id: 'sacred-places', name: 'Sacred Places', arabicName: 'الأماكن المقدسة', icon: '🕋' },
  { id: 'ethics', name: 'Ethics & Character', arabicName: 'الأخلاق', icon: '💫' },
  { id: 'prophets', name: 'Stories of Prophets', arabicName: 'قصص الأنبياء', icon: '📖' },
  { id: 'quran', name: 'Quranic Studies', arabicName: 'علوم القرآن', icon: '📚' },
  { id: 'history', name: 'Islamic History', arabicName: 'التاريخ الإسلامي', icon: '🏛️' }
] as const;
