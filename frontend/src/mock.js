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

export const CERT_ISSUER_LOGOS = [
  { id: 'bv', name: 'Bureau Veritas', abbr: 'BV' },
  { id: 'tuv', name: 'TÜV SÜD', abbr: 'TÜV' },
  { id: 'sgs', name: 'SGS', abbr: 'SGS' },
  { id: 'dnv', name: 'DNV', abbr: 'DNV' },
  { id: 'intertek', name: 'Intertek', abbr: 'INT' },
];

/* Products page */
export const PRODUCT_CATEGORIES = [
  'All',
  'Bolts',
  'Nuts',
  'Screws',
  'Studs',
  'Anchors',
  'Washers',
];

export const PRODUCTS = [
  {
    id: 'hex-bolts',
    name: 'Hex Head Bolts',
    category: 'Bolts',
    grades: '8.8 · 10.9 · 12.9',
    sizes: 'M6 – M36',
    finish: 'Black oxide, Zinc, HDG',
    description: 'Precision cold-formed hex bolts for structural and OEM assemblies — consistent torque and full traceability.',
    overview: 'Our hex head bolts are cold-formed on multi-stage headers, rolled for precise threads, and heat-treated to target property classes. Every batch is dimensionally verified and traceable from wire rod to dispatch — ready for structural frames, OEM lines, and heavy assemblies.',
    applications: ['Structural steel & fabrication', 'OEM machinery assemblies', 'Construction frameworks', 'Industrial equipment'],
    standards: ['ISO 4014 / 4017', 'DIN 931 / 933', 'ASME B18.2.1'],
    features: ['Controlled thread pitch & runout', 'Full heat-treat lot traceability', 'Multiple coating options', 'Custom lengths on request'],
    image: CINEMATIC_IMG.fasteners,
    gallery: [CINEMATIC_IMG.fasteners, CINEMATIC_IMG.threading, CINEMATIC_IMG.qualityCheck],
  },
  {
    id: 'flange-bolts',
    name: 'Flange Bolts',
    category: 'Bolts',
    grades: '8.8 · 10.9',
    sizes: 'M8 – M24',
    finish: 'Zinc flake, Geomet',
    description: 'Integrated washer face for vibration-prone joints in automotive and heavy equipment.',
    overview: 'Flange bolts combine fastener and washer in one piece — distributing clamp load and resisting loosening under vibration. Ideal for chassis, powertrain, and equipment joints where secondary washers slow the line.',
    applications: ['Automotive chassis & powertrain', 'Heavy equipment joints', 'Agricultural machinery', 'Compressor & pump assemblies'],
    standards: ['ISO 4162', 'DIN 6921', 'OEM prints'],
    features: ['Integral flange bearing face', 'Optional serrations under head', 'High corrosion coatings', 'Consistent under-head fillet'],
    image: CINEMATIC_IMG.assemblyLine,
    gallery: [CINEMATIC_IMG.assemblyLine, CINEMATIC_IMG.automotive, CINEMATIC_IMG.fasteners],
  },
  {
    id: 'u-bolts',
    name: 'U-Bolts',
    category: 'Bolts',
    grades: '8.8 · Custom',
    sizes: 'M8 – M30',
    finish: 'HDG, Zinc',
    description: 'Chassis and pipe clamp U-bolts formed to drawing — bent, threaded, and coated in-house.',
    overview: 'U-bolts are formed from wire or bar, threaded on both legs, and finished to your bend radius and length. Used for exhaust, leaf-spring, and pipe clamp applications where geometry must match the assembly exactly.',
    applications: ['Leaf-spring & axle clamps', 'Exhaust and muffler mounts', 'Pipe & conduit supports', 'Trailer and chassis hardware'],
    standards: ['Customer drawings', 'SAE J429 (grade options)', 'ISO metric threads'],
    features: ['Custom bend radius & leg length', 'Equal or unequal leg options', 'Hot-dip galvanizing available', 'Prototype-to-volume capability'],
    image: CINEMATIC_IMG.automotive,
    gallery: [CINEMATIC_IMG.automotive, CINEMATIC_IMG.forge, CINEMATIC_IMG.warehouse],
  },
  {
    id: 'hex-nuts',
    name: 'Hex Nuts',
    category: 'Nuts',
    grades: '8 · 10 · 12',
    sizes: 'M6 – M36',
    finish: 'Plain, Zinc, HDG',
    description: 'Matched-class hex nuts with controlled proof load for reliable clamp force.',
    overview: 'Hex nuts are manufactured to property classes that pair with your bolt grade — ensuring proof load, hardness, and thread fit stay within specification across every lot.',
    applications: ['General structural fastening', 'Machinery assembly', 'Infrastructure hardware', 'Maintenance & MRO kits'],
    standards: ['ISO 4032', 'DIN 934', 'ASME B18.2.2'],
    features: ['Property class matched to bolts', 'Clean thread gauging', 'Wide finish range', 'Bulk & kit packaging'],
    image: CINEMATIC_IMG.cncMachine,
    gallery: [CINEMATIC_IMG.cncMachine, CINEMATIC_IMG.fasteners, CINEMATIC_IMG.qualityCheck],
  },
  {
    id: 'flange-nuts',
    name: 'Flange Nuts',
    category: 'Nuts',
    grades: '8 · 10',
    sizes: 'M6 – M20',
    finish: 'Zinc, Zinc flake',
    description: 'Serrated and non-serrated flange nuts for high-vibration assemblies.',
    overview: 'Flange nuts increase bearing area and can add prevailing-torque performance with serrations. Designed for assemblies that see road vibration, shock, or thermal cycling.',
    applications: ['Automotive body & chassis', 'Appliance assemblies', 'HVAC equipment', 'Vibration-prone joints'],
    standards: ['ISO 4161', 'DIN 6923', 'OEM specs'],
    features: ['Serrated or smooth flange', 'Improved load distribution', 'Reduced washer count', 'Corrosion-resistant coatings'],
    image: CINEMATIC_IMG.qualityCheck,
    gallery: [CINEMATIC_IMG.qualityCheck, CINEMATIC_IMG.assemblyLine, CINEMATIC_IMG.cncMachine],
  },
  {
    id: 'nyloc-nuts',
    name: 'Nyloc Lock Nuts',
    category: 'Nuts',
    grades: '8 · 10',
    sizes: 'M5 – M24',
    finish: 'Zinc',
    description: 'Prevailing-torque nylon insert nuts for secure locking without secondary adhesives.',
    overview: 'Nylon-insert lock nuts provide prevailing torque that resists loosening under vibration. Suitable where chemical threadlockers are undesirable or reusability within rated cycles is needed.',
    applications: ['Automotive interiors & chassis', 'Electronics enclosures', 'Consumer equipment', 'General vibration locking'],
    standards: ['ISO 7040 / 10511', 'DIN 982 / 985'],
    features: ['Nylon prevailing-torque insert', 'Reusable within rated limits', 'Metric fine & coarse options', 'Temperature-rated inserts available'],
    image: CINEMATIC_IMG.warehouse,
    gallery: [CINEMATIC_IMG.warehouse, CINEMATIC_IMG.electronics, CINEMATIC_IMG.qualityCheck],
  },
  {
    id: 'machine-screws',
    name: 'Machine Screws',
    category: 'Screws',
    grades: '4.8 · 8.8',
    sizes: 'M3 – M12',
    finish: 'Zinc, Black',
    description: 'Pan, countersunk, and button-head machine screws for enclosures and precision assemblies.',
    overview: 'Machine screws are produced for clean thread engagement in tapped holes and nuts — with head styles chosen for flush, low-profile, or drive-accessible assemblies in electronics and light industrial builds.',
    applications: ['Electronics enclosures', 'Control panels', 'Appliance assembly', 'Precision fixtures'],
    standards: ['ISO 7045 / 2009', 'DIN 7985 / 965', 'ASME B18.6.3'],
    features: ['Multiple head & drive styles', 'Fine pitch options', 'Consistent recess depth', 'Small-lot & volume runs'],
    image: CINEMATIC_IMG.electronics,
    gallery: [CINEMATIC_IMG.electronics, CINEMATIC_IMG.designSpec, CINEMATIC_IMG.cncMachine],
  },
  {
    id: 'self-tapping',
    name: 'Self-Tapping Screws',
    category: 'Screws',
    grades: 'C1022 · SS',
    sizes: '#6 – #14 / M4 – M8',
    finish: 'Zinc, Ruspert',
    description: 'Thread-forming screws for sheet metal and light structural fastening.',
    overview: 'Self-tapping screws form or cut their own mating thread in sheet metal and light materials — speeding assembly where pre-tapped holes are impractical.',
    applications: ['Sheet metal fabrication', 'HVAC ducting', 'Roofing & cladding', 'Appliance frames'],
    standards: ['ISO 1478 / 1479', 'DIN 7976', 'JIS B 1122'],
    features: ['Thread-forming & thread-cutting types', 'Point styles AB / B / BT', 'High-corrosion coatings', 'Pilot-friendly packaging'],
    image: CINEMATIC_IMG.construction,
    gallery: [CINEMATIC_IMG.construction, CINEMATIC_IMG.industrialPlant, CINEMATIC_IMG.fasteners],
  },
  {
    id: 'stud-bolts',
    name: 'Stud Bolts',
    category: 'Studs',
    grades: 'B7 · B7M · B16',
    sizes: '1/2" – 2-1/2" / M12 – M64',
    finish: 'Plain, PTFE, HDG',
    description: 'Double-end and continuous-thread studs for flanges, pressure vessels, and high-temp service.',
    overview: 'Stud bolts for flanged joints are manufactured to ASTM grades for pressure and temperature service — with full material certificates and optional PTFE or hot-dip finishes for corrosive environments.',
    applications: ['Pipeline flanges', 'Pressure vessels & heat exchangers', 'Refinery & petrochemical', 'Power generation'],
    standards: ['ASTM A193 / A194', 'ASME B16.5 companion', 'ISO metric equivalents'],
    features: ['Double-end & continuous thread', 'Mill test certificates', 'PTFE / Xylan coating options', 'Matched nut sets available'],
    image: CINEMATIC_IMG.oilGas,
    gallery: [CINEMATIC_IMG.oilGas, CINEMATIC_IMG.forge, CINEMATIC_IMG.warehouse],
  },
  {
    id: 'engine-studs',
    name: 'Engine & Chassis Studs',
    category: 'Studs',
    grades: '10.9 · 12.9',
    sizes: 'M8 – M16',
    finish: 'Phosphate, Zinc flake',
    description: 'High-tensile studs for powertrain and suspension joints with controlled stretch.',
    overview: 'Engine and chassis studs are heat-treated for high tensile performance with controlled elongation — supporting torque-to-yield and critical clamp joints in powertrain assemblies.',
    applications: ['Cylinder head & exhaust manifolds', 'Suspension links', 'Transmission mounts', 'Performance aftermarket'],
    standards: ['ISO 898-1', 'OEM torque specs', 'Customer drawings'],
    features: ['High tensile property classes', 'Rolled threads for fatigue life', 'Phosphate for assembly oils', 'Lot-level hardness reports'],
    image: CINEMATIC_IMG.forge,
    gallery: [CINEMATIC_IMG.forge, CINEMATIC_IMG.automotive, CINEMATIC_IMG.qualityCheck],
  },
  {
    id: 'anchor-bolts',
    name: 'Anchor Bolts',
    category: 'Anchors',
    grades: '4.6 · 8.8 · Custom',
    sizes: 'M12 – M48',
    finish: 'HDG, Epoxy',
    description: 'Foundation and base-plate anchors for structural steel and equipment mounting.',
    overview: 'Anchor bolts are produced as L-bolts, J-bolts, or straight rods with templates for foundation pours — galvanized or epoxy-coated for long service in structural and industrial plants.',
    applications: ['Column base plates', 'Equipment skids', 'Light poles & towers', 'Industrial foundations'],
    standards: ['ASTM F1554', 'ISO / DIN equivalents', 'Project specifications'],
    features: ['L / J / straight configurations', 'Template & cage assemblies', 'HDG & epoxy coatings', 'Project-specific lengths'],
    image: CINEMATIC_IMG.construction,
    gallery: [CINEMATIC_IMG.construction, CINEMATIC_IMG.industrialPlant, CINEMATIC_IMG.warehouse],
  },
  {
    id: 'expansion-anchors',
    name: 'Expansion Anchors',
    category: 'Anchors',
    grades: 'Carbon · SS A4',
    sizes: 'M8 – M24',
    finish: 'Zinc, Stainless',
    description: 'Wedge and sleeve anchors for concrete — reliable hold in industrial installations.',
    overview: 'Expansion anchors deliver mechanical hold in cracked and non-cracked concrete for racks, machinery, and building services — available in carbon steel and A4 stainless for corrosive sites.',
    applications: ['Machinery base fixing', 'Racking & mezzanines', 'Facade & services supports', 'Retrofit installations'],
    standards: ['ETA / ETAG options', 'ISO metric threads', 'Site engineer specs'],
    features: ['Wedge & sleeve designs', 'Stainless options for marine sites', 'Through-bolt styles', 'Installation torque guidance'],
    image: CINEMATIC_IMG.industrialPlant,
    gallery: [CINEMATIC_IMG.industrialPlant, CINEMATIC_IMG.construction, CINEMATIC_IMG.qualityCheck],
  },
  {
    id: 'flat-washers',
    name: 'Flat & Spring Washers',
    category: 'Washers',
    grades: 'HV · Spring steel',
    sizes: 'M6 – M36',
    finish: 'Plain, Zinc, HDG',
    description: 'Load-distribution and locking washers matched to bolt classes and finishes.',
    overview: 'Flat washers spread clamp load; spring and lock washers help resist loosening. Supplied as matched sets with bolts and nuts for consistent coating and dimensional fit.',
    applications: ['Structural bolted joints', 'Machinery mounting', 'Electrical panels', 'General assembly'],
    standards: ['ISO 7089 / 7090', 'DIN 125 / 127', 'ASME B18.21.1'],
    features: ['HV structural washers', 'Spring & lock variants', 'Matched finish to fasteners', 'Bulk carton or kit packs'],
    image: CINEMATIC_IMG.threading,
    gallery: [CINEMATIC_IMG.threading, CINEMATIC_IMG.fasteners, CINEMATIC_IMG.cncMachine],
  },
  {
    id: 'special-washers',
    name: 'Special & Custom Washers',
    category: 'Washers',
    grades: 'Per drawing',
    sizes: 'Custom',
    finish: 'As specified',
    description: 'Spherical, conical, and tab washers engineered to your assembly requirements.',
    overview: 'When standard washers cannot meet geometry or function, we produce special washers from drawing — spherical seats, conical seats, tab locks, and multi-hole plates for unique assemblies.',
    applications: ['Spherical seat joints', 'Safety tab-lock assemblies', 'Custom OEM fixtures', 'Retrofit packages'],
    standards: ['Customer drawings', 'Material certs on request', 'PPAP / FAIR when required'],
    features: ['Prototype & production tooling', 'Wide material range', 'Tight flatness control', 'Coating to print'],
    image: CINEMATIC_IMG.designSpec,
    gallery: [CINEMATIC_IMG.designSpec, CINEMATIC_IMG.cncMachine, CINEMATIC_IMG.qualityCheck],
  },
];

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id) || null;
}

export function getRelatedProducts(id, limit = 3) {
  const current = getProductById(id);
  if (!current) return [];
  const same = PRODUCTS.filter((p) => p.id !== id && p.category === current.category);
  const others = PRODUCTS.filter((p) => p.id !== id && p.category !== current.category);
  return [...same, ...others].slice(0, limit);
}

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
  address: 'Industrial Estate, Vadodara, Gujarat, India',
  whatsapp: '919876543210',
};

export const ABOUT_STORY = {
  eyebrow: 'Our story',
  headline: 'Forged in precision.',
  headlineAccent: 'Built on trust.',
  intro:
    'Javion Fasteners began with a simple belief: every joint in a machine, structure, or vehicle deserves hardware that holds — batch after batch, year after year.',
  mission:
    'We design, form, heat-treat, and finish fasteners for OEMs and industrial buyers who need traceable quality, reliable lead times, and partners who speak the language of drawings and tolerances.',
  location: 'Vadodara, Gujarat, India',
  stats: [
    { value: '25+', label: 'Years of craft' },
    { value: '3', label: 'ISO systems' },
    { value: '8+', label: 'Industries served' },
    { value: '100%', label: 'Lot traceability' },
  ],
  timeline: [
    {
      year: 'Beginnings',
      title: 'A workshop with a standard',
      text: 'We started with cold forming and thread rolling — small runs, tight checks, and a refusal to ship anything we would not put on our own assemblies.',
    },
    {
      year: 'Scale',
      title: 'From line to ecosystem',
      text: 'Heat treatment, coatings, and in-house QC came online so we could own the full path from wire to dispatch — not just one operation.',
    },
    {
      year: 'Systems',
      title: 'Certified, auditable, ready',
      text: 'ISO-aligned quality, environmental, and safety systems locked in the discipline customers expect from a long-term fastener partner.',
    },
    {
      year: 'Today',
      title: 'Built for the next drawing',
      text: 'Catalogue standards and custom OEM work sit side by side — automotive, infrastructure, energy, and everything that needs a joint that lasts.',
    },
  ],
  values: [
    {
      title: 'Precision first',
      text: 'Threads, hardness, and coatings are controlled — not hoped for. Specs are the contract.',
    },
    {
      title: 'Traceable lots',
      text: 'From incoming material to finished goods, every batch can be followed when audits or field issues demand answers.',
    },
    {
      title: 'Partner mindset',
      text: 'We work from drawings, PPAP when required, and honest lead times — not vague promises.',
    },
  ],
  facility: {
    src: '/images/about/facility-exterior.jpg',
    alt: 'Javion Industries facility exterior in Vadodara',
  },
  gallery: [
    { src: CINEMATIC_IMG.factoryFloor, alt: 'Production floor' },
    { src: CINEMATIC_IMG.threading, alt: 'Thread rolling' },
    { src: CINEMATIC_IMG.qualityCheck, alt: 'Quality inspection' },
    { src: CINEMATIC_IMG.warehouse, alt: 'Finished goods' },
  ],
};

export const CINEMATIC_FOOTER_LINKS = [
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Industries', href: '#industries' },
  { label: 'Quality', href: '#quality' },
  { label: 'Resources', href: '#resources' },
  { label: 'Contact', href: '/contact' },
  { label: 'Home', href: '/' },
];

/** PDFs for the cinematic Resources section. Place files in `frontend/public/documents/`. */
export const CINEMATIC_DOCUMENTS = [
  {
    id: 'catalogue',
    name: 'Product Catalogue',
    description: 'Full product range, specs, and finishes',
    file: '/documents/javion-product-catalogue.pdf',
    featured: true,
    tag: 'Catalogue',
  },
  {
    id: 'company-profile',
    name: 'Company Profile',
    description: 'Capabilities, facilities, and overview',
    file: '/documents/javion-company-profile.pdf',
    tag: 'Profile',
  },
  ...ISO_CERTIFICATIONS.map(({ id, name, title, pdf }) => ({
    id,
    name,
    description: title,
    file: pdf,
    tag: 'Certificate',
  })),
];
