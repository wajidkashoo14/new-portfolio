'use client'
import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Phone, Linkedin, Github, ChevronDown, Calendar, MapPin, Building, GraduationCap, Award, Code, Rocket, Zap } from 'lucide-react';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ['home', 'experience', 'skills', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const experiences = [
    {
      company: "Uvaska ETS Private Limited",
      position: "Software Engineer",
      location: "Bangalore, Karnataka",
      duration: "Nov 2024 - Aug 2025",
      type: "Full-time",
      icon: <Rocket className="w-6 h-6" />,
      color: "from-cyan-400 to-blue-500",
      achievements: [
        "Integrating ACS Motion Control with Python-based software VMOK",
        "Enhancing software capabilities and hardware integration",
        "Developed Tkinter-based GUI for a 6-axis robot manipulator with kinematics calculations",
        "Implemented position/velocity management, I/O control, and emergency stop monitoring",
        "Created multi-page interfaces for complex robotic systems",
        "Integrated SQL databases for operational data management, reporting, and analysis"
      ],
      technologies: ["Python", "ACS Motion Control", "Tkinter", "SQL", "Robotics", "GUI Development"]
    },
    {
      company: "Freelance Full Stack Developer",
      position: "Full Stack Developer",
      location: "Bangalore, Karnataka, India",
      duration: "Nov 2023 - Oct 2024",
      type: "Freelance",
      icon: <Code className="w-6 h-6" />,
      color: "from-purple-400 to-pink-500",
      achievements: [
        "Elham: Developed responsive e-commerce website for Kashmiri products (under development)",
        "Aqion.in: Built high-performance portfolio platform using Next.js and Chakra UI",
        "KohStudio.in: Designed portfolio website using Next.js, Chakra UI, and modular React components",
        "Delivered multiple client projects with focus on performance and user experience"
      ],
      technologies: ["Next.js", "React", "Chakra UI", "JavaScript", "E-commerce", "Portfolio Development"]
    },
    {
      company: "General Aeronautics Pvt Ltd",
      position: "Frontend Developer (Intern)",
      location: "Bangalore, Karnataka, India",
      duration: "Jan 2023 - Oct 2023",
      type: "Internship",
      icon: <Zap className="w-6 h-6" />,
      color: "from-amber-400 to-orange-500",
      achievements: [
        "Created responsive UIs for user, drone, and avionics modules",
        "Leveraged Redux for state management and real-time data updates",
        "Implemented user management features (add, delete, edit)",
        "Collaborated with teams to deliver scalable web applications",
        "Optimized API integration for data consistency and efficiency"
      ],
      technologies: ["React", "Redux", "JavaScript", "API Integration", "Responsive Design", "Team Collaboration"]
    }
  ];

  const skills = [
    "HTML", "CSS", "Sass", "Bootstrap", "Chakra UI", "JavaScript", 
    "React", "Redux", "Tailwind CSS", "Next.js", "Ant Design", 
    "Git", "GitHub", "Bit Bucket", "Python", "SQL", "ACS Motion Control"
  ];

  const education = [
    {
      degree: "Masters of Computer Science",
      institution: "University of Kashmir",
      location: "Srinagar, Jammu Kashmir, India",
      duration: "Oct 2022",
      cgpa: "7.8 CGPA",
      type: "Post Graduate",
      description: "Advanced studies in computer science with focus on algorithms, software engineering, and system design."
    },
    {
      degree: "Bachelor of Computer Science",
      institution: "University of Kashmir",
      location: "Srinagar, Jammu Kashmir, India",
      duration: "Sep 2018",
      cgpa: "7.5 CGPA",
      type: "Under Graduate",
      description: "Comprehensive foundation in computer science fundamentals, programming, and software development."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.5; filter: blur(40px); }
          50% { opacity: 0.8; filter: blur(60px); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-glow { animation: glow 4s ease-in-out infinite; }
        .animate-slide-up { animation: slideUp 0.6s ease-out forwards; }
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .gradient-text {
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 rounded-full bg-purple-500 animate-glow"
          style={{
            left: `${mousePosition.x / 20}px`,
            top: `${mousePosition.y / 20 + scrollY / 10}px`,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div 
          className="absolute w-96 h-96 rounded-full bg-cyan-500 animate-glow"
          style={{
            right: `${mousePosition.x / 30}px`,
            bottom: `${mousePosition.y / 30}px`,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="text-3xl font-black">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 gradient-text">
                WK
              </span>
            </div>

            <div className="hidden md:flex space-x-8">
              {['Home', 'Experience', 'Skills', 'Education', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-bold tracking-wider transition-all duration-300 ${
                    activeSection === item.toLowerCase()
                      ? 'text-cyan-400 scale-110'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl glass hover:bg-white/10 transition-all"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden glass border-t border-white/10">
            <div className="px-6 py-6 space-y-4">
              {['Home', 'Experience', 'Skills', 'Education', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-4 py-3 rounded-xl text-gray-300 hover:bg-white/10 hover:text-cyan-400 transition-all font-semibold"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="space-y-8">
            <div className="animate-slide-up">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 gradient-text">
                  Wajid Hussain Kashoo
                </span>
              </h1>
              <div className="h-2 w-32 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-300 animate-slide-up" style={{animationDelay: '0.2s'}}>
              Software Engineer &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Full Stack Developer</span>
            </h2>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{animationDelay: '0.4s'}}>
              Crafting cutting-edge web applications and robotic systems with precision. 
              Specialized in React, Next.js, and advanced motion control integration.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 animate-slide-up" style={{animationDelay: '0.6s'}}>
              <button
                onClick={() => scrollToSection('contact')}
                className="group px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
              >
                Let&apos;s Connect
              </button>
              <a
                href="https://github.com/wajidkashoo14"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 glass rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 border-2 border-purple-500/50"
              >
                View GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <ChevronDown size={40} className="text-cyan-400" />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-6 py-2 rounded-full glass border border-purple-300/30 text-purple-400 text-sm font-semibold mb-6">
              Work Experience
            </div>
            <h2 className="text-5xl lg:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 gradient-text">Professional Journey</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A track record of delivering innovative solutions across diverse industries and technologies
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500 hidden md:block"></div>
            
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div key={index} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-black shadow-lg hidden md:block"></div>
                  
                  <div className="md:ml-20 glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 border border-white/10">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center text-white flex-shrink-0`}>
                          {exp.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-2">{exp.position}</h3>
                          <div className="flex items-center gap-2 text-purple-400 font-semibold mb-3">
                            <Building className="h-4 w-4" />
                            {exp.company}
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {exp.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {exp.location}
                            </div>
                            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold">
                              {exp.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-bold text-lg mb-4">Key Achievements:</h4>
                      <ul className="space-y-3">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-300">
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-lg mb-4">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-300 text-sm border border-purple-500/20 hover:bg-purple-500/20 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-6 py-2 rounded-full glass border border-purple-300/30 text-purple-400 text-sm font-semibold mb-6">
              Technical Skills
            </div>
            <h2 className="text-5xl lg:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 gradient-text">Technical Arsenal</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Proficiency across modern technologies and frameworks
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="glass rounded-xl p-4 hover:bg-white/10 transition-all duration-300 hover:scale-105 text-center border border-white/10"
              >
                <span className="text-base font-semibold">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-32 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-6 py-2 rounded-full glass border border-purple-300/30 text-purple-400 text-sm font-semibold mb-6">
              Education
            </div>
            <h2 className="text-5xl lg:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 gradient-text">Academic Excellence</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Strong academic foundation with consistent performance and dedication to learning
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {education.map((edu, index) => (
              <div key={index} className="glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 border border-white/10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
                    <GraduationCap className="h-7 w-7" />
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-purple-500/20 text-purple-300 text-sm font-semibold">
                    {edu.type}
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-3">{edu.degree}</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-purple-400 font-semibold">
                    <GraduationCap className="h-4 w-4" />
                    {edu.institution}
                  </div>

                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin className="h-4 w-4" />
                    {edu.location}
                  </div>

                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Calendar className="h-4 w-4" />
                    {edu.duration}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="h-5 w-5 text-yellow-400" />
                    <span className="font-semibold">Academic Performance</span>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30">
                    <span className="text-3xl font-bold text-purple-300">{edu.cgpa}</span>
                  </div>
                </div>

                <p className="text-gray-400 leading-relaxed">
                  {edu.description}
                </p>
              </div>
            ))}
          </div>

          {/* Academic Highlights */}
          <div className="glass rounded-2xl p-10 border border-white/10">
            <h3 className="text-3xl font-bold text-center mb-10">Academic Highlights</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
                  7.8
                </div>
                <h4 className="font-bold text-xl mb-2">Masters CGPA</h4>
                <p className="text-gray-400">Excellent academic performance</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white text-3xl font-bold">
                  7.5
                </div>
                <h4 className="font-bold text-xl mb-2">Bachelor&apos;s CGPA</h4>
                <p className="text-gray-400">Strong foundation</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white text-3xl font-bold">
                  CS
                </div>
                <h4 className="font-bold text-xl mb-2">Computer Science</h4>
                <p className="text-gray-400">Specialized expertise</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-6 py-2 rounded-full glass border border-purple-300/30 text-purple-400 text-sm font-semibold mb-6">
              Get In Touch
            </div>
            <h2 className="text-5xl lg:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-pink-400 to-orange-400 gradient-text">Let&apos;s Connect</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Ready to collaborate on your next project
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Mail size={32} />, title: "Email", value: "wajidkashoo14@gmail.com", href: "mailto:wajidkashoo14@gmail.com", color: "from-cyan-400 to-blue-500" },
              { icon: <Phone size={32} />, title: "Phone", value: "+91 9596103894", href: "tel:+919596103894", color: "from-purple-400 to-pink-500" },
              { icon: <Linkedin size={32} />, title: "LinkedIn", value: "View Profile", href: "https://linkedin.com/in/wajid-kashoo-211046208", color: "from-blue-400 to-cyan-500" },
              { icon: <Github size={32} />, title: "GitHub", value: "@wajidkashoo14", href: "https://github.com/wajidkashoo14", color: "from-gray-400 to-gray-600" }
            ].map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 text-center border border-white/10"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${contact.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {contact.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-cyan-400">{contact.title}</h3>
                <p className="text-gray-400 text-sm break-all">{contact.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass border-t border-white/10 py-8 text-center">
        <p className="text-gray-400">
          © 2025 <span className="text-cyan-400 font-bold">Wajid Hussain Kashoo</span>. Crafted with passion.
        </p>
      </footer>
    </div>
  );
}