/* Router, form handling, modals, global events and the loader boot sequence. */
/* ---------- router ---------- */
const ROUTES={home:pgHome,properties:pgProps,details:pgDetails,booking:pgBooking,login:()=>authPage('login'),signup:()=>authPage('signup'),favorites:pgFavsPublic,'d:dash':pgDash,'d:bookings':pgBookings,'d:favorites':pgFavs,'d:profile':pgProfile,'d:messages':pgMsgs,'d:settings':pgSettings};
let first=true;
function go(name,params={},opts={}){
  if(['about','services','contact'].includes(name)){S.navActive=name;if(S.route.name!=='home'){S.route={name:'home'};render(false,()=>scrollToSec(name))}else{scrollToSec(name);syncNav()}return}
  if(name==='favorites'&&hasUser())name='d:favorites';
  if(name.startsWith('d:')&&!hasUser()){S.after={name,...params};toast('Log in to open your dashboard','lock');name='login';params={}}
  if(name==='booking'&&!hasUser()){S.after={name,...params};toast('Log in to book this property','lock');name='login';params={}}
  if((name==='login'||name==='signup')&&hasUser()){name='d:dash';params={}}
  S.route={name,...params};
  S.navActive=({home:'home',properties:'properties',details:'properties',booking:'properties'})[name]||(name.startsWith('d:')?'':'home');
  render(true);
}
function scrollToSec(id){setTimeout(()=>{const el=document.getElementById(id);if(el)el.scrollIntoView({behavior:'smooth',block:'start'});syncNav()},120)}
function syncNav(){$$('#links a').forEach(a=>a.classList.toggle('on',a.dataset.go===S.navActive));slide($('#links'))}
function render(anim,after){
  const app=$('#app');S.timers.forEach(t=>{clearInterval(t);clearTimeout(t)});S.timers=[];
  const run=()=>{
    app.innerHTML=(ROUTES[S.route.name]||pgHome)();
    app.classList.remove('leave');app.classList.remove('enter');void app.offsetWidth;app.classList.add('enter');
    window.scrollTo(0,0);post();if(after)after();
  };
  if(anim&&!first){app.classList.add('leave');setTimeout(run,170)}else run();
  first=false;
}
function post(){
  setupReveal();
  const r=S.route.name;
  slide($('#links'));pill();slide($('#dt'));
  if(r==='home'){cycle('.hero-bg .sl');const f=$('#cform');if(f)f.onsubmit=e=>{e.preventDefault();if(!$('#c-n').value.trim()||!$('#c-m').value.trim()){toast('Add your name and a message','x');return}toast('Message sent. We will reply within a day.');f.reset()}}
  if(r==='login'||r==='signup'){cycle('.auth-img .sl',6000);const f=$('#aform');f.onsubmit=authSubmit}
  if(r==='properties'){drawGrid()}
  if(r==='details'){const p=byId(S.route.id)||PR[0];$('#tpane').innerHTML=pane('Overview',p);S.tabN='Overview'}
  if(r==='booking'&&S.draft&&S.draft.step===1)updDur();
  if(r==='d:profile')$('#pform').onsubmit=e=>{e.preventDefault();S.user.name=$('#u-n').value.trim()||S.user.name;S.user.id=$('#u-e').value;S.user.city=$('#u-c').value;S.user.phone=$('#u-ph').value;lsSet('user',S.user);toast('Profile saved');render(false)};
  if(r==='d:messages'){const cl=$('#cl');cl.scrollTop=cl.scrollHeight;$('#cf').onsubmit=sendMsg}
}
function updDur(){
  const ci=$('#b-ci'),co=$('#b-co');if(!ci||!co)return;
  if(co.value<=ci.value){co.value=addM(ci.value,1)}
  const m=months(ci.value,co.value);$('#dur').textContent=`Lease duration: ${m} month${m>1?'s':''}`;const sd=$('#sd');if(sd)sd.textContent=`${m} Months`;
  S.draft.ci=ci.value;S.draft.co=co.value;
}
function authSubmit(e){
  e.preventDefault();const L=S.route.name==='login',id=$('#a-id'),pw=$('#a-pw');let ok=true;
  const bad=(el,msg)=>{const f=el.closest('.fld');f.classList.remove('err');void f.offsetWidth;f.classList.add('err');$('.em',f).textContent=msg;ok=false};
  $$('.fld').forEach(f=>{f.classList.remove('err');$('.em',f).textContent=''});
  if(!L&&!$('#a-nm').value.trim())bad($('#a-nm'),'Enter your name');
  const v=id.value.trim();if(!(/^\S+@\S+\.\S+$/.test(v)||/^\+?\d[\d\s-]{8,13}$/.test(v)))bad(id,'Enter a valid email or mobile number');
  if(pw.value.length<4)bad(pw,'Use at least 4 characters');
  if(!L){if($('#a-p2').value!==pw.value)bad($('#a-p2'),'Passwords do not match');if(!$('#a-tc').checked){toast('Please accept the terms','x');ok=false}}
  if(!ok)return;
  const name=L?(v.includes('@')?v.split('@')[0].replace(/[^a-zA-Z]+/g,' ').trim()||'Guest':'Home Nest Member'):$('#a-nm').value.trim();
  const nm=name.replace(/\b\w/g,c=>c.toUpperCase());
  signIn({name:nm,id:v},L&&$('#a-rm').checked||!L);
}
function signIn(u,remember){
  S.user=u;if(remember)lsSet('user',u);
  toast(`Welcome, ${u.name.split(' ')[0]}!`);
  const nx=S.after;S.after=null;
  if(nx){const {name,...rest}=nx;go(name,rest)}else go('d:dash');
}
function sendMsg(e){
  e.preventDefault();const i=$('#cm'),v=i.value.trim();if(!v)return;const t=S.threads[S.thread],idx=S.thread;
  t.m.push(['me',v]);i.value='';const cl=$('#cl');cl.insertAdjacentHTML('beforeend',`<div class="bub me">${v}</div><div class="bub th typing" id="ty"><i></i><i></i><i></i></div>`);cl.scrollTop=cl.scrollHeight;
  setTimeout(()=>{t.m.push(['th',idx===0?'Thanks! I have noted it and will confirm with the owner today.':'Got it. A support agent will follow up shortly.']);if(S.thread===idx&&$('#cl')){$('#ty').remove();$('#cl').insertAdjacentHTML('beforeend',`<div class="bub th">${t.m[t.m.length-1][1]}</div>`);$('#cl').scrollTop=$('#cl').scrollHeight}},1400);
}

/* ---------- agreement / details modals ---------- */
function agrModal(b){
  const p=byId(b.pid),dep=p.price*10;
  openModal(`<h3>Rental Agreement</h3><div class="kv"><span>Agreement No.</span><b>${b.id}</b><span>Tenant</span><b>${S.user.name}</b><span>Property</span><b>${p.title}</b><span>Address</span><b>${p.loc}</b><span>Term</span><b>${fd(b.ci)} to ${fd(b.co)}</b><span>Monthly rent</span><b>${inr(p.price)}</b><span>Security deposit</span><b>${inr(dep)}</b></div>
  <div class="agr"><p><b>1. Use.</b> The property is let for residential use only by the tenant named above.</p><p><b>2. Rent.</b> Rent is payable monthly in advance by the 5th of each month.</p><p><b>3. Deposit.</b> The deposit is refundable within 15 days of vacating, less documented damages.</p><p><b>4. Notice.</b> Either party may end the agreement with 60 days written notice after the first six months.</p></div>
  <div style="display:flex;gap:12px;flex-wrap:wrap"><button class="btn solid" data-act="copyagr" data-b="${b.id}">Copy agreement summary</button><button class="btn ghost" data-act="close">Close</button></div><p style="font-size:12.5px;color:var(--muted)">Preview only. Files cannot be saved from this page, so copy the summary instead.</p>`);
}
function copyText(txt){const done=()=>toast('Agreement summary copied');if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(done).catch(()=>toast('Copy is blocked here. Select the text instead.','x'))}else toast('Copy is blocked here. Select the text instead.','x')}

/* ---------- global events ---------- */
document.addEventListener('click',e=>{
  const rip=e.target.closest('.btn');if(rip){const r=rip.getBoundingClientRect(),s=document.createElement('span'),d=Math.max(r.width,r.height);s.className='ripple';s.style.cssText=`width:${d}px;height:${d}px;left:${e.clientX-r.left-d/2}px;top:${e.clientY-r.top-d/2}px`;rip.appendChild(s);setTimeout(()=>s.remove(),600)}
  const fav=e.target.closest('[data-fav]');
  if(fav){e.stopPropagation();const id=+fav.dataset.fav;if(S.favs.has(id)){S.favs.delete(id);toast('Removed from saved homes','heart')}else{S.favs.add(id);toast('Saved to your favorites','heart')}save();
    $$(`[data-fav="${id}"]`).forEach(b=>{b.classList.toggle('on',S.favs.has(id));b.classList.remove('beat');void b.offsetWidth;b.classList.add('beat')});
    const n=S.favs.size;let bd=$('#fbadge');const nb=$('.nav-r .iconbtn');if(nb&&!$('.dash')){if(!bd&&n){nb.insertAdjacentHTML('beforeend',`<b class="badge pop" id="fbadge">${n}</b>`)}else if(bd){if(n){bd.textContent=n;bd.classList.remove('pop');void bd.offsetWidth;bd.classList.add('pop')}else bd.remove()}}
    if(S.route.name==='d:favorites')render(false);return}
  const t=e.target.closest('[data-th]');if(t){$$('.thumbs button').forEach(b=>b.classList.toggle('on',b===t));$('#gmain').innerHTML=`<img src="${IMG[t.dataset.th]}" alt="">`;return}
  const tab=e.target.closest('[data-tab]');if(tab){$$('#dtabs button').forEach(b=>b.classList.toggle('on',b===tab));slide($('#dtabs'));$('#tpane').innerHTML=pane(tab.dataset.tab,byId(S.route.id)||PR[0]);return}
  const dt=e.target.closest('[data-dtab]');if(dt){S.tab=dt.dataset.dtab;$$('#dt button').forEach(b=>b.classList.toggle('on',b===dt));slide($('#dt'));const L=S.bookings.filter(b=>b.tab===S.tab);$('#bl').innerHTML=L.length?L.map(bkCard).join(''):`<div class="empty">${ic('cal')}<h3>Nothing here yet</h3></div>`;setupReveal();return}
  const md=e.target.closest('[data-mode]');if(md&&S.route.name==='properties'){S.filt.mode=md.dataset.mode;$$('#fbar .chip').forEach(b=>b.classList.toggle('on',b===md));drawGrid();return}
  const th=e.target.closest('[data-thr]');if(th){S.thread=+th.dataset.thr;render(false);return}
  const sw=e.target.closest('[data-sw]');if(sw){const k=sw.dataset.sw;S.prefs[k]=!S.prefs[k];sw.classList.toggle('on',S.prefs[k]);sw.setAttribute('aria-checked',S.prefs[k]);return}
  const pay=e.target.closest('[data-pay]');if(pay){S.draft.pay=pay.dataset.pay;render(false);return}
  const go_=e.target.closest('[data-go]');
  if(go_&&!e.target.closest('[data-act]')){
    const d=go_.dataset;
    if(d.go==='properties'){S.filt={mode:d.mode||'all',type:d.type||'any',tier:'any',beds:'any',q:''}}
    const links=$('#links'),menu=$('.burger');
    if(links)links.classList.remove('open');
    if(menu){
      menu.setAttribute('aria-expanded','false');
      menu.setAttribute('aria-label','Menu');
      menu.innerHTML=ic('menu');
    }
    const side=$('.side'),dashMenu=$('.dash-menu');
    if(side)side.classList.remove('open');
    if(dashMenu){dashMenu.setAttribute('aria-expanded','false');dashMenu.setAttribute('aria-label','Open dashboard menu');dashMenu.innerHTML=ic('menu')}
    go(d.go,d.id?{id:+d.id}:{ });return}
  const a=e.target.closest('[data-act]');if(!a)return;const act=a.dataset.act;
  const bk=()=>S.bookings.find(b=>b.id===a.dataset.b);
  switch(act){
   case 'dashboard-menu':{
    const side=$('.side'),open=side.classList.toggle('open');
    a.setAttribute('aria-expanded',String(open));
    a.setAttribute('aria-label',open?'Close dashboard menu':'Open dashboard menu');
    a.innerHTML=ic(open?'x':'menu');break;
   }
   case 'menu':{
    const links=$('#links'),open=links.classList.toggle('open');
    a.setAttribute('aria-expanded',String(open));
    a.setAttribute('aria-label',open?'Close menu':'Menu');
    a.innerHTML=ic(open?'x':'menu');break;
   }
   case 'footer-policy':{
    e.preventDefault();
    if(a.dataset.policy==='privacy'){
      openModal(`<h3>Privacy Policy</h3><p style="color:var(--muted)">Home Nest is a demo experience. Sign-in details, saved homes and bookings may be stored in this browser using local storage. Contact messages and preference changes are simulated and are not sent to a server.</p>`);
    }else{
      openModal(`<h3>Terms of Use</h3><p style="color:var(--muted)">Home Nest is a demonstration app. Property listings, prices, availability, booking confirmations and agreement text are illustrative only and do not create an offer, reservation or legal contract. Please verify details directly before making a housing or payment decision.</p>`);
    }
    break;
   }
   case 'footer-email':copyText('hello@homenest.example');break;
   case 'footer-social':toast('Home Nest social profiles are coming soon','chat');break;
   case 'close':closeModal();break;
   case 'search':S.filt={mode:'all',type:$('#s-t').value,tier:$('#s-p').value,beds:$('#s-b').value,q:$('#s-q').value};go('properties');break;
   case 'clear':S.filt={mode:'all',type:'any',tier:'any',beds:'any',q:''};render(false);break;
   case 'book':case 'again':S.draft=null;go('booking',{id:+a.dataset.id});break;
   case 'enquire':case 'contact':{const p=byId(a.dataset.id);openModal(`<h3>${act==='contact'?'Contact Riya Sharma':'Enquire about this home'}</h3><p style="color:var(--muted)">${p.title}, ${p.loc}</p><div class="fld"><label for="m-n">Your name</label><input id="m-n" value="${S.user?S.user.name:''}"></div><div class="fld"><label for="m-m">Message</label><textarea id="m-m">Hi, I'm interested in this property. Is it still available?</textarea></div><button class="btn solid" data-act="sendenq">Send message</button>`);break}
   case 'sendenq':if(!$('#m-n').value.trim()){toast('Add your name','x');break}closeModal();toast('Message sent to Riya Sharma');break;
   case 'visit':{const p=byId(a.dataset.id);openModal(`<h3>Schedule a visit</h3><p style="color:var(--muted)">${p.title}, ${p.loc}</p><div class="row2"><div class="fld"><label for="v-d">Date</label><input id="v-d" type="date" min="2026-10-27" value="2026-10-31"></div><div class="fld"><label for="v-t">Time</label><select id="v-t"><option>10:00 AM</option><option>12:00 PM</option><option>4:00 PM</option><option>6:00 PM</option></select></div></div><button class="btn solid" data-act="confvisit">Confirm visit</button>`);break}
   case 'confvisit':closeModal();toast(`Visit booked for ${fd($('#v-d')?$('#v-d').value:'2026-10-31')}`,'cal');break;
   case 'topay':{const d=S.draft;updDur();d.name=$('#b-n').value;d.phone=$('#b-p').value;d.notes=$('#b-s').value;d.step=2;render(true);break}
   case 'backbk':S.draft.step=1;render(true);break;
   case 'pay':{
     const d=S.draft;
     if(d.pay==='upi'&&!/^[\w.\-]{2,}@[\w]{2,}$/.test($('#p-u').value.trim())){toast('Enter a valid UPI ID','x');break}
     if(d.pay==='card'&&$('#p-c').value.replace(/\s/g,'').length<15){toast('Enter a valid card number','x');break}
     a.innerHTML='<i class="spin"></i> Processing…';a.disabled=true;
     setTimeout(()=>{const p=byId(d.id),t=totals(p,d);d.bid='HN-'+(20600+Math.floor(Math.random()*300));
       S.bookings.unshift({id:d.bid,pid:p.id,tab:'up',status:'Confirmed',ci:d.ci,co:d.co,paid:t.tot});save();d.step=3;render(true);setTimeout(confetti,500)},1700);break}
   case 'vd':{const b=bk(),p=byId(b.pid);openModal(`<h3>${p.title}</h3><div class="kv"><span>Booking ID</span><b>${b.id}</b><span>Status</span><b>${b.status}</b><span>Location</span><b>${p.loc}</b><span>Check-in</span><b>${fd(b.ci)}</b><span>Check-out</span><b>${fd(b.co)}</b><span>Monthly rent</span><b>${inr(p.price)}</b><span>Amount paid</span><b>${b.paid?inr(b.paid):'Refunded in full'}</b></div><button class="btn ghost" data-go="details" data-id="${p.id}" data-act-x onclick="closeModal()">Open listing</button>`);break}
   case 'agr':agrModal(bk());break;
   case 'copyagr':{const b=bk(),p=byId(b.pid);copyText(`Rental agreement ${b.id}\nTenant: ${S.user.name}\nProperty: ${p.title}, ${p.loc}\nTerm: ${fd(b.ci)} to ${fd(b.co)}\nRent: ${inr(p.price)}/month\nDeposit: ${inr(p.price*10)}`);break}
   case 'cxq':{const b=bk(),p=byId(b.pid);openModal(`<h3>Cancel this booking?</h3><p style="color:var(--muted)">${p.short}, ${p.loc}. The security deposit is refunded within 7 days.</p><div style="display:flex;gap:12px;flex-wrap:wrap"><button class="btn danger" data-act="cxgo" data-b="${b.id}">Yes, cancel booking</button><button class="btn ghost" data-act="close">Keep booking</button></div>`);break}
   case 'cxgo':{const b=bk();b.tab='cx';b.status='Cancelled';b.paid=0;save();closeModal();toast('Booking cancelled','x');render(false);break}
   case 'eye':{const i=$('#a-pw');i.type=i.type==='password'?'text':'password';break}
   case 'forgot':toast('Reset link sent if the account exists','mail');break;
   case 'social':signIn({name:a.dataset.n+' User',id:a.dataset.n.toLowerCase()+'@demo'},false);break;
   case 'logout':S.user=null;lsSet('user',null);toast('Logged out','out');go('home');break;
   case 'saveprefs':toast('Preferences saved');break;
  }
});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    closeModal();
    const side=$('.side'),menu=$('.dash-menu');
    if(side&&menu){side.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open dashboard menu');menu.innerHTML=ic('menu')}
  }
  if((e.key==='Enter')&&e.target.matches('.pcard,.cat'))e.target.click()
});
$('#modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal()});
document.addEventListener('change',e=>{
  const t=e.target;
  if(t.id==='b-ci'){if(t.value){$('#b-co').value=addM(t.value,12);updDur()}}
  if(t.id==='b-co')updDur();
  if(S.route.name==='properties'){if(t.id==='f-t')S.filt.type=t.value;if(t.id==='f-p')S.filt.tier=t.value;if(t.id==='f-b')S.filt.beds=t.value;if(['f-t','f-p','f-b'].includes(t.id))drawGrid()}
});
document.addEventListener('input',e=>{if(e.target.id==='f-q'){S.filt.q=e.target.value;drawGrid()}});
/* card tilt */
document.addEventListener('pointermove',e=>{
  if(e.pointerType!=='mouse'||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  const c=e.target.closest('.tilt');
  $$('.tilt.hot').forEach(x=>{if(x!==c){x.classList.remove('hot');x.style.transform=''}});
  if(!c||!c.classList.contains('done')&&c.classList.contains('rv'))return;
  const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  c.classList.add('hot');c.style.transform=`perspective(900px) rotateX(${-y*6}deg) rotateY(${x*7}deg) translateY(-6px)`;
});
document.addEventListener('mouseout',e=>{if(!e.relatedTarget)$$('.tilt.hot').forEach(x=>{x.classList.remove('hot');x.style.transform=''})});
addEventListener('scroll',()=>{
  const n=$('#nav');if(n)n.classList.toggle('scrolled',scrollY>8);
  const h=document.documentElement,sp=$('#sp');sp.style.width=(scrollY/Math.max(1,h.scrollHeight-innerHeight)*100)+'%';
  const bg=$('#hbg');if(bg&&scrollY<900)bg.style.transform=`translateY(${scrollY*.22}px)`;
},{passive:true});
addEventListener('resize',()=>{slide($('#links'));slide($('#dt'));slide($('#dtabs'));pill()});

/* ---------- boot with loader ---------- */
(function boot(){
  $('#ldlogo').src=IMG.logo;
  if(S.user&&S.route.name==='home'){/* stay on public home; dashboard only via navigation */}
  const bar=$('#ldbar'),pct=$('#ldpct'),t0=performance.now(),D=2400;
  (function f(t){const k=Math.min(1,(t-t0)/D),e=k<.8?k/.8*.7:.7+(k-.8)/.2*.3;bar.style.width=(e*100)+'%';pct.textContent=Math.round(e*100)+'%';
    if(k<1)requestAnimationFrame(f);else{
      render(false);
      const L=$('#loader');L.classList.add('out');setTimeout(()=>L.remove(),1000);
    }})(t0);
})();
