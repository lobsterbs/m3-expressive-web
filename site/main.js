// state-layer ripple + search filter (reduced-motion aware)
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.addEventListener('pointerdown', e => {
  if (RM) return;
  const el = e.target.closest('.comp, button.m3, .topbar a');
  if (!el) return;
  const r = el.getBoundingClientRect();
  const d = Math.hypot(Math.max(e.clientX - r.left, r.width - (e.clientX - r.left)), Math.max(e.clientY - r.top, r.height - (e.clientY - r.top))) * 2;
  const s = document.createElement('span');
  s.style.cssText = 'position:absolute;border-radius:50%;background:currentColor;opacity:.1;pointer-events:none;left:'+(e.clientX-r.left-d/2)+'px;top:'+(e.clientY-r.top-d/2)+'px;width:'+d+'px;height:'+d+'px;transform:scale(0);transition:transform .45s linear(),opacity .6s linear()';
  // use exact fast-effects spring
  s.style.transition = 'transform .297s linear(0 0%, 0.029 4.2%, 0.1 8.3%, 0.194 12.5%, 0.296 16.7%, 0.398 20.8%, 0.494 25%, 0.582 29.2%, 0.659 33.3%, 0.726 37.5%, 0.783 41.7%, 0.83 45.8%, 0.869 50%, 0.9 54.2%, 0.925 58.3%, 0.944 62.5%, 0.96 66.7%, 0.972 70.8%, 0.98 75%, 0.987 79.2%, 0.992 83.3%, 0.995 87.5%, 0.998 91.7%, 0.999 95.8%, 1 100%), opacity .45s ease-out';
  el.appendChild(s);
  requestAnimationFrame(()=>{s.style.transform='scale(1)';s.style.opacity='0'});
  setTimeout(()=>s.remove(), 600);
});
const search = document.querySelector('.search');
if (search) search.addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  document.querySelectorAll('[data-search]').forEach(el => {
    el.hidden = !el.textContent.toLowerCase().includes(q);
  });
});
// scrollspy
const links=[...document.querySelectorAll('.toc a')];
if(links.length){const obs=new IntersectionObserver(es=>{es.forEach(en=>{if(en.isIntersecting){links.forEach(l=>l.classList.toggle('active',l.hash==='#'+en.target.id))}})},{rootMargin:'-20% 0px -70% 0px'});
document.querySelectorAll('section[id]').forEach(s=>obs.observe(s));}
