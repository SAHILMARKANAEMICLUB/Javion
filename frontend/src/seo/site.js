/** Site-wide SEO defaults. Set REACT_APP_SITE_URL to your live domain (no trailing slash). */
export const SITE_URL = (
  process.env.REACT_APP_SITE_URL || 'https://javionfasteners.com'
).replace(/\/$/, '');

export const SITE_NAME = 'Javion Fasteners';

export const DEFAULT_DESCRIPTION =
  'Javion manufactures precision industrial fasteners — bolts, screws, nuts, and custom hardware for automotive, construction, oil & gas, and more.';

export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/javion-logo.png`;

export const PAGE_SEO = {
  home: {
    title: 'Precision Industrial Fasteners',
    description: DEFAULT_DESCRIPTION,
    path: '/home',
  },
  products: {
    title: 'Products',
    description:
      'Browse Javion’s engineered fastener range — bolts, screws, nuts, washers, and custom hardware with specs and finishes.',
    path: '/products',
  },
  about: {
    title: 'About Us',
    description:
      'Learn about Javion Fasteners — manufacturing excellence, quality systems, and industrial fastening solutions.',
    path: '/about',
  },
  industries: {
    title: 'Industries We Cater',
    description:
      'Fasteners specified for automotive, construction, oil & gas, aerospace, electronics, marine, and renewable energy.',
    path: '/industries',
  },
  contact: {
    title: 'Contact',
    description:
      'Contact Javion Fasteners for product specs, quotes, drawings, and supply — our team responds with sizing, finishes, and lead times.',
    path: '/contact',
  },
  comingSoon: {
    title: 'Coming Soon',
    description: 'Javion Fasteners — precision industrial fasteners. Our new site experience is on the way.',
    path: '/',
    noindex: true,
  },
  notFound: {
    title: 'Page Not Found',
    description: 'This page does not exist on Javion Fasteners.',
    path: '',
    noindex: true,
  },
  admin: {
    title: 'Admin',
    description: 'Javion admin',
    path: '/admin',
    noindex: true,
  },
};

export function absoluteUrl(path = '/') {
  if (!path) return SITE_URL;
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
