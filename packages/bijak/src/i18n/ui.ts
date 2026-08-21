export const defaultLocale = 'id';

export const locales = {
  id: 'Bahasa Indonesia',
  en: 'English',
};

export const ui = {
  id: {
    'nav.home': 'Beranda',
    'nav.projects': 'Proyek',
    'nav.about': 'Tentang',
    'nav.contact': 'Kontak',
    'nav.blog': 'Artikel',
    'hero.title': 'Berita & Analisis Teknologi Terpercaya',
    'hero.desc': 'Menyajikan perspektif mendalam mengenai software architecture, blockchain, kecerdasan buatan, dan tren teknologi global.',
    'section.featured': 'Berita Utama',
    'section.latest': 'Artikel Terbaru',
    'footer.desc': 'Pusat publikasi teknologi independen yang berfokus pada arsitektur perangkat lunak, desentralisasi, dan AI.',
  },
  en: {
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.blog': 'Blog',
    'hero.title': 'Trusted Technology News & Analysis',
    'hero.desc': 'Delivering deep perspectives on software architecture, blockchain, artificial intelligence, and global tech trends.',
    'section.featured': 'Featured Story',
    'section.latest': 'Latest Articles',
    'footer.desc': 'Independent technology publication hub focusing on software architecture, decentralization, and AI.',
  }
} as const;

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLocale]) {
    return ui[lang][key] || ui[defaultLocale][key];
  }
}
