// demo component behaviors — exact springs, reduced-motion awareconst RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

// state-layer ripple on all demo interactive elementsdocument.addEventListener('pointerdown', e => {
  if (RM) return;
  const el = e.target.closest('.btn,.btngroup button,.fab,.iconbtn,.chip,.tabs button,.list-demo .li,.topbar a,.rail a,.pill');
  if (!el) return;
  const r = el.getBoundingClientRect();
  const d = Math.hypot(r.width, r.height) * 2;
  const s = document.createElement('span');
  s.style.cssText = 'position:absolute;border-radius:50%;background:currentColor;opacity:.1;pointer-events:none;left:'+(e.clientX-r.left-d/2)+'px;top:'+(e.clientY-r.top-d/2)+'px;width:'+d+'px;height:'+d+'px;transform:scale(0)';
  el.appendChild(s);
  const spd = getComputedStyle(document.documentElement).getPropertyValue('--md-sys-motion-fast-spatial-duration') || '.25s';
  const cur = getComputedStyle(document.documentElement).getPropertyValue('--md-sys-motion-fast-spatial') || 'ease-out';
  s.style.transition = 'transform '+spd+' '+cur+', opacity .6s ease-out';
  requestAnimationFrame(()=>{s.style.transform='scale(1)';s.style.opacity='0'});
  setTimeout(()=>s.remove(), 700);
});

// button group / chips: toggle press statedocument.addEventListener('click', e => {
  const seg = e.target.closest('.btngroup button');
  if (seg && seg.dataset.single !== undefined) {
    seg.parentElement.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed','false'));
    seg.setAttribute('aria-pressed','true');
  } else if (seg) { seg.setAttribute('aria-pressed', seg.getAttribute('aria-pressed')!=='true'); }
  const chip = e.target.closest('.chip[aria-pressed]');
  if (chip) chip.setAttribute('aria-pressed', chip.getAttribute('aria-pressed')!=='true');
  const iconb = e.target.closest('.iconbtn[aria-pressed]');
  if (iconb) iconb.setAttribute('aria-pressed', iconb.getAttribute('aria-pressed')!=='true');
  const sw = e.target.closest('.switch');

  if (sw) sw.setAttribute('aria-checked', sw.getAttribute('aria-checked')!=='true');
  const tab = e.target.closest('.tabs button');
  if (tab) { tab.parentElement.querySelectorAll('button').forEach(b=>b.setAttribute('aria-selected','false')); tab.setAttribute('aria-selected','true'); }
  const fabm = e.target.closest('.fabmenu .fab');
  if (fabm) { fabm.closest('.fabmenu').classList.toggle('open'); }
  const arrow = e.target.closest('.splitbtn .arrow');
  if (arrow) { arrow.closest('.splitbtn').classList.toggle('open'); }
});

// slider: update fill % (active track), value labeldocument.querySelectorAll('input.slider').forEach(sl => {
  const upd = () => {
    const pct = (sl.value - sl.min) / (sl.max - sl.min) * 100;
    sl.style.setProperty('--pct', pct + '%');
    const lbl = document.getElementById(sl.dataset.label || '');
    if (lbl) lbl.textContent = sl.value;
  };
  sl.addEventListener('input', upd); upd();
});

// determinate progress demos: animate value with the fast-spatial spring feeldocument.querySelectorAll('.progress[data-auto]').forEach(p => {
  if (RM) return;
  let v = 0;
  const tick = () => {
    v = (v + 0.02) % 1.05;
    p.style.setProperty('--val', Math.min(v, 1) * 100 + '%');
    requestAnimationFrame(tick);
  };
  if (!RM) requestAnimationFrame(tick);
});

// snackbar demodocument.querySelectorAll('[data-snackbar]').forEach(b => {
  b.addEventListener('click', () => {
    const t = document.getElementById(b.dataset.snackbar);
    if (!t) return;
    t.style.display = 'inline-flex';
    t.animate([{transform:'translateY(20px)',opacity:0},{transform:'translateY(0)',opacity:1}], {duration:250, easing:'cubic-bezier(.05,.7,.1,1)'});
    clearTimeout(t._to); t._to = setTimeout(()=>t.style.display='none', 3500);
  });
});


// ---- M3 Expressive shape morphs ----
// Shapes are normalized 96-point sequences (equal-angle sampling) so clip-path
// interpolates 1:1 across any shape pair — the same approach the library uses
// for its shape tokens (point sequences + spring interpolation).
(() => {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const N = 96;
  const radial = (depth, lobes, phase) => (t) => {
    const r = 0.5 * (1 + depth * Math.cos(lobes * t + (phase || 0)));
    return [0.5 + r * Math.cos(t), 0.5 + r * Math.sin(t)];
  };
  const superellipse = (n) => (t) => {
    const c = Math.cos(t), s = Math.sin(t);
    return [0.5 + 0.5 * Math.sign(c) * Math.pow(Math.abs(c), 2 / n),
            0.5 + 0.5 * Math.sign(s) * Math.pow(Math.abs(s), 2 / n)];
  };
  const SHAPES = {
    circle:    radial(0, 1, 0),
    squircle:  superellipse(4),
    rounded:   superellipse(2.5),
    cookie:    radial(0.12, 12, 0),
    softcookie:radial(0.05, 12, 0),
    clover:    radial(0.18, 4, 0),
    sunny:     radial(-0.28, 12, 0),
    flower:    radial(0.12, 8, 0),
    puffy:     radial(0.16, 4, Math.PI / 2),
  };
  const clip = (name) => {
    const fn = SHAPES[name] || SHAPES.circle;
    const pts = [];
    for (let i = 0; i < N; i++) {
      const p = fn((i / N) * 2 * Math.PI);
      pts.push((p[0] * 100).toFixed(2) + '% ' + (p[1] * 100).toFixed(2) + '%');
    }
    return 'polygon(' + pts.join(',') + ')';
  };
  window.__m3eClip = clip;
  const setShape = (el, s) => { el.style.clipPath = clip(s); };
  document.querySelectorAll('[data-shape]').forEach(el => setShape(el, el.dataset.shape));

  if (!RM) {
    document.querySelectorAll('[data-morph]').forEach(el => {
      const base = el.dataset.shape || 'squircle';
      el.addEventListener('pointerenter', () => setShape(el, el.dataset.morph));
      el.addEventListener('pointerleave', () => setShape(el, base));
      el.addEventListener('focus', () => setShape(el, el.dataset.morph));
      el.addEventListener('blur', () => setShape(el, base));
    });
    // the signature M3E press morph: buttons morph to cookie while pressed
    const restore = (e) => {
      const b = e.target.closest && e.target.closest('.btn,.fab,.iconbtn,.chip,.m3');
      if (!b || !b._m3eBase) return;
      b.style.clipPath = b._m3eBase;
      b._m3eBase = null;
    };
    document.addEventListener('pointerdown', (e) => {
      const b = e.target.closest && e.target.closest('.btn,.fab,.iconbtn,.chip,.m3');
      if (!b || b.hasAttribute('data-noMorph')) return;
      b._m3eBase = b.style.clipPath || '';
      b.style.clipPath = clip('cookie');
    });
    document.addEventListener('pointerup', restore);
    document.addEventListener('pointercancel', restore);
    // cards morph softly on hover (rounded -> soft cookie)
    document.querySelectorAll('.card').forEach(c => {
      c.style.clipPath = clip('rounded');
      c.addEventListener('pointerenter', () => setShape(c, 'softcookie'));
      c.addEventListener('pointerleave', () => setShape(c, 'rounded'));
    });
  }
})();
