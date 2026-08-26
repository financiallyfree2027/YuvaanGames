/* =====================================================================
   THE EIGHT GAMES.
   Four for Q1 (choose a or e) and four for Q2 (spell the picture).
   Shared rules, taken from the rest of Yuvaan's games:
     - nothing can be lost.  A wrong tap wobbles and says the word again.
     - the word is always spoken, so a pre-reader is never guessing blind.
     - never-quit: the try counter goes UP and gets celebrated.
     - no sentences to read anywhere in the play area.
   ===================================================================== */
const $=id=>document.getElementById(id);
const shuffle=a=>a.slice().sort(()=>Math.random()-0.5);
const pick=a=>a[Math.floor(Math.random()*a.length)];

/* ---------------- voice ---------------- */
let BV=null;
function loadV(){
  if(!window.speechSynthesis) return;
  const v=speechSynthesis.getVoices().filter(x=>/^en/i.test(x.lang));
  if(!v.length) return;
  const sc=x=>(/premium|enhanced|neural|natural/i.test(x.name)?10:0)
    +(/google (uk|us) english/i.test(x.name)?5:0)
    +(/ava|zoe|samantha|allison/i.test(x.name)?4:0)
    -(/albert|bad|bells|boing|bubbles|jester|organ|superstar|trinoids|whisper|wobble|zarvox|fred|ralph/i.test(x.name)?20:0);
  BV=v.slice().sort((a,b)=>sc(b)-sc(a))[0];
}
if(window.speechSynthesis){ speechSynthesis.onvoiceschanged=loadV; loadV(); }
function say(text,rate){
  if(!window.speechSynthesis) return;
  try{
    const u=new SpeechSynthesisUtterance(text);
    u.rate=rate||0.82; u.pitch=1.05;
    if(BV){u.voice=BV;u.lang=BV.lang;}
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  }catch(e){}
}
/* sound out the letters, then the whole word — the way it is taught */
function sound(word){
  say(word.split('').join(', ')+' ... '+word, 0.72);
}

/* ---------------- little noises ---------------- */
const AU={ctx:null};
function beep(f,type,dur,vol){
  try{
    if(!AU.ctx){const C=window.AudioContext||window.webkitAudioContext; if(!C)return; AU.ctx=new C();}
    const t=AU.ctx.currentTime,o=AU.ctx.createOscillator(),g=AU.ctx.createGain();
    o.type=type||'sine'; o.frequency.setValueAtTime(f,t);
    g.gain.setValueAtTime(0.0001,t); g.gain.linearRampToValueAtTime(vol||0.13,t+0.01);
    g.gain.exponentialRampToValueAtTime(0.0001,t+(dur||0.18));
    o.connect(g); g.connect(AU.ctx.destination); o.start(t); o.stop(t+(dur||0.18)+0.02);
  }catch(e){}
}
const sYes =()=>{[660,880,1180].forEach((f,i)=>setTimeout(()=>beep(f,'square',0.13,0.1),i*80));};
const sNo  =()=>{beep(250,'sine',0.16,0.09); setTimeout(()=>beep(200,'sine',0.2,0.08),110);};
const sTap =()=>beep(560,'square',0.06,0.07);
const sWin =()=>{[523,659,784,1047,1319].forEach((f,i)=>setTimeout(()=>beep(f,'square',0.2,0.11),i*110));};

/* ---------------- effects ---------------- */
function popAt(el,txt){
  const r=el.getBoundingClientRect();
  const d=document.createElement('div'); d.className='pop'; d.textContent=txt;
  d.style.left=(r.left+r.width/2-24)+'px'; d.style.top=(r.top)+'px';
  $('gFx').appendChild(d); setTimeout(()=>d.remove(),1200);
}
function confetti(n){
  const box=$('gFx'), cols=['#E85D4A','#3D8DDB','#FFC93C','#2FAE7C','#FF8AC5','#7B47C9'];
  for(let i=0;i<n;i++){
    const c=document.createElement('div'); c.className='conf';
    c.style.left=(Math.random()*100)+'vw';
    c.style.background=cols[i%cols.length];
    c.style.animationDuration=(1.3+Math.random()*1.1)+'s';
    c.style.animationDelay=(Math.random()*0.5)+'s';
    box.appendChild(c); setTimeout(()=>c.remove(),3200);
  }
}
function wobble(el){
  el.animate([{transform:'translateX(0)'},{transform:'translateX(-9px)'},
    {transform:'translateX(9px)'},{transform:'translateX(0)'}],{duration:320});
}
function bounce(el){
  el.animate([{transform:'scale(1)'},{transform:'scale(1.22)'},{transform:'scale(1)'}],{duration:340});
}

/* ---------------- shared game frame ---------------- */
const G={def:null,i:0,right:0,tries:0,list:[],onTap:null};
function openGame(def){
  G.def=def; G.i=0; G.right=0; G.tries=0;
  G.list=def.build();
  $('game').classList.add('on');
  $('done').classList.remove('on');
  document.body.style.overflow='hidden';
  try{ if(!AU.ctx){const C=window.AudioContext||window.webkitAudioContext; if(C) AU.ctx=new C();} }catch(e){}
  step();
}
function closeGame(){
  $('game').classList.remove('on'); $('done').classList.remove('on');
  document.body.style.overflow='';
  if(window.speechSynthesis) speechSynthesis.cancel();
  $('gBody').innerHTML='';
}
function hud(){
  $('gProgFill').style.width=Math.round(G.i/G.list.length*100)+'%';
  let s=''; const earned=Math.min(3,Math.floor(G.right/Math.max(1,Math.ceil(G.list.length/3))));
  for(let k=0;k<3;k++) s+= k<earned?'⭐':'☆';
  $('gStars').textContent=s;
}
function step(){
  hud();
  if(G.i>=G.list.length){ finish(); return; }
  $('gBody').innerHTML='';
  G.def.render(G.list[G.i], $('gBody'));
}
function correct(word,el){
  G.right++; sYes(); if(el){ bounce(el); popAt(el,pick(['⭐','🎉','✨','👏'])); }
  confetti(10);
  say(word,0.85);
  setTimeout(()=>{ G.i++; step(); }, 950);
}
function wrong(word,el){
  G.tries++; sNo(); if(el) wobble(el);
  /* never a loss: it says the word again and lets him try once more */
  setTimeout(()=>sound(word),260);
}
function finish(){
  sWin(); confetti(60);
  $('gProgFill').style.width='100%';
  $('doneMsg').textContent='⭐ '.repeat(3).trim();
  $('doneSub').textContent = G.tries===0
    ? 'Every single one first try!'
    : 'Tries taken: '+G.tries+' — keep going!';
  $('done').classList.add('on');
  say('Well done Yuvaan!',0.85);
}
$('gBack').onclick=closeGame;
$('doneBtn').onclick=()=>{ $('done').classList.remove('on'); openGame(G.def); };
$('gSay').onclick=()=>{ const it=G.list[G.i]; if(it) sound(it.w); };

/* helper: build a picture tile */
function picBox(name,size){
  const d=document.createElement('div');
  d.style.cssText=`width:${size}px;height:${size}px;max-width:46vw;max-height:32vh;
    background:#fff;border:5px solid #241D15;border-radius:22px;padding:6px;
    display:flex;align-items:center;justify-content:center;box-shadow:0 6px 0 rgba(36,29,21,.18)`;
  d.innerHTML=PICS[name];
  const s=d.querySelector('svg'); if(s){ s.style.width='100%'; s.style.height='100%'; }
  return d;
}
function letterBtn(ch,big){
  const b=document.createElement('button');
  b.textContent=ch;
  b.style.cssText=`font:inherit;font-weight:bold;font-size:${big?54:38}px;
    width:${big?96:70}px;height:${big?96:70}px;border-radius:20px;border:5px solid #fff;
    background:#3D8DDB;color:#fff;cursor:pointer;box-shadow:0 6px 0 rgba(36,29,21,.25);
    display:flex;align-items:center;justify-content:center;flex:0 0 auto`;
  b.onpointerdown=()=>{ sTap(); b.style.transform='scale(.93)'; };
  b.onpointerup=b.onpointerleave=()=>{ b.style.transform=''; };
  return b;
}
function slotBox(ch,filled){
  const d=document.createElement('div');
  d.textContent=ch||'';
  d.style.cssText=`font-size:46px;font-weight:bold;width:66px;height:80px;border-radius:14px;
    display:flex;align-items:center;justify-content:center;flex:0 0 auto;
    background:${filled?'#FFC93C':'#fff'};border:5px solid #241D15;
    border-bottom-width:${filled?5:10}px`;
  return d;
}
function row(gap){
  const d=document.createElement('div');
  d.style.cssText=`display:flex;align-items:center;justify-content:center;gap:${gap||10}px;flex-wrap:wrap`;
  return d;
}

/* =====================================================================
   Q1 GAMES — choose a or e
   ===================================================================== */

/* A1: two big buttons under the picture */
const A1={
  id:'A1', name:'Tap the letter', tag:'Simplest — one picture, two buttons',
  desc:'The picture and the word with a hole in it. Two big buttons: <b>a</b> and <b>e</b>. '+
       'Tap one and the letter drops into the hole and the word is read out.',
  teach:'Best first game. Only two choices, so he is never lost — and 50/50 guessing '+
        'gets corrected immediately by hearing the real word.',
  build:()=>shuffle(Q1_WORDS),
  render(item,root){
    root.appendChild(picBox(item.pic,200));
    const wr=row(8);
    const chars=item.w.split('');
    const slots=chars.map((c,i)=>slotBox(i===item.miss?'':c.toUpperCase(), i!==item.miss));
    slots.forEach(s=>wr.appendChild(s));
    root.appendChild(wr);
    const br=row(22);
    shuffle(item.opts).forEach(o=>{
      const b=letterBtn(o.toUpperCase(),true);
      b.onclick=()=>{
        if(o===item.w[item.miss]){
          slots[item.miss].textContent=o.toUpperCase();
          slots[item.miss].style.background='#FFC93C';
          slots[item.miss].style.borderBottomWidth='5px';
          correct(item.w,b);
        } else wrong(item.w,b);
      };
      br.appendChild(b);
    });
    root.appendChild(br);
    setTimeout(()=>sound(item.w),300);
  }
};

/* A2: the letter has to be dragged into the hole */
const A2={
  id:'A2', name:'Drag the letter in', tag:'Same idea, but he must place it',
  desc:'The <b>a</b> and <b>e</b> tiles sit at the bottom. He drags the right one up into '+
       'the gap in the word. Wrong letter springs back.',
  teach:'Dragging makes him commit to a choice with his hand, not just a tap — it slows '+
        'him down and stops random tapping.',
  build:()=>shuffle(Q1_WORDS),
  render(item,root){
    root.appendChild(picBox(item.pic,168));
    const wr=row(8);
    const chars=item.w.split('');
    const slots=chars.map((c,i)=>slotBox(i===item.miss?'':c.toUpperCase(), i!==item.miss));
    slots[item.miss].style.borderStyle='dashed';
    slots.forEach(s=>wr.appendChild(s));
    root.appendChild(wr);
    const br=row(26);
    shuffle(item.opts).forEach(o=>{
      const b=letterBtn(o.toUpperCase(),true);
      b.draggable=true;
      b.style.cursor='grab';
      let drag=null;
      b.onpointerdown=e=>{
        sTap();
        drag=b.cloneNode(true);
        drag.style.position='fixed'; drag.style.zIndex='130'; drag.style.pointerEvents='none';
        drag.style.opacity='.92';
        document.body.appendChild(drag);
        const move=ev=>{ drag.style.left=(ev.clientX-48)+'px'; drag.style.top=(ev.clientY-48)+'px'; };
        move(e);
        const up=ev=>{
          window.removeEventListener('pointermove',move);
          window.removeEventListener('pointerup',up);
          const r=slots[item.miss].getBoundingClientRect();
          const inSlot=ev.clientX>r.left-40&&ev.clientX<r.right+40&&
                       ev.clientY>r.top-40&&ev.clientY<r.bottom+40;
          drag.remove(); drag=null;
          if(inSlot && o===item.w[item.miss]){
            slots[item.miss].textContent=o.toUpperCase();
            slots[item.miss].style.background='#FFC93C';
            slots[item.miss].style.borderStyle='solid';
            slots[item.miss].style.borderBottomWidth='5px';
            correct(item.w,slots[item.miss]);
          } else if(inSlot){ wrong(item.w,slots[item.miss]); }
        };
        window.addEventListener('pointermove',move);
        window.addEventListener('pointerup',up);
      };
      br.appendChild(b);
    });
    root.appendChild(br);
    setTimeout(()=>sound(item.w),300);
  }
};

/* A3: sort every picture into the A basket or the E basket */
const A3={
  id:'A3', name:'A basket, E basket', tag:'Sorting — sees the pattern across words',
  desc:'One picture at a time in the middle, and two baskets: <b>A</b> and <b>E</b>. '+
       'He drops the picture into the basket for the sound in the middle of that word.',
  teach:'This is the one that builds the actual skill — hearing the vowel SOUND rather '+
        'than memorising each word. The two baskets fill up so he sees the sets forming.',
  build:()=>shuffle(Q1_WORDS),
  render(item,root){
    const v=item.w[item.miss];
    const wrap=row(18);
    const mk=(letter,col)=>{
      const b=document.createElement('div');
      b.style.cssText=`width:118px;height:132px;border-radius:20px;border:6px solid #241D15;
        background:${col};display:flex;flex-direction:column;align-items:center;
        justify-content:center;font-size:52px;font-weight:bold;color:#fff;cursor:pointer;
        box-shadow:0 6px 0 rgba(36,29,21,.22)`;
      b.textContent=letter.toUpperCase();
      const cnt=document.createElement('div');
      cnt.style.cssText='font-size:16px;color:#fff;opacity:.85';
      cnt.textContent=(A3.count&&A3.count[letter]?A3.count[letter]:0)+' ✓';
      b.appendChild(cnt);
      b.onclick=()=>{
        if(letter===v){
          A3.count=A3.count||{a:0,e:0}; A3.count[letter]++;
          correct(item.w,b);
        } else wrong(item.w,b);
      };
      return b;
    };
    wrap.appendChild(mk('a','#E85D4A'));
    const mid=document.createElement('div');
    mid.style.cssText='display:flex;flex-direction:column;align-items:center;gap:8px';
    mid.appendChild(picBox(item.pic,148));
    const lab=document.createElement('div');
    lab.style.cssText='font-size:34px;font-weight:bold;letter-spacing:5px';
    lab.textContent=item.w.split('').map((c,i)=>i===item.miss?'_':c.toUpperCase()).join('');
    mid.appendChild(lab);
    wrap.appendChild(mid);
    wrap.appendChild(mk('e','#12A99A'));
    root.appendChild(wrap);
    setTimeout(()=>sound(item.w),300);
  }
};
A3.count={a:0,e:0};

/* A4: listen first, picture only revealed after he chooses */
const A4={
  id:'A4', name:'Listen then choose', tag:'Ears first — the picture comes after',
  desc:'The word is spoken with no picture showing. He picks <b>a</b> or <b>e</b> from the '+
       'sound alone, and only then does the picture appear to confirm it.',
  teach:'Hardest of the four and the best test of whether he really hears the difference '+
        'between "pad" and "ped". Save it for when the others are easy.',
  build:()=>shuffle(Q1_WORDS),
  render(item,root){
    const q=document.createElement('div');
    q.style.cssText=`width:190px;height:190px;max-width:46vw;background:#7B47C9;color:#fff;
      border:6px solid #fff;border-radius:26px;display:flex;align-items:center;
      justify-content:center;font-size:76px;cursor:pointer;box-shadow:0 7px 0 rgba(36,29,21,.25)`;
    q.textContent='🔊';
    q.onclick=()=>sound(item.w);
    root.appendChild(q);
    const wr=row(8);
    const slots=item.w.split('').map((c,i)=>slotBox(i===item.miss?'':c.toUpperCase(), i!==item.miss));
    slots.forEach(s=>wr.appendChild(s));
    root.appendChild(wr);
    const br=row(22);
    shuffle(item.opts).forEach(o=>{
      const b=letterBtn(o.toUpperCase(),true);
      b.onclick=()=>{
        if(o===item.w[item.miss]){
          slots[item.miss].textContent=o.toUpperCase();
          slots[item.miss].style.background='#FFC93C';
          q.innerHTML=PICS[item.pic];
          q.style.background='#fff'; q.style.padding='8px';
          const s=q.querySelector('svg'); if(s){s.style.width='100%';s.style.height='100%';}
          correct(item.w,b);
        } else wrong(item.w,b);
      };
      br.appendChild(b);
    });
    root.appendChild(br);
    setTimeout(()=>sound(item.w),450);
  }
};

/* =====================================================================
   Q2 GAMES — look at the picture, build the word
   ===================================================================== */

/* B1: tap the letters in order */
const B1={
  id:'B1', name:'Tap the letters in order', tag:'Build the word left to right',
  desc:'Picture at the top, three empty boxes under it, and jumbled letters below. '+
       'He taps them in the right order. A wrong letter just wobbles and stays put.',
  teach:'Closest thing to actually writing the word, without needing a pencil or a '+
        'keyboard. Order matters, so he has to sound the word out as he goes.',
  build:()=>shuffle(Q2_WORDS),
  render(item,root){
    root.appendChild(picBox(item.pic,180));
    const chars=item.w.split('');
    const wr=row(8);
    const slots=chars.map(()=>slotBox('',false));
    slots.forEach(s=>wr.appendChild(s));
    root.appendChild(wr);
    let at=0;
    const pool=row(12);
    const extra=['s','t','m','n','p','b'].filter(c=>!chars.includes(c));
    const letters=shuffle(chars.concat(shuffle(extra).slice(0,2)));
    letters.forEach(ch=>{
      const b=letterBtn(ch.toUpperCase());
      b.onclick=()=>{
        if(ch===chars[at]){
          slots[at].textContent=ch.toUpperCase();
          slots[at].style.background='#FFC93C'; slots[at].style.borderBottomWidth='5px';
          bounce(slots[at]); sTap(); at++;
          b.style.visibility='hidden';
          if(at>=chars.length) correct(item.w,wr);
        } else wrong(item.w,b);
      };
      pool.appendChild(b);
    });
    root.appendChild(pool);
    setTimeout(()=>sound(item.w),300);
  }
};

/* B2: pick the whole word out of three */
const B2={
  id:'B2', name:'Which word is it?', tag:'Reading, not spelling',
  desc:'The picture, and three whole words to choose from — the right one and two that '+
       'look close, like <b>cat</b> / <b>cap</b> / <b>cup</b>.',
  teach:'Trains him to read the WHOLE word and notice the last letter, which is exactly '+
        'where cat/cap confusion lives. Easier than spelling, good for a tired evening.',
  build:()=>shuffle(Q2_WORDS),
  render(item,root){
    root.appendChild(picBox(item.pic,180));
    const all=Q2_WORDS.map(x=>x.w).concat(['cup','bad','hat','pin','job','ten']);
    const near=all.filter(x=>x!==item.w &&
      (x[0]===item.w[0]||x[2]===item.w[2]||x[1]===item.w[1]));
    const opts=shuffle([item.w].concat(shuffle(near).slice(0,2)));
    const wr=row(14);
    opts.forEach(o=>{
      const b=document.createElement('button');
      b.textContent=o.toUpperCase();
      b.style.cssText=`font:inherit;font-weight:bold;font-size:34px;letter-spacing:3px;
        padding:16px 24px;border-radius:18px;border:5px solid #fff;background:#12A99A;
        color:#fff;cursor:pointer;box-shadow:0 6px 0 rgba(36,29,21,.25)`;
      b.onclick=()=>{ if(o===item.w) correct(item.w,b); else wrong(item.w,b); };
      wr.appendChild(b);
    });
    root.appendChild(wr);
    setTimeout(()=>sound(item.w),300);
  }
};

/* B3: only the middle letter is missing */
const B3={
  id:'B3', name:'Fill the missing letter', tag:'Bridges Q1 and Q2',
  desc:'The word is already there except one letter, which changes position each time — '+
       'sometimes the first, sometimes the middle, sometimes the last.',
  teach:'A gentler step than spelling the whole word, but harder than a/e because now '+
        'ANY letter can be missing. Good middle rung between the two exercises.',
  build:()=>shuffle(Q2_WORDS).map(x=>({...x,miss:Math.floor(Math.random()*3)})),
  render(item,root){
    root.appendChild(picBox(item.pic,180));
    const chars=item.w.split('');
    const wr=row(8);
    const slots=chars.map((c,i)=>slotBox(i===item.miss?'':c.toUpperCase(), i!==item.miss));
    slots[item.miss].style.borderStyle='dashed';
    slots.forEach(s=>wr.appendChild(s));
    root.appendChild(wr);
    const right=chars[item.miss];
    const others=shuffle('abcdefhjmnprstv'.split('').filter(c=>c!==right)).slice(0,3);
    const pool=row(12);
    shuffle(others.concat([right])).forEach(ch=>{
      const b=letterBtn(ch.toUpperCase());
      b.onclick=()=>{
        if(ch===right){
          slots[item.miss].textContent=ch.toUpperCase();
          slots[item.miss].style.background='#FFC93C';
          slots[item.miss].style.borderStyle='solid';
          slots[item.miss].style.borderBottomWidth='5px';
          correct(item.w,b);
        } else wrong(item.w,b);
      };
      pool.appendChild(b);
    });
    root.appendChild(pool);
    setTimeout(()=>sound(item.w),300);
  }
};

/* B4: match four pictures to four words */
const B4={
  id:'B4', name:'Match the pairs', tag:'Four pictures, four words',
  desc:'Four pictures on one side and four words jumbled on the other. He taps a picture, '+
       'then the word that goes with it. Matched pairs light up green and stay.',
  teach:'The only game here that holds several words in his head at once. Also the most '+
        'game-like, so it is the one he will ask to play again.',
  build(){
    const src=shuffle(Q2_WORDS);
    const rounds=[];
    for(let i=0;i<src.length;i+=4){
      const group=src.slice(i,i+4);
      if(group.length===4) rounds.push({w:group.map(g=>g.w).join(' '),group});
    }
    return rounds;
  },
  render(item,root){
    const board=document.createElement('div');
    board.style.cssText='display:flex;gap:16px;align-items:flex-start;justify-content:center;flex-wrap:wrap';
    const left=document.createElement('div');
    left.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:10px';
    const right=document.createElement('div');
    right.style.cssText='display:flex;flex-direction:column;gap:10px';
    let selPic=null, matched=0;
    item.group.forEach(g=>{
      const p=picBox(g.pic,104); p.style.cursor='pointer'; p.dataset.w=g.w;
      p.onclick=()=>{
        if(p.dataset.done) return;
        sTap(); say(g.w,0.85);
        if(selPic) selPic.style.outline='';
        selPic=p; p.style.outline='6px solid #FFC93C';
      };
      left.appendChild(p);
    });
    shuffle(item.group).forEach(g=>{
      const b=document.createElement('button');
      b.textContent=g.w.toUpperCase();
      b.style.cssText=`font:inherit;font-weight:bold;font-size:26px;letter-spacing:3px;
        padding:12px 20px;border-radius:16px;border:4px solid #fff;background:#7B47C9;
        color:#fff;cursor:pointer;box-shadow:0 5px 0 rgba(36,29,21,.22)`;
      b.onclick=()=>{
        if(b.dataset.done) return;
        if(!selPic){ wobble(b); say('Tap a picture first',0.9); return; }
        if(selPic.dataset.w===g.w){
          b.style.background='#2FAE7C'; b.dataset.done='1';
          selPic.style.outline='6px solid #2FAE7C'; selPic.dataset.done='1';
          selPic=null; matched++; sYes(); confetti(8); popAt(b,'⭐');
          say(g.w,0.85);
          if(matched===item.group.length) setTimeout(()=>{ G.right++; G.i++; step(); },800);
        } else { wrong(g.w,b); }
      };
      right.appendChild(b);
    });
    board.appendChild(left); board.appendChild(right);
    root.appendChild(board);
  }
};

/* =====================================================================
   the report cards
   ===================================================================== */
const SET1=[A1,A2,A3,A4], SET2=[B1,B2,B3,B4];
function miniFor(def){
  if(def.id==='A1'||def.id==='A4')
    return `${PICS.jet}<div class="chip">J</div><div class="chip hi">?</div><div class="chip">T</div>`;
  if(def.id==='A2')
    return `<div class="chip">M</div><div class="chip hi">?</div><div class="chip">P</div>
            <div style="font-size:26px">⬅️</div><div class="chip">A</div>`;
  if(def.id==='A3')
    return `<div class="chip" style="background:#E85D4A;color:#fff;border-color:#E85D4A">A</div>
            ${PICS.gem}
            <div class="chip" style="background:#12A99A;color:#fff;border-color:#12A99A">E</div>`;
  if(def.id==='B1')
    return `${PICS.cat}<div class="chip">C</div><div class="chip">A</div><div class="chip hi">?</div>`;
  if(def.id==='B2')
    return `${PICS.cap}<div class="word" style="font-size:22px">CAP<br><span style="opacity:.4">CAT</span></div>`;
  if(def.id==='B3')
    return `${PICS.hen}<div class="chip">H</div><div class="chip hi">?</div><div class="chip">N</div>`;
  return `${PICS.van}${PICS.net}<div class="word" style="font-size:18px">VAN<br>NET</div>`;
}
function card(def,host){
  const c=document.createElement('div'); c.className='card';
  c.innerHTML=`<h3>${def.id} — ${def.name}</h3>
    <p class="tag">${def.tag}</p>
    <div class="mini">${miniFor(def)}</div>
    <p class="desc">${def.desc}</p>
    <div class="teach">👉 ${def.teach}</div>`;
  const b=document.createElement('button'); b.className='play'; b.textContent='▶️ Play '+def.id;
  b.onclick=()=>openGame(def);
  c.appendChild(b);
  host.appendChild(c);
}
SET1.forEach(d=>card(d,$('g1')));
SET2.forEach(d=>card(d,$('g2')));
