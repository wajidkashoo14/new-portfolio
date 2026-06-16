'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowUpRight, ExternalLink, Send,
  CheckCircle2, AlertCircle, Github,
  Linkedin, Mail, Phone, Menu, X
} from 'lucide-react';

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    name: 'Valley Green Mart',
    label: 'E-Commerce',
    url: 'https://www.valleygreenmart.com',
    desc: 'Full-stack e-commerce platform for certified organic produce from Kashmir. Cart, checkout, order tracking, and an admin dashboard.',
    tech: ['Next.js', 'Firebase', 'Tailwind'],
    gradient: 'linear-gradient(135deg, #1a2e1a 0%, #0f3322 50%, #1a3d25 100%)',
    accent: '#4ade80',
  },
  {
    name: 'Hunt Kashmir 365',
    label: 'Travel & Tourism',
    url: 'https://huntkashmir.vercel.app/',
    desc: 'Tour booking platform for Kashmir vacation packages — honeymoon, adventure, luxury. Journey planner with destination galleries.',
    tech: ['Next.js', 'React', 'Tailwind'],
    gradient: 'linear-gradient(135deg, #2e1a0a 0%, #3d220f 50%, #2a1a08 100%)',
    accent: '#fb923c',
  },
  {
    name: 'TMJ Connect Portal',
    label: 'Healthcare',
    url: 'https://tmj-provider.netlify.app/',
    desc: 'Provider-facing portal for TMJ healthcare specialists. Streamlines patient-provider connections and clinical information.',
    tech: ['React', 'JavaScript', 'CSS'],
    gradient: 'linear-gradient(135deg, #0a1929 0%, #0d2137 50%, #0a1929 100%)',
    accent: '#60a5fa',
  },
];

const EXPERIENCES = [
  {
    num: '01',
    role: 'Full Stack Developer',
    company: 'Freelance',
    period: 'Nov 2023 – Oct 2024',
    type: 'Freelance',
    bullets: [
      'Shipped 3 production web apps across healthcare, e-commerce, and travel industries',
      'Managed full project lifecycle: discovery, design, build, deploy, and post-launch support',
      'Optimised Core Web Vitals and performance benchmarks across all deliverables',
    ],
    tech: ['Next.js', 'React', 'Firebase', 'Tailwind CSS', 'Vercel'],
  },
  {
    num: '02',
    role: 'Software Engineer',
    company: 'Uvaska ETS Pvt. Ltd.',
    period: 'Nov 2024 – Aug 2025',
    type: 'Full-time',
    bullets: [
      'Integrated ACS Motion Control with Python-based VMOK software for precision hardware operations',
      'Built Tkinter GUI for a 6-axis robot manipulator with forward/inverse kinematics and I/O control',
      'Implemented emergency-stop monitoring, velocity management, and SQL-backed reporting pipelines',
    ],
    tech: ['Python', 'Tkinter', 'ACS Motion Control', 'SQL'],
  },
  {
    num: '03',
    role: 'Frontend Developer',
    company: 'General Aeronautics Pvt Ltd',
    period: 'Jan 2023 – Oct 2023',
    type: 'Internship',
    bullets: [
      'Built responsive UIs for user, drone, and avionics management modules',
      'Implemented Redux for global state and real-time data synchronisation across dashboards',
      'Optimised API integration and delivered role-based user management features',
    ],
    tech: ['React', 'Redux', 'JavaScript', 'REST APIs'],
  },
];

const SKILLS = [
  { group: 'Frontend',     items: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Sass', 'Tailwind CSS'] },
  { group: 'UI Libraries', items: ['Chakra UI', 'Ant Design', 'Bootstrap', 'Shadcn UI'] },
  { group: 'State & Data', items: ['Redux', 'Context API', 'Firebase', 'SQL'] },
  { group: 'Tools',        items: ['Git', 'GitHub', 'Bitbucket', 'Vercel', 'Netlify'] },
  { group: 'Other',        items: ['Python', 'Tkinter', 'ACS Motion Control'] },
];

const EDUCATION = [
  { deg: 'Master of Computer Science',   inst: 'University of Kashmir', year: '2022', gpa: '7.8' },
  { deg: 'Bachelor of Computer Science', inst: 'University of Kashmir', year: '2018', gpa: '7.5' },
];

const NAV = [
  { id: 'home',    label: 'Home' },
  { id: 'work',    label: 'Work' },
  { id: 'projects',label: 'Projects' },
  { id: 'skills',  label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

/* ══════════════════════════════════════════════════════════════
   CURSOR
══════════════════════════════════════════════════════════════ */
function Cursor() {
  const dot  = useRef(null);
  const ring = useRef(null);
  const pos  = useRef({ x: 0, y: 0 });
  const cur  = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = e => { pos.current = { x: e.clientX, y: e.clientY }; };
    const onEnter = () => document.body.classList.add('cur-hover');
    const onLeave = () => document.body.classList.remove('cur-hover');

    window.addEventListener('mousemove', onMove);
    document.querySelectorAll('a,button,.proj-card').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    let raf;
    const animate = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.14;
      cur.current.y += (pos.current.y - cur.current.y) * 0.14;
      if (dot.current)  dot.current.style.transform  = `translate(${pos.current.x}px,${pos.current.y}px) translate(-50%,-50%)`;
      if (ring.current) ring.current.style.transform = `translate(${cur.current.x}px,${cur.current.y}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dot}  className="cur-dot"  />
      <div ref={ring} className="cur-ring" />
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   SCROLL PROGRESS
══════════════════════════════════════════════════════════════ */
function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-bar');
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (bar) bar.style.transform = `scaleX(${pct})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div id="scroll-bar" />;
}

/* ══════════════════════════════════════════════════════════════
   HOOKS
══════════════════════════════════════════════════════════════ */
function useSection() {
  const [sec, setSec] = useState('home');
  useEffect(() => {
    const fn = () => {
      for (const { id } of NAV) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 90) setSec(id);
      }
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return sec;
}

function useReveal() {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); obs.disconnect(); }
    }, { threshold: 0.07 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, on];
}

/* ══════════════════════════════════════════════════════════════
   PRIMITIVES
══════════════════════════════════════════════════════════════ */
function FadeUp({ children, delay = 0, className = '' }) {
  const [ref, on] = useReveal();
  return (
    <div ref={ref} className={`fade-up${on ? ' in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

// Curtain-reveal line (photographer portfolio hallmark)
function Curtain({ children, delay = 0, tag = 'div', className = '', style = {} }) {
  const [ref, on] = useReveal();
  const Tag = tag;
  return (
    <Tag ref={ref} className={`curtain ${className}`} style={style}>
      <span className={`curtain-inner${on ? ' revealed' : ''}`}
        style={{ animationDelay: `${delay}s` }}>
        {children}
      </span>
    </Tag>
  );
}

/* ══════════════════════════════════════════════════════════════
   MARQUEE
══════════════════════════════════════════════════════════════ */
const MARQUEE_ITEMS = [
  'React', 'Next.js', 'Python', 'Full Stack Developer',
  'Motion Control', 'Firebase', 'Open to Work',
  'Tailwind CSS', 'Redux', 'SQL', 'Software Engineer',
  'React', 'Next.js', 'Python', 'Full Stack Developer',
  'Motion Control', 'Firebase', 'Open to Work',
  'Tailwind CSS', 'Redux', 'SQL', 'Software Engineer',
];

function Marquee() {
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {MARQUEE_ITEMS.map((item, i) => (
          <span key={i} className={item === 'Open to Work' ? 'hi' : ''}>
            {item}&nbsp;&nbsp;·&nbsp;&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   NAV
══════════════════════════════════════════════════════════════ */
function Nav() {
  const [open, setOpen] = useState(false);
  const sec = useSection();
  const go = id => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setOpen(false); };

  return (
    <header className="nav">
      <div className="nav-inner">
        <button className="logo" onClick={() => go('home')}>
          wajid<span>.</span>
        </button>
        <nav className="nav-links">
          {NAV.map(l => (
            <button key={l.id} className={`nav-link${sec === l.id ? ' on' : ''}`} onClick={() => go(l.id)}>
              {l.label}
            </button>
          ))}
        </nav>
        <a href="mailto:wajidkashoo14@gmail.com" className="nav-cta">Hire me</a>
        <button className="nav-toggle" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="mob-menu">
          {NAV.map(l => (
            <button key={l.id} className="mob-link" onClick={() => go(l.id)}>{l.label}</button>
          ))}
          <a href="mailto:wajidkashoo14@gmail.com" className="btn btn-gold" style={{ display: 'flex', marginTop: '0.75rem', justifyContent: 'center' }}>Hire me</a>
        </div>
      )}
    </header>
  );
}

/* ══════════════════════════════════════════════════════════════
   HERO — photographer-style editorial layout
══════════════════════════════════════════════════════════════ */
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section id="home" style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle radial glow */}
      <div className="hero-glow" style={{ position: 'absolute', top: '30%', left: '10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,169,110,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Vertical lines decoration */}
      <div className="hero-deco-line" style={{ position: 'absolute', right: '8%', top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, transparent, var(--border) 20%, var(--border) 80%, transparent)', pointerEvents: 'none' }} />
      <div className="hero-deco-line" style={{ position: 'absolute', right: 'calc(8% + 24px)', top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, transparent, var(--border-2) 30%, transparent)', opacity: 0.4, pointerEvents: 'none' }} />

      <div className="wrap" style={{ position: 'relative', zIndex: 1, paddingTop: '3rem', paddingBottom: '5rem' }}>

        {/* Label */}
        <Curtain delay={0.05} tag="p" style={{ fontFamily: 'var(--mono)', fontSize: '.7rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '2rem' }}>
          Software Engineer · Bangalore, India
        </Curtain>

        {/* Giant serif name */}
        <div style={{ marginBottom: '1.5rem', overflow: 'visible' }}>
          <Curtain delay={0.15} tag="h1" style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            fontSize: 'clamp(3.5rem, 10vw, 9rem)',
            fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 0.95,
            color: 'var(--text)',
          }}>
            Wajid
          </Curtain>
          <Curtain delay={0.25} tag="h1" style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(3.5rem, 10vw, 9rem)',
            fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 0.95,
            color: 'var(--text)', display: 'flex', alignItems: 'baseline', gap: '.3em',
          }}>
            Hussain
            <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Kashoo.</span>
          </Curtain>
        </div>

        {/* Role & divider */}
        <Curtain delay={0.35} tag="div" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '.75rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-2)', whiteSpace: 'nowrap' }}>
            Full Stack Developer
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)', maxWidth: 260 }} />
          <span style={{ fontFamily: 'var(--mono)', fontSize: '.7rem', color: 'var(--text-3)', letterSpacing: '.08em' }}>
            2023–Present
          </span>
        </Curtain>

        {/* Bio */}
        <div className="fade-up" style={{ opacity: mounted ? undefined : 0, transition: 'opacity .7s .45s, transform .7s .45s', transform: mounted ? 'none' : 'translateY(18px)', maxWidth: 500, marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '1rem', color: 'var(--text-2)', lineHeight: 1.8 }}>
            I build performant web applications and hardware-integrated systems.
            Focused on code quality, clean UX, and products people enjoy using.
          </p>
        </div>

        {/* CTAs */}
        <div className="fade-up hero-btns" style={{ opacity: mounted ? undefined : 0, transition: 'opacity .7s .55s, transform .7s .55s', transform: mounted ? 'none' : 'translateY(18px)', display: 'flex', gap: '.875rem', marginBottom: '5rem' }}>
          <button className="btn btn-gold" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Get in touch <ArrowUpRight size={14} />
          </button>
          <a href="https://github.com/wajidkashoo14" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <Github size={14} /> GitHub
          </a>
        </div>

        {/* Stats row */}
        <div className="fade-up hero-stats" style={{ opacity: mounted ? undefined : 0, transition: 'opacity .7s .65s, transform .7s .65s', transform: mounted ? 'none' : 'translateY(18px)', display: 'flex', gap: '3rem', flexWrap: 'wrap', paddingTop: '2.5rem', borderTop: '1px solid var(--border)' }}>
          {[
            { n: '3+',  l: 'Years\nExperience' },
            { n: '3',   l: 'Client\nProjects' },
            { n: '2+',  l: 'Industries\nServed' },
            { n: 'MCS', l: 'Univ. of\nKashmir' },
          ].map(s => (
            <div key={s.l} style={{ minWidth: 60 }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, color: 'var(--text)', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '.35rem' }}>{s.n}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '.62rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-3)', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{s.l}</div>
            </div>
          ))}
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="fade-up" style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.5rem', opacity: .4 }}>
        <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, var(--accent), transparent)', animation: 'scrollLine 2s ease-in-out infinite' }} />
        <span style={{ fontFamily: 'var(--mono)', fontSize: '.6rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-3)', writingMode: 'horizontal-tb' }}>Scroll</span>
      </div>
      <style>{`@keyframes scrollLine { 0%,100%{opacity:.3;transform:scaleY(1)}50%{opacity:1;transform:scaleY(1.15)} }`}</style>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   WORK
══════════════════════════════════════════════════════════════ */
function Work() {
  return (
    <section id="work" className="section">
      <div className="wrap">
        <FadeUp>
          <div className="sec-head">
            <span className="sec-num">01 — Experience</span>
            <h2 className="sec-title">Work History</h2>
            <p className="sec-sub">Building real products across the web and hardware stack.</p>
          </div>
        </FadeUp>

        {EXPERIENCES.map((exp, i) => (
          <FadeUp key={i} delay={i * 0.08}>
            <div className="exp-entry">
              <div className="exp-num">{exp.num}</div>
              <div>
                <p className="exp-role">{exp.role}</p>
                <p className="exp-company">{exp.company}</p>
                <div className="exp-meta">
                  <span>{exp.period}</span>
                  <span className="exp-dot" />
                  <span className="tag">{exp.type}</span>
                </div>
                <ul className="exp-bullets">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="exp-bullet">{b}</li>
                  ))}
                </ul>
                <div className="exp-tech">
                  {exp.tech.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </div>
          </FadeUp>
        ))}
        <div className="hr" />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   PROJECTS
══════════════════════════════════════════════════════════════ */
function ProjectCard({ p, delay }) {
  return (
    <FadeUp delay={delay}>
      <a href={p.url} target="_blank" rel="noopener noreferrer" className="proj-card" style={{ display: 'block', textDecoration: 'none' }}>
        {/* Thumb */}
        <div className="proj-thumb">
          <div className="proj-thumb-bg" style={{ background: p.gradient }} />
          <div className="proj-thumb-overlay" />
          {/* Abstract decorative element */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 80, height: 80, borderRadius: '50%', border: `1px solid ${p.accent}30`, opacity: .5 }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 50, height: 50, borderRadius: '50%', background: `${p.accent}15`, border: `1px solid ${p.accent}40` }} />
          <span className="proj-thumb-label" style={{ position: 'relative', zIndex: 2 }}>{p.label}</span>
        </div>

        <div className="proj-body">
          <p className="proj-name">{p.name}</p>
          <p className="proj-desc">{p.desc}</p>
          <div className="proj-tech">
            {p.tech.map(t => <span key={t} className="tag" style={{ color: p.accent, background: `${p.accent}10`, borderColor: `${p.accent}20` }}>{t}</span>)}
          </div>
          <div className="proj-foot">
            <span className="proj-link">
              Visit site <ArrowUpRight size={12} />
            </span>
            <ExternalLink size={13} style={{ color: 'var(--text-3)' }} />
          </div>
        </div>
      </a>
    </FadeUp>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }} className="section">
      <div className="wrap">
        <FadeUp>
          <div className="sec-head">
            <span className="sec-num">02 — Projects</span>
            <h2 className="sec-title">Featured Work</h2>
            <p className="sec-sub">Real-world applications built and shipped for clients.</p>
          </div>
        </FadeUp>
        <div className="proj-grid">
          {PROJECTS.map((p, i) => <ProjectCard key={i} p={p} delay={i * 0.08} />)}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SKILLS
══════════════════════════════════════════════════════════════ */
function Skills() {
  return (
    <section id="skills" className="section">
      <div className="wrap">
        <FadeUp>
          <div className="sec-head">
            <span className="sec-num">03 — Skills</span>
            <h2 className="sec-title">Technical Stack</h2>
            <p className="sec-sub">Technologies I reach for when building products.</p>
          </div>
        </FadeUp>

        {SKILLS.map((s, i) => (
          <FadeUp key={s.group} delay={i * 0.05}>
            <div className="skill-row">
              <div className="skill-group">{s.group}</div>
              <div className="skill-pills">
                {s.items.map(item => <span key={item} className="skill-pill">{item}</span>)}
              </div>
            </div>
          </FadeUp>
        ))}
        <div className="hr" style={{ marginTop: '.1rem' }} />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   EDUCATION
══════════════════════════════════════════════════════════════ */
function Education() {
  return (
    <section id="education" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }} className="section">
      <div className="wrap">
        <FadeUp>
          <div className="sec-head">
            <span className="sec-num">04 — Education</span>
            <h2 className="sec-title">Academic Background</h2>
          </div>
        </FadeUp>
        {EDUCATION.map((e, i) => (
          <FadeUp key={i} delay={i * 0.08}>
            <div className="edu-row">
              <div>
                <p className="edu-deg">{e.deg}</p>
                <p className="edu-inst">{e.inst}</p>
              </div>
              <div className="edu-right">
                <span className="edu-year">{e.year}</span>
                <span className="edu-gpa">GPA {e.gpa}</span>
              </div>
            </div>
          </FadeUp>
        ))}
        <div className="hr" />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════════════════════════════ */
function Field({ id, label, multiline, value, onChange, error }) {
  return (
    <div className="field-wrap">
      <label className="field-lbl" htmlFor={id}>{label}</label>
      {multiline
        ? <textarea id={id} rows={5} value={value} onChange={onChange} className={`field${error ? ' err' : ''}`} />
        : <input   id={id} type={id === 'email' ? 'email' : 'text'} value={value} onChange={onChange} className={`field${error ? ' err' : ''}`} />
      }
      {error && <p className="field-err"><AlertCircle size={11} /> {error}</p>}
    </div>
  );
}

function ContactForm() {
  const [f, setF]    = useState({ name: '', email: '', subject: '', message: '' });
  const [err, setE]  = useState({});
  const [st, setSt]  = useState('idle');
  const set = k => e => setF(p => ({ ...p, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!f.name.trim())    e.name    = 'Required';
    if (!f.email.trim())   e.email   = 'Required';
    else if (!/\S+@\S+\.\S+/.test(f.email)) e.email = 'Invalid email';
    if (!f.subject.trim()) e.subject = 'Required';
    if (!f.message.trim()) e.message = 'Required';
    return e;
  };

  const submit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setE(errs); return; }
    setE({}); setSt('sending');
    await new Promise(r => setTimeout(r, 1600));
    setSt('sent');
  };

  if (st === 'sent') {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CheckCircle2 size={26} style={{ color: 'var(--accent)' }} />
        </div>
        <div>
          <p style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '.25rem' }}>Message sent!</p>
          <p style={{ fontSize: '.875rem', color: 'var(--text-2)' }}>I&apos;ll get back to you within 24 hours.</p>
        </div>
        <button onClick={() => { setSt('idle'); setF({ name:'',email:'',subject:'',message:'' }); }}
          style={{ background: 'none', border: 'none', fontSize: '.8rem', color: 'var(--accent)', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px', fontFamily: 'inherit' }}>
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className="form-row">
        <Field id="name"    label="Your name"     value={f.name}    onChange={set('name')}    error={err.name} />
        <Field id="email"   label="Email address" value={f.email}   onChange={set('email')}   error={err.email} />
      </div>
      <Field id="subject" label="Subject"       value={f.subject} onChange={set('subject')} error={err.subject} />
      <Field id="message" label="Your message"  value={f.message} onChange={set('message')} error={err.message} multiline />
      <button type="submit" disabled={st === 'sending'} className="btn btn-gold" style={{ alignSelf: 'flex-start' }}>
        {st === 'sending'
          ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="spin"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round"/></svg>Sending…</>
          : <><Send size={14} />Send message</>
        }
      </button>
    </form>
  );
}

/* ══════════════════════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════════════════════ */
const CLINKS = [
  { Icon: Mail,     label: 'Email',    val: 'wajidkashoo14@gmail.com',  href: 'mailto:wajidkashoo14@gmail.com' },
  { Icon: Phone,    label: 'Phone',    val: '+91 9596103894',            href: 'tel:+919596103894' },
  { Icon: Github,   label: 'GitHub',   val: 'github.com/wajidkashoo14', href: 'https://github.com/wajidkashoo14' },
  { Icon: Linkedin, label: 'LinkedIn', val: 'wajid-kashoo-211046208',   href: 'https://linkedin.com/in/wajid-kashoo-211046208' },
];

function Contact() {
  return (
    <section id="contact" className="section">
      <div className="wrap">
        <FadeUp>
          <div className="sec-head">
            <span className="sec-num">05 — Contact</span>
            <h2 className="sec-title">Let&apos;s Build<br /><em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--accent)' }}>Together.</em></h2>
            <p className="sec-sub">Open to full-time roles, freelance projects, and interesting collaborations.</p>
          </div>
        </FadeUp>

        <div className="contact-grid">
          {/* Left */}
          <FadeUp delay={0.05}>
            <div>
              {CLINKS.map((l, i) => (
                <a key={l.label} href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="contact-link"
                  style={{ borderBottom: i < CLINKS.length - 1 ? '1px solid var(--border)' : 'none' }}
                >
                  <div className="contact-icon"><l.Icon size={15} style={{ color: 'var(--text-2)' }} /></div>
                  <div style={{ minWidth: 0 }}>
                    <p className="contact-label">{l.label}</p>
                    <p className="contact-val">{l.val}</p>
                  </div>
                  <ArrowUpRight size={13} style={{ color: 'var(--text-3)', marginLeft: 'auto', flexShrink: 0 }} />
                </a>
              ))}

              <div className="avail-card" style={{ marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '.375rem' }}>
                  <span className="avail-dot" />
                  <span style={{ fontSize: '.875rem', fontWeight: 600, color: 'var(--accent)' }}>Currently available</span>
                </div>
                <p style={{ fontSize: '.8rem', color: 'var(--text-2)', lineHeight: 1.65 }}>
                  Open to full-time and freelance work. Reply within 24 hours.
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Right — form */}
          <FadeUp delay={0.12}>
            <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 14, padding: '2rem' }}>
              <p style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '.2rem', fontSize: '.9375rem' }}>Send a message</p>
              <p style={{ fontSize: '.8125rem', color: 'var(--text-2)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                I read every message and reply personally.
              </p>
              <ContactForm />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════════════ */
export default function Portfolio() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {mounted && <Cursor />}
      <ScrollProgress />
      <Nav />
      <div className="page">
        <Hero />
        <Marquee />
        <Work />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </div>
      <footer className="footer">
        <div className="wrap">
          © {new Date().getFullYear()} Wajid Hussain Kashoo — Crafted with Next.js
        </div>
      </footer>
    </div>
  );
}
