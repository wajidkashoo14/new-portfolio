'use client'
import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight, ExternalLink, Send, CheckCircle2, AlertCircle,
  Github, Linkedin, Mail, Phone, Menu, X, Globe, BarChart3, Cpu
} from 'lucide-react';

/* ══════════════════════════════════════════════════════════════
   DATA — updated from CV
══════════════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    name: 'Hunt Kashmir 365',
    label: 'Travel & Tourism',
    url: 'https://huntkashmir365.com',
    desc: 'Complete tour-booking platform built and shipped solo — package catalogue, enquiry and booking flow, itinerary pages, gallery and integrated reviews. Live and serving real customer bookings.',
    tech: ['Next.js', 'React', 'Tailwind CSS'],
    gradient: 'linear-gradient(135deg, #0d1f0d 0%, #122a18 60%, #1a3d25 100%)',
    accent: '#4ade80',
  },
  {
    name: 'TMJ Connect Portal',
    label: 'Healthcare',
    url: 'https://tmj-provider.netlify.app/',
    desc: 'Provider-facing portal for TMJ healthcare specialists — secure authentication, appointment tracking, patient management and role-based access control across multi-step clinical workflows.',
    tech: ['React', 'JavaScript', 'REST APIs'],
    gradient: 'linear-gradient(135deg, #080f1f 0%, #0d1a33 60%, #0a1929 100%)',
    accent: '#60a5fa',
  },
  {
    name: 'Valley Green Mart',
    label: 'E-Commerce',
    url: 'https://www.valleygreenmart.com',
    desc: 'Organic produce e-commerce platform from Kashmir — product catalogue, cart and checkout flow, order tracking and admin dashboard.',
    tech: ['Next.js', 'Firebase', 'Tailwind CSS'],
    gradient: 'linear-gradient(135deg, #1c1208 0%, #2e1e0a 60%, #1c1208 100%)',
    accent: '#fb923c',
  },
];

const EXPERIENCES = [
  {
    num: '01',
    role: 'Freelance Frontend Developer',
    company: 'Contract · Remote',
    period: 'Aug 2025 – Present',
    type: 'Contract',
    bullets: [
      'Shipped Hunt Kashmir 365 end to end — tour-booking platform with package catalogue, booking flow, itinerary pages and gallery, now live and serving real customer bookings',
      'Built TMJ Provider Portal: secure auth, provider dashboard, appointment tracking and patient management with role-based access control across multi-step clinical workflows',
      'Developing Valley Green Mart e-commerce storefront in React and Tailwind CSS: product catalogue, cart and order flow',
    ],
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
  },
  {
    num: '02',
    role: 'Software Developer',
    company: 'Uvaska ETS Pvt. Ltd.',
    period: 'Nov 2024 – Aug 2025',
    type: 'Full-time · Bengaluru',
    bullets: [
      'Built a multi-screen desktop GUI for a 6-axis robot manipulator covering kinematics, position and velocity control, I/O management and emergency-stop monitoring',
      'Architected the communication layer between ACS Motion Control hardware controllers and the Python software stack, enabling real-time command and telemetry exchange',
      'Integrated SQL databases for operational data, real-time reporting and post-run analysis dashboards',
    ],
    tech: ['Python', 'Tkinter', 'ACS Motion Control', 'SQL'],
  },
  {
    num: '03',
    role: 'Frontend Developer',
    company: 'General Aeronautics Pvt. Ltd.',
    period: 'Jan 2023 – Oct 2024',
    type: 'Full-time · Bengaluru',
    bullets: [
      'Built responsive React interfaces for user, drone and avionics modules with consistent rendering and accessibility across devices',
      'Implemented Redux global state for real-time telemetry streaming into the drone monitoring dashboard, keeping live flight data consistent across concurrent views',
      'Optimised REST API integration through caching and request debouncing, cutting frontend data-fetch latency; delivered full user-management workflows with role assignment',
    ],
    tech: ['React', 'Redux', 'JavaScript', 'REST APIs'],
  },
];

const SKILLS = [
  { group: 'Frameworks',  items: ['React', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'Redux', 'Python'] },
  { group: 'UI & Styling', items: ['Tailwind CSS', 'Sass', 'Chakra UI', 'Ant Design', 'Bootstrap', 'HTML5', 'CSS3'] },
  { group: 'Practices',   items: ['REST API Integration', 'State Management', 'Responsive Design', 'Performance Optimisation', 'Accessibility'] },
  { group: 'Tools',       items: ['Git', 'GitHub', 'Bitbucket', 'Vercel', 'Netlify', 'Firebase'] },
  { group: 'Other',       items: ['SQL', 'ACS Motion Control', 'Tkinter'] },
];

const EDUCATION = [
  { deg: 'Master of Computer Science',   inst: 'University of Kashmir, Srinagar', year: 'Oct 2022', gpa: '7.8' },
  { deg: 'Bachelor of Computer Science', inst: 'University of Kashmir, Srinagar', year: 'Sep 2018', gpa: '7.5' },
];

const NAV = [
  { id: 'home',     label: 'Home' },
  { id: 'work',     label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills',   label: 'Skills' },
  { id: 'contact',  label: 'Contact' },
];

const SPECIALTIES = [
  {
    Icon: Globe,
    title: 'Web Applications',
    desc: 'Production React and Next.js apps — from e-commerce platforms to healthcare portals. Clean code, fast load times, accessible UIs.',
  },
  {
    Icon: BarChart3,
    title: 'Real-time Dashboards',
    desc: 'Live telemetry displays and data-heavy dashboards. Redux-powered state for high-frequency streams across concurrent views.',
  },
  {
    Icon: Cpu,
    title: 'System Integration',
    desc: 'Bridging software and hardware — REST API integration, Python control systems, and robotics interfaces for real-world hardware.',
  },
];

const MARQUEE_ITEMS = [
  'React', 'Next.js', 'TypeScript', 'Frontend Engineer',
  'Redux', 'REST APIs', 'Open to Work',
  'Tailwind CSS', 'Performance', 'Accessibility', 'JavaScript',
  'React', 'Next.js', 'TypeScript', 'Frontend Engineer',
  'Redux', 'REST APIs', 'Open to Work',
  'Tailwind CSS', 'Performance', 'Accessibility', 'JavaScript',
];

const CLINKS = [
  { Icon: Mail,     label: 'Email',    val: 'wajidkashoo14@gmail.com',          href: 'mailto:wajidkashoo14@gmail.com' },
  { Icon: Phone,    label: 'Phone',    val: '+91 95961 03894',                   href: 'tel:+919596103894' },
  { Icon: Github,   label: 'GitHub',   val: 'github.com/wajidkashoo14',         href: 'https://github.com/wajidkashoo14' },
  { Icon: Linkedin, label: 'LinkedIn', val: 'wajid-kashoo-211046208',           href: 'https://linkedin.com/in/wajid-kashoo-211046208' },
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
    document.querySelectorAll('a,button,.proj-card,.spec-card').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });
    let raf;
    const animate = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.12;
      cur.current.y += (pos.current.y - cur.current.y) * 0.12;
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
  const [scrolled, setScrolled] = useState(false);
  const sec = useSection();
  const go = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
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
        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="mob-menu">
          {NAV.map(l => (
            <button key={l.id} className={`mob-link${sec === l.id ? ' on' : ''}`} onClick={() => go(l.id)}>
              {l.label}
            </button>
          ))}
          <a href="mailto:wajidkashoo14@gmail.com" className="btn btn-gold mob-cta">Hire me</a>
        </div>
      )}
    </header>
  );
}

/* ══════════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════════ */
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);
  const t = d => ({ opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(18px)', transition: `opacity .7s ${d}s, transform .7s ${d}s` });

  return (
    <section id="home" className="hero-section">
      {/* Dot-grid background */}
      <div className="hero-grid" />
      {/* Radial glow */}
      <div className="hero-glow" />
      {/* Vertical deco lines */}
      <div className="hero-line-r" />
      <div className="hero-line-r2" />

      <div className="wrap hero-wrap">
        {/* Available badge */}
        <div className="avail-badge" style={t(0.05)}>
          <span className="avail-dot" />
          Available for new opportunities
        </div>

        {/* Location label */}
        <Curtain delay={0.1} tag="p" className="hero-location">
          Frontend Engineer · Bengaluru, India · Open to remote &amp; hybrid
        </Curtain>

        {/* Name */}
        <div className="hero-name-wrap">
          <Curtain delay={0.18} tag="h1" className="hero-title hero-title--italic">
            Wajid
          </Curtain>
          <Curtain delay={0.26} tag="h1" className="hero-title hero-title--row">
            Hussain
            <span className="hero-title--accent">Kashoo.</span>
          </Curtain>
        </div>

        {/* Role line */}
        <Curtain delay={0.34} tag="div" className="hero-role-row">
          <span className="hero-role-label">React · Next.js · TypeScript</span>
          <div className="hero-role-line" />
          <span className="hero-role-since">2023 – Present</span>
        </Curtain>

        {/* Bio */}
        <div className="hero-bio" style={t(0.44)}>
          <p>
            Frontend engineer with 3+ years shipping production React applications —
            drone telemetry dashboards, robotics control interfaces, and customer-facing
            platforms currently serving live traffic. Master&apos;s in Computer Science.
          </p>
        </div>

        {/* CTAs */}
        <div className="hero-btns" style={t(0.52)}>
          <button className="btn btn-gold" onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}>
            View Work <ArrowUpRight size={14} />
          </button>
          <a href="https://github.com/wajidkashoo14" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <Github size={14} /> GitHub
          </a>
        </div>

        {/* Stats */}
        <div className="hero-stats" style={t(0.60)}>
          {[
            { n: '3+',  l: 'Years\nExperience' },
            { n: '3',   l: 'Shipped\nProjects' },
            { n: '3',   l: 'Industries\nServed' },
            { n: 'MCS', l: 'Univ. of\nKashmir' },
          ].map(s => (
            <div key={s.l} className="hero-stat">
              <div className="hero-stat-n">{s.n}</div>
              <div className="hero-stat-l">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator">
        <div className="hero-scroll-line" />
        <span className="hero-scroll-label">Scroll</span>
      </div>

      <style>{`@keyframes scrollLine { 0%,100%{opacity:.25;transform:scaleY(1)}50%{opacity:.8;transform:scaleY(1.2)} }`}</style>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SPECIALTIES
══════════════════════════════════════════════════════════════ */
function Specialties() {
  return (
    <section className="section-sm">
      <div className="wrap">
        <FadeUp>
          <div className="spec-grid">
            {SPECIALTIES.map(({ Icon, title, desc }) => (
              <div key={title} className="spec-card">
                <div className="spec-icon">
                  <Icon size={18} style={{ color: 'var(--accent)' }} />
                </div>
                <p className="spec-title">{title}</p>
                <p className="spec-desc">{desc}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
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
            <p className="sec-sub">Building real products across web, healthcare, and hardware.</p>
          </div>
        </FadeUp>

        <div className="timeline">
          {EXPERIENCES.map((exp, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <div className="timeline-item">
                <div className="timeline-dot" />
                <div className="tl-header">
                  <div>
                    <p className="tl-role">{exp.role}</p>
                    <p className="tl-company">{exp.company}</p>
                  </div>
                  <div className="tl-right">
                    <span className="tl-period">{exp.period}</span>
                    <span className="tag">{exp.type}</span>
                  </div>
                </div>
                <ul className="exp-bullets">
                  {exp.bullets.map((b, j) => <li key={j} className="exp-bullet">{b}</li>)}
                </ul>
                <div className="exp-tech">
                  {exp.tech.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   PROJECTS
══════════════════════════════════════════════════════════════ */
function ProjectCard({ p, delay, featured }) {
  return (
    <FadeUp delay={delay}>
      <a href={p.url} target="_blank" rel="noopener noreferrer"
        className={`proj-card${featured ? ' proj-card--featured' : ''}`}
        style={{ display: 'block', textDecoration: 'none' }}>
        <div className="proj-thumb">
          <div className="proj-thumb-bg" style={{ background: p.gradient }} />
          <div className="proj-thumb-overlay" />
          <div className="proj-thumb-rings">
            <div className="proj-ring proj-ring--outer" style={{ borderColor: `${p.accent}25` }} />
            <div className="proj-ring proj-ring--inner" style={{ background: `${p.accent}12`, borderColor: `${p.accent}35` }} />
          </div>
          <div className="proj-live-dot">
            <span className="proj-live-pulse" style={{ background: p.accent }} />
            <span style={{ background: p.accent, width: 6, height: 6, borderRadius: '50%', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: '.58rem', letterSpacing: '.1em', textTransform: 'uppercase', color: p.accent }}>Live</span>
          </div>
          <span className="proj-thumb-label">{p.label}</span>
        </div>
        <div className="proj-body">
          <p className="proj-name">{p.name}</p>
          <p className="proj-desc">{p.desc}</p>
          <div className="proj-tech">
            {p.tech.map(t => (
              <span key={t} className="tag" style={{ color: p.accent, background: `${p.accent}0f`, borderColor: `${p.accent}20` }}>
                {t}
              </span>
            ))}
          </div>
          <div className="proj-foot">
            <span className="proj-link">Visit site <ArrowUpRight size={12} /></span>
            <ExternalLink size={13} style={{ color: 'var(--text-3)' }} />
          </div>
        </div>
      </a>
    </FadeUp>
  );
}

function Projects() {
  return (
    <section id="projects" className="section" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="wrap">
        <FadeUp>
          <div className="sec-head">
            <span className="sec-num">02 — Projects</span>
            <h2 className="sec-title">Featured Work</h2>
            <p className="sec-sub">Real-world applications built, shipped, and serving live traffic.</p>
          </div>
        </FadeUp>
        <div className="proj-grid">
          {PROJECTS.map((p, i) => <ProjectCard key={i} p={p} delay={i * 0.07} featured={i === 0} />)}
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
            <p className="sec-sub">Technologies I reach for when building production products.</p>
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
    <section id="education" className="section" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
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
  const [f, setF]   = useState({ name: '', email: '', subject: '', message: '' });
  const [err, setE] = useState({});
  const [st, setSt] = useState('idle');
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
      <div className="form-success">
        <div className="form-success-icon">
          <CheckCircle2 size={26} style={{ color: 'var(--accent)' }} />
        </div>
        <div>
          <p style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '.25rem' }}>Message sent!</p>
          <p style={{ fontSize: '.875rem', color: 'var(--text-2)' }}>I&apos;ll get back to you within 24 hours.</p>
        </div>
        <button onClick={() => { setSt('idle'); setF({ name:'',email:'',subject:'',message:'' }); }} className="form-reset">
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
          : <><Send size={14} />Send message</>}
      </button>
    </form>
  );
}

/* ══════════════════════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════════════════════ */
function Contact() {
  return (
    <section id="contact" className="section">
      <div className="wrap">
        <FadeUp>
          <div className="sec-head">
            <span className="sec-num">05 — Contact</span>
            <h2 className="sec-title">
              Let&apos;s Build<br />
              <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--accent)' }}>Together.</em>
            </h2>
            <p className="sec-sub">Open to full-time roles, freelance projects, and interesting collaborations. Based in Bengaluru — open to remote and hybrid.</p>
          </div>
        </FadeUp>

        <div className="contact-grid">
          <FadeUp delay={0.05}>
            <div>
              {CLINKS.map((l, i) => (
                <a key={l.label} href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="contact-link"
                  style={{ borderBottom: i < CLINKS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div className="contact-icon"><l.Icon size={15} style={{ color: 'var(--text-2)' }} /></div>
                  <div style={{ minWidth: 0 }}>
                    <p className="contact-label">{l.label}</p>
                    <p className="contact-val">{l.val}</p>
                  </div>
                  <ArrowUpRight size={13} style={{ color: 'var(--text-3)', marginLeft: 'auto', flexShrink: 0 }} />
                </a>
              ))}

              <div className="avail-card" style={{ marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '.375rem' }}>
                  <span className="avail-dot" />
                  <span style={{ fontSize: '.875rem', fontWeight: 600, color: 'var(--accent)' }}>Currently available</span>
                </div>
                <p style={{ fontSize: '.8rem', color: 'var(--text-2)', lineHeight: 1.65 }}>
                  Open to full-time and freelance work. Reply within 24 hours.
                </p>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.12}>
            <div className="contact-form-card">
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
        <Specialties />
        <Work />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </div>
      <footer className="footer">
        <div className="wrap footer-inner">
          <span>© {new Date().getFullYear()} Wajid Hussain Kashoo</span>
          <span className="footer-sep">·</span>
          <span>Frontend Engineer · Bengaluru, India</span>
          <span className="footer-sep">·</span>
          <a href="mailto:wajidkashoo14@gmail.com" className="footer-link">wajidkashoo14@gmail.com</a>
        </div>
      </footer>
    </div>
  );
}
