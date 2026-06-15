// Mock data for Metal360 clone

export const NAV_LINKS = [
  { label: 'Accueil', href: '/' },
  { label: 'Réalisations', href: '/realisations' },
  { label: 'Notre équipe', href: '/equipe-metal360' },
  { label: 'Expertise', href: '/expertise' },
];

export const HERO_VIDEO = 'https://videos.pexels.com/video-files/8721934/8721934-uhd_2560_1440_25fps.mp4';
export const HERO_VIDEO_FALLBACK = 'https://videos.pexels.com/video-files/4488740/4488740-uhd_2560_1440_25fps.mp4';

export const PROJECTS = [
  {
    id: 'p1',
    slug: 'escalier-design',
    category: 'Escalier',
    title: "Escalier hélicoïdal d'exception",
    excerpt: "Un escalier sur-mesure en acier brossé, alliant prouesse technique et élégance contemporaine.",
    cover: 'https://images.unsplash.com/photo-1599307169204-4176df0cdfe4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMHN0YWlyY2FzZXxlbnwwfHx8fDE3ODE1MjUyNjZ8MA&ixlib=rb-4.1.0&q=85&w=1600',
    thumbs: [
      'https://images.unsplash.com/photo-1526573059328-179b147e1b42?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwzfHxtZXRhbCUyMHN0YWlyY2FzZXxlbnwwfHx8fDE3ODE1MjUyNjZ8MA&ixlib=rb-4.1.0&q=85&w=400',
      'https://images.unsplash.com/photo-1635348180022-2f7715fdecfa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHw0fHxzdGVlbCUyMHJhaWxpbmd8ZW58MHx8fHwxNzgxNTI1MjY2fDA&ixlib=rb-4.1.0&q=85&w=400',
      'https://images.unsplash.com/photo-1630705547639-0906d30fc2db?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwzfHxzdGVlbCUyMHJhaWxpbmd8ZW58MHx8fHwxNzgxNTI1MjY2fDA&ixlib=rb-4.1.0&q=85&w=400',
    ],
  },
  {
    id: 'p2',
    slug: 'garde-corps-villa',
    category: 'Garde-corps',
    title: 'Garde-corps verre & acier',
    excerpt: "Un garde-corps minimaliste en verre trempé et acier inoxydable, posé sur une villa contemporaine.",
    cover: 'https://images.unsplash.com/photo-1630705547639-0906d30fc2db?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwzfHxzdGVlbCUyMHJhaWxpbmd8ZW58MHx8fHwxNzgxNTI1MjY2fDA&ixlib=rb-4.1.0&q=85&w=1600',
    thumbs: [
      'https://images.unsplash.com/photo-1635348180022-2f7715fdecfa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHw0fHxzdGVlbCUyMHJhaWxpbmd8ZW58MHx8fHwxNzgxNTI1MjY2fDA&ixlib=rb-4.1.0&q=85&w=400',
    ],
  },
  {
    id: 'p3',
    slug: 'portail-domaine',
    category: 'Portail',
    title: "Portail d'entrée sur-mesure",
    excerpt: "Un portail coulissant en acier corten, signature d'un domaine privé.",
    cover: 'https://images.unsplash.com/photo-1590869942905-a4ada45d5a8a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMGdhdGV8ZW58MHx8fHwxNzgxNTI1MjY2fDA&ixlib=rb-4.1.0&q=85&w=1600',
    thumbs: [
      'https://images.unsplash.com/photo-1580047750144-2c7790adf461?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwyfHxtZXRhbCUyMGdhdGV8ZW58MHx8fHwxNzgxNTI1MjY2fDA&ixlib=rb-4.1.0&q=85&w=400',
      'https://images.unsplash.com/photo-1576169510450-fd0392650023?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwzfHxtZXRhbCUyMGdhdGV8ZW58MHx8fHwxNzgxNTI1MjY2fDA&ixlib=rb-4.1.0&q=85&w=400',
    ],
  },
  {
    id: 'p4',
    slug: 'verriere-atelier',
    category: 'Verrière',
    title: "Verrière d'atelier",
    excerpt: "Une verrière d'atelier en acier noir mat, séparant cuisine et salon dans un loft parisien.",
    cover: 'https://images.unsplash.com/photo-1692263130342-bf6a77457526?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMGNhbm9weXxlbnwwfHx8fDE3ODE1MjUyNzN8MA&ixlib=rb-4.1.0&q=85&w=1600',
    thumbs: [
      'https://images.unsplash.com/photo-1692263130378-f708d81155de?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHw0fHxnbGFzcyUyMGNhbm9weXxlbnwwfHx8fDE3ODE1MjUyNzN8MA&ixlib=rb-4.1.0&q=85&w=400',
    ],
  },
  {
    id: 'p5',
    slug: 'mobilier-edition',
    category: 'Mobilier',
    title: 'Mobilier d\'édition limitée',
    excerpt: "Une table basse en acier patiné, conçue comme une œuvre sculpturale.",
    cover: 'https://images.unsplash.com/photo-1736593318040-1e81e1f065c2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMGZ1cm5pdHVyZXxlbnwwfHx8fDE3ODE1MjUyNjZ8MA&ixlib=rb-4.1.0&q=85&w=1600',
    thumbs: [
      'https://images.unsplash.com/photo-1776766788531-c7b2da09ebaf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHw0fHxtZXRhbCUyMGZ1cm5pdHVyZXxlbnwwfHx8fDE3ODE1MjUyNjZ8MA&ixlib=rb-4.1.0&q=85&w=400',
    ],
  },
  {
    id: 'p6',
    slug: 'ombrage-terrasse',
    category: 'Ombrage',
    title: 'Pergola contemporaine',
    excerpt: "Une structure d'ombrage en acier aux lignes pures pour une terrasse en bord de mer.",
    cover: 'https://images.unsplash.com/photo-1692263130378-f708d81155de?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHw0fHxnbGFzcyUyMGNhbm9weXxlbnwwfHx8fDE3ODE1MjUyNzN8MA&ixlib=rb-4.1.0&q=85&w=1600',
    thumbs: [],
  },
  {
    id: 'p7',
    slug: 'menuiserie-acier',
    category: 'Menuiserie acier',
    title: "Menuiserie acier sur-mesure",
    excerpt: "Portes et fenêtres en acier laqué noir pour une maison d'architecte.",
    cover: 'https://images.unsplash.com/photo-1645434866122-b458f9829981?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHw0fHxtZXRhbCUyMGZhY2FkZXxlbnwwfHx8fDE3ODE1MjUyNzN8MA&ixlib=rb-4.1.0&q=85&w=1600',
    thumbs: [],
  },
  {
    id: 'p8',
    slug: 'travail-exception',
    category: "Travaux d'exception",
    title: "Sculpture monumentale",
    excerpt: "Une installation artistique monumentale en acier patiné pour un espace public.",
    cover: 'https://images.unsplash.com/photo-1587031277999-c51ad2862269?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHwyfHxtZXRhbCUyMGZhY2FkZXxlbnwwfHx8fDE3ODE1MjUyNzN8MA&ixlib=rb-4.1.0&q=85&w=1600',
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

export const GRID_IMAGES = [
  'https://images.unsplash.com/photo-1599307169204-4176df0cdfe4?crop=entropy&cs=srgb&fm=jpg&w=800&q=85',
  'https://images.unsplash.com/photo-1635348180022-2f7715fdecfa?crop=entropy&cs=srgb&fm=jpg&w=800&q=85',
  'https://images.unsplash.com/photo-1590869942905-a4ada45d5a8a?crop=entropy&cs=srgb&fm=jpg&w=800&q=85',
  'https://images.unsplash.com/photo-1692263130342-bf6a77457526?crop=entropy&cs=srgb&fm=jpg&w=800&q=85',
  'https://images.unsplash.com/photo-1645434866122-b458f9829981?crop=entropy&cs=srgb&fm=jpg&w=800&q=85',
  'https://images.unsplash.com/photo-1736593318040-1e81e1f065c2?crop=entropy&cs=srgb&fm=jpg&w=800&q=85',
  'https://images.unsplash.com/photo-1716469801932-3b1b5494615c?crop=entropy&cs=srgb&fm=jpg&w=800&q=85',
  'https://images.unsplash.com/photo-1711829799900-42470ee55689?crop=entropy&cs=srgb&fm=jpg&w=800&q=85',
  'https://images.unsplash.com/photo-1683470157212-cd4005549fce?crop=entropy&cs=srgb&fm=jpg&w=800&q=85',
  'https://images.unsplash.com/photo-1714504904786-b6732390b206?crop=entropy&cs=srgb&fm=jpg&w=800&q=85',
  'https://images.unsplash.com/photo-1511306162219-1c5a469ab86c?crop=entropy&cs=srgb&fm=jpg&w=800&q=85',
  'https://images.unsplash.com/photo-1531053326607-9d349096d887?crop=entropy&cs=srgb&fm=jpg&w=800&q=85',
];

export const TEAM_PHOTO = 'https://images.unsplash.com/photo-1683470157212-cd4005549fce?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwxfHx3ZWxkaW5nJTIwd29ya3Nob3B8ZW58MHx8fHwxNzgxNTI1MjY2fDA&ixlib=rb-4.1.0&q=85&w=2000';

export const FOUNDER = {
  name: 'Tommy Bouchet',
  role: 'Fondateur · Maître Artisan',
  photo: 'https://images.unsplash.com/photo-1531053326607-9d349096d887?crop=entropy&cs=srgb&fm=jpg&w=1000&q=85',
  bio: "Passionné depuis toujours par le travail du métal, Tommy Bouchet a fondé Metal360 avec l'ambition de réunir savoir-faire artisanal et exigence contemporaine. Formé auprès des meilleurs compagnons, il défend une vision éditoriale du métier de métallier — chaque projet est une œuvre, chaque pièce raconte une histoire.",
};

export const TESTIMONIALS = [
  {
    quote: "Un travail d'une précision rare. L'équipe de Metal360 a su transformer nos idées en pièces d'exception qui structurent désormais l'identité de notre maison.",
    author: 'Sophie & Antoine Lambert',
    title: 'Particuliers · Maine-et-Loire',
  },
  {
    quote: "Une collaboration fluide, du dessin à la pose. La qualité d'exécution est irréprochable et le sens du détail, remarquable.",
    author: 'Camille Roussel',
    title: 'Architecte DPLG · Nantes',
  },
  {
    quote: "Le projet le plus exigeant que nous ayons confié à un métallier. Le résultat dépasse nos attentes — c'est une véritable œuvre d'art.",
    author: 'Hugo Mercier',
    title: 'Maître d\'ouvrage',
  },
];

export const CONTACT = {
  phone: '06 41 99 00 29',
  email: 'contact@metal360.fr',
  address: 'Le Bordage, 49660 Torfou, France',
};

export const FOOTER_PAGES = [
  { label: 'Accueil', href: '/' },
  { label: 'Réalisations', href: '/realisations' },
  { label: 'Notre équipe', href: '/equipe-metal360' },
  { label: 'Expertise', href: '/expertise' },
  { label: 'Distinctions', href: '/distinctions' },
  { label: 'Contact', href: '#contact' },
];

export const MARQUEE_IMAGES_ROW1 = [
  'https://images.unsplash.com/photo-1716469801932-3b1b5494615c?crop=entropy&cs=srgb&fm=jpg&w=600&q=85',
  'https://images.unsplash.com/photo-1711829799900-42470ee55689?crop=entropy&cs=srgb&fm=jpg&w=600&q=85',
  'https://images.unsplash.com/photo-1683470157212-cd4005549fce?crop=entropy&cs=srgb&fm=jpg&w=600&q=85',
  'https://images.unsplash.com/photo-1714504904786-b6732390b206?crop=entropy&cs=srgb&fm=jpg&w=600&q=85',
  'https://images.unsplash.com/photo-1511306162219-1c5a469ab86c?crop=entropy&cs=srgb&fm=jpg&w=600&q=85',
  'https://images.unsplash.com/photo-1716469801991-bda2e7e0adee?crop=entropy&cs=srgb&fm=jpg&w=600&q=85',
];

export const MARQUEE_IMAGES_ROW2 = [
  'https://images.unsplash.com/photo-1599307169204-4176df0cdfe4?crop=entropy&cs=srgb&fm=jpg&w=600&q=85',
  'https://images.unsplash.com/photo-1526573059328-179b147e1b42?crop=entropy&cs=srgb&fm=jpg&w=600&q=85',
  'https://images.unsplash.com/photo-1630705547639-0906d30fc2db?crop=entropy&cs=srgb&fm=jpg&w=600&q=85',
  'https://images.unsplash.com/photo-1590869942905-a4ada45d5a8a?crop=entropy&cs=srgb&fm=jpg&w=600&q=85',
  'https://images.unsplash.com/photo-1692263130342-bf6a77457526?crop=entropy&cs=srgb&fm=jpg&w=600&q=85',
  'https://images.unsplash.com/photo-1736593318040-1e81e1f065c2?crop=entropy&cs=srgb&fm=jpg&w=600&q=85',
];
