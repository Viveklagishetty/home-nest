/* Property listings, dates, and the app state object (S). */
/* ---------- data ---------- */
const AM={furn:['sofa','Furnished'],pool:['pool','Swimming Pool'],pow:['bolt','Power Backup'],gate:['gate','Gated Community'],sec:['lock','24/7 Security'],park:['car','Car Parking'],gard:['leaf','Private Garden'],wifi:['wifi','High Speed Internet'],gym:['dumb','Gym']};
const PR=[
 {id:1,title:'Luxury 3 BHK Villa',short:'3 BHK Villa',loc:'Whitefield, Bangalore',type:'Villa',mode:'rent',price:25000,beds:3,baths:3,sqft:2400,tier:2,img:'poolvilla',g:['poolvilla','living1','living2','kitchen'],am:['furn','pool','pow','gate','sec','park'],feat:['Spacious living & dining area','Modular kitchen','Private garden','High speed internet']},
 {id:2,title:'2 BHK Apartment',short:'2 BHK Apartment',loc:'Koramangala, Bangalore',type:'Apartment',mode:'rent',price:15000,beds:2,baths:2,sqft:1200,tier:1,img:'living2',g:['living2','kitchen','living1','gardenhouse'],am:['furn','pow','sec','park','wifi','gym'],feat:['Bright corner living room','Wood-finish modular kitchen','Covered car parking','Walk to Forum Mall']},
 {id:3,title:'5 BHK Heritage Villa',short:'5 BHK Villa',loc:'Indiranagar, Bangalore',type:'Villa',mode:'sale',price:25000000,label:'2.5 Cr',beds:5,baths:5,sqft:4000,tier:2,img:'heritage',g:['heritage','living1','kitchen','living2'],am:['pool','gard','sec','park','pow','gate'],feat:['Courtyard pool with waterfall','Colonial-style facade','Landscaped tropical garden','Staff quarters']},
 {id:4,title:'3 BHK Sky Apartment',short:'3 BHK Apartment',loc:'Bellandur, Bangalore',type:'Apartment',mode:'rent',price:45000,beds:3,baths:3,sqft:1850,tier:2,img:'kitchen',g:['kitchen','living2','living1','poolvilla'],am:['furn','gym','pow','sec','park','wifi'],feat:['Open kitchen with breakfast bench','Floor-to-ceiling balcony doors','Clubhouse and gym access','Two reserved parking slots']},
 {id:5,title:'4 BHK Garden Villa',short:'4 BHK Villa',loc:'Hebbal, Bangalore',type:'Villa',mode:'sale',price:32000000,label:'3.2 Cr',beds:4,baths:5,sqft:4000,tier:2,img:'gardenhouse',g:['gardenhouse','living2','kitchen','living1'],am:['gard','sec','park','pow','gate','wifi'],feat:['Wide lawn with dining deck','Glass-front family lounge','Corner plot, two entrances','Solar water heating']},
 {id:6,title:'1 BHK Studio Residence',short:'1 BHK Apartment',loc:'Indiranagar, Bangalore',type:'Apartment',mode:'rent',price:20000,beds:1,baths:1,sqft:750,tier:1,img:'living1',g:['living1','kitchen','living2','gardenhouse'],am:['furn','wifi','sec','pow'],feat:['Pooja nook and traditional swing','False ceiling with cove lights','Fully furnished','Metro 6 minutes away']},
 {id:7,title:'Cliffside Pool Villa',short:'4 BHK Villa',loc:'Sarjapur Road, Bangalore',type:'Villa',mode:'sale',price:48000000,label:'4.8 Cr',beds:4,baths:4,sqft:4800,tier:3,img:'cliff',g:['cliff','infinity','living1','kitchen'],am:['pool','gard','sec','park','pow','wifi'],feat:['Infinity pool with valley view','Three terraces','Smart-home lighting','Private garden suite']},
 {id:8,title:'Skyline Pool House',short:'4 BHK House',loc:'Sadashivanagar, Bangalore',type:'House',mode:'sale',price:39000000,label:'3.9 Cr',beds:4,baths:4,sqft:3800,tier:3,img:'infinity',g:['infinity','living2','kitchen','living1'],am:['pool','sec','park','pow','gate','gym'],feat:['Cantilevered timber roof','Pool deck with loungers','Double-height living hall','Home office']},
 {id:9,title:'Noir Modern House',short:'4 BHK House',loc:'Jayanagar, Bangalore',type:'House',mode:'rent',price:85000,beds:4,baths:4,sqft:3200,tier:3,img:'noir',g:['noir','living2','kitchen','living1'],am:['furn','gard','sec','park','pow','wifi'],feat:['Glass-balustrade balcony','Stone-clad feature walls','Landscape lighting','Driveway for three cars']},
 {id:10,title:'Courtyard Glass House',short:'4 BHK House',loc:'HSR Layout, Bangalore',type:'House',mode:'rent',price:60000,beds:4,baths:5,sqft:3600,tier:3,img:'night',g:['night','living1','kitchen','living2'],am:['furn','pow','sec','park','gate','wifi'],feat:['Glass staircase atrium','Reflecting water courtyard','Teak-beamed ceilings','Wine and media room']},
 {id:11,title:'Palm Retreat Villa',short:'5 BHK Villa',loc:'Devanahalli, Bangalore',type:'Villa',mode:'sale',price:55000000,label:'5.5 Cr',beds:5,baths:6,sqft:5200,tier:3,img:'palm',g:['palm','poolvilla','living1','kitchen'],am:['pool','gard','sec','park','pow','gate'],feat:['Thatched-roof pavilions','Lap pool with sundeck','Close to the airport','Hammock garden']},
 {id:12,title:'Open Corner Plot',short:'2,400 sqft Plot',loc:'Devanahalli, Bangalore',type:'Plot',mode:'sale',price:8500000,label:'85 L',beds:0,baths:0,sqft:2400,tier:1,img:'plot',g:['plot'],am:['gate','sec'],feat:['BDA-approved layout','East-facing corner','Clear title and khata','Paved internal roads']},
 {id:13,title:'Glass Business Suites',short:'Office Suite',loc:'Whitefield, Bangalore',type:'Commercial',mode:'rent',price:120000,beds:0,baths:2,sqft:3000,tier:3,img:'comm',g:['comm'],am:['pow','sec','park','wifi'],feat:['Plug-and-play floor plate','Dedicated server room','Reserved basement parking','Tech park access']}
];
const byId=id=>PR.find(p=>p.id==id);
const bm=p=>p.beds?`<span>${p.beds} Beds</span><span>${p.baths} Baths</span>`:(p.baths?`<span>${p.baths} Baths</span>`:'');
const priceStr=p=>p.mode==='sale'?`₹ ${p.label}`:`${inr(p.price)}<small> /month</small>`;
const initials=n=>(n||'U').split(/\s+/).map(w=>w[0]).slice(0,2).join('').toUpperCase();
const TODAY=new Date('2026-10-26T00:00:00');
const dISO=d=>d.toISOString().slice(0,10);
const addM=(iso,m)=>{const d=new Date(iso+'T00:00:00');d.setMonth(d.getMonth()+m);return dISO(new Date(d.getTime()-d.getTimezoneOffset()*60000))};
const fd=iso=>new Date(iso+'T00:00:00').toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
const months=(a,b)=>Math.max(1,Math.round((new Date(b)-new Date(a))/2629800000));

/* ---------- state ---------- */
const S={
 route:{name:'home'}, user:lsGet('user',null), favs:new Set(lsGet('favs',[1,3])),
 bookings:lsGet('bookings',null)||[
  {id:'HN-20418',pid:1,tab:'up',status:'Confirmed',ci:'2026-11-15',co:'2027-11-15',paid:280000},
  {id:'HN-20533',pid:2,tab:'up',status:'Confirmed',ci:'2026-12-01',co:'2027-11-30',paid:170000},
  {id:'HN-18102',pid:6,tab:'past',status:'Completed',ci:'2024-03-01',co:'2025-02-28',paid:225000},
  {id:'HN-17744',pid:4,tab:'past',status:'Completed',ci:'2023-06-10',co:'2024-05-09',paid:500000},
  {id:'HN-16001',pid:10,tab:'past',status:'Completed',ci:'2022-09-01',co:'2023-08-31',paid:665000},
  {id:'HN-19320',pid:9,tab:'cx',status:'Cancelled',ci:'2025-08-01',co:'2026-07-31',paid:0}],
 filt:{mode:'all',type:'any',tier:'any',beds:'any',q:''}, draft:null, tab:'up', after:null, navActive:'home', timers:[], thread:0,
 threads:[{n:'Riya Sharma',r:'Property Manager',c:'#FF6A4D',m:[['th','Hi! Your 3 BHK Villa in Whitefield is confirmed for 15 Nov. Anything you want us to prepare?']]},{n:'Home Nest Support',r:'Help desk',c:'#2F7BFF',m:[['th','Welcome to Home Nest. Ask us anything about bookings, payments or agreements.']]}],
 prefs:{email:true,sms:false,price:true,renew:true}
};
const save=()=>{lsSet('favs',[...S.favs]);lsSet('bookings',S.bookings)};
