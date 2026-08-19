'use client'
import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Send, CheckCircle2, AlertCircle, Menu, X, Download } from 'lucide-react';

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    num: '01',
    category: 'Healthcare',
    status: 'In development',
    live: false,
    name: 'TMJ Provider Portal',
    desc: 'Healthcare provider management portal with secure login, provider dashboard, appointment tracking, and patient management workflows built with React and REST APIs.',
    role: 'Freelance full stack developer',
    stack: 'React, REST APIs, secure auth',
    focus: 'Appointment tracking and patient management workflows',
    url: 'https://tmj-provider.netlify.app/',
  },
  {
    num: '02',
    category: 'E-commerce',
    status: 'In development',
    live: false,
    name: 'Valley Green Mart',
    desc: 'Full-featured e-commerce platform for fresh organic Kashmiri produce — saffron, dry fruits, and specialities. Product catalogue, cart and checkout flow.',
    role: 'Freelance full stack developer',
    stack: 'React, Tailwind CSS',
    focus: 'Catalogue, cart and checkout flow',
    url: 'https://www.valleygreenmart.com',
  },
  {
    num: '03',
    category: 'Travel',
    status: 'Live',
    live: true,
    name: 'Hunt Kashmir 365',
    desc: 'A Kashmir-based tour and travel site: destination and package browsing, hotel and gallery pages, and a journey planner. Shipped solo from discovery through deployment.',
    role: 'Frontend developer',
    stack: 'Next.js, React, Tailwind CSS',
    focus: 'Destination browsing, journey planner and booking flow',
    url: 'https://huntkashmir365.com',
  },
  {
    num: '04',
    category: 'Wedding films',
    status: 'Live',
    live: true,
    name: 'VASL',
    desc: 'A Kashmir-based pre-wedding and wedding studio site built as an image-first experience: a full-bleed carousel portfolio and film showcase.',
    role: 'Frontend developer',
    stack: 'React, Next.js, CSS',
    focus: 'Full-bleed gallery, film showcase and portfolio pages',
    url: 'https://vasl.com',
  },
];

const EXPERIENCES = [
  {
    period: 'Aug 2025 — Present',
    location: 'Remote',
    company: 'Freelance Full Stack Developer',
    role: 'Contract',
    bullets: [
      'Shipped Hunt Kashmir 365 end to end — tour-booking platform with package catalogue, booking flow, itinerary pages and gallery, now live serving real customer bookings',
      'Building the TMJ Provider Portal: secure auth, provider dashboard, appointment tracking and patient management with role-based access control',
      'Developing Valley Green Mart e-commerce storefront in React and Tailwind CSS: product catalogue, cart and order flow',
    ],
  },
  {
    period: 'Nov 2024 — Aug 2025',
    location: 'Bengaluru, Karnataka',
    company: 'Uvaska ETS Private Limited',
    role: 'Software Developer',
    bullets: [
      'Integrated ACS Motion Control with Python-based software VMOK; architected the communication layer between hardware controllers and software stack for real-time command and telemetry exchange',
      'Developed a Tkinter-based GUI for a 6-axis robot manipulator covering kinematics calculations, position and velocity management, I/O control and emergency-stop monitoring',
      'Integrated SQL databases for operational data management, real-time reporting, and post-run analysis dashboards',
      'Collaborated with mechanical and hardware teams to align software behaviour with physical robot constraints and safety requirements',
    ],
  },
  {
    period: 'Jan 2023 — Oct 2024',
    location: 'Bengaluru, Karnataka',
    company: 'General Aeronautics Pvt Ltd',
    role: 'Frontend Developer',
    bullets: [
      'Built responsive UIs for user, drone, and avionics modules using React, ensuring consistent cross-device rendering and accessibility',
      'Leveraged Redux for global state management and real-time telemetry data updates across the drone monitoring dashboard',
      'Implemented full user management workflows — add, edit, delete, and role assignment — with form validation and structured error handling',
      'Optimised REST API integration for data consistency, reducing frontend data-fetch latency through caching and request debouncing',
    ],
  },
];

const SKILLS = [
  'HTML', 'CSS', 'Sass', 'Bootstrap', 'Chakra UI',
  'JavaScript', 'TypeScript', 'React', 'Redux', 'Next.js',
  'Tailwind CSS', 'Ant Design', 'Git', 'GitHub', 'Bitbucket',
  'Python', 'SQL', 'ACS Motion Control', 'Tkinter', 'Vercel', 'Netlify', 'Firebase',
];

const EDUCATION = [
  { degree: 'Masters of Computer Science', year: 'Oct 2022', gpa: '7.8' },
  { degree: 'Bachelor of Computer Science', year: 'Sep 2018', gpa: '7.5' },
];

const NAV_LINKS = [
  { id: 'work',       label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'craft',      label: 'Craft' },
  { id: 'contact',    label: 'Contact' },
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
    const tag = () => document.body.classList.add('cur-hover');
    const untag = () => document.body.classList.remove('cur-hover');
    window.addEventListener('mousemove', onMove);
    document.querySelectorAll('a,button,.proj-item,.skill-tag').forEach(el => {
      el.addEventListener('mouseenter', tag);
      el.addEventListener('mouseleave', untag);
    });
    let raf;
    const tick = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.12;
      cur.current.y += (pos.current.y - cur.current.y) * 0.12;
      if (dot.current)  dot.current.style.transform  = `translate(${pos.current.x}px,${pos.current.y}px) translate(-50%,-50%)`;
      if (ring.current) ring.current.style.transform = `translate(${cur.current.x}px,${cur.current.y}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dot}  className="cur-dot" />
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
    const fn = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (bar) bar.style.transform = `scaleX(${pct})`;
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
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
      const all = ['work', 'experience', 'craft', 'contact'];
      for (const id of all) {
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
    }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, on];
}

function FadeUp({ children, delay = 0, className = '' }) {
  const [ref, on] = useReveal();
  return (
    <div ref={ref} className={`fade-up${on ? ' in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   NAV
══════════════════════════════════════════════════════════════ */
function Nav() {
  const [open, setOpen] = useState(false);
  const sec = useSection();
  const go = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <header className="nav">
      <div className="nav-inner">
        <button className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Wajid Hussain Kashoo
        </button>
        <nav className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {NAV_LINKS.map(l => (
            <button key={l.id} className={`nav-link${sec === l.id ? ' on' : ''}`} onClick={() => go(l.id)}>
              {l.label}
            </button>
          ))}
        </nav>
        <a href="/CV.pdf" download className="nav-resume" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          Résumé
        </a>
        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="mob-menu">
          {NAV_LINKS.map(l => (
            <button key={l.id} className={`mob-link${sec === l.id ? ' on' : ''}`} onClick={() => go(l.id)}>
              {l.label}
            </button>
          ))}
          <a href="/CV.pdf" download className="mob-resume">Résumé</a>
        </div>
      )}
    </header>
  );
}

/* ══════════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════════ */
function Hero() {
  const [m, setM] = useState(false);
  useEffect(() => { const t = setTimeout(() => setM(true), 60); return () => clearTimeout(t); }, []);
  const f = d => ({ opacity: m ? 1 : 0, transform: m ? 'none' : 'translateY(14px)', transition: `opacity .65s ${d}s, transform .65s ${d}s` });

  return (
    <section id="home" className="hero">
      <div className="wrap">
        <div className="hero-badge" style={f(0.05)}>
          <span className="hero-badge-dot" />
          Open to full-time and freelance work
        </div>

        <h1 className="hero-headline" style={f(0.15)}>
          Software engineer<br />
          for the web &amp; the<br />
          <em>machines behind it.</em>
        </h1>

        <div className="hero-grid" style={f(0.28)}>
          <div className="hero-cell">
            <p className="hero-cell-label">Email</p>
            <p className="hero-cell-value">
              <a href="mailto:wajidkashoo14@gmail.com">wajidkashoo14@gmail.com</a>
            </p>
          </div>
          <div className="hero-cell">
            <p className="hero-cell-label">Phone</p>
            <p className="hero-cell-value">+91 95961 03894</p>
          </div>
          <div className="hero-cell">
            <p className="hero-cell-label">Code</p>
            <p className="hero-cell-value">
              <a href="https://github.com/wajidkashoo14" target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            </p>
          </div>
          <div className="hero-cell">
            <p className="hero-cell-label">Now</p>
            <p className="hero-cell-value">Freelance full stack developer, remote</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   WORK
══════════════════════════════════════════════════════════════ */
function Work() {
  return (
    <section id="work" className="work">
      <div className="wrap">
        <FadeUp>
          <div className="work-header">
            <h2 className="work-title">Selected work</h2>
            <span className="work-filter">Full stack &amp; frontend</span>
          </div>
        </FadeUp>

        <div className="proj-list">
          {PROJECTS.map((p, i) => (
            <FadeUp key={i} delay={i * 0.06}>
              <div className="proj-item">
                <div className="proj-num">{p.num}</div>

                <div className="proj-info">
                  <div className="proj-kicker">
                    <span>{p.category}</span>
                    <span className="proj-status" style={{ color: p.live ? '#2d7a3a' : undefined }}>
                      · {p.live ? `Live — ${p.url.replace(/^https?:\/\//, '')}` : p.status}
                    </span>
                  </div>
                  <h3 className="proj-name">{p.name}</h3>
                  <p className="proj-desc">{p.desc}</p>
                </div>

                <div className="proj-meta">
                  <div className="proj-meta-row">
                    <p className="proj-meta-label">Role</p>
                    <p className="proj-meta-value">{p.role}</p>
                  </div>
                  <div className="proj-meta-row">
                    <p className="proj-meta-label">Stack</p>
                    <p className="proj-meta-value">{p.stack}</p>
                  </div>
                  <div className="proj-meta-row">
                    <p className="proj-meta-label">Focus</p>
                    <p className="proj-meta-value">{p.focus}</p>
                  </div>
                  {p.live && (
                    <div className="proj-meta-row">
                      <a href={p.url} target="_blank" rel="noopener noreferrer"
                        className="proj-meta-value" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--accent)', fontSize: '.85rem', textDecoration: 'none' }}>
                        Visit site <ArrowUpRight size={13} />
                      </a>
                    </div>
                  )}
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
   EXPERIENCE
══════════════════════════════════════════════════════════════ */
function Experience() {
  return (
    <section id="experience" className="experience">
      <div className="wrap">
        <FadeUp>
          <span className="section-label">Experience</span>
          <h2 className="work-title" style={{ marginBottom: '2.5rem' }}>2023 — present</h2>
        </FadeUp>

        <div className="exp-list">
          {EXPERIENCES.map((e, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <div className="exp-item">
                <div className="exp-left">
                  <p className="exp-period">{e.period}</p>
                  <p className="exp-location">{e.location}</p>
                </div>
                <div className="exp-right">
                  <p className="exp-company">{e.company}</p>
                  <p className="exp-role">{e.role}</p>
                  <ul className="exp-bullets">
                    {e.bullets.map((b, j) => (
                      <li key={j} className="exp-bullet">{b}</li>
                    ))}
                  </ul>
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
   CRAFT & SCHOOLING
══════════════════════════════════════════════════════════════ */
function Craft() {
  return (
    <section id="craft" className="craft">
      <div className="wrap">
        <FadeUp>
          <span className="section-label">Craft &amp; schooling</span>
        </FadeUp>

        <div className="craft-grid">
          {/* Left: Skills */}
          <FadeUp delay={0.05}>
            <div>
              <h3 className="craft-skills-title">Skills</h3>
              <div className="skills-cloud">
                {SKILLS.map(s => <span key={s} className="skill-tag">{s}</span>)}
              </div>

              <div className="bench-card" style={{ marginTop: '2rem' }}>
                <p className="bench-label">Also on the bench</p>
                <p className="bench-title">6-axis robot manipulator GUI</p>
                <p className="bench-desc">
                  A Tkinter control interface at Uvaska ETS: kinematics calculations,
                  position and velocity management, I/O control and emergency-stop
                  monitoring, with SQL-backed real-time reporting.
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Right: Education */}
          <FadeUp delay={0.1}>
            <div>
              <h3 className="edu-inst-name">University of Kashmir</h3>
              <p className="edu-inst-loc">Srinagar, Jammu &amp; Kashmir, India</p>
              <div className="edu-list">
                {EDUCATION.map((e, i) => (
                  <div key={i} className="edu-degree">
                    <span className="edu-deg-name">{e.degree}</span>
                    <div className="edu-deg-right">
                      <span className="edu-year">{e.year}</span>
                      <span className="edu-gpa">CGPA {e.gpa}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════════════════════ */
function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <FadeUp>
          <h2 className="contact-headline">
            Have a project, a role,<br />
            or a <em>robot</em> that<br />
            needs a screen?
          </h2>
        </FadeUp>

        <FadeUp delay={0.08}>
          <div className="contact-row">
            <div className="contact-cell">
              <p className="contact-cell-label">Email</p>
              <p className="contact-cell-value">
                <a href="mailto:wajidkashoo14@gmail.com">wajidkashoo14@gmail.com</a>
              </p>
            </div>
            <div className="contact-cell">
              <p className="contact-cell-label">Phone</p>
              <p className="contact-cell-value">+91 95961 03894</p>
            </div>
            <div className="contact-cell">
              <p className="contact-cell-label">LinkedIn</p>
              <p className="contact-cell-value">
                <a href="https://linkedin.com/in/wajid-kashoo-211046208" target="_blank" rel="noopener noreferrer">
                  wajid-kashoo ↗
                </a>
              </p>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.14}>
          <a href="/CV.pdf" download className="contact-resume-btn">
            <Download size={15} />
            Download résumé
          </a>
        </FadeUp>
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
        <Work />
        <Experience />
        <Craft />
        <Contact />
      </div>
      <footer className="footer">
        <div className="wrap footer-inner">
          <span className="footer-name">Wajid Hussain Kashoo</span>
          <span className="footer-loc">Srinagar · Bengaluru · Remote</span>
        </div>
      </footer>
    </div>
  );
}
