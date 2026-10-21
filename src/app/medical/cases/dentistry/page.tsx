import type { Metadata } from 'next';
import { siteCss } from '@/site/markup';
import { caseCss, caseDesk, caseMob } from '@/site/case-dent';
import { overlaysMed } from '@/site/overlays-med';
import SiteRuntime from '@/components/SiteRuntime';

export const metadata: Metadata = {
  title: 'Кейс: 500+ заявок для стоматологии',
  description: 'Реклама стоматологии в Instagram: более 500 заявок по средней цене 2.2$, в лучшие месяцы – 1.2-1.6$ за переписку в WhatsApp.',
  alternates: { canonical: '/medical/cases/dentistry' },
  openGraph: { title: '500+ заявок для стоматологии – кейс yergazy medical', images: [{ url: '/og.jpg', width: 1200, height: 630 }] },
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
