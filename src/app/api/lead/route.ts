import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type Lead = {
  form?: string;
  name?: string;
  phone?: string;
  needs?: string[];
  company?: string; // honeypot
  utm?: Record<string, string>;
  referrer?: string;
  page?: string;
};

const FORMS: Record<string, string> = {
  task: 'обсудить задачу',
  final: 'форма внизу страницы',
  checklist: 'чек-лист · 10 бесплатных способов',
  quiz: 'квиз · прогноз заявок (статья для клиник)',
};

const clean = (v: unknown, max = 200) => String(v ?? '').replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max);
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function source(utm: Record<string, string>, referrer: string) {
  if (utm.utm_source) return [utm.utm_source, utm.utm_medium, utm.utm_campaign].filter(Boolean).join(' · ');
  if (!referrer) return 'прямой заход';
  try {
    const h = new URL(referrer).hostname.replace(/^www\./, '');
    if (h.includes('google')) return 'google · поиск';
    if (h.includes('yandex')) return 'яндекс · поиск';
    if (h.includes('instagram')) return 'instagram';
    if (h.includes('facebook')) return 'facebook';
    if (h.includes('tiktok')) return 'tiktok';
    return h;
  } catch {
    return 'прямой заход';
  }
}

export async function POST(req: Request) {
  let body: Lead;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  // bots fill the hidden field – pretend success
  if (body.company) return NextResponse.json({ ok: true });

  const phoneDigits = clean(body.phone, 40).replace(/\D/g, '');
  if (phoneDigits.length < 10) return NextResponse.json({ ok: false, error: 'phone' }, { status: 422 });

  const form = FORMS[clean(body.form, 20)] || 'заявка';
  const name = clean(body.name, 80) || 'без имени';
  const phone = clean(body.phone, 40);
  const needs = Array.isArray(body.needs) ? body.needs.map((n) => clean(n, 30)).filter(Boolean).slice(0, 8) : [];
  const utm: Record<string, string> = {};
  if (body.utm && typeof body.utm === 'object') {
    for (const [k, v] of Object.entries(body.utm)) if (k.startsWith('utm_')) utm[k] = clean(v, 120);
  }
  const from = source(utm, clean(body.referrer, 300));
  const page = clean(body.page, 120) || '/';
  const site = page.startsWith('/medical') ? 'медицина' : 'бизнес';
  const time = new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Asia/Almaty', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
  }).format(new Date());

  const jobs: Promise<unknown>[] = [];
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (token && chat) {
    const text = [
      `<b>${site === 'медицина' ? '🩺 ' : ''}новая заявка · ${site}</b>`,
      `форма: ${esc(form)}`,
      '',
      `имя: ${esc(name)}`,
      `телефон: ${esc(phone)}`,
      needs.length ? `нужно: ${esc(needs.join(', '))}` : '',
      '',
      `откуда: ${esc(from)}`,
      `страница: ${esc(page)}`,
      time,
    ].filter((l, i, a) => !(l === '' && a[i - 1] === '')).join('\n');
    jobs.push(
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          chat_id: chat,
          text,
          parse_mode: 'HTML',
          reply_markup: { inline_keyboard: [[{ text: 'написать в whatsapp', url: `https://wa.me/${phoneDigits}` }]] },
        }),
      }).then((r) => { if (!r.ok) throw new Error('telegram ' + r.status); }),
    );
  }
  const sheet = process.env.SHEETS_WEBHOOK_URL;
  if (sheet) {
    jobs.push(
      fetch(sheet, {
        method: 'POST',
        headers: { 'content-type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ time, site, form, name, phone, needs: needs.join(', '), source: from, page, ...utm }),
        redirect: 'follow',
      }).then((r) => { if (!r.ok) throw new Error('sheets ' + r.status); }),
    );
  }

  if (!jobs.length) {
    console.error('lead received but TELEGRAM_* / SHEETS_WEBHOOK_URL are not set', { form, name, phone });
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }
  const results = await Promise.allSettled(jobs);
  const delivered = results.filter((r) => r.status === 'fulfilled').length;
  results.forEach((r) => { if (r.status === 'rejected') console.error('lead delivery failed', r.reason); });
  if (!delivered) return NextResponse.json({ ok: false }, { status: 502 });
  return NextResponse.json({ ok: true, delivered });
}
