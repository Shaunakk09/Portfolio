import React, { useEffect, useMemo, useRef, useState } from 'react';
import './portfolio.css';

const GH = 'https://github.com/Shaunakk09';
const LINKEDIN = 'https://www.linkedin.com/in/shaunakk09/';
const EMAIL = 'SHAUNAK001@e.ntu.edu.sg';

const cases = [
  {
    id: 'printlab', no: '01', eyebrow: 'FOUNDER · 0→1 PRODUCT', title: 'The Print Lab AI', kicker: 'From blank walls to a business.',
    desc: 'An AI-powered wall-art discovery and personalisation platform — and a real D2C business built from zero.',
    url: 'https://www.theprintlab.in/', linkText: 'Visit The Print Lab', year: '2026 — NOW', kind: 'Founder / Product / Engineering',
    stats: [['10×','growth in 4 months'],['12k+','design catalogue'],['60%','revenue prepaid']],
    problem: 'Buying wall art can be a frustrating discovery problem: endless browsing, little context about what works in your space, and friction at checkout.',
    approach: ['Founded the business and owned the product roadmap, catalogue architecture and end-to-end customer journey.', 'Designed AI-driven discovery and poster customisation experiences across a catalogue of 12,000+ designs.', 'Reworked cash-on-delivery operations, partnerships, packaging, delivery coordination and customer support.'],
    impact: 'Scaled the brand 10× in four months to around 100 monthly orders (S$2,523 in monthly order value). Reduced return-to-origin losses to 2.5% and moved 60% of revenue to prepaid.',
    skills: ['0→1 strategy','Product discovery','AI integration','Growth','Unit economics','D2C operations'], tone: 'orange'
  },
  {
    id: 'sumtracker', no: '02', eyebrow: 'B2B SAAS · WORKFLOW DESIGN', title: 'Sumtracker', kicker: 'Making inventory feel simple.',
    desc: 'Shipping less-friction inventory operations for merchants moving products across multiple sales channels.',
    url: 'https://www.sumtracker.com/', linkText: 'Explore Sumtracker', year: '2025 — 2026', kind: 'Frontend Engineer / Product collaboration',
    stats: [['200+','new customers from Stock Take'],['16%','conversion uplift']],
    problem: 'Inventory audits and synchronisation introduce costly friction for merchants operating across stores, marketplaces and warehouses.',
    approach: ['Led frontend development of the Stock Take workflow to help teams audit warehouse inventory.', 'Simplified inventory synchronisation journeys spanning Shopify, Amazon, Walmart, eBay and Etsy.', 'Translated complex operational steps into clearer product interactions.'],
    impact: 'Stock Take attracted 200+ new customers and contributed to onboarding Ozdingo. Simplified synchronisation workflows helped boost conversion by 16%.',
    skills: ['B2B SaaS','Workflow UX','React','Cross-functional delivery','Conversion'], tone: 'mint'
  },
  {
    id: 'paytm', no: '03', eyebrow: 'FINTECH · PRODUCTS AT SCALE', title: 'Paytm', kicker: 'Engineering for millions.',
    desc: 'Built conversion-focused insurance experiences and tooling that let product teams ship without engineering bottlenecks.',
    url: 'https://paytm.com/', linkText: 'Visit Paytm', year: '2024 — 2025', kind: 'Software Engineer',
    stats: [['8.5M','target users'],['23%','conversion improvement'],['60%','faster rollout']],
    problem: 'Large-scale financial products need fast, understandable customer flows — and product teams need a way to iterate without lengthy UI release cycles.',
    approach: ['Built interfaces for a life-insurance journey targeting 8.5 million whitelisted users.', 'Created a JSON-driven page builder so product teams could update UI structures rapidly.', 'Led a self-initiated UI performance programme and contributed to a Backend-for-Frontend architecture.'],
    impact: 'Life insurance reached 400 policies per day within six months. UI improvements increased conversion by 23%; the page builder accelerated rollout by 60% and cut development time by 40%.',
    skills: ['Experimentation','Design systems','React','BFF architecture','Performance','Product tooling'], tone: 'violet'
  },
  {
    id: 'xchange', no: '04', eyebrow: 'INDEPENDENT BUILD · PRODUCT EXPERIMENT', title: 'XChange', kicker: 'Better conversations, by design.',
    desc: 'Exploring a social product that turns professional connections into thoughtful, structured roundtable conversations.',
    url: 'https://xchange-eosin.vercel.app/', linkText: 'View prototype', year: 'EXPLORATION', kind: 'Independent product / Prototype',
    stats: [['0→1','product exploration'],['UX','journey-first design']],
    problem: 'Most professional networks optimise for collecting connections, not generating meaningful conversations or shared insight.',
    approach: ['Mapped invitation, acceptance and discussion flows around two-sided participation.', 'Explored onboarding, discovery, profiles and roundtable interaction patterns.', 'Built and iterated a web prototype using Next.js and Supabase.'],
    impact: 'An evolving product experiment — presented as a prototype rather than a launched or commercially validated business.',
    skills: ['PRD','Customer journeys','Next.js','Supabase','Product prototyping'], tone: 'blue'
  }
];

const timeline = [
  {date:'2026 — PRESENT',company:'The Print Lab AI',role:'Founder',note:'Owning the full loop: customer problem → product → revenue → operations.',tag:'BUILD'},
  {date:'2026 — PRESENT',company:'Nanyang Business School',role:'MBA · NTU, Singapore',note:'Strengthening strategy, business fundamentals and product decision-making.',tag:'LEARN'},
  {date:'2025 — 2026',company:'Sumtracker',role:'Frontend Engineer',note:'Turned complex multichannel inventory workflows into easier-to-use product experiences.',tag:'SHIP'},
  {date:'2024 — 2025',company:'Paytm',role:'Software Engineer',note:'Built conversion-oriented fintech experiences and internal product tooling.',tag:'SCALE'}
];
const capabilities = [
  {n:'01',title:'Find the right problem',text:'Customer journeys, problem framing, research, opportunities and prioritisation.',tags:['Discovery','JTBD','PRDs','Strategy']},
  {n:'02',title:'Make the trade-offs',text:'Connect business impact, user experience, feasibility and operating constraints.',tags:['Roadmaps','Growth','Metrics','Unit economics']},
  {n:'03',title:'Build it for real',text:'Prototype, engineer, test and ship with an understanding of what actually breaks.',tags:['React','Next.js','TypeScript','Python','AWS']}
];

const Arrow = ({ diagonal=false }) => <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '→'}</span>;

function Reveal({children, className='', delay=0, as:Tag='div', ...rest}) {
  const ref = useRef(null);
  useEffect(()=>{
    const element=ref.current;if(!element)return;
    if(!('IntersectionObserver' in window)){element.classList.add('is-visible');return;}
    const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}, {threshold:.08,rootMargin:'0px 0px -35px 0px'});
    observer.observe(element);return()=>observer.disconnect();
  },[]);
  return <Tag ref={ref} className={'reveal '+className} style={{'--reveal-delay':delay+'ms'}} {...rest}>{children}</Tag>;
}

function CodeRain(){
  const [progress,setProgress]=useState(0);
  const lines=useMemo(()=>Array.from({length:17},(_,i)=>({id:i,text:[
    'const intention = "build meaningful things";', 'while (curiosity) { prototype(); iterate(); }',
    'product.fit = listen(users) + execute();','if (friction) simplify(experience);',
    '010101 101100 001011 110010 0101','git commit -m "ship the next iteration"',
    'impact > output && empathy > assumptions','function bridge(product, engineering) { return value; }',
    'ship(); learn(); improve(); repeat();', 'const growth = experiment × insight;',
    'SELECT insight FROM feedback WHERE real = true;','// BUILT DIFFERENT. BUILT TO SHIP.'
  ][i%12],left:(i*37+11)%95,top:(i*47+9)%90,speed:.45+(i%6)*.2,opacity:.12+(i%4)*.045})),[]);
  useEffect(()=>{let raf=0;const update=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-window.innerHeight;setProgress(max>0?window.scrollY/max:0);});};window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);update();return()=>{cancelAnimationFrame(raf);window.removeEventListener('scroll',update);window.removeEventListener('resize',update);};},[]);
  return <div className="code-rain" aria-hidden="true">{lines.map(l=><div key={l.id} className="code-line" style={{left:l.left+'%',top:l.top+'%',opacity:l.opacity,transform:`translate3d(${Math.sin(progress*10+l.id)*15}px,${progress*l.speed*-540}px,0)`}}>{l.text}</div>)}<div className="code-rain-fade"/></div>;
}

function MagneticLink({href,children,external=false,className=''}){return <a className={className} href={href} {...(external?{target:'_blank',rel:'noopener noreferrer'}:{})}>{children}</a>}

function Navbar({openMenu,setOpenMenu}){
  const links=[['Work','#work'],['Approach','#approach'],['Journey','#journey'],['Git log','#git-log']];
  return <header className="nav-shell"><nav className="nav wrap" aria-label="Main navigation">
    <a href="#top" className="wordmark" aria-label="Shaunak Ahluwalia, back to top"><span className="wordmark-symbol">s<span>.</span></span><span className="wordmark-small">SHAUNAK<br/>AHLUWALIA</span></a>
    <div className={'nav-links '+(openMenu?'nav-links-open':'')}>{links.map(([t,h])=><a key={t} href={h} onClick={()=>setOpenMenu(false)}>{t}</a>)}<a className="nav-mobile-contact" href="#contact" onClick={()=>setOpenMenu(false)}>Let's connect ↗</a></div>
    <a href="#contact" className="nav-cta">LET'S TALK <Arrow diagonal/></a>
    <button className="mobile-menu" aria-label={openMenu?'Close menu':'Open menu'} aria-expanded={openMenu} onClick={()=>setOpenMenu(v=>!v)}>{openMenu?'CLOSE':'MENU'} <span>{openMenu?'×':'+'}</span></button>
  </nav></header>;
}

function Hero(){return <section id="top" className="hero"><CodeRain/><div className="hero-grain" aria-hidden="true"/><div className="hero-content wrap">
  <div className="hero-intro"><span className="status-dot"/> AVAILABLE TO CONNECT <span className="intro-divider">/</span> SINGAPORE <span className="intro-divider">/</span> 2026</div>
  <h1 className="hero-title"><span className="title-line">I THINK <span className="serif-italic">product.</span></span><span className="title-line outline-line">I BUILD <em>TECH.</em></span></h1>
  <div className="hero-bottom"><p>Hey, I'm <strong>Shaunak.</strong> An engineer who became a founder, now bringing both mindsets to product management. I turn messy problems into things people actually use.</p><div className="hero-links"><MagneticLink href="#work" className="round-arrow-link" >EXPLORE MY WORK <span className="round-arrow"><Arrow diagonal/></span></MagneticLink><a className="simple-underlink" href={GH} target="_blank" rel="noreferrer">GITHUB ↗</a></div></div>
  <div className="hero-footer"><span>SCROLL TO EXPLORE ↓</span><span>STRATEGY <span className="hero-cross">✳</span> DESIGN <span className="hero-cross">✳</span> CODE</span><span>01 / 06</span></div>
  </div><span className="hero-orbit" aria-hidden="true">✳</span></section>}

function SectionHeading({index,eyebrow,title,description,dark=false}){return <Reveal className={'section-heading '+(dark?'section-heading-dark':'')}><div className="section-kicker"><span>{index} / {eyebrow}</span><span className="section-kicker-line"/></div><div className="section-heading-row"><h2>{title}</h2>{description&&<p>{description}</p>}</div></Reveal>}

function ProjectArtwork({id}){
  if(id==='printlab')return <div className="art art-printlab"><div className="art-print-head"><span>THE PRINT LAB</span><span>ART THAT FEELS LIKE YOU ✳</span></div><div className="art-frames"><div className="art-frame frame-a"><div className="sun-shape"/><div className="frame-text">A LITTLE<br/>MORE<br/><i>color.</i></div></div><div className="art-frame frame-b"><div className="frame-moon"/><span>FORM / FEELING</span></div><div className="art-frame frame-c"><span>MAKE<br/>SPACE<br/>YOURS.</span><div className="frame-blob"/></div></div><div className="art-print-foot">YOUR SPACE. YOUR STORY. <span>EST. 2026</span></div></div>;
  if(id==='sumtracker')return <div className="art art-sumtracker"><div className="mock-browser"><span className="browser-dots">● ● ●</span><span>sumtracker / stock take</span><span>↗</span></div><div className="inventory-interface"><div className="inventory-side"><span className="inv-logo">S.</span><span>▦</span><span>▤</span><span>◫</span><span>⚙</span></div><div className="inventory-main"><div className="inventory-top"><div><small>INVENTORY / AUDIT</small><h3>Stock take</h3></div><div className="pill-light">● In progress</div></div><div className="inventory-stat-grid"><div><small>ITEMS COUNTED</small><b>1,248</b><span>↗ +18.4%</span></div><div><small>ACCURACY</small><b>99.2%</b><span>↗ On track</span></div></div><div className="inventory-table"><div><b>ITEM</b><b>EXPECTED</b><b>COUNTED</b></div>{[['Everyday Hoodie','120','120'],['Classic Tee','86','86'],['Studio Cap','42','41']].map((r,i)=><div key={r[0]}><span><i className={'item-icon item-icon-'+i}/> {r[0]}</span><span>{r[1]}</span><span>{r[2]}</span></div>)}</div></div></div><div className="mock-disclaimer">ILLUSTRATIVE INTERFACE · NOT ACTUAL PRODUCT UI</div></div>;
  if(id==='paytm')return <div className="art art-paytm"><span className="paytm-ghost">PAYTM</span><div className="paytm-device"><div className="phone-indicator"/><div className="phone-top">paytm <span>☰</span></div><small>INSURANCE, MADE SIMPLE</small><h3>Feel secure.<br/>Live more.</h3><div className="phone-card"><span>✳</span><div><b>Life insurance</b><small>Protection for what matters</small></div><span>→</span></div><div className="phone-card"><span>◈</span><div><b>Explore plans</b><small>Find your right fit</small></div><span>→</span></div><div className="phone-cta">Explore coverage →</div></div><div className="paytm-side"><span className="paytm-num">8.5M</span><span>USER SCALE</span><div className="paytm-chart"><i/><i/><i/><i/><i/><i/><i/></div><span>PRODUCT × ENGINEERING</span></div><span className="mock-disclaimer">CONCEPT VISUAL · NOT ACTUAL PAYTM UI</span></div>;
  return <div className="art art-xchange"><div className="xchange-mark">X<span>✳</span></div><div className="xchange-circles"><span className="circle-one">PRODUCT<br/>BUILDERS</span><span className="circle-two">ROUND<br/>TABLES</span><span className="circle-three">BETTER<br/>IDEAS</span></div><p>GOOD CONVERSATIONS<br/>CHANGE EVERYTHING.</p><div className="xchange-bottom"><span>MEET YOUR NEXT THINKING PARTNER</span><span>↗</span></div></div>;
}

function Work({onSelect}){return <section id="work" className="work-section wrap"><SectionHeading index="01" eyebrow="SELECTED WORK" title={<>Proof, not <i>promises.</i></>} description="Four stories that connect the dots between product thinking, hands-on engineering and measurable outcomes."/>
  <div className="work-grid">{cases.map((project,i)=><Reveal key={project.id} delay={i%2*90} className={'project-card project-card-'+project.id}><button className="project-image-btn" onClick={()=>onSelect(project)} aria-label={'Read case study: '+project.title}><ProjectArtwork id={project.id}/></button><div className="project-meta"><span>{project.no} / {project.eyebrow}</span><span>{project.year}</span></div><div className="project-summary"><div><h3>{project.title}</h3><p>{project.desc}</p></div><button className="project-open" onClick={()=>onSelect(project)} aria-label={'Open '+project.title+' case study'}>↗</button></div><div className="project-stats">{project.stats.map(([n,l])=><div key={l}><strong>{n}</strong><span>{l}</span></div>)}</div></Reveal>)}</div>
  </section>}

function Philosophy(){return <section className="manifesto-section"><div className="manifesto-grid" aria-hidden="true"/><div className="wrap manifesto-inner"><Reveal><div className="section-kicker"><span>02 / THE WAY I THINK</span><span className="section-kicker-line"/></div><p className="manifesto">A good product is a <em>great question</em> answered with <span>exceptional execution.</span></p><div className="manifesto-bottom"><span>LESS FEATURE FACTORIES. MORE MEANINGFUL OUTCOMES.</span><span>✳</span></div></Reveal></div></section>}

function Approach(){return <section id="approach" className="approach-section wrap"><SectionHeading index="03" eyebrow="MY OPERATING SYSTEM" title={<>The <i>sweet spot.</i></>} description="I work where user empathy, business reality and technical possibility collide."/><div className="approach-grid">{capabilities.map(c=><Reveal key={c.n} className="approach-card"><span className="approach-number">{c.n} <span>↗</span></span><div className="approach-glyph">{c.n==='01'?'◎':c.n==='02'?'◈':'⌘'}</div><h3>{c.title}</h3><p>{c.text}</p><div className="chip-row">{c.tags.map(t=><span key={t}>{t}</span>)}</div></Reveal>)}</div><Reveal className="toolbelt"><span>UNDER THE HOOD</span><div>REACT <b>✳</b> NEXT.JS <b>✳</b> TYPESCRIPT <b>✳</b> PYTHON <b>✳</b> NODE.JS <b>✳</b> AWS <b>✳</b> SQL <b>✳</b> SPRING BOOT</div></Reveal></section>}

function Journey(){return <section id="journey" className="journey-section"><div className="wrap"><SectionHeading index="04" eyebrow="THE JOURNEY" title={<>Built in <i>layers.</i></>} description="From shipping features to owning the whole business problem." dark/><div className="timeline">{timeline.map((item,i)=><Reveal key={item.company} className="timeline-row" delay={i*45}><div className="timeline-date">{item.date}</div><div className="timeline-node"><span/></div><div className="timeline-company"><span>{item.tag}</span><h3>{item.company}</h3></div><div className="timeline-details"><strong>{item.role}</strong><p>{item.note}</p></div><span className="timeline-index">0{i+1}</span></Reveal>)}</div></div></section>}

function GitLog(){
 const [commits,setCommits]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState(false),[repo,setRepo]=useState('Shaunakk09/Portfolio');
 useEffect(()=>{let active=true;const ctrl=new AbortController();(async()=>{try{const reposResponse=await fetch('https://api.github.com/users/Shaunakk09/repos?sort=pushed&per_page=12',{signal:ctrl.signal});if(!reposResponse.ok)throw Error('repository fetch');const allRepos=await reposResponse.json();const candidates=allRepos.filter(r=>!r.fork&&!r.archived).slice(0,5);const results=await Promise.all(candidates.map(async r=>{const res=await fetch(`https://api.github.com/repos/${r.full_name}/commits?per_page=5`,{signal:ctrl.signal});if(!res.ok)return [];const list=await res.json();return Array.isArray(list)?list.map(c=>({sha:c.sha,message:c.commit.message.split('\n')[0],date:c.commit.author?.date||'',url:c.html_url,repo:r.name})):[]}));const list=results.flat().sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,8);if(active){setCommits(list);setRepo('public repositories');setLoading(false);}}catch(e){if(e.name!=='AbortError'&&active){setError(true);setLoading(false);}}})();return()=>{active=false;ctrl.abort();};},[]);
 const fallback=[['9e94aac','react certificate'],['e745fb7','work ex card'],['6666980','training'],['1b9a49d','about me']];
 return <section id="git-log" className="git-section wrap"><SectionHeading index="05" eyebrow="THE BUILD LOG" title={<>Not just ideas. <i>Commits.</i></>} description="A glimpse into the work behind the pixels. Real commit history, linked to GitHub — not a made-up activity counter."/>
 <Reveal className="terminal"><div className="terminal-top"><div className="terminal-lights"><i/><i/><i/></div><span>shaunak@build-machine: ~/shipping-things</span><span>⌘ K</span></div><div className="terminal-body"><div className="terminal-prompt"><span>➜</span> <b>~</b> git log --oneline --all <span className="terminal-flag">--human</span></div><div className="terminal-note">{"// "}{loading?'Connecting to GitHub…':error?'Live feed unavailable; showing verified portfolio history.':'Recent commits across '+repo}</div>
 <div className="commit-rows">{loading?<div className="terminal-loading">Fetching real changes <span className="blink">_</span></div>:(!error&&commits.length>0)?commits.map((c,i)=><a href={c.url} key={c.sha} target="_blank" rel="noreferrer" className="commit-row"><span className="git-tree">{i===commits.length-1?'└':'├'}─●</span><span className="commit-sha">{c.sha.slice(0,7)}</span><span className="commit-message">{c.message}</span><span className="commit-repo">{c.repo}</span><span className="commit-date">{new Date(c.date).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'2-digit'})}</span><span className="commit-arrow">↗</span></a>):fallback.map(([sha,msg],i)=><a href={`${GH}/Portfolio/commit/${sha}`} key={sha} target="_blank" rel="noreferrer" className="commit-row"><span className="git-tree">{i===fallback.length-1?'└':'├'}─●</span><span className="commit-sha">{sha}</span><span className="commit-message">{msg}</span><span className="commit-repo">Portfolio</span><span className="commit-date">FEB '24</span><span className="commit-arrow">↗</span></a>)}</div>
 <div className="terminal-end"><span>➜</span> <b>~</b> echo "Always in beta. Always building." <span className="blink">▋</span></div></div><div className="terminal-footer"><span><span className="green-indicator"/> PUBLIC GITHUB HISTORY</span><a href={GH} target="_blank" rel="noreferrer">VIEW GITHUB PROFILE ↗</a></div></Reveal></section>
}

function About(){return <section className="about-section"><div className="wrap about-grid"><Reveal className="about-left"><div className="section-kicker"><span>06 / BEYOND THE BRIEF</span><span className="section-kicker-line"/></div><h2>More than a<br/><i>job title.</i></h2><div className="about-doodle">✳</div></Reveal><Reveal className="about-right"><p>I'm Shaunak — currently pursuing my MBA at <strong>Nanyang Technological University, Singapore</strong>. Before stepping deeper into product, I spent three years engineering real software, across fintech and B2B SaaS.</p><p>Then I founded <strong>The Print Lab AI</strong>. That changed everything: decisions weren't just about code quality anymore, but customers, operations, growth, margins and what to build next.</p><p>I like my thinking structured, my interfaces considered, and my experiments real. Outside work: golf, anime, and a healthy obsession with making things better.</p><div className="about-links"><a href={LINKEDIN} target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href={GH} target="_blank" rel="noreferrer">GITHUB ↗</a></div></Reveal></div></section>}

function Contact(){return <footer id="contact" className="contact-section"><div className="wrap"><div className="contact-top"><span>GOT A PROBLEM WORTH SOLVING?</span><span>LET'S MAKE SOMETHING MEANINGFUL.</span></div><Reveal><h2>LET'S <i>BUILD</i><br/><a href={`mailto:${EMAIL}`} className="contact-big-link">SOMETHING<span>↗</span></a></h2></Reveal><div className="contact-bottom"><div><strong>SHAUNAK AHLUWALIA © {new Date().getFullYear()}</strong><span>DESIGNED WITH INTENT. BUILT WITH CODE.</span></div><a href={`mailto:${EMAIL}`}>{EMAIL.toLowerCase()} ↗</a><div><a href={LINKEDIN} target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href={GH} target="_blank" rel="noreferrer">GITHUB ↗</a><a href="#top">BACK TO TOP ↑</a></div></div></div></footer>}

function CaseModal({project,onClose}){
 const dialog=useRef(null);
 useEffect(()=>{const previous=document.activeElement;document.body.style.overflow='hidden';dialog.current?.focus();const key=e=>{if(e.key==='Escape')onClose();if(e.key==='Tab'){const focusables=dialog.current?.querySelectorAll('a[href],button:not([disabled])');if(!focusables?.length)return;const first=focusables[0],last=focusables[focusables.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}};window.addEventListener('keydown',key);return()=>{document.body.style.overflow='';window.removeEventListener('keydown',key);previous?.focus?.();};},[onClose]);
 return <div className="modal-overlay" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><div className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="case-title" tabIndex={-1} ref={dialog}><div className="modal-topbar"><span>CASE STUDY / {project.no}</span><button onClick={onClose} aria-label="Close case study">CLOSE <span>×</span></button></div><div className="modal-content"><div className="modal-eyebrow">{project.eyebrow} · {project.year}</div><h2 id="case-title">{project.title}<span>.</span></h2><p className="modal-kicker">{project.kicker}</p><ProjectArtwork id={project.id}/><div className="modal-stat-grid">{project.stats.map(([n,l])=><div key={l}><strong>{n}</strong><span>{l}</span></div>)}</div><div className="modal-text-block"><h3>01 / THE CHALLENGE</h3><p>{project.problem}</p></div><div className="modal-text-block"><h3>02 / WHAT I DID</h3><ul>{project.approach.map(x=><li key={x}>{x}</li>)}</ul></div><div className="modal-text-block"><h3>03 / THE RESULT</h3><p>{project.impact}</p></div><div className="modal-skill-row">{project.skills.map(x=><span key={x}>{x}</span>)}</div><a className="modal-visit" href={project.url} target="_blank" rel="noreferrer">{project.linkText} <Arrow diagonal/></a></div></div></div>;
}

function App(){const [selected,setSelected]=useState(null),[openMenu,setOpenMenu]=useState(false);useEffect(()=>{document.title='Shaunak Ahluwalia — Product Thinker. Technical Builder.';},[]);return <><div className="site"><Navbar openMenu={openMenu} setOpenMenu={setOpenMenu}/><main><Hero/><Work onSelect={setSelected}/><Philosophy/><Approach/><Journey/><GitLog/><About/></main><Contact/></div>{selected&&<CaseModal project={selected} onClose={()=>setSelected(null)}/>}</>}
export default App;
