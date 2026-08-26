/* =====================================================================
   GAME 1 — "Which vowel?"   (the worksheet's Q1, grown to 24 levels)

   Picture + the word with its middle letter missing + big letter buttons.
   The climb:
     1-6    a / e only  — exactly this week's homework, two buttons
     7-12   a / e / i   — three buttons
     13-18  a / e / i / o
     19-24  all five vowels, and from 21 the picture appears only AFTER
            he answers, so he has to go on the sound alone.
   Level 1 uses the nine words straight off the worksheet.
   ===================================================================== */
const VOWEL_PLAN=[];
for(let n=1;n<=24;n++){
  let vowels, band;
  if(n<=6)       { vowels=['a','e'];                 band='a e'; }
  else if(n<=12) { vowels=['a','e','i'];             band='a e i'; }
  else if(n<=18) { vowels=['a','e','i','o'];         band='a e i o'; }
  else           { vowels=['a','e','i','o','u'];     band='a e i o u'; }
  VOWEL_PLAN.push({vowels,band,hidePic:n>=21});
}

const VowelGame={
  bandOf:n=>VOWEL_PLAN[n-1].band,

  buildLevel(n){
    const p=VOWEL_PLAN[n-1];
    let pool;
    if(n===1){
      /* the very first level is this week's homework, word for word */
      pool=shuffle(WORKSHEET_A_E);
    }else{
      /* take words from every vowel in play, so the choice is real */
      pool=[];
      p.vowels.forEach(v=>{ pool=pool.concat(shuffle(BANK[v]).slice(0,4)); });
      pool=shuffle(pool);
    }
    const words=pool.slice(0,WORDS_PER_LEVEL);
    return words.map(w=>({
      w, pic:w, miss:1,
      opts:shuffle(p.vowels.slice()),
      hidePic:p.hidePic
    }));
  },

  render(q,root,cb){
    const picWrap=document.createElement('div');
    picWrap.style.cssText='display:flex;align-items:center;justify-content:center';
    if(q.hidePic){
      /* ears-only: a speaker he can tap as often as he likes */
      const b=document.createElement('div');
      b.className='picBox';
      b.style.cssText+=';width:clamp(120px,34vw,190px);height:clamp(120px,34vw,190px);'+
                       'background:#7B47C9;color:#fff;font-size:64px;cursor:pointer;border-color:#fff';
      b.textContent='🔊';
      b.onclick=()=>sound(q.w);
      picWrap.appendChild(b);
      q._picHost=b;
    }else{
      picWrap.appendChild(picBox(q.pic,200));
    }
    root.appendChild(picWrap);

    const wr=row(8);
    const slots=q.w.split('').map((c,i)=>
      slotBox(i===q.miss?'':c.toUpperCase(), i!==q.miss, i===q.miss));
    slots.forEach(s=>wr.appendChild(s));
    root.appendChild(wr);

    /* If a word keeps coming back, quietly take one WRONG letter away each
       time.  It never shows him the answer, it just narrows the field so a
       stuck child still gets there.  Two options is the floor. */
    /* reshuffled every single time, so "the other one" is never in the
       same place twice */
    let opts=shuffle(q.opts);
    const back=q.again||0;
    if(back>0 && opts.length>2){
      const wrongs=shuffle(opts.filter(o=>o!==q.w[q.miss]));
      const keep=Math.max(1, wrongs.length-back);
      opts=shuffle(wrongs.slice(0,keep).concat([q.w[q.miss]]));
    }
    const br=row(opts.length>3?10:20);
    opts.forEach(o=>{
      const b=letterBtn(o, opts.length<=3);
      b.onclick=()=>{
        if(b.dataset.dead) return;
        if(o===q.w[q.miss]){
          slots[q.miss].textContent=o.toUpperCase();
          slots[q.miss].className='slot filled';
          if(q.hidePic && q._picHost){
            /* the reveal: now he sees what he just spelled */
            q._picHost.style.background='#fff';
            q._picHost.innerHTML=PICS[q.pic];
            const s=q._picHost.querySelector('svg');
            if(s){s.style.width='100%';s.style.height='100%';}
          }
          br.querySelectorAll('button').forEach(x=>x.dataset.dead='1');
          cb.correct(q.w,b);
        }else cb.wrong(q.w,b);
      };
      br.appendChild(b);
    });
    root.appendChild(br);
    setTimeout(()=>sound(q.w),320);
  }
};
