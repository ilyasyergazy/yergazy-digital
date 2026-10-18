import type { Metadata } from 'next';
import { siteCss } from '@/site/markup';
import { caseCss, caseDesk, caseMob } from '@/site/case-smm';
import { overlaysMed } from '@/site/overlays-med';
import SiteRuntime from '@/components/SiteRuntime';

export const metadata: Metadata = {
  title: 'Кейс: +1 300 подписчиков и новый стиль Instagram клиники',
  description: 'Комплексное SMM-продвижение клиники здоровья и красоты в Алматы: стратегия, съёмки, единый стиль ленты и реклама. +1 300 подписчиков и охват 115 000 в месяц за 3 месяца.',
  alternates: { canonical: '/medical/cases/instagram' },
  openGraph: { title: '+1 300 подписчиков за 3 месяца – кейс yergazy medical', images: [{ url: '/og.jpg', width: 1200, height: 630 }] },
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
