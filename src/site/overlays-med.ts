import { overlaysHtml } from '@/site/overlays';

// mobile menu + forms for the medical site: medical logo, own nav, link back to the business site
export const overlaysMed = overlaysHtml
  .replace('<a href="/" aria-label="на главную"><img src="/img/logo-yergazy.png" alt="yergazy digital"></a>', '<a href="/medical" aria-label="на главную"><img src="/img/med/logo-yergazy-medical-light.png" alt="yergazy medical"></a>')
  .replace('<a href="#cases">кейсы</a>', '<a href="#cases">кейсы</a><a href="#faq">вопросы</a>')
  .replace('<a href="/medical">для клиник и врачей</a>', '<a href="/">для бизнеса</a>');
