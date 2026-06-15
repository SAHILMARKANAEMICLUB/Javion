// Real data from metal360.fr (Webflow CDN images publicly accessible)

const CDN = 'https://cdn.prod.website-files.com/64e31036eccea9001058bfc8';
const CDN2 = 'https://cdn.prod.website-files.com/64e85c16c3e5fe1806b372fc';

export const NAV_LINKS = [
  { label: 'Accueil', href: '/' },
  { label: 'Réalisations', href: '/realisations' },
  { label: 'Notre équipe', href: '/equipe-metal360' },
  { label: 'Expertise', href: '/expertise' },
];

// Hero background — using a Pexels metalwork video
export const HERO_VIDEO = 'https://videos.pexels.com/video-files/8721934/8721934-uhd_2560_1440_25fps.mp4';
export const HERO_VIDEO_FALLBACK = 'https://videos.pexels.com/video-files/4488740/4488740-uhd_2560_1440_25fps.mp4';

// Real projects from metal360.fr
export const PROJECTS = [
  {
    id: 'p1',
    slug: 'spirale-infinie',
    category: 'Escalier',
    title: 'Spirale Infinie',
    excerpt: "Notre savoir-faire s'exprime à travers un escalier hélicoïdal sur mesure en métal.",
    cover: `${CDN2}/69fb5afeb004b1f42c09cefc_PHOTO-PRINCIPALE.jpg`,
    thumbs: [],
  },
  {
    id: 'p2',
    slug: 'elegance-naturelle',
    category: 'Escalier',
    title: 'Elegance Naturelle',
    excerpt: "Dans cette réalisation, notre savoir-faire s'exprime avec justesse et retenue à travers un escalier.",
    cover: `${CDN2}/69fb5a37ef8470ae3c5c959e_PHOTO-PRINCIPALE.jpg`,
    thumbs: [],
  },
  {
    id: 'p3',
    slug: 'transparence-totale-latranche',
    category: 'Garde-corps',
    title: 'Transparence totale',
    excerpt: "Dans cette maison en bord de mer, les garde-corps en verre trempé jouent avec la lumière.",
    cover: `${CDN2}/69256b1bda8f0bc1569a2d89_PHOTO%20DE%20COUVERTURE.jpg`,
    thumbs: [],
  },
  {
    id: 'p4',
    slug: 'suspension-en-levitation',
    category: 'Escalier',
    title: 'Suspension en lévitation',
    excerpt: "Dans cette réalisation suspendue, l'escalier semble flotter au-dessus de la pièce.",
    cover: `${CDN2}/692568c228ef131b45e49d5d_PHOTO%20DE%20COUVERTURE.jpg`,
    thumbs: [],
  },
  {
    id: 'p5',
    slug: 'griffon-tiffauges',
    category: "Travaux d'exception",
    title: 'Griffon de Tiffauges',
    excerpt: "Une œuvre monumentale en acier, signature d'un savoir-faire d'exception.",
    cover: `${CDN}/65323ec1a64d6d0909b8ffb5_metal360_griffon_tiffauges_143_BD.jpg`,
    thumbs: [],
  },
  {
    id: 'p6',
    slug: 'pergola-vertou',
    category: 'Ombrage',
    title: 'Pergola de Vertou',
    excerpt: "Une structure d'ombrage contemporaine aux lignes pures.",
    cover: `${CDN}/65323ec1715331597422d103_metal360_pergola_vertou_414__bd-2.jpg`,
    thumbs: [],
  },
  {
    id: 'p7',
    slug: 'moulin-neuf',
    category: 'Menuiserie acier',
    title: 'Moulin Neuf',
    excerpt: "Menuiserie acier sur-mesure pour une rénovation patrimoniale.",
    cover: `${CDN}/65323ec153e01bf83befac41_metal360_moulin_neuf_76__bd.jpg`,
    thumbs: [],
  },
  {
    id: 'p8',
    slug: 'kiosque-la-digue',
    category: "Travaux d'exception",
    title: 'Kiosque La Digue',
    excerpt: "Un kiosque en acier façonné comme une œuvre architecturale.",
    cover: `${CDN}/65323ec1a20d785f6469cdd2_kiosque_la_digue_03_bd3-2.jpg`,
    thumbs: [],
  },
  {
    id: 'p9',
    slug: 'gite-caves-secretes',
    category: 'Verrière',
    title: 'Gîte des Caves Secrètes',
    excerpt: "Une verrière sur-mesure pour un lieu d'exception.",
    cover: `${CDN}/65323ec1afb79142dd44bc6f_gite_caves_secretes190_HDR_bd.jpg`,
    thumbs: [],
  },
];

export const CATEGORIES = [
  "Travaux d'exception",
  'Mobilier',
  'Ombrage',
  'Portail',
  'Menuiserie acier',
  'Verrière',
  'Garde-corps',
  'Escalier',
];

// Real grid images from Metal360 homepage
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

// Real team photo
export const TEAM_PHOTO = `${CDN}/651c08b16dfb35365e6a096b_metal360_groupe_sept_23.jpg`;

export const FOUNDER = {
  name: 'Tommy Bouchet',
  role: 'Fondateur · Maître Artisan',
  photo: `${CDN}/651c08b16dfb35365e6a096b_metal360_groupe_sept_23.jpg`,
  bio: "Passionné depuis toujours par le travail du métal, Tommy Bouchet a fondé Metal360 avec l'ambition de réunir savoir-faire artisanal et exigence contemporaine. L'équipe maîtrise le potentiel de chaque alliage : acier, inox, aluminium, laiton, cuivre, fonte … ainsi que l'ensemble des procédés de soudure : TIG, MIG, électrode enrobé, brasage.",
};

// Real testimonials
export const TESTIMONIALS = [
  {
    quote: "Des doigts en or ! Visite de l'atelier et des projets réalisés. Franchement c'est chouette, des escaliers hyper design et original, une touche de créativité et un énorme savoir faire. Je recommande vivement !",
    author: 'Florian JOULIE',
    title: 'Responsable développement STUDEFFI',
  },
  {
    quote: "Nous sommes ravis des prestations réalisées. Le travail est qualitatif et soigné. Equipe sérieuse et soucieuse du détail. L'escalier et les portes correspondent bien aux plans de départ. Je vous recommande l'entreprise Métal 360 chaudement.",
    author: 'Endy MIGUEL',
    title: 'Dirigeant',
  },
  {
    quote: "L'équipe METAL 360 a réalisé un travail de très grande qualité lors de la rénovation d'un véhicule à moteur : travail du support, thermolaquage, respect des délais... Je recommande !",
    author: 'Nicolas PAPIN',
    title: 'Dirigeant PENTAGONE PATRIMOINE',
  },
  {
    quote: "Une direction exigeante et dynamique, bravo, une vitrine pour la metallerie.",
    author: 'Jan MEYER',
    title: 'Rédacteur en Chef METAL FLASH',
  },
  {
    quote: "L'équipe de Métal 360 a exhaussé tous nos souhaits pour la réalisation de notre projet ! De la conception à la réalisation vraiment super ! Des conseils, des idées, une franchise, des prouesses techniques, de la disponibilité… Vivement le prochain projet avec eux !!",
    author: 'François FONTENEAU',
    title: 'Particulier',
  },
];

export const CONTACT = {
  phone: '06 41 99 00 29',
  email: 'contact@metal360.fr',
  address: 'Le Bordage - Route de Tiffauges, 49660 SEVREMOINE',
};

export const FOOTER_PAGES = [
  { label: 'Accueil', href: '/' },
  { label: 'Réalisations', href: '/realisations' },
  { label: 'Notre équipe', href: '/equipe-metal360' },
  { label: 'Expertise', href: '/expertise' },
  { label: 'Distinctions', href: '/distinctions' },
  { label: 'Contact', href: '#contact' },
];

// Real marquee images (mix of grid + project images)
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

// Real certification logos
export const LOGOS = {
  epv: `${CDN}/653fc63278e5b75221f03575_entreprise-du-patrimoine-vivant-epv-logo-vector.svg`,
  maitre: `${CDN}/684737782e55051e7fd1be80_logo-Maitreartisan.svg`,
};
