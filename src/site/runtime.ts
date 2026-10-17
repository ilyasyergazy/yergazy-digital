/* Interactions and motion for the main page. Runs once on the client. */
import { FAQ } from './faq';

type Win = Window & {
  ym?: (id: number, action: string, goal: string) => void;
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

const ANSWER_FALLBACK = 'напишите мне в whatsapp – отвечу лично';

export function initSite(): () => void {
  const w = window as Win;
  const doc = document.documentElement;
  const desk = document.getElementById('desk') as HTMLElement;
  const mob = document.getElementById('mob') as HTMLElement;
  const mq = window.matchMedia('(max-width: 899px)');
  const isM = () => mq.matches;
  const root = () => (isM() ? mob : desk);
  const cleanups: Array<() => void> = [];
  const on = <K extends keyof WindowEventMap>(t: K, f: (e: WindowEventMap[K]) => void) => {
    window.addEventListener(t, f as EventListener);
    cleanups.push(() => window.removeEventListener(t, f as EventListener));
  };

  /* ---------- scale ---------- */
  const layout = () => {
    const vw = doc.clientWidth;
    doc.style.setProperty('--zd', String(Math.min(1, vw / 1440)));
    doc.style.setProperty('--zm', String(vw < 900 ? vw / 390 : 1));
  };
  layout();
  on('resize', layout);

  /* ---------- utm ---------- */
  try {
    const q = new URLSearchParams(location.search);
    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    if (keys.some((k) => q.get(k))) {
      const u: Record<string, string> = {};
      keys.forEach((k) => { const v = q.get(k); if (v) u[k] = v; });
      sessionStorage.setItem('yz-utm', JSON.stringify(u));
    }
    if (!sessionStorage.getItem('yz-ref')) sessionStorage.setItem('yz-ref', document.referrer || '');
  } catch { /* storage unavailable */ }
  const utm = (): Record<string, string> => {
    try { return JSON.parse(sessionStorage.getItem('yz-utm') || '{}'); } catch { return {}; }
  };
  const ref = () => { try { return sessionStorage.getItem('yz-ref') || ''; } catch { return ''; } };

  /* ---------- headline lines ---------- */
  document.querySelectorAll<HTMLElement>('#desk h1, #mob [aria-level="1"], #desk .h2, #mob .h2').forEach((el) => {
    if (el.dataset.split) return;
    el.dataset.split = '1';
    const parts = el.innerHTML.split(/<br\s*\/?>/i);
    el.innerHTML = parts.map((p) => `<span class="ln"><span class="lni">${p}</span></span>`).join('');
    el.querySelectorAll<HTMLElement>('.lni').forEach((s, i) => { s.style.transitionDelay = `${i * 0.11}s`; });
  });

  /* ---------- hero ---------- */
  [desk, mob].forEach((r) => {
    const hero = r.querySelector('section') as HTMLElement;
    hero.dataset.hero = '1';
    const nav = hero.querySelector('nav') || hero.querySelector('div');
    nav?.classList.add('navin');
    hero.querySelector('img[alt="Ильяс Ергазы"]')?.classList.add('hero-photo');
    const h1 = (hero.querySelector('h1') || hero.querySelector('[aria-level="1"]')) as HTMLElement;
    const box = h1.parentElement as HTMLElement;
    Array.from(box.children).forEach((c) => { if (c !== h1) c.classList.add('rv', 'hero-rv'); });
    if (r === desk && box.nextElementSibling) box.nextElementSibling.classList.add('rv', 'hero-rv');
  });
  const playHero = (r: HTMLElement) => {
    const hero = r.querySelector('[data-hero]') as HTMLElement;
    const nav = hero.querySelector('.navin');
    const ph = hero.querySelector('.hero-photo');
    const h1 = hero.querySelector('h1') || hero.querySelector('[aria-level="1"]');
    setTimeout(() => ph?.classList.add('in'), 60);
    setTimeout(() => nav?.classList.add('in'), 250);
    setTimeout(() => h1?.classList.add('in'), 380);
    hero.querySelectorAll<HTMLElement>('.hero-rv').forEach((e, i) => {
      setTimeout(() => { e.classList.add('in'); counts(e); }, 820 + i * 130);
    });
  };

  /* ---------- count up ---------- */
  const counts = (el: Element) => {
    el.querySelectorAll<HTMLElement>('div,span').forEach((d) => {
      if (d.children.length || d.dataset.counted) return;
      const m = d.textContent?.trim().match(/^(от )?(\d+(?:\.\d+)?)(\$|\+| млн| лет)$/);
      if (!m) return;
      if (parseFloat(getComputedStyle(d).fontSize) < 22) return;
      d.dataset.counted = '1';
      const to = parseFloat(m[2]);
      const dec = (m[2].split('.')[1] || '').length;
      const pre = m[1] || '';
      const suf = m[3];
      const final = d.textContent as string;
      d.style.fontVariantNumeric = 'tabular-nums';
      let t0 = 0;
      const step = (ts: number) => {
        if (!t0) t0 = ts;
        const p = Math.min(1, (ts - t0) / 1500);
        const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        d.textContent = p === 1 ? final : pre + (to * e).toFixed(dec) + suf;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  };

  /* ---------- scroll reveals ---------- */
  const targets: Element[] = [];
  const mark = (r: HTMLElement) => {
    r.querySelectorAll<HTMLElement>('section,footer').forEach((s) => {
      if (s.dataset.hero) return;
      const wrap = (s.querySelector('.wrap') as HTMLElement) || s;
      const kids = Array.from((s.classList.contains('sec') || wrap === s ? s : wrap).children) as HTMLElement[];
      kids.forEach((k) => {
        if (k.matches('h2,.h2')) { targets.push(k); return; }
        const cs = getComputedStyle(k);
        const stagger = (cs.display === 'grid')
          || (k.children.length > 2 && cs.display === 'flex' && cs.flexDirection !== 'row' && !!k.querySelector('.faq,.srv'))
          || (cs.display === 'flex' && cs.flexDirection === 'row' && k.children.length > 2 && !k.querySelector('form'));
        if (stagger) {
          Array.from(k.children).forEach((c, i) => {
            c.classList.add('rv');
            (c as HTMLElement).style.transitionDelay = `${Math.min(i, 8) * 0.07}s`;
            targets.push(c);
          });
        } else { k.classList.add('rv'); targets.push(k); }
      });
    });
  };
  mark(desk); mark(mob);
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); counts(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  targets.forEach((t) => io.observe(t));
  cleanups.push(() => io.disconnect());

  /* ---------- faq ---------- */
  document.querySelectorAll<HTMLElement>('.faq').forEach((f) => {
    const q = f.textContent || '';
    let txt = ANSWER_FALLBACK;
    for (const f2 of FAQ) { if (q.includes(f2.key)) { txt = f2.a; break; } }
    const a = document.createElement('div');
    a.className = 'ans';
    a.innerHTML = '<div><p></p></div>';
    (a.querySelector('p') as HTMLElement).textContent = txt;
    f.after(a);
    f.setAttribute('role', 'button');
    f.setAttribute('tabindex', '0');
    f.setAttribute('aria-expanded', 'false');
    const toggle = () => {
      const o = !f.classList.contains('open');
      f.classList.toggle('open', o); a.classList.toggle('open', o);
      f.setAttribute('aria-expanded', String(o));
    };
    f.addEventListener('click', toggle);
    f.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  });

  document.querySelectorAll('a[href="/medical"]').forEach((a) => { if (a.querySelector('div')) a.classList.add('medban'); });

  /* ---------- toasts ---------- */
  const icOk = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1B1B1B" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  const icBad = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F6F5F4" stroke-width="2.4" stroke-linecap="round"><path d="M12 7v6M12 17h.01"/></svg>';
  const toast = (t: string, sub?: string, bad?: boolean) => {
    const el = document.createElement('div');
    el.className = 'toast' + (bad ? ' bad' : '');
    el.innerHTML = `<span class="tdot">${bad ? icBad : icOk}</span><span>${t}${sub ? `<span class="sub">${sub}</span>` : ''}</span>`;
    document.getElementById('toasts')?.appendChild(el);
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('on')));
    setTimeout(() => { el.classList.remove('on'); setTimeout(() => el.remove(), 500); }, bad ? 5200 : 3600);
  };

  /* ---------- sending ---------- */
  const digits = (v: string) => (v || '').replace(/\D/g, '');
  const send = async (payload: Record<string, unknown>) => {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...payload, utm: utm(), referrer: ref(), page: location.pathname }),
    });
    if (!res.ok) throw new Error('send failed');
  };
  const goal = (name: 'lead' | 'checklist') => {
    try {
      const ymId = Number(doc.dataset.ym || 0);
      if (ymId && w.ym) w.ym(ymId, 'reachGoal', name);
      w.gtag?.('event', name === 'lead' ? 'generate_lead' : 'checklist_download');
      w.fbq?.('track', 'Lead', { content_name: name });
    } catch { /* analytics optional */ }
  };
  const spinBtn = (btn: HTMLElement, label: string) => {
    btn.setAttribute('disabled', '');
    btn.innerHTML = '<span class="spin"></span>отправляю';
    return () => { btn.removeAttribute('disabled'); btn.innerHTML = label; };
  };
  const fail = () => toast('не получилось отправить', 'проверьте интернет или напишите мне в whatsapp', true);

  /* ---------- phone mask ---------- */
  const fmt = (inp: HTMLInputElement) => {
    inp.addEventListener('input', () => {
      let d = digits(inp.value);
      if (!d) { inp.value = ''; return; }
      if (d[0] === '8') d = '7' + d.slice(1);
      if (d[0] !== '7') d = '7' + d;
      d = d.slice(0, 11);
      let o = '+7';
      if (d.length > 1) o += ' (' + d.slice(1, 4);
      if (d.length >= 4) o += ')';
      if (d.length > 4) o += ' ' + d.slice(4, 7);
      if (d.length > 7) o += '-' + d.slice(7, 9);
      if (d.length > 9) o += '-' + d.slice(9, 11);
      inp.value = o;
      inp.classList.remove('err');
      inp.style.borderColor = '';
      inp.parentElement?.querySelector('.em')?.classList.remove('on');
    });
  };
  document.querySelectorAll<HTMLInputElement>('input[type=tel]').forEach(fmt);
  const phoneOk = (inp: HTMLInputElement) => {
    if (digits(inp.value).length >= 11) return true;
    inp.classList.remove('err'); void inp.offsetWidth; inp.classList.add('err');
    inp.parentElement?.querySelector('.em')?.classList.add('on');
    inp.focus();
    return false;
  };

  /* ---------- modals ---------- */
  let openOv: HTMLElement | null = null;
  let lastFocus: HTMLElement | null = null;
  const noteText = () => (isM()
    ? 'отправляя форму, вы соглашаетесь на сбор<br>и обработку <a href="/privacy" style="text-decoration:underline">персональных данных</a>'
    : 'отправляя форму, вы соглашаетесь на сбор и обработку<br><a href="/privacy" style="text-decoration:underline">персональных данных</a>');
  const openModal = (id: 'task' | 'lead', need?: string) => {
    const ov = document.getElementById('ov-' + id) as HTMLElement;
    const form = ov.querySelector('form') as HTMLFormElement;
    form.classList.remove('hide', 'out', 'pre');
    ov.querySelector('[data-done]')?.classList.add('hide');
    ov.querySelectorAll<HTMLElement>('[data-note]').forEach((n) => { n.innerHTML = noteText(); });
    const lt = ov.querySelector<HTMLElement>('[data-lt]');
    if (lt) {
      lt.innerHTML = isM() ? '10 бесплатных<br>способов привлечь<br>новых клиентов' : '10 бесплатных способов<br>привлечь новых клиентов';
      lt.style.fontSize = isM() ? '26px' : '30px';
    }
    if (need) ov.querySelectorAll<HTMLElement>('.ch').forEach((c) => { if (c.textContent === need) c.classList.add('on'); });
    lastFocus = document.activeElement as HTMLElement;
    ov.classList.add('on'); ov.setAttribute('aria-hidden', 'false'); openOv = ov;
    fitModal();
    doc.style.overflow = 'hidden';
    setTimeout(() => (form.querySelector('input[name=name]') as HTMLElement)?.focus({ preventScroll: true }), 450);
  };
  // a popup must never need scrolling: shrink it to the screen if it is still too tall
  const fitModal = () => {
    if (!openOv) return;
    const m = openOv.querySelector('.mdl') as HTMLElement;
    m.style.zoom = '1';
    m.style.maxHeight = 'none';
    const avail = window.innerHeight - (isM() ? 8 : 32);
    const h = m.scrollHeight;
    const z = Math.min(1, avail / h);
    m.style.zoom = String(Math.max(0.7, z));
    if (z < 0.7) m.style.maxHeight = ''; // extremely short screens: fall back to scrolling
  };
  on('resize', fitModal);
  const closeModal = () => {
    if (!openOv) return;
    openOv.classList.remove('on'); openOv.setAttribute('aria-hidden', 'true'); openOv = null;
    doc.style.overflow = '';
    lastFocus?.focus?.({ preventScroll: true });
  };
  document.querySelectorAll<HTMLElement>('.ov').forEach((ov) => {
    ov.addEventListener('click', (e) => {
      const t = e.target as HTMLElement;
      if (t === ov || t.closest('[data-close]')) closeModal();
      if (t.closest('[data-close-later]')) setTimeout(closeModal, 400);
    });
  });
  document.querySelectorAll<HTMLElement>('.ch').forEach((c) => {
    c.setAttribute('aria-pressed', 'false');
    c.addEventListener('click', () => { const o = c.classList.toggle('on'); c.setAttribute('aria-pressed', String(o)); });
  });

  document.querySelectorAll<HTMLFormElement>('form[data-form]').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const kind = form.dataset.form as 'task' | 'lead';
      const ov = form.closest('.ov') as HTMLElement;
      const tel = form.querySelector('input[type=tel]') as HTMLInputElement;
      if (!phoneOk(tel)) return;
      const btn = form.querySelector('.mb') as HTMLElement;
      const restore = spinBtn(btn, btn.innerHTML);
      try {
        await send({
          form: kind === 'lead' ? 'checklist' : 'task',
          name: (form.querySelector('input[name=name]') as HTMLInputElement).value,
          phone: tel.value,
          needs: Array.from(form.querySelectorAll('.ch.on')).map((c) => c.textContent),
          company: (form.querySelector('input[name=company]') as HTMLInputElement)?.value || '',
        });
      } catch { restore(); fail(); return; }
      restore();
      goal(kind === 'lead' ? 'checklist' : 'lead');
      const done = ov.querySelector('[data-done]') as HTMLElement;
      form.classList.add('out');
      setTimeout(() => {
        form.classList.add('hide'); form.classList.remove('out'); form.reset();
        form.querySelectorAll('.ch.on').forEach((c) => c.classList.remove('on'));
        done.classList.remove('hide'); done.classList.add('pre'); void done.offsetWidth; done.classList.remove('pre'); fitModal();
      }, 320);
      toast(kind === 'lead' ? 'чек-лист готов' : 'заявка отправлена');
    });
  });

  /* ---------- inline final forms ---------- */
  ['#form form', '#m-form form'].forEach((sel) => {
    const f = document.querySelector<HTMLFormElement>(sel);
    if (!f) return;
    const name = f.querySelector('input[type=text]') as HTMLInputElement;
    const tel = f.querySelector('input[type=tel]') as HTMLInputElement;
    name.name = 'name'; tel.name = 'phone';
    name.autocomplete = 'name'; tel.autocomplete = 'tel';
    const em = document.createElement('span');
    em.className = 'em'; em.textContent = 'не хватает цифр в номере';
    tel.parentElement?.appendChild(em);
    const note = f.querySelector('div:last-child');
    if (note && note.textContent?.includes('персональных')) {
      note.innerHTML = note.innerHTML.replace('персональных данных', '<a href="/privacy" style="text-decoration:underline">персональных данных</a>');
    }
    const btn = f.querySelector('button') as HTMLButtonElement;
    btn.type = 'submit';
    f.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (digits(tel.value).length < 11) {
        tel.style.borderColor = '#CC0000';
        tel.animate([{ transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }], { duration: 350 });
        em.classList.add('on'); tel.focus(); return;
      }
      const label = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<span class="spin" style="display:inline-block;vertical-align:-4px;margin-right:12px"></span>отправляю';
      try {
        await send({ form: 'final', name: name.value, phone: tel.value, needs: [] });
      } catch { btn.disabled = false; btn.innerHTML = label; fail(); return; }
      goal('lead');
      btn.innerHTML = 'ваша заявка у меня';
      toast('заявка отправлена');
      setTimeout(() => { btn.disabled = false; btn.innerHTML = label; f.reset(); em.classList.remove('on'); }, 3500);
    });
  });

  /* ---------- anchors ---------- */
  const go = (id: string) => {
    const el = document.getElementById(isM() ? 'm-' + id : id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' });
  };
  const onClick = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
    if (!a) return;
    const h = a.getAttribute('href') as string;
    e.preventDefault();
    if (a.closest('#menu')) { closeMenu(); setTimeout(() => go(h.slice(1)), 350); return; }
    if (h === '#form') { openModal('task', a.dataset.need); return; }
    if (h === '#lead') { openModal('lead'); return; }
    go(h.slice(1));
  };
  document.addEventListener('click', onClick);
  cleanups.push(() => document.removeEventListener('click', onClick));
  document.querySelectorAll<HTMLElement>('[data-go]').forEach((b) => b.addEventListener('click', () => {
    closeModal(); setTimeout(() => go(b.dataset.go as string), 300);
  }));

  /* ---------- mobile menu ---------- */
  const menu = document.getElementById('menu') as HTMLElement;
  function closeMenu() {
    menu.classList.remove('on'); menu.setAttribute('aria-hidden', 'true'); doc.style.overflow = '';
  }
  mob.querySelector('button[aria-label="меню"]')?.addEventListener('click', () => {
    menu.querySelectorAll<HTMLElement>('a').forEach((a, i) => { a.style.transitionDelay = `${0.08 + i * 0.06}s`; });
    menu.classList.add('on'); menu.setAttribute('aria-hidden', 'false'); doc.style.overflow = 'hidden';
  });
  menu.querySelector('[data-menu-close]')?.addEventListener('click', closeMenu);
  on('keydown', (e) => { if (e.key === 'Escape') { closeModal(); closeMenu(); } });

  /* ---------- start ---------- */
  let started = false;
  const start = () => { if (started) return; started = true; playHero(root()); };
  if (document.fonts?.ready) document.fonts.ready.then(() => setTimeout(start, 60));
  setTimeout(start, 900);
  if (location.hash === '#form') setTimeout(() => { history.replaceState(null, '', location.pathname); openModal('task'); }, 700);

  return () => cleanups.forEach((f) => f());
}
