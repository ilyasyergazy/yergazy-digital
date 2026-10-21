import type { Metadata } from 'next';
import { siteCss } from '@/site/markup';
import { caseCss, caseDesk, caseMob } from '@/site/case-glass';
import { overlaysHtml } from '@/site/overlays';
import SiteRuntime from '@/components/SiteRuntime';

export const metadata: Metadata = {
  title: 'Кейс: 30 000+ заявок на стеклянные перегородки',
  description: 'Производство и установка перегородок из стекла: реклама в Meta, TikTok и Google Ads. Более 30 000 заявок по средней цене 1.5-2$.',
  alternates: { canonical: '/cases/glass' },
  openGraph: { title: '30 000+ заявок на стеклянные перегородки – кейс yergazy digital', images: [{ url: '/og/cases/glass.jpg', width: 1200, height: 630 }] },
};

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + caseCss }} />
      <main>
        <div id="desk" dangerouslySetInnerHTML={{ __html: caseDesk }} />
        <div id="mob" dangerouslySetInnerHTML={{ __html: caseMob }} />
      </main>
      <div dangerouslySetInnerHTML={{ __html: overlaysHtml }} />
      <SiteRuntime />
    </>
  );
}
