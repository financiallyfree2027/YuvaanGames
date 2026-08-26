/* =====================================================================
   SHARED ENGINE for Yuvaan's two English practice games.
   Both games are the same shape:  24 levels · 6 words each · a level map
   with stars · localStorage save · no fail state · everything spoken.
   The only thing that differs is how one question is drawn and marked,
   which each game supplies as a small object.
   ===================================================================== */
"use strict";
const $=id=>document.getElementById(id);
const shuffle=a=>a.slice().sort(()=>Math.random()-0.5);
const pick=a=>a[Math.floor(Math.random()*a.length)];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

/* ---------------- voice ---------------- */
let BV=null, VOICE_READY=false;
function loadV(){
  if(!window.speechSynthesis) return;
  const v=speechSynthesis.getVoices().filter(x=>/^en/i.test(x.lang));
  if(!v.length) return;
  const sc=x=>(/premium|enhanced|neural|natural/i.test(x.name)?10:0)
    +(/google (uk|us) english/i.test(x.name)?5:0)
    +(/ava|zoe|samantha|allison|karen|moira/i.test(x.name)?4:0)
    -(/albert|bad news|bells|boing|bubbles|jester|organ|superstar|trinoids|whisper|wobble|zarvox|fred|ralph|junior/i.test(x.name)?20:0);
  BV=v.slice().sort((a,b)=>sc(b)-sc(a))[0]; VOICE_READY=true;
}
if(window.speechSynthesis){ speechSynthesis.onvoiceschanged=loadV; loadV(); }
function say(text,rate){
  if(!window.speechSynthesis) return;
  try{
    const u=new SpeechSynthesisUtterance(text);
    u.rate=rate||0.85; u.pitch=1.05;
    if(BV){u.voice=BV;u.lang=BV.lang;}
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  }catch(e){}
}
/* the word sounded out the way it is taught: letters, then blended */
function sound(word){ say(word.split('').join(', ')+' ... '+word, 0.7); }

/* ---------------- little noises ---------------- */
const AU={ctx:null,muted:false};
function audioOn(){
  try{ if(!AU.ctx){const C=window.AudioContext||window.webkitAudioContext; if(C) AU.ctx=new C();}
       else AU.ctx.resume&&AU.ctx.resume(); }catch(e){}
}
function beep(f,type,dur,vol){
  if(!AU.ctx||AU.muted) return;
  try{
    const t=AU.ctx.currentTime,o=AU.ctx.createOscillator(),g=AU.ctx.createGain();
    o.type=type||'sine'; o.frequency.setValueAtTime(f,t);
    g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(vol||0.12,t+0.01);
    g.gain.exponentialRampToValueAtTime(0.0001,t+(dur||0.18));
    o.connect(g); g.connect(AU.ctx.destination); o.start(t); o.stop(t+(dur||0.18)+0.02);
  }catch(e){}
}
const sYes  =()=>[660,880,1180].forEach((f,i)=>setTimeout(()=>beep(f,'square',0.13,0.09),i*80));
const sNo   =()=>{beep(260,'sine',0.16,0.08); setTimeout(()=>beep(205,'sine',0.2,0.07),110);};
const sTap  =()=>beep(560,'square',0.06,0.06);
const sStar =()=>[880,1180,1560].forEach((f,i)=>setTimeout(()=>beep(f,'sine',0.16,0.09),i*90));
const sWin  =()=>[523,659,784,1047,1319,1568].forEach((f,i)=>setTimeout(()=>beep(f,'square',0.19,0.1),i*105));
const sLock =()=>{beep(200,'square',0.12,0.07); setTimeout(()=>beep(150,'square',0.16,0.06),100);};

/* =====================================================================
   LEVEL LADDER — 24 levels.
   Each game supplies its own PLAN describing what changes as they climb.
   ===================================================================== */
const WORDS_PER_LEVEL=6;
const NLV=24;

/* =====================================================================
   SAVE
   ===================================================================== */
let SAVE_KEY='lkg_generic';
let save={unlocked:1,stars:new Array(NLV).fill(0),best:new Array(NLV).fill(0),played:0};
function loadSave(){
  try{
    const raw=localStorage.getItem(SAVE_KEY); if(!raw) return;
    const d=JSON.parse(raw); if(!d||typeof d!=='object') return;
    save.unlocked=clamp((d.unlocked|0)||1,1,NLV);
    if(Array.isArray(d.stars)) save.stars=d.stars.slice(0,NLV).map(x=>clamp(x|0,0,3));
    if(Array.isArray(d.best))  save.best =d.best.slice(0,NLV).map(x=>Math.max(0,x|0));
    while(save.stars.length<NLV) save.stars.push(0);
    while(save.best.length<NLV)  save.best.push(0);
    save.played=Math.max(0,d.played|0);
  }catch(e){}
}
function persist(){ try{ localStorage.setItem(SAVE_KEY,JSON.stringify(save)); }catch(e){} }

/* =====================================================================
   EFFECTS
   ===================================================================== */
function popAt(el,txt){
  if(!el||!el.getBoundingClientRect) return;
  const r=el.getBoundingClientRect();
  const d=document.createElement('div'); d.className='pop'; d.textContent=txt;
  d.style.left=(r.left+r.width/2-26)+'px'; d.style.top=r.top+'px';
  $('fx').appendChild(d); setTimeout(()=>d.remove(),1200);
}
function confetti(n){
  const box=$('fx'), cols=['#E85D4A','#3D8DDB','#FFC93C','#2FAE7C','#FF8AC5','#7B47C9'];
  for(let i=0;i<n;i++){
    const c=document.createElement('div'); c.className='conf';
    c.style.left=(Math.random()*100)+'vw'; c.style.background=cols[i%cols.length];
    c.style.animationDuration=(1.3+Math.random()*1.2)+'s';
    c.style.animationDelay=(Math.random()*0.5)+'s';
    box.appendChild(c); setTimeout(()=>c.remove(),3400);
  }
}
function wobble(el){ if(el&&el.animate) el.animate(
  [{transform:'translateX(0)'},{transform:'translateX(-10px)'},
   {transform:'translateX(10px)'},{transform:'translateX(0)'}],{duration:330}); }
function bounce(el){ if(el&&el.animate) el.animate(
  [{transform:'scale(1)'},{transform:'scale(1.24)'},{transform:'scale(1)'}],{duration:350}); }

/* =====================================================================
   BUILDING BLOCKS the games draw with
   ===================================================================== */
function picBox(name,size){
  const d=document.createElement('div');
  d.className='picBox';
  d.style.width=size+'px'; d.style.height=size+'px';
  d.innerHTML=PICS[name]||'';
  const s=d.querySelector('svg'); if(s){s.style.width='100%';s.style.height='100%';}
  return d;
}
function slotBox(ch,filled,dashed){
  const d=document.createElement('div');
  d.className='slot'+(filled?' filled':'')+(dashed?' hole':'');
  d.textContent=ch||'';
  return d;
}
/* The buttons wake up a moment after the picture appears.  Because the
   first tap now counts, he must not be able to slap the screen before he
   has even seen the word — the short warm-up makes him look first. */
let WARMUP=650;
function letterBtn(ch,big){
  const b=document.createElement('button');
  b.className='lbtn warm'+(big?' big':'');
  b.textContent=ch.toUpperCase();
  b.addEventListener('pointerdown',()=>sTap());
  setTimeout(()=>b.classList.remove('warm'),WARMUP);
  return b;
}
function row(gap,cls){
  const d=document.createElement('div');
  d.className='row '+(cls||''); d.style.gap=(gap||10)+'px';
  return d;
}

/* =====================================================================
   THE GAME LOOP
   ===================================================================== */
/* ---------------------------------------------------------------------
   THE ONE-TAP RULE.
   Yuvaan worked out that tapping A and then E always got him through —
   one of the two had to be right.  So he was practising "tap everything"
   instead of reading.
   Now the FIRST tap is his answer.  Get it right and the word is done.
   Get it wrong and nothing bad happens — no cross, no noise of failure —
   the word is simply read to him again and goes to the BACK OF THE QUEUE
   to be asked once more later.  A level is only finished when every word
   has been answered right first time, so tapping both can never clear it.
   --------------------------------------------------------------------- */
const S={level:1,i:0,list:[],queue:[],solved:0,total:0,
         misses:0,levelMisses:0,phase:'menu',answered:false};
let GAME=null;                 /* set by the game file */

function startLevel(n){
  S.level=n; S.i=0; S.levelMisses=0;
  S.list=GAME.buildLevel(n);
  S.queue=S.list.slice();      /* the words still to get right */
  S.total=S.list.length; S.solved=0; S.answered=false;
  S.phase='play';
  $('menu').classList.remove('on');
  $('map').classList.remove('on');
  $('play').classList.add('on');
  $('winScreen').classList.remove('on');
  audioOn();
  render();
}
function render(){
  hud();
  if(!S.queue.length){ levelDone(); return; }
  S.answered=false;
  /* On a retry the buttons take a little longer to wake up.  Reflex-tapping
     the other letter is then slower than actually looking and thinking,
     which is the habit we want. */
  const back=S.queue[0].again||0;
  WARMUP = back===0 ? 650 : Math.min(1600, 900+back*250);
  const body=$('qArea'); body.innerHTML='';
  GAME.render(S.queue[0], body, {correct,wrong});
}
function hud(){
  $('lvlTag').textContent='📗 '+S.level;
  $('progFill').style.width=Math.round(S.solved/Math.max(1,S.total)*100)+'%';
  let dots='';
  for(let k=0;k<S.total;k++) dots += k<S.solved?'●':'○';
  $('dots').textContent=dots;
  $('missTag').textContent='🔁 '+S.levelMisses;
}
/* once he has tapped, the rest of the buttons stop listening — the first
   tap is the answer, so a lucky second tap cannot rescue it */
function lockButtons(){
  document.querySelectorAll('#qArea button').forEach(b=>{
    b.disabled=true; b.style.pointerEvents='none';
  });
}
function correct(word,el){
  if(S.answered) return;
  S.answered=true; lockButtons();
  sYes(); if(el){bounce(el); popAt(el,pick(['⭐','🎉','✨','👏','🌟']));}
  confetti(9); say(word,0.86);
  S.queue.shift(); S.solved++;
  setTimeout(()=>render(),950);
}
function wrong(word,el){
  if(S.answered) return;
  S.answered=true; lockButtons();
  S.misses++; S.levelMisses++; sNo(); if(el) wobble(el);
  hud();
  /* THE WORD DOES NOT CHANGE.  He stays on this one until he gets it
     right — no skipping ahead, no moving on with a word unlearned.
     The buttons are locked, he hears the word again, and then the very
     same question comes back with the letters in a different order. */
  const q=S.queue[0];
  q.again=(q.again||0)+1;
  listenAgain(q);
}
/* No cross, no red, no "wrong".  Just a big ear, the picture, and the
   word read slowly — then on to the next word.  This one comes back. */
function listenAgain(q){
  const panel=document.createElement('div');
  panel.className='again';
  panel.innerHTML=`<div class="againEar">👂</div>`;
  const pb=picBox(q.pic,150); pb.style.margin='0 auto';
  panel.appendChild(pb);
  const wordEl=document.createElement('div');
  wordEl.className='againWord';
  wordEl.textContent=q.w.toUpperCase().split('').join(' ');
  panel.appendChild(wordEl);
  $('qArea').appendChild(panel);
  setTimeout(()=>sound(q.w),200);
  setTimeout(()=>say(q.w,0.6),1500);
  setTimeout(()=>render(),2600);
}
/* stars: 3 for a clean run, 2 for a few slips, 1 for finishing at all.
   The floor is 1 — he can never come away with nothing. */
function starsFor(miss,total){
  if(miss===0) return 3;
  if(miss<=Math.ceil(total/3)) return 2;
  return 1;
}
function levelDone(){
  S.phase='done';
  const st=starsFor(S.levelMisses,S.total);
  const idx=S.level-1;
  const prevStars=save.stars[idx], prevBest=save.best[idx];
  if(st>save.stars[idx]) save.stars[idx]=st;
  /* honest scorekeeping: the record only moves on a genuinely better run */
  if(prevBest===0||S.levelMisses<prevBest) save.best[idx]=S.levelMisses;
  if(S.level>=save.unlocked && S.level<NLV) save.unlocked=S.level+1;
  save.played++;
  persist();
  sWin(); confetti(60);
  $('play').classList.remove('on');
  $('winScreen').classList.add('on');
  $('winStars').textContent='⭐'.repeat(st)+'☆'.repeat(3-st);
  $('winWords').innerHTML=S.list.map(q=>
    `<span class="ww">${(q.w||'').toUpperCase()}</span>`).join('');
  $('winNote').textContent = S.levelMisses===0
    ? 'Every one first try!' : (S.levelMisses<prevBest||prevBest===0 ? 'Best yet: '+S.levelMisses+' 🔁'
                                                        : 'Your record: '+prevBest+' 🔁');
  $('nextBtn').textContent = S.level<NLV ? '▶️ '+(S.level+1) : '🗺️';
  say(st===3?'Perfect! Well done Yuvaan!':'Well done Yuvaan!',0.88);
}

/* =====================================================================
   LEVEL MAP
   ===================================================================== */
function buildMap(){
  const host=$('mapGrid'); host.innerHTML='';
  for(let n=1;n<=NLV;n++){
    const unlocked = n<=save.unlocked;
    const st=save.stars[n-1];
    const d=document.createElement('button');
    d.className='node'+(unlocked?(st>0?' done':' now'):' locked');
    const band=GAME.bandOf(n);
    d.innerHTML = unlocked
      ? `<div class="nStars">${'⭐'.repeat(st)}${'☆'.repeat(3-st)}</div>
         <div class="nNum">${n}</div>
         <div class="nBand">${band}</div>`
      : `<div class="nLock">🔒</div><div class="nNum">${n}</div>`;
    d.onclick=()=>{
      audioOn();
      if(!unlocked){ sLock(); wobble(d); return; }
      sTap(); startLevel(n);
    };
    host.appendChild(d);
  }
  const total=save.stars.reduce((a,b)=>a+b,0);
  $('mapTotal').textContent='⭐ '+total+' / '+(NLV*3);
}
function openMap(){
  S.phase='map';
  buildMap();
  $('menu').classList.remove('on');
  $('play').classList.remove('on');
  $('winScreen').classList.remove('on');
  $('map').classList.add('on');
}

/* =====================================================================
   WIRING
   ===================================================================== */
function bootEngine(game,key,title){
  GAME=game; SAVE_KEY=key; loadSave();
  $('gameTitle').innerHTML=title;
  $('startBtn').onclick=()=>{ audioOn(); startLevel(save.unlocked); };
  $('mapBtn').onclick=()=>{ audioOn(); openMap(); };
  $('backBtn').onclick=()=>openMap();
  $('mapBack').onclick=()=>{ $('map').classList.remove('on'); $('menu').classList.add('on'); };
  $('sayBtn').onclick=()=>{ const q=S.list[S.i]; if(q) sound(q.w); };
  $('nextBtn').onclick=()=>{
    audioOn();
    if(S.level<NLV) startLevel(S.level+1); else openMap();
  };
  $('againBtn').onclick=()=>{ audioOn(); startLevel(S.level); };
  $('winMapBtn').onclick=()=>openMap();
  /* first tap anywhere unlocks the voice on iPad */
  document.addEventListener('pointerdown',()=>{audioOn(); if(!VOICE_READY) loadV();},{once:true});
  const done=save.stars.filter(x=>x>0).length;
  $('startBtn').textContent = done? '▶️ '+save.unlocked : '▶️';
  $('menuStars').textContent='⭐ '+save.stars.reduce((a,b)=>a+b,0)+' / '+(NLV*3);
}
