import type { Metadata } from 'next';
import { medCss, medDesk, medMob } from '@/site/med-markup';
import { overlaysMed } from '@/site/overlays-med';
import SiteRuntime from '@/components/SiteRuntime';
import { FAQ } from '@/site/faq';

export const metadata: Metadata = {
  title: 'маркетинг для клиник и врачей',
  description: 'Реклама, запись и CRM для клиник и врачей. Пациенты, которые окупают рекламу. 12 лет в маркетинге, 20+ клиник и врачей.',
  alternates: { canonical: '/medical' },
  openGraph: { title: 'маркетинг для клиник и врачей – yergazy digital', images: [{ url: '/og.jpg', width: 1200, height: 630 }] },
};


const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: medCss }} />
      <main>
        <div id="desk" dangerouslySetInnerHTML={{ __html: medDesk }} />
        <div id="mob" dangerouslySetInnerHTML={{ __html: medMob }} />
      </main>
      <div dangerouslySetInnerHTML={{ __html: overlaysMed }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <SiteRuntime />
    </>
  );
}
