// demo component behaviors — exact springs, reduced-motion aware
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

// state-layer ripple on all demo interactive elements
document.addEventListener('pointerdown', e => {
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

// button group / chips: toggle press state
document.addEventListener('click', e => {
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

// slider: update fill % (active track), value label
document.querySelectorAll('input.slider').forEach(sl => {
  const upd = () => {
    const pct = (sl.value - sl.min) / (sl.max - sl.min) * 100;
    sl.style.setProperty('--pct', pct + '%');
    const lbl = document.getElementById(sl.dataset.label || '');
    if (lbl) lbl.textContent = sl.value;
  };
  sl.addEventListener('input', upd); upd();
});

// determinate progress demos: animate value with the fast-spatial spring feel
document.querySelectorAll('.progress[data-auto]').forEach(p => {
  if (RM) return;
  let v = 0;
  const tick = () => {
    v = (v + 0.02) % 1.05;
    p.style.setProperty('--val', Math.min(v, 1) * 100 + '%');
    requestAnimationFrame(tick);
  };
  if (!RM) requestAnimationFrame(tick);
});

// snackbar demo
document.querySelectorAll('[data-snackbar]').forEach(b => {
  b.addEventListener('click', () => {
    const t = document.getElementById(b.dataset.snackbar);
    if (!t) return;
    t.style.display = 'inline-flex';
    t.animate([{transform:'translateY(20px)',opacity:0},{transform:'translateY(0)',opacity:1}], {duration:250, easing:'cubic-bezier(.05,.7,.1,1)'});
    clearTimeout(t._to); t._to = setTimeout(()=>t.style.display='none', 3500);
  });
});
