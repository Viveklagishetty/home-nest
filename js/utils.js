/* Tiny DOM, number-format and localStorage helpers. */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const fmt=n=>Math.round(n).toLocaleString('en-IN'), inr=n=>'₹'+fmt(n);
const lsGet=(k,d)=>{try{const v=localStorage.getItem('hn_'+k);return v?JSON.parse(v):d}catch(e){return d}};
const lsSet=(k,v)=>{try{localStorage.setItem('hn_'+k,JSON.stringify(v))}catch(e){}};
