// All content in English with editorial, attractive copywriting.
// Original creative writing — no reproduced marketing copy.

const CDN = 'https://cdn.prod.website-files.com/64e31036eccea9001058bfc8';
const CDN2 = 'https://cdn.prod.website-files.com/64e85c16c3e5fe1806b372fc';

export const JAVION_LOGO = '/images/javion-logo.png';

export const BRAND = {
  navy: '#0A1D37',
  navyMid: '#1e4976',
  cyan: '#38B6FF',
  cyanDark: '#0095D9',
  bg: '#f4f6f8',
  bgWhite: '#ffffff',
};
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/realisations' },
  { label: 'Studio', href: '/equipe-metal360' },
  { label: 'Craft', href: '/expertise' },
];

export const HERO_VIDEO_POSTER = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=srgb&fm=jpg&w=2400&q=85';
/* Factory / manufacturing — HD streams load more reliably than UHD */
export const HERO_VIDEO = 'https://videos.pexels.com/video-files/4488740/4488740-hd_1920_1080_25fps.mp4';
export const HERO_VIDEO_FALLBACK = 'https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4';

const px = (path, w = 2400) =>
  `https://images.pexels.com/photos/${path}?auto=compress&cs=tinysrgb&w=${w}&fit=crop`;

const us = (id, w = 2400) =>
  `https://images.unsplash.com/photo-${id}?crop=entropy&cs=srgb&fm=jpg&w=${w}&q=85`;

/** Cinematic page imagery — stable Pexels/Unsplash URLs */
export const CINEMATIC_IMG = {
  factoryFloor: us('1581091226825-a6a2a5aee158'),
  cncMachine: px('3846390/pexels-photo-3846390.jpeg'),
  fasteners: px('162625/bolt-screw-nut-washer-162625.jpeg'),
  threading: us('1621905252507-b35492cc74b4'),
  warehouse: us('1586528116311-ad8dd3c8310d'),
  qualityCheck: px('3861969/pexels-photo-3861969.jpeg'),
  assemblyLine: px('4489740/pexels-photo-4489740.jpeg'),
  industrialPlant: us('1565793298595-6a879b1d9492'),
  designSpec: px('3862139/pexels-photo-3862139.jpeg'),
  forge: us('1531053326607-9d349096d887'),
  oilGas: px('257700/pexels-photo-257700.jpeg'),
  marine: px('163236/ship-container-port-163236.jpeg'),
  aerospace: px('46148/aircraft-jet-landing-cloud-46148.jpeg'),
  automotive: us('1492144534655-ae79c964c9d7'),
  construction: us('1541888946425-d81bb19240f5'),
  electronics: us('1518770660439-4636190af475'),
  heavyMachinery: us('1581092160562-40aa08e78837'),
  solarEnergy: us('1509391366360-2e959784a276'),
  fallback: us('1581091226825-a6a2a5aee158'),
};

export function onCinematicImgError(e) {
  if (!e?.currentTarget) return;
  e.currentTarget.onerror = null;
  e.currentTarget.src = CINEMATIC_IMG.fallback;
}

export const PROJECTS = [
  {
    id: 'p1',
    slug: 'infinite-spiral',
    category: 'Staircases',
    title: 'Infinite Spiral',
    excerpt: 'A helical staircase, drawn in a single breath. Carbon steel curves that seem to climb without touching the ground.',
    cover: `${CDN2}/69fb5afeb004b1f42c09cefc_PHOTO-PRINCIPALE.jpg`,
    thumbs: [],
  },
  {
    id: 'p2',
    slug: 'quiet-elegance',
    category: 'Staircases',
    title: 'Quiet Elegance',
    excerpt: 'Where restraint becomes presence. Blackened steel treads suspended in a wash of natural light.',
    cover: `${CDN2}/69fb5a37ef8470ae3c5c959e_PHOTO-PRINCIPALE.jpg`,
    thumbs: [],
  },
  {
    id: 'p3',
    slug: 'transparent-line',
    category: 'Railings',
    title: 'Transparent Line',
    excerpt: 'A seaside villa, dressed in tempered glass and brushed stainless. The horizon stays uninterrupted.',
    cover: `${CDN2}/69256b1bda8f0bc1569a2d89_PHOTO%20DE%20COUVERTURE.jpg`,
    thumbs: [],
  },
  {
    id: 'p4',
    slug: 'levitation',
    category: 'Staircases',
    title: 'Levitation',
    excerpt: 'Cantilevered treads, no visible support. A staircase that defies the weight of its own steel.',
    cover: `${CDN2}/692568c228ef131b45e49d5d_PHOTO%20DE%20COUVERTURE.jpg`,
    thumbs: [],
  },
  {
    id: 'p5',
    slug: 'griffon',
    category: 'Statement pieces',
    title: 'The Griffon',
    excerpt: 'A monumental sculpture carved in weathered steel — a guardian for a thousand-year-old fortress.',
    cover: `${CDN}/65323ec1a64d6d0909b8ffb5_metal360_griffon_tiffauges_143_BD.jpg`,
    thumbs: [],
  },
  {
    id: 'p6',
    slug: 'pergola',
    category: 'Shade Structures',
    title: 'Open Pergola',
    excerpt: 'A pavilion of slender black columns and infinite sky. Built to frame a riverside terrace, made to stay.',
    cover: `${CDN}/65323ec1715331597422d103_metal360_pergola_vertou_414__bd-2.jpg`,
    thumbs: [],
  },
  {
    id: 'p7',
    slug: 'mill',
    category: 'Steel Joinery',
    title: 'The Old Mill',
    excerpt: 'Heritage windows, reimagined in fine steel profiles. Where preservation meets new geometry.',
    cover: `${CDN}/65323ec153e01bf83befac41_metal360_moulin_neuf_76__bd.jpg`,
    thumbs: [],
  },
  {
    id: 'p8',
    slug: 'kiosk',
    category: 'Statement pieces',
    title: 'River Kiosk',
    excerpt: 'A pavilion folded from a single sheet of geometry. Half shelter, half sculpture, all steel.',
    cover: `${CDN}/65323ec1a20d785f6469cdd2_kiosque_la_digue_03_bd3-2.jpg`,
    thumbs: [],
  },
  {
    id: 'p9',
    slug: 'glass-house',
    category: 'Partitions',
    title: 'Hidden Cellar',
    excerpt: 'A glass-and-steel partition for a secret tasting room — where wine, light, and metal hold their breath together.',
    cover: `${CDN}/65323ec1afb79142dd44bc6f_gite_caves_secretes190_HDR_bd.jpg`,
    thumbs: [],
  },
];

export const CATEGORIES = [
  'Statement pieces',
  'Furniture',
  'Shade Structures',
  'Gates',
  'Steel Joinery',
  'Partitions',
  'Railings',
  'Staircases',
];

export const GRID_IMAGES = [
  `${CDN}/6585aed73af0216be7ce9177_1.jpg`,
  `${CDN}/6585aef8f79350c50bb6a4c5_5.jpg`,
  `${CDN}/65323ec1a64d6d0909b8ffb5_metal360_griffon_tiffauges_143_BD.jpg`,
  `${CDN}/6585af116a5f8901ef16e075_2.jpg`,
  `${CDN}/6585af51275240840e6b4482_6.jpg`,
  `${CDN}/65323ec1afb79142dd44bc6f_gite_caves_secretes190_HDR_bd.jpg`,
  `${CDN}/65323ec1a20d785f6469cdd2_kiosque_la_digue_03_bd3-2.jpg`,
  `${CDN}/6585af7111a1f512361e9407_3.jpg`,
  `${CDN}/6585af83ce95d990878cdc4c_7.jpg`,
  `${CDN}/6585af991f383a677de56f25_4.jpg`,
  `${CDN}/6585b016a3ad832602b41b97_8.jpg`,
  `${CDN}/65323ec153e01bf83befac41_metal360_moulin_neuf_76__bd.jpg`,
];

export const TEAM_PHOTO = `${CDN}/651c08b16dfb35365e6a096b_metal360_groupe_sept_23.jpg`;

export const FOUNDER = {
  name: 'Tommy Bouchet',
  role: 'Founder · Master Artisan',
  photo: `${CDN}/651c08b16dfb35365e6a096b_metal360_groupe_sept_23.jpg`,
  bio: "Tommy founded Metal360 with a simple conviction — that a metalworker should be an author. Twenty years at the bench taught him every alloy speaks a different language: steel sings, stainless whispers, brass remembers, copper warms. Today he leads a studio of artisans who treat every commission as a portrait — patient, exact, and impossible to mistake for anyone else's hand.",
};

export const TESTIMONIALS = [
  {
    quote: "We came in with a sketch. We left with an heirloom. The team treats every weld like a signature — and you can feel it from the first conversation to the final install.",
    author: 'Florence J.',
    title: 'Private Collector',
  },
  {
    quote: "Drawings respected. Deadlines respected. Craft respected. In our industry that combination is almost a myth — Metal360 made it the standard for our project.",
    author: 'Endy M.',
    title: 'Managing Director',
  },
  {
    quote: "Brutally precise without ever feeling industrial. The patina, the joinery, the silence of a well-cut edge — every detail was thought about twice and made once.",
    author: 'Nicolas P.',
    title: 'Heritage Architect',
  },
  {
    quote: "A workshop with the discipline of a watchmaker and the imagination of a sculptor. A rare and welcome combination in modern metalwork.",
    author: 'Jan M.',
    title: 'Editor-in-Chief, Metal Flash',
  },
  {
    quote: "They listened first, designed second, and over-delivered third. Our staircase isn't a staircase anymore — it's the heart of the house. We can't wait to start project number two.",
    author: 'François F.',
    title: 'Homeowner',
  },
];

export const CONTACT = {
  phone: '+33 6 41 99 00 29',
  email: 'studio@metal360.fr',
  address: 'Le Bordage — Route de Tiffauges, 49660 Sèvremoine, France',
};

export const FOOTER_PAGES = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/realisations' },
  { label: 'Studio', href: '/equipe-metal360' },
  { label: 'Craft', href: '/expertise' },
  { label: 'Awards', href: '/distinctions' },
  { label: 'Contact', href: '#contact' },
];

export const MARQUEE_IMAGES_ROW1 = [
  `${CDN}/6585aed73af0216be7ce9177_1.jpg`,
  `${CDN}/65323ec1a64d6d0909b8ffb5_metal360_griffon_tiffauges_143_BD.jpg`,
  `${CDN}/6585af116a5f8901ef16e075_2.jpg`,
  `${CDN}/65323ec1a20d785f6469cdd2_kiosque_la_digue_03_bd3-2.jpg`,
  `${CDN}/6585af7111a1f512361e9407_3.jpg`,
  `${CDN}/6585af991f383a677de56f25_4.jpg`,
];

export const MARQUEE_IMAGES_ROW2 = [
  `${CDN}/6585aef8f79350c50bb6a4c5_5.jpg`,
  `${CDN}/65323ec1afb79142dd44bc6f_gite_caves_secretes190_HDR_bd.jpg`,
  `${CDN}/6585af51275240840e6b4482_6.jpg`,
  `${CDN}/65323ec153e01bf83befac41_metal360_moulin_neuf_76__bd.jpg`,
  `${CDN}/6585af83ce95d990878cdc4c_7.jpg`,
  `${CDN}/6585b016a3ad832602b41b97_8.jpg`,
];

export const LOGOS = {
  epv: `${CDN}/653fc63278e5b75221f03575_entreprise-du-patrimoine-vivant-epv-logo-vector.svg`,
  maitre: `${CDN}/684737782e55051e7fd1be80_logo-Maitreartisan.svg`,
};

/* Certifications & Quality — Page 6 */
export const ISO_CERTIFICATIONS = [
  {
    id: 'iso-9001',
    name: 'ISO 9001:2015',
    title: 'Quality Management System',
    issuer: 'Bureau Veritas',
    validFrom: 'Jan 2023',
    validUntil: 'Dec 2026',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=srgb&fm=jpg&w=800&q=85',
    pdf: '/documents/javion-iso-9001.pdf',
  },
  {
    id: 'iso-14001',
    name: 'ISO 14001:2015',
    title: 'Environmental Management',
    issuer: 'TÜV SÜD',
    validFrom: 'Mar 2022',
    validUntil: 'Feb 2025',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?crop=entropy&cs=srgb&fm=jpg&w=800&q=85',
    pdf: '/documents/javion-iso-14001.pdf',
  },
  {
    id: 'iso-45001',
    name: 'ISO 45001:2018',
    title: 'Occupational Health & Safety',
    issuer: 'SGS',
    validFrom: 'Jun 2023',
    validUntil: 'May 2026',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?crop=entropy&cs=srgb&fm=jpg&w=800&q=85',
    pdf: '/documents/javion-iso-45001.pdf',
  },
];

export const QC_PROCESS = [
  {
    step: '01',
    title: 'Incoming Inspection',
    desc: 'Raw material verification — chemical composition, mill certificates, and dimensional checks on every batch before release to production.',
    icon: 'incoming',
  },
  {
    step: '02',
    title: 'In-Process Control',
    desc: 'Continuous monitoring during threading, heat treatment, and coating — hardness, pitch diameter, and torque sampling at defined intervals.',
    icon: 'process',
  },
  {
    step: '03',
    title: 'Final Inspection',
    desc: '100% visual and dimensional audit, thread gauge verification, coating thickness measurement, and packaging integrity before dispatch.',
    icon: 'final',
  },
];

export const TESTING_STANDARDS = [
  { code: 'ISO', label: 'ISO Standards', desc: '9001 · 4042 · 898' },
  { code: 'DIN', label: 'DIN Norms', desc: '933 · 934 · 912' },
  { code: 'ASTM', label: 'ASTM Specs', desc: 'A193 · A325 · F593' },
  { code: 'BS', label: 'British Standards', desc: '4190 · 3692' },
  { code: 'JIS', label: 'JIS Standards', desc: 'B1180 · B1186' },
];

export const LAB_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=srgb&fm=jpg&w=1200&q=85',
    alt: 'Quality lab — dimensional inspection station',
    caption: 'Dimensional inspection',
  },
  {
    src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?crop=entropy&cs=srgb&fm=jpg&w=1200&q=85',
    alt: 'Hardness testing equipment',
    caption: 'Hardness testing',
  },
  {
    src: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?crop=entropy&cs=srgb&fm=jpg&w=1200&q=85',
    alt: 'Microscopy and surface analysis',
    caption: 'Surface analysis',
  },
  {
    src: 'https://images.unsplash.com/photo-1560174038-2b7660498b93?crop=entropy&cs=srgb&fm=jpg&w=1200&q=85',
    alt: 'Thread gauge verification',
    caption: 'Thread verification',
  },
];

export const CERTIFICATE_DOWNLOADS = ISO_CERTIFICATIONS.map(({ id, name, title, pdf }) => ({
  id,
  name,
  title,
  pdf,
  size: '1.2 MB',
}));

export const CERT_ISSUER_LOGOS = [
  { id: 'bv', name: 'Bureau Veritas', abbr: 'BV' },
  { id: 'tuv', name: 'TÜV SÜD', abbr: 'TÜV' },
  { id: 'sgs', name: 'SGS', abbr: 'SGS' },
  { id: 'dnv', name: 'DNV', abbr: 'DNV' },
  { id: 'intertek', name: 'Intertek', abbr: 'INT' },
];

/* Page 4 — Industries We Cater */
export const INDUSTRIES = [
  {
    id: 'automotive',
    name: 'Automotive',
    tagline: 'Assembly-line precision at scale',
    description:
      'Fasteners engineered for vehicle assembly lines — chassis connections, engine components, suspension hardware, and interior trim. Torque-controlled, vibration-resistant, and fully traceable to OEM specifications.',
    products: ['Hex head bolts', 'Flange nuts', 'Engine studs', 'Chassis U-bolts'],
    image: CINEMATIC_IMG.automotive,
    icon: 'car',
  },
  {
    id: 'construction',
    name: 'Construction',
    tagline: 'Structural integrity from foundation up',
    description:
      'Anchor bolts, structural fasteners, and concrete hardware for commercial and infrastructure projects. Hot-dip galvanized and weather-resistant options for long-term load-bearing performance.',
    products: ['Anchor bolts', 'Structural bolts', 'Expansion anchors', 'Threaded rods'],
    image: CINEMATIC_IMG.construction,
    icon: 'building',
  },
  {
    id: 'oil-gas',
    name: 'Oil & Gas',
    tagline: 'Built for extreme pressure & corrosion',
    description:
      'High-pressure, corrosion-resistant fasteners for pipelines, refineries, and offshore rigs. Specialty alloys and coatings rated for sour service, subsea, and high-temperature environments.',
    products: ['Stud bolts', 'Pipeline flanges', 'B7 alloy studs', 'Inconel fasteners'],
    image: CINEMATIC_IMG.oilGas,
    icon: 'fuel',
  },
  {
    id: 'aerospace',
    name: 'Aerospace',
    tagline: 'Precision without compromise',
    description:
      'Lightweight, high-strength fasteners meeting stringent aerospace tolerances. Titanium, A286, and NAS/MS spec hardware for airframe, avionics, and ground support applications.',
    products: ['Titanium bolts', 'Locking nuts', 'Hi-lok pins', 'NAS spec hardware'],
    image: CINEMATIC_IMG.aerospace,
    icon: 'plane',
  },
  {
    id: 'electronics',
    name: 'Electronics',
    tagline: 'Micro hardware, macro reliability',
    description:
      'Micro fasteners, PCB standoffs, and enclosure fittings for consumer electronics, telecom, and industrial control panels. Precision threads and anti-vibration designs for compact assemblies.',
    products: ['PCB standoffs', 'Micro screws', 'Enclosure rivets', 'Cable gland fittings'],
    image: CINEMATIC_IMG.electronics,
    icon: 'cpu',
  },
  {
    id: 'marine',
    name: 'Marine',
    tagline: 'Salt-spray tested & corrosion-proof',
    description:
      'Stainless steel and anti-corrosion fasteners for shipbuilding, port infrastructure, and offshore platforms. A4 marine-grade stainless, duplex alloys, and specialty coatings for harsh sea environments.',
    products: ['A4 stainless bolts', 'Deck screws', 'Duplex studs', 'Silicon bronze hardware'],
    image: CINEMATIC_IMG.marine,
    icon: 'ship',
  },
  {
    id: 'heavy-machinery',
    name: 'Heavy Machinery',
    tagline: 'Large-scale strength for tough jobs',
    description:
      'Large-diameter bolts and heavy-duty hardware for mining, agriculture, and industrial equipment. Grade 10.9 and 12.9 high-tensile fasteners designed for extreme loads and repeated cycling.',
    products: ['Large hex bolts', 'Plow bolts', 'Track shoe bolts', 'Grade 12.9 studs'],
    image: CINEMATIC_IMG.heavyMachinery,
    icon: 'truck',
  },
  {
    id: 'solar-energy',
    name: 'Solar & Energy',
    tagline: 'Mounting hardware for the energy transition',
    description:
      'Solar panel mounting hardware, structural rails, and ground-mount fasteners for utility-scale and rooftop installations. Corrosion-resistant coatings rated for 25+ year outdoor exposure.',
    products: ['Panel mount bolts', 'Rail clamps', 'Ground screw anchors', 'Stainless roof hooks'],
    image: CINEMATIC_IMG.solarEnergy,
    icon: 'sun',
  },
];

export const JAVION_CONTACT = {
  phone: '+91 98765 43210',
  email: 'info@javionfasteners.com',
  address: 'Industrial Estate, Rajkot, Gujarat, India',
  whatsapp: '919876543210',
};

export const CINEMATIC_FOOTER_LINKS = [
  { label: 'Products', href: '#scatter' },
  { label: 'Industries', href: '#industries' },
  { label: 'Quality', href: '#quality' },
  { label: 'Get a Quote', href: '#quote' },
  { label: 'Home', href: '/' },
];

export const NEWSLETTER = {
  title: 'Stay in the loop',
  description: 'Product updates, industry insights, and manufacturing news — once a month, no spam.',
  placeholder: 'Your work email',
  button: 'SUBSCRIBE',
  success: 'Thanks — you\'re on the list.',
};
