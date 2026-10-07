/* ===== EDIT YOUR DETAILS HERE ===== */
const C={
  n1:"Vikas", n2:"Divya",
  date:"2026-11-05T19:00:00+05:30",
  email:"vkmar7112@gmail.com",    // RSVP notifications are sent here
  message:"Two hearts, two families, one beautiful beginning. With the blessings of our elders and the love of our dear ones, we invite you to celebrate the happiest chapter of our lives.",
  couplePhoto:"images/couple.jpg",
  video:"",                       // e.g. "videos/couple.mp4" (leave empty to hide)
  videoPoster:"",
  photos:["images/couple.jpg","images/caricature.jpg","images/bride.jpg","images/events-card.jpg"],
  story:[
    {y:"How we met",t:"A chance hello",d:"A mutual friend's get-together, one long conversation, and a coffee that never really ended.",img:"images/caricature.jpg"},
    {y:"The journey",t:"Growing together",d:"Road trips, late-night calls and quiet moments that taught us home is a person.",img:""},
    {y:"The proposal",t:"One question, one yes",d:"A calm evening, a simple question, and the easiest yes of our lives.",img:""},
    {y:"5 Nov 2026",t:"Forever begins",d:"Surrounded by the people we love most.",img:"images/couple.jpg"}
  ],
  events:[
    {img:"images/mehendi.png",name:"Mehendi",date:"4 Nov 2026",time:"10:00 AM",dress:"Green, pastel & floral Indian wear"},
    {img:"images/sangeet.png",name:"Sangeet",date:"4 Nov 2026",time:"7:00 PM",dress:"Glamorous Indo-western, jewel tones"},
    {img:"images/haldi.png",name:"Haldi",date:"5 Nov 2026",time:"7:00 AM",dress:"Yellow & white, light cotton or linen"},
    {img:"images/wedding.png",name:"Wedding",date:"5 Nov 2026",time:"7:00 PM",dress:"Traditional Indian wear in ivory, gold & maroon"},
    {img:"images/reception.png",name:"Reception",date:"6 Nov 2026",time:"7:00 PM",dress:"Formal — gowns, sarees, suits or tuxedos"}
  ],
  venue:{name:"JW Marriott Mumbai Juhu",addr:"Juhu Tara Road, Juhu, Mumbai",
    parking:"Valet and ample parking are available at the hotel. Please follow the staff for guidance.",
    stay:"Rooms are available at JW Marriott Mumbai Juhu. Please mention the Vikas & Divya wedding while booking."},
  families:[
    {title:"Bride's family",a:"Mr. Ram Kisan",b:"Mrs. Radha Sharma",note:"Parents of Divya"},
    {title:"Groom's family",a:"Mr. Lokesh Kumar",b:"Mrs. Rita Yadav",note:"Parents of Vikas"}
  ],
  blessing:"Your love and blessings mean the world to us. Thank you for being part of our story and for making our wedding day truly unforgettable.",
  foods:["Vegetarian","Non-vegetarian","Jain","Vegan"],
  maxGuests:6
};
/* ================================== */
const $=s=>document.querySelector(s),D=new Date(C.date),V=C.venue;
const still=matchMedia('(prefers-reduced-motion:reduce)').matches;
const dateStr=D.toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Kolkata'});
const dayStr=D.toLocaleDateString('en-GB',{weekday:'long',timeZone:'Asia/Kolkata'});

/* Fill content */
document.title=C.n1+" & "+C.n2+" — Wedding Invitation";
$('#n1').textContent=C.n1;$('#n2').textContent=C.n2;$('#fNames').textContent=C.n1+" & "+C.n2;
$('#heroDate').textContent=dateStr;$('#fDate').textContent=dateStr;
$('#rvDate').textContent=dateStr;$('#rvDay').textContent=dayStr;
$('#msg').textContent=C.message;$('#bless').textContent=C.blessing;
$('#couple').innerHTML=`<img src="${C.couplePhoto}" alt="${C.n1} and ${C.n2}" style="object-position:top">`;
if(C.video)$('#vid').innerHTML=`<video class="rv" controls playsinline preload="metadata" ${C.videoPoster?`poster="${C.videoPoster}"`:""} src="${C.video}"></video>`;
$('#famList').innerHTML=C.families.map(f=>`<div class="rv"><h3>${f.title}</h3><em>${f.a}</em><em>${f.b}</em><p>${f.note}</p></div>`).join('<div class="amp rv">&amp;</div>');
$('#storyList').innerHTML=C.story.map(s=>`<div class="st rv"><b>${s.y}</b><h3>${s.t}</h3><p>${s.d}</p>${s.img?`<img src="${s.img}" alt="${s.t}" loading="lazy">`:""}</div>`).join("");
$('#eventList').innerHTML=C.events.map((e,i)=>`<article class="ev rv" style="--i:${i%2}"><img class="evimg" style="--i:${i}" src="${e.img}" alt="${e.name}"><h3 class="vh">${e.name}</h3>
<p><b>${e.date}</b> · ${e.time}</p><p>${V.name}, ${V.addr}</p><p>Dress code: ${e.dress}</p></article>`).join("");
const photos=C.photos;
$('#grid').innerHTML=photos.map((p,i)=>`<img src="${p}" alt="Gallery photo ${i+1}" data-i="${i}" loading="lazy">`).join("");
$('#vName').textContent=V.name;$('#vAddr').textContent=V.addr;$('#park').textContent=V.parking;$('#stay').textContent=V.stay;
$('#gCount').innerHTML=Array.from({length:C.maxGuests},(_,i)=>`<option>${i+1}</option>`).join("");
$('#gEvents').innerHTML=C.events.map(e=>`<label class="chk"><input type="checkbox" value="${e.name}" checked> ${e.name} <small style="color:var(--mute)">(${e.date})</small></label>`).join("");
$('#gFood').innerHTML=C.foods.map((f,i)=>`<label class="chk"><input type="radio" name="food" value="${f}" ${i?"":"checked"}> ${f}</label>`).join("");

/* ===== Flower / petal / lotus effects ===== */
const fx=$('#fx'),fc=fx.getContext('2d');let FW,FH,P=[],A=[],looping=false;
function fr(){const d=Math.min(devicePixelRatio||1,2);FW=innerWidth;FH=innerHeight;fx.width=FW*d;fx.height=FH*d;fc.setTransform(d,0,0,d,0,0)}fr();addEventListener('resize',fr);
const PINK=['#f3c1c6','#f7d9d0','#e9a3ad','#fff1dc','#e6c978'],GREEN=['#7f9a7c','#5f7f5c','#9db38a'];
const pick=a=>a[Math.random()*a.length|0],rnd=(a,b)=>a+Math.random()*(b-a);
function dFlower(s,c){fc.fillStyle=c;for(let i=0;i<5;i++){fc.rotate(Math.PI*.4);fc.beginPath();fc.ellipse(0,-s*.55,s*.36,s*.55,0,0,7);fc.fill()}fc.fillStyle='#d4a94a';fc.beginPath();fc.arc(0,0,s*.2,0,7);fc.fill()}
function dPetal(s,c){fc.fillStyle=c;fc.beginPath();fc.ellipse(0,0,s*.6,s*.33,0,0,7);fc.fill()}
function dLeaf(s,c){fc.fillStyle=c;fc.beginPath();fc.moveTo(0,-s);fc.quadraticCurveTo(s*.75,0,0,s);fc.quadraticCurveTo(-s*.75,0,0,-s);fc.fill()}
function dLotus(s,c){
  for(let l=0;l<3;l++){const n=l?5:7,sp=l===0?2.2:l===1?1.6:1,sz=s*(l===0?1:l===1?.78:.52);
    fc.fillStyle=l===2?'#fff1dc':l===1?c:'#f0b2bb';fc.strokeStyle='rgba(180,90,110,.35)';fc.lineWidth=.8;
    for(let i=0;i<n;i++){const a=(i/(n-1)-.5)*sp;fc.save();fc.rotate(a);fc.beginPath();fc.moveTo(0,0);fc.quadraticCurveTo(sz*.5,-sz*.45,0,-sz);fc.quadraticCurveTo(-sz*.5,-sz*.45,0,0);fc.fill();fc.stroke();fc.restore()}}
}
const DR={flower:dFlower,petal:dPetal,leaf:dLeaf,lotus:dLotus};
function mk(t,x,y,o){return Object.assign({t,x,y,vx:0,vy:0,g:.05,r:rnd(0,6.3),vr:rnd(-.08,.08),s:8,c:pick(PINK),l:80,m:80},o)}
function tap(x,y){if(still)return;for(let i=0;i<7;i++){const a=rnd(0,6.3),v=rnd(1.2,3.6),t=i%3?'petal':'flower',l=rnd(50,80);P.push(mk(t,x,y,{vx:Math.cos(a)*v,vy:Math.sin(a)*v-1,s:rnd(5,9),l,m:l}))}}
function bloom(x,y){
  if(still)return;
  for(let i=0;i<14;i++){const a=rnd(-2.6,-.5),v=rnd(4,10),l=rnd(130,190);P.push(mk('lotus',x,y,{vx:Math.cos(a)*v,vy:Math.sin(a)*v,g:.13,s:rnd(16,28),vr:rnd(-.02,.02),r:rnd(-.5,.5),c:pick(['#f3c1c6','#e9a3ad']),l,m:l}))}
  for(let i=0;i<46;i++){const a=rnd(0,6.3),v=rnd(2,9),l=rnd(100,170);P.push(mk(i%2?'flower':'petal',x,y,{vx:Math.cos(a)*v,vy:Math.sin(a)*v-3,g:.1,s:rnd(5,12),l,m:l}))}
  for(let i=0;i<34;i++){const a=rnd(0,6.3),v=rnd(2,8),l=rnd(110,180);P.push(mk('leaf',x,y,{vx:Math.cos(a)*v,vy:Math.sin(a)*v-3,g:.09,s:rnd(7,14),c:pick(GREEN),l,m:l}))}
}
function ambient(){for(let i=0;i<(innerWidth<500?14:26);i++)A.push(mk(i%4?'petal':'flower',rnd(0,FW),rnd(-FH,FH),{vy:rnd(.4,1),vx:rnd(-.3,.3),g:0,s:rnd(5,9),vr:rnd(-.03,.03),ph:rnd(0,6.3),amb:1}))}
function draw(){
  fc.clearRect(0,0,FW,FH);
  for(const p of A){p.y+=p.vy;p.ph+=.02;p.x+=Math.sin(p.ph)*.6+p.vx;p.r+=p.vr;if(p.y>FH+20){p.y=-20;p.x=rnd(0,FW)}
    fc.save();fc.translate(p.x,p.y);fc.rotate(p.r);fc.globalAlpha=.55;DR[p.t](p.s,p.c);fc.restore()}
  P=P.filter(p=>p.l-->0);
  for(const p of P){p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.vx*=.99;p.r+=p.vr;
    fc.save();fc.translate(p.x,p.y);fc.rotate(p.r);fc.globalAlpha=Math.min(1,p.l/35);DR[p.t](p.s,p.c);fc.restore()}
  fc.globalAlpha=1;requestAnimationFrame(draw);
}
function startFx(){if(still||looping)return;looping=true;ambient();draw()}
let lastMove=0;
document.addEventListener('pointerdown',e=>{if(opened&&e.target.id!=='sc')tap(e.clientX,e.clientY)});
document.addEventListener('pointermove',e=>{if(opened&&e.pointerType==='mouse'&&e.timeStamp-lastMove>70){lastMove=e.timeStamp;tap(e.clientX,e.clientY)}});

/* ===== Cover, music ===== */
const bgm=$('#bgm'),mute=$('#mute');let opened=false;
function openInv(){
  if(opened)return;opened=true;
  $('#cover').classList.add('open');$('#hero').classList.add('go');mute.hidden=false;startFx();
  setTimeout(()=>{$('#cover').style.display='none';document.body.classList.remove('lock');sizeHeart()},2300);
  try{const p=bgm.play();if(p&&p.catch)p.catch(()=>mute.classList.add('off'))}catch(e){mute.classList.add('off')}
}
$('#open').onclick=openInv;$('#seal').onclick=openInv;
mute.onclick=()=>{try{if(bgm.paused){bgm.play().catch(()=>{});mute.classList.remove('off')}else{bgm.pause();mute.classList.add('off')}}catch(e){}};
bgm.addEventListener('error',()=>{mute.hidden=true});

/* Scroll reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv,.masonry img').forEach(el=>io.observe(el));

/* Countdown */
function tick(){
  const s=Math.max(0,Math.floor((D-Date.now())/1000)),p=n=>String(n).padStart(2,0),set=(id,v)=>{const el=$(id);if(el.textContent!==v){el.textContent=v;if(id==='#s'){el.classList.remove('tick');void el.offsetWidth;el.classList.add('tick')}}};
  set('#d',String(Math.floor(s/86400)));set('#h',p(Math.floor(s%86400/3600)));set('#m',p(Math.floor(s%3600/60)));set('#s',p(s%60));
}
tick();setInterval(tick,1000);

/* Heart scratch card (gold + green). Finishing it unlocks the rest of the site */
const sc=$('#sc'),sx=sc.getContext('2d'),HP="M50 92C8 62 0 36 17 18C31 5 46 13 50 26C54 13 69 5 83 18C100 36 92 62 50 92Z";
let drawing=false,done=false,total=1,lx=0,ly=0,mv=0;
function sizeHeart(){
  const r=sc.parentElement.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);
  if(!r.width||done)return;
  sc.width=r.width*dpr;sc.height=r.height*dpr;sx.setTransform(dpr,0,0,dpr,0,0);sx.globalCompositeOperation='source-over';
  const w=r.width,path=new Path2D(HP);
  sx.save();sx.scale(w/100,w/100);
  const g=sx.createLinearGradient(0,0,100,100);
  g.addColorStop(0,'#d4b868');g.addColorStop(.3,'#9fae74');g.addColorStop(.55,'#5f8461');g.addColorStop(.8,'#b9b36f');g.addColorStop(1,'#7b9468');
  sx.fillStyle=g;sx.fill(path);sx.clip(path);sx.restore();
  for(let i=0;i<650;i++){sx.fillStyle='rgba(255,247,200,'+(Math.random()*.55)+')';sx.fillRect(Math.random()*w,Math.random()*w,1.5,1.5)}
  sx.fillStyle='rgba(30,50,25,.7)';sx.textAlign='center';sx.font='italic 600 19px Cormorant Garamond,serif';sx.fillText('Scratch here',w/2,w*.5);
  sx.font='26px serif';sx.fillText('\u2665',w/2,w*.5+32);
  total=Math.max(1,count());
}
function count(){const d=sx.getImageData(0,0,sc.width,sc.height).data;let n=0;for(let i=3;i<d.length;i+=48)if(d[i]>20)n++;return n}
function pt(e){const r=sc.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top]}
function scratch(e){
  if(!drawing||done)return;const[x,y]=pt(e);
  sx.globalCompositeOperation='destination-out';sx.lineWidth=46;sx.lineCap=sx.lineJoin='round';
  sx.beginPath();sx.moveTo(lx,ly);sx.lineTo(x,y);sx.stroke();lx=x;ly=y;
  if(++mv%10===0)check();
}
function check(){if(count()/total<.5)finish()}
function finish(){
  if(done)return;done=true;sc.classList.add('gone');$('#scHint').textContent="Welcome! Scroll down to continue";
  const r=sc.getBoundingClientRect();bloom(r.left+r.width/2,r.top+r.height/2);
  setTimeout(()=>{$('#rest').hidden=false;setTimeout(()=>$('#family').scrollIntoView({behavior:'smooth'}),150)},2400);
}
sc.addEventListener('pointerdown',e=>{drawing=true;sc.setPointerCapture(e.pointerId);[lx,ly]=pt(e);scratch(e)});
sc.addEventListener('pointermove',scratch);
['pointerup','pointercancel'].forEach(t=>sc.addEventListener(t,()=>{drawing=false;if(!done)check()}));
addEventListener('resize',()=>{if(!done&&opened)sizeHeart()});
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{if(opened)sizeHeart()});

/* Lightbox */
let cur=0,tx=0;const lb=$('#lb'),li=$('#lbImg');
function show(i){cur=(i+photos.length)%photos.length;li.src=photos[cur];li.alt="Gallery photo "+(cur+1)}
function openLb(i){show(i);lb.hidden=false;document.body.classList.add('lock')}
function closeLb(){lb.hidden=true;document.body.classList.remove('lock')}
$('#grid').addEventListener('click',e=>{if(e.target.dataset.i!==undefined)openLb(+e.target.dataset.i)});
$('#lbX').onclick=closeLb;$('#lbP').onclick=()=>show(cur-1);$('#lbN').onclick=()=>show(cur+1);
lb.addEventListener('click',e=>{if(e.target===lb)closeLb()});
lb.addEventListener('touchstart',e=>tx=e.touches[0].clientX,{passive:true});
lb.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>50)show(cur+(dx<0?1:-1))});
addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')closeLb();if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)});

/* RSVP -> email notification (via FormSubmit.co) */
$('#form').addEventListener('submit',async e=>{
  e.preventDefault();
  const name=$('#gName').value.trim(),ev=[...document.querySelectorAll('#gEvents input:checked')].map(i=>i.value);
  if(!name){$('#err').textContent="Please enter your name.";$('#gName').focus();return}
  if(!ev.length){$('#err').textContent="Please select at least one event.";return}
  $('#err').textContent="";const b=$('#sub');b.disabled=true;b.textContent="Sending...";
  const body={_subject:"New RSVP from "+name+" — "+C.n1+" & "+C.n2,_template:"table",_captcha:"false",
    Name:name,Guests:$('#gCount').value,Events:ev.join(", "),Food:document.querySelector('input[name=food]:checked').value,Message:$('#gMsg').value.trim()||"-"};
  try{
    const r=await fetch("https://formsubmit.co/ajax/"+C.email,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(body)});
    const j=await r.json();
    if(!r.ok||String(j.success)==="false")throw new Error(j.message||"failed");
    $('#form').hidden=true;$('#thanks').hidden=false;
    const q=$('#thanks').getBoundingClientRect();bloom(q.left+q.width/2,q.top);
  }catch(x){$('#err').textContent="Sorry, we couldn't send your RSVP. Please check your connection and try again.";b.disabled=false;b.textContent="Submit RSVP"}
});
