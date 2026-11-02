import type { Metadata } from 'next';
import { siteCss } from '@/site/markup';
import { casesCss, casesDesk, casesMob } from '@/site/cases-index';
import { overlaysHtml } from '@/site/overlays';
import SiteRuntime from '@/components/SiteRuntime';

export const metadata: Metadata = {
  title: 'Кейсы и разборы',
  description: 'Кейсы yergazy digital с реальными цифрами: недвижимость, обучение, производство, техника, охрана и медицина – заявки, цена заявки и что мы сделали.',
  alternates: { canonical: '/cases' },
};

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + casesCss }} />
      <main>
        <div id="desk" dangerouslySetInnerHTML={{ __html: casesDesk }} />
        <div id="mob" dangerouslySetInnerHTML={{ __html: casesMob }} />
      </main>
      <div dangerouslySetInnerHTML={{ __html: overlaysHtml }} />
      <SiteRuntime />
    </>
  );
}
