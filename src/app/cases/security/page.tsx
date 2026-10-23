import type { Metadata } from 'next';
import { siteCss } from '@/site/markup';
import { caseCss, caseDesk, caseMob } from '@/site/case-security';
import { overlaysHtml } from '@/site/overlays';
import SiteRuntime from '@/components/SiteRuntime';

export const metadata: Metadata = {
  title: 'Кейс: 200+ заявок для охранного агентства',
  description: 'Охранное агентство: лид-формы в Meta по 6 направлениям, от сигнализации Ajax до детекторов. 217 заявок за 3 месяца по средней цене 11.3$.',
  alternates: { canonical: '/cases/security' },
  openGraph: { title: '200+ заявок для охранного агентства – кейс yergazy digital', images: [{ url: '/og/cases/security.jpg', width: 1200, height: 630 }] },
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
