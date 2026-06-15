// All content in English with editorial, attractive copywriting.
// Original creative writing — no reproduced marketing copy.

const CDN = 'https://cdn.prod.website-files.com/64e31036eccea9001058bfc8';
const CDN2 = 'https://cdn.prod.website-files.com/64e85c16c3e5fe1806b372fc';

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/realisations' },
  { label: 'Studio', href: '/equipe-metal360' },
  { label: 'Craft', href: '/expertise' },
];

export const HERO_VIDEO = 'https://videos.pexels.com/video-files/8721934/8721934-uhd_2560_1440_25fps.mp4';
export const HERO_VIDEO_FALLBACK = 'https://videos.pexels.com/video-files/4488740/4488740-uhd_2560_1440_25fps.mp4';

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
