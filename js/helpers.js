/* Toasts, modals, animations (reveal, count-up), navbar, footer and the property card. */
/* ---------- helpers ---------- */
function toast(msg,icon='check'){const t=document.createElement('div');t.className='toast';t.innerHTML=ic(icon)+`<span>${msg}</span>`;$('#toasts').appendChild(t);setTimeout(()=>{t.classList.add('out');setTimeout(()=>t.remove(),320)},2800)}
function openModal(html){const m=$('#modal');m.innerHTML=`<div class="mb">${html}<button class="x" data-act="close" aria-label="Close">${ic('x')}</button></div>`;m.classList.add('open')}
function closeModal(){$('#modal').classList.remove('open')}
function confetti(){const c=['#2F7BFF','#FFB020','#12B886','#FF6A4D','#fff'];for(let i=0;i<60;i++){const s=document.createElement('i');s.className='cf';s.style.cssText=`left:${Math.random()*100}vw;background:${c[i%5]};animation-duration:${2+Math.random()*2.2}s;animation-delay:${Math.random()*.6}s;transform:rotate(${Math.random()*360}deg);border-radius:${i%3?'2px':'50%'}`;document.body.appendChild(s);setTimeout(()=>s.remove(),5200)}}
function slide(root){if(!root)return;const on=$('.on',root),ind=$('.ind',root);if(!on||!ind)return;ind.style.width=on.offsetWidth+'px';ind.style.transform=`translateX(${on.offsetLeft}px)`}
function pill(){const sn=$('.snav');if(!sn)return;const on=$('a.on',sn),p=$('.pill',sn);if(on&&p)p.style.transform=`translateY(${on.offsetTop}px)`}
function cycle(sel,ms=5600){const sl=$$(sel);if(sl.length<2)return;let i=0;S.timers.push(setInterval(()=>{sl[i].classList.remove('on');i=(i+1)%sl.length;sl[i].classList.add('on')},ms))}
function countUp(el){const to=+el.dataset.count,t0=performance.now(),d=1400,suf=el.dataset.suf||'';(function f(t){const k=Math.min(1,(t-t0)/d),e=1-Math.pow(1-k,3);el.textContent=fmt(to*e)+suf;if(k<1)requestAnimationFrame(f)})(t0)}
function showRv(el){if(el.classList.contains('in'))return;el.classList.add('in');$$('[data-count]',el).forEach(countUp);if(el.dataset.count)countUp(el);el.addEventListener('animationend',e=>{if(e.target===el)el.classList.add('done')},{once:true})}
function setupReveal(){
  const els=$$('.rv:not(.in)'),io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const el=e.target,i=[...el.parentNode.children].indexOf(el);el.style.setProperty('--dl',(i%6)*90+'ms');showRv(el);io.unobserve(el)}}),{threshold:.1});
  let k=0;els.forEach(el=>{const r=el.getBoundingClientRect();if(r.top<innerHeight*.92){el.style.setProperty('--dl',(k++*95)+'ms');showRv(el)}else io.observe(el)});
  S.timers.push(setTimeout(()=>els.forEach(showRv),6000));
}
const hasUser=()=>!!S.user;
function needLogin(next,msg){S.after=next;toast(msg||'Please log in to continue','lock');go('login')}

/* ---------- layout pieces ---------- */
function nav(){
  const A=S.navActive,l=[['home','Home','home'],['properties','Properties','grid'],['about','About','info'],['services','Services','gear'],['contact','Contact','chat']];
  const mobileActions=hasUser()
    ?`<a class="mobile-link" data-go="d:dash">${ic('grid')}<span>Dashboard</span></a>`
    :`<a class="mobile-link" data-go="login">${ic('user')}<span>Login</span></a><a class="mobile-link" data-go="signup">${ic('user')}<span>Sign Up</span></a>`;
  return `<header class="nav" id="nav"><div class="wrap nav-in">
   <a class="brand" data-go="home" aria-label="Home Nest home">${LOGO()}<span class="tl"><b>Home Nest</b><small>Find Your Perfect Space</small></span></a>
   <nav class="links" id="links" aria-label="Main navigation">${l.map(([k,t,icon])=>`<a data-go="${k}" class="${A===k?'on':''}" ${A===k?'aria-current="page"':''}>${ic(icon)}<span>${t}</span></a>`).join('')}${mobileActions}<i class="ind"></i></nav>
   <div class="nav-r">
    <button class="iconbtn" data-go="favorites" aria-label="Saved homes">${ic('heart')}${S.favs.size?`<b class="badge" id="fbadge">${S.favs.size}</b>`:''}</button>
    ${hasUser()?`<button class="btn ghost hide-s" data-go="d:dash">Dashboard</button><button class="avatar" data-go="d:profile" aria-label="Profile">${initials(S.user.name)}</button>`:`<button class="btn ghost" data-go="login">Login</button><button class="btn solid" data-go="signup">Sign Up</button>`}
    <button class="burger" data-act="menu" aria-label="Menu" aria-controls="links" aria-expanded="false">${ic('menu')}</button>
   </div></div></header>`;
}
const footer=()=>`<footer class="foot"><div class="wrap">
 <div class="foot-grid">
  <div class="foot-brand">${LOGO(true)}<p>Find your perfect space with a calmer, more considered way to discover a home.</p></div>
  <div class="foot-col"><h3>Explore</h3><a data-go="home">Home</a><a data-go="properties">Properties</a><a data-go="about">About us</a><a data-go="services">Our services</a></div>
  <div class="foot-col"><h3>Get in touch</h3><a href="tel:+919876543210">${ic('phone')}<span>+91 98765 43210</span></a><button type="button" data-act="footer-email">${ic('mail')}<span>hello@homenest.example</span></button><a data-go="contact">${ic('pin')}<span>Whitefield, Bangalore 560066</span></a></div>
  <div class="foot-col foot-social"><h3>Follow Home Nest</h3><p>Stay inspired and find your next place to call home.</p><div class="foot-socials">
   <button type="button" data-act="footer-social" aria-label="Instagram">${ic('instagram')}</button>
   <button type="button" data-act="footer-social" aria-label="Facebook">${ic('facebook')}</button>
   <button type="button" data-act="footer-social" aria-label="LinkedIn">${ic('linkedin')}</button>
  </div></div>
 </div>
 <div class="foot-bottom"><small>© 2026 Home Nest. All rights reserved.</small><div><a href="#" data-act="footer-policy" data-policy="privacy">Privacy Policy</a><a href="#" data-act="footer-policy" data-policy="terms">Terms of Use</a></div></div>
 </div></footer>`;
function card(p,i=0,anim='rv'){
  const m=p.beds?`<span>${ic('bed')}${p.beds} Bed${p.beds>1?'s':''}</span><span>${ic('bath')}${p.baths} Bath${p.baths>1?'s':''}</span>`:(p.baths?`<span>${ic('bath')}${p.baths} Baths</span>`:'');
  return `<article class="pcard ${anim} tilt" style="--i:${i}" data-go="details" data-id="${p.id}" tabindex="0">
   <div class="pimg"><img src="${IMG[p.img]}" alt="${p.title}" loading="lazy"><span class="tag ${p.mode}">${p.mode==='rent'?'For Rent':'For Sale'}</span><button class="fav ${S.favs.has(p.id)?'on':''}" data-fav="${p.id}" aria-label="Save ${p.title}">${ic('heart')}</button></div>
   <div class="pbody"><div class="ploc">${ic('pin')}${p.loc}</div><h3>${p.short}</h3><div class="meta">${m}<span>${ic('area')}${fmt(p.sqft)} sqft</span></div>
   <div class="pfoot"><b>${priceStr(p)}</b><span class="go">${ic('arr')}</span></div></div></article>`;
}
