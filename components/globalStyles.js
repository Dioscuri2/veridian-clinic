/* ═══════════════════════════════════════════════════════════════
   VERIDIAN CLINIC — Shared Design System
   Import FONTS and CSS into any page component via:
   import { FONTS, CSS } from "@/components/globalStyles";
   Then inject: <style>{FONTS + CSS}</style>
   ═══════════════════════════════════════════════════════════════ */

export const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Figtree:wght@300;400;500;600&display=swap');`;

export const CSS = `
/* ── Reset & Variables ── */
:root {
 --iv: #f6f1e8;
 --iv2: #ede5d4;
 --iv3: #e2d8c4;
 --fo: #0d2818;
 --fo2: #163d25;
 --fo3: #1f5533;
 --go: #c8a84b;
 --go2: #dbbf68;
 --go3: #eedea0;
 --sl: #131f2e;
 --sl2: #2e4258;
 --sl3: #607080;
 --wh: #ffffff;
 --red: #7a1616;
 --amr: #8a5500;
 --grn: #145226;
 --nav-h: 68px;
 --pad: 24px;
 --max: 1200px;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
 background: var(--iv);
 color: var(--sl);
 font-family: 'Figtree', sans-serif;
 font-weight: 300;
 line-height: 1.75;
 -webkit-font-smoothing: antialiased;
 overflow-x: hidden;
}
main { overflow-x: clip; }
img, svg { display: block; max-width: 100%; }
a { text-decoration: none; color: inherit; }
button, input, select, textarea { font: inherit; }

.cg { font-family: 'Cormorant Garamond', serif; }

/* ── Animations ── */
@keyframes rise {
 from { opacity: 0; transform: translateY(28px); }
 to { opacity: 1; transform: translateY(0); }
}
@keyframes goldpulse {
 0%,100% { background-position: 0% center; }
 50% { background-position: 100% center; }
}
@keyframes marq { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes bar { from { width: 0; } to { width: var(--bw, 60%); } }

.a1 { animation: rise .75s .04s ease both; }
.a2 { animation: rise .75s .16s ease both; }
.a3 { animation: rise .75s .28s ease both; }
.a4 { animation: rise .75s .40s ease both; }
.a5 { animation: rise .75s .52s ease both; }

.gold-shine {
 background: linear-gradient(90deg, var(--go), var(--go2), var(--go3), var(--go2), var(--go));
 background-size: 250% auto;
 -webkit-background-clip: text;
 -webkit-text-fill-color: transparent;
 background-clip: text;
 animation: goldpulse 4s ease infinite;
}

/* ── Nav ── */
.nav {
 position: fixed; top: 0; left: 0; right: 0; z-index: 300;
 height: var(--nav-h);
 transition: background .35s, box-shadow .35s;
}
.nav-inner {
 max-width: var(--max); margin: 0 auto; padding: 0 var(--pad);
 height: 100%; display: flex; align-items: center; justify-content: space-between;
 gap: 12px;
}
.nav-scroll {
 background: rgba(246,241,232,.97);
 backdrop-filter: blur(14px);
 box-shadow: 0 2px 24px rgba(0,0,0,.07);
 border-bottom: 1px solid rgba(0,0,0,.06);
}
.nav-links { display: none; align-items: center; gap: 28px; }
.nav-link {
 font-size: .82rem; font-weight: 500; letter-spacing: .05em;
 color: var(--sl2); position: relative; transition: color .2s;
}
.nav-link::after {
 content: ''; position: absolute; bottom: -3px; left: 0;
 width: 0; height: 1px; background: var(--go); transition: width .3s;
}
.nav-link:hover { color: var(--fo); }
.nav-link:hover::after { width: 100%; }
.logo-mark { display: flex; align-items: center; gap: 13px; min-width: 0; }
.logo-text-main { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; font-weight: 700; letter-spacing: .18em; color: var(--sl); line-height: 1; }
.logo-text-sub { font-size: .7rem; font-weight: 700; letter-spacing: .3em; color: var(--fo); text-transform: uppercase; margin-top: 5px; }

/* ── Buttons ── */
.btn {
 display: inline-flex; align-items: center; justify-content: center;
 gap: 8px; border: none; cursor: pointer; font-family: 'Figtree', sans-serif;
 font-weight: 500; letter-spacing: .08em; text-transform: uppercase;
 text-decoration: none; white-space: normal; transition: all .3s ease;
 padding: 14px 28px; font-size: .82rem; border-radius: 0;
 min-height: 44px; min-width: 44px; line-height: 1.35; text-align: center;
}
.btn-fo { background: var(--fo); color: var(--iv); }
.btn-fo:hover { background: var(--fo2); box-shadow: 0 10px 36px rgba(13,40,24,.26); transform: translateY(-2px); }
.btn-go { background: var(--go); color: var(--fo); }
.btn-go:hover { background: var(--go2); box-shadow: 0 10px 36px rgba(200,168,75,.32); transform: translateY(-2px); }
.btn-ol { background: transparent; color: var(--fo); border: 1.5px solid var(--fo); }
.btn-ol:hover { background: var(--fo); color: var(--iv); transform: translateY(-2px); }
.btn-ol-lt { background: transparent; color: var(--iv); border: 1.5px solid rgba(246,241,232,.35); }
.btn-ol-lt:hover { background: rgba(246,241,232,.1); border-color: var(--go); color: var(--go3); transform: translateY(-2px); }
.btn-full { width: 100%; }

/* ── Layout utils ── */
.wrap { max-width: var(--max); margin: 0 auto; padding: 0 var(--pad); }
.sec { padding: 80px var(--pad); }
.bg-iv { background: var(--iv); }
.bg-wh { background: var(--wh); }
.bg-fo { background: var(--fo); }
.bg-sl { background: var(--sl); }
.bg-iv2 { background: var(--iv2); }
.text-center { text-align: center; }

/* ── Labels & rules ── */
.lbl {
 font-family: 'Figtree', sans-serif;
 font-size: .68rem; font-weight: 600;
 letter-spacing: .26em; text-transform: uppercase; color: var(--go);
}
.rule { width: 48px; height: 1px; background: var(--go); margin: 16px 0; }
.rule-c { margin: 16px auto; }

/* ── Trust badges ── */
.badge-row { display: flex; flex-wrap: wrap; gap: 8px; }
.badge {
 display: inline-flex; align-items: center; gap: 8px;
 padding: 8px 16px;
 border: 1px solid rgba(200,168,75,.38);
 background: rgba(200,168,75,.07);
 font-size: .68rem; font-weight: 600;
 letter-spacing: .14em; text-transform: uppercase; color: var(--fo);
}

/* ── GRID SYSTEM — mobile first, all breakpoints in media queries ── */
.g2 { display: grid; grid-template-columns: 1fr; gap: 28px; }
.g3 { display: grid; grid-template-columns: 1fr; gap: 24px; }
.g4 { display: grid; grid-template-columns: 1fr; gap: 20px; }
.g2s { display: grid; grid-template-columns: 1fr; gap: 20px; }
.gproc { display: grid; grid-template-columns: 1fr; gap: 0; }

/* ── Cards ── */
.card {
 background: var(--wh); border: 1px solid rgba(0,0,0,.07);
 padding: 32px; transition: box-shadow .3s, transform .3s;
 overflow-wrap: anywhere;
}
.card:hover { box-shadow: 0 18px 56px rgba(13,40,24,.09); transform: translateY(-3px); }
.card-iv { background: var(--iv); border: 1px solid rgba(0,0,0,.07); padding: 32px; }
.card-fo { background: var(--fo); border: 1px solid var(--fo); padding: 32px; }
.card-featured { background: var(--fo); border-color: var(--fo); }

/* ── Score pills ── */
.spill { display: inline-flex; align-items: center; padding: 3px 10px; font-size: .7rem; font-weight: 600; letter-spacing: .07em; }
.spill-r { background: #fdf0f0; color: var(--red); border: 1px solid #f5c0c0; }
.spill-a { background: #fef9f0; color: var(--amr); border: 1px solid #f5dcb0; }
.spill-g { background: #f0fdf5; color: var(--grn); border: 1px solid #b0dfbe; }

/* ── Section headers ── */
.sh { margin-bottom: 60px; }
.sh-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.9rem, 4.5vw, 2.9rem); font-weight: 500; color: var(--sl); line-height: 1.2; }
.sh-body { font-size: .93rem; color: var(--sl2); max-width: 560px; margin: 16px auto 0; line-height: 1.95; }

/* ── Plan pricing ── */
.plan-pill { position: absolute; top: -11px; left: 32px; font-size: .64rem; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; background: var(--go); color: var(--fo); padding: 4px 13px; }
.plan-price { font-family: 'Cormorant Garamond', serif; font-size: 3rem; font-weight: 400; line-height: 1; color: var(--fo); }
.card-featured .plan-price { color: var(--go2); }
.plan-cadence { font-size: .68rem; font-weight: 600; letter-spacing: .2em; text-transform: uppercase; color: var(--go); margin-bottom: 10px; }
.card-featured .plan-cadence { color: var(--go2); }

/* ── Checklist ── */
.chk { list-style: none; }
.chk li { display: flex; align-items: flex-start; gap: 11px; padding: 5px 0; font-size: .88rem; color: var(--sl2); }
.chk li::before { content: '✓'; color: var(--fo); font-weight: 700; flex-shrink: 0; margin-top: 2px; }
.card-fo .chk li, .card-featured .chk li { color: rgba(246,241,232,.72); }
.card-fo .chk li::before, .card-featured .chk li::before { color: var(--go2); }

/* ── Form fields ── */
.form-field {
 padding: 13px 15px; border: 1px solid rgba(0,0,0,.11);
 background: var(--iv); width: 100%; min-height: 44px;
 font-family: 'Figtree', sans-serif; font-size: .95rem; font-weight: 300;
 color: var(--sl); outline: none; transition: border-color .2s;
 -webkit-appearance: none; appearance: none;
}
.form-field:focus { border-color: var(--fo); }
.form-select {
 background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%230d2818' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
 background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px;
}

/* ── Doc card ── */
.doc-card { background: var(--wh); border: 1px solid rgba(0,0,0,.07); border-top: 3px solid var(--go); padding: 32px; transition: all .3s; }
.doc-card:hover { box-shadow: 0 18px 56px rgba(13,40,24,.09); transform: translateY(-2px); }
.doc-avatar { width: 56px; height: 56px; background: linear-gradient(135deg, var(--fo), var(--fo3)); display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 500; color: var(--go2); }
.doc-tag { font-size: .67rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--go); background: rgba(200,168,75,.09); border: 1px solid rgba(200,168,75,.22); padding: 4px 12px; }
.doc-name { font-family: 'Cormorant Garamond', serif; font-size: 1.48rem; font-weight: 500; color: var(--sl); margin-bottom: 3px; }
.doc-creds { font-size: .74rem; font-weight: 600; letter-spacing: .1em; color: var(--go); margin-bottom: 3px; }
.doc-role { font-size: .8rem; color: var(--fo2); margin-bottom: 16px; }
.doc-bio { font-size: .87rem; color: var(--sl2); line-height: 1.9; }

/* ── CQC strip ── */
.cqc-strip { background: var(--fo); padding: 24px 28px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 20px; margin-top: 40px; }
.cqc-item { display: flex; align-items: center; gap: 11px; }
.cqc-label { font-size: .68rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--go2); }
.cqc-sub { font-size: .68rem; color: rgba(246,241,232,.36); }

/* ── Progress bar (quiz) ── */
.prog-track { height: 4px; background: var(--iv2); width: 100%; }
.prog-fill { height: 100%; background: var(--go); transition: width .5s ease; }

/* ── Quiz option buttons ── */
.q-opt {
 width: 100%; text-align: left; padding: 16px 20px;
 background: var(--wh); border: 1.5px solid rgba(0,0,0,.1);
 font-family: 'Figtree', sans-serif; font-size: .93rem;
 font-weight: 400; color: var(--sl); cursor: pointer;
 transition: all .22s ease; display: flex; align-items: center; gap: 14px;
 min-height: 56px;
}
.q-opt:hover { border-color: var(--fo); background: rgba(13,40,24,.03); }
.q-opt.selected { border-color: var(--fo); background: var(--fo); color: var(--iv); }
.q-opt-letter {
 width: 28px; height: 28px; border: 1.5px solid currentColor;
 display: flex; align-items: center; justify-content: center;
 font-size: .75rem; font-weight: 600; letter-spacing: .08em; flex-shrink: 0;
}

/* ── Intake steps ── */
.intake-step {
 display: flex; align-items: flex-start; gap: 20px;
 padding: 24px; background: var(--wh); border: 1px solid rgba(0,0,0,.07);
 transition: all .3s;
}
.intake-step:hover { box-shadow: 0 12px 36px rgba(13,40,24,.08); transform: translateY(-2px); }
.intake-num {
 width: 40px; height: 40px; background: var(--fo); color: var(--go2);
 display: flex; align-items: center; justify-content: center;
 font-family: 'Cormorant Garamond', serif; font-size: 1.2rem;
 font-weight: 500; flex-shrink: 0;
}

/* ── FAQ ── */
.faq-btn { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 20px 0; background: none; border: none; cursor: pointer; text-align: left; border-bottom: 1px solid rgba(0,0,0,.08); }
.faq-q { font-size: .93rem; font-weight: 500; color: var(--sl); padding-right: 18px; line-height: 1.5; }
.faq-icon { font-size: 1.35rem; color: var(--go); flex-shrink: 0; transition: transform .3s; display: inline-block; }
.faq-a { font-size: .87rem; color: var(--sl2); line-height: 1.9; padding: 14px 0 20px; }

/* ── SC bar ── */
.sc-bar-track { height: 5px; background: var(--iv2); }
.sc-bar-fill { height: 100%; animation: bar 1.4s .6s ease both; }
.fill-red { background: var(--red); }
.fill-amr { background: var(--amr); }
.fill-grn { background: var(--grn); }

/* ── Ticker ── */
.ticker-wrap { overflow: hidden; white-space: nowrap; padding: 16px 0; border-top: 1px solid rgba(0,0,0,.07); border-bottom: 1px solid rgba(0,0,0,.07); }
.ticker-inner { display: inline-flex; will-change: transform; animation: marq 32s linear infinite; }
.ticker-item { font-size: .76rem; font-weight: 500; letter-spacing: .16em; text-transform: uppercase; color: var(--sl3); padding: 0 44px; }
.ticker-dot { color: var(--go); }

/* ── Mobile nav ── */
.mob-btn { background: none; border: none; cursor: pointer; color: var(--sl); font-size: 1.35rem; padding: 10px; min-width: 44px; min-height: 44px; display: inline-flex; align-items: center; justify-content: center; }
.mob-menu { background: var(--iv); border-top: 1px solid rgba(0,0,0,.07); padding: 12px 24px 22px; }
.mob-link { display: block; padding: 14px 0; font-size: .98rem; color: var(--sl); border-bottom: 1px solid rgba(0,0,0,.05); min-height: 44px; }

/* ── Footer ── */
.footer-link { font-size: .72rem; color: rgba(246,241,232,.22); text-decoration: none; transition: color .2s; }
.footer-link:hover { color: rgba(246,241,232,.5); }

/* ── Lead forms ── */
.lead-label {
 display: block;
 font-size: .7rem;
 font-weight: 600;
 letter-spacing: .12em;
 text-transform: uppercase;
 color: var(--sl3);
 margin-bottom: 8px;
}

/* ── Vline ── */
.vline { width: 1px; height: 64px; background: linear-gradient(to bottom, transparent, var(--go), transparent); margin: 0 auto 24px; }

/* ════════════════════════════════════════════════
 TABLET 640px+
 ════════════════════════════════════════════════ */
@media (min-width: 640px) {
 :root { --pad: 28px; }
 .g3 { grid-template-columns: repeat(2, 1fr); }
 .g2s { grid-template-columns: repeat(2, 1fr); }
 .gproc { grid-template-columns: repeat(2, 1fr); gap: 0 40px; }
 .sec { padding: 88px var(--pad); }
}

/* ════════════════════════════════════════════════
 DESKTOP 900px+
 ════════════════════════════════════════════════ */
@media (min-width: 900px) {
 :root { --pad: 40px; }
 .nav-links { display: flex; }
 .mob-btn { display: none; }
 .g2 { grid-template-columns: 1fr 1fr; gap: 32px; }
 .g2-wide { grid-template-columns: 1fr 1.35fr; gap: 72px; }
 .g2-hero { grid-template-columns: 1.05fr .95fr; gap: 64px; }
 .g3 { grid-template-columns: repeat(3, 1fr); gap: 24px; }
 .g4 { grid-template-columns: repeat(4, 1fr); gap: 20px; }
 .gproc { grid-template-columns: repeat(4, 1fr); gap: 0 32px; }
 .sec { padding: 100px var(--pad); }
}

/* ════════════════════════════════════════════════
 MOBILE overrides
 ════════════════════════════════════════════════ */
@media (max-width: 639px) {
 :root { --pad: 16px; --nav-h: 72px; }
 .plan-price { font-size: 2.4rem; }
 .btn { width: 100%; font-size: .8rem; padding: 13px 18px; letter-spacing: .06em; }
 .badge { padding: 7px 12px; font-size: .62rem; letter-spacing: .11em; }
 .card, .card-iv, .card-fo { padding: 20px; }
 .sec { padding: 64px var(--pad); }
 .sh { margin-bottom: 40px; }
 .sh-body { font-size: .92rem; }
 .nav { background: rgba(246,241,232,.97); backdrop-filter: blur(14px); box-shadow: 0 2px 24px rgba(0,0,0,.05); border-bottom: 1px solid rgba(0,0,0,.06); }
 .nav-inner { padding: 0 var(--pad); }
 .logo-mark svg { width: 28px; height: 28px; flex-shrink: 0; }
 .logo-text-main { font-size: 1.3rem; letter-spacing: .14em; }
 .logo-text-sub { font-size: .62rem; letter-spacing: .24em; }
 .ticker-item { padding: 0 24px; font-size: .68rem; }
 .cqc-strip { padding: 20px; }
 table { min-width: 680px !important; }
 }
`;