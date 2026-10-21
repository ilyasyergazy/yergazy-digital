import type { Metadata } from 'next';
import { siteCss } from '@/site/markup';
import { caseCss, caseDesk, caseMob } from '@/site/case-drip';
import { overlaysMed } from '@/site/overlays-med';
import SiteRuntime from '@/components/SiteRuntime';

export const metadata: Metadata = {
  title: 'Кейс: 5 200+ заявок на капельницы',
  description: 'Реклама капельниц для клиники здоровья и красоты в Алматы: более 5 200 заявок по средней цене 0.67$, без демпинга и скидок.',
  alternates: { canonical: '/medical/cases/iv-drips' },
  openGraph: { title: '5 200+ заявок на капельницы – кейс yergazy medical', images: [{ url: '/og/cases/iv-drips.jpg', width: 1200, height: 630 }] },
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
