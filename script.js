const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}));
function splitWords(root){
  root.querySelectorAll('.word-split').forEach(el => {
    const text = el.textContent.trim();
    el.innerHTML = '';
    text.split(' ').forEach(word => {
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = word; span.style.marginRight='0.28em';
      el.appendChild(span);
    });
  });
}
splitWords(document);
const lastPlay = new WeakMap();
const wordIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    const now = performance.now();
    if (e.isIntersecting){
      if (now - (lastPlay.get(e.target)||0) < 1200) return;
      lastPlay.set(e.target, now);
      const words = e.target.querySelectorAll('.word');
      requestAnimationFrame(() => {
        words.forEach((w,i)=>{ w.classList.remove('play'); w.style.animationDelay = Math.min(i*0.03,0.7)+'s'; w.classList.add('play'); });
      });
    } else {
      e.target.querySelectorAll('.word').forEach(w=>w.classList.remove('play'));
    }
  });
},{threshold:0.18});
document.querySelectorAll('.word-split').forEach(el => wordIO.observe(el));
const riseIO = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('visible'); riseIO.unobserve(e.target); }
  });
},{threshold:0.12});
document.querySelectorAll('.rise').forEach(el=>riseIO.observe(el));
const setActive = () => {
  const links = document.querySelectorAll('.nav-links a');
  const secs = document.querySelectorAll('main section, header');
  let current = 'home';
  secs.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < 120) current = sec.id || current;
  });
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
};
window.addEventListener('scroll', setActive, {passive:true});
setActive();

const allWords = document.querySelectorAll('.word-split'); allWords.forEach(el => { try { wordIO.observe(el); } catch(e){} });

