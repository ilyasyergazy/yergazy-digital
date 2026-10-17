import type { Metadata } from 'next';
import { siteCss } from '@/site/markup';
import { caseCss, caseDesk, caseMob } from '@/site/case-realty';

export const metadata: Metadata = {
  title: 'Кейс: 5000+ заявок для застройщика',
  description: 'Застройщик из Алматы, 5 жилых проектов: более 5000 заявок по средней цене 3-5$ за 2 года. Реклама в Instagram и Facebook, 150+ креативов.',
  alternates: { canonical: '/cases/realty' },
  openGraph: { title: '5000+ заявок для застройщика – кейс yergazy digital', images: [{ url: '/og.jpg', width: 1200, height: 630 }] },
};

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + caseCss }} />
      <main>
        <div id="desk" dangerouslySetInnerHTML={{ __html: caseDesk }} />
        <div id="mob" dangerouslySetInnerHTML={{ __html: caseMob }} />
      </main>
    </>
  );
}
