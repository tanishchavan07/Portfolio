import { useState, useEffect, useRef, useCallback } from "react";

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const PROFILE = {
  name: "Tanish Santosh Chavan",
  role: "MERN Stack Developer",
  location: "Navi Mumbai, Maharashtra, India",
  email: "tanishchavan06@gmail.com",
  phone: "+91 9137770667",
  github: "https://github.com/tanishchavan07",
  linkedin: "https://www.linkedin.com/in/tanish-chavan-6733ab337",
};

const TYPING_WORDS = ["MERN Stack Apps","RESTful APIs","React Interfaces","Full-Stack Systems","Scalable Backends","Clean UI/UX"];

const PROJECTS = [
  {
    title: "Git Score",
    subtitle: "GitHub Analyzer & Developer Scoring",
    icon: "⚡",
    accent: "#00d4ff",
    live: "https://git-score-sandy.vercel.app/",
    tech: ["React.js","Node.js","Express.js","MongoDB","GitHub API","Gemini AI","JWT"],
    features: ["Developer scoring (0–100)","Real-time GitHub API","AI insights via Gemini","Role classification","Global leaderboard","JWT auth"],
  },
  {
    title: "Clinic Management",
    subtitle: "Full-Stack Healthcare System",
    icon: "🏥",
    accent: "#00ff9d",
    live: "https://clinic-one-rosy.vercel.app/",
    tech: ["React.js","Node.js","Express.js","MongoDB","JWT"],
    features: ["Role-based access control","Appointment lifecycle","Billing & payments","PDF report generation","Secure auth"],
  },
  {
    title: "Zoo Management",
    subtitle: "Enterprise Zoo Operations",
    icon: "🦁",
    accent: "#ff6b35",
    live: null,
    tech: ["Java","Servlets","JSP","MySQL"],
    features: ["Full CRUD operations","Role-based login","Caretaker management","Visitor feedback"],
  },
];

const SKILLS = {
  "Languages":  { icon:"💻", items:["JavaScript","Java","Python"] },
  "Frameworks": { icon:"⚙️", items:["React.js","Node.js","Express.js","Servlets","JSP"] },
  "Databases":  { icon:"🗄️", items:["MongoDB","MySQL"] },
  "Tools":      { icon:"🔧", items:["Git","GitHub","Postman","REST APIs","Vercel","Render"] },
};

const EDUCATION = [
  { degree:"BSc Computer Science", place:"Pillai College, Navi Mumbai", year:"2024–2027", score:"CGPA: 9.56", icon:"🎓" },
  { degree:"HSC Science", place:"Maharashtra Board", year:"2024", score:"82.83%", icon:"📚" },
];

/* ══════════════════════════════════════════
   GLOBAL CSS
══════════════════════════════════════════ */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --black:#000000;
  --black2:#050505;
  --black3:#0a0a0a;
  --black4:#0f0f0f;
  --glass:rgba(255,255,255,0.03);
  --glass2:rgba(255,255,255,0.06);
  --border:rgba(255,255,255,0.08);
  --border2:rgba(255,255,255,0.14);
  --c1:#00d4ff;
  --c2:#7c3aed;
  --c3:#00ff9d;
  --c4:#ff6b35;
  --text:#f0f0f0;
  --muted:#666;
  --muted2:#999;
  --head:'Orbitron',monospace;
  --body:'Space Grotesk',sans-serif;
}
html{scroll-behavior:smooth;font-size:16px}
body{background:var(--black);color:var(--text);font-family:var(--body);overflow-x:hidden;-webkit-font-smoothing:antialiased}
::selection{background:var(--c1);color:#000}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:#000}
::-webkit-scrollbar-thumb{background:linear-gradient(var(--c1),var(--c2));border-radius:4px}

/* ── LOADER ── */
.loader{position:fixed;inset:0;background:#000;z-index:9999;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:24px;transition:opacity .6s,visibility .6s}
.loader.out{opacity:0;visibility:hidden}
.loader-cube{width:60px;height:60px;transform-style:preserve-3d;animation:rotateCube 2s linear infinite}
.loader-cube div{position:absolute;width:60px;height:60px;border:1px solid rgba(0,212,255,.4);display:flex;align-items:center;justify-content:center;font-size:1.5rem}
.f{background:rgba(0,212,255,.05);transform:translateZ(30px)}
.b{background:rgba(124,58,237,.05);transform:rotateY(180deg) translateZ(30px)}
.l{background:rgba(0,255,157,.05);transform:rotateY(-90deg) translateZ(30px)}
.r{background:rgba(255,107,53,.05);transform:rotateY(90deg) translateZ(30px)}
.t{background:rgba(0,212,255,.05);transform:rotateX(90deg) translateZ(30px)}
.bo{background:rgba(124,58,237,.05);transform:rotateX(-90deg) translateZ(30px)}
@keyframes rotateCube{to{transform:rotateX(360deg) rotateY(360deg) rotateZ(360deg)}}
.loader-txt{font-family:var(--head);font-size:.7rem;letter-spacing:6px;color:var(--muted);animation:blink 1.2s infinite}

/* ── NAV ── */
nav{position:fixed;top:0;left:0;right:0;z-index:500;display:flex;align-items:center;justify-content:space-between;padding:24px 64px;transition:all .4s}
nav.scrolled{background:rgba(0,0,0,.92);backdrop-filter:blur(24px);border-bottom:1px solid var(--border);padding:16px 64px}
.logo{font-family:var(--head);font-size:1.2rem;font-weight:900;background:linear-gradient(135deg,var(--c1),var(--c2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;cursor:pointer;letter-spacing:2px}
.nav-links{list-style:none;display:flex;gap:40px}
.nav-links a{color:var(--muted);text-decoration:none;font-size:.82rem;letter-spacing:1px;text-transform:uppercase;cursor:pointer;transition:color .3s;position:relative;padding-bottom:3px}
.nav-links a::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:var(--c1);transition:width .3s}
.nav-links a:hover{color:var(--text)}
.nav-links a:hover::after{width:100%}
.nav-r{display:flex;gap:10px;align-items:center}
.btn-icon{width:38px;height:38px;border-radius:50%;background:var(--glass);border:1px solid var(--border);color:var(--text);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:.9rem;transition:all .3s}
.btn-icon:hover{background:var(--c1);color:#000;border-color:var(--c1);transform:scale(1.1)}
.hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:6px}
.hamburger span{width:22px;height:1.5px;background:var(--text);transition:all .3s;border-radius:2px}
.mob-menu{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.97);z-index:499;flex-direction:column;align-items:center;justify-content:center;gap:32px}
.mob-menu.open{display:flex}
.mob-menu a{font-family:var(--head);font-size:1.8rem;color:var(--text);text-decoration:none;letter-spacing:4px;transition:color .3s}
.mob-menu a:hover{color:var(--c1)}

/* ── HERO ── */
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:120px 64px 80px;text-align:center;position:relative;z-index:1}
.hero-tag{display:inline-flex;align-items:center;gap:8px;background:var(--glass);border:1px solid var(--border2);backdrop-filter:blur(20px);padding:9px 22px;border-radius:100px;font-size:.72rem;letter-spacing:3px;color:var(--c1);text-transform:uppercase;margin-bottom:32px;animation:fadeDown .8s ease both}
.hero-tag-dot{width:7px;height:7px;border-radius:50%;background:var(--c3);animation:glow 2s infinite}
@keyframes glow{0%,100%{box-shadow:0 0 0 0 rgba(0,255,157,.5)}50%{box-shadow:0 0 0 8px rgba(0,255,157,0)}}
.hero-name{font-family:var(--head);font-size:clamp(2.5rem,7vw,6.5rem);font-weight:900;line-height:1;letter-spacing:-2px;background:linear-gradient(135deg,#fff 0%,var(--c1) 40%,var(--c2) 80%,#fff 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:fadeUp .9s .2s both,shimmer 4s 1s linear infinite}
@keyframes shimmer{to{background-position:200% center}}
.hero-role{margin-top:20px;font-size:clamp(1rem,2.5vw,1.4rem);color:var(--muted);display:flex;align-items:center;justify-content:center;gap:10px;animation:fadeUp .9s .35s both;height:2em}
.typing{color:var(--c1);font-weight:600}
.cursor{display:inline-block;width:2px;height:1.1em;background:var(--c1);margin-left:2px;animation:blink .65s infinite;vertical-align:middle}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
.hero-summary{max-width:580px;margin:24px auto 0;line-height:1.8;color:var(--muted);font-size:.93rem;animation:fadeUp .9s .5s both}
.hero-btns{display:flex;gap:16px;margin-top:40px;justify-content:center;flex-wrap:wrap;animation:fadeUp .9s .65s both}
.btn-main{padding:14px 36px;border-radius:100px;border:none;cursor:pointer;font-family:var(--body);font-size:.88rem;font-weight:600;background:linear-gradient(135deg,var(--c1),var(--c2));color:#fff;position:relative;overflow:hidden;transition:transform .2s,box-shadow .3s;text-decoration:none;display:inline-flex;align-items:center;gap:8px}
.btn-main::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,transparent,rgba(255,255,255,.2));opacity:0;transition:opacity .3s}
.btn-main:hover{transform:translateY(-3px);box-shadow:0 0 50px rgba(0,212,255,.5)}
.btn-main:hover::before{opacity:1}
.btn-ghost{padding:14px 36px;border-radius:100px;cursor:pointer;font-family:var(--body);font-size:.88rem;font-weight:600;background:transparent;border:1px solid var(--border2);color:var(--text);transition:all .3s;text-decoration:none;display:inline-flex;align-items:center;gap:8px}
.btn-ghost:hover{border-color:var(--c1);color:var(--c1);box-shadow:0 0 30px rgba(0,212,255,.15);transform:translateY(-3px)}
.hero-socials{display:flex;gap:14px;margin-top:36px;animation:fadeUp .9s .8s both}
.soc{width:44px;height:44px;border-radius:50%;background:var(--glass);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;text-decoration:none;color:var(--muted);transition:all .35s}
.soc:hover{background:var(--c1);color:#000;border-color:var(--c1);transform:translateY(-4px) scale(1.1);box-shadow:0 0 24px rgba(0,212,255,.4)}
.hero-scroll{position:absolute;bottom:32px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;animation:fadeIn 1s 1.2s both}
.scroll-txt{font-family:var(--head);font-size:.55rem;letter-spacing:4px;color:var(--muted)}
.scroll-bar{width:1px;height:48px;background:linear-gradient(var(--c1),transparent);animation:scrollPulse 2s infinite}
@keyframes scrollPulse{0%{transform:scaleY(0);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}51%{transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}

/* ── SECTION ── */
.sec{position:relative;z-index:1}
.sw{max-width:1200px;margin:0 auto;padding:100px 64px}
.sec-tag{display:inline-flex;align-items:center;gap:12px;font-size:.7rem;letter-spacing:4px;text-transform:uppercase;color:var(--c1);font-family:var(--head);margin-bottom:16px}
.sec-tag::before{content:'';width:32px;height:1px;background:var(--c1)}
.sec-title{font-family:var(--head);font-size:clamp(2rem,5vw,3.5rem);font-weight:900;letter-spacing:-1px;line-height:1.05;margin-bottom:64px}
.sec-title span{background:linear-gradient(135deg,var(--c1),var(--c2));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.divider{width:100%;height:1px;background:linear-gradient(90deg,transparent,var(--border2),transparent)}

/* ── ABOUT ── */
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
.about-visual{display:flex;align-items:center;justify-content:center}
.orb-scene{width:300px;height:300px;perspective:600px;cursor:pointer}
.orb-3d{width:100%;height:100%;transform-style:preserve-3d;transition:transform .1s ease-out;border-radius:50%;position:relative}
.orb-core{position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 35% 35%,#1a1a2e 0%,#000 70%);border:1px solid rgba(0,212,255,.15);overflow:hidden}
.orb-ring{position:absolute;border-radius:50%;border:1px solid;animation:orbitRing 6s linear infinite}
.orb-ring:nth-child(1){inset:10px;border-color:rgba(0,212,255,.3);animation-duration:4s}
.orb-ring:nth-child(2){inset:30px;border-color:rgba(124,58,237,.3);animation-duration:6s;animation-direction:reverse}
.orb-ring:nth-child(3){inset:60px;border-color:rgba(0,255,157,.2);animation-duration:8s}
@keyframes orbitRing{to{transform:rotate(360deg)}}
.orb-glow{position:absolute;inset:-20px;border-radius:50%;background:radial-gradient(circle,rgba(0,212,255,.12) 0%,transparent 70%);animation:pulseGlow 3s ease-in-out infinite}
@keyframes pulseGlow{0%,100%{opacity:.6}50%{opacity:1}}
.orb-emoji{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:4rem}
.about-text p{color:var(--muted);line-height:1.8;margin-bottom:18px;font-size:.95rem}
.about-stats{display:flex;gap:24px;margin:28px 0}
.stat{text-align:center;background:var(--glass);border:1px solid var(--border);border-radius:16px;padding:20px 24px;flex:1;transition:all .3s}
.stat:hover{border-color:var(--c1);background:rgba(0,212,255,.04);transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,212,255,.1)}
.stat-n{font-family:var(--head);font-size:2rem;font-weight:900;background:linear-gradient(135deg,var(--c1),var(--c2));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.stat-l{font-size:.72rem;color:var(--muted);letter-spacing:2px;margin-top:6px;text-transform:uppercase}
.edu-list{display:flex;flex-direction:column;gap:16px;margin-top:32px}
.edu-item{background:var(--glass);border:1px solid var(--border);border-radius:16px;padding:20px 24px;display:flex;gap:18px;align-items:center;transition:all .3s}
.edu-item:hover{border-color:var(--c1);transform:translateX(8px);box-shadow:0 0 30px rgba(0,212,255,.08)}
.edu-icon{font-size:1.8rem;width:48px;height:48px;background:var(--glass2);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.edu-deg{font-family:var(--head);font-size:.95rem;font-weight:700;margin-bottom:4px}
.edu-inst{color:var(--muted);font-size:.82rem}
.edu-meta{display:flex;gap:14px;margin-top:6px;font-size:.75rem;color:var(--c1);font-family:var(--head)}

/* ── SKILLS ── */
.skills-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px}
.skill-box{background:var(--glass);border:1px solid var(--border);border-radius:20px;padding:28px;transition:all .4s cubic-bezier(.175,.885,.32,1.275);cursor:default;position:relative;overflow:hidden}
.skill-box::before{content:'';position:absolute;top:-100%;left:-100%;width:300%;height:300%;background:conic-gradient(from 0deg,transparent 0deg,rgba(0,212,255,.03) 60deg,transparent 120deg);animation:rotateBg 8s linear infinite;opacity:0;transition:opacity .4s}
.skill-box:hover{border-color:var(--c1);transform:translateY(-8px) rotateX(5deg) rotateY(-3deg);box-shadow:0 30px 80px rgba(0,212,255,.12),0 0 0 1px rgba(0,212,255,.1);background:rgba(0,212,255,.03)}
.skill-box:hover::before{opacity:1}
@keyframes rotateBg{to{transform:rotate(360deg)}}
.skill-head{display:flex;align-items:center;gap:12px;margin-bottom:18px}
.skill-icon{font-size:1.4rem;width:42px;height:42px;background:var(--glass2);border-radius:12px;display:flex;align-items:center;justify-content:center}
.skill-cat{font-family:var(--head);font-size:.8rem;font-weight:700;color:var(--c1);letter-spacing:2px;text-transform:uppercase}
.tags{display:flex;flex-wrap:wrap;gap:8px}
.tag{padding:7px 15px;border-radius:100px;font-size:.78rem;font-weight:500;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:var(--text);transition:all .25s}
.tag:hover{background:var(--c1);color:#000;border-color:var(--c1);transform:scale(1.08);box-shadow:0 0 16px rgba(0,212,255,.4)}

/* ── PROJECTS ── */
.proj-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(360px,1fr));gap:28px}
.proj-card{background:var(--black3);border:1px solid var(--border);border-radius:24px;overflow:hidden;position:relative;cursor:default;transition:border-color .4s}
.proj-glow{position:absolute;inset:0;opacity:0;transition:opacity .5s;pointer-events:none;border-radius:24px}
.proj-card:hover .proj-glow{opacity:1}
.proj-head{padding:28px 28px 0}
.proj-ic{width:56px;height:56px;border-radius:16px;font-size:1.8rem;display:flex;align-items:center;justify-content:center;margin-bottom:18px}
.proj-t{font-family:var(--head);font-size:1.3rem;font-weight:900;margin-bottom:6px;letter-spacing:1px}
.proj-sub{color:var(--muted);font-size:.83rem;line-height:1.5}
.proj-feats{padding:20px 28px}
.proj-feats ul{list-style:none;display:flex;flex-direction:column;gap:9px}
.proj-feats li{display:flex;align-items:flex-start;gap:10px;font-size:.82rem;color:var(--muted2)}
.proj-feats li::before{content:'▸';flex-shrink:0;margin-top:1px;font-size:.7rem}
.proj-stack{padding:0 28px;display:flex;flex-wrap:wrap;gap:8px}
.stack-tag{padding:5px 12px;border-radius:100px;font-size:.7rem;font-weight:600;border:1px solid var(--border);color:var(--muted);font-family:var(--head);letter-spacing:.5px}
.proj-btns{padding:20px 28px 28px;display:flex;gap:12px}
.btn-live{flex:1;padding:11px;border-radius:100px;border:none;cursor:pointer;font-family:var(--body);font-size:.8rem;font-weight:600;display:flex;align-items:center;justify-content:center;gap:6px;transition:all .3s;text-decoration:none}
.btn-code{padding:11px 20px;border-radius:100px;background:var(--glass);border:1px solid var(--border);color:var(--text);font-family:var(--body);font-size:.8rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:6px;transition:all .3s;text-decoration:none}
.btn-code:hover{border-color:var(--text)}

/* ── CONTACT ── */
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start}
.contact-links{display:flex;flex-direction:column;gap:14px}
.c-link{display:flex;align-items:center;gap:18px;background:var(--glass);border:1px solid var(--border);border-radius:16px;padding:18px 22px;text-decoration:none;color:var(--text);transition:all .3s}
.c-link:hover{border-color:var(--c1);transform:translateX(8px);box-shadow:0 0 30px rgba(0,212,255,.08)}
.c-link-ic{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0}
.c-link-label{font-size:.7rem;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;font-family:var(--head)}
.c-link-val{font-weight:500;font-size:.88rem}
.contact-cta{background:var(--glass);border:1px solid var(--border);border-radius:24px;padding:40px}
.contact-cta h3{font-family:var(--head);font-size:1.6rem;font-weight:900;margin-bottom:14px;letter-spacing:-1px;line-height:1.2}
.contact-cta p{color:var(--muted);line-height:1.75;margin-bottom:28px;font-size:.9rem}
.cta-socials{display:flex;gap:12px;margin-top:28px;padding-top:28px;border-top:1px solid var(--border)}

/* ── FOOTER ── */
footer{position:relative;z-index:1;text-align:center;padding:48px 20px;border-top:1px solid var(--border);color:var(--muted);font-size:.82rem}
footer span{color:var(--c1)}

/* ── SCROLL TOP ── */
.scroll-top{position:fixed;bottom:32px;right:32px;z-index:600;width:48px;height:48px;border-radius:50%;border:none;cursor:pointer;background:linear-gradient(135deg,var(--c2),var(--c1));color:#fff;font-size:1.1rem;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:all .35s;box-shadow:0 0 24px rgba(0,212,255,.35)}
.scroll-top.show{opacity:1;pointer-events:auto}
.scroll-top:hover{transform:translateY(-4px) scale(1.12)}

/* ── REVEAL ── */
.rev{opacity:0;transform:translateY(50px);transition:opacity .8s ease,transform .8s ease}
.rev.on{opacity:1;transform:none}
.rev-l{opacity:0;transform:translateX(-50px);transition:opacity .8s ease,transform .8s ease}
.rev-l.on{opacity:1;transform:none}
.rev-r{opacity:0;transform:translateX(50px);transition:opacity .8s ease,transform .8s ease}
.rev-r.on{opacity:1;transform:none}
.rev-3d{opacity:0;transform:rotateX(30deg) translateY(40px);transform-origin:top;transition:opacity .9s ease,transform .9s ease}
.rev-3d.on{opacity:1;transform:none}

/* ── KEYFRAMES ── */
@keyframes fadeDown{from{opacity:0;transform:translateY(-24px)}to{opacity:1;transform:none}}
@keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:none}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}

/* ── RESPONSIVE ── */
@media(max-width:900px){
  nav{padding:16px 24px}
  nav.scrolled{padding:12px 24px}
  .nav-links{display:none}
  .hamburger{display:flex}
  .hero{padding:90px 24px 60px}
  .sw{padding:70px 24px}
  .about-grid,.contact-grid{grid-template-columns:1fr}
  .about-visual{display:none}
  .proj-grid{grid-template-columns:1fr}
}
`;

/* ══════════════════════════════════════════
   3D WEBGL PARTICLE FIELD
══════════════════════════════════════════ */
function WebGLField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let mouse = [0.5, 0.5];
    let t = 0;

    const vert = `
      attribute vec3 a_pos;
      attribute float a_size;
      attribute vec3 a_col;
      uniform mat4 u_mvp;
      uniform float u_time;
      varying vec3 v_col;
      varying float v_alpha;
      void main(){
        vec3 pos = a_pos;
        pos.z += sin(u_time * 0.5 + a_pos.x * 2.0) * 0.2;
        gl_Position = u_mvp * vec4(pos, 1.0);
        gl_PointSize = a_size * (2.0 / gl_Position.w);
        v_col = a_col;
        v_alpha = 0.4 + 0.4 * sin(u_time * 0.8 + a_pos.y * 3.0);
      }`;
    const frag = `
      precision mediump float;
      varying vec3 v_col;
      varying float v_alpha;
      void main(){
        vec2 c = gl_PointCoord - 0.5;
        float d = length(c);
        if(d > 0.5) discard;
        float a = smoothstep(0.5, 0.1, d) * v_alpha;
        gl_FragColor = vec4(v_col, a);
      }`;

    const compile = (type, src) => {
      const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog); gl.useProgram(prog);

    const N = 500;
    const pos = new Float32Array(N * 3);
    const sizes = new Float32Array(N);
    const cols = new Float32Array(N * 3);
    const palettes = [[0,0.83,1],[0.48,0.23,0.93],[0,1,0.62],[1,0.42,0.21]];

    for (let i = 0; i < N; i++) {
      pos[i*3]   = (Math.random()-0.5)*4;
      pos[i*3+1] = (Math.random()-0.5)*4;
      pos[i*3+2] = (Math.random()-0.5)*4;
      sizes[i] = Math.random()*6+2;
      const p = palettes[Math.floor(Math.random()*palettes.length)];
      cols[i*3]=p[0]; cols[i*3+1]=p[1]; cols[i*3+2]=p[2];
    }

    const mkBuf = (data, attr) => {
      const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, attr);
      gl.enableVertexAttribArray(loc);
      const comp = data.length / N;
      gl.vertexAttribPointer(loc, comp, gl.FLOAT, false, 0, 0);
    };
    mkBuf(pos, "a_pos"); mkBuf(sizes, "a_size"); mkBuf(cols, "a_col");

    const mvpLoc = gl.getUniformLocation(prog, "u_mvp");
    const timeLoc = gl.getUniformLocation(prog, "u_time");

    const mat4mul = (a, b) => {
      const r = new Float32Array(16);
      for (let i=0;i<4;i++) for (let j=0;j<4;j++) for (let k=0;k<4;k++) r[i*4+j]+=a[i*4+k]*b[k*4+j];
      return r;
    };
    const perspective = (fov, asp, near, far) => {
      const f = 1/Math.tan(fov/2), d = far-near;
      return new Float32Array([f/asp,0,0,0, 0,f,0,0, 0,0,-(far+near)/d,-1, 0,0,-2*far*near/d,0]);
    };
    const rotY = a => new Float32Array([Math.cos(a),0,Math.sin(a),0, 0,1,0,0, -Math.sin(a),0,Math.cos(a),0, 0,0,0,1]);
    const rotX = a => new Float32Array([1,0,0,0, 0,Math.cos(a),-Math.sin(a),0, 0,Math.sin(a),Math.cos(a),0, 0,0,0,1]);
    const trans = (x,y,z) => new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, x,y,z,1]);

    window.addEventListener("mousemove", e => { mouse=[e.clientX/w,e.clientY/h]; });
    window.addEventListener("resize", () => { w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight; gl.viewport(0,0,w,h); });
    gl.viewport(0,0,w,h); gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let raf;
    const draw = () => {
      t += 0.008;
      gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT);
      const rx = (mouse[1]-0.5)*0.6;
      const ry = (mouse[0]-0.5)*0.6 + t*0.1;
      const proj = perspective(0.9, w/h, 0.1, 100);
      const view = mat4mul(rotX(rx), rotY(ry));
      const model = trans(0, 0, -3.5);
      const mvp = mat4mul(proj, mat4mul(view, model));
      gl.uniformMatrix4fv(mvpLoc, false, mvp);
      gl.uniform1f(timeLoc, t);
      gl.drawArrays(gl.POINTS, 0, N);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position:"fixed",inset:0,zIndex:0,pointerEvents:"none",
      width:"100vw",height:"100vh",opacity:.55
    }}/>
  );
}

/* ══════════════════════════════════════════
   TYPING ANIMATION
══════════════════════════════════════════ */
function Typing({ words }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[idx];
    const t = setTimeout(() => {
      if (!del) {
        setText(w.slice(0, text.length+1));
        if (text.length+1 === w.length) setTimeout(()=>setDel(true),1400);
      } else {
        setText(w.slice(0, text.length-1));
        if (text.length-1===0) { setDel(false); setIdx((idx+1)%words.length); }
      }
    }, del ? 50 : 85);
    return ()=>clearTimeout(t);
  },[text,del,idx]);
  return <><span className="typing">{text}</span><span className="cursor"/></>;
}

/* ══════════════════════════════════════════
   3D ORB (mouse-tracked)
══════════════════════════════════════════ */
function Orb3D() {
  const ref = useRef(null);
  const handleMove = useCallback(e => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width/2) / (r.width/2);
    const y = (e.clientY - r.top - r.height/2) / (r.height/2);
    ref.current.querySelector(".orb-3d").style.transform =
      `rotateY(${x*25}deg) rotateX(${-y*25}deg)`;
  },[]);
  const handleLeave = () => {
    ref.current.querySelector(".orb-3d").style.transform = "";
  };
  return (
    <div className="orb-scene" ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <div className="orb-3d" style={{transition:"transform .15s ease-out"}}>
        <div className="orb-glow"/>
        <div className="orb-core">
          <div className="orb-ring"/>
          <div className="orb-ring"/>
          <div className="orb-ring"/>
          <div className="orb-emoji">👨‍💻</div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   3D TILT CARD
══════════════════════════════════════════ */
function Tilt({ children, style, className }) {
  const ref = useRef(null);
  const handleMove = e => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left)/r.width - 0.5;
    const y = (e.clientY - r.top)/r.height - 0.5;
    ref.current.style.transform =
      `perspective(1000px) rotateX(${-y*16}deg) rotateY(${x*16}deg) scale(1.03)`;
    ref.current.style.boxShadow = `${-x*30}px ${-y*30}px 60px rgba(0,0,0,.8)`;
  };
  const handleLeave = () => {
    ref.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    ref.current.style.boxShadow = "";
  };
  return (
    <div ref={ref} className={className} style={{transition:"transform .3s ease,box-shadow .3s ease",...style}}
      onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════
   SCROLL REVEAL HOOK
══════════════════════════════════════════ */
function useReveal() {
  useEffect(()=>{
    const els = document.querySelectorAll(".rev,.rev-l,.rev-r,.rev-3d");
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("on"); obs.unobserve(e.target); } });
    },{threshold:.1});
    els.forEach(el=>obs.observe(el));
    return ()=>obs.disconnect();
  });
}

/* ══════════════════════════════════════════
   ICONS (SVG inline)
══════════════════════════════════════════ */
const GhIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);
const LiIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

/* ══════════════════════════════════════════
   APP
══════════════════════════════════════════ */
export default function Portfolio() {
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(()=>{
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    const timer = setTimeout(()=>setLoaded(true), 2000);
    const onScroll = ()=>{ setScrolled(window.scrollY>60); setShowTop(window.scrollY>400); };
    window.addEventListener("scroll", onScroll);
    return ()=>{ clearTimeout(timer); window.removeEventListener("scroll",onScroll); document.head.removeChild(style); };
  },[]);

  useReveal();

  const go = id => { document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); setMenuOpen(false); };
  const NAV = ["About","Skills","Projects","Contact"];

  return (
    <div style={{background:"#000",minHeight:"100vh"}}>

      {/* ── LOADER ── */}
      <div className={`loader${loaded?" out":""}`}>
        <div className="loader-cube">
          <div className="f">TC</div><div className="b"/>
          <div className="l"/><div className="r"/>
          <div className="t"/><div className="bo"/>
        </div>
        <div className="loader-txt">INITIALISING</div>
      </div>

      {/* ── WEBGL BACKGROUND ── */}
      <WebGLField />

      {/* ── PURE BLACK GRADIENT OVERLAY ── */}
      <div style={{
        position:"fixed",inset:0,zIndex:0,pointerEvents:"none",
        background:"radial-gradient(ellipse at 20% 20%,rgba(0,212,255,.04) 0%,transparent 50%), radial-gradient(ellipse at 80% 80%,rgba(124,58,237,.04) 0%,transparent 50%)"
      }}/>

      {/* ── NAV ── */}
      <nav className={scrolled?"scrolled":""}>
        <a className="logo" onClick={()=>go("hero")}>TC</a>
        <ul className="nav-links">
          {NAV.map(n=><li key={n}><a onClick={()=>go(n.toLowerCase())}>{n}</a></li>)}
        </ul>
        <div className="nav-r">
          <div className="hamburger" onClick={()=>setMenuOpen(o=>!o)}>
            <span/><span/><span/>
          </div>
        </div>
      </nav>
      <div className={`mob-menu${menuOpen?" open":""}`}>
        <span style={{position:"absolute",top:24,right:28,fontSize:"2rem",cursor:"pointer",color:"var(--muted)"}} onClick={()=>setMenuOpen(false)}>×</span>
        {NAV.map(n=><a key={n} onClick={()=>go(n.toLowerCase())}>{n}</a>)}
      </div>

      {/* ═══════ HERO ═══════ */}
      <section id="hero" className="hero">
        <div className="hero-tag"><span className="hero-tag-dot"/>Available for Opportunities</div>

        <h1 className="hero-name">TANISH CHAVAN</h1>

        <div className="hero-role">
          <span style={{color:"var(--muted)"}}>I build</span>
          <Typing words={TYPING_WORDS}/>
        </div>

        <p className="hero-summary">
          Computer Science undergraduate specialising in MERN Stack Development.
          Building full-stack applications with secure auth, RESTful APIs, and pixel-perfect UIs.
          Passionate about scalable, user-centric solutions.
        </p>

        <div className="hero-btns">
          <button className="btn-main" onClick={()=>go("projects")}>View My Work →</button>
          <button className="btn-ghost" onClick={()=>go("contact")}>Get In Touch</button>
        </div>

        <div className="hero-socials">
          <a className="soc" href={PROFILE.github} target="_blank"><GhIcon/></a>
          <a className="soc" href={PROFILE.linkedin} target="_blank"><LiIcon/></a>
          <a className="soc" href={`mailto:${PROFILE.email}`}>✉️</a>
          <a className="soc" href={`tel:${PROFILE.phone}`}>📞</a>
        </div>

        <div className="hero-scroll">
          <div className="scroll-txt">SCROLL</div>
          <div className="scroll-bar"/>
        </div>
      </section>

      <div className="divider"/>

      {/* ═══════ ABOUT ═══════ */}
      <section id="about" className="sec">
        <div className="sw">
          <div className="rev"><div className="sec-tag">Who I Am</div></div>
          <div className="rev"><h2 className="sec-title">About <span>Me</span></h2></div>

          <div className="about-grid">
            <div className="about-visual rev-l">
              <Orb3D/>
            </div>

            <div className="rev-r">
              <p className="about-text" style={{color:"var(--muted)",lineHeight:1.8,marginBottom:18}}>
                I'm a passionate <strong style={{color:"var(--text)"}}>MERN Stack Developer</strong> pursuing BSc Computer Science at Pillai College, Navi Mumbai. I transform complex problems into elegant, high-performance web solutions.
              </p>
              <p style={{color:"var(--muted)",lineHeight:1.8,marginBottom:18}}>
                My expertise spans end-to-end application development — crafting intuitive React interfaces, architecting robust Node.js backends, and designing efficient MongoDB schemas. I ship production-ready code with clean architecture.
              </p>
              <p style={{color:"var(--muted)",lineHeight:1.8,marginBottom:24}}>
                📍 {PROFILE.location}
              </p>

              <div className="about-stats">
                {[{n:"3+",l:"Projects Built"},{n:"9.56",l:"CGPA"},{n:"MERN",l:"Stack Focus"}].map(s=>(
                  <div className="stat rev-3d" key={s.l}>
                    <div className="stat-n">{s.n}</div>
                    <div className="stat-l">{s.l}</div>
                  </div>
                ))}
              </div>

              <div className="edu-list">
                {EDUCATION.map((e,i)=>(
                  <div className="edu-item rev" style={{transitionDelay:`${i*.1}s`}} key={i}>
                    <div className="edu-icon">{e.icon}</div>
                    <div>
                      <div className="edu-deg">{e.degree}</div>
                      <div className="edu-inst">{e.place}</div>
                      <div className="edu-meta"><span>{e.year}</span><span>{e.score}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"/>

      {/* ═══════ SKILLS ═══════ */}
      <section id="skills" className="sec">
        <div className="sw">
          <div className="rev"><div className="sec-tag">What I Know</div></div>
          <div className="rev"><h2 className="sec-title">Technical <span>Skills</span></h2></div>

          <div className="skills-grid">
            {Object.entries(SKILLS).map(([cat,{icon,items}],i)=>(
              <Tilt key={cat} className={`skill-box rev-3d`} style={{transitionDelay:`${i*.1}s`}}>
                <div className="skill-head">
                  <div className="skill-icon">{icon}</div>
                  <div className="skill-cat">{cat}</div>
                </div>
                <div className="tags">
                  {items.map(t=><span className="tag" key={t}>{t}</span>)}
                </div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      <div className="divider"/>

      {/* ═══════ PROJECTS ═══════ */}
      <section id="projects" className="sec">
        <div className="sw">
          <div className="rev"><div className="sec-tag">What I've Built</div></div>
          <div className="rev"><h2 className="sec-title">Featured <span>Projects</span></h2></div>

          <div className="proj-grid">
            {PROJECTS.map((p,i)=>(
              <Tilt key={p.title} className={`proj-card rev-3d`} style={{transitionDelay:`${i*.15}s`}}>
                {/* glow on hover */}
                <div className="proj-glow" style={{
                  boxShadow:`inset 0 0 80px ${p.accent}15, 0 0 100px ${p.accent}20`,
                  border:`1px solid ${p.accent}40`,borderRadius:24,inset:0,position:"absolute"
                }}/>
                <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${p.accent},transparent)`,opacity:.6}}/>

                <div className="proj-head">
                  <div className="proj-ic" style={{background:`${p.accent}15`,border:`1px solid ${p.accent}40`}}>
                    {p.icon}
                  </div>
                  <div className="proj-t" style={{color:p.accent}}>{p.title}</div>
                  <div className="proj-sub">{p.subtitle}</div>
                </div>

                <div className="proj-feats">
                  <ul>{p.features.map(f=><li key={f} style={{"--dot-color":p.accent}}>{f}</li>)}</ul>
                </div>

                <div className="proj-stack">
                  {p.tech.map(t=><span className="stack-tag" key={t}>{t}</span>)}
                </div>

                <div className="proj-btns">
                  {p.live
                    ? <a href={p.live} target="_blank" className="btn-live" style={{background:`linear-gradient(135deg,${p.accent},${p.accent}99)`,color:"#000"}}>🚀 Live Demo</a>
                    : <span className="btn-live" style={{background:"rgba(255,255,255,.04)",color:"var(--muted)",border:"1px solid var(--border)"}}>🔒 Private</span>
                  }
                  <a href={PROFILE.github} target="_blank" className="btn-code">
                    <GhIcon/> Code
                  </a>
                </div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      <div className="divider"/>

      {/* ═══════ CONTACT ═══════ */}
      <section id="contact" className="sec">
        <div className="sw">
          <div className="rev"><div className="sec-tag">Let's Connect</div></div>
          <div className="rev"><h2 className="sec-title">Get In <span>Touch</span></h2></div>

          <div className="contact-grid">
            <div className="contact-links rev-l">
              {[
                {icon:"✉️",label:"Email",val:PROFILE.email,href:`mailto:${PROFILE.email}`,bg:"rgba(0,212,255,.15)"},
                {icon:"📞",label:"Phone",val:PROFILE.phone,href:`tel:${PROFILE.phone}`,bg:"rgba(0,255,157,.15)"},
                {icon:"📍",label:"Location",val:PROFILE.location,href:"#",bg:"rgba(124,58,237,.15)"},
                {icon:"💼",label:"LinkedIn",val:"tanish-chavan-6733ab337",href:PROFILE.linkedin,bg:"rgba(0,119,181,.15)"},
                {icon:"💻",label:"GitHub",val:"tanishchavan07",href:PROFILE.github,bg:"rgba(255,255,255,.08)"},
              ].map((c,i)=>(
                <a href={c.href} target={c.href.startsWith("http")?"_blank":"_self"} className="c-link rev" style={{transitionDelay:`${i*.08}s`}} key={c.label}>
                  <div className="c-link-ic" style={{background:c.bg}}>{c.icon}</div>
                  <div>
                    <div className="c-link-label">{c.label}</div>
                    <div className="c-link-val">{c.val}</div>
                  </div>
                </a>
              ))}
            </div>

            <Tilt className="contact-cta rev-r">
              <h3>
                Let's Build Something{" "}
                <span style={{background:"linear-gradient(135deg,var(--c1),var(--c2))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
                  Incredible
                </span>
              </h3>
              <p>
                I'm actively seeking internships and full-time MERN / Full-Stack opportunities.
                Whether you have a project, role, or just want to say hi — I'd love to hear from you.
              </p>
              <a href={`mailto:${PROFILE.email}`} className="btn-main" style={{display:"inline-flex",alignItems:"center",gap:8}}>
                ✉️ Send Me a Message
              </a>
              <div className="cta-socials">
                <a className="soc" href={PROFILE.github} target="_blank"><GhIcon/></a>
                <a className="soc" href={PROFILE.linkedin} target="_blank"><LiIcon/></a>
                <a className="soc" href={`mailto:${PROFILE.email}`}>✉️</a>
              </div>
            </Tilt>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <p>Crafted with ❤️ &amp; WebGL by <span>Tanish Santosh Chavan</span> · MERN Stack Developer</p>
        <p style={{marginTop:8,fontSize:".75rem",color:"var(--muted)"}}>© {new Date().getFullYear()} · Navi Mumbai, Maharashtra, India</p>
      </footer>

      {/* ── SCROLL TOP ── */}
      <button className={`scroll-top${showTop?" show":""}`} onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>↑</button>
    </div>
  );
}
