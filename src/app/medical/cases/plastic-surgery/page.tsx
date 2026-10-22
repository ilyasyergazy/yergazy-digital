import type { Metadata } from 'next';
import { siteCss } from '@/site/markup';
import { caseCss, caseDesk, caseMob } from '@/site/case-surg';
import { overlaysMed } from '@/site/overlays-med';
import SiteRuntime from '@/components/SiteRuntime';

export const metadata: Metadata = {
  title: 'Кейс: 550+ заявок для пластического хирурга',
  description: 'Реклама пластического хирурга в Instagram без блокировок: более 550 заявок за 4 месяца по средней цене 1.95$.',
  alternates: { canonical: '/medical/cases/plastic-surgery' },
  openGraph: { title: '550+ заявок для пластического хирурга – кейс yergazy medical', images: [{ url: '/og/cases/plastic-surgery.jpg', width: 1200, height: 630 }] },
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
