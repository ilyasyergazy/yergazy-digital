import type { MetadataRoute } from 'next';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://yergazy.digital';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ['', '/cases/realty', '/cases/course', '/cases/glass', '/medical', '/medical/cases/cosmetology', '/medical/cases/iv-drips', '/medical/cases/instagram', '/medical/cases/dentistry', '/medical/cases/plastic-surgery', '/cases'].map((p) => ({
    url: SITE + p,
    lastModified: now,
    changeFrequency: p ? 'monthly' : 'weekly',
    priority: p ? 0.6 : 1,
  }));
}
