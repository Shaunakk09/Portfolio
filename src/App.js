import React, { useEffect, useMemo, useRef, useState } from 'react';
import './portfolio.css';
import ContributionAtlas from './ContributionAtlas';
import PitchPlayArt from './PitchPlayArt';

const GITHUB = 'https://github.com/Shaunakk09';
const LINKEDIN = 'https://www.linkedin.com/in/shaunakk09/';
const EMAIL = 'shaunak001@e.ntu.edu.sg';
const ASSETS = '/portfolio-assets/';

const featured = [
  {
    id:'printlab', number:'01', label:'FOUNDED & BUILT · 2026—NOW', title:'The Print Lab AI',
    subtitle:'From a customer problem to a growing D2C business.',
    description:'AI-powered wall art discovery, customisation and fulfilment. I own everything from product decisions and the website to growth, operations and customer support.',
    metrics:[['10×','growth in four months'],['12,000+','AI-generated designs'],['2.5%','return-to-origin losses']],
    challenge:'Finding artwork that fits a room and your personality takes time. Getting customers to buy, pay and receive a physical product adds a whole second set of constraints.',
    work:['Founded the business and designed the customer journey from search and personalisation to checkout.','Defined product requirements for AI-powered discovery and the catalogue of over 12,000 designs.','Reworked cash-on-delivery operations, printing partnerships, packaging, support and fulfilment to improve economics.'],
    outcome:'10× growth in four months, reaching about 100 monthly orders worth S$2,523. Shifted 60% of revenue to prepaid and reduced return-to-origin losses to 2.5%.',
    skills:['Product discovery','0→1 product','AI integration','Conversion','D2C operations','Unit economics'],
    website:'https://theprintlab.in/', linkLabel:'Visit live website', kind:'Personal venture'
  },
  {
    id:'xchange', number:'02', label:'PRODUCT EXPERIMENT · IN PROGRESS', title:'XChange',
    subtitle:'What if networking led to better conversations?',
    description:'A social product experiment that takes people from discovering others to joining purposeful roundtables — instead of collecting static connections.',
    metrics:[['0→1','concept to prototype'],['2-sided','invitation flow'],['Next.js','& Supabase stack']],
    challenge:'Professional networks make it easy to connect, but much harder to turn those connections into high-quality interactions.',
    work:['Mapped the invite, accept, connection and roundtable journey for both participants.','Built onboarding, profile, network and discovery flows with a Next.js and Supabase stack.','Worked through product requirements and UX iterations, using functional workflows rather than static demo states.'],
    outcome:'A working, evolving prototype and a testable product direction. This is an independent exploration, not a claim of commercial traction.',
    skills:['PRDs','Product prototyping','Journey mapping','Next.js','Supabase','Social UX'],
    website:'https://xchange-eosin.vercel.app/', linkLabel:'Explore prototype', kind:'Independent project'
  },
  {
    id:'pitchplay', number:'03', label:'SPORTS TECH · PRODUCT PREVIEW', title:'PitchPlay',
    subtitle:'From a formation on paper to a play in motion.',
    description:'A touch-friendly football tactics studio for coaches, players and analysts. Build formations, draw movement, animate sequences and export plays.',
    metrics:[['4','pitch formats'],['5','movement line types'],['50','documented domain tests']],
    challenge:'A static whiteboard captures where players stand, but not how a play develops, when someone runs, or which pass comes next. Coaches need a clearer way to explain and share tactics.',
    work:['Scoped a visual tactics editor around 5v5, 7v7, 9v9 and 11v11 formations with responsive, touch-friendly controls.','Built player placement, runs, passes, carries, zones and multi-phase animations with playback and timing controls.','Implemented local browser saving, import validation and exports including PNG, storyboard, GIF and project files; structured the app in React and TypeScript.'],
    outcome:'An independent v0.2.0 preview with offline-capable boards and 50 documented domain tests. Cloud accounts and sharing are not enabled yet; the public repository contains the working source.',
    skills:['Product scoping','Workflow UX','Interaction design','React','TypeScript','Canvas','Offline-first','Tactics animation'],
    website:'https://github.com/Shaunakk09/pitchplay', linkLabel:'View PitchPlay source', kind:'Independent product · Early preview'
  }
];

const employment = [
  {company:'Sumtracker',role:'Frontend Engineer',date:'NOV 2025 — APR 2026',type:'B2B SaaS',description:'Led frontend work on Stock Take and improved inventory synchronisation workflows for merchants using Shopify, Amazon, Walmart, eBay and Etsy.',impact:'Stock Take attracted 200+ new customers; workflow improvements contributed to a reported 16% conversion uplift.',tags:['React','Workflow design','Cross-functional delivery'],n:'01'},
  {company:'Paytm',role:'Software Engineer',date:'JAN 2024 — SEP 2025',type:'Fintech',description:'Built life-insurance interfaces for an audience of 8.5 million whitelisted users. Delivered a JSON-based page builder that enabled product teams to iterate faster, plus UI performance improvements and BFF architecture.',impact:'23% uplift in conversion; page-builder work accelerated feature rollout by 60% and reduced development time by 40%. Rising Star award.',tags:['React','Platform engineering','Performance'],n:'02'},
  {company:'One97 Communications (Paytm)',role:'Software Engineer · Internship → Full-time',date:'JAN 2023 — JAN 2024',type:'Early career',description:'Started as an engineering intern (Jan–Jul 2023), then became a full-time engineer (Jul 2023–Jan 2024). Worked with backend services and event-driven systems.',impact:'Hands-on work across application reliability, Kafka, AWS and MongoDB.',tags:['Kafka','AWS','MongoDB'],n:'03'},
  {company:'Ernst & Young',role:'Software Engineer Intern',date:'NOV 2021 — JAN 2022',type:'Internship',description:'Contributed to a document-management portal and worked with data models and retrieval workflows using Django and MongoDB.',impact:'Early experience translating enterprise requirements into software.',tags:['Python','Django','MongoDB'],n:'04'},
  {company:'Sciffer Analytics',role:'Data Labelling Intern',date:'JAN 2022 — JAN 2023',type:'Internship',description:'Early industry experience in data labelling and applied data workflows.',impact:'Built an appreciation for data quality and the work behind useful machine-learning systems.',tags:['Data','Quality'],n:'05'}
];

const certifications = [
  {name:'AWS Certified Cloud Practitioner',issuer:'Amazon Web Services',date:'JAN 2024 — JAN 2027',type:'Certification',logo:'aws'},
  {name:'React JS Masterclass: Zero to Job Ready with 10 Projects',issuer:'Udemy',date:'FEB 2024',type:'Course',logo:'React'},
  {name:'NestJS: The Complete Developer’s Guide',issuer:'Udemy',date:'JAN 2024',type:'Course',logo:'Node'},
  {name:'Introduction to Python: Fundamentals',issuer:'edX',date:'APR 2020',type:'Verified course',logo:'py'},
  {name:'Ultimate AWS Certified Cloud Practitioner CLF-C02',issuer:'Udemy',date:'JAN 2024',type:'Course',logo:'aws'},
  {name:'Master Git and GitHub in 5 Days',issuer:'Udemy',date:'DATE NOT LISTED',type:'Course',logo:'git'},
  {name:'Apache Kafka Series — KSQL on ksqlDB',issuer:'Udemy',date:'FEB 2023',type:'Course',logo:'kafka'},
  {name:'Web Application Technologies and Django',issuer:'University of Michigan',date:'NOV 2021',type:'Course',logo:'web'}
];

const skillGroups = [
  {id:'01',title:'Product thinking',intro:'Ask the right questions before building the thing.',items:['Product requirements','User journeys','Problem framing','Roadmapping','Prioritisation','Experimentation']},
  {id:'02',title:'Technical fluency',intro:'Understand the architecture, constraints and trade-offs.',items:['React / Next.js','TypeScript / JavaScript','Python','Node.js / Django','SQL / MongoDB','AWS / Kafka']},
  {id:'03',title:'Business ownership',intro:'Care about what happens after a feature ships.',items:['Growth','Conversion','D2C operations','Unit economics','Stakeholder alignment','Analytics']}
];

function Arrow({diagonal=false}) { return <span aria-hidden="true" className="arrow">{diagonal?'↗':'→'}</span>; }
function Reveal({children,className='',as:Component='div',delay=0,...rest}) {
  const ref=useRef(null);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches){el.classList.add('is-visible');return;}
    const ob=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){el.classList.add('is-visible');ob.unobserve(el);}}, {threshold:.08,rootMargin:'0px 0px -34px 0px'});
    ob.observe(el);return()=>ob.disconnect();
  },[]);
  return <Component ref={ref} className={'reveal '+className} style={{'--delay':delay+'ms'}} {...rest}>{children}</Component>;
}
function SectionTitle({number,eyebrow,children,description,dark=false}) {
  return <Reveal className={'section-title '+(dark?'section-title-dark':'')}>
    <div className="section-index"><span>{number} / {eyebrow}</span><span className="section-index-line"/></div>
    <div className="section-title-row"><h2>{children}</h2>{description&&<p>{description}</p>}</div>
  </Reveal>;
}
function ScrollIndicator(){const [progress,setProgress]=useState(0);useEffect(()=>{
  let raf=0;const update=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);setProgress(window.scrollY/max);});};
  window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);update();return()=>{window.removeEventListener('scroll',update);window.removeEventListener('resize',update);cancelAnimationFrame(raf);};
},[]);return <div className="scroll-indicator" style={{transform:`scaleX(${progress})`}} aria-hidden="true"/>;}
function CodeRain(){
  const [progress,setProgress]=useState(0);
  const lines=useMemo(()=>Array.from({length:20},(_,i)=>({id:i,text:[
    'while (curiosity) { build(); learn(); }','const empathy = strategy + execution;',
    '00110100 10101010 01100101','if (friction) simplify(product);',
    'git commit -m "make it better"','function ship(idea) { return iterate(idea); }',
    'const northStar = customer.value;','SELECT insight FROM experiments;',
    '<Product thinking={true} code={true} />','roadmap.push(customerFeedback);'
  ][i%10],left:(i*29+8)%96,top:(i*43+11)%87,speed:.55+(i%5)*.2,opacity:.11+(i%4)*.035})),[]);
  useEffect(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return undefined;
    let raf=0;const update=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>setProgress(window.scrollY/Math.max(1,document.documentElement.scrollHeight-window.innerHeight)));};
    window.addEventListener('scroll',update,{passive:true});update();return()=>{window.removeEventListener('scroll',update);cancelAnimationFrame(raf);};
  },[]);
  return <div className="code-rain" aria-hidden="true">{lines.map(line=><span key={line.id} className="code-line" style={{left:line.left+'%',top:line.top+'%',opacity:line.opacity,transform:`translate3d(${Math.sin(progress*11+line.id)*19}px,${progress*line.speed*-740}px,0)`}}>{line.text}</span>)}</div>;
}
function Nav(){const [open,setOpen]=useState(false);const links=[['Work','#work'],['Experience','#experience'],['Git graph','#git-graph'],['About','#about']];return <header className="nav-shell"><nav className="nav wrap" aria-label="Main navigation">
  <a className="wordmark" href="#top" aria-label="Shaunak Ahluwalia home"><b>S<span>.</span></b><span>SHAUNAK<br/>AHLUWALIA</span></a>
  <div className={'nav-links '+(open?'nav-links-open':'')}>{links.map(([label,url])=><a key={label} href={url} onClick={()=>setOpen(false)}>{label}</a>)}<a className="nav-mobile-link" href="#contact" onClick={()=>setOpen(false)}>Contact ↗</a></div>
  <a className="nav-cta" href="#contact">LET'S TALK <Arrow diagonal/></a>
  <button className="nav-toggle" onClick={()=>setOpen(!open)} aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open}>{open?'CLOSE':'MENU'} <span>{open?'×':'+'}</span></button>
</nav></header>}
function Hero(){return <section id="top" className="hero"><CodeRain/><div className="hero-texture" aria-hidden="true"/><div className="wrap hero-inner">
  <div className="hero-intro"><span className="live-dot"/> PRODUCT THINKER <span>/</span> ENGINEER <span>/</span> FOUNDER</div>
  <div className="hero-main"><div className="hero-copy"><div className="hero-edition">PORTFOLIO <span>2026</span> &nbsp;—&nbsp; SINGAPORE</div><h1>I MAKE<br/><em>IDEAS</em><br/>REAL<span className="hero-period">.</span></h1><p className="hero-sub">Hey, I'm <strong>Shaunak Ahluwalia.</strong> I understand how products should work, how businesses grow, and what it actually takes to build.</p><div className="hero-ctas"><a className="primary-cta" href="#work">EXPLORE MY WORK <Arrow diagonal/></a><a className="text-cta" href={LINKEDIN} target="_blank" rel="noreferrer">GET TO KNOW ME ↗</a></div></div>
  <div className="hero-photo-area"><div className="portrait-orbit portrait-orbit-one"/><div className="portrait-orbit portrait-orbit-two"/><div className="portrait-badge">ENGINEERING<br/><i>×</i> PRODUCT</div><div className="portrait-frame"><img src={ASSETS+'shaunak-portrait.jpg'} alt="Shaunak Ahluwalia in a grey suit" fetchPriority="high"/></div><span className="portrait-caption">HI, I'M SHAUNAK. <span>✳</span> STILL BUILDING.</span></div></div>
  <div className="hero-bottomline"><span>SCROLL TO EXPLORE ↓</span><span>THE STRATEGY <i>MEETS</i> THE BUILD.</span><span>01 / 08</span></div>
</div></section>}
function StudioMarquee(){return <div className="marquee" aria-hidden="true"><div className="marquee-track">{Array.from({length:6},(_,i)=><span key={i}>THINK IN SYSTEMS <b>✳</b> BUILD WITH INTENT <b>✳</b> SHIP & LEARN <b>✳</b></span>)}</div></div>}
function SitePreview({imageClass=''}){
  return <div className={'live-browser '+imageClass}>
    <div className="live-browser-top"><span className="traffic"><i/><i/><i/></span><span className="url-bar">theprintlab.in / real product imagery</span><span>↗</span></div>
    <div className="live-browser-viewport">
      <img src={ASSETS+'print-lab-wall.jpg'} alt="Real poster wall photographed for The Print Lab AI" loading="lazy"/>
      <div className="print-photo-caption"><strong>ART, MADE PERSONAL.</strong><span>REAL PRINT LAB PRODUCT PHOTOGRAPHY</span></div>
    </div>
  </div>;
}
function ProjectArt({id}){
  if(id==='pitchplay')return <PitchPlayArt/>;
  if(id==='printlab')return <div className="feature-art art-printlab"><div className="feature-art-label"><img src={ASSETS+'print-lab-logo.png'} alt="The Print Lab real logo"/><span>BUILT AS A BUSINESS, NOT A MOCKUP</span></div><div className="print-site"><SitePreview/><img className="print-wall-detail" src={ASSETS+'print-lab-wall.jpg'} alt="Real The Print Lab poster collection" loading="lazy"/></div><div className="art-bottom"><span>EXPLORE THE LIVE PRODUCT</span><span>↗</span></div></div>;
  return <div className="feature-art art-xchange"><div className="xchange-label"><span>DESIGNED FOR BETTER CONVERSATIONS</span><img src={ASSETS+'xchange-mark.svg'} alt="XChange icon"/></div><img className="xchange-logo" src={ASSETS+'xchange-lockup.svg'} alt="XChange official logo"/><div className="xchange-roundtable"><div className="round-node node-a">IDEAS</div><div className="round-node node-b">PEOPLE</div><div className="round-node node-c">ROUNDTABLES</div><div className="round-core">✳</div></div><div className="xchange-art-bottom"><span>FROM CONNECTIONS TO CONVERSATIONS.</span><span>↗</span></div></div>;
}
function Featured({select}){return <section id="work" className="featured-section wrap"><SectionTitle number="01" eyebrow="FEATURED PRODUCTS" description="A live business and two independent products — with the problems, decisions and technical craft behind each.">I built <em>these.</em></SectionTitle><div className="featured-grid">{featured.map((p,i)=><Reveal key={p.id} className={'feature-card feature-'+p.id} delay={i*110}>
  <button onClick={()=>select(p)} className="art-button" aria-label={'Read '+p.title+' case study'}><ProjectArt id={p.id}/></button><div className="feature-metadata"><span>{p.number} / {p.label}</span><span>VIEW CASE STUDY ↗</span></div><div className="feature-summary"><div><h3>{p.title}</h3><p>{p.subtitle}</p><span>{p.kind}</span></div><button onClick={()=>select(p)} aria-label={'Open '+p.title} className="feature-open">↗</button></div><div className="feature-metrics">{p.metrics.map(([val,lab])=><div key={lab}><strong>{val}</strong><small>{lab}</small></div>)}</div>
</Reveal>)}</div></section>}
function Manifesto(){return <section className="manifesto"><div className="wrap"><Reveal><div className="section-index"><span>02 / MY POINT OF VIEW</span><span className="section-index-line"/></div><p>GREAT PRODUCTS<br/>HAPPEN WHERE <em>USER NEEDS</em><br/>MEET <span>REAL ENGINEERING.</span></p><div className="manifesto-foot"><span>ASK BETTER QUESTIONS. MAKE BOLDER THINGS.</span><span>✳</span></div></Reveal></div></section>}
function Experience(){return <section id="experience" className="experience-section wrap"><SectionTitle number="03" eyebrow="PROFESSIONAL EXPERIENCE" description="Real work at real companies. These are contributions and outcomes, not personal portfolio products.">Where I've <em>shipped.</em></SectionTitle>
  <div className="experience-header"><span>COMPANY & ROLE</span><span>WHAT I WORKED ON</span><span>PERIOD</span></div><div className="experience-list">{employment.map((job,i)=><Reveal className="experience-card" key={job.company} delay={i*45}><div className="experience-company"><span className="experience-number">{job.n} / {job.type}</span><h3>{job.company}</h3><strong>{job.role}</strong></div><div className="experience-body"><p>{job.description}</p><div className="experience-impact">↗ {job.impact}</div><div className="experience-tags">{job.tags.map(t=><span key={t}>{t}</span>)}</div></div><div className="experience-date">{job.date}</div></Reveal>)}</div>
  <p className="experience-disclaimer">Professional work is described at an experience level; no confidential company product screens or proprietary designs are reproduced.</p></section>}
function SkillIcon({id}){const common={stroke:'currentColor',strokeWidth:1.7,strokeLinecap:'round',strokeLinejoin:'round',fill:'none'};
 if(id==='01')return <svg {...common} viewBox="0 0 48 48" width="44" height="44" aria-hidden="true"><path d="M7 14h34v23H7zM7 21h34M15 8h18v6M17 28l5 5 10-10"/><circle cx="37" cy="10" r="4" fill="currentColor" stroke="none"/></svg>;
 if(id==='02')return <svg {...common} viewBox="0 0 48 48" width="44" height="44" aria-hidden="true"><path d="M17 13 6 24l11 11M31 13l11 11-11 11M28 9 20 39"/><circle cx="37" cy="9" r="3" fill="currentColor" stroke="none"/></svg>;
 return <svg {...common} viewBox="0 0 48 48" width="44" height="44" aria-hidden="true"><path d="M8 40V24h10v16M22 40V15h10v25M36 40V8h7v32M6 41h38"/><path d="m7 17 10-6 9 4 13-9"/><path d="m34 6h5v5"/></svg>;
}
function Skills(){return <section id="skills" className="skills-section wrap"><SectionTitle number="04" eyebrow="THE TOOLKIT" description="Not a list of buzzwords — three lenses I bring to the same problem.">My unfair <em>overlap.</em></SectionTitle><div className="skills-grid">{skillGroups.map((g,i)=><Reveal className="skill-card" key={g.id} delay={i*70}><div className="skill-top"><span>{g.id}</span><span className="skill-icon"><SkillIcon id={g.id}/></span></div><h3>{g.title}</h3><p>{g.intro}</p><div className="skill-tags">{g.items.map(x=><span key={x}>{x}</span>)}</div></Reveal>)}</div></section>}
function Journey(){const rows=[
 {year:'2026 — NOW',place:'The Print Lab AI',role:'Founder',detail:'Customer discovery → product → business operations.',num:'01'},
 {year:'2026 — NOW',place:'Nanyang Business School, NTU',role:'Full-time MBA · Singapore',detail:'Connecting the technical foundation with strategy and business thinking.',num:'02'},
 {year:'2025 — 2026',place:'Sumtracker',role:'Frontend Engineer',detail:'B2B SaaS; inventory workflows and merchant usability.',num:'03'},
 {year:'2023 — 2025',place:'Paytm / One97',role:'Software Engineer · Intern → Full-time',detail:'Fintech products, backend systems, platform tooling and performance.',num:'04'},
 {year:'2021 — 2022',place:'Ernst & Young',role:'Software Engineer Intern',detail:'Enterprise software and document-management systems.',num:'05'},
 {year:'2019 — 2023',place:'Thapar Institute',role:'B.E. · Engineering',detail:'The technical foundation.',num:'06'}
 ];return <section className="journey-section"><div className="wrap"><SectionTitle number="05" eyebrow="THE JOURNEY" dark description="From writing the code to owning the problem behind it.">Every layer <em>counts.</em></SectionTitle><div className="journey-list">{rows.map((r,i)=><Reveal className="journey-row" key={r.num} delay={i*40}><span className="journey-num">{r.num}</span><span className="journey-date">{r.year}</span><div className="journey-place"><h3>{r.place}</h3><span>{r.role}</span></div><p>{r.detail}</p></Reveal>)}</div></div></section>}
function GithubGraph(){
 const [repo]=useState('Portfolio'),[commits,setCommits]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState('');
 useEffect(()=>{
   const controller=new AbortController();setLoading(true);setError('');setCommits([]);
   fetch(`https://api.github.com/repos/Shaunakk09/${repo}/commits?per_page=16`,{signal:controller.signal,headers:{Accept:'application/vnd.github+json'}})
     .then(res=>{if(!res.ok)throw Error(res.status===403?'GitHub rate limit reached':'GitHub is unavailable');return res.json();})
     .then(data=>{if(!Array.isArray(data))throw Error('No public commit data');setCommits(data.map(c=>({sha:c.sha,parents:(c.parents||[]).map(p=>p.sha),message:c.commit?.message?.split('\n')[0]||'Commit',date:c.commit?.author?.date||'',url:c.html_url})));setLoading(false);})
     .catch(e=>{if(e.name!=='AbortError'){setError(e.message||'Unable to load commits');setLoading(false);}});
   return()=>controller.abort();
 },[repo]);
 const indexBySha=useMemo(()=>new Map(commits.map((c,i)=>[c.sha,i])),[commits]);
 const paths=useMemo(()=>commits.flatMap((c,i)=>c.parents.map((parent,j)=>({from:i,to:indexBySha.get(parent),j})).filter(edge=>Number.isInteger(edge.to)&&edge.to>edge.from)),[commits,indexBySha]);
 return <section id="git-graph" className="git-section wrap"><SectionTitle number="06" eyebrow="ACTUAL GIT HISTORY" description="Explore my real GitHub contribution calendar, then follow the commit history behind the work.">Built one <em>commit</em> at a time.</SectionTitle>
  <ContributionAtlas/>
  <Reveal className="git-terminal"><div className="terminal-toolbar"><span className="traffic"><i/><i/><i/></span><span>~/shaunak/workbench</span><span className="terminal-online"><i/> LIVE GITHUB API</span></div><div className="terminal-headline"><div><span>REPOSITORY EXPLORER</span><h3>git log <em>--graph</em></h3></div><a href={GITHUB} target="_blank" rel="noreferrer">OPEN GITHUB ↗</a></div>
   <div className="repo-tabs" aria-label="GitHub repository"><span className="active">● SHAUNAKK09 / PORTFOLIO</span></div>
   <div className="commit-panel" aria-live="polite">{loading?<div className="commit-message-state">FETCHING HISTORY <span className="blink">▋</span></div>:error?<div className="commit-message-state">{error}. <a href={`${GITHUB}/${repo}/commits`} target="_blank" rel="noreferrer">See commits directly ↗</a></div>:commits.length===0?<div className="commit-message-state">No public commit data was returned.</div>:<div className="graph-list">
     <svg className="graph-svg" aria-hidden="true" viewBox={`0 0 72 ${commits.length*74}`} preserveAspectRatio="none">{paths.map((edge,i)=>{const y1=edge.from*74+37,y2=edge.to*74+37;return edge.j===0?<path key={i} d={`M 24 ${y1} L 24 ${y2}`} stroke="#8bec89" strokeWidth="2" fill="none"/>:<path key={i} d={`M 24 ${y1} Q 53 ${y1+15} 53 ${y1+29} L 53 ${y2-24} Q 53 ${y2} 24 ${y2}`} stroke="#c1aeff" strokeWidth="2" fill="none"/>;})}{commits.map((c,i)=><circle key={c.sha} cx="24" cy={i*74+37} r={i===0?8:6} fill={i===0?'#d9f75a':'#101b18'} stroke={i===0?'#d9f75a':'#8bec89'} strokeWidth="2.5"/>)}</svg>
     <div className="graph-rows">{commits.map((c,i)=><a className="graph-row" href={c.url} key={c.sha} target="_blank" rel="noreferrer"><span className="graph-spacer"/><span className="graph-sha">{c.sha.slice(0,7)}</span><span className="graph-message">{c.message}</span><span className="graph-date">{c.date?new Date(c.date).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'2-digit'}):''}</span><span className="graph-arrow">↗</span></a>)}</div>
   </div>}</div><div className="terminal-foot"><span>● REAL PUBLIC COMMITS & PARENT CONNECTIONS</span><span>{!loading&&!error?commits.length+' SHOWN':''}</span></div>
  </Reveal></section>;
}
function CredentialGlyph({kind}) {
 const props={width:29,height:29,viewBox:'0 0 32 32',fill:'none',stroke:'currentColor',strokeWidth:1.75,strokeLinecap:'round',strokeLinejoin:'round','aria-hidden':true};
 if(kind==='aws')return <svg {...props}><path d="M7 21a6 6 0 0 1 1-11 8 8 0 0 1 15 3 5 5 0 0 1 1 10H9"/><path d="m10 27 6 2 7-3"/></svg>;
 if(kind==='React')return <svg {...props}><circle cx="16" cy="16" r="2.8" fill="currentColor"/><ellipse cx="16" cy="16" rx="13" ry="5.5"/><ellipse cx="16" cy="16" rx="13" ry="5.5" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="13" ry="5.5" transform="rotate(120 16 16)"/></svg>;
 if(kind==='Node')return <svg {...props}><path d="m16 2 12 7v14l-12 7L4 23V9zM11 20V11l5 9v-9M21 11v9"/></svg>;
 if(kind==='py')return <svg {...props}><path d="M16 3H9a5 5 0 0 0-5 5v6h14a4 4 0 0 1 4 4v5"/><path d="M16 29h7a5 5 0 0 0 5-5v-6H14a4 4 0 0 1-4-4V9"/><circle cx="11" cy="8" r="1" fill="currentColor"/><circle cx="21" cy="24" r="1" fill="currentColor"/></svg>;
 if(kind==='git')return <svg {...props}><circle cx="9" cy="7" r="3"/><circle cx="9" cy="25" r="3"/><circle cx="24" cy="19" r="3"/><path d="M9 10v12M9 16h8a7 7 0 0 1 7 3"/></svg>;
 if(kind==='kafka')return <svg {...props}><circle cx="16" cy="16" r="4"/><circle cx="7" cy="7" r="3"/><circle cx="25" cy="7" r="3"/><circle cx="7" cy="25" r="3"/><circle cx="25" cy="25" r="3"/><path d="m10 10 3 3m6 0 3-3M10 22l3-3m6 0 3 3"/></svg>;
 return <svg {...props}><circle cx="16" cy="16" r="13"/><path d="M3 16h26M16 3a21 21 0 0 1 0 26M16 3a21 21 0 0 0 0 26"/></svg>;
}
function Credentials(){const [filter,setFilter]=useState('All');const visible=certifications.filter(c=>filter==='All'||(filter==='Certification'&&c.type==='Certification')||(filter==='Courses'&&c.type!=='Certification'));
 return <section id="credentials" className="credential-section"><div className="wrap"><SectionTitle number="07" eyebrow="CREDENTIALS & CONTINUOUS LEARNING" description="One industry certification and a set of completed courses — intentionally kept distinct.">Always a <em>student.</em></SectionTitle><div className="credential-filters" role="group" aria-label="Filter credentials">{['All','Certification','Courses'].map(f=><button key={f} className={filter===f?'active':''} aria-pressed={filter===f} onClick={()=>setFilter(f)}>{f}</button>)}</div><div className="credentials-grid">{visible.map((c,i)=><Reveal key={c.name} className="credential-card" delay={i%4*55}><span className="credential-icon"><CredentialGlyph kind={c.logo}/></span><div><span className="credential-kind">{c.type} <span>· {c.date}</span></span><h3>{c.name}</h3><p>{c.issuer}</p></div><span className="credential-star">✳</span></Reveal>)}</div></div></section>;
}
function Community(){return <section id="about" className="community-section wrap"><SectionTitle number="08" eyebrow="OUTSIDE THE DAY JOB" description="Curiosity and contribution don't end when the laptop closes.">The person <em>behind it.</em></SectionTitle>
  <div className="community-grid"><Reveal className="volunteer-col"><div className="volunteer-heading">VOLUNTEERING <span>↗</span></div><div className="volunteer-item"><img src={ASSETS+'navjyoti-logo.png'} alt="Navjyoti India Foundation logo" loading="lazy"/><div><h3>Navjyoti India Foundation</h3><span>VOLUNTEER · FEB–JUN 2025</span><p>Analysed social and economic data from more than 30 rural villages to support targeted community awareness campaigns.</p></div></div><div className="volunteer-item"><div className="clothesbox-identity"><img src="https://www.clothesboxfoundation.org/favicon.ico" alt="" loading="lazy" onError={e=>{e.currentTarget.style.display='none';}}/><span className="clothesbox-wordmark"><b>Clothes<span>Box</span></b><small>FOUNDATION</small></span></div><div><h3><a href="https://www.clothesboxfoundation.org/" target="_blank" rel="noreferrer">Clothes Box Foundation ↗</a></h3><span>VOLUNTEERING</span><p>Community volunteering. Happy to share more about this experience in conversation.</p></div></div></Reveal>
  <Reveal className="bio-col"><div className="bio-small">A LITTLE MORE ABOUT ME</div><h3>THE DETAIL<br/>IS IN THE <em>DOING.</em></h3><p>I'm an MBA candidate at Nanyang Business School, Singapore, with a software engineering background and a founder's appreciation for customers, costs and the messy work between an idea and a business.</p><p>Outside work, you'll find me on a golf course, in a gym, or watching anime. I like thoughtful systems — whether that's a great product experience or a great story.</p><a href={LINKEDIN} target="_blank" rel="noreferrer">CONNECT ON LINKEDIN <Arrow diagonal/></a></Reveal></div>
 </section>;
}
function Footer(){return <footer id="contact" className="footer"><div className="wrap"><div className="footer-top"><span>HAVE AN INTERESTING PROBLEM?</span><span>LET'S MAKE IT REAL.</span></div><div className="footer-main"><span>LET'S</span><a href={`mailto:${EMAIL}`} aria-label="Email Shaunak to build something together">BUILD <em>TOGETHER.</em><span>↗</span></a></div><div className="footer-bottom"><div><strong>SHAUNAK AHLUWALIA © {new Date().getFullYear()}</strong><small>PRODUCT MINDED. ENGINEERING BACKED.</small></div><a href={`mailto:${EMAIL}`}>{EMAIL} ↗</a><div><a href={LINKEDIN} target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href={GITHUB} target="_blank" rel="noreferrer">GITHUB ↗</a><a href="#top">BACK TO TOP ↑</a></div></div></div></footer>}
function CaseModal({item,close}){const ref=useRef(null);useEffect(()=>{
  const prev=document.activeElement;const old=document.body.style.overflow;document.body.style.overflow='hidden';ref.current?.focus();
  const handler=e=>{if(e.key==='Escape')close();if(e.key==='Tab'){const links=ref.current?.querySelectorAll('a[href],button:not([disabled])');if(!links?.length)return;const first=links[0],last=links[links.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}};
  window.addEventListener('keydown',handler);return()=>{document.body.style.overflow=old;window.removeEventListener('keydown',handler);prev?.focus?.();};
},[close]);return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)close();}}><div className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabIndex={-1} ref={ref}><div className="modal-bar"><span>SELECTED PROJECT / {item.number}</span><button onClick={close}>CLOSE ×</button></div><div className="modal-inside"><span className="modal-label">{item.label}</span><h2 id="modal-title">{item.title}<span>.</span></h2><p className="modal-sub">{item.subtitle}</p><ProjectArt id={item.id}/><div className="modal-metrics">{item.metrics.map(([a,b])=><div key={b}><strong>{a}</strong><span>{b}</span></div>)}</div><div className="modal-block"><span>01 / THE CHALLENGE</span><p>{item.challenge}</p></div><div className="modal-block"><span>02 / WHAT I OWNED</span><ul>{item.work.map(x=><li key={x}>{x}</li>)}</ul></div><div className="modal-block"><span>03 / OUTCOME</span><p>{item.outcome}</p></div><div className="modal-chips">{item.skills.map(t=><span key={t}>{t}</span>)}</div><a className="modal-link" href={item.website} target="_blank" rel="noreferrer">{item.linkLabel} <Arrow diagonal/></a></div></div></div>}
function App(){const [selected,setSelected]=useState(null);useEffect(()=>{document.title='Shaunak Ahluwalia — Product, Engineering & Founder';},[]);return <><ScrollIndicator/><Nav/><main><Hero/><StudioMarquee/><Featured select={setSelected}/><Manifesto/><Experience/><Skills/><Journey/><GithubGraph/><Credentials/><Community/></main><Footer/>{selected&&<CaseModal item={selected} close={()=>setSelected(null)}/>}</>}
export default App;
