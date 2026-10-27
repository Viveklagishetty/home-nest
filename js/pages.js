/* Every screen: home, properties, details, booking, login/signup and the dashboard pages. */
/* ---------- pages ---------- */
function pgHome(){
  const feats=[['home','Verified Listings','100% verified properties for your peace of mind','#DCE8FF','#2F7BFF'],['shield','Secure Transactions','Safe & hassle free buying and renting','#DDF6EC','#12B886'],['head','Expert Support','Dedicated support at every step','#E7E3FF','#6B5CF0'],['tag','Best Deals','Get the best prices and exclusive offers','#FFF0CC','#E09200']];
  const cats=[['Apartments','kitchen','Apartment',1250],['Villas','poolvilla','Villa',1250],['Houses','noir','House',1250],['Plots','plot','Plot',1250],['Commercial','comm','Commercial',1250]];
  const hs=['gardenhouse','cliff','palm','infinity'];
  const words=['Find','the','Perfect','Property','for','a','Better','Tomorrow'];
  return nav()+`
  <section class="hero"><div class="hero-bg" id="hbg">${hs.map((k,i)=>`<div class="sl ${i?'':'on'}"><img src="${IMG[k]}" alt=""></div>`).join('')}</div><i class="blob a"></i><i class="blob b"></i>
   <div class="wrap hero-in">
    <span class="kicker">Your dream home awaits</span>
    <h1 aria-label="Find the Perfect Property for a Better Tomorrow">${words.map((w,i)=>`<span class="w ${i>=2&&i<=3?'grad':''}" style="--w:${i}">${w}</span>`).join(' ')}</h1>
    <p class="lead">Explore thousands of properties for sale and rent. Whether you're buying, selling, or renting, we make it simple.</p>
    <div class="sbox rv">
     <div class="sf">${ic('pin')}<div style="min-width:0"><label for="s-q">Location</label><input id="s-q" placeholder="Enter city, area or landmark"></div></div>
     <div class="sf">${ic('home')}<div style="min-width:0;flex:1"><label for="s-t">Property Type</label><select id="s-t"><option value="any">Any Type</option>${['Apartment','Villa','House','Plot','Commercial'].map(t=>`<option>${t}</option>`).join('')}</select></div></div>
     <div class="sf">${ic('tag')}<div style="min-width:0;flex:1"><label for="s-p">Price Range</label><select id="s-p"><option value="any">Any Price</option><option value="1">Budget</option><option value="2">Mid-range</option><option value="3">Premium</option></select></div></div>
     <div class="sf">${ic('bed')}<div style="min-width:0;flex:1"><label for="s-b">Bedrooms</label><select id="s-b"><option value="any">Any</option><option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option></select></div></div>
     <button class="btn solid lg" data-act="search">${ic('search')}Search</button>
    </div>
    <div class="stats-r rv"><div><b data-count="1250" data-suf="+">0</b><span>Verified listings</span></div><div><b data-count="320" data-suf="+">0</b><span>Happy tenants this year</span></div><div><b data-count="18">0</b><span>Bangalore neighbourhoods</span></div></div>
   </div></section>
  <div class="wrap"><div class="trust">${feats.map(f=>`<div class="tr rv"><span class="ico" style="background:${f[3]};color:${f[4]}">${ic(f[0])}</span><div><b>${f[1]}</b><span>${f[2]}</span></div></div>`).join('')}</div>
  <section class="sec" style="padding-top:30px"><div class="sec-h rv"><div><h2>Featured Properties</h2><p>Hand-picked homes, updated daily.</p></div><a class="link-a" data-go="properties">View All ${ic('arr')}</a></div>
   <div class="grid">${[3,2,5,6].map((id,i)=>card(byId(id),i)).join('')}</div>
   <div class="promo"><div class="pr-main rv"><div class="tx"><small>NEW LAUNCH</small><h3>Luxury Homes for a Modern Lifestyle</h3><p>Premium villas & apartments in prime locations.</p><div><button class="btn solid" data-go="properties" data-mode="sale">Explore Now ${ic('arr','arr')}</button></div></div><div class="im"><img src="${IMG.living2}" alt="Modern living room"></div></div>
    <div class="help rv"><div class="pls"><i style="background:#FF6A4D">RS</i><i style="background:#2F7BFF">AK</i><i style="background:#12B886">MP</i></div><h3 style="color:var(--navy)">Need Help?</h3><b style="font-size:14px">Talk to our property expert</b><p style="color:var(--muted);font-size:13.5px">Get personalized recommendations and guidance.</p><div><button class="btn ghost" data-go="contact">Contact Us</button></div></div></div></section>
  <section class="sec" style="padding-top:20px"><div class="sec-h rv"><div><h2>Explore Properties by categories</h2><p>Find the right Properties for your needs</p></div></div>
   <div class="cats">${cats.map(c=>`<div class="cat rv" data-go="properties" data-type="${c[2]}" tabindex="0"><img src="${IMG[c[1]]}" alt="${c[0]}"><div><b>${c[0]}</b><span>${fmt(c[3])}+ Properties</span></div><span class="ar">${ic('arr')}</span></div>`).join('')}</div></section>
  <section class="sec" id="about"><div class="about"><div class="im rv"><img src="${IMG.heritage}" alt="Heritage villa with pool"><span class="chip">${ic('shield')} Every listing physically verified</span></div>
   <div class="rv"><span class="kicker" style="color:var(--blue)">About Home Nest</span><h2>A calmer way to find a place to live.</h2><p>Home Nest brings rentals and purchases of villas, apartments and plots into one place. Each listing is visited by our team, priced transparently and backed by a written agreement you can read before you pay.</p>
   <div class="nums"><div><b data-count="1250" data-suf="+">0</b><span>Properties</span></div><div><b data-count="98" data-suf="%">0</b><span>Move-in on time</span></div><div><b data-count="24">0</b><span>Hour reply time</span></div></div></div></div></section>
  <section class="sec" id="services" style="padding-top:10px"><div class="sec-h rv"><div><h2>Services</h2><p>Everything from the first visit to the day you move in.</p></div></div>
   <div class="srv">${[['key','Rent a Home','Furnished and unfurnished homes with digital agreements.'],['home','Buy a Property','Guided site visits, legal checks and loan help.'],['tag','List Your Property','Reach verified tenants and buyers in days.'],['tool','Property Management','Upkeep, rent collection and tenant care.']].map(s=>`<div class="sv rv"><span class="ico">${ic(s[0])}</span><h3>${s[1]}</h3><p>${s[2]}</p></div>`).join('')}</div></section>
  <section class="sec" id="contact" style="padding-top:10px"><div class="contact rv"><div><h2>Talk to a property expert</h2><p style="margin-top:10px;color:rgba(255,255,255,.82)">Tell us what you are looking for and we will reply within a day.</p><div class="rows"><div>${ic('phone')}+91 98765 43210</div><div>${ic('mail')}hello@homenest.example</div><div>${ic('pin')}Whitefield, Bangalore 560066</div></div></div>
   <form id="cform" novalidate><div class="row2"><div class="fld"><label for="c-n">Your name</label><input id="c-n" autocomplete="name"></div><div class="fld"><label for="c-e">Email</label><input id="c-e" type="email" autocomplete="email"></div></div><div class="fld"><label for="c-m">How can we help?</label><textarea id="c-m" rows="3"></textarea></div><button class="btn blue lg" type="submit">Send message ${ic('arr','arr')}</button></form></div></section></div>`+footer();
}

function pgProps(){
  const f=S.filt;
  return nav()+`<div class="wrap"><div class="ph-h rv"><h1>Properties in Bangalore</h1><p>Browse homes for rent and sale. Save the ones you like.</p></div>
  <div class="fbar rv" id="fbar">${['all:All','rent:For Rent','sale:For Sale'].map(x=>{const[k,t]=x.split(':');return `<button class="chip ${f.mode===k?'on':''}" data-mode="${k}">${t}</button>`}).join('')}
   <select id="f-t" aria-label="Type"><option value="any">Any type</option>${['Apartment','Villa','House','Plot','Commercial'].map(t=>`<option ${f.type===t?'selected':''}>${t}</option>`).join('')}</select>
   <select id="f-p" aria-label="Price"><option value="any">Any price</option>${[['1','Budget'],['2','Mid-range'],['3','Premium']].map(([v,t])=>`<option value="${v}" ${f.tier==v?'selected':''}>${t}</option>`).join('')}</select>
   <select id="f-b" aria-label="Bedrooms"><option value="any">Any beds</option>${[1,2,3,4].map(n=>`<option value="${n}" ${f.beds==n?'selected':''}>${n}+ beds</option>`).join('')}</select>
   <input id="f-q" placeholder="Search area or title" value="${f.q}" aria-label="Search"></div>
  <div id="count" style="color:var(--muted);margin-bottom:16px"></div><div class="grid" id="pg"></div></div>`+footer();
}
function drawGrid(){
  const f=S.filt,q=f.q.trim().toLowerCase();
  const L=PR.filter(p=>(f.mode==='all'||p.mode===f.mode)&&(f.type==='any'||p.type===f.type)&&(f.tier==='any'||p.tier==f.tier)&&(f.beds==='any'||p.beds>=+f.beds)&&(!q||(p.loc+p.title+p.type).toLowerCase().includes(q)));
  $('#count').textContent=`${L.length} propert${L.length===1?'y':'ies'} found`;
  $('#pg').innerHTML=L.length?L.map((p,i)=>card(p,i,'cardin')).join(''):`<div class="empty" style="grid-column:1/-1">${ic('search')}<h3>No homes match these filters</h3><button class="btn ghost" data-act="clear">Clear filters</button></div>`;
}

function pgDetails(){
  const p=byId(S.route.id)||PR[0],g=p.g,amN=p.am.slice(0,6);
  const ph=g.length>1?`<div class="thumbs">${g.map((k,i)=>`<button data-th="${k}" class="${i?'':'on'}" aria-label="Photo ${i+1}"><img src="${IMG[k]}" alt="">${i===g.length-1?'<span class="more">+12</span>':''}</button>`).join('')}</div>`:'';
  const m=p.beds?`<span>${ic('bed')}${p.beds} Beds</span><span>${ic('bath')}${p.baths} Baths</span>`:'';
  return nav()+`<div class="wrap"><div class="det">
   <div class="gal rv"><div class="main" id="gmain"><img src="${IMG[g[0]]}" alt="${p.title}"></div>${ph}</div>
   <div class="info"><div class="t rv"><h1>${p.title}</h1><span class="pill-t ${p.mode}">${p.mode==='rent'?'For Rent':'For Sale'}</span></div>
    <div class="loc rv">${ic('pin')}${p.loc}</div>
    <div class="meta rv">${m}<span>${ic('area')}${fmt(p.sqft)} sqft</span></div>
    <div class="bigp rv">${p.mode==='sale'?'₹ '+p.label:inr(p.price)+' <small>/month</small>'}</div>
    <div class="cta rv">${p.mode==='rent'?`<button class="btn solid lg" data-act="book" data-id="${p.id}">Book Now</button>`:`<button class="btn solid lg" data-act="enquire" data-id="${p.id}">Enquire Now</button>`}<button class="btn ghost lg" data-act="visit" data-id="${p.id}">Schedule a Visit</button><button class="btn ghost lg favb ${S.favs.has(p.id)?'on':''}" style="flex:none;min-width:0;width:52px;padding:0" data-fav="${p.id}" aria-label="Save">${ic('heart')}</button></div>
    <div class="ams rv">${amN.map(k=>`<div class="am">${ic(AM[k][0])}${AM[k][1]}</div>`).join('')}</div></div></div>
   <div class="tabs rv" id="dtabs">${['Overview','Location','Amenities','Reviews'].map((t,i)=>`<button class="${i?'':'on'}" data-tab="${t}">${t}</button>`).join('')}<i class="ind"></i></div>
   <div id="tpane"></div></div>`+footer();
}
function pane(name,p){
  const map=`<div class="box"><div class="map"><h4>${p.loc}</h4><svg class="mp" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice"><rect width="400" height="250" fill="#EFE4D2"/><path d="M290 0c20 60 30 120 80 250H330C290 160 270 90 250 0z" fill="#A9CFEF"/><path d="M280 120c40-20 90-10 120 10v90H300z" fill="#B7DB9C"/><g fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"><path d="M0 60 400 120"/><path d="M0 170 400 90"/><path d="M110 0 160 250"/><path d="M220 0 190 250"/></g><g fill="none" stroke="#fff" stroke-width="3"><path d="M0 120 230 230"/><path d="M40 0 90 250"/></g></svg><span class="pin">${ic('pin').replace('class="i "','class="i " style="width:22px;height:22px;fill:currentColor;stroke:#fff"')}</span></div></div>`;
  const agent=`<div class="box agent"><span class="av">RS</span><div><small>Listed by</small><h3>Riya Sharma</h3><small>Property Manager</small></div><button class="btn ghost" data-act="contact" data-id="${p.id}">Contact</button></div>`;
  if(name==='Overview')return `<div class="tabpane two"><div><p style="max-width:62ch;color:#34456b">${p.type==='Plot'?'A clear-title residential plot in a gated layout with paved roads, drainage and street lighting. Ready for construction.':p.type==='Commercial'?'Modern office suites in a managed tech park with round-the-clock power and security.':`A ${p.beds} bedroom ${p.type.toLowerCase()} in ${p.loc.split(',')[0]}, built for everyday comfort. Natural light, generous rooms and quick access to schools, hospitals and daily shopping.`}</p><h3 style="margin:30px 0 8px;color:var(--navy)">Key Features</h3><div class="feat">${p.feat.map((f,i)=>`<div style="--k:${i}">${ic('check')}${f}</div>`).join('')}</div></div><div style="display:grid;gap:22px;align-content:start">${map}${agent}</div></div>`;
  if(name==='Location')return `<div class="tabpane two"><div>${map}</div><div class="box"><h3 style="color:var(--navy);margin-bottom:12px">Nearby</h3><div class="kv"><span>Metro station</span><b>1.8 km</b><span>International school</span><b>0.9 km</b><span>Hospital</span><b>2.4 km</b><span>Shopping mall</span><b>3.1 km</b><span>Tech park</span><b>4.0 km</b></div></div></div>`;
  if(name==='Amenities')return `<div class="tabpane"><div class="ams" style="grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:18px">${p.am.map(k=>`<div class="box am" style="padding:16px">${ic(AM[k][0])}${AM[k][1]}</div>`).join('')}</div></div>`;
  const rv=[['Ananya R.',5,'Spacious, bright and exactly as shown. Riya handled move-in perfectly.'],['Karthik M.',4,'Great neighbourhood and responsive owner. Parking is tight on weekends.'],['Sana P.',5,'Agreement was clear and the deposit process was transparent.']];
  return `<div class="tabpane two"><div class="rev">${rv.map(r=>`<div class="r"><div style="display:flex;justify-content:space-between;gap:10px"><b>${r[0]}</b><span class="stars">${Array(r[1]).fill(ic('star','f')).join('')}</span></div><p style="color:#34456b;margin-top:6px">${r[2]}</p></div>`).join('')}</div>${agent}</div>`;
}

function steps(n){
  const L=['Booking Details','Payment','Confirmation'];
  return `<div class="stepper rv">${L.map((t,i)=>`${i?`<div class="bar ${n>i?'full':''}"><i></i></div>`:''}<div class="step ${n===i+1?'on':''} ${n>i+1?'ok':''}"><i>${n>i+1?ic('check'):i+1}</i>${t}</div>`).join('')}</div>`;
}
function totals(p,d){const dep=p.price*10,fee=5000;return {rent:p.price,dep,fee,tot:p.price+dep+fee}}
function sumBox(p,d,btn){
  const t=totals(p,d);
  return `<aside class="sum rv"><h3>Total Amount</h3><div class="ln"><span>Monthly Rent</span><span>${inr(t.rent)}</span></div><div class="ln"><span>Security Deposit</span><span>${inr(t.dep)}</span></div><div class="ln"><span>Service Fee</span><span>${inr(t.fee)}</span></div><div class="ln tot"><span>Total Payable</span><span id="tot">${inr(t.tot)}</span></div>${btn}</aside>`;
}
function pgBooking(){
  const p=byId(S.route.id)||PR[0];
  if(!S.draft||S.draft.id!==p.id){const ci='2026-11-15';S.draft={id:p.id,ci,co:addM(ci,12),name:'',phone:'',notes:'',pay:'upi',step:1}}
  const d=S.draft;
  if(d.step===3){
    const t=totals(p,d);
    return nav()+`<div class="wrap">${steps(3)}<div class="done-w"><svg class="chkc" viewBox="0 0 120 120"><circle cx="60" cy="60" r="54"/><path d="M36 62l16 16 33-36"/></svg><h2 style="font-size:36px;color:var(--navy)">Booking confirmed</h2><p style="color:var(--muted);max-width:46ch">Your ${p.short} in ${p.loc.split(',')[0]} is reserved. We sent the rental agreement to your dashboard.</p>
     <div class="recp"><div class="ln"><span>Booking ID</span><b>${d.bid}</b></div><div class="ln"><span>Check-in</span><b>${fd(d.ci)}</b></div><div class="ln"><span>Check-out</span><b>${fd(d.co)}</b></div><div class="ln"><span>Paid</span><b>${inr(t.tot)}</b></div></div>
     <div class="cta" style="justify-content:center"><button class="btn solid lg" data-go="d:bookings">View My Bookings</button><button class="btn ghost lg" data-go="home">Back to Home</button></div></div></div>`+footer();
  }
  const top=`<div class="pc rv"><img src="${IMG[p.img]}" alt="${p.title}"><div style="display:grid;gap:8px;align-content:center"><h3 style="font-size:24px;color:var(--navy)">${p.short}</h3><div class="ploc">${ic('pin')}${p.loc}</div><div class="meta">${bm(p)}<span>${fmt(p.sqft)} sqft</span></div><b style="font-family:var(--f-display);font-size:22px;color:var(--blue)">${inr(p.price)}<small style="font-size:13px;color:var(--muted);font-family:var(--f-body)">/month</small></b></div></div>`;
  if(d.step===1){
    const left=`<div class="col"><div><h2 class="rv">Book Your Property</h2>${top}</div>
     <div class="rv"><h2>Select Booking Dates</h2><div class="row2"><div class="fld"><label for="b-ci">Check in Date</label><input id="b-ci" type="date" min="2026-10-27" value="${d.ci}"></div><div class="fld"><label for="b-co">Checkout Date</label><input id="b-co" type="date" value="${d.co}"></div></div><p id="dur" style="margin-top:10px;color:var(--muted);font-weight:600"></p></div>
     <div class="rv"><h3 style="margin-bottom:12px;color:var(--navy)">Add Guest Details (Optional)</h3><div class="row2"><div class="fld"><label for="b-n">Full Name</label><input id="b-n" placeholder="Enter Name" value="${d.name}" autocomplete="name"></div><div class="fld"><label for="b-p">Phone Number</label><input id="b-p" placeholder="Enter phone number" value="${d.phone}" inputmode="tel" autocomplete="tel"></div></div></div>
     <div class="rv"><h2>Special Requests</h2><div class="fld"><label for="b-s" class="sr" style="position:absolute;left:-9999px">Special requests</label><textarea id="b-s" rows="5" placeholder="Early move-in, parking, pets…">${d.notes}</textarea></div></div></div>`;
    const right=`<div style="display:grid;gap:22px"><aside class="sum rv" style="position:static"><h3 style="font-size:20px">Property Summary</h3><div class="ln"><span>Property Type</span><span>${p.type}</span></div><div class="ln"><span>Location</span><span>${p.loc}</span></div><div class="ln"><span>Available From</span><span>15 Nov 2026</span></div><div class="ln"><span>Lease Duration</span><span id="sd">12 Months</span></div><div class="ln"><span>Security Deposit</span><span>${inr(p.price*10)}</span></div></aside>${sumBox(p,d,`<button class="btn solid lg block" data-act="topay">Proceed to Payment ${ic('arr','arr')}</button>`)}</div>`;
    return nav()+`<div class="wrap">${steps(1)}<div class="bk">${left}${right}</div></div>`+footer();
  }
  const tabs=[['upi','UPI'],['card','Card'],['net','Net Banking']];
  const body=d.pay==='upi'?`<div class="fld"><label for="p-u">UPI ID</label><input id="p-u" value="demo@upi" autocomplete="off"><span class="em" id="p-e"></span></div>`:d.pay==='card'?`<div class="fld"><label for="p-c">Card number</label><input id="p-c" value="4111 1111 1111 1111" inputmode="numeric"></div><div class="row2"><div class="fld"><label for="p-x">Expiry</label><input id="p-x" value="12/28"></div><div class="fld"><label for="p-v">CVV</label><input id="p-v" value="123" inputmode="numeric"></div></div>`:`<div class="fld"><label for="p-b">Choose bank</label><select id="p-b">${['HDFC Bank','ICICI Bank','State Bank of India','Axis Bank','Kotak Mahindra'].map(b=>`<option>${b}</option>`).join('')}</select></div>`;
  const left=`<div class="col"><div><h2 class="rv">Payment</h2>${top}</div><div class="rv"><h3 style="margin-bottom:12px;color:var(--navy)">Pay with</h3><div class="pm" id="pm">${tabs.map(([k,t])=>`<button data-pay="${k}" class="${d.pay===k?'on':''}">${t}</button>`).join('')}</div><div style="margin-top:18px;display:grid;gap:12px;max-width:440px">${body}</div><p class="demo" style="margin-top:16px">Demo checkout. No real payment is taken.</p></div></div>`;
  return nav()+`<div class="wrap">${steps(2)}<div class="bk">${left}${sumBox(p,d,`<button class="btn solid lg block" id="paybtn" data-act="pay">Pay ${inr(totals(p,d).tot)}</button><button class="btn ghost block" data-act="backbk">Back</button>`)}</div></div>`+footer();
}

function authPage(mode){
  const L=mode==='login';
  const slides=['noir','night'];
  const form=L?`<h1>Welcome Back !</h1><p class="sub">Sign in to your account to continue exploring amazing properties.</p>
   <form id="aform" novalidate style="display:grid;gap:16px"><div class="fld"><label for="a-id">Email or Mobile Number</label><input id="a-id" placeholder="Enter your email or mobile number" autocomplete="username"><span class="em"></span></div>
   <div class="fld"><label for="a-pw">Password</label><div class="pw"><input id="a-pw" type="password" placeholder="Enter your password" autocomplete="current-password"><button type="button" data-act="eye" aria-label="Show password">${ic('eye')}</button></div><span class="em"></span></div>
   <div class="sp-b"><label class="chk"><input type="checkbox" id="a-rm"> Remember me</label><a class="lnk" data-act="forgot">Forgot password?</a></div>
   <button class="btn solid lg block" type="submit">Login</button></form>`
  :`<h1>Create your account</h1><p class="sub">Join Home Nest to save homes, book and manage your stays.</p>
   <form id="aform" novalidate style="display:grid;gap:14px"><div class="fld"><label for="a-nm">Full name</label><input id="a-nm" placeholder="Enter your full name" autocomplete="name"><span class="em"></span></div>
   <div class="fld"><label for="a-id">Email or Mobile Number</label><input id="a-id" placeholder="Enter your email or mobile number" autocomplete="username"><span class="em"></span></div>
   <div class="row2"><div class="fld"><label for="a-pw">Password</label><div class="pw"><input id="a-pw" type="password" placeholder="Create password" autocomplete="new-password"><button type="button" data-act="eye" aria-label="Show password">${ic('eye')}</button></div><span class="em"></span></div><div class="fld"><label for="a-p2">Confirm</label><input id="a-p2" type="password" placeholder="Repeat password" autocomplete="new-password"><span class="em"></span></div></div>
   <label class="chk"><input type="checkbox" id="a-tc"> I agree to the Terms & Privacy Policy</label>
   <button class="btn solid lg block" type="submit">Sign Up</button></form>`;
  const soc=`<div class="divider">Or continue with</div><div class="soc"><button data-act="social" data-n="Google"><svg viewBox="0 0 24 24"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.3-.2-1.9H12v3.7h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.300 3-7.300z"/><path fill="#34A853" d="M12 22c2.700 0 5-.9 6.600-2.400l-3.200-2.500c-.9.600-2 1-3.400 1-2.600 0-4.800-1.800-5.600-4.100H3.100v2.600A10 10 0 0 0 12 22z"/><path fill="#FBBC05" d="M6.400 14c-.2-.6-.3-1.300-.3-2s.1-1.400.3-2V7.400H3.100a10 10 0 0 0 0 9.200z"/><path fill="#EA4335" d="M12 5.900c1.500 0 2.800.5 3.800 1.500l2.800-2.800A10 10 0 0 0 3.100 7.400L6.400 10c.8-2.300 3-4.100 5.600-4.100z"/></svg>Google</button><button data-act="social" data-n="Facebook"><svg viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#1877F2"/><path fill="#fff" d="M16.500 15.500 17 12.500h-2.800v-2c0-.9.400-1.600 1.700-1.600H17V6.300s-1.100-.2-2.200-.2c-2.300 0-3.700 1.400-3.700 3.800v2.600H8.600v3h2.500V22h3.100v-6.500z"/></svg>Facebook</button><button data-act="social" data-n="Apple" aria-label="Apple"><svg viewBox="0 0 24 24"><path fill="#111" d="M16.400 12.600c0-2.200 1.800-3.300 1.900-3.400-1-1.500-2.600-1.700-3.200-1.700-1.400-.1-2.700.8-3.400.8s-1.800-.8-2.900-.8c-1.500 0-2.900.9-3.700 2.200-1.600 2.700-.4 6.800 1.100 9 .8 1.100 1.700 2.300 2.800 2.200 1.100 0 1.500-.7 2.900-.7s1.700.7 2.900.7c1.200 0 2-1.100 2.700-2.200.9-1.300 1.200-2.500 1.200-2.600-.1 0-2.300-.9-2.300-3.500zM14.200 6.100c.6-.8 1.100-1.800.9-2.900-.9 0-2 .6-2.700 1.400-.6.700-1.100 1.800-1 2.800 1 .1 2-.5 2.800-1.300z"/></svg>Apple</button></div>`;
  const alt=L?`<p>Don't have an account? <a class="lnk" data-go="signup">Sign Up</a></p>`:`<p>Already have an account? <a class="lnk" data-go="login">Login</a></p>`;
  return `<div class="auth"><div class="auth-form"><div><div class="rv">${form}</div><div class="rv">${soc}</div><div class="rv">${alt}</div><p class="demo rv">Demo mode: any email or number and a password of 4+ characters will sign you in.</p></div></div>
   <div class="auth-img">${slides.map((k,i)=>`<div class="sl ${i?'':'on'}"><img src="${IMG[k]}" alt=""></div>`).join('')}
   <div class="auth-tx"><h2 class="rv">${L?'Your Dream Home Is Just a Login Away':'Your Next Address Starts With One Sign Up'}</h2><div class="gl rv"><b>${L?'Discover the best properties':'Join 320+ happy tenants'}</b><p>${L?'Exclusive deals and a simple way to find your perfect space.':'Save favourites, book in minutes and keep every agreement in one place.'}</p></div></div></div></div>`;
}

/* dashboard */
const DN=[['d:dash','Dashboard','home'],['d:bookings','My Bookings','cal'],['d:favorites','Favorites','heart'],['d:profile','Profile','user'],['d:messages','Messages','chat'],['d:settings','Settings','gear']];
const DT={'d:dash':['Dashboard',()=>`Welcome back, ${S.user.name.split(' ')[0]}`],'d:bookings':['My Bookings',()=>'Track and manage your property bookings'],'d:favorites':['Favorites',()=>`${S.favs.size} saved homes`],'d:profile':['Profile',()=>'Keep your details up to date'],'d:messages':['Messages',()=>'Chat with property managers and support'],'d:settings':['Settings',()=>'Notifications and preferences']};
function dashShell(inner){
  const r=S.route.name,[t,s]=DT[r];
  return `<div class="dash"><aside class="side"><a class="brand" data-go="home" aria-label="Home Nest home">${LOGO(true)}<span class="tl"><b>Home Nest</b><small>Find Your Perfect Space</small></span></a>
   <nav class="snav" aria-label="Dashboard"><i class="pill"></i>${DN.map(([k,n,i])=>`<a data-go="${k}" class="${r===k?'on':''}">${ic(i)}${n}</a>`).join('')}</nav>
   <div class="sfoot"><a data-go="properties">${ic('search')}<span>Browse properties</span></a><button data-act="logout">${ic('out')}<span>Log out</span></button></div></aside>
   <main class="dmain"><div class="dhead rv"><div><h1>${t}</h1><p>${s()}</p></div><div class="r"><button class="iconbtn" data-go="d:favorites" aria-label="Favorites">${ic('heart')}${S.favs.size?`<b class="badge">${S.favs.size}</b>`:''}</button><button class="avatar" data-go="d:profile" aria-label="Profile" style="width:52px;height:52px">${initials(S.user.name)}</button></div></div>${inner}</main></div>`;
}
function bkCard(b,i){
  const p=byId(b.pid),st={Confirmed:'ok',Completed:'past',Cancelled:'cx'}[b.status];
  const acts=b.tab==='up'?`<button class="btn ghost" data-act="vd" data-b="${b.id}">View Details</button><button class="btn ghost" data-act="agr" data-b="${b.id}">${ic('dl')}Download Agreement</button><button class="btn danger" data-act="cxq" data-b="${b.id}">Cancel</button>`:b.tab==='past'?`<button class="btn ghost" data-act="vd" data-b="${b.id}">View Details</button><button class="btn ghost" data-act="agr" data-b="${b.id}">${ic('dl')}Download Agreement</button><button class="btn solid" data-act="again" data-id="${p.id}">Book Again</button>`:`<button class="btn ghost" data-act="vd" data-b="${b.id}">View Details</button><button class="btn solid" data-act="again" data-id="${p.id}">Rebook</button>`;
  return `<article class="bkc rv"><div class="im"><img src="${IMG[p.img]}" alt="${p.title}"></div><div class="bd"><h3>${p.short}</h3><div class="ploc">${ic('pin')}${p.loc}</div><div class="meta">${bm(p)}<span>${fmt(p.sqft)} sqft</span></div><div class="dates"><span>Check-in ${fd(b.ci)}</span><span>Check-out ${fd(b.co)}</span></div><div class="acts">${acts}</div></div><div class="rt"><span class="st ${st}">${b.status}</span><span class="pr">${inr(p.price)}/month</span></div></article>`;
}
function pgDash(){
  const up=S.bookings.filter(b=>b.tab==='up'),paid=S.bookings.reduce((a,b)=>a+b.paid,0),nb=up.slice().sort((a,b)=>a.ci.localeCompare(b.ci))[0];
  const st=[['Upcoming stays',up.length,'cal','#2F7BFF'],['Saved homes',S.favs.size,'heart','#FF6A4D'],['Unread messages',2,'chat','#12B886'],['Total paid (₹)',paid,'tag','#E09200']];
  let nx='';
  if(nb){const p=byId(nb.pid),days=Math.max(0,Math.ceil((new Date(nb.ci+'T00:00:00')-TODAY)/864e5));nx=`<section class="next rv"><img src="${IMG[p.img]}" alt=""><div class="in"><div><span class="kicker">Next move-in</span><h3 style="margin-top:8px">${p.title}</h3><p style="opacity:.85">${p.loc} · ${fd(nb.ci)}</p></div><div class="cd"><div><b data-count="${days}">0</b><span>Days</span></div><div><b>${nb.id.slice(-5)}</b><span>Booking</span></div></div></div></section>`}
  return dashShell(`<div class="stat-g">${st.map(s=>`<div class="stat rv"><span class="ico" style="background:${s[3]}">${ic(s[2])}</span><b data-count="${s[1]}">0</b><span>${s[0]}</span></div>`).join('')}</div>${nx}<div class="sec-h rv"><h2 style="font-size:28px;color:var(--navy)">Recommended for you</h2><a class="link-a" data-go="properties">Browse all ${ic('arr')}</a></div><div class="grid">${[7,4,9].map((id,i)=>card(byId(id),i)).join('')}</div>`);
}
function pgBookings(){
  const c=t=>S.bookings.filter(b=>b.tab===t).length,L=S.bookings.filter(b=>b.tab===S.tab);
  return dashShell(`<div class="dtabs rv" id="dt"><button data-dtab="up" class="${S.tab==='up'?'on':''}">Upcoming (${c('up')})</button><button data-dtab="past" class="${S.tab==='past'?'on':''}">Past Bookings (${c('past')})</button><button data-dtab="cx" class="${S.tab==='cx'?'on':''}">Cancelled (${c('cx')})</button><i class="ind"></i></div><div id="bl">${L.length?L.map(bkCard).join(''):`<div class="empty">${ic('cal')}<h3>Nothing here yet</h3><button class="btn solid" data-go="properties">Find a home</button></div>`}</div>`);
}
function pgFavs(){
  const L=PR.filter(p=>S.favs.has(p.id));
  return dashShell(L.length?`<div class="grid">${L.map((p,i)=>card(p,i)).join('')}</div>`:`<div class="empty">${ic('heart')}<h3>No saved homes yet</h3><p>Tap the heart on any listing to keep it here.</p><button class="btn solid" data-go="properties">Browse properties</button></div>`);
}
function pgFavsPublic(){
  const L=PR.filter(p=>S.favs.has(p.id));
  return nav()+`<div class="wrap"><div class="ph-h rv"><h1>Saved homes</h1><p>${L.length} saved</p></div><div class="grid" style="margin-top:22px">${L.map((p,i)=>card(p,i)).join('')||`<div class="empty" style="grid-column:1/-1"><h3>No saved homes yet</h3></div>`}</div></div>`+footer();
}
function pgProfile(){
  const u=S.user;
  return dashShell(`<div class="pro"><div class="pa rv"><span class="avatar big">${initials(u.name)}</span><h3 style="color:var(--navy)">${u.name}</h3><small style="color:var(--muted)">Member since Oct 2026</small></div>
   <form class="box rv" id="pform" style="display:grid;gap:16px"><div class="row2"><div class="fld"><label for="u-n">Full name</label><input id="u-n" value="${u.name}"></div><div class="fld"><label for="u-e">Email or mobile</label><input id="u-e" value="${u.id||''}"></div></div><div class="row2"><div class="fld"><label for="u-c">City</label><input id="u-c" value="${u.city||'Bangalore'}"></div><div class="fld"><label for="u-ph">Phone</label><input id="u-ph" value="${u.phone||''}" placeholder="Add phone number"></div></div><div><button class="btn solid" type="submit">Save changes</button></div></form></div>`);
}
function pgMsgs(){
  const T=S.threads,t=T[S.thread];
  return dashShell(`<div class="msgs rv"><div class="thr">${T.map((x,i)=>`<button data-thr="${i}" class="${i===S.thread?'on':''}"><span class="av" style="background:${x.c}">${initials(x.n)}</span><span><b>${x.n}</b><small>${x.m[x.m.length-1][1]}</small></span></button>`).join('')}</div>
   <div class="chat"><div class="cl" id="cl">${t.m.map(m=>`<div class="bub ${m[0]}">${m[1]}</div>`).join('')}</div><form class="cf2" id="cf"><input id="cm" placeholder="Type a message" aria-label="Message" autocomplete="off"><button class="btn solid" type="submit">${ic('arr')}Send</button></form></div></div>`);
}
function pgSettings(){
  const T=[['email','Email updates','Booking receipts and agreement copies'],['sms','SMS alerts','Move-in reminders and OTPs'],['price','Price drop alerts','When a saved home gets cheaper'],['renew','Renewal reminders','60 days before your lease ends']];
  return dashShell(`<div class="box rv" style="max-width:720px">${T.map(([k,t,s])=>`<div class="tg"><div><b>${t}</b><span>${s}</span></div><button class="sw ${S.prefs[k]?'on':''}" role="switch" aria-checked="${!!S.prefs[k]}" aria-label="${t}" data-sw="${k}"></button></div>`).join('')}<div style="padding-top:18px"><button class="btn solid" data-act="saveprefs">Save preferences</button></div></div>`);
}
