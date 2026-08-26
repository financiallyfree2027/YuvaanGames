/* =====================================================================
   PICTURE LIBRARY — part 2.
   The extra CVC words needed to fill 24 levels without repeating
   the same nine pictures over and over.  Same rules as part 1:
   0 0 200 200, flat shapes, project palette, instantly recognisable.
   ===================================================================== */
Object.assign(PICS, {

/* ---------------- short a ---------------- */
bag:`<svg viewBox="0 0 200 200">
  <path d="M40 70h120l12 104H28z" fill="#E85D4A" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <path d="M74 72V56a26 26 0 0 1 52 0v16" fill="none" stroke="#241D15" stroke-width="7" stroke-linecap="round"/>
  <rect x="80" y="104" width="40" height="30" rx="5" fill="#FFC93C" stroke="#241D15" stroke-width="3.5"/>
</svg>`,
hat:`<svg viewBox="0 0 200 200">
  <ellipse cx="100" cy="140" rx="86" ry="22" fill="#3D8DDB" stroke="#241D15" stroke-width="4"/>
  <path d="M52 140V78a48 30 0 0 1 96 0v62z" fill="#3D8DDB" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <rect x="50" y="112" width="100" height="20" fill="#FFC93C" stroke="#241D15" stroke-width="3.5"/>
</svg>`,
fan:`<svg viewBox="0 0 200 200">
  <rect x="88" y="130" width="24" height="46" fill="#8B5E3C" stroke="#241D15" stroke-width="4"/>
  <ellipse cx="100" cy="180" rx="46" ry="12" fill="#8B5E3C" stroke="#241D15" stroke-width="4"/>
  <g fill="#3D8DDB" stroke="#241D15" stroke-width="3.5">
    <path d="M100 84q40-42 46 4t-46 4z"/><path d="M100 84q42 40-4 46t-4-46z"/>
    <path d="M100 84q-40 42-46-4t46-4z"/><path d="M100 84q-42-40 4-46t4 46z"/>
  </g>
  <circle cx="100" cy="84" r="12" fill="#FFC93C" stroke="#241D15" stroke-width="4"/>
</svg>`,
jam:`<svg viewBox="0 0 200 200">
  <rect x="66" y="24" width="68" height="20" rx="7" fill="#E85D4A" stroke="#241D15" stroke-width="4"/>
  <path d="M70 44h60v10a40 40 0 0 1 20 34v72a12 12 0 0 1-12 12H62a12 12 0 0 1-12-12V88a40 40 0 0 1 20-34z"
        fill="#FF8AC5" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <rect x="60" y="112" width="80" height="34" rx="5" fill="#FDFAF4" stroke="#241D15" stroke-width="3.5"/>
  <circle cx="82" cy="129" r="7" fill="#E85D4A"/><circle cx="100" cy="129" r="7" fill="#E85D4A"/>
  <circle cx="118" cy="129" r="7" fill="#E85D4A"/>
</svg>`,
can:`<svg viewBox="0 0 200 200">
  <ellipse cx="100" cy="46" rx="46" ry="16" fill="#B8C6D1" stroke="#241D15" stroke-width="4"/>
  <path d="M54 46v108a46 16 0 0 0 92 0V46" fill="#2FAE7C" stroke="#241D15" stroke-width="4"/>
  <ellipse cx="100" cy="154" rx="46" ry="16" fill="#2FAE7C" stroke="#241D15" stroke-width="4"/>
  <rect x="62" y="76" width="76" height="42" rx="5" fill="#FDFAF4" stroke="#241D15" stroke-width="3"/>
  <path d="M74 90h52M74 104h34" stroke="#E85D4A" stroke-width="6" stroke-linecap="round"/>
</svg>`,
pan:`<svg viewBox="0 0 200 200">
  <path d="M22 96h116v22a58 32 0 0 1-116 0z" fill="#B8C6D1" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <ellipse cx="80" cy="96" rx="58" ry="20" fill="#241D15"/>
  <ellipse cx="80" cy="94" rx="48" ry="15" fill="#4a4038"/>
  <rect x="136" y="86" width="48" height="16" rx="8" fill="#8B5E3C" stroke="#241D15" stroke-width="4"/>
</svg>`,
mat:`<svg viewBox="0 0 200 200">
  <path d="M18 116h164l-30 52H48z" fill="#F4A340" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <path d="M36 128h130M30 142h142" stroke="#241D15" stroke-width="3.5" opacity=".5"/>
  <g stroke="#E85D4A" stroke-width="5" stroke-linecap="round">
    <path d="M48 168l-6 12M78 168l-4 12M108 168l-2 12M138 168v12"/>
  </g>
</svg>`,

/* ---------------- short e ---------------- */
ten:`<svg viewBox="0 0 200 200">
  <rect x="18" y="34" width="164" height="132" rx="18" fill="#FDFAF4" stroke="#241D15" stroke-width="5"/>
  <g fill="#E85D4A">
    <circle cx="52" cy="72" r="13"/><circle cx="92" cy="72" r="13"/><circle cx="132" cy="72" r="13"/>
    <circle cx="52" cy="112" r="13"/><circle cx="92" cy="112" r="13"/><circle cx="132" cy="112" r="13"/>
  </g>
  <g fill="#3D8DDB">
    <circle cx="52" cy="144" r="13"/><circle cx="92" cy="144" r="13"/>
    <circle cx="132" cy="144" r="13"/><circle cx="166" cy="112" r="13"/>
  </g>
</svg>`,
web:`<svg viewBox="0 0 200 200">
  <g fill="none" stroke="#241D15" stroke-width="4" stroke-linecap="round">
    <path d="M100 100V16M100 100l60-60M100 100h84M100 100l60 60M100 100v84M100 100l-60 60M100 100H16M100 100L40 40"/>
    <path d="M100 40q34 8 44 28t-8 46q-24 20-48 12t-36-30q-4-30 20-42 12-8 28-14z"/>
    <path d="M100 66q20 6 26 18t-6 28q-16 12-30 6t-20-20q0-18 14-24z"/>
  </g>
  <ellipse cx="146" cy="140" rx="13" ry="10" fill="#241D15"/>
  <circle cx="146" cy="127" r="7" fill="#241D15"/>
  <g stroke="#241D15" stroke-width="2.5"><path d="M134 134l-10-6M158 134l10-6M134 146l-10 6M158 146l10 6"/></g>
</svg>`,
leg:`<svg viewBox="0 0 200 200">
  <path d="M72 20h48v70l22 52-16 40H86l-14-40 22-52z" fill="#F2C9A0" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <rect x="66" y="14" width="60" height="24" rx="8" fill="#3D8DDB" stroke="#241D15" stroke-width="4"/>
  <path d="M84 158h44l10 24H76z" fill="#E85D4A" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <path d="M78 176h58" stroke="#241D15" stroke-width="3.5"/>
</svg>`,
peg:`<svg viewBox="0 0 200 200">
  <path d="M74 26h20v76l-8 72h-6l-6-72z" fill="#F4A340" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <path d="M106 26h20l0 76-6 72h-6l-8-72z" fill="#F4A340" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <rect x="60" y="86" width="80" height="18" rx="9" fill="#B8C6D1" stroke="#241D15" stroke-width="4"/>
  <path d="M84 36q16-10 32 0" stroke="#241D15" stroke-width="3.5" fill="none"/>
</svg>`,

/* ---------------- short i ---------------- */
pig:`<svg viewBox="0 0 200 200">
  <ellipse cx="100" cy="122" rx="66" ry="48" fill="#FF8AC5" stroke="#241D15" stroke-width="4"/>
  <path d="M52 82L40 46l34 14zM148 82l12-36-34 14z" fill="#FF8AC5" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <ellipse cx="100" cy="128" rx="26" ry="20" fill="#f76bb0" stroke="#241D15" stroke-width="3.5"/>
  <circle cx="92" cy="128" r="5" fill="#241D15"/><circle cx="108" cy="128" r="5" fill="#241D15"/>
  <circle cx="74" cy="98" r="6" fill="#241D15"/><circle cx="126" cy="98" r="6" fill="#241D15"/>
  <g stroke="#241D15" stroke-width="7" stroke-linecap="round">
    <path d="M66 166v10M96 170v8M126 166v10"/>
  </g>
  <path d="M164 118q18-6 10 12" stroke="#241D15" stroke-width="4" fill="none" stroke-linecap="round"/>
</svg>`,
pin:`<svg viewBox="0 0 200 200">
  <circle cx="100" cy="58" r="38" fill="#E85D4A" stroke="#241D15" stroke-width="5"/>
  <circle cx="86" cy="46" r="10" fill="#fff" opacity=".75"/>
  <path d="M100 96v76l10 14" stroke="#B8C6D1" stroke-width="10" fill="none" stroke-linecap="round"/>
  <path d="M100 96v76l10 14" stroke="#241D15" stroke-width="3" fill="none" stroke-linecap="round" opacity=".4"/>
</svg>`,
six:`<svg viewBox="0 0 200 200">
  <rect x="30" y="30" width="140" height="140" rx="26" fill="#FDFAF4" stroke="#241D15" stroke-width="5"/>
  <g fill="#7B47C9">
    <circle cx="70" cy="66" r="14"/><circle cx="130" cy="66" r="14"/>
    <circle cx="70" cy="100" r="14"/><circle cx="130" cy="100" r="14"/>
    <circle cx="70" cy="134" r="14"/><circle cx="130" cy="134" r="14"/>
  </g>
</svg>`,
lid:`<svg viewBox="0 0 200 200">
  <ellipse cx="100" cy="88" rx="76" ry="30" fill="#E85D4A" stroke="#241D15" stroke-width="4"/>
  <path d="M24 88v22a76 30 0 0 0 152 0V88" fill="#c94a38" stroke="#241D15" stroke-width="4"/>
  <ellipse cx="100" cy="80" rx="52" ry="18" fill="#f2705c"/>
  <rect x="86" y="46" width="28" height="18" rx="8" fill="#B8C6D1" stroke="#241D15" stroke-width="4"/>
</svg>`,
zip:`<svg viewBox="0 0 200 200">
  <path d="M78 18h44v164H78z" fill="#3D8DDB" stroke="#241D15" stroke-width="4"/>
  <g fill="#B8C6D1" stroke="#241D15" stroke-width="2.5">
    <rect x="60" y="26" width="18" height="12" rx="3"/><rect x="60" y="50" width="18" height="12" rx="3"/>
    <rect x="60" y="74" width="18" height="12" rx="3"/>
    <rect x="122" y="26" width="18" height="12" rx="3"/><rect x="122" y="50" width="18" height="12" rx="3"/>
    <rect x="122" y="74" width="18" height="12" rx="3"/>
  </g>
  <rect x="82" y="96" width="36" height="34" rx="8" fill="#FFC93C" stroke="#241D15" stroke-width="4"/>
  <path d="M100 130v34" stroke="#241D15" stroke-width="7" stroke-linecap="round"/>
  <circle cx="100" cy="170" r="10" fill="#FFC93C" stroke="#241D15" stroke-width="4"/>
</svg>`,
bin:`<svg viewBox="0 0 200 200">
  <path d="M46 60h108l-12 116H58z" fill="#2FAE7C" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <rect x="34" y="42" width="132" height="20" rx="9" fill="#249267" stroke="#241D15" stroke-width="4"/>
  <rect x="84" y="26" width="32" height="16" rx="7" fill="#249267" stroke="#241D15" stroke-width="4"/>
  <path d="M76 84l6 76M100 84v76M124 84l-6 76" stroke="#241D15" stroke-width="4" opacity=".55" stroke-linecap="round"/>
</svg>`,
fig:`<svg viewBox="0 0 200 200">
  <path d="M100 54c40 0 62 34 62 66a62 56 0 0 1-124 0c0-32 22-66 62-66z"
        fill="#7B47C9" stroke="#241D15" stroke-width="4"/>
  <path d="M100 54q-6-24 8-32 6 14 20 12-6 22-28 20z" fill="#2FAE7C" stroke="#241D15" stroke-width="3.5" stroke-linejoin="round"/>
  <ellipse cx="80" cy="102" rx="13" ry="18" fill="#a06fe0" opacity=".7"/>
</svg>`,

/* ---------------- short o ---------------- */
dog:`<svg viewBox="0 0 200 200">
  <ellipse cx="96" cy="132" rx="58" ry="40" fill="#8B5E3C" stroke="#241D15" stroke-width="4"/>
  <circle cx="96" cy="82" r="42" fill="#a06f45" stroke="#241D15" stroke-width="4"/>
  <ellipse cx="54" cy="76" rx="14" ry="28" fill="#6b4630" stroke="#241D15" stroke-width="4"/>
  <ellipse cx="138" cy="76" rx="14" ry="28" fill="#6b4630" stroke="#241D15" stroke-width="4"/>
  <circle cx="82" cy="76" r="5.5" fill="#241D15"/><circle cx="110" cy="76" r="5.5" fill="#241D15"/>
  <ellipse cx="96" cy="96" rx="12" ry="9" fill="#241D15"/>
  <path d="M96 105v8m-9 6q9 7 18 0" stroke="#241D15" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M150 132q26-4 22-30" stroke="#8B5E3C" stroke-width="13" fill="none" stroke-linecap="round"/>
  <g stroke="#241D15" stroke-width="7" stroke-linecap="round"><path d="M70 170v8M116 170v8"/></g>
</svg>`,
box:`<svg viewBox="0 0 200 200">
  <path d="M28 74l72-32 72 32-72 30z" fill="#F4A340" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <path d="M28 74v72l72 32v-74z" fill="#c98131" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <path d="M172 74v72l-72 32v-74z" fill="#e09a4a" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <path d="M100 42v62" stroke="#241D15" stroke-width="3" opacity=".4"/>
</svg>`,
top:`<svg viewBox="0 0 200 200">
  <path d="M40 78h120l-60 96z" fill="#E85D4A" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <ellipse cx="100" cy="78" rx="60" ry="20" fill="#3D8DDB" stroke="#241D15" stroke-width="4"/>
  <rect x="92" y="30" width="16" height="34" rx="7" fill="#FFC93C" stroke="#241D15" stroke-width="4"/>
  <path d="M64 92q36 14 72 0" stroke="#FFC93C" stroke-width="7" fill="none"/>
</svg>`,
pot:`<svg viewBox="0 0 200 200">
  <path d="M36 78h128v56a64 34 0 0 1-128 0z" fill="#B8C6D1" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <ellipse cx="100" cy="78" rx="64" ry="20" fill="#8fa3b3" stroke="#241D15" stroke-width="4"/>
  <path d="M20 88q-12 14 0 26M180 88q12 14 0 26" stroke="#241D15" stroke-width="9" fill="none" stroke-linecap="round"/>
  <path d="M78 52q6-16 0-26M100 50q6-18 0-28M122 52q6-16 0-26" stroke="#B8C6D1" stroke-width="6" fill="none" stroke-linecap="round" opacity=".9"/>
</svg>`,
log:`<svg viewBox="0 0 200 200">
  <path d="M40 70h110a34 34 0 0 1 0 68H40z" fill="#8B5E3C" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <ellipse cx="40" cy="104" rx="22" ry="34" fill="#c69a68" stroke="#241D15" stroke-width="4"/>
  <ellipse cx="40" cy="104" rx="13" ry="21" fill="none" stroke="#8B5E3C" stroke-width="4"/>
  <ellipse cx="40" cy="104" rx="5" ry="9" fill="none" stroke="#8B5E3C" stroke-width="4"/>
  <path d="M74 84h58M84 122h48" stroke="#6b4630" stroke-width="4" stroke-linecap="round"/>
</svg>`,
mop:`<svg viewBox="0 0 200 200">
  <rect x="92" y="16" width="16" height="96" rx="7" fill="#8B5E3C" stroke="#241D15" stroke-width="4"/>
  <path d="M56 112h88l-10 22H66z" fill="#3D8DDB" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <g stroke="#FFC93C" stroke-width="9" stroke-linecap="round">
    <path d="M70 134l-8 46M86 134l-4 48M100 134v48M114 134l4 48M130 134l8 46"/>
  </g>
</svg>`,
fox:`<svg viewBox="0 0 200 200">
  <path d="M56 84L44 34l38 22zM144 84l12-50-38 22z" fill="#F4A340" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <path d="M100 62c34 0 46 30 46 52s-20 44-46 44-46-22-46-44 12-52 46-52z" fill="#F4A340" stroke="#241D15" stroke-width="4"/>
  <path d="M100 118c-18 0-30 10-30 22s12 20 30 20 30-8 30-20-12-22-30-22z" fill="#FDFAF4" stroke="#241D15" stroke-width="3.5"/>
  <circle cx="82" cy="104" r="6" fill="#241D15"/><circle cx="118" cy="104" r="6" fill="#241D15"/>
  <path d="M100 132l-7 7h14z" fill="#241D15"/>
  <path d="M146 150q34 6 28-30" stroke="#F4A340" stroke-width="15" fill="none" stroke-linecap="round"/>
  <path d="M172 124q6 10 2 16" stroke="#FDFAF4" stroke-width="9" fill="none" stroke-linecap="round"/>
</svg>`,

/* ---------------- short u ---------------- */
bus:`<svg viewBox="0 0 200 200">
  <rect x="16" y="52" width="168" height="86" rx="14" fill="#FFC93C" stroke="#241D15" stroke-width="4"/>
  <g fill="#8ED0FF" stroke="#241D15" stroke-width="3">
    <rect x="30" y="66" width="32" height="26" rx="4"/><rect x="72" y="66" width="32" height="26" rx="4"/>
    <rect x="114" y="66" width="32" height="26" rx="4"/><rect x="152" y="66" width="20" height="26" rx="4"/>
  </g>
  <rect x="14" y="122" width="172" height="12" rx="6" fill="#241D15"/>
  <circle cx="56" cy="146" r="19" fill="#241D15"/><circle cx="56" cy="146" r="8" fill="#B8C6D1"/>
  <circle cx="146" cy="146" r="19" fill="#241D15"/><circle cx="146" cy="146" r="8" fill="#B8C6D1"/>
  <rect x="26" y="102" width="34" height="10" rx="5" fill="#E85D4A"/>
</svg>`,
sun:`<svg viewBox="0 0 200 200">
  <g stroke="#F4A340" stroke-width="11" stroke-linecap="round">
    <path d="M100 12v26M100 162v26M12 100h26M162 100h26M38 38l18 18M144 144l18 18M162 38l-18 18M56 144l-18 18"/>
  </g>
  <circle cx="100" cy="100" r="52" fill="#FFC93C" stroke="#241D15" stroke-width="5"/>
  <circle cx="84" cy="92" r="6" fill="#241D15"/><circle cx="116" cy="92" r="6" fill="#241D15"/>
  <path d="M80 116q20 16 40 0" stroke="#241D15" stroke-width="5" fill="none" stroke-linecap="round"/>
</svg>`,
cup:`<svg viewBox="0 0 200 200">
  <path d="M44 62h96v56a48 40 0 0 1-96 0z" fill="#FDFAF4" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <ellipse cx="92" cy="62" rx="48" ry="16" fill="#8B5E3C" stroke="#241D15" stroke-width="4"/>
  <path d="M140 76q34 0 34 22t-34 22" fill="none" stroke="#241D15" stroke-width="9" stroke-linecap="round"/>
  <ellipse cx="92" cy="170" rx="52" ry="12" fill="#B8C6D1" stroke="#241D15" stroke-width="4"/>
  <path d="M76 40q6-14 0-24M108 38q6-16 0-26" stroke="#B8C6D1" stroke-width="6" fill="none" stroke-linecap="round"/>
</svg>`,
bug:`<svg viewBox="0 0 200 200">
  <ellipse cx="100" cy="112" rx="52" ry="58" fill="#E85D4A" stroke="#241D15" stroke-width="4"/>
  <path d="M100 54v116" stroke="#241D15" stroke-width="5"/>
  <circle cx="100" cy="52" r="26" fill="#241D15"/>
  <circle cx="90" cy="46" r="5" fill="#fff"/><circle cx="110" cy="46" r="5" fill="#fff"/>
  <g fill="#241D15">
    <circle cx="74" cy="90" r="9"/><circle cx="126" cy="92" r="9"/>
    <circle cx="78" cy="132" r="8"/><circle cx="124" cy="134" r="8"/>
  </g>
  <g stroke="#241D15" stroke-width="4" stroke-linecap="round">
    <path d="M88 30l-12-16M112 30l12-16M50 96H26M150 98h24M54 130l-22 12M148 132l22 12"/>
  </g>
</svg>`,
mug:`<svg viewBox="0 0 200 200">
  <rect x="40" y="56" width="96" height="106" rx="12" fill="#3D8DDB" stroke="#241D15" stroke-width="4"/>
  <ellipse cx="88" cy="56" rx="48" ry="15" fill="#8ED0FF" stroke="#241D15" stroke-width="4"/>
  <path d="M136 82q34 0 34 26t-34 26" fill="none" stroke="#241D15" stroke-width="10" stroke-linecap="round"/>
  <rect x="58" y="98" width="60" height="34" rx="6" fill="#FDFAF4" stroke="#241D15" stroke-width="3"/>
  <path d="M74 116h28" stroke="#E85D4A" stroke-width="6" stroke-linecap="round"/>
</svg>`,
nut:`<svg viewBox="0 0 200 200">
  <path d="M100 26l64 37v74l-64 37-64-37V63z" fill="#8B5E3C" stroke="#241D15" stroke-width="5" stroke-linejoin="round"/>
  <circle cx="100" cy="100" r="30" fill="#FDFAF4" stroke="#241D15" stroke-width="5"/>
  <path d="M100 26l64 37-64 37-64-37z" fill="#a06f45" stroke="#241D15" stroke-width="4" stroke-linejoin="round" opacity=".55"/>
</svg>`,
rug:`<svg viewBox="0 0 200 200">
  <ellipse cx="100" cy="112" rx="80" ry="48" fill="#7B47C9" stroke="#241D15" stroke-width="4"/>
  <ellipse cx="100" cy="112" rx="56" ry="33" fill="#FFC93C" stroke="#241D15" stroke-width="3.5"/>
  <ellipse cx="100" cy="112" rx="30" ry="17" fill="#E85D4A" stroke="#241D15" stroke-width="3.5"/>
  <g stroke="#7B47C9" stroke-width="5" stroke-linecap="round">
    <path d="M24 128l-12 8M52 150l-8 12M100 160v14M148 150l8 12M176 128l12 8"/>
  </g>
</svg>`,
jug:`<svg viewBox="0 0 200 200">
  <path d="M52 56h76v18a44 44 0 0 1 18 34v52a14 14 0 0 1-14 14H62a14 14 0 0 1-14-14v-52a44 44 0 0 1 18-34z"
        fill="#2FAE7C" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <path d="M128 60l26-8-4 22-22 6z" fill="#2FAE7C" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <path d="M48 92q-30 4-30 30t30 26" fill="none" stroke="#241D15" stroke-width="9" stroke-linecap="round"/>
  <rect x="64" y="112" width="66" height="30" rx="5" fill="#FDFAF4" stroke="#241D15" stroke-width="3"/>
</svg>`,
tub:`<svg viewBox="0 0 200 200">
  <path d="M28 92h144v40a44 30 0 0 1-144 0z" fill="#FDFAF4" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <ellipse cx="100" cy="92" rx="72" ry="22" fill="#8ED0FF" stroke="#241D15" stroke-width="4"/>
  <g fill="#fff" stroke="#3D8DDB" stroke-width="2.5">
    <circle cx="76" cy="82" r="11"/><circle cx="104" cy="76" r="8"/><circle cx="126" cy="86" r="9"/>
  </g>
  <g stroke="#241D15" stroke-width="7" stroke-linecap="round"><path d="M48 158v14M152 158v14"/></g>
  <path d="M172 66q14 0 14 18" fill="none" stroke="#B8C6D1" stroke-width="8" stroke-linecap="round"/>
</svg>`
});

/* =====================================================================
   THE WORD BANK, grouped by vowel.  Everything here has a picture.
   ===================================================================== */
const BANK={
  a:['cat','cap','van','map','bag','hat','fan','jam','can','pan','mat','tag','pad','sad','jar'],
  e:['bed','hen','pen','net','jet','ten','web','leg','peg','men','gem','den'],
  i:['pig','pin','six','lid','zip','bin','fig'],
  o:['dog','box','top','pot','log','mop','fox'],
  u:['bus','sun','cup','bug','mug','nut','rug','jug','tub']
};
/* the nine words straight off this week's worksheet — level 1 uses these */
const WORKSHEET_A_E=['men','map','jet','pad','gem','tag','den','sad','pen'];
const WORKSHEET_Q2 =['bed','cat','cap','van','net','jar','pad','hen'];
