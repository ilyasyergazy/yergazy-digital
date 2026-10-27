/* Interactive lead-forecast quiz for the clinic article (/medical/zayavki). */

type W = Window & {
  fbq?: (...a: unknown[]) => void;
  gtag?: (...a: unknown[]) => void;
  ym?: (...a: unknown[]) => void;
};

const NB = ' ';
const RATE = 520; // ₸ per $
// average lead price from our cases, $
const NICHES: [string, number][] = [
  ['косметология', 1.5],
  ['стоматология', 2.2],
  ['пластическая хирургия', 0.9],
  ['капельницы', 0.7],
  ['другое направление', 2],
];
const CITIES = ['Алматы', 'Астана', 'другой город'];
const CHECKS = [`до 30${NB}000${NB}₸`, `30${NB}000-100${NB}000${NB}₸`, `100${NB}000-500${NB}000${NB}₸`, `от 500${NB}000${NB}₸`];
const SOURCES = ['сарафанное радио', 'реклама через таргетолога', 'ведём рекламу сами', '2GIS и Google Карты'];
const BMIN = 60000, BMAX = 600000, BSTEP = 10000;

const money = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, NB);
const round = (n: number, s: number) => Math.max(s, Math.round(n / s) * s);

type State = { step: number; niche: number; city: number; budget: number; check: number; src: number[]; started: boolean };

function forecast(st: State) {
  const cpl = NICHES[st.niche < 0 ? 4 : st.niche][1];
  const usd = st.budget / RATE;
  const lo = round(usd / (cpl * 1.4), 5);
  const hi = Math.max(lo + 10, round(usd / (cpl * 0.85), 5));
  const pLo = round(cpl * 0.85 * RATE, 100);
  const pHi = round(cpl * 1.4 * RATE, 100);
  const city = st.city === 0 ? 'Алматы' : st.city === 1 ? 'Астаны' : 'вашего города';
  return { range: `${lo}-${hi}`, price: `${money(pLo)}-${money(pHi)}${NB}₸`, city };
}

const prog = (k: number) => '<div class="pr">' + Array.from({ length: 6 }, (_, i) => `<i${i < k ? ' class="on"' : ''}></i>`).join('') + '</div>';
const head = (k: number, q: string) => `${prog(k)}<span class="qs">шаг ${k} из 6</span><h3 class="qq">${q}</h3>`;
const nav = (back: boolean, next: boolean, nextOn = true) =>
  `<div class="nav"><span class="bk" ${back ? 'data-q="back" role="button" tabindex="0"' : ''}>${back ? '← назад' : ''}</span>` +
  (next ? `<button type="button" class="btn-dark" data-q="next"${nextOn ? '' : ' disabled'}>далее</button>` : '') + '</div>';
const opts = (list: string[], sel: (i: number) => boolean) =>
  '<div style="display:flex;flex-direction:column;gap:10px">' +
  list.map((t, i) => `<button type="button" class="opt${sel(i) ? ' on' : ''}" data-o="${i}"><i></i>${t}</button>`).join('') + '</div>';

function render(st: State) {
  switch (st.step) {
    case 1: return `<div class="qz">${head(1, 'какое направление<br>у вашей клиники?')}${opts(NICHES.map((n) => n[0]), (i) => i === st.niche)}${nav(false, true, st.niche >= 0)}</div>`;
    case 2: return `<div class="qz">${head(2, 'в каком городе<br>вы находитесь?')}${opts(CITIES, (i) => i === st.city)}${nav(true, true, st.city >= 0)}</div>`;
    case 3: {
      const f = forecast(st);
      const pct = ((st.budget - BMIN) / (BMAX - BMIN)) * 100;
      return `<div class="qz">${head(3, 'какой рекламный<br>бюджет в месяц?')}
        <div style="display:flex;flex-direction:column;gap:24px"><div class="bv" data-bv>${money(st.budget)}${NB}₸</div>
        <input class="qr" type="range" min="${BMIN}" max="${BMAX}" step="${BSTEP}" value="${st.budget}" style="--p:${pct}%" aria-label="рекламный бюджет в месяц">
        <div class="rl"><span>60${NB}000${NB}₸</span><span>600${NB}000${NB}₸</span></div></div>
        <div class="fc"><span class="l">прогноз для ${f.city}</span><span class="v red" data-fv>${f.range} заявок</span><span class="s" data-fs>в месяц · ${f.price} за заявку</span></div>
        <span class="note">по ценам заявок в наших кейсах · прогноз, а${NB}не${NB}гарантия</span>${nav(true, true)}</div>`;
    }
    case 4: return `<div class="qz">${head(4, 'какой у вас<br>средний чек?')}${opts(CHECKS, (i) => i === st.check)}${nav(true, true, st.check >= 0)}</div>`;
    case 5: return `<div class="qz sq">${head(5, 'откуда сейчас<br>приходят пациенты?')}<span class="note" style="margin-top:-16px">можно выбрать несколько</span>${opts(SOURCES, (i) => st.src.includes(i))}${nav(true, true, st.src.length > 0)}</div>`;
    case 6: {
      const f = forecast(st);
      return `<form class="qz" novalidate>${prog(6)}<span class="qs">шаг 6 из 6</span>
        <div class="fc"><span class="l">ваш прогноз · ${CITIES[st.city] || ''}, ${money(st.budget)}${NB}₸</span><span class="v">${f.range} заявок</span><span class="s">в месяц · ${f.price} за заявку</span></div>
        <h3 class="qq">пришлём план<br>запуска в WhatsApp</h3>
        <p class="qp">и покажем, как с CAPI видеть<br>продажи по каждому креативу</p>
        <input class="inp" name="name" type="text" placeholder="ваше имя" autocomplete="name">
        <label class="qtel"><input class="inp" name="phone" type="tel" inputmode="tel" placeholder="+7 (___) ___-__-__" autocomplete="tel"><span class="em">не хватает цифр в номере</span></label>
        <input type="text" name="company" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px;opacity:0" aria-hidden="true">
        <button type="submit" class="btn" style="width:100%;box-sizing:border-box">получить план</button>
        <span class="note">нажимая кнопку, вы соглашаетесь<br>на обработку <a href="/privacy" style="text-decoration:underline">персональных данных</a></span>
        <span class="bk" data-q="back" role="button" tabindex="0" style="align-self:flex-start">← назад</span></form>`;
    }
    default:
      return `<div class="qz" style="align-items:flex-start">${prog(6).replace(/<i>/g, '<i class="on">')}
        <h3 class="qq">благодарим за заявку!<br>мы свяжемся с вами<br>в ближайшее время</h3>
        <p class="qp" style="margin:0">а пока посмотрите, как мы<br>работали с другими клиниками</p>
        <a class="btn" href="/medical#cases">смотреть кейсы</a></div>`;
  }
}

const maskPhone = (v: string) => {
  const rest = v.startsWith('+7') ? v.slice(2) : v;
  let d = rest.replace(/\D/g, '');
  if (d.length > 10 && (d[0] === '7' || d[0] === '8')) d = d.slice(1);
  d = d.slice(0, 10);
  const p = [d.slice(0, 3), d.slice(3, 6), d.slice(6, 8), d.slice(8, 10)];
  let out = '+7';
  if (p[0]) out += ' (' + p[0];
  if (p[0].length === 3) out += ')';
  if (p[1]) out += ' ' + p[1];
  if (p[2]) out += '-' + p[2];
  if (p[3]) out += '-' + p[3];
  return out;
};

function track(ev: 'start' | 'forecast' | 'lead') {
  const w = window as W;
  try {
    if (ev === 'start') { w.fbq?.('trackCustom', 'QuizStart'); w.gtag?.('event', 'quiz_start'); }
    if (ev === 'forecast') { w.fbq?.('trackCustom', 'QuizForecast'); w.gtag?.('event', 'quiz_forecast'); }
    if (ev === 'lead') {
      w.fbq?.('track', 'Lead', { content_name: 'квиз · прогноз заявок', content_category: 'медицина' });
      w.gtag?.('event', 'generate_lead');
      const ymId = Number(document.documentElement.dataset.ym || 0);
      if (ymId && w.ym) w.ym(ymId, 'reachGoal', 'lead');
    }
  } catch { /* analytics optional */ }
}

function utm(): Record<string, string> {
  try { return JSON.parse(sessionStorage.getItem('yz-utm') || '{}'); } catch { return {}; }
}

function mount(box: HTMLElement) {
  const st: State = { step: 1, niche: -1, city: -1, budget: 200000, check: -1, src: [], started: false };
  let sentForecast = false;
  const draw = () => {
    box.innerHTML = render(st);
    if (st.step === 3 && !sentForecast) { sentForecast = true; track('forecast'); }
    const tel = box.querySelector<HTMLInputElement>('input[type=tel]');
    if (tel) tel.addEventListener('input', () => { tel.value = maskPhone(tel.value); tel.closest('.qtel')?.classList.remove('bad'); });
  };
  const go = (d: number) => {
    st.step = Math.min(7, Math.max(1, st.step + d));
    draw();
    const r = box.getBoundingClientRect();
    if (r.top < 0) window.scrollBy({ top: r.top - 24, behavior: 'smooth' });
  };
  box.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    const o = t.closest<HTMLElement>('[data-o]');
    if (o) {
      const i = Number(o.dataset.o);
      if (!st.started) { st.started = true; track('start'); }
      if (st.step === 1) st.niche = i;
      if (st.step === 2) st.city = i;
      if (st.step === 4) st.check = i;
      if (st.step === 5) { st.src = st.src.includes(i) ? st.src.filter((x) => x !== i) : [...st.src, i]; draw(); return; }
      draw();
      setTimeout(() => go(1), 220);
      return;
    }
    const q = t.closest<HTMLElement>('[data-q]');
    if (q && !(q as HTMLButtonElement).disabled) go(q.dataset.q === 'back' ? -1 : 1);
  });
  box.addEventListener('input', (e) => {
    const r = e.target as HTMLInputElement;
    if (!r.classList.contains('qr')) return;
    st.budget = Number(r.value);
    r.style.setProperty('--p', ((st.budget - BMIN) / (BMAX - BMIN)) * 100 + '%');
    const f = forecast(st);
    box.querySelector('[data-bv]')!.textContent = `${money(st.budget)}${NB}₸`;
    box.querySelector('[data-fv]')!.textContent = `${f.range} заявок`;
    box.querySelector('[data-fs]')!.textContent = `в месяц · ${f.price} за заявку`;
  });
  box.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const tel = form.querySelector<HTMLInputElement>('input[type=tel]')!;
    if (tel.value.replace(/\D/g, '').length < 11) { tel.closest('.qtel')?.classList.add('bad'); tel.focus(); return; }
    const btn = form.querySelector<HTMLButtonElement>('button[type=submit]')!;
    btn.disabled = true; btn.textContent = 'отправляем…';
    const f = forecast(st);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          form: 'quiz',
          name: (form.querySelector('input[name=name]') as HTMLInputElement).value,
          phone: tel.value,
          company: (form.querySelector('input[name=company]') as HTMLInputElement).value,
          needs: [
            NICHES[st.niche]?.[0] || '',
            CITIES[st.city] || '',
            `бюджет ${money(st.budget)} ₸`,
            `чек ${CHECKS[st.check] || '–'}`,
            ...st.src.map((i) => SOURCES[i]),
            `прогноз ${f.range} заявок`,
          ],
          utm: utm(),
          referrer: document.referrer,
          page: location.pathname,
        }),
      });
      if (!res.ok) throw new Error();
    } catch {
      btn.disabled = false; btn.textContent = 'получить план';
      alertLine(form, 'не получилось отправить. напишите нам в WhatsApp: +7 701 654 56 75');
      return;
    }
    track('lead');
    go(1);
  });
  draw();
}

function alertLine(form: HTMLElement, text: string) {
  let n = form.querySelector<HTMLElement>('[data-err]');
  if (!n) { n = document.createElement('span'); n.dataset.err = ''; n.className = 'note'; n.style.color = '#CC0000'; form.appendChild(n); }
  n.textContent = text;
}

export function initQuiz() {
  document.querySelectorAll<HTMLElement>('[data-quiz]').forEach((b) => { if (!b.dataset.ready) { b.dataset.ready = '1'; mount(b); } });
}
