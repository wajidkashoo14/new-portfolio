'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const RESUME_HREF = '/CV.pdf';

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */
const GROUPS = [
  {
    name: 'Full stack',
    tech: 'React · REST · SQL',
    projects: [
      {
        num: '01',
        category: 'Healthcare',
        status: 'In development',
        name: 'TMJ Provider Portal',
        desc: 'Healthcare provider management portal with secure login, provider dashboard, appointment tracking, and patient management workflows built with React and REST APIs.',
        meta: [
          ['Role', 'Freelance full stack developer'],
          ['Stack', 'React, REST APIs, secure auth'],
          ['Focus', 'Appointment tracking and patient management workflows'],
        ],
        img: '/work/tmj.png',
        alt: 'TMJConnect provider dashboard — patient list with pain levels and 14-day trends',
        caption: 'Provider dashboard — patient triage by pain level and 14-day trend.',
      },
      {
        num: '02',
        category: 'E-commerce',
        status: 'In development',
        name: 'Valley Green Mart',
        desc: 'Full-featured e-commerce platform for fresh organic Kashmiri produce — saffron, dry fruits, and specialities — with a product catalogue, cart, and checkout flow.',
        meta: [
          ['Role', 'Freelance full stack developer'],
          ['Stack', 'React, Tailwind CSS'],
          ['Focus', 'Catalogue, cart and checkout flow'],
        ],
        img: '/work/valleygreenmart.png',
        alt: 'Valley Green Mart storefront — hero carousel featuring Kashmiri walnut orchards',
        caption: 'Storefront hero and shop navigation, with cart and wishlist.',
        flip: true,
      },
    ],
  },
  {
    name: 'Frontend',
    tech: 'React · Next.js · Redux',
    projects: [
      {
        num: '03',
        category: 'Travel',
        status: 'huntkashmir365.com',
        name: 'Hunt Kashmir 365',
        desc: 'A Kashmir-based tour and travel site: destination and package browsing, hotel and gallery pages, and a journey planner that turns a rough idea of a trip into an enquiry.',
        meta: [
          ['Role', 'Frontend developer'],
          ['Live', { href: 'https://huntkashmir365.com', label: 'huntkashmir365.com' }],
        ],
        img: '/work/huntkashmir.png',
        alt: 'Hunt Kashmir 365 homepage — Dal Lake hero with a quick journey planner',
        caption: 'Homepage hero and the journey planner.',
      },
      {
        num: '04',
        category: 'Wedding films',
        status: 'vasl.com',
        name: 'VASL',
        desc: 'A Kashmir-based pre-wedding and wedding studio site built as an image-first experience: a full-bleed carousel over the portfolio and films navigation.',
        meta: [
          ['Role', 'Frontend developer'],
          ['Live', { href: 'https://vasl.com', label: 'vasl.com' }],
        ],
        img: '/work/vasl.png',
        alt: 'VASL homepage — full-bleed pre-wedding film still with a serif headline',
        caption: 'Full-bleed carousel over the portfolio and films navigation.',
        flip: true,
      },
    ],
  },
];

const EXPERIENCE = [
  {
    date: 'Aug 2025 — Present',
    place: 'Remote',
    company: 'Freelance Full Stack Developer',
    note: 'Building client web products end to end — the TMJ Provider Portal and Valley Green Mart, both in development.',
  },
  {
    date: 'Nov 2024 — Aug 2025',
    place: 'Bangalore, Karnataka',
    company: 'Uvaska ETS Private Limited',
    role: 'Software Developer',
    bullets: [
      'Integrated ACS Motion Control with Python-based software VMOK; architected the communication layer between hardware controllers and the software stack.',
      'Developed a Tkinter-based GUI for a 6-axis robot manipulator covering kinematics calculations, position and velocity management, I/O control, and emergency stop monitoring across multi-page interfaces.',
      'Integrated SQL databases for operational data management, real-time reporting, and post-run analysis dashboards.',
      'Collaborated with mechanical and hardware teams to align software behavior with physical robot constraints and safety requirements.',
    ],
  },
  {
    date: 'Jan 2023 — Oct 2024',
    place: 'Bangalore, Karnataka',
    company: 'General Aeronautics Pvt Ltd',
    role: 'Frontend Developer',
    bullets: [
      'Built responsive UIs for user, drone, and avionics modules using React, ensuring consistent cross-device rendering and accessibility.',
      'Leveraged Redux for global state management and real-time telemetry data updates across the drone monitoring dashboard.',
      'Implemented full user management workflows — add, edit, delete, and role assignment — with form validation and error handling.',
      'Optimized REST API integration for data consistency, reducing frontend data-fetch latency through caching and debouncing strategies.',
    ],
  },
];

const SKILLS = [
  { name: 'HTML' }, { name: 'CSS' }, { name: 'Sass' }, { name: 'Bootstrap' },
  { name: 'Chakra UI' }, { name: 'JavaScript', key: true }, { name: 'React', key: true },
  { name: 'Redux' }, { name: 'Tailwind CSS' }, { name: 'Next.js', key: true },
  { name: 'TypeScript', key: true }, { name: 'Ant Design' }, { name: 'Git' },
  { name: 'GitHub' }, { name: 'BitBucket' }, { name: 'Python', key: true },
  { name: 'SQL' }, { name: 'ACS Motion Control', key: true },
];

const EDUCATION = [
  { degree: 'Masters of Computer Science', gpa: 'CGPA 7.8', year: 'Oct 2022' },
  { degree: 'Bachelor of Computer Science', gpa: 'CGPA 7.5', year: 'Sep 2018' },
];

const NAV = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'craft', label: 'Craft' },
  { id: 'contact', label: 'Contact' },
];

/* ══════════════════════════════════════════════════════════════
   PRIMITIVES
══════════════════════════════════════════════════════════════ */
function Reveal({ children, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); obs.disconnect(); }
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal${on ? ' in' : ''} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}

function MetaList({ items }) {
  return (
    <dl className="dl">
      {items.map(([label, value]) => (
        <React.Fragment key={label}>
          <dt>{label}</dt>
          <dd>
            {typeof value === 'string'
              ? value
              : <a href={value.href} target="_blank" rel="noopener noreferrer">{value.label}</a>}
          </dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

/* ══════════════════════════════════════════════════════════════
   PROGRESS BAR
══════════════════════════════════════════════════════════════ */
function Progress() {
  const ref = useRef(null);
  useEffect(() => {
    const fn = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
      if (ref.current) ref.current.style.width = `${pct}%`;
    };
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    window.addEventListener('resize', fn);
    return () => {
      window.removeEventListener('scroll', fn);
      window.removeEventListener('resize', fn);
    };
  }, []);
  return <div id="progress" ref={ref} />;
}

/* ══════════════════════════════════════════════════════════════
   HEADER
══════════════════════════════════════════════════════════════ */
function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const fn = () => {
      let current = '';
      for (const { id } of NAV) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActive(current);
    };
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <header className="header">
      <nav className="nav">
        <button className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Wajid Hussain Kashoo
        </button>

        <div className="nav-links">
          {NAV.map(l => (
            <button key={l.id} className={`nav-link${active === l.id ? ' on' : ''}`} onClick={() => go(l.id)}>
              {l.label}
            </button>
          ))}
          <a href={RESUME_HREF} className="nav-resume">Résumé</a>
        </div>

        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="mob-menu">
          {NAV.map(l => (
            <button key={l.id} className={`mob-link${active === l.id ? ' on' : ''}`} onClick={() => go(l.id)}>
              {l.label}
            </button>
          ))}
          <a href={RESUME_HREF} className="mob-resume" onClick={() => setOpen(false)}>Résumé</a>
        </div>
      )}
    </header>
  );
}

/* ══════════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="top" className="hero">
      <Reveal className="hero-badge">
        <span />
        Open to full-time and freelance work
      </Reveal>

      <Reveal as="h1">
        Software engineer<br />
        for the web &amp; the<br />
        <em>machines behind it.</em>
      </Reveal>

      <Reveal className="rule hero-rule" />

      <div className="hero-grid">
        <Reveal as="p" className="hero-bio justify">
          Software Engineer with a Masters in CS, expertise in full-stack web development,
          robotics, and hardware integration. Proficient in React, Next.js, Python,
          TypeScript, and ACS Motion Control. Track record of building responsive web apps
          and advanced GUI systems for robotic manipulators.
        </Reveal>

        <Reveal>
          <dl className="dl hero-dl">
            <dt>Email</dt>
            <dd><a href="mailto:wajidkashoo14@gmail.com">wajidkashoo14@gmail.com</a></dd>
            <dt>Phone</dt>
            <dd>+91 9596103894</dd>
            <dt>Code</dt>
            <dd>
              <a href="https://github.com/wajidkashoo14" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </dd>
            <dt>Now</dt>
            <dd>Freelance full stack developer, remote</dd>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   WORK
══════════════════════════════════════════════════════════════ */
function Project({ p }) {
  return (
    <Reveal as="article" className={`project${p.flip ? ' project--flip' : ''}`}>
      <div className="project-body">
        <div className="project-kicker">
          {p.num} · {p.category} · {p.status}
        </div>
        <h3>{p.name}</h3>
        <p className="justify">{p.desc}</p>
        <hr className="rule project-rule" />
        <MetaList items={p.meta} />
      </div>

      <figure className="project-figure">
        <div className="plate">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.img} alt={p.alt} loading="lazy" />
        </div>
        <figcaption>{p.caption}</figcaption>
      </figure>
    </Reveal>
  );
}

function Work() {
  return (
    <section id="work" className="section">
      <Reveal className="sec-rule">
        <h2>Selected work</h2>
        <span className="mono-label">Full stack &amp; frontend</span>
      </Reveal>

      {GROUPS.map(g => (
        <div key={g.name} className="work-groups">
          <Reveal className="group-head">
            <span className="group-head-name">{g.name}</span>
            <span className="group-head-line" />
            <span className="group-head-tech">{g.tech}</span>
          </Reveal>
          {g.projects.map(p => <Project key={p.num} p={p} />)}
        </div>
      ))}
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   EXPERIENCE
══════════════════════════════════════════════════════════════ */
function Experience() {
  return (
    <section id="experience" className="section">
      <Reveal className="sec-rule" style={{ marginBottom: 'var(--s8)' }}>
        <h2>Experience</h2>
        <span className="mono-label">2023 — present</span>
      </Reveal>

      {EXPERIENCE.map(e => (
        <Reveal key={e.company} className="exp-row">
          <div>
            <div className="exp-date">{e.date}</div>
            <div className="exp-place">{e.place}</div>
          </div>
          <div>
            <h3 className="exp-company">{e.company}</h3>
            {e.role && <div className="exp-role">{e.role}</div>}
            {e.note && <p className="exp-note">{e.note}</p>}
            {e.bullets && (
              <ul className="exp-list justify">
                {e.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            )}
          </div>
        </Reveal>
      ))}
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   CRAFT & SCHOOLING
══════════════════════════════════════════════════════════════ */
function Craft() {
  return (
    <section id="craft" className="section">
      <Reveal className="sec-rule">
        <h2>Craft &amp; schooling</h2>
      </Reveal>

      <div className="craft-grid">
        <Reveal>
          <div className="mono-label" style={{ marginBottom: 'var(--s4)' }}>Skills</div>
          <div className="skills">
            {SKILLS.map(s => (
              <span key={s.name} className={`skill${s.key ? ' skill--key' : ''}`}>{s.name}</span>
            ))}
          </div>

          <hr className="rule craft-rule" />

          <div className="mono-label" style={{ marginBottom: 'var(--s3)' }}>Also on the bench</div>
          <h3 className="bench-title">6-axis robot manipulator GUI</h3>
          <p className="justify" style={{ margin: 0 }}>
            A Tkinter control interface at Uvaska ETS: kinematics calculations, position and
            velocity management, I/O control, and emergency stop monitoring across multi-page
            interfaces, over an ACS Motion Control communication layer.
          </p>
        </Reveal>

        <Reveal className="edu-card">
          <div className="mono-label" style={{ marginBottom: 'var(--s4)' }}>Education</div>
          <div className="edu-inst">University of Kashmir</div>
          <div className="edu-loc">Srinagar, Jammu &amp; Kashmir, India</div>
          <div className="edu-grid">
            {EDUCATION.map((e, i) => (
              <React.Fragment key={e.degree}>
                <div className={i > 0 ? 'edu-sep' : undefined}>
                  {e.degree}<br />
                  <span className="edu-gpa">{e.gpa}</span>
                </div>
                <div className={`edu-year${i > 0 ? ' edu-sep' : ''}`}>{e.year}</div>
              </React.Fragment>
            ))}
          </div>
        </Reveal>
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
      <div className="contact-inner">
        <Reveal as="h2">
          Have a project, a role,<br />
          or a robot that needs a screen?
        </Reveal>

        <hr className="contact-rule" />

        <Reveal className="contact-row">
          <div className="contact-details">
            <div>
              <div className="contact-label">Email</div>
              <div className="contact-value">
                <a href="mailto:wajidkashoo14@gmail.com">wajidkashoo14@gmail.com</a>
              </div>
            </div>
            <div>
              <div className="contact-label">Phone</div>
              <div className="contact-value">+91 9596103894</div>
            </div>
            <div>
              <div className="contact-label">Code</div>
              <div className="contact-value">
                <a href="https://github.com/wajidkashoo14" target="_blank" rel="noopener noreferrer">
                  github.com/wajidkashoo14
                </a>
              </div>
            </div>
          </div>
          <a href={RESUME_HREF} className="contact-btn">Download résumé</a>
        </Reveal>

        <div className="contact-foot">
          <span>Wajid Hussain Kashoo</span>
          <span>Srinagar · Remote</span>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════════════ */
export default function Portfolio() {
  return (
    <>
      <Progress />
      <Header />
      <main>
        <Hero />
        <Work />
        <Experience />
        <Craft />
        <Contact />
      </main>
    </>
  );
}
