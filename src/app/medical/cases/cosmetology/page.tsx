import type { Metadata } from 'next';
import { siteCss } from '@/site/markup';
import { caseCss, caseDesk, caseMob } from '@/site/case-cosmo';
import { overlaysMed } from '@/site/overlays-med';
import SiteRuntime from '@/components/SiteRuntime';

export const metadata: Metadata = {
  title: 'Кейс: 3 500+ заявок для косметолога',
  description: 'Реклама косметолога в Instagram без блокировок: более 3 500 заявок по средней цене 1.5$, около 190 заявок в месяц.',
  alternates: { canonical: '/medical/cases/cosmetology' },
  openGraph: { title: '3 500+ заявок для косметолога – кейс yergazy medical', images: [{ url: '/og.jpg', width: 1200, height: 630 }] },
};

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + caseCss }} />
      <main>
        <div id="desk" dangerouslySetInnerHTML={{ __html: caseDesk }} />
        <div id="mob" dangerouslySetInnerHTML={{ __html: caseMob }} />
      </main>
      <div dangerouslySetInnerHTML={{ __html: overlaysMed }} />
      <SiteRuntime />
    </>
  );
}
