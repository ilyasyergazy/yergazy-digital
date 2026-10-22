import type { Metadata } from 'next';
import { siteCss } from '@/site/markup';
import { caseCss, caseDesk, caseMob } from '@/site/case-phone';
import { overlaysHtml } from '@/site/overlays';
import SiteRuntime from '@/components/SiteRuntime';

export const metadata: Metadata = {
  title: 'Кейс: 3000+ заявок для салона смартфонов',
  description: 'Салон новых и б/у смартфонов в Шымкенте: сайт-каталог с нуля, упаковка страниц и реклама на trade-in. Более 3000 заявок по 0.6$ за 10 месяцев.',
  alternates: { canonical: '/cases/phones' },
  openGraph: { title: '3000+ заявок для салона смартфонов – кейс yergazy digital', images: [{ url: '/og/cases/phones.jpg', width: 1200, height: 630 }] },
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
