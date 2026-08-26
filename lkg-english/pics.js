/* =====================================================================
   PICTURE LIBRARY for the LKG English worksheet games.
   Sixteen flat SVG drawings, all on a 0 0 200 200 canvas, drawn only
   from the project palette so they sit next to the Spidey games and the
   story art without clashing.
   Every picture must be recognisable to a five-year-old at a glance —
   that is the whole exercise, so no clever stylisation.
   ===================================================================== */
const PAL = {
  red:'#E85D4A', orange:'#F4A340', yellow:'#FFC93C', green:'#2FAE7C',
  blue:'#3D8DDB', teal:'#12A99A', purple:'#7B47C9', pink:'#FF8AC5',
  brown:'#8B5E3C', skin:'#F2C9A0', cream:'#FDFAF4', ink:'#241D15',
  grey:'#B8C6D1'
};

const PICS = {

/* ---------- Q1 words: short a / short e ---------- */
men:`<svg viewBox="0 0 200 200">
  <g>
    <circle cx="52" cy="76" r="26" fill="#F2C9A0"/>
    <path d="M26 76a26 26 0 0 1 52 0z" fill="#241D15"/>
    <circle cx="44" cy="78" r="3.5" fill="#241D15"/><circle cx="60" cy="78" r="3.5" fill="#241D15"/>
    <path d="M44 90q8 7 16 0" stroke="#241D15" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M22 168v-38a30 30 0 0 1 60 0v38z" fill="#3D8DDB"/>
  </g>
  <g>
    <circle cx="100" cy="70" r="27" fill="#F2C9A0"/>
    <path d="M73 70a27 27 0 0 1 54 0z" fill="#8B5E3C"/>
    <circle cx="91" cy="72" r="3.5" fill="#241D15"/><circle cx="109" cy="72" r="3.5" fill="#241D15"/>
    <path d="M91 85q9 8 18 0" stroke="#241D15" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M68 168v-40a32 32 0 0 1 64 0v40z" fill="#E85D4A"/>
  </g>
  <g>
    <circle cx="148" cy="76" r="26" fill="#F2C9A0"/>
    <path d="M122 76a26 26 0 0 1 52 0z" fill="#F4A340"/>
    <circle cx="140" cy="78" r="3.5" fill="#241D15"/><circle cx="156" cy="78" r="3.5" fill="#241D15"/>
    <path d="M140 90q8 7 16 0" stroke="#241D15" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M118 168v-38a30 30 0 0 1 60 0v38z" fill="#2FAE7C"/>
  </g>
</svg>`,

map:`<svg viewBox="0 0 200 200">
  <path d="M18 44l50-16 64 20 50-18v124l-50 18-64-20-50 16z" fill="#FDFAF4" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <path d="M68 28v124M132 48v124" stroke="#241D15" stroke-width="3" stroke-dasharray="9 8"/>
  <path d="M28 108q26-26 52-6t56-22" stroke="#E85D4A" stroke-width="5" fill="none" stroke-dasharray="10 9" stroke-linecap="round"/>
  <path d="M118 66l16 16m0-16l-16 16" stroke="#E85D4A" stroke-width="6" stroke-linecap="round"/>
  <path d="M34 74q10-16 20 0t-20 12z" fill="#2FAE7C"/>
  <circle cx="156" cy="120" r="9" fill="#3D8DDB"/>
</svg>`,

jet:`<svg viewBox="0 0 200 200">
  <path d="M14 108l150-22 22 8-10 16-152 12z" fill="#FDFAF4" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <path d="M74 92L52 40h16l40 46z" fill="#3D8DDB" stroke="#241D15" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="M78 116l-16 44h15l34-40z" fill="#3D8DDB" stroke="#241D15" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="M150 84l14-30h12l-4 32z" fill="#E85D4A" stroke="#241D15" stroke-width="3.5" stroke-linejoin="round"/>
  <circle cx="60" cy="106" r="5" fill="#8ED0FF" stroke="#241D15" stroke-width="2"/>
  <circle cx="80" cy="104" r="5" fill="#8ED0FF" stroke="#241D15" stroke-width="2"/>
  <circle cx="100" cy="102" r="5" fill="#8ED0FF" stroke="#241D15" stroke-width="2"/>
  <circle cx="170" cy="102" r="4" fill="#241D15"/>
</svg>`,

pad:`<svg viewBox="0 0 200 200">
  <rect x="38" y="30" width="124" height="146" rx="8" fill="#FDFAF4" stroke="#241D15" stroke-width="4"/>
  <rect x="38" y="30" width="124" height="22" rx="8" fill="#F4A340" stroke="#241D15" stroke-width="4"/>
  <g stroke="#3D8DDB" stroke-width="4" stroke-linecap="round">
    <path d="M56 76h88M56 100h88M56 124h88M56 148h60"/>
  </g>
  <g fill="#241D15">
    <circle cx="62" cy="41" r="4"/><circle cx="86" cy="41" r="4"/>
    <circle cx="110" cy="41" r="4"/><circle cx="134" cy="41" r="4"/>
  </g>
</svg>`,

gem:`<svg viewBox="0 0 200 200">
  <path d="M60 50h80l34 40-74 82-74-82z" fill="#12A99A" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <path d="M60 50l-34 40h148L140 50z" fill="#5fd8cb" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <path d="M26 90h148L100 172z" fill="#12A99A" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <path d="M60 50l40 40 40-40M100 90v82" stroke="#241D15" stroke-width="3.5" fill="none"/>
  <path d="M74 62l-8 20" stroke="#FDFAF4" stroke-width="5" stroke-linecap="round" opacity=".8"/>
</svg>`,

tag:`<svg viewBox="0 0 200 200">
  <path d="M104 26h62v62L86 168 24 106z" fill="#F4A340" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <circle cx="140" cy="52" r="12" fill="#FDFAF4" stroke="#241D15" stroke-width="4"/>
  <path d="M148 34c14-14 32-8 32 6s-16 18-24 12" stroke="#241D15" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M56 96l34 34" stroke="#FDFAF4" stroke-width="6" stroke-linecap="round" opacity=".85"/>
</svg>`,

den:`<svg viewBox="0 0 200 200">
  <path d="M10 170q10-96 90-96t90 96z" fill="#8B5E3C"/>
  <path d="M10 170q10-96 90-96t90 96z" fill="none" stroke="#241D15" stroke-width="4"/>
  <path d="M52 172q4-58 48-58t48 58z" fill="#241D15"/>
  <g>
    <ellipse cx="100" cy="146" rx="26" ry="22" fill="#F4A340"/>
    <circle cx="90" cy="142" r="4.5" fill="#241D15"/><circle cx="110" cy="142" r="4.5" fill="#241D15"/>
    <path d="M100 152l-5 5h10z" fill="#241D15"/>
    <path d="M78 128l-6-14 16 8zM122 128l6-14-16 8z" fill="#F4A340" stroke="#241D15" stroke-width="2.5"/>
  </g>
  <path d="M28 96q14-10 28-2M144 94q14-8 28 2" stroke="#2FAE7C" stroke-width="6" fill="none" stroke-linecap="round"/>
</svg>`,

sad:`<svg viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="72" fill="#FFC93C" stroke="#241D15" stroke-width="4"/>
  <path d="M28 84a72 72 0 0 1 144 0z" fill="#8B5E3C"/>
  <path d="M28 84a72 72 0 0 1 144 0" fill="none" stroke="#241D15" stroke-width="4"/>
  <ellipse cx="74" cy="104" rx="8" ry="10" fill="#241D15"/>
  <ellipse cx="126" cy="104" rx="8" ry="10" fill="#241D15"/>
  <path d="M58 88q16-10 30 0M112 88q14-10 30 0" stroke="#241D15" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M76 146q24-22 48 0" stroke="#241D15" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M70 116c5 7 8 12 8 16a8 8 0 0 1-16 0c0-4 3-9 8-16z" fill="#8ED0FF" stroke="#3D8DDB" stroke-width="2"/>
</svg>`,

pen:`<svg viewBox="0 0 200 200">
  <path d="M28 172l10-34 104-104 24 24L62 162z" fill="#3D8DDB" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <path d="M142 34l24 24 14-14a17 17 0 0 0-24-24z" fill="#E85D4A" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <path d="M28 172l10-34 24 24z" fill="#FDFAF4" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <path d="M38 138l24 24" stroke="#241D15" stroke-width="3.5"/>
  <path d="M60 152l82-82" stroke="#FDFAF4" stroke-width="5" opacity=".55" stroke-linecap="round"/>
</svg>`,

/* ---------- Q2 words ---------- */
bed:`<svg viewBox="0 0 200 200">
  <rect x="14" y="60" width="16" height="112" rx="6" fill="#8B5E3C" stroke="#241D15" stroke-width="4"/>
  <rect x="170" y="96" width="16" height="76" rx="6" fill="#8B5E3C" stroke="#241D15" stroke-width="4"/>
  <rect x="22" y="112" width="156" height="34" rx="10" fill="#FDFAF4" stroke="#241D15" stroke-width="4"/>
  <path d="M30 112h100l-4 34H30z" fill="#FF8AC5" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <rect x="34" y="82" width="56" height="32" rx="12" fill="#FDFAF4" stroke="#241D15" stroke-width="4"/>
  <g fill="#E85D4A"><circle cx="52" cy="126" r="4"/><circle cx="76" cy="134" r="4"/><circle cx="100" cy="124" r="4"/></g>
</svg>`,

cat:`<svg viewBox="0 0 200 200">
  <path d="M62 88L48 40l38 20zM138 88l14-48-38 20z" fill="#F4A340" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <ellipse cx="100" cy="146" rx="44" ry="34" fill="#F4A340" stroke="#241D15" stroke-width="4"/>
  <circle cx="100" cy="92" r="42" fill="#F4A340" stroke="#241D15" stroke-width="4"/>
  <ellipse cx="84" cy="86" rx="7" ry="9" fill="#241D15"/><ellipse cx="116" cy="86" rx="7" ry="9" fill="#241D15"/>
  <path d="M100 104l-7 6h14z" fill="#E85D4A"/>
  <path d="M100 110v6m-8 4q8 6 16 0" stroke="#241D15" stroke-width="3" fill="none" stroke-linecap="round"/>
  <g stroke="#241D15" stroke-width="3" stroke-linecap="round">
    <path d="M56 96H30M56 104l-24 8M144 96h26M144 104l24 8"/>
  </g>
  <path d="M144 156q28 4 26-26" stroke="#F4A340" stroke-width="12" fill="none" stroke-linecap="round"/>
  <path d="M144 156q28 4 26-26" stroke="#241D15" stroke-width="3" fill="none" stroke-linecap="round" opacity=".35"/>
</svg>`,

cap:`<svg viewBox="0 0 200 200">
  <path d="M26 128q0-76 74-76t74 76z" fill="#E85D4A" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <path d="M26 128h148q26 0 26 20H26z" fill="#c94a38" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <path d="M100 52v76" stroke="#241D15" stroke-width="3" opacity=".5"/>
  <path d="M62 66q38-22 76 0" stroke="#241D15" stroke-width="3" fill="none" opacity=".45"/>
  <circle cx="100" cy="56" r="7" fill="#FFC93C" stroke="#241D15" stroke-width="3"/>
</svg>`,

van:`<svg viewBox="0 0 200 200">
  <path d="M12 130V66h100v64zM112 130V86h34l30 30v14z" fill="#3D8DDB" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <rect x="24" y="76" width="34" height="26" rx="4" fill="#8ED0FF" stroke="#241D15" stroke-width="3"/>
  <rect x="68" y="76" width="34" height="26" rx="4" fill="#8ED0FF" stroke="#241D15" stroke-width="3"/>
  <path d="M120 94h22l20 20h-42z" fill="#8ED0FF" stroke="#241D15" stroke-width="3" stroke-linejoin="round"/>
  <rect x="10" y="126" width="166" height="12" rx="6" fill="#241D15"/>
  <circle cx="54" cy="146" r="20" fill="#241D15"/><circle cx="54" cy="146" r="8" fill="#B8C6D1"/>
  <circle cx="142" cy="146" r="20" fill="#241D15"/><circle cx="142" cy="146" r="8" fill="#B8C6D1"/>
</svg>`,

net:`<svg viewBox="0 0 200 200">
  <path d="M96 118L44 170" stroke="#8B5E3C" stroke-width="14" stroke-linecap="round"/>
  <path d="M96 118L44 170" stroke="#241D15" stroke-width="3" stroke-linecap="round" opacity=".3"/>
  <ellipse cx="118" cy="82" rx="62" ry="52" fill="#FDFAF4" stroke="#241D15" stroke-width="5" transform="rotate(-40 118 82)"/>
  <g stroke="#3D8DDB" stroke-width="3" opacity=".9">
    <path d="M78 52l70 54M96 34l60 46M62 74l68 52M118 30l40 30M84 106l44 34"/>
    <path d="M150 42l-56 74M128 30l-58 76M168 62l-52 68M104 26l-46 60M158 96l-30 38"/>
  </g>
</svg>`,

jar:`<svg viewBox="0 0 200 200">
  <rect x="62" y="24" width="76" height="22" rx="8" fill="#B8C6D1" stroke="#241D15" stroke-width="4"/>
  <path d="M70 46h60v14a44 44 0 0 1 22 38v58a14 14 0 0 1-14 14H62a14 14 0 0 1-14-14V98a44 44 0 0 1 22-38z"
        fill="#8ED0FF" stroke="#241D15" stroke-width="4" stroke-linejoin="round" opacity=".85"/>
  <rect x="60" y="112" width="80" height="34" rx="6" fill="#FDFAF4" stroke="#241D15" stroke-width="3.5"/>
  <path d="M72 126h56M72 136h38" stroke="#3D8DDB" stroke-width="4" stroke-linecap="round"/>
  <path d="M84 66v20" stroke="#FDFAF4" stroke-width="6" stroke-linecap="round" opacity=".9"/>
</svg>`,

hen:`<svg viewBox="0 0 200 200">
  <path d="M118 44q-6-18 6-22 4 12 14 10-4 14-20 12z" fill="#E85D4A" stroke="#241D15" stroke-width="3.5" stroke-linejoin="round"/>
  <ellipse cx="98" cy="118" rx="58" ry="46" fill="#FDFAF4" stroke="#241D15" stroke-width="4"/>
  <circle cx="132" cy="70" r="28" fill="#FDFAF4" stroke="#241D15" stroke-width="4"/>
  <path d="M158 68l20 8-20 8z" fill="#F4A340" stroke="#241D15" stroke-width="3" stroke-linejoin="round"/>
  <path d="M132 92q-4 12 6 14" stroke="#E85D4A" stroke-width="7" fill="none" stroke-linecap="round"/>
  <circle cx="140" cy="64" r="4.5" fill="#241D15"/>
  <path d="M44 104q-22-10-30 6 16 6 22 18" fill="#FDFAF4" stroke="#241D15" stroke-width="4" stroke-linejoin="round"/>
  <path d="M70 112q22-14 44 0t-6 22q-24 6-38-22z" fill="#F4A340" opacity=".75"/>
  <g stroke="#F4A340" stroke-width="7" stroke-linecap="round"><path d="M84 162v14M112 162v14"/></g>
  <g stroke="#F4A340" stroke-width="5" stroke-linecap="round">
    <path d="M84 176h-12M84 176h12M112 176h-12M112 176h12"/>
  </g>
</svg>`
};

/* the two worksheet exercises, as data */
const Q1_WORDS = [
  {w:'men', pic:'men', miss:1, opts:['a','e']},
  {w:'map', pic:'map', miss:1, opts:['a','e']},
  {w:'jet', pic:'jet', miss:1, opts:['a','e']},
  {w:'pad', pic:'pad', miss:1, opts:['a','e']},
  {w:'gem', pic:'gem', miss:1, opts:['a','e']},
  {w:'tag', pic:'tag', miss:1, opts:['a','e']},
  {w:'den', pic:'den', miss:1, opts:['a','e']},
  {w:'sad', pic:'sad', miss:1, opts:['a','e']},
  {w:'pen', pic:'pen', miss:1, opts:['a','e']}
];
const Q2_WORDS = [
  {w:'bed',pic:'bed'},{w:'cat',pic:'cat'},{w:'cap',pic:'cap'},{w:'van',pic:'van'},
  {w:'net',pic:'net'},{w:'jar',pic:'jar'},{w:'pad',pic:'pad'},{w:'hen',pic:'hen'}
];
