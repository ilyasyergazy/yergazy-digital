import { siteCss, deskHtml, mobHtml } from '@/site/markup';
import { overlaysHtml } from '@/site/overlays';
import SiteRuntime from '@/components/SiteRuntime';
import { FAQ } from '@/site/faq';

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss }} />
      <main>
        <div id="desk" dangerouslySetInnerHTML={{ __html: deskHtml }} />
        <div id="mob" dangerouslySetInnerHTML={{ __html: mobHtml }} />
      </main>
      <div dangerouslySetInnerHTML={{ __html: overlaysHtml }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <SiteRuntime />
    </>
  );
}
