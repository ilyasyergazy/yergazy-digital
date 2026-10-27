import type { Metadata } from 'next';
import { siteCss } from '@/site/markup';
import { artCss, artDesk, artMob } from '@/site/article-clinic';
import { overlaysHtml } from '@/site/overlays';
import SiteRuntime from '@/components/SiteRuntime';
import QuizRuntime from '@/components/QuizRuntime';

export const metadata: Metadata = {
  title: 'Почему клиника получает заявки, но не пациентов',
  description: '5 ошибок в рекламе клиник, из-за которых заявки не доходят до записи. Разбор на примерах и прогноз заявок для вашей клиники за 1 минуту.',
  alternates: { canonical: '/medical/zayavki' },
  openGraph: { title: 'Почему клиника получает заявки, но не пациентов', images: [{ url: '/og/article-clinic.jpg', width: 1200, height: 630 }] },
};

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss + artCss }} />
      <main>
        <div id="desk" dangerouslySetInnerHTML={{ __html: artDesk }} />
        <div id="mob" dangerouslySetInnerHTML={{ __html: artMob }} />
      </main>
      <div dangerouslySetInnerHTML={{ __html: overlaysHtml }} />
      <SiteRuntime />
      <QuizRuntime />
    </>
  );
}
