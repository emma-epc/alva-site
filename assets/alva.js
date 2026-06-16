/* =====================================================================
   ALVA — Script partagé
   Chaque module est isolé dans safe() : si l'un échoue (ex. WebGL non
   supporté), les autres continuent de fonctionner. Le Hero ne tourne que
   sur la page d'accueil (gardes sur les éléments).
   ===================================================================== */
document.documentElement.classList.add('has-js');

const HAS_GSAP = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
if (HAS_GSAP) { gsap.registerPlugin(ScrollTrigger); }
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function safe(name, fn){ try { fn(); } catch(e){ console.error('[ALVA] ' + name, e); } }

/* ============================ JEU D'ICÔNES ALVA ============================
   Illustrations « maison » (ligne + duotone, palette cognac) qui remplacent
   tous les emoji. Utilisées via <span class="alva-ico" data-icon="nom"></span>
   (hydratées par le module 'icons') ou via ALVA_ICONS[nom] dans les rendus JS. */
const _SVG='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">';
const ALVA_ICONS={
  calendar:_SVG+'<rect x="3.5" y="5" width="17" height="16" rx="2.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/><path d="M12 12.6l.9 1.9 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3z" fill="currentColor" stroke="none" opacity=".55"/></svg>',
  map:_SVG+'<path d="M9 4 3.5 6.2v13L9 17l6 2.5 5.5-2.2v-13L15 6.5 9 4z"/><path d="M9 4v13M15 6.5v13"/></svg>',
  link:_SVG+'<path d="M9.5 14.5 14.5 9.5"/><path d="M8 12 6.2 13.8a3.5 3.5 0 0 0 5 5L13 17"/><path d="M16 12l1.8-1.8a3.5 3.5 0 0 0-5-5L11 7"/></svg>',
  people:_SVG+'<circle cx="9" cy="8" r="3"/><path d="M3.6 19a5.5 5.5 0 0 1 10.8 0"/><path d="M16 6.6a3 3 0 0 1 0 5.8"/><path d="M17.2 14.6A5.5 5.5 0 0 1 20.4 19"/></svg>',
  wine:_SVG+'<path d="M8 3h8l-.7 6.2a3.3 3.3 0 0 1-6.6 0L8 3z" fill="currentColor" stroke="none" opacity=".14"/><path d="M8 3h8l-.7 6.2a3.3 3.3 0 0 1-6.6 0L8 3zM12 15.4V19M9 21h6"/></svg>',
  leaf:_SVG+'<path d="M5 19C5 11 11 5 19 5c0 8-6 14-14 14z" fill="currentColor" stroke="none" opacity=".14"/><path d="M5 19C5 11 11 5 19 5c0 8-6 14-14 14zM5 19C9 15 12 12 16 9"/></svg>',
  compass:_SVG+'<circle cx="12" cy="12" r="9"/><path d="M15.6 8.4 13 13l-4.6 2.6L11 11z" fill="currentColor" stroke="none" opacity=".45"/><path d="M15.6 8.4 13 13l-4.6 2.6L11 11z"/></svg>',
  key:_SVG+'<circle cx="8" cy="8" r="3.6"/><path d="M10.6 10.6 19 19M15.8 15.8l2-2M13.6 18l2-2"/></svg>',
  target:_SVG+'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.4"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/></svg>',
  chat:_SVG+'<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h7A2.5 2.5 0 0 1 16 6.5v3A2.5 2.5 0 0 1 13.5 12H8l-4 3z" fill="currentColor" stroke="none" opacity=".14"/><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h7A2.5 2.5 0 0 1 16 6.5v3A2.5 2.5 0 0 1 13.5 12H8l-4 3z"/><path d="M19 10.5v4a2.5 2.5 0 0 1-2.5 2.5H16l-2.5 2.5V17"/></svg>',
  pin:_SVG+'<path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z" fill="currentColor" stroke="none" opacity=".14"/><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  megaphone:_SVG+'<path d="M4 10.2v3.6l3 .5 1.7 3.7 2-.7L9.6 14 18 17V7L9.6 9.6 4 10.2z" fill="currentColor" stroke="none" opacity=".14"/><path d="M4 10.2v3.6l3 .5 1.7 3.7 2-.7L9.6 14 18 17V7L9.6 9.6 4 10.2z"/><path d="M20 10.4a3 3 0 0 1 0 3.2"/></svg>',
  sparkle:_SVG+'<path d="M11 3l1.7 4.8L17.5 9.5 12.7 11 11 16l-1.7-5L4.5 9.5 9.3 7.8z" fill="currentColor" stroke="none" opacity=".18"/><path d="M11 3l1.7 4.8L17.5 9.5 12.7 11 11 16l-1.7-5L4.5 9.5 9.3 7.8z"/><path d="M17.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/></svg>',
  shield:_SVG+'<path d="M12 3 5 6v5c0 4.5 3 7.8 7 9 4-1.2 7-4.5 7-9V6l-7-3z" fill="currentColor" stroke="none" opacity=".14"/><path d="M12 3 5 6v5c0 4.5 3 7.8 7 9 4-1.2 7-4.5 7-9V6l-7-3z"/><path d="m9 11.8 2 2 4-4"/></svg>',
  cup:_SVG+'<path d="M5 8h11v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8z" fill="currentColor" stroke="none" opacity=".14"/><path d="M5 8h11v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8z"/><path d="M16 9h2.4a2.4 2.4 0 0 1 0 4.8H16"/><path d="M8 3.4c-.5.8-.5 1.7 0 2.5M11.5 3.4c-.5.8-.5 1.7 0 2.5"/></svg>',
  book:_SVG+'<path d="M5 4.6A1.6 1.6 0 0 1 6.6 3H18v15H6.6A1.6 1.6 0 0 0 5 19.6z" fill="currentColor" stroke="none" opacity=".14"/><path d="M5 4.6A1.6 1.6 0 0 1 6.6 3H18v15H6.6A1.6 1.6 0 0 0 5 19.6zM5 19.6A1.6 1.6 0 0 1 6.6 18H18v3H6.6A1.6 1.6 0 0 1 5 19.6z"/></svg>',
  lotus:_SVG+'<path d="M12 13c0-2.6 0-4.6 0-6.5 1.9 1.4 1.9 5.1 0 6.5z" fill="currentColor" stroke="none" opacity=".2"/><path d="M12 13c-2.1 0-4-1.6-4-4.2 2.3 0 4 1.6 4 4.2zM12 13c2.1 0 4-1.6 4-4.2-2.3 0-4 1.6-4 4.2zM12 13c0-2.6 0-4.6 0-6.5 1.9 1.4 1.9 5.1 0 6.5z"/><path d="M4 12.5c2.4 3 5 4.3 8 4.3s5.6-1.3 8-4.3c-1.6-1.1-3.3-1-4.8-.2"/></svg>',
  bike:_SVG+'<circle cx="6" cy="16" r="3.2"/><circle cx="18" cy="16" r="3.2"/><path d="M6 16l3.6-6h4.6l-2.5 6M9.6 10l1.7 6M9 7h2.6l1 3"/></svg>',
  flower:_SVG+'<circle cx="12" cy="8.5" r="2"/><path d="M12 8.5c0-3 1.8-3.8 1.8-3.8M12 8.5c0-3-1.8-3.8-1.8-3.8M12 8.5c2.4-1.5 3.9-.6 3.9-.6M12 8.5c-2.4-1.5-3.9-.6-3.9-.6"/><path d="M12 10.5V20M12 20c-2 0-3-1.4-3-3M12 16.5c2 0 3 1.4 3 3" stroke-opacity=".6"/></svg>',
  music:_SVG+'<path d="M9 18V6l9-2v10"/><circle cx="6.5" cy="18" r="2.5" fill="currentColor" stroke="none" opacity=".2"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="15.5" cy="15.8" r="2.5"/></svg>',
  wheat:_SVG+'<path d="M12 21V8"/><path d="M12 8c-1.8-.9-1.9-2.8-1-4.6 1.9.9 2 2.8 1 4.6zM12 8c1.8-.9 1.9-2.8 1-4.6-1.9.9-2 2.8-1 4.6z"/><path d="M12 13c-1.8-.9-3.2-.5-3.8-1.9 1.9-.9 3.2-.4 3.8 1.9zM12 13c1.8-.9 3.2-.5 3.8-1.9-1.9-.9-3.2-.4-3.8 1.9zM12 18c-1.8-.9-3.2-.5-3.8-1.9 1.9-.9 3.2-.4 3.8 1.9zM12 18c1.8-.9 3.2-.5 3.8-1.9-1.9-.9-3.2-.4-3.8 1.9z"/></svg>',
  paddle:_SVG+'<path d="M3 14c4.5 2 13.5 2 18 0-1.6 3.6-5.2 5.2-9 5.2S4.6 17.6 3 14z" fill="currentColor" stroke="none" opacity=".14"/><path d="M3 14c4.5 2 13.5 2 18 0-1.6 3.6-5.2 5.2-9 5.2S4.6 17.6 3 14z"/><path d="M15 3l-3 9M12 12l3-3"/></svg>',
  school:_SVG+'<path d="M4 21V9.5l8-4 8 4V21" fill="currentColor" stroke="none" opacity=".1"/><path d="M4 21V9.5l8-4 8 4V21M4 21h16M9.5 21v-4.5h5V21M9.5 12h5"/></svg>',
  health:_SVG+'<rect x="4" y="4" width="16" height="16" rx="4.5" fill="currentColor" stroke="none" opacity=".12"/><rect x="4" y="4" width="16" height="16" rx="4.5"/><path d="M12 8.5v7M8.5 12h7"/></svg>',
  basket:_SVG+'<path d="M5 9h14l-1.2 9.4a2 2 0 0 1-2 1.6H8.2a2 2 0 0 1-2-1.6L5 9z" fill="currentColor" stroke="none" opacity=".12"/><path d="M5 9h14l-1.2 9.4a2 2 0 0 1-2 1.6H8.2a2 2 0 0 1-2-1.6L5 9z"/><path d="M8.5 9 12 3.6 15.5 9M9.5 13v3M14.5 13v3"/></svg>',
  phone:_SVG+'<rect x="6.5" y="3" width="11" height="18" rx="2.6"/><path d="M11 18h2"/><path d="M9 6.5h6" stroke-opacity=".5"/></svg>',
  bag:_SVG+'<path d="M6 8h12l-1 11.5a1.5 1.5 0 0 1-1.5 1.4H8.5A1.5 1.5 0 0 1 7 19.5L6 8z" fill="currentColor" stroke="none" opacity=".12"/><path d="M6 8h12l-1 11.5a1.5 1.5 0 0 1-1.5 1.4H8.5A1.5 1.5 0 0 1 7 19.5L6 8z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>'
};
window.ALVA_ICONS=ALVA_ICONS;
safe('icons', function(){
  document.querySelectorAll('[data-icon]').forEach(el=>{
    const ic=ALVA_ICONS[el.getAttribute('data-icon')];
    if(ic){ el.innerHTML=ic; el.classList.add('alva-ico'); }
  });
});

/* ============================ CURSEUR ============================ */
safe('cursor', function(){
  const cur=document.getElementById('cur'),curl=document.getElementById('curl');
  if(!cur||!curl) return;
  let mx=0,my=0,lx=0,ly=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px'});
  (function af(){lx+=(mx-lx)*.12;ly+=(my-ly)*.12;curl.style.left=lx+'px';curl.style.top=ly+'px';requestAnimationFrame(af)})();
  const bind=()=>document.querySelectorAll('a,button,.ev-card,.past-card,.who-card,.tile').forEach(el=>{
    el.addEventListener('mouseenter',()=>cur.classList.add('on'));
    el.addEventListener('mouseleave',()=>cur.classList.remove('on'));
  });
  bind();
  window.__rebindCursor=bind;
});

/* ============================ MENU ============================ */
safe('menu', function(){
  const menu=document.getElementById('menu');
  const mbtn=document.getElementById('mbtn');
  const mclose=document.getElementById('mclose');
  if(!menu||!mbtn) return;
  mbtn.onclick=()=>menu.classList.add('open');
  if(mclose) mclose.onclick=()=>menu.classList.remove('open');
  document.querySelectorAll('[data-link]').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));
});

/* ============================ HERO C — ACCUEIL UNIQUEMENT ============================
   Chorégraphie demandée :
   1. les lettres A-L-V-A partent en TOUT PETIT du bas de la page,
   2. elles remontent ensemble au centre en GRANDISSANT,
   3. le point arrive de la GAUCHE, traverse et percute les lettres
      (effet domino : chaque lettre est bousculée à son tour),
   4. flash + onde de choc, puis tout se stabilise au centre,
   5. ALORS les 3 courbes se dessinent et la signature apparaît dessous.
   Rejouable via window.__playHero() (clic sur le logo ALVA). */
safe('heroC', function(){
  const wm=document.querySelector('.hc-wordmark');
  if(!wm) return; // pas le hero d'accueil

  const letters=wm.querySelectorAll('.hc-l');
  const dot=wm.querySelector('.hc-dot');
  const contours=document.querySelectorAll('.hero-contour .hc-path');
  const tagline=document.querySelector('.hero-tagline');
  const flash=document.querySelector('.hero-flash');
  const shock=document.querySelector('.hero-shock');
  const navEl=document.getElementById('nav');

  // état final (sans GSAP ou en reduced-motion)
  function setFinal(){
    contours.forEach(p=>{ p.style.strokeDasharray='none'; p.style.strokeDashoffset='0'; });
    if(tagline){ tagline.style.opacity='1'; tagline.style.transform='none'; }
    if(dot){ dot.style.transform='none'; }
    letters.forEach(l=>l.style.transform='');
    if(navEl) navEl.style.opacity='1';
  }

  if(!HAS_GSAP || REDUCED){ setFinal(); window.__playHero=function(){}; return; }

  let tl=null;
  function play(){
    if(tl) tl.kill();
    // courbes prêtes à se dessiner
    contours.forEach(p=>{ const L=p.getTotalLength(); gsap.set(p,{strokeDasharray:L,strokeDashoffset:L}); });
    const riseY=Math.max(260, window.innerHeight*0.46);
    const startX=-(wm.getBoundingClientRect().width*0.92 + 160);

    tl=gsap.timeline({defaults:{force3D:true}});
    tl.set(wm,{transformOrigin:'50% 50%',skewX:-8})
      .set(letters,{x:0,y:0,rotation:0})
      .set(dot,{x:startX,scale:.9,opacity:0})
      .set(tagline,{opacity:0,y:16})
      .set(navEl||{},{opacity:0})
      .set(wm,{y:riseY,scale:.08});
    // 1+2 — montée du bas + grossissement
    tl.to(wm,{y:0,scale:1,duration:1.05,ease:'power3.out'},0.1);
    // 3 — le point traverse depuis la gauche
    tl.set(dot,{opacity:1},0.96)
      .to(dot,{x:0,duration:0.64,ease:'power2.out'},0.96);
    // domino : chaque lettre bousculée au passage du point
    tl.to(letters,{y:-16,rotation:(i)=>[-3,2.4,-2,3][i]||0,duration:.12,stagger:{each:.07,from:'start'},ease:'power2.out'},1.02)
      .to(letters,{y:0,rotation:0,duration:.62,stagger:{each:.07,from:'start'},ease:'elastic.out(1,.5)'},1.16);
    // 4 — flash + onde de choc
    tl.to(flash||{},{opacity:.2,duration:.07,ease:'power1.out'},1.2)
      .to(flash||{},{opacity:0,duration:.13,ease:'power1.in'},1.27)
      .fromTo(shock||{},{scale:1,opacity:.32},{scale:24,opacity:0,duration:.6,ease:'power2.out'},1.2);
    // 5 — les courbes se dessinent + signature + header
    tl.to(contours,{strokeDashoffset:0,duration:1.0,stagger:.16,ease:'power2.out'},1.55)
      .to(tagline,{opacity:1,y:0,duration:.9,ease:'power2.out'},1.72)
      .to(navEl||{},{opacity:1,duration:.5},1.72);
    // respiration du point
    tl.to(dot,{scale:1.12,duration:1.4,ease:'sine.inOut',yoyo:true,repeat:-1},2.5);
  }
  window.__playHero=play;
  play();

  // fondu du hero au scroll → on glisse vers le beige uniforme de la page
  gsap.to('.hero-c',{yPercent:16,opacity:.25,ease:'none',
    scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});
});

/* ============================ ANCIEN HERO (markup .hero-wordmark) — inactif ============================ */
safe('heroLogo', function(){
  const heroWordmark=document.querySelector('.hero-wordmark');
  if(!heroWordmark) return; // pas de hero -> sous-page

  if (HAS_GSAP && !REDUCED) {
    gsap.ticker.lagSmoothing(500, 33);
    // Micro-flash blanc au moment de l'impact du point (overlay créé en JS,
    // pour ne pas toucher au HTML "intouchable" du hero).
    const heroEl=document.getElementById('hero');
    let heroFlash=null;
    if(heroEl){
      heroFlash=document.createElement('div');
      heroFlash.className='hero-flash-impact';
      heroFlash.setAttribute('aria-hidden','true');
      heroEl.appendChild(heroFlash);
    }
    const logoStartScale = .018;
    const getLogoStartY = () => {
      gsap.set(heroWordmark,{x:0,y:0,scale:1,transformOrigin:'50% 50%',force3D:true,autoRound:false});
      const rect=heroWordmark.getBoundingClientRect();
      const finalCenterY=rect.top+rect.height/2;
      const scaledHeight=rect.height*logoStartScale;
      const startBottom=window.innerHeight+4;
      const startCenterY=startBottom-scaledHeight/2;
      return startCenterY-finalCenterY;
    };
    const logoStartY=getLogoStartY();
    const tl=gsap.timeline({defaults:{force3D:true,overwrite:'auto',autoRound:false}});
    tl.set('nav',{opacity:0})
      .set('.hero-wordmark',{x:0,y:logoStartY,scale:logoStartScale,transformOrigin:'50% 50%',willChange:'transform',autoRound:false},0)
      .set('.hero-letter',{x:0,y:(i)=>[72,30,90,46][i],rotation:(i)=>[-.65,.42,-.75,.55][i],opacity:1,willChange:'transform',autoRound:false},0)
      .set('.hero-dot',{x:'58vw',y:0,rotation:0,scale:.9,opacity:0,willChange:'transform,opacity',autoRound:false},0)
      .set('.hero-base span',{y:0,opacity:0},0)
      .set('.hero-intro',{opacity:0},0);
    tl.to('.hero-wordmark',{y:0,scale:1,duration:.96,ease:'power2.out',autoRound:false},0)
      .to('.hero-letter',{y:0,rotation:0,duration:.88,stagger:{each:.026,from:'start'},ease:'sine.out',autoRound:false},0)
      .to('.hero-dot',{opacity:1,duration:.01,ease:'none'},.86)
      .to('.hero-dot',{x:-70,scale:1.35,duration:.34,ease:'power2.inOut',autoRound:false},.86)
      .to('.hero-letter',{x:(i)=>[-24,-33,-45,-58.5][i],y:(i)=>[1.2,-2.1,2.1,-1.2][i],rotation:(i)=>[-1.1,.9,-.85,1.15][i],duration:.11,ease:'sine.inOut',autoRound:false},1.19)
      .to('.hero-dot',{x:-42,y:-1.5,scale:.995,duration:.11,ease:'sine.inOut',autoRound:false},1.19)
      .to(heroFlash||{},{opacity:.18,duration:.09,ease:'power2.out'},1.19)
      .to(heroFlash||{},{opacity:0,duration:.09,ease:'power2.in'},1.28)
      .to('.hero-wordmark',{rotation:1.5,duration:.06,ease:'sine.inOut',autoRound:false},1.31)
      .to('.hero-wordmark',{rotation:-1.5,duration:.08,ease:'sine.inOut',autoRound:false},1.37)
      .to('.hero-wordmark',{rotation:0,duration:.12,ease:'power2.out',autoRound:false},1.45)
      .set('.hero-base span',{y:0,opacity:1},1.20)
      .set('.hero-intro',{opacity:1},1.20)
      .set('nav',{opacity:1},1.20)
      .to('.hero-letter',{x:(i)=>[2.5,3.5,3,4.2][i],y:(i)=>[-.25,.45,-.35,.25][i],rotation:(i)=>[.22,-.28,.18,-.24][i],duration:.15,ease:'sine.out',autoRound:false},1.31)
      .to('.hero-dot',{x:4,y:0,scale:1.008,duration:.15,ease:'sine.out',autoRound:false},1.31)
      .to('.hero-letter',{x:0,y:0,rotation:0,duration:.24,ease:'power1.out',clearProps:'willChange',autoRound:false},1.46)
      .to('.hero-dot',{x:0,y:0,scale:1,rotation:0,duration:.24,ease:'power1.out',clearProps:'willChange',autoRound:false},1.46)
      .to('.hero-wordmark',{duration:.01,clearProps:'willChange'},1.72);
  } else {
    document.querySelectorAll('.hero-wordmark,.hero-letter,.hero-dot,.hero-base span,.hero-intro,nav').forEach(el=>{el.style.opacity='1';el.style.transform='none'});
  }

  if (HAS_GSAP && !REDUCED) {
    gsap.to('.hero-c',{yPercent:12,opacity:.42,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});
    gsap.to('#hero3d',{yPercent:10,scale:1.04,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});
  }
});

/* ============================ HERO 3D (Three.js) — ACCUEIL UNIQUEMENT ============================
   Décoratif. Si le rendu WebGL échoue, on s'arrête proprement : le Hero garde
   son dégradé et ses auroras, le reste du site n'est pas affecté. */
safe('hero3d', function(){
  const mount=document.getElementById('hero3d');
  if(!mount || typeof THREE==='undefined' || REDUCED) return;

  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(38, mount.clientWidth/mount.clientHeight, 0.1, 100);
  camera.position.set(0,0,11);
  const renderer=new THREE.WebGLRenderer({alpha:true, antialias:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.35));
  renderer.setSize(mount.clientWidth, mount.clientHeight);
  if('outputColorSpace' in renderer && THREE.SRGBColorSpace) renderer.outputColorSpace=THREE.SRGBColorSpace;
  else if('outputEncoding' in renderer && THREE.sRGBEncoding) renderer.outputEncoding=THREE.sRGBEncoding;
  mount.appendChild(renderer.domElement);

  const group=new THREE.Group(); scene.add(group);
  scene.add(new THREE.AmbientLight(0xffffff,1.25));
  const keyLight=new THREE.PointLight(0xffffff,1.3,40); keyLight.position.set(5,6,10); scene.add(keyLight);
  const fillLight=new THREE.PointLight(0xB97A45,1.05,30); fillLight.position.set(-7,-4,8); scene.add(fillLight);
  const rimLight=new THREE.PointLight(0x9BA9BB,1.1,30); rimLight.position.set(7,-3,7); scene.add(rimLight);

  const makeMat=(color,opacity=0.95)=>new THREE.MeshPhysicalMaterial({color,roughness:0.22,metalness:0.06,clearcoat:1,clearcoatRoughness:0.14,transparent:true,opacity,transmission:0.03,sheen:0.35,side:THREE.DoubleSide});
  const items=[];
  const add=(geometry,material,position,rotationSpeed,floatSpeed,scale=1)=>{
    const mesh=new THREE.Mesh(geometry,material);
    mesh.position.set(position[0],position[1],position[2]);
    mesh.scale.setScalar(scale); group.add(mesh);
    items.push({mesh,base:[...position],rot:rotationSpeed,float:floatSpeed});
  };
  add(new THREE.TorusKnotGeometry(1.15,0.32,180,24), makeMat(0xB97A45,0.84), [-3.5,1.8,-0.2], [0.0035,0.005,0.002], 1.25, 0.96);
  add(new THREE.IcosahedronGeometry(1.35,0), makeMat(0xE8C9C0,0.92), [0.3,-1.35,-0.7], [-0.003,0.0052,0.0031], 1.05, 1.03);
  add(new THREE.TorusGeometry(1.55,0.16,32,100), makeMat(0xD3DCC8,0.74), [3.45,1.2,-1.1], [0.004,-0.0038,0.0025], 0.95, 1);
  add(new THREE.SphereGeometry(1.12,64,64), makeMat(0x9BA9BB,0.72), [-0.65,2.35,-1.8], [0.0022,-0.0028,0.0042], 1.15, 1.08);
  add(new THREE.OctahedronGeometry(1.08,0), makeMat(0xDDC9D5,0.84), [2.05,-2.15,0.55], [-0.0045,0.0025,-0.003], 1.2, 0.92);
  add(new THREE.RingGeometry(1.05,1.55,80), makeMat(0xD2A479,0.48), [-4.6,-1.55,-2.0], [0.002,0.004,0.0015], 0.85, 1.08);

  const mouse={x:0,y:0};
  window.addEventListener('mousemove',e=>{mouse.x=(e.clientX/window.innerWidth)*2-1;mouse.y=-(e.clientY/window.innerHeight)*2+1});
  const resize=()=>{if(!mount.clientWidth||!mount.clientHeight)return;camera.aspect=mount.clientWidth/mount.clientHeight;camera.updateProjectionMatrix();renderer.setSize(mount.clientWidth,mount.clientHeight);renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.35))};
  window.addEventListener('resize',resize); resize();

  let alive=true;
  (function animate(t=0){
    if(!alive) return;
    const time=t*0.00035;
    group.rotation.y += (mouse.x*0.16 - group.rotation.y)*0.03;
    group.rotation.x += (mouse.y*0.08 - group.rotation.x)*0.03;
    items.forEach((item,idx)=>{
      item.mesh.rotation.x+=item.rot[0];item.mesh.rotation.y+=item.rot[1];item.mesh.rotation.z+=item.rot[2];
      item.mesh.position.x=item.base[0]+Math.cos(time*item.float+idx)*0.18;
      item.mesh.position.y=item.base[1]+Math.sin(time*item.float*1.15+idx)*0.24;
    });
    try { renderer.render(scene,camera); }
    catch(e){ alive=false; console.warn('[ALVA] hero3d: rendu WebGL interrompu, fond dégradé conservé.'); mount.style.display='none'; return; }
    requestAnimationFrame(animate);
  })();
});

/* ============================ HALO GLOBAL (épouse la tête du fil) ============================
   Le halo suit exactement la « tête » du fil (window.__threadHead, en vw/vh),
   dans les deux sens de scroll. Rendu plus présent qu'avant. */
/* Le halo est désormais piloté DIRECTEMENT par le module 'thread' (même boucle
   que le point → garanti visible et synchronisé sur toutes les pages). */
safe('halo', function(){ /* géré par thread */ });

/* ============================ LE FIL + SA TÊTE (suit le scroll, 2 sens) ============================
   Un seul point — la « tête » — voyage SUR le fil, exactement au point courant
   du tracé (getPointAtLength), proportionnellement au scroll. Fonctionne vers le
   bas ET vers le haut. Plus de nœuds fixes qui se détachent ou se multiplient.
   Le halo lit window.__threadHead (vw/vh) pour épouser ce mouvement. */
safe('thread', function(){
  if(document.querySelector('.thread-rail')) return;
  const cid='thrClip-'+Math.random().toString(36).slice(2,7);
  const D='M60,0 C8,330 112,560 60,880 C12,1180 110,1430 60,1740 C10,2060 112,2330 60,2640 C30,2820 70,2920 60,3000';
  const rail=document.createElement('div');
  rail.className='thread-rail';
  rail.setAttribute('aria-hidden','true');
  // Révélation du fil par un RECTANGLE de découpe qui grandit (clip-path) —
  // robuste sous l'étirement non uniforme du SVG (le dash, lui, ne se rendait
  // pas sur les pages hautes). Une piste pâle est TOUJOURS visible.
  rail.innerHTML=
    '<svg viewBox="0 0 120 3000" preserveAspectRatio="none">'
    +'<defs><clipPath id="'+cid+'" clipPathUnits="userSpaceOnUse"><rect x="-20" y="0" width="160" height="0" id="'+cid+'-r"/></clipPath></defs>'
    +'<path class="thread-track" d="'+D+'"/>'
    +'<path class="thread-prog" d="'+D+'" clip-path="url(#'+cid+')"/>'
    +'</svg>'
    +'<div class="thread-head"></div>';
  document.body.appendChild(rail);

  const prog=rail.querySelector('.thread-prog');
  const clipRect=document.getElementById(cid+'-r');
  const head=rail.querySelector('.thread-head');
  const len=prog.getTotalLength();
  const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
  const halo=document.getElementById('globalHalo');

  // points pré-échantillonnés (pas de getPointAtLength par frame)
  const SAMPLES=240, pts=[];
  for(let i=0;i<=SAMPLES;i++){ const q=prog.getPointAtLength(len*i/SAMPLES); pts.push([q.x,q.y]); }
  function ptAt(p){ const f=p*SAMPLES, i=Math.floor(f), t=f-i, a=pts[i]||pts[SAMPLES], b=pts[i+1]||a;
    return [a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t]; }

  // mesures en cache (aucun reflow par frame)
  let M={left:0,width:0,railH:0,innerH:1,innerW:1,maxScroll:1,visible:false};
  function measure(){
    const doc=document.documentElement;
    M.innerH=window.innerHeight||doc.clientHeight;
    M.innerW=window.innerWidth||doc.clientWidth;
    M.maxScroll=Math.max(1, doc.scrollHeight-M.innerH);
    const r=rail.getBoundingClientRect();
    M.visible=r.width>2; M.width=r.width; M.left=r.left; M.railH=rail.offsetHeight||doc.scrollHeight;
  }

  // halo lerpé et posé DIRECTEMENT ici (même boucle que le point → garanti)
  let hc={x:50,y:42,o:0};
  function update(){
    const p=clamp((window.scrollY||window.pageYOffset||0)/M.maxScroll,0,1);
    window.__threadProgress=p;
    clipRect.setAttribute('height', (p*3000).toFixed(1));   // révèle le fil jusqu'au point
    const pt=ptAt(p);
    head.style.left=(pt[0]/120*100)+'%';
    head.style.top =(pt[1]/3000*100)+'%';
    let hx,hy;
    if(M.visible){ const sy=window.scrollY||window.pageYOffset||0;
      hx=(M.left+pt[0]/120*M.width)/M.innerW*100; hy=(pt[1]/3000*M.railH - sy)/M.innerH*100;
    } else { hx=50+24*Math.sin(p*Math.PI*3); hy=14+72*p; }
    window.__threadHead={x:hx,y:hy,p:p};
    if(halo){
      hc.x+=(hx-hc.x)*0.12; hc.y+=(hy-hc.y)*0.12; hc.o+=(1-hc.o)*0.06;
      halo.style.setProperty('--halo-x',hc.x.toFixed(2)+'vw');
      halo.style.setProperty('--halo-y',hc.y.toFixed(2)+'vh');
      halo.style.setProperty('--halo-o',hc.o.toFixed(3));
    }
  }
  window.__threadUpdate=function(){ measure(); update(); };

  if(REDUCED){ measure(); clipRect.setAttribute('height','3000'); update(); if(halo)halo.style.setProperty('--halo-o','1'); return; }
  measure();
  if(HAS_GSAP){ gsap.ticker.add(update); }
  else { let t=false; window.addEventListener('scroll',()=>{ if(!t){t=true;requestAnimationFrame(()=>{t=false;update();});} },{passive:true}); }
  window.addEventListener('resize',()=>{ measure(); update(); });
  window.addEventListener('load',()=>{ if(window.ScrollTrigger) ScrollTrigger.refresh(); measure(); update(); });
  update();
});

/* ============================ RIDEAUX — RETIRÉS ============================
   Les rideaux provoquaient une cassure blanche au scroll. Le fond est
   désormais une seule couleur continue ; ce module ne fait plus rien. */
safe('curtains', function(){ /* volontairement vide */ });

/* ============================ PARALLAX DÉCO (watermarks, formes) ============================
   Uniquement sur les calques décoratifs (jamais le contenu). [data-parallax]
   = valeur yPercent appliquée pendant la traversée de la section. */
safe('parallax', function(){
  if(!HAS_GSAP || REDUCED) return;
  document.querySelectorAll('[data-parallax]').forEach(el=>{
    const amount=parseFloat(el.getAttribute('data-parallax'))||-12;
    gsap.to(el,{yPercent:amount,ease:'none',scrollTrigger:{trigger:el.closest('section')||el,start:'top bottom',end:'bottom top',scrub:true}});
  });
});

/* ============================ REVEALS (système global style Ribbit) ============================
   Un seul IntersectionObserver pilote toutes les entrées au scroll :
   - classes héritées : .rv .lup .who-rv .who-card
   - classes Ribbit    : .reveal-curtain .reveal-left .reveal-right .reveal-scale .reveal-open
   - compteurs animés  : .reveal-count[data-target]
   threshold 0.15 · rootMargin "0px 0px -60px 0px" · once (pas de replay).
   Un premier pass au chargement révèle ce qui est déjà dans le viewport
   (sinon les éléments above-the-fold restent masqués sur certaines pages). */
const REVEAL_SEL='.rv,.lup,.who-rv,.who-card,.reveal-curtain,.reveal-left,.reveal-right,.reveal-scale,.reveal-open,.reveal-count';

function animateCount(el){
  if(el.dataset.counted) return;
  el.dataset.counted='1';
  const target=parseFloat((el.dataset.target||el.textContent||'').toString().replace(',','.'))||0;
  const suffix=el.dataset.suffix||'';
  const dec=parseInt(el.dataset.decimals||'0',10);
  const dur=1500;
  // format FR : espace fine pour les milliers, virgule décimale.
  const fmt=(v)=>{ let s=dec?v.toFixed(dec).replace('.',','):String(Math.round(v));
    const parts=s.split(','); parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,' '); return parts.join(','); };
  if(REDUCED){ el.textContent=fmt(target)+suffix; return; }
  const start=performance.now();
  const expoOut=t=>t===1?1:1-Math.pow(2,-10*t);
  (function tick(now){
    const t=Math.min(1,(now-start)/dur);
    el.textContent=fmt(target*expoOut(t))+suffix;
    if(t<1) requestAnimationFrame(tick);
  })(start);
}

function revealEl(el){
  if(el.classList.contains('vis')) return;
  el.classList.add('vis');
  if(el.classList.contains('reveal-count')) animateCount(el);
  // will-change retiré une fois l'entrée terminée
  setTimeout(()=>{ el.style.willChange='auto'; }, 1100);
}

safe('reveals', function(){
  // compat : les blocs "qui sommes-nous" ont besoin de la classe d'amorçage
  document.querySelectorAll('.who-rv,.who-card').forEach(el=>el.classList.add('who-anim'));
  const els=document.querySelectorAll(REVEAL_SEL);
  if(!('IntersectionObserver' in window)){ els.forEach(revealEl); return; }

  const obs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ revealEl(e.target); obs.unobserve(e.target); } });
  },{threshold:.15,rootMargin:'0px 0px -60px 0px'});

  els.forEach(el=>obs.observe(el));

  // Premier pass : tout ce qui est déjà visible au chargement est révélé tout de suite.
  const passOn=(list)=>{
    const vh=window.innerHeight||document.documentElement.clientHeight;
    list.forEach(el=>{
      if(el.classList.contains('vis')) return;
      const r=el.getBoundingClientRect();
      if(r.top < vh*0.92 && r.bottom > 0){ revealEl(el); obs.unobserve(el); }
    });
  };
  const firstPass=()=>passOn(els);
  firstPass();
  window.addEventListener('load',firstPass);

  // Permet aux modules qui injectent du contenu (bons-plans, carte…) de
  // raccrocher leurs éléments .reveal-* au même observateur global.
  window.__rescanReveals=(root)=>{
    const fresh=(root||document).querySelectorAll(REVEAL_SEL);
    fresh.forEach(el=>{ if(!el.classList.contains('vis')) obs.observe(el); });
    passOn(fresh);
  };
});

/* ============================ ÉVÉNEMENTS — MASTER / DETAIL ============================
   Clic sur une carte : les cartes se referment sur la gauche, le détail
   apparaît sur la droite. Re-clic ou "Fermer" : retour à la grille. */
safe('events', function(){
  const stage=document.getElementById('evStage');
  if(!stage) return;
  const cards=stage.querySelector('.ev-cards');
  const panel=document.getElementById('evPanel');
  const body=document.getElementById('evBody');
  if(!cards||!panel||!body) return;

  function openCard(card){
    cards.querySelectorAll('.ev-card').forEach(c=>c.classList.remove('active'));
    card.classList.add('active');
    const src=card.querySelector('.ev-src');
    body.innerHTML=src?src.innerHTML:'';
    stage.classList.add('open');
    panel.setAttribute('aria-hidden','false');
    if(window.__rebindCursor) window.__rebindCursor();
    if(window.innerWidth<=1024) panel.scrollIntoView({behavior:'smooth',block:'nearest'});
  }
  function closePanel(){
    stage.classList.remove('open');
    panel.setAttribute('aria-hidden','true');
    cards.querySelectorAll('.ev-card').forEach(c=>c.classList.remove('active'));
  }

  cards.querySelectorAll('.ev-card').forEach(card=>{
    card.setAttribute('role','button');card.setAttribute('tabindex','0');
    card.addEventListener('click',()=>{ if(card.classList.contains('active')) closePanel(); else openCard(card); });
    card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();card.click()}});
  });
  panel.addEventListener('click',e=>{ if(e.target.closest('.ev-detail-close')) closePanel(); });

  window.filterEv=function(type,btn){
    document.querySelectorAll('.ftab').forEach(t=>t.classList.remove('on'));
    btn.classList.add('on');
    closePanel();
    cards.querySelectorAll('.ev-card').forEach((card,i)=>{
      const show = type==='tous' || card.dataset.type===type;
      card.style.transition=`opacity .35s ease ${i*.05}s,transform .35s ease ${i*.05}s`;
      if(show){card.style.display='flex';requestAnimationFrame(()=>{card.style.opacity=1;card.style.transform='translateY(0)'});}
      else{card.style.opacity=0;card.style.transform='translateY(10px)';setTimeout(()=>card.style.display='none',350);}
    });
  };
});

/* ============================ HELPERS DATES (FR) ============================ */
const FR_JOURS=['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'];
const FR_JOURS_L=['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
const FR_MOIS=['janv.','févr.','mars','avr.','mai','juin','juil.','août','sept.','oct.','nov.','déc.'];
const FR_MOIS_L=['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
function parseISO(iso){ return new Date((iso||'')+'T00:00:00'); }
function dateCourte(iso){ const d=parseISO(iso); return `${FR_JOURS[d.getDay()]} ${d.getDate()} ${FR_MOIS[d.getMonth()]}`; }
function dateLongue(iso){ const d=parseISO(iso); return `${FR_JOURS_L[d.getDay()]} ${d.getDate()} ${FR_MOIS_L[d.getMonth()]} ${d.getFullYear()}`; }
function prixLabel(p){ return p===0?'Gratuit':p+' €'; }

/* ============================ PAGE RENDEZ-VOUS (recherche + grille + réservation) ============================ */
safe('rdvPage', function(){
  const grid=document.getElementById('rdvGrid');
  if(!grid || typeof EVENEMENTS==='undefined') return;
  const countEl=document.getElementById('rdvCount');
  const emptyEl=document.getElementById('rdvEmpty');
  const searchForm=document.getElementById('rdvSearch');
  const fDate=document.getElementById('fDate'), fType=document.getElementById('fType'), fPrix=document.getElementById('fPrix');
  const ACCENT={signature:'var(--cta)',leger:'var(--flash-green)',famille:'var(--flash-blue)'};
  const byId=(id)=>EVENEMENTS.find(e=>e.id===id);

  function matches(ev){
    if(fDate.value!=='tous' && !ev.date.startsWith(fDate.value)) return false;
    if(fType.value!=='tous' && ev.type!==fType.value) return false;
    const p=fPrix.value;
    if(p==='gratuit' && ev.prix!==0) return false;
    if(p==='0-25' && ev.prix>25) return false;
    if(p==='25-50' && (ev.prix<25 || ev.prix>50)) return false;
    return true;
  }
  function cardHTML(ev){
    const full=ev.placesRestantes<=0;
    const low=!full && ev.placesRestantes<=5;
    const tag=(typeof EVENT_TYPES!=='undefined' && EVENT_TYPES[ev.type])||ev.type;
    const places=full?'Complet':ev.placesRestantes+' places restantes';
    const action=full
      ? '<span class="rdv-badge-full">Complet</span>'
      : '<button class="rdv-btn" type="button" data-resa="'+ev.id+'">S\'inscrire</button>';
    return '<article class="rdv-card reveal-scale'+(full?' full':'')+'" style="--accent:'+(ACCENT[ev.type]||'var(--cta)')+'">'
      +'<div class="rdv-c-head"><div class="rdv-c-date">'+dateCourte(ev.date)+'<small>'+ev.heure+'</small></div>'
      +'<span class="rdv-c-tag">'+tag+'</span></div>'
      +'<h3 class="rdv-c-title">'+ev.titre+'</h3>'
      +'<div class="rdv-c-lieu">📍 '+ev.lieu+'</div>'
      +'<div class="rdv-c-foot"><div class="rdv-c-meta"><span class="rdv-c-prix">'+prixLabel(ev.prix)+'</span>'
      +'<span class="rdv-c-places'+(low?' low':'')+'">'+places+'</span></div>'+action+'</div></article>';
  }
  function render(){
    const list=EVENEMENTS.filter(matches).sort((a,b)=>a.date.localeCompare(b.date));
    grid.innerHTML=list.map(cardHTML).join('');
    emptyEl.hidden=list.length>0;
    countEl.textContent=list.length+' rendez-vous à venir';
    requestAnimationFrame(()=>grid.querySelectorAll('.rdv-card').forEach(c=>c.classList.add('vis')));
    if(window.__rebindCursor) window.__rebindCursor();
  }
  searchForm.addEventListener('submit',e=>{e.preventDefault();render();});
  [fDate,fType,fPrix].forEach(s=>s.addEventListener('change',render));
  render();
  // Les clics « S'inscrire » (data-resa) sont gérés globalement par le module rsvp.
});

/* ============================ MOTEUR DE RECHERCHE ÉVÉNEMENTS (style Airbnb) ============================
   Monté sur tout [data-event-search]. data-initial = nb d'exemples affichés
   au départ (0 = rien, on attend une recherche). data-title / data-eyebrow
   pour l'en-tête. Les cartes ouvrent le carton d'inscription (data-resa). */
const _norm=s=>(s||'').toString().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
safe('eventSearch', function(){
  const mounts=document.querySelectorAll('[data-event-search]');
  if(!mounts.length || typeof EVENEMENTS==='undefined') return;
  const ACCENT={signature:'var(--cta)',leger:'var(--sage-700)',famille:'var(--dusk)'};
  const months=Array.from(new Set(EVENEMENTS.map(e=>e.date.slice(0,7)))).sort();
  const moLabel=(m)=>{const p=m.split('-');const n=FR_MOIS_L[(+p[1])-1]||'';return n.charAt(0).toUpperCase()+n.slice(1)+' '+p[0];};
  const types=(typeof EVENT_TYPES!=='undefined')?EVENT_TYPES:{};

  mounts.forEach(mount=>{
    const initial=parseInt(mount.getAttribute('data-initial')||'0',10);
    mount.classList.add('evs');
    mount.innerHTML=
      '<form class="evs-bar" autocomplete="off">'
      +'<div class="evs-field evs-grow"><label>Envie de…</label><input type="text" class="evs-q" placeholder="Un dîner, une balade, un domaine…"></div>'
      +'<div class="evs-sep"></div>'
      +'<div class="evs-field"><label>Quand</label><select class="evs-date"><option value="tous">Toutes les dates</option>'
        +months.map(m=>'<option value="'+m+'">'+moLabel(m)+'</option>').join('')+'</select></div>'
      +'<div class="evs-sep"></div>'
      +'<div class="evs-field"><label>Format</label><select class="evs-type"><option value="tous">Tous les formats</option>'
        +Object.keys(types).map(t=>'<option value="'+t+'">'+types[t]+'</option>').join('')+'</select></div>'
      +'<button type="submit" class="evs-btn" aria-label="Rechercher"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg><span>Rechercher</span></button>'
      +'</form>'
      +'<div class="evs-results"><div class="evs-count"></div><div class="evs-grid"></div></div>';

    const form=mount.querySelector('.evs-bar');
    const q=mount.querySelector('.evs-q');
    const selDate=mount.querySelector('.evs-date');
    const selType=mount.querySelector('.evs-type');
    const grid=mount.querySelector('.evs-grid');
    const count=mount.querySelector('.evs-count');
    let searched=false;

    function matches(ev){
      if(selDate.value!=='tous' && !ev.date.startsWith(selDate.value)) return false;
      if(selType.value!=='tous' && ev.type!==selType.value) return false;
      const term=_norm(q.value).trim();
      if(term){
        const hay=_norm([ev.titre,ev.lieu,ev.description,(ev.tags||[]).join(' '),types[ev.type]].join(' '));
        if(!term.split(/\s+/).every(w=>hay.includes(w))) return false;
      }
      return true;
    }
    function card(ev){
      const full=ev.placesRestantes<=0;
      const low=!full&&ev.placesRestantes<=5;
      const tag=types[ev.type]||ev.type;
      const places=full?'Complet':ev.placesRestantes+' places restantes';
      const foot=full
        ? '<span class="evs-badge-full">Complet — liste d\'attente</span>'
        : '<span class="evs-c-go">Voir &amp; s\'inscrire <i>&#8594;</i></span>';
      return '<article class="evs-card'+(full?' full':'')+'" style="--accent:'+(ACCENT[ev.type]||'var(--cta)')+'" data-resa="'+ev.id+'" role="button" tabindex="0">'
        +'<div class="evs-c-top"><div class="evs-c-date">'+dateCourte(ev.date)+'<small>'+ev.heure+'</small></div><span class="evs-c-tag">'+tag+'</span></div>'
        +'<h3 class="evs-c-title">'+ev.titre+'</h3><div class="evs-c-lieu">'+ev.lieu+'</div>'
        +'<div class="evs-c-foot"><div><span class="evs-c-prix">'+prixLabel(ev.prix)+'</span> '
        +'<span class="evs-c-places'+(low?' low':'')+'">'+places+'</span></div>'+foot+'</div></article>';
    }
    function render(isInit){
      let list=EVENEMENTS.slice().sort((a,b)=>a.date.localeCompare(b.date));
      if(isInit){
        if(initial<=0){ grid.innerHTML=''; count.innerHTML='<span class="evs-prompt">Tous les événements à venir à Cognac et dans les alentours</span>'; return; }
        list=list.slice(0,initial);
        count.textContent='';
      }else{
        list=list.filter(matches);
        count.textContent=list.length? list.length+' rendez-vous trouvé'+(list.length>1?'s':'') : '';
      }
      grid.innerHTML=list.length?list.map(card).join(''):'<p class="evs-prompt">Aucun rendez-vous à afficher pour le moment — inscrivez-vous à la newsletter pour être prévenu·e des prochaines dates.</p>';
      if(window.__rebindCursor) window.__rebindCursor();
    }
    form.addEventListener('submit',e=>{e.preventDefault();searched=true;render(false);});
    [selDate,selType].forEach(s=>s.addEventListener('change',()=>{searched=true;render(false);}));
    let deb; q.addEventListener('input',()=>{clearTimeout(deb);deb=setTimeout(()=>{searched=true;render(false);},220);});
    // clavier sur les cartes (le clic data-resa est géré globalement par rsvp)
    grid.addEventListener('keydown',e=>{const c=e.target.closest('.evs-card');if(c&&(e.key==='Enter'||e.key===' ')){e.preventDefault();c.click();}});
    render(true);
  });
});

/* ============================ « LIVRE » DES ÉVÉNEMENTS PASSÉS ============================
   Section #book épinglée : au scroll les pages se tournent (max 4). */
safe('book', function(){
  const stage=document.getElementById('bookStage');
  if(!stage || typeof EVENEMENTS_PASSES==='undefined') return;
  if(stage.offsetParent===null) return; // section masquée (display:none) → on n'initialise pas
  const list=EVENEMENTS_PASSES.slice().sort((a,b)=>b.date.localeCompare(a.date)).slice(0,4);
  const tot=list.length;
  function pageHTML(ev,i){
    const photo=ev.image?'<img src="'+ev.image+'" alt="'+ev.titre+'" loading="lazy" onerror="this.style.display=\'none\'">':'';
    return '<div class="book-photo">'+photo+'<span class="bp-tag">ALVA · '+ev.annee+'</span></div>'
      +'<div class="book-text"><div class="book-date">'+dateCourte(ev.date)+' '+ev.annee+' · '+ev.lieu+'</div>'
      +'<h3 class="book-title">'+ev.titre+'</h3><p class="book-recit">'+(ev.recit||'')+'</p>'
      +'<div class="book-pageno">'+(i+1)+' / '+tot+'</div></div>';
  }

  // UNE carte (toujours dans le flux → jamais vide) qui se TOURNE comme une
  // page de livre vers la suivante. Pilotée par flèches + scroll latéral + swipe.
  stage.classList.add('book-flipwrap');
  stage.innerHTML=
    '<button class="book-arrow book-prev" type="button" aria-label="Page précédente">‹</button>'
    +'<div class="book-flip"><article class="book-page" id="bookCard">'+pageHTML(list[0],0)+'</article></div>'
    +'<button class="book-arrow book-next" type="button" aria-label="Page suivante">›</button>';

  const flip=stage.querySelector('.book-flip');
  const card=stage.querySelector('#bookCard');
  const prev=stage.querySelector('.book-prev'), next=stage.querySelector('.book-next');
  let idx=0, busy=false;
  function arrows(){ prev.disabled=idx<=0; next.disabled=idx>=tot-1; }
  function go(dir){
    const n=idx+dir; if(busy || n<0 || n>=tot) return; busy=true;
    const out=dir>0?-90:90, inn=dir>0?90:-90;
    if(REDUCED){ idx=n; card.innerHTML=pageHTML(list[n],n); busy=false; arrows(); return; }
    flip.classList.add('turning');
    card.style.transition='transform .42s ease-in'; card.style.transform='rotateY('+out+'deg)';
    setTimeout(()=>{
      idx=n; card.innerHTML=pageHTML(list[n],n);
      card.style.transition='none'; card.style.transform='rotateY('+inn+'deg)';
      setTimeout(()=>{ card.style.transition='transform .42s ease-out'; card.style.transform='rotateY(0deg)';
        setTimeout(()=>{ flip.classList.remove('turning'); busy=false; arrows(); if(window.__rebindCursor)window.__rebindCursor(); },430); },30);
    },430);
  }
  next.addEventListener('click',()=>go(1));
  prev.addEventListener('click',()=>go(-1));
  // scroll latéral → tourne (n'affecte pas le scroll vertical)
  let wl=false;
  stage.addEventListener('wheel',e=>{ if(Math.abs(e.deltaX)>Math.abs(e.deltaY) && Math.abs(e.deltaX)>6){ e.preventDefault();
    if(wl)return; wl=true; setTimeout(()=>wl=false,520); go(e.deltaX>0?1:-1); } },{passive:false});
  // swipe tactile
  let sx=null;
  stage.addEventListener('touchstart',e=>{ sx=e.touches[0].clientX; },{passive:true});
  stage.addEventListener('touchend',e=>{ if(sx==null)return; const dx=e.changedTouches[0].clientX-sx; if(Math.abs(dx)>40) go(dx<0?1:-1); sx=null; },{passive:true});
  arrows();
  if(window.__rebindCursor) window.__rebindCursor();
});

/* ============================ LE CARTON D'INVITATION (RSVP HelloAsso) ============================
   Composant signature partagé : injecté sur CHAQUE page, se déplie en 3D.
   Wizard 4 temps — carton récap → identité → paiement HelloAsso → confirmation.
   - openResa(ev) ouvre avec un objet événement (data/evenements.js)
   - tout bouton [data-resa="<id>"] l'ouvre (résolu via EVENEMENTS)
   - email mémorisé en localStorage (pré-remplissage)
   - notification asso via Formspree (si configuré). */
safe('rsvp', function(){
  let modal=document.getElementById('resaModal');
  // Injection si la page ne contient pas déjà le carton.
  if(!modal){
    const tpl=document.createElement('div');
    tpl.innerHTML=RSVP_MARKUP();
    modal=tpl.firstElementChild;
    document.body.appendChild(modal);
  } else if(!modal.querySelector('.carton-top')){
    // carton déjà en dur : on lui ajoute le liseré haut pour l'esthétique carton
    const bar=document.createElement('div'); bar.className='carton-top';
    modal.querySelector('.resa-card').prepend(bar);
  }

  let currentEv=null;
  const byId=(id)=> (typeof EVENEMENTS!=='undefined') ? EVENEMENTS.find(e=>e.id===id) : null;
  const fmtLong=(typeof dateLongue==='function')?dateLongue:(d=>d);
  const fmtPrix=(typeof prixLabel==='function')?prixLabel:(p=>p+' €');
  const typeLabel=(t)=>(typeof EVENT_TYPES!=='undefined'&&EVENT_TYPES[t])||t;
  const $=(id)=>modal.querySelector('#'+id);

  function setStep(n){
    modal.querySelectorAll('.resa-pane').forEach(p=>p.classList.toggle('on',p.dataset.step===String(n)));
    modal.querySelectorAll('.resa-dot').forEach(d=>{const s=+d.dataset.s;d.classList.toggle('on',s===n);d.classList.toggle('done',s<n);});
  }
  function openResa(ev){
    if(!ev) return;
    currentEv=ev;
    $('resaDate').textContent=fmtLong(ev.date)+' · '+ev.heure;
    $('resaTitle').textContent=ev.titre;
    $('resaDesc').textContent=ev.description||'';
    $('resaInfo').innerHTML=
      '<div class="i"><span>Lieu</span><b>'+ev.lieu+'</b></div>'
     +'<div class="i"><span>Tarif</span><b>'+fmtPrix(ev.prix)+'</b></div>'
     +'<div class="i"><span>Format</span><b>'+typeLabel(ev.type)+'</b></div>'
     +'<div class="i"><span>Places</span><b>'+ev.placesRestantes+' restantes</b></div>';
    const saved=localStorage.getItem('alva_email');
    if(saved && $('resaEmail')) $('resaEmail').value=saved;
    setStep(1);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    if(window.__rebindCursor) window.__rebindCursor();
  }
  function closeResa(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); }
  window.openResa=openResa;   // accessible partout

  $('resaClose') && $('resaClose').addEventListener('click',closeResa);
  $('resaDone') && $('resaDone').addEventListener('click',closeResa);
  modal.addEventListener('click',e=>{ if(e.target===modal) closeResa(); });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape' && modal.classList.contains('open')) closeResa(); });
  modal.querySelectorAll('[data-goto]').forEach(b=>b.addEventListener('click',()=>setStep(+b.dataset.goto)));

  // Délégation globale : tout bouton « S'inscrire » qui porte data-resa.
  document.addEventListener('click',e=>{
    const btn=e.target.closest('[data-resa]');
    if(!btn) return;
    e.preventDefault();
    const ev=byId(btn.getAttribute('data-resa'));
    if(ev) openResa(ev);
  });

  const form=$('resaForm');
  form && form.addEventListener('submit',e=>{
    e.preventDefault();
    const data=Object.fromEntries(new FormData(form).entries());
    localStorage.setItem('alva_email',data.email||'');
    $('resaPayBtn').href=currentEv.helloassoUrl||'#';
    const lieuShort=(currentEv.lieu||'').split('·')[0].trim();
    $('resaPayRecap').innerHTML='<b>'+currentEv.titre+'</b><br>'+fmtLong(currentEv.date)+' · '+lieuShort+'<br>'+fmtPrix(currentEv.prix)+' · '+data.prenom+' '+data.nom;
    $('resaConfirm').innerHTML='Merci '+data.prenom+' ! Votre demande pour <b>'+currentEv.titre+'</b> est enregistrée. Un email de confirmation part vers '+data.email+'. À très vite à Cognac.';
    sendNotification(currentEv,data);
    setStep(3);
  });
  function sendNotification(ev,data){
    if(typeof ALVA_CONFIG==='undefined') return;
    const id=ALVA_CONFIG.formspreeId;
    if(!id || id==='VOTRE_ID') return;
    fetch(ALVA_CONFIG.formspreeUrl,{method:'POST',headers:{'Accept':'application/json','Content-Type':'application/json'},
      body:JSON.stringify({_subject:'Inscription ALVA — '+ev.titre,evenement:ev.titre,date:ev.date,prenom:data.prenom,nom:data.nom,email:data.email,telephone:data.telephone,tarif:fmtPrix(ev.prix),destinataire:ALVA_CONFIG.email})}).catch(()=>{});
  }
});

/* Markup du carton (identique aux ids attendus, + liseré haut « carton »). */
function RSVP_MARKUP(){ return ''
  +'<div class="resa-overlay" id="resaModal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="resaTitle">'
  +'<div class="resa-card"><div class="carton-top"></div>'
  +'<button class="resa-close" id="resaClose" aria-label="Fermer">&#10005;</button>'
  +'<div class="resa-progress" id="resaProgress"><span class="resa-dot on" data-s="1">1 · Détail</span><span class="resa-dot" data-s="2">2 · Vos infos</span><span class="resa-dot" data-s="3">3 · Paiement</span><span class="resa-dot" data-s="4">4 · Confirmé</span></div>'
  +'<div class="resa-pane on" data-step="1"><div class="resa-invite">Vous êtes convié·e</div><div class="resa-kicker" id="resaDate"></div><h3 class="resa-title" id="resaTitle"></h3><p class="resa-desc" id="resaDesc"></p><div class="resa-info" id="resaInfo"></div><div class="resa-actions"><button class="ev-btn resa-next" data-goto="2">Je réserve ma place <i>&#8594;</i></button></div></div>'
  +'<div class="resa-pane" data-step="2"><div class="resa-kicker">Vos coordonnées</div><h3 class="resa-step-title">À qui réservons-nous ?</h3><form id="resaForm" class="resa-form"><div class="resa-row"><div class="fg"><label class="fl">PRÉNOM</label><input class="fi" type="text" name="prenom" required></div><div class="fg"><label class="fl">NOM</label><input class="fi" type="text" name="nom" required></div></div><div class="fg"><label class="fl">EMAIL</label><input class="fi" type="email" name="email" id="resaEmail" required></div><div class="fg"><label class="fl">TÉLÉPHONE</label><input class="fi" type="tel" name="telephone" required></div><div class="resa-actions"><button type="button" class="resa-back" data-goto="1">&#8592; Retour</button><button type="submit" class="ev-btn">Continuer <i>&#8594;</i></button></div></form></div>'
  +'<div class="resa-pane" data-step="3"><div class="resa-kicker">Paiement sécurisé</div><h3 class="resa-step-title">Finalisez sur HelloAsso</h3><p class="resa-desc">Le paiement et l\'émission de votre reçu se font sur HelloAsso, la plateforme dédiée aux associations (sans frais cachés). Vous serez redirigé·e vers la page sécurisée de ce rendez-vous.</p><div class="resa-pay-recap" id="resaPayRecap"></div><div class="resa-actions"><button type="button" class="resa-back" data-goto="2">&#8592; Retour</button><a href="#" class="ev-btn" id="resaPayBtn" target="_blank" rel="noopener">Payer sur HelloAsso <i>&#8599;</i></a></div><button type="button" class="resa-skip" data-goto="4">J\'ai effectué le paiement →</button></div>'
  +'<div class="resa-pane" data-step="4"><div class="resa-check">&#10003;</div><h3 class="resa-step-title">C\'est noté, à bientôt !</h3><p class="resa-desc" id="resaConfirm"></p><div class="resa-actions"><button type="button" class="ev-btn" id="resaDone">Fermer</button></div></div>'
  +'</div></div>';
}

/* ============================ PAGE ÉVÉNEMENTS PASSÉS (masonry + stats + citations) ============================ */
safe('passesPage', function(){
  const masonry=document.getElementById('ppMasonry');
  if(!masonry || typeof EVENEMENTS_PASSES==='undefined') return;
  const yearsBox=document.getElementById('ppYears');
  const heights=['pp-card-h1','pp-card-h2','pp-card-h3','pp-card-h2','pp-card-h1','pp-card-h3'];

  function cardHTML(ev,i){
    const noImg=!ev.image;
    return '<article class="pp-card reveal-scale '+heights[i%heights.length]+(noImg?' no-img':'')+'">'
      +(ev.image?'<img src="'+ev.image+'" alt="'+ev.titre+'" loading="lazy" onerror="this.closest(\'.pp-card\').classList.add(\'no-img\')">':'')
      +'<span class="pp-card-label">ALVA · '+ev.annee+'</span>'
      +'<div class="pp-card-info"><div class="pp-card-date">'+dateCourte(ev.date)+' '+ev.annee+'</div>'
      +'<div class="pp-card-title">'+ev.titre+'</div>'
      +'<div class="pp-card-lieu">'+ev.lieu+'</div></div></article>';
  }
  function render(year){
    const list=EVENEMENTS_PASSES
      .filter(e=>year==='tous'||e.annee===year)
      .sort((a,b)=>b.date.localeCompare(a.date));
    masonry.innerHTML=list.map(cardHTML).join('');
    requestAnimationFrame(()=>masonry.querySelectorAll('.pp-card').forEach(c=>c.classList.add('vis')));
    if(window.__rebindCursor) window.__rebindCursor();
  }
  // filtres par année
  const years=Array.from(new Set(EVENEMENTS_PASSES.map(e=>e.annee))).sort((a,b)=>b.localeCompare(a));
  yearsBox.innerHTML='<button class="pp-year on" data-year="tous">Toutes</button>'
    +years.map(y=>'<button class="pp-year" data-year="'+y+'">'+y+'</button>').join('');
  yearsBox.addEventListener('click',e=>{
    const b=e.target.closest('.pp-year'); if(!b) return;
    yearsBox.querySelectorAll('.pp-year').forEach(x=>x.classList.remove('on'));
    b.classList.add('on');
    render(b.dataset.year);
  });
  render('tous');

  // stats animées (compteurs déclenchés à l'entrée dans le viewport)
  const statsBox=document.getElementById('ppStats');
  if(statsBox && typeof STATS_PASSES!=='undefined'){
    statsBox.innerHTML=STATS_PASSES.map(s=>
      '<div class="stat"><b class="reveal-count" data-target="'+s.valeur+'"'+(s.suffixe?' data-suffix="'+s.suffixe+'"':'')+'>0</b><span>'+s.label+'</span></div>'
    ).join('');
    if('IntersectionObserver' in window){
      const so=new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting){animateCount(e.target);so.unobserve(e.target);}}),{threshold:.4});
      statsBox.querySelectorAll('.reveal-count').forEach(el=>so.observe(el));
    } else {
      statsBox.querySelectorAll('.reveal-count').forEach(animateCount);
    }
  }

  // citations : carousel au drag
  const track=document.getElementById('ppQuotesTrack');
  const viewport=document.getElementById('ppQuotes');
  if(track && typeof CITATIONS!=='undefined'){
    track.innerHTML=CITATIONS.map(c=>'<figure class="pp-quote"><q>'+c.texte+'</q><cite>'+c.auteur+'</cite></figure>').join('');
    let down=false,startX=0,startScroll=0,moved=false;
    viewport.addEventListener('pointerdown',e=>{down=true;moved=false;startX=e.clientX;startScroll=viewport.scrollLeft;viewport.classList.add('dragging');viewport.setPointerCapture(e.pointerId);});
    viewport.addEventListener('pointermove',e=>{if(!down)return;const dx=e.clientX-startX;if(Math.abs(dx)>4)moved=true;viewport.scrollLeft=startScroll-dx;});
    const end=()=>{down=false;viewport.classList.remove('dragging');};
    viewport.addEventListener('pointerup',end);
    viewport.addEventListener('pointercancel',end);
    viewport.addEventListener('pointerleave',end);
    viewport.addEventListener('click',e=>{if(moved)e.preventDefault();},true);
  }
});

/* ============================ CARTE DU TERRITOIRE ============================
   Construit la carte stylisée sur tout élément [data-territory], à partir de
   data/lieux.js. Points qui pulsent par catégorie, le Fil relie les lieux,
   carte-info au survol / focus / tap. Pas de librairie carto. */
safe('territory', function(){
  const mounts=document.querySelectorAll('[data-territory]');
  if(!mounts.length || typeof LIEUX==='undefined') return;
  const CAT=(typeof LIEUX_CAT_LABEL!=='undefined')?LIEUX_CAT_LABEL:{};
  const CATS=Object.keys(CAT);
  const COLOR={table:'#B97A45',cafe:'#D2A45E',balade:'#9FB28C',culture:'#CF9A8E'};
  const gkey=(typeof ALVA_CONFIG!=='undefined' && ALVA_CONFIG.googleMapsKey && ALVA_CONFIG.googleMapsKey.trim() && ALVA_CONFIG.googleMapsKey.trim()!=='VOTRE_CLE') ? ALVA_CONFIG.googleMapsKey.trim() : '';

  // Construit l'habillage commun (titre, cadre carte, légende) et renvoie les refs.
  function shell(mount){
    const eyebrow=mount.getAttribute('data-eyebrow')||'Le carnet de la communauté';
    const title=mount.getAttribute('data-title')||'Cognac, <b>par ceux qui y vivent</b>';
    const mapId='alvaMap-'+Math.random().toString(36).slice(2,8);
    mount.classList.add('territory');
    mount.innerHTML=
      '<div class="terr-head"><div class="terr-eyebrow">'+eyebrow+'</div><h2>'+title+'</h2></div>'
      +'<div class="map-wrap"><div class="map-leaflet" id="'+mapId+'"></div>'
        +'<button class="map-reset" type="button" aria-label="Revenir à la vue d\'ensemble" hidden>↺ Vue d\'ensemble</button>'
      +'</div><div class="terr-legend"></div>';
    return {mapId, legend:mount.querySelector('.terr-legend'), resetBtn:mount.querySelector('.map-reset')};
  }
  function legendInit(legend,onPick){
    legend.innerHTML='<button class="terr-leg on" data-cat="tous">Tout afficher</button>'
      + CATS.map(c=>'<button class="terr-leg" data-cat="'+c+'"><i class="lg-'+c+'"></i>'+CAT[c]+'</button>').join('');
    legend.addEventListener('click',e=>{ const b=e.target.closest('.terr-leg'); if(!b) return;
      legend.querySelectorAll('.terr-leg').forEach(x=>x.classList.toggle('on',x===b)); onPick(b.dataset.cat); });
  }
  function popupHTML(lieu,color){
    const link=lieu.url?'<a class="poi-link" href="'+lieu.url+'" target="_blank" rel="noopener">Voir le site <span aria-hidden="true">↗</span></a>':'';
    const fav=lieu.fav?'<span class="fav">♥ Coup de cœur ALVA</span>':'';
    return '<div class="cat" style="color:'+color+'">'+(CAT[lieu.cat]||'')+'</div>'
      +'<h3>'+lieu.name+'</h3><div class="ville">'+(lieu.ville||'')+'</div><p>'+lieu.desc+'</p>'+fav+link;
  }

  /* ---------- Repli : Leaflet (gratuit, sans clé) ---------- */
  function buildLeaflet(mount){
    if(typeof L==='undefined'){ console.warn('[ALVA] Leaflet absent'); return; }
    const {mapId,legend,resetBtn}=shell(mount);
    const map=L.map(mapId,{scrollWheelZoom:false,zoomControl:true,attributionControl:true});
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',{maxZoom:19,subdomains:'abcd',attribution:'&copy; OpenStreetMap, &copy; CARTO'}).addTo(map);
    const bounds=L.latLngBounds(LIEUX.map(l=>[l.lat,l.lng]));
    const fit=()=>map.fitBounds(bounds,{padding:[50,50]});
    fit(); setTimeout(()=>{ map.invalidateSize(); fit(); },200);
    const markers={};
    LIEUX.forEach(lieu=>{
      const color=COLOR[lieu.cat]||'#B97A45';
      const icon=L.divIcon({className:'alva-pin-wrap',iconSize:[26,26],iconAnchor:[13,13],
        html:'<span class="alva-pin" style="--pc:'+color+'"><span class="alva-pin-ring"></span><span class="alva-pin-dot"></span></span>'});
      const m=L.marker([lieu.lat,lieu.lng],{icon,title:lieu.name,riseOnHover:true});
      m.bindPopup(popupHTML(lieu,color),{className:'alva-popup',maxWidth:250,autoPanPadding:[30,30]});
      m.on('click',()=>{ map.flyTo([lieu.lat,lieu.lng],16,{duration:1.1}); resetBtn.hidden=false; });
      m.addTo(map); markers[lieu.id]=m; m._cat=lieu.cat;
    });
    map.on('popupclose',()=>{ map.flyToBounds(bounds,{padding:[50,50],duration:1}); resetBtn.hidden=true; });
    resetBtn.addEventListener('click',()=>{ map.closePopup(); map.flyToBounds(bounds,{padding:[50,50],duration:1}); resetBtn.hidden=true; });
    legendInit(legend,cat=>{ Object.values(markers).forEach(m=>{ const show=(cat==='tous'||m._cat===cat);
      if(show&&!map.hasLayer(m))m.addTo(map); else if(!show&&map.hasLayer(m))map.removeLayer(m); }); map.closePopup(); });
  }

  /* ---------- Google Maps stylisée (si une clé est fournie) ---------- */
  const GSTYLE=[
    {elementType:'geometry',stylers:[{color:'#efe7d8'}]},
    {elementType:'labels.text.fill',stylers:[{color:'#7a6a55'}]},
    {elementType:'labels.text.stroke',stylers:[{color:'#faf6ef'},{weight:2}]},
    {featureType:'water',elementType:'geometry',stylers:[{color:'#c7d2da'}]},
    {featureType:'road',elementType:'geometry',stylers:[{color:'#f4ede1'}]},
    {featureType:'road',elementType:'labels.icon',stylers:[{visibility:'off'}]},
    {featureType:'poi',elementType:'labels',stylers:[{visibility:'off'}]},
    {featureType:'poi.park',elementType:'geometry',stylers:[{color:'#d3ddc4'}]},
    {featureType:'transit',stylers:[{visibility:'off'}]},
    {featureType:'administrative',elementType:'geometry',stylers:[{visibility:'off'}]}
  ];
  function buildGoogle(mount){
    const {mapId,legend,resetBtn}=shell(mount);
    const G=window.google.maps;
    const bounds=new G.LatLngBounds(); LIEUX.forEach(l=>bounds.extend({lat:l.lat,lng:l.lng}));
    const map=new G.Map(document.getElementById(mapId),{styles:GSTYLE,disableDefaultUI:false,
      mapTypeControl:false,streetViewControl:false,fullscreenControl:false,gestureHandling:'cooperative',backgroundColor:'#efe7d8'});
    map.fitBounds(bounds,60);
    const info=new G.InfoWindow();
    const markers={};
    LIEUX.forEach(lieu=>{
      const color=COLOR[lieu.cat]||'#B97A45';
      const m=new G.Marker({position:{lat:lieu.lat,lng:lieu.lng},map,title:lieu.name,
        icon:{path:G.SymbolPath.CIRCLE,scale:8,fillColor:color,fillOpacity:1,strokeColor:'#fff',strokeWeight:2}});
      m._cat=lieu.cat;
      m.addListener('click',()=>{ info.setContent('<div class="alva-gpopup">'+popupHTML(lieu,color)+'</div>');
        info.open(map,m); map.panTo({lat:lieu.lat,lng:lieu.lng}); map.setZoom(16); resetBtn.hidden=false; });
      markers[lieu.id]=m;
    });
    info.addListener('closeclick',()=>{ map.fitBounds(bounds,60); resetBtn.hidden=true; });
    resetBtn.addEventListener('click',()=>{ info.close(); map.fitBounds(bounds,60); resetBtn.hidden=true; });
    legendInit(legend,cat=>{ Object.values(markers).forEach(m=>m.setMap((cat==='tous'||m._cat===cat)?map:null)); info.close(); });
  }

  if(gkey){
    window.__alvaGmapsInit=function(){ mounts.forEach(buildGoogle); };
    if(!document.getElementById('alva-gmaps')){
      const s=document.createElement('script'); s.id='alva-gmaps'; s.async=true;
      s.src='https://maps.googleapis.com/maps/api/js?key='+encodeURIComponent(gkey)+'&callback=__alvaGmapsInit&loading=async';
      s.onerror=()=>{ console.warn('[ALVA] Google Maps indisponible — repli Leaflet'); mounts.forEach(buildLeaflet); };
      document.head.appendChild(s);
    }
  } else {
    mounts.forEach(buildLeaflet);
  }
});

/* ============================ REVEAL-WORDS (accroches mot à mot) ============================
   Découpe le texte d'un .reveal-words en mots qui montent en cascade. */
safe('revealWords', function(){
  const els=document.querySelectorAll('.reveal-words');
  if(!els.length) return;
  els.forEach(el=>{
    const words=el.textContent.trim().split(/\s+/);
    el.textContent='';
    words.forEach((w,i)=>{
      const outer=document.createElement('span'); outer.className='rw-word';
      const inner=document.createElement('span'); inner.textContent=w;
      inner.style.transitionDelay=(i*0.055)+'s';
      outer.appendChild(inner);
      el.appendChild(outer);
      el.appendChild(document.createTextNode(' '));
    });
  });
  if(REDUCED || !('IntersectionObserver' in window)){ els.forEach(e=>e.classList.add('vis')); return; }
  const obs=new IntersectionObserver((ents)=>ents.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('vis'); obs.unobserve(e.target);} }),{threshold:.2});
  els.forEach(e=>obs.observe(e));
});

/* ============================ PAGE BONS PLANS ============================
   « Cognac, par ceux qui y vivent ». Rend les 4 carnets depuis data/bons-plans.js :
   codes avantages (copier ✓), agenda, adresses coup de cœur, à savoir en arrivant. */
safe('bonsPlans', function(){
  const onPage=document.getElementById('bpAvantages')||document.getElementById('bpCoups')||document.getElementById('bpAgenda');
  if(!onPage) return; // pas cette page

  // ---- Avantages : regroupés par catégorie, filtre interactif animé ----
  const av=document.getElementById('bpAvantages');
  if(av && typeof AVANTAGES!=='undefined' && AVANTAGES.length){
    const cats=Array.from(new Set(AVANTAGES.map(a=>a.categorie)));
    av.innerHTML='<div class="bp-av-tabs">'
      +'<button class="bp-av-tab on" data-cat="tous">Tout</button>'
      +cats.map(c=>'<button class="bp-av-tab" data-cat="'+c+'">'+c+'</button>').join('')
      +'</div><div class="bp-av-grid"></div>';
    const tabs=av.querySelector('.bp-av-tabs'), grid=av.querySelector('.bp-av-grid');
    const ico=(n)=>ALVA_ICONS[n]||'';
    function card(c){
      return '<article class="bp-av lglass" data-cat="'+c.categorie+'">'
        +'<div class="bp-av-body"><span class="bp-av-cat">'+c.categorie+'</span><h3>'+c.partenaire+'</h3><p>'+c.description+'</p></div>'
        +'<div class="bp-av-perk"><span class="bp-av-tag">Avantage</span><b>'+c.avantage+'</b></div></article>';
    }
    function render(cat){
      const list=cat==='tous'?AVANTAGES:AVANTAGES.filter(a=>a.categorie===cat);
      grid.innerHTML=list.map(card).join('');
      requestAnimationFrame(()=>grid.querySelectorAll('.bp-av').forEach((el,i)=>{el.style.transitionDelay=(i*0.05)+'s';el.classList.add('in');}));
      if(window.__rebindCursor) window.__rebindCursor();
    }
    tabs.addEventListener('click',e=>{const b=e.target.closest('.bp-av-tab');if(!b)return;
      tabs.querySelectorAll('.bp-av-tab').forEach(x=>x.classList.toggle('on',x===b));render(b.dataset.cat);});
    render('tous');
  }

  // ---- Agenda de Cognac : moteur de recherche (style Airbnb) ----
  const ag=document.getElementById('bpAgenda');
  if(ag && typeof AGENDA_COGNAC!=='undefined'){
    const cats=Array.from(new Set(AGENDA_COGNAC.map(a=>a.categorie)));
    ag.classList.add('evs');
    ag.innerHTML=
      '<form class="evs-bar" autocomplete="off">'
      +'<div class="evs-field evs-grow"><label>Envie de…</label><input type="text" class="ag-q" placeholder="Un concert, un marché, une expo…"></div>'
      +'<div class="evs-sep"></div>'
      +'<div class="evs-field"><label>Type</label><select class="ag-cat"><option value="tous">Tout</option>'
        +cats.map(c=>'<option value="'+c+'">'+c+'</option>').join('')+'</select></div>'
      +'<button type="submit" class="evs-btn" aria-label="Rechercher"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg><span>Rechercher</span></button>'
      +'</form><div class="evs-results"><div class="evs-count"></div><div class="ag-grid"></div></div>';
    const q=ag.querySelector('.ag-q'), cat=ag.querySelector('.ag-cat'), grid=ag.querySelector('.ag-grid'), count=ag.querySelector('.evs-count'), form=ag.querySelector('.evs-bar');
    function row(a){
      return '<a class="ag-card reveal-left" href="'+(a.lien||'#')+'" target="_blank" rel="noopener">'
        +'<div class="ag-card-cat">'+a.categorie+'</div>'
        +'<div class="ag-card-main"><h3>'+a.titre+'</h3><span>'+a.date+' · '+a.lieu+'</span></div>'
        +'<span class="ag-card-go" aria-hidden="true">↗</span></a>';
    }
    function render(){
      const term=_norm(q.value).trim();
      const list=AGENDA_COGNAC.filter(a=>{
        if(cat.value!=='tous' && a.categorie!==cat.value) return false;
        if(term){ const hay=_norm([a.titre,a.lieu,a.categorie,(a.tags||[]).join(' ')].join(' ')); if(!term.split(/\s+/).every(w=>hay.includes(w))) return false; }
        return true;
      });
      count.textContent='';
      grid.innerHTML=list.length?list.map(row).join(''):'<p class="evs-prompt">Rien à cet endroit-là — élargissez la recherche.</p>';
      if(window.__rescanReveals) window.__rescanReveals(grid);
      if(window.__rebindCursor) window.__rebindCursor();
    }
    form.addEventListener('submit',e=>{e.preventDefault();render();});
    cat.addEventListener('change',render);
    let deb; q.addEventListener('input',()=>{clearTimeout(deb);deb=setTimeout(render,200);});
    render();
  }

  // ---- 3 coups de cœur du mois prochain ----
  const coups=document.getElementById('bpCoups');
  if(coups && typeof COUPS_DE_COEUR!=='undefined'){
    coups.innerHTML=COUPS_DE_COEUR.map((c,i)=>
      '<a class="bp-coup lglass slide-in" data-side="'+(i%2?'right':'left')+'" href="'+(c.lien||'#')+'" target="_blank" rel="noopener">'
      +'<div class="bp-coup-when">'+c.quand+'</div>'
      +'<h3>'+c.titre+'</h3>'
      +'<div class="bp-coup-lieu">'+c.lieu+'</div>'
      +'<p>'+c.description+'</p>'
      +'<span class="bp-coup-go">Y aller <i>→</i></span></a>').join('');
  }

  // ---- À savoir en arrivant ----
  const tp=document.getElementById('bpTips');
  if(tp && typeof TIPS_ARRIVEE!=='undefined'){
    tp.innerHTML=TIPS_ARRIVEE.map(t=>
      '<article class="bp-tip reveal-left"><span class="bp-tip-ico alva-ico" aria-hidden="true">'+(ALVA_ICONS[t.icon]||'')+'</span><div><h3>'+t.titre+'</h3><p>'+t.texte+'</p></div></article>').join('');
  }

  if(window.__rescanReveals) window.__rescanReveals();
  if(window.__rebindCursor) window.__rebindCursor();
});

/* ============================ FAQ ACCORDÉON ============================ */
safe('faq', function(){
  const qs=document.querySelectorAll('.faq-q');
  if(!qs.length) return;
  qs.forEach(q=>{
    q.setAttribute('aria-expanded','false');
    q.addEventListener('click',()=>{
      const item=q.closest('.faq-item');
      const a=item.querySelector('.faq-a');
      const open=item.classList.toggle('open');
      a.style.maxHeight = open ? (a.firstElementChild.scrollHeight+'px') : 0;
      q.setAttribute('aria-expanded', open?'true':'false');
      // la hauteur de page change → on recale la tête du fil (et le halo)
      if(window.__threadUpdate) setTimeout(window.__threadUpdate,420);
    });
  });
});

/* ============================ ENTRÉES LATÉRALES (scrub) ============================
   Les blocs [data-side] glissent depuis le côté au fil du scroll, et repartent
   quand on remonte — « ils sortent des côtés de la page ». */
safe('sideReveal', function(){
  const els=document.querySelectorAll('.slide-in');
  if(!els.length || !HAS_GSAP || REDUCED) return;
  els.forEach(el=>{
    const dir=el.getAttribute('data-side')==='left'?-1:1;
    gsap.fromTo(el,{xPercent:32*dir,opacity:0},{xPercent:0,opacity:1,ease:'power2.out',
      scrollTrigger:{trigger:el,start:'top 90%',end:'top 55%',scrub:true}});
  });
});

/* ============================ CARROUSEL AUTO (marquee) ============================
   Grille qui défile toute seule sur le côté ; on continue à scroller verticalement. */
safe('marquee', function(){
  document.querySelectorAll('.marquee-track').forEach(t=>{ t.setAttribute('aria-hidden','false'); t.innerHTML+=t.innerHTML; });
});

/* ============================ TILT 3D (cartes [data-tilt], ≤8°) ============================ */
safe('tilt', function(){
  if(REDUCED) return;
  const MAX=8;
  document.querySelectorAll('[data-tilt]').forEach(el=>{
    el.addEventListener('mousemove',e=>{
      const r=el.getBoundingClientRect();
      const px=(e.clientX-r.left)/r.width-0.5;
      const py=(e.clientY-r.top)/r.height-0.5;
      el.style.transform='perspective(800px) rotateY('+(px*MAX).toFixed(2)+'deg) rotateX('+(-py*MAX).toFixed(2)+'deg) translateY(-4px)';
    });
    el.addEventListener('mouseleave',()=>{ el.style.transform=''; });
  });
});

/* ============================ NAV UNIFIÉE + BOTTOM NAV MOBILE ============================
   Source unique : reconstruit le menu plein écran (liste canonique, avec « Bons
   plans ») et injecte la barre du bas mobile, en marquant la page courante. */
/* Icônes réseaux sociaux — partagées (footer + page contact). */
const ALVA_SOCIAL={
  instagram:['https://instagram.com/alva.cognac','Instagram','<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none"/></svg>'],
  facebook:['https://facebook.com/alva.cognac','Facebook','<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 8.5V7c0-1 .5-1.5 1.6-1.5H17V2.6C16.5 2.5 15.6 2.4 14.7 2.4c-2.3 0-3.7 1.4-3.7 3.9v2.2H8.4V12H11v9.4h3V12h2.4l.5-3.5H14z" fill="currentColor" stroke="none"/></svg>'],
  linkedin:['https://linkedin.com/company/alva-cognac','LinkedIn','<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 10v7M7 7v.01M11.5 17v-4a2 2 0 0 1 4 0v4M11.5 17v-7" /></svg>']
};
window.ALVA_SOCIAL=ALVA_SOCIAL;

safe('nav', function(){
  // URLs propres (sans .html) : on normalise le chemin courant pour le marquage « current ».
  let path=(location.pathname||'/').toLowerCase().replace(/\/+$/,'').replace(/\.html$/,'');
  if(path===''||path==='/index') path='/';
  const onIndex=(path==='/');

  // Liste canonique du menu (sans numéros, sans page « Événements passés », concept+manifeste fusionnés).
  const MENU=[
    ['/les-rendez-vous','Les rendez-vous'],
    ['/bons-plans','Bons plans'],
    ['/le-concept','Le concept'],
    ['/partenaires','Partenaires'],
    ['/contact','Contact']
  ];

  const menu=document.getElementById('menu');
  const mlist=document.querySelector('.mlist');
  if(mlist){
    mlist.innerHTML=MENU.map(([href,label])=>{
      const cur=(href===path)?' class="current"':'';
      return '<li><a href="'+href+'"'+cur+' data-link>'+label+'</a></li>';
    }).join('');
    if(menu) mlist.querySelectorAll('[data-link]').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));
  }
  // Pied du menu plein écran : plus de « COGNAC · CHARENTE · 2026 ».
  const mfoot=document.querySelector('.mfoot');
  if(mfoot) mfoot.innerHTML='<span>L\'association qui relie celles et ceux qui arrivent.</span><a href="'+ALVA_SOCIAL.instagram[0]+'" target="_blank" rel="noopener">@alva.cognac</a>';

  // ---- Pied de page : nav linéaire cliquable, sur chaque page ----
  const footer=document.querySelector('footer');
  if(footer){
    const email=(window.ALVA_CONFIG&&ALVA_CONFIG.email)||'contact@asso-alva.fr';
    const links=[['/','Accueil']].concat(MENU);
    const fnav=links.map(([href,label])=>{
      const cur=(href===path)?' class="current"':'';
      return '<a href="'+href+'"'+cur+'>'+label+'</a>';
    }).join('');
    const social=Object.keys(ALVA_SOCIAL).map(k=>{
      const [url,name,svg]=ALVA_SOCIAL[k];
      return '<a href="'+url+'" target="_blank" rel="noopener" aria-label="'+name+'">'+svg+'</a>';
    }).join('');
    const legal='<nav class="flegal" aria-label="Informations légales">'
      +'<a href="/mentions-legales">Mentions légales</a>'
      +'<a href="/cgu">CGU</a>'
      +'<a href="/politique-confidentialite">Confidentialité</a>'
      +'<a href="/politique-confidentialite#cookies">Cookies</a></nav>';
    footer.innerHTML=
      '<div class="foot-wrap">'
      +'<div class="foot-top"><a href="/" class="flogo" data-home>ALVA<b>.</b></a><nav class="fnav" aria-label="Pied de page">'+fnav+'</nav></div>'
      +'<div class="foot-bottom"><span class="fcopy">© '+(new Date().getFullYear())+' Association ALVA · Loi 1901</span>'+legal
      +'<div class="fsocial"><a class="fmail" href="mailto:'+email+'">'+email+'</a>'+social+'</div></div>'
      +'</div>';
  }

  // ---- Logo ALVA (header + footer) → retour accueil + rejoue l'animation ----
  function goHome(e){
    if(onIndex){
      e.preventDefault();
      window.scrollTo({top:0,behavior:'smooth'});
      if(window.__playHero) window.__playHero();
    }
    // sinon : navigation normale vers index.html (l'animation se joue au chargement)
  }
  document.querySelectorAll('.nlogo,[data-home]').forEach(l=>l.addEventListener('click',goHome));

  // ---- Header : disparaît au scroll vers le bas, réapparaît au scroll vers le haut ----
  const navEl=document.getElementById('nav');
  if(navEl){
    let lastY=window.scrollY||0, ticking=false;
    function update(){
      const y=window.scrollY||0;
      navEl.classList.toggle('nav-solid', y>60);
      if(y>lastY+6 && y>240 && !(menu&&menu.classList.contains('open'))) navEl.classList.add('nav-hidden');
      else if(y<lastY-6) navEl.classList.remove('nav-hidden');
      lastY=y; ticking=false;
    }
    window.addEventListener('scroll',()=>{ if(!ticking){ ticking=true; requestAnimationFrame(update); } },{passive:true});
    update();
  }

  // ---- Bottom nav mobile (5 entrées) ----
  const I={
    home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>',
    cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/></svg>',
    tag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h7l9 9-7 7-9-9z"/><circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
    star:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17.8 6.8 19.6l1-5.8L3.5 9.7l5.9-.9z"/></svg>',
    mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m4 7 8 6 8-6"/></svg>'
  };
  const BN=[
    ['/','Accueil',I.home],
    ['/les-rendez-vous','RDV',I.cal],
    ['/bons-plans','Bons plans',I.tag],
    ['/partenaires','Partenaires',I.star],
    ['/contact','Contact',I.mail]
  ];
  if(!document.querySelector('.botnav')){
    const bar=document.createElement('nav');
    bar.className='botnav'; bar.setAttribute('aria-label','Navigation principale');
    bar.innerHTML=BN.map(([href,label,ico])=>{
      const cur=(href===path)?' current':'';
      return '<a href="'+href+'" class="bn'+cur+'"'+(cur?' aria-current="page"':'')+'><span class="bn-ico" aria-hidden="true">'+ico+'</span>'+label+'</a>';
    }).join('');
    document.body.appendChild(bar);
  }

  if(window.__rebindCursor) window.__rebindCursor();
});

/* ============================ LIENS RÉSEAUX SOCIAUX ([data-social-links]) ============================ */
safe('socialLinks', function(){
  const box=document.querySelector('[data-social-links]');
  if(!box || typeof ALVA_SOCIAL==='undefined') return;
  box.innerHTML=Object.keys(ALVA_SOCIAL).map(k=>{
    const [url,name,svg]=ALVA_SOCIAL[k];
    return '<a href="'+url+'" target="_blank" rel="noopener" class="soc-link"><span class="soc-ic" aria-hidden="true">'+svg+'</span><span>'+name+'</span></a>';
  }).join('');
  if(window.__rebindCursor) window.__rebindCursor();
});

/* ============================ FORMULAIRES DE CONTACT (Formspree, AJAX) ============================
   Branche les formulaires simples (contact + partenaires) sur Formspree, en
   asynchrone (pas de rechargement) → confirmation affichée sur place.
   Tant que l'ID Formspree n'est pas renseigné dans data/config.js, on bascule
   sur un mail pré-rempli (mailto) pour ne perdre AUCUN message. */
safe('contactForms', function(){
  const forms=document.querySelectorAll('form[data-contact]');
  if(!forms.length) return;
  const cfg=window.ALVA_CONFIG||{};
  const configured = cfg.formspreeId && cfg.formspreeId!=='VOTRE_ID';

  forms.forEach(form=>{
    if(configured){ form.setAttribute('action', cfg.formspreeUrl); form.setAttribute('method','POST'); }
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const data=Object.fromEntries(new FormData(form).entries());

      // Formspree pas encore branché → on ouvre le mail pré-rempli vers l'asso.
      if(!configured){
        const to=cfg.email||'contact@asso-alva.fr';
        const subject=encodeURIComponent(data._subject || data.sujet || 'Message depuis le site ALVA');
        const body=encodeURIComponent(
          Object.entries(data).filter(([k])=>k.charAt(0)!=='_')
            .map(([k,v])=>k.toUpperCase()+' : '+v).join('\n'));
        window.location.href='mailto:'+to+'?subject='+subject+'&body='+body;
        return;
      }

      const btn=form.querySelector('[type="submit"]');
      const old=btn?btn.textContent:'';
      if(btn){ btn.disabled=true; btn.textContent='Envoi…'; }
      fetch(cfg.formspreeUrl,{method:'POST',
        headers:{'Accept':'application/json','Content-Type':'application/json'},
        body:JSON.stringify(Object.assign({_replyto:data.email}, data))})
        .then(r=>{
          if(!r.ok) throw new Error('formspree');
          const prenom=data.nom?String(data.nom).split(' ')[0]:'';
          form.innerHTML='<div class="form-sent"><div class="form-sent-ic" aria-hidden="true">&#10003;</div>'
            +'<h3>Message bien reçu&nbsp;!</h3><p>Merci '+prenom+'. On vous répond sous 48h'
            +(data.email?(' sur <b>'+data.email+'</b>'):'')+'.</p></div>';
        })
        .catch(()=>{
          if(btn){ btn.disabled=false; btn.textContent=old; }
          let err=form.querySelector('.form-err');
          if(!err){ err=document.createElement('p'); err.className='form-err'; if(btn) btn.insertAdjacentElement('afterend',err); }
          err.textContent='Oups, l’envoi a échoué. Écrivez-nous directement à '+(cfg.email||'contact@asso-alva.fr')+'.';
        });
    });
  });
});

/* ============================ DONNÉES STRUCTURÉES « Event » (SEO) ============================
   Génère un bloc JSON-LD schema.org/Event par rendez-vous (page agenda) à partir
   de data/evenements.js → éligibilité aux résultats enrichis Google. */
safe('eventJsonLd', function(){
  if(typeof EVENEMENTS==='undefined' || !Array.isArray(EVENEMENTS)) return;
  if(!/\/les-rendez-vous/.test(location.pathname)) return;
  EVENEMENTS.slice(0,12).forEach(ev=>{
    const obj={
      "@context":"https://schema.org","@type":"Event",
      "name":ev.titre,
      "startDate":ev.date,
      "description":ev.description||'',
      "eventStatus":"https://schema.org/EventScheduled",
      "eventAttendanceMode":"https://schema.org/OfflineEventAttendanceMode",
      "organizer":{"@type":"Organization","name":"ALVA","url":"https://asso-alva.fr"},
      "location":{"@type":"Place","name":ev.lieu,
        "address":{"@type":"PostalAddress","addressLocality":"Cognac","addressRegion":"Charente","addressCountry":"FR"}},
      "offers":{"@type":"Offer","price":(ev.prix||0),"priceCurrency":"EUR",
        "availability":(ev.placesRestantes>0?"https://schema.org/InStock":"https://schema.org/SoldOut"),
        "url":ev.helloassoUrl||"https://asso-alva.fr/les-rendez-vous"}
    };
    const s=document.createElement('script');
    s.type='application/ld+json';
    s.textContent=JSON.stringify(obj);
    document.head.appendChild(s);
  });
});

/* ============================ PRÉCHARGEMENT (navigation instantanée) ============================
   Au survol (souris) ou au tout début du tap (mobile) d'un lien interne, la page
   cible est préchargée en arrière-plan (<link rel="prefetch">). Le clic la charge
   alors depuis le cache → ouverture quasi instantanée. Inspiré d'instant.page.
   Respecte l'économiseur de données et les connexions très lentes. */
safe('prefetch', function(){
  const conn=navigator.connection;
  if(conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType||''))) return;
  const test=document.createElement('link');
  if(!(test.relList && test.relList.supports && test.relList.supports('prefetch'))) return;

  const done=new Set();
  function prefetch(url){
    if(done.has(url)) return; done.add(url);
    const l=document.createElement('link');
    l.rel='prefetch'; l.href=url;
    document.head.appendChild(l);
  }
  function target(a){
    if(!a || !a.getAttribute('href')) return null;
    let u; try{ u=new URL(a.href, location.href); }catch(_){ return null; }
    if(u.origin!==location.origin) return null;                    // lien externe
    if(u.pathname.replace(/\/$/,'')===location.pathname.replace(/\/$/,'')) return null; // page courante
    if(a.hasAttribute('download')) return null;
    if(/\.(pdf|zip|jpe?g|png|webp|svg|mp4|woff2?)$/i.test(u.pathname)) return null; // fichiers
    return u.origin+u.pathname;                                    // URL nette (sans #/?)
  }
  let t=null;
  document.addEventListener('pointerover', e=>{
    const a=e.target.closest && e.target.closest('a[href]'); if(!a) return;
    const url=target(a); if(!url) return;
    clearTimeout(t); t=setTimeout(()=>prefetch(url), 60);  // petit délai = intention réelle
    a.addEventListener('pointerout', ()=>clearTimeout(t), {once:true});
  }, {passive:true});
  document.addEventListener('touchstart', e=>{
    const a=e.target.closest && e.target.closest('a[href]'); if(!a) return;
    const url=target(a); if(url) prefetch(url);
  }, {passive:true});

  // Précharge en lot les liens d'un conteneur (menu, footer, barre du bas).
  function prefetchAll(sel){
    document.querySelectorAll(sel).forEach(a=>{ const u=target(a); if(u) prefetch(u); });
  }
  // Menu hamburger : ses liens ne sont pas survolés (on l'ouvre puis on clique
  // direct). On précharge donc TOUTES ses pages dès qu'on l'ouvre.
  const mbtn=document.getElementById('mbtn');
  if(mbtn) mbtn.addEventListener('click', ()=>prefetchAll('#menu a[href]'), {passive:true});
  // Filet de sécurité : dès que le navigateur est inactif, on précharge les
  // quelques pages de navigation (menu plein écran, footer, barre du bas) →
  // toute navigation devient instantanée, même sans survol préalable.
  const eager=()=>prefetchAll('#menu a[href], nav a[href], [data-link]');
  if('requestIdleCallback' in window) requestIdleCallback(eager, {timeout:2500});
  else setTimeout(eager, 1200);
});
