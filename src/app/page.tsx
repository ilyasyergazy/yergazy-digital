import { siteCss, deskHtml, mobHtml } from '@/site/markup';
import { overlaysHtml } from '@/site/overlays';
import SiteRuntime from '@/components/SiteRuntime';

export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss }} />
      <main>
        <div id="desk" dangerouslySetInnerHTML={{ __html: deskHtml }} />
        <div id="mob" dangerouslySetInnerHTML={{ __html: mobHtml }} />
      </main>
      <div dangerouslySetInnerHTML={{ __html: overlaysHtml }} />
      <SiteRuntime />
    </>
  );
}
