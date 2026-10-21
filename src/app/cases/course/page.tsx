import type { Metadata } from 'next';
import { siteCss } from '@/site/markup';
import { caseCss, caseDesk, caseMob } from '@/site/case-course';
import { overlaysHtml } from '@/site/overlays';
import SiteRuntime from '@/components/SiteRuntime';

export const metadata: Metadata = {
  title: 'Кейс: 12 млн ₸ с онлайн-курса без рекламы',
  description: 'Онлайн-курс по торгам на гос. аукционах: сайт с личными кабинетами, YouTube-канал и оплата через Kaspi Pay. Более 2500 покупателей и 12 млн ₸ за 2 месяца без рекламного бюджета.',
  alternates: { canonical: '/cases/course' },
  openGraph: { title: '12 млн ₸ с курса без рекламы – кейс yergazy digital', images: [{ url: '/og/cases/course.jpg', width: 1200, height: 630 }] },
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
