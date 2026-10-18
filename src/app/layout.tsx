import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://yergazy.digital';
const YM = process.env.NEXT_PUBLIC_YM_ID;
const GA = process.env.NEXT_PUBLIC_GA_ID || 'G-P2F94TQXNY';
const PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID || '1627560044994442';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'yergazy digital | маркетинг под ключ',
    template: '%s | yergazy digital',
  },
  description:
    'Маркетинг под ключ: реклама, CRM и продажи. Выстраиваю систему, где деньги на продвижение возвращаются в прибыль. 12 лет в маркетинге, 200+ компаний. Работаю по Казахстану и СНГ.',
  keywords: ['маркетинг в Алматы', 'маркетолог Алматы', 'таргетированная реклама Алматы', 'маркетинг под ключ', 'аудит рекламы', 'маркетинг для клиник'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'ru_KZ',
    url: SITE,
    siteName: 'yergazy digital',
    title: 'маркетинг под ключ – Ильяс Ергазы',
    description: 'Выстраиваю систему, где деньги на продвижение возвращаются в прибыль.',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Ильяс Ергазы – маркетинг под ключ' }],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: [{ url: '/favicon.ico', sizes: 'any' }, { url: '/icon.svg', type: 'image/svg+xml' }, { url: '/icon.png', type: 'image/png' }], apple: '/apple-icon.png' },
  robots: { index: true, follow: true },
  verification: { google: 'Yhf2XIv6NxoZkbgwa1agzh_lHxobsYlYosJx5ErRBaM' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0E0E0E',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'yergazy digital',
  legalName: 'ИП Express Marketing',
  url: SITE,
  image: `${SITE}/og.jpg`,
  telephone: '+77016545675',
  email: 'ilyasyergazy@gmail.com',
  address: { '@type': 'PostalAddress', addressLocality: 'Алматы', addressCountry: 'KZ' },
  areaServed: ['Казахстан', 'СНГ'],
  founder: { '@type': 'Person', name: 'Ильяс Ергазы', jobTitle: 'маркетолог' },
  sameAs: ['https://instagram.com/yergazy.digital', 'https://t.me/ilyasyergazy'],
};

// sets the page scale before first paint, so the desktop layout never jumps
const scaleScript = `(function(){var d=document.documentElement,w=d.clientWidth;d.style.setProperty('--zd',Math.min(1,w/1440));d.style.setProperty('--zm',w<900?w/390:1)})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" data-ym={YM || undefined} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scaleScript }} />
        <link rel="preload" href="/fonts/montserrat-cyrillic-700-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        {children}
        {YM && (
          <Script id="ym" strategy="afterInteractive">{`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${Number(YM)},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`}</Script>
        )}
        {GA && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA}');`}</Script>
          </>
        )}
        {PIXEL && (
          <Script id="fb" strategy="afterInteractive">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL}');fbq('track','PageView');`}</Script>
        )}
        {PIXEL && (
          <noscript><img height="1" width="1" style={{ display: 'none' }} alt="" src={`https://www.facebook.com/tr?id=${PIXEL}&ev=PageView&noscript=1`} /></noscript>
        )}
      </body>
    </html>
  );
}
