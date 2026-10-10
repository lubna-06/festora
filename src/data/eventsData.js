// FESTORA 2026 - Comprehensive Event, Pro Night, Pass, and Venue Data

export const FESTIVAL_INFO = {
  name: "FESTORA",
  year: "2026",
  tagline: "The Annual Inter-Collegiate Cultural & Tech Festival",
  headline: "FEEL THE ENERGY.",
  accentQuote: "Make memories that echo into eternity",
  dates: "November 14 – 16, 2026",
  startDate: "2026-11-14T09:00:00",
  venue: "Metropolis University Main Campus",
  totalPrizePool: "₹5,00,000+",
  footfall: "15,000+",
  collegesParticipating: "80+",
  totalEvents: "35+"
};

export const CATEGORIES = [
  { id: "all", name: "All Events", icon: "✨" },
  { id: "music", name: "Music & Band", icon: "🎸" },
  { id: "dance", name: "Dance & Choreography", icon: "💃" },
  { id: "tech", name: "Tech & Hackathon", icon: "💻" },
  { id: "arts", name: "Fashion & Arts", icon: "🎨" },
  { id: "drama", name: "Dramatics & Literary", icon: "🎭" },
  { id: "gaming", name: "Esports & Gaming", icon: "🎮" }
];

export const EVENTS = [
  {
    id: "battle-of-bands",
    title: "Battle of the Bands: Sound Clash",
    subtitle: "The ultimate acoustic & electric college band showdown",
    category: "music",
    day: "Day 1",
    date: "Nov 14, 2026",
    time: "05:00 PM – 09:30 PM",
    venue: "Main Open-Air Amphitheatre",
    prizePool: "₹60,000",
    entryFee: "₹400 / Band",
    teamType: "Band (3–8 Members)",
    maxSlots: 16,
    registeredCount: 12,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80",
    tags: ["Flagship", "Live Music", "Rock & Fusion"],
    description: "Plug in the amplifiers and turn the decibels up! College bands from across the nation clash with original compositions and high-octane covers for the coveted FESTORA Sound Clash Trophy.",
    rules: [
      "Time limit: 15 minutes (setup + performance) + 5 minutes soundcheck.",
      "At least one original composition is mandatory.",
      "Standard 5-piece drum kit and basic amplifiers will be provided.",
      "Decisions of the celebrity jury will be final and binding."
    ],
    judgingCriteria: ["Originality & Composition", "Technical Tightness & Harmony", "Stage Presence & Audience Response", "Vocal Quality"],
    coordinators: [
      { name: "Aarav Sharma", phone: "+91 98765 43210" },
      { name: "Meera Nair", phone: "+91 98765 43211" }
    ]
  },
  {
    id: "step-up-dance",
    title: "Step Up: Western Mega Dance",
    subtitle: "High-voltage synchronized hip-hop & contemporary crew battle",
    category: "dance",
    day: "Day 2",
    date: "Nov 15, 2026",
    time: "06:00 PM – 09:30 PM",
    venue: "Nirvana Concert Arena",
    prizePool: "₹50,000",
    entryFee: "₹350 / Team",
    teamType: "Crew (8–25 Members)",
    maxSlots: 20,
    registeredCount: 17,
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1000&q=80",
    tags: ["Flagship", "High Energy", "Choreography"],
    description: "Electrifying choreography, gravity-defying stunts, and razor-sharp synchrony. Bring your dance crew to set the stage ablaze under the festival spotlights.",
    rules: [
      "Time limit: 8–10 minutes total stage time.",
      "Tracks must be submitted 2 hours prior to the event in MP3 format (USB).",
      "Props are allowed but must be cleared within 60 seconds post-performance.",
      "Dangerous props (fire, powders, slippery liquids) are strictly prohibited."
    ],
    judgingCriteria: ["Choreography & Synchronization", "Creativity & Formation Flow", "Energy & Expression", "Costumes & Stage Aesthetics"],
    coordinators: [
      { name: "Rohan Kapoor", phone: "+91 98765 43212" },
      { name: "Ananya Sen", phone: "+91 98765 43213" }
    ]
  },
  {
    id: "hackfest-2026",
    title: "HackFest 2026: 24h Buildathon",
    subtitle: "Overnight hackathon building AI, Web3 & sustainable campus tech",
    category: "tech",
    day: "Day 1",
    date: "Nov 14 – 15, 2026",
    time: "11:00 AM (24 Hours)",
    venue: "Tech Park Central Hub & Labs",
    prizePool: "₹75,000 + Cloud Grants",
    entryFee: "Free",
    teamType: "Team (2–4 Members)",
    maxSlots: 40,
    registeredCount: 36,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80",
    tags: ["Coding", "AI & Web", "24 Hours", "Free Entry"],
    description: "24 hours of nonstop caffeine, debugging, and visionary hacking. Pitch working prototypes to founders and tech leaders with tracks in Generative AI, Campus Life, and Social Impact.",
    rules: [
      "All code must be written during the 24-hour hackathon window.",
      "Open-source libraries and APIs are permitted; pre-built full products will be disqualified.",
      "Mentorship rounds will be conducted at 6-hour intervals.",
      "Teams must present a 3-minute pitch followed by a 2-minute live demo."
    ],
    judgingCriteria: ["Innovation & Practicality", "Technical Complexity", "UI/UX & Polish", "Presentation Clarity"],
    coordinators: [
      { name: "Tanmay Singhal", phone: "+91 98765 43214" },
      { name: "Divya Patel", phone: "+91 98765 43215" }
    ]
  },
  {
    id: "vogue-fashion",
    title: "Vogue: Haute Couture Runway",
    subtitle: "The glamorous inter-college fashion design & ramp walk showcase",
    category: "arts",
    day: "Day 2",
    date: "Nov 15, 2026",
    time: "07:30 PM – 10:00 PM",
    venue: "Main Open-Air Amphitheatre",
    prizePool: "₹50,000",
    entryFee: "₹500 / Team",
    teamType: "Team (10–18 Members)",
    maxSlots: 12,
    registeredCount: 9,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
    tags: ["Fashion", "Runway", "Glamour", "Design"],
    description: "Where bold visionary aesthetics meet runway attitude. Teams craft avant-garde wardrobes around the 2026 theme 'Neon Renaissance: Cyber & Elegance'.",
    rules: [
      "Time limit: 12 minutes (empty stage to empty stage).",
      "Teams are judged on attire design, theme relevance, posture, and coordination.",
      "Hair and makeup setup room provided from 02:00 PM.",
      "Vulgarity or explicit props strictly lead to immediate disqualification."
    ],
    judgingCriteria: ["Costume Design & Originality", "Theme Adherence & Storytelling", "Ramp Walk & Poise", "Overall Visual Impact"],
    coordinators: [
      { name: "Isha Malhotra", phone: "+91 98765 43216" },
      { name: "Zaid Khan", phone: "+91 98765 43217" }
    ]
  },
  {
    id: "robowars-carnage",
    title: "RoboWars: Steel Carnage",
    subtitle: "Combat robotics battle in bulletproof enclosed 8m steel arena",
    category: "tech",
    day: "Day 2",
    date: "Nov 15, 2026",
    time: "01:30 PM – 05:30 PM",
    venue: "Engineering Quad Steel Arena",
    prizePool: "₹45,000",
    entryFee: "₹300 / Bot",
    teamType: "Team (2–5 Members)",
    maxSlots: 24,
    registeredCount: 20,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80",
    tags: ["Robotics", "Combat", "High Voltage"],
    description: "Flippers, spinners, wedges, and crushing drums go head-to-head. Build a combat robot under 15kg weight limit and dominate the arena hazards to be crowned Champion.",
    rules: [
      "Robot weight limit: 15.0 kg (+/- 1% tolerance).",
      "Pneumatic pressure must not exceed 10 bar.",
      "Match duration: 3 minutes active combat or knockout.",
      "RF failsafe circuit is strictly mandatory for safety approval."
    ],
    judgingCriteria: ["Aggression & Control", "Damage Inflicted", "Durability under Fire", "Combat Engineering"],
    coordinators: [
      { name: "Vikramaditya Roy", phone: "+91 98765 43218" },
      { name: "Kavya Menon", phone: "+91 98765 43219" }
    ]
  },
  {
    id: "edm-dj-war",
    title: "EDM Pulse: DJ War & Beat Drops",
    subtitle: "Electronic music producers & DJs spinning for the festival crown",
    category: "music",
    day: "Day 3",
    date: "Nov 16, 2026",
    time: "03:00 PM – 06:00 PM",
    venue: "SAC Open Grounds",
    prizePool: "₹35,000 + Festival Opener Slot",
    entryFee: "₹200 / Solo",
    teamType: "Solo DJ",
    maxSlots: 12,
    registeredCount: 11,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80",
    tags: ["EDM", "DJing", "Bass", "Live Mixing"],
    description: "Spin live mashups, progressive drops, techno rhythms, and house beats. The top winner earns the opening slot before the international headliner at the Grand Pro Night!",
    rules: [
      "Set duration: 12 minutes live mixing.",
      "Pioneer CDJ-3000 setup with DJM-900NXS2 mixer will be provided.",
      "No pre-recorded full mix sets; live performance will be monitored by judges.",
      "Audio effects, cue juggling, and transitions will be evaluated."
    ],
    judgingCriteria: ["Mixing Technique & Beatmatching", "Track Selection & Energy Flow", "Crowd Engagement", "Live Creativity"],
    coordinators: [
      { name: "Kunal Deshmukh", phone: "+91 98765 43220" },
      { name: "Simran Kaur", phone: "+91 98765 43221" }
    ]
  },
  {
    id: "valorant-championship",
    title: "Valorant Campus Cup: Spike Rush",
    subtitle: "5v5 competitive LAN tournament on 240Hz esports setups",
    category: "gaming",
    day: "Day 1",
    date: "Nov 14, 2026",
    time: "10:30 AM – 06:00 PM",
    venue: "Cyber Arena Lab 4",
    prizePool: "₹40,000 + Gaming Gear",
    entryFee: "₹250 / Squad",
    teamType: "Squad (5 Players + 1 Sub)",
    maxSlots: 32,
    registeredCount: 29,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80",
    tags: ["Esports", "LAN Tournament", "5v5", "PC Gaming"],
    description: "Clutch the round, deploy tactical utility, and secure match point in the premier college esports championship. Live shoutcasted on the campus big screen.",
    rules: [
      "Custom tournament lobby, Standard Competitive ruleset.",
      "Group stages: Best of 1. Semi-finals & Finals: Best of 3.",
      "Players may bring their own mouse, keyboard, and headsets.",
      "Toxic behavior or unauthorized scripts result in instant forfeit."
    ],
    judgingCriteria: ["Bracket Win/Loss", "Map Differential", "Fair Play & Sportsmanship"],
    coordinators: [
      { name: "Arjun Verma", phone: "+91 98765 43222" },
      { name: "Nikhil Joshi", phone: "+91 98765 43223" }
    ]
  },
  {
    id: "street-cypher-dance",
    title: "Cypher 360: Street Dance Battle",
    subtitle: "1v1 All-Styles & Breaking circle with live beatboxers",
    category: "dance",
    day: "Day 3",
    date: "Nov 16, 2026",
    time: "02:00 PM – 05:00 PM",
    venue: "Student Plaza Rotunda",
    prizePool: "₹25,000",
    entryFee: "₹100 / Dancer",
    teamType: "Solo",
    maxSlots: 32,
    registeredCount: 26,
    image: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&w=1000&q=80",
    tags: ["Street Dance", "Popping", "Breaking", "1v1 Battle"],
    description: "Step into the center of the ring. Underground raw energy, sudden freezes, explosive power moves, and musicality judged by underground street legends.",
    rules: [
      "Prelims: 45-second solo run per dancer.",
      "Top 16 battle format: 2 rounds of 60 seconds each per dancer.",
      "Judges give instant decision by pointing at the winner.",
      "No physical contact or provocative unsportsmanlike behavior."
    ],
    judgingCriteria: ["Musicality & Groove", "Foundation & Technique", "Originality & Style", "Battle Attitude"],
    coordinators: [
      { name: "Sameer Sheikh", phone: "+91 98765 43224" },
      { name: "Pooja Hegde", phone: "+91 98765 43225" }
    ]
  },
  {
    id: "natya-classical-dance",
    title: "Nrityanjali: Classical & Folk Solo",
    subtitle: "Grace, expression, and traditional cultural rhythm",
    category: "dance",
    day: "Day 1",
    date: "Nov 14, 2026",
    time: "01:00 PM – 04:30 PM",
    venue: "Auditorium 1",
    prizePool: "₹30,000",
    entryFee: "₹150 / Solo",
    teamType: "Solo / Duet",
    maxSlots: 20,
    registeredCount: 15,
    image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=1000&q=80",
    tags: ["Classical", "Tradition", "Bharatanatyam", "Kathak"],
    description: "Celebrating India's classical heritage. Dancers showcase mudras, bhavas, and intricate footwork across Bharatanatyam, Kathak, Odissi, and folk disciplines.",
    rules: [
      "Time limit: 6–8 minutes performance.",
      "Live instruments or pre-recorded tracks are both permitted.",
      "Brief spoken introduction (under 1 minute) explaining the piece is encouraged."
    ],
    judgingCriteria: ["Bhava & Abhinaya", "Taal & Laya", "Costume & Authenticity", "Stage Coverage"],
    coordinators: [
      { name: "Sita Krishnan", phone: "+91 98765 43226" },
      { name: "Aditi Rao", phone: "+91 98765 43227" }
    ]
  },
  {
    id: "street-play-dramatics",
    title: "Nukkad Natak: Street Theatre",
    subtitle: "High-impact socio-political street play with drums & slogans",
    category: "drama",
    day: "Day 3",
    date: "Nov 16, 2026",
    time: "10:00 AM – 02:00 PM",
    venue: "Central Library Quadrangle",
    prizePool: "₹40,000",
    entryFee: "₹300 / Team",
    teamType: "Team (10–22 Members)",
    maxSlots: 15,
    registeredCount: 13,
    image: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1000&q=80",
    tags: ["Theatre", "Street Play", "Social Voice", "Dhol"],
    description: "No microphones, no artificial lights — just pure passion, beating dhols, powerful chorus, and thought-provoking scripts that challenge societal norms.",
    rules: [
      "Time limit: 15–18 minutes (warning bell at 15 mins).",
      "Only acoustic instruments (dhol, dafli, flute, ghungroo) permitted.",
      "No electronic amplification allowed.",
      "Must not target specific individuals or promote communal disharmony."
    ],
    judgingCriteria: ["Script & Social Relevance", "Voice Projection & Diction", "Formations & Team Harmony", "Audience Impact"],
    coordinators: [
      { name: "Devendra Verma", phone: "+91 98765 43228" },
      { name: "Harshita Saxena", phone: "+91 98765 43229" }
    ]
  },
  {
    id: "bgmi-mobile-esports",
    title: "Battlegrounds Mobile: Squad Royale",
    subtitle: "Erangle & Miramar drop with 16 top collegiate squads",
    category: "gaming",
    day: "Day 2",
    date: "Nov 15, 2026",
    time: "11:00 AM – 03:00 PM",
    venue: "SAC Seminar Hall",
    prizePool: "₹30,000",
    entryFee: "₹200 / Squad",
    teamType: "Squad (4 Players)",
    maxSlots: 32,
    registeredCount: 28,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80",
    tags: ["Mobile Gaming", "BGMI", "Survival", "Battle Royale"],
    description: "Survival instincts and precision zone rotations. 4 custom room matches across Erangel and Miramar with official esports point distribution.",
    rules: [
      "Matches played on mobile phones only; tablets/emulators strictly barred.",
      "Official tournament points table (1 pt per kill + placement points).",
      "All devices must be connected to the dedicated tournament WiFi."
    ],
    judgingCriteria: ["Total Placement + Kill Points across 4 Matches"],
    coordinators: [
      { name: "Siddharth Jain", phone: "+91 98765 43230" },
      { name: "Farhan Qureshi", phone: "+91 98765 43231" }
    ]
  },
  {
    id: "graffiti-mural-arts",
    title: "Canvas & Wall: Live Graffiti Fest",
    subtitle: "Transforming 8x6ft outdoor panels into vibrant spray art",
    category: "arts",
    day: "Day 1",
    date: "Nov 14, 2026",
    time: "10:00 AM – 03:00 PM",
    venue: "Design Block Walkway",
    prizePool: "₹25,000",
    entryFee: "₹150 / Team",
    teamType: "Solo / Duo",
    maxSlots: 15,
    registeredCount: 11,
    image: "https://images.unsplash.com/photo-1561055657-b9e0bf0fa360?auto=format&fit=crop&w=1000&q=80",
    tags: ["Graffiti", "Fine Arts", "Live Canvas", "Spray Art"],
    description: "Grab the spray cans, acrylics, and stencil brushes. Transform raw festival walls into psychedelic masterpieces celebrating youth culture and futuristic dreams.",
    rules: [
      "Duration: 4.5 hours.",
      "8ft x 6ft primed wooden panel provided per team.",
      "Teams must bring their own spray cans and basic safety masks.",
      "Theme will be announced 30 minutes before kick-off."
    ],
    judgingCriteria: ["Aesthetic & Technique", "Creativity & Theme Interpretation", "Color Harmony", "Composition"],
    coordinators: [
      { name: "Alia Fernandes", phone: "+91 98765 43232" },
      { name: "Rahul Soni", phone: "+91 98765 43233" }
    ]
  }
];

export const PRO_NIGHTS = [
  {
    id: "pro-1",
    day: "DAY 01 • NOV 14",
    title: "SYNAPSE: INDIE ROCK & FUSION NIGHT",
    headliner: "THE LOCAL TRAIN TRIBUTE & THE YELLOW DIARY",
    genre: "Alternative Rock / Indie Fusion / Psychedelic Hindi Rock",
    time: "07:30 PM Onwards",
    venue: "Nirvana Concert Grounds",
    badge: "OPENING NIGHT SPECTACULAR",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=80",
    description: "Kicking off FESTORA 2026 with soul-stirring melodies, soaring rock solos, and thousands of voices singing together under the starry campus sky."
  },
  {
    id: "pro-2",
    day: "DAY 02 • NOV 15",
    title: "ECHOES: COMEDY SPECIAL & BOLLYWOOD BLAST",
    headliner: "SAMAY RAINA & KANIKA KAPOOR LIVE",
    genre: "Standup Comedy / High-Energy Bollywood Hits / Sufi Fusion",
    time: "07:00 PM Onwards",
    venue: "Main Open-Air Amphitheatre",
    badge: "STAR NIGHT EXTRAVAGANZA",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80",
    description: "An unmissable evening starting with side-splitting standup comedy, culminating in a chart-topping Bollywood concert with live brass and dhol."
  },
  {
    id: "pro-3",
    day: "DAY 03 • NOV 16",
    title: "AFTERGLOW: THE GRAND EDM FINALE",
    headliner: "LOST STORIES & NUCLEYA LIVE SET",
    genre: "Bass Raja / Progressive EDM / Lasers & Pyro Show",
    time: "08:00 PM Till Midnight",
    venue: "Nirvana Concert Grounds (Main Stage)",
    badge: "FESTIVAL FINALE",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",
    description: "The grand closing spectacle of FESTORA 2026. Massive LED walls, co2 cannons, fireworks, and earth-shattering bass drops to cap off three unforgettable days."
  }
];

export const PASS_TIERS = [
  {
    id: "silver",
    name: "Campus Silver",
    price: "₹0",
    priceNum: 0,
    subtitle: "Essential Day Access Pass",
    badge: "Free Entry",
    isPopular: false,
    color: "#94a3b8",
    features: [
      "Access to all Day 1, 2, 3 day events & competitions",
      "Spectator access to open campus stages & exhibitions",
      "Entry to Food Truck Alley & Gaming Lounges",
      "Digital Festival Certificate of Attendance",
      "Standard entry gate access"
    ],
    proNightAccess: "General Standing (Subject to capacity)",
    ctaText: "Claim Free Pass"
  },
  {
    id: "gold",
    name: "Festival Gold",
    price: "₹299",
    priceNum: 299,
    subtitle: "Most Popular • Full Event & Concert Pass",
    badge: "Best Value",
    isPopular: true,
    color: "#a855f7",
    features: [
      "Guaranteed priority entry to all 3 Pro Concert Nights",
      "Free registration for up to 3 competitive events",
      "FESTORA 2026 Official Festival Wristband",
      "Exclusive 15% discount vouchers at Food Truck Alley",
      "Fast-track priority registration counter",
      "Digital HD Festival photo gallery access"
    ],
    proNightAccess: "Reserved Gold Enclosure (Mid-Arena)",
    ctaText: "Get Gold Pass"
  },
  {
    id: "vip",
    name: "VIP Platinum Backstage",
    price: "₹799",
    priceNum: 799,
    subtitle: "Ultimate All-Access VIP Experience",
    badge: "Limited (Only 200)",
    isPopular: false,
    color: "#ec4899",
    features: [
      "Front-Row VIP Pit access right in front of the stage",
      "Artist Meet & Greet opportunity (Subject to slot)",
      "Official FESTORA 2026 Premium Hoodie & Merch Kit",
      "Unlimited competitive event registrations",
      "Exclusive AC VIP Lounge access with refreshments",
      "Dedicated VIP parking & express barcode scanning"
    ],
    proNightAccess: "Front-Row VIP Enclosure + Backstage Lounge",
    ctaText: "Book VIP Experience"
  }
];

export const SCHEDULE_TIMELINE = [
  {
    day: "Day 1",
    dayLabel: "Friday • Nov 14",
    theme: "IGNITION & INNOVATION",
    slots: [
      { time: "09:00 AM", title: "Grand Opening Ceremony & Lamp Lighting", venue: "Main Amphitheatre", category: "all", highlight: true },
      { time: "10:00 AM", title: "Canvas & Wall: Live Graffiti Fest Begins", venue: "Design Block Walkway", category: "arts" },
      { time: "10:30 AM", title: "Valorant Campus Cup: Bracket Stages", venue: "Cyber Arena Lab 4", category: "gaming" },
      { time: "11:00 AM", title: "HackFest 2026: 24h Buildathon Kick-off", venue: "Tech Park Central", category: "tech", highlight: true },
      { time: "01:00 PM", title: "Nrityanjali: Classical & Folk Solo", venue: "Auditorium 1", category: "dance" },
      { time: "05:00 PM", title: "Battle of the Bands: Sound Clash", venue: "Main Amphitheatre", category: "music", highlight: true },
      { time: "07:30 PM", title: "PRO NIGHT 1: Indie Rock & Fusion Night", venue: "Nirvana Concert Grounds", category: "music", highlight: true, pro: true }
    ]
  },
  {
    day: "Day 2",
    dayLabel: "Saturday • Nov 15",
    theme: "ENERGY, BEATS & GLAMOUR",
    slots: [
      { time: "10:00 AM", title: "Tech Project Expo & Robotics Show", venue: "Engineering Quad", category: "tech" },
      { time: "11:00 AM", title: "HackFest 2026: Mid-Evaluation & Mentoring", venue: "Tech Park Central", category: "tech" },
      { time: "11:00 AM", title: "BGMI Mobile: Squad Royale Finals", venue: "SAC Seminar Hall", category: "gaming" },
      { time: "01:30 PM", title: "RoboWars: Steel Carnage (Knockouts)", venue: "Steel Arena Quad", category: "tech", highlight: true },
      { time: "04:00 PM", title: "HackFest 2026: Final Demos & Pitching", venue: "Tech Park Auditorium", category: "tech" },
      { time: "06:00 PM", title: "Step Up: Western Mega Dance Battle", venue: "Nirvana Arena", category: "dance", highlight: true },
      { time: "07:30 PM", title: "Vogue: Haute Couture Runway", venue: "Main Amphitheatre", category: "arts", highlight: true },
      { time: "09:00 PM", title: "PRO NIGHT 2: Samay Raina & Kanika Kapoor", venue: "Main Amphitheatre", category: "music", highlight: true, pro: true }
    ]
  },
  {
    day: "Day 3",
    dayLabel: "Sunday • Nov 16",
    theme: "FINALE & ELECTRIC CLIMAX",
    slots: [
      { time: "10:00 AM", title: "Nukkad Natak: Street Theatre Championship", venue: "Library Quadrangle", category: "drama", highlight: true },
      { time: "11:30 AM", title: "College Quiz & Debate Climax", venue: "Auditorium 2", category: "drama" },
      { time: "01:00 PM", title: "Food & Mocktail Carnival Specials", venue: "Food Truck Alley", category: "all" },
      { time: "02:00 PM", title: "Cypher 360: Street Dance 1v1 Battle", venue: "Student Plaza", category: "dance", highlight: true },
      { time: "03:00 PM", title: "EDM Pulse: DJ War Finals", venue: "SAC Grounds", category: "music" },
      { time: "05:30 PM", title: "Grand Awards Ceremony & Trophy Presentation", venue: "Main Amphitheatre", category: "all", highlight: true },
      { time: "08:00 PM", title: "GRAND PRO NIGHT: Lost Stories & Nucleya Live", venue: "Nirvana Concert Grounds", category: "music", highlight: true, pro: true }
    ]
  }
];

export const VENUES = [
  {
    name: "Main Open-Air Amphitheatre",
    tag: "Zone A",
    capacity: "5,000+ Attendees",
    desc: "Acoustically tuned natural bowl with multi-tier stage, concert lighting and LED background.",
    events: "Battle of the Bands, Vogue, Pro Night 2"
  },
  {
    name: "Nirvana Concert Grounds",
    tag: "Zone B",
    capacity: "12,000+ Attendees",
    desc: "Sprawling grass grounds hosting the festival mainstage, laser rigs, and fireworks displays.",
    events: "Pro Night 1 & 3, Step Up Dance"
  },
  {
    name: "Tech Park Central Hub",
    tag: "Zone C",
    capacity: "1,500+ Attendees",
    desc: "High-speed gigabit fiber hubs, workstations, server access, and mentor lounge.",
    events: "HackFest 2026, Project Expo"
  },
  {
    name: "Cyber Arena Lab 4",
    tag: "Zone D",
    capacity: "400+ Attendees",
    desc: "State-of-the-art competitive gaming lab with 240Hz monitors, noise-canceling booths.",
    events: "Valorant Masters, BGMI Showdown"
  },
  {
    name: "Central Library Quad",
    tag: "Zone E",
    capacity: "2,000+ Attendees",
    desc: "Open circular paved arena optimal for acoustics, crowd circles, and street theatre.",
    events: "Nukkad Natak, Cypher 360"
  },
  {
    name: "Food Truck Alley & Bazaar",
    tag: "Zone F",
    capacity: "Open Access",
    desc: "35+ curated food stalls, artisan craft pop-ups, festival merch counters, and rest zones.",
    events: "Chill Zone, Merch & Dining"
  }
];

export const FAQS = [
  {
    q: "Who is eligible to participate in FESTORA 2026?",
    a: "FESTORA is open to all bona fide college and university students across India. Both undergraduate and postgraduate students with a valid college ID card are welcome to attend and compete."
  },
  {
    q: "Do I need to pay an entry fee to enter the campus?",
    a: "Campus entry during the day is 100% FREE with the Campus Silver Pass. To guarantee entry to evening Pro Concert Nights or to register for select prize-pool events, you can claim the Gold or VIP Pass."
  },
  {
    q: "How do event registrations and spot registrations work?",
    a: "Online registrations are strongly recommended as slots for flagship events (HackFest, Battle of the Bands, Step Up) fill up quickly. Spot registrations on festival days will only be permitted if open slots remain."
  },
  {
    q: "Can teams contain members from different colleges?",
    a: "Cross-college teams are permitted in HackFest 2026 and Esports events. However, for Battle of the Bands, Step Up, and Vogue, all members of a crew must represent the same registered educational institution."
  },
  {
    q: "Is accommodation available for outstation participants?",
    a: "Yes! Host college hostel accommodation is available on a first-come, first-served basis for outstation teams at a nominal charge of ₹200/day including breakfast. Contact the Hospitality Desk."
  },
  {
    q: "What security and identification guidelines must be followed?",
    a: "Every attendee must carry their original college photo ID card along with their FESTORA Digital Pass with QR Code on their smartphone. Intoxication or hazardous materials are strictly banned."
  }
];

export const SPONSORS = [
  { name: "Red Bull", tier: "Energy Partner", logo: "⚡ RedBull" },
  { name: "Spotify", tier: "Official Music Partner", logo: "🎧 Spotify" },
  { name: "Intel", tier: "Tech Innovation Partner", logo: "💻 Intel" },
  { name: "GitHub", tier: "Hackathon Partner", logo: "🐙 GitHub" },
  { name: "Monster", tier: "Esports Powered By", logo: "🔋 Monster" },
  { name: "OnePlus", tier: "Official Smartphone", logo: "📱 OnePlus" }
];
