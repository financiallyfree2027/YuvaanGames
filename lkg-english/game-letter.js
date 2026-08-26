/* =====================================================================
   GAME 2 — "Which letter is missing?"  (the worksheet's Q2, as 24 levels)

   Picture + the word with ONE letter missing + letter buttons to choose from.
   The climb:
     1-6    the LAST letter is missing        (he can see the start — easiest)
     7-12   the FIRST letter is missing
     13-18  the MIDDLE letter is missing      (this is the vowel again)
     19-24  a random position each time
   The number of wrong letters offered also grows, 2 → 5, so guessing
   stops working and he has to actually read.
   Level 1 uses the eight words straight off the worksheet.
   ===================================================================== */
const LETTER_PLAN=[];
for(let n=1;n<=24;n++){
  let mode, band;
  if(n<=6)       { mode='last';   band='_ _ ?'; }
  else if(n<=12) { mode='first';  band='? _ _'; }
  else if(n<=18) { mode='middle'; band='_ ? _'; }
  else           { mode='any';    band='? ? ?'; }
  /* decoys: 2 at the start, 5 by the end */
  const decoys = n<=4?2 : n<=9?3 : n<=15?4 : 5;
  LETTER_PLAN.push({mode,band,decoys});
}

const LetterGame={
  bandOf:n=>LETTER_PLAN[n-1].band,

  buildLevel(n){
    const p=LETTER_PLAN[n-1];
    let pool;
    if(n===1){
      pool=shuffle(WORKSHEET_Q2);
    }else{
      /* early levels stay on a and e like the homework, then widen out */
      let vs = n<=6?['a','e'] : n<=12?['a','e','i'] : n<=18?['a','e','i','o'] : ['a','e','i','o','u'];
      pool=[];
      vs.forEach(v=>{ pool=pool.concat(shuffle(BANK[v]).slice(0,4)); });
      pool=shuffle(pool);
    }
    const words=pool.slice(0,WORDS_PER_LEVEL);
    return words.map(w=>{
      let miss;
      if(p.mode==='last')        miss=2;
      else if(p.mode==='first')  miss=0;
      else if(p.mode==='middle') miss=1;
      else                       miss=Math.floor(Math.random()*3);
      return {w, pic:w, miss, decoys:p.decoys};
    });
  },

  render(q,root,cb){
    root.appendChild(picBox(q.pic,190));

    const wr=row(8);
    const slots=q.w.split('').map((c,i)=>
      slotBox(i===q.miss?'':c.toUpperCase(), i!==q.miss, i===q.miss));
    slots.forEach(s=>wr.appendChild(s));
    root.appendChild(wr);

    const right=q.w[q.miss];
    /* decoys are drawn from letters that really appear in these words,
       so the wrong answers are plausible rather than random noise */
    const alphabet='bcdfghjlmnprstvwxz'.split('').concat(['a','e','i','o','u']);
    const others=shuffle(alphabet.filter(c=>c!==right)).slice(0,q.decoys);
    const opts=shuffle(others.concat([right]));

    const br=row(10);
    opts.forEach(o=>{
      const b=letterBtn(o);
      b.onclick=()=>{
        if(b.dataset.dead) return;
        if(o===right){
          slots[q.miss].textContent=o.toUpperCase();
          slots[q.miss].className='slot filled';
          br.querySelectorAll('button').forEach(x=>x.dataset.dead='1');
          cb.correct(q.w,b);
        }else{
          /* a wrong letter fades out so the choice narrows — helpful,
             never punishing */
          b.style.opacity='.35';
          cb.wrong(q.w,b);
        }
      };
      br.appendChild(b);
    });
    root.appendChild(br);
    setTimeout(()=>sound(q.w),320);
  }
};
