
import React, { useState, useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

const colors = {
  black: "#080808",
  offBlack: "#0f0f0f",
  dark: "#141414",
  panel: "#1a1a1a",
  border: "rgba(255,255,255,0.07)",
  gold: "#C8A96E",
  goldLight: "#dfc48e",
  white: "#f5f4f0",
  muted: "rgba(245,244,240,0.45)",
};

const fonts = {
  display: "'Cormorant Garamond', serif",
  ui: "'Syne', sans-serif",
  body: "'DM Sans', sans-serif",
};

function useReveal<T extends Element = HTMLElement>(): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    obs.observe(el as Element);

    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }: { children?: ReactNode; delay?: number; style?: CSSProperties }) {
  const [ref, visible] = useReveal<HTMLElement>();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children?: ReactNode }) {
  return (
    <div
      style={{
        fontFamily: fonts.ui,
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color: colors.gold,
        marginBottom: 16,
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}
    >
      <span
        style={{
          width: 32,
          height: 1,
          background: colors.gold,
          display: "block",
          flexShrink: 0,
        }}
      />
      {children}
    </div>
  );
}

function SectionTitle({ children, style = {} }: { children?: ReactNode; style?: CSSProperties }) {
  return (
    <h2
      style={{
        fontFamily: fonts.display,
        fontSize: "clamp(36px, 5vw, 64px)",
        fontWeight: 300,
        lineHeight: 1.1,
        letterSpacing: "-0.01em",
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);

    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#portfolio", label: "Work" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? "16px 24px" : "24px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled
            ? "rgba(8,8,8,0.92)"
            : "linear-gradient(to bottom, rgba(8,8,8,0.95), transparent)",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? `1px solid ${colors.border}` : "none",
          transition: "all 0.4s",
        }}
      >
        <a
          href="#"
          style={{
            fontFamily: fonts.ui,
            fontWeight: 800,
            fontSize: 20,
            letterSpacing: "0.12em",
            color: colors.white,
            textDecoration: "none",
          }}
        >
          DAV<span style={{ color: colors.gold }}>A</span>RIS
        </a>

        <ul className="nav-links-desktop">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="nav-cta">
          Start a Project
        </a>

        <button
          aria-label="Open menu"
          onClick={() => setMenuOpen((o) => !o)}
          className="nav-toggle"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 24px 80px",
        position: "relative",
        overflow: "hidden",
        background: colors.black,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 80% 60% at 70% 30%, rgba(200,169,110,0.06) 0%, transparent 60%),
                       radial-gradient(ellipse 50% 80% at 10% 80%, rgba(200,169,110,0.04) 0%, transparent 50%)`,
        }}
      />

      <div className="hero-stats">
        {[["50+", "Projects"], ["98%", "Satisfaction"], ["5★", "Rated"]].map(
          ([num, label]) => (
            <div key={label} className="hero-stat-box">
              <span className="hero-stat-number">{num}</span>
              <span className="hero-stat-label">{label}</span>
            </div>
          )
        )}
      </div>

      <div
        style={{
          animation: "fadeUp 0.8s 0.3s both",
          fontFamily: fonts.ui,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: colors.gold,
          marginBottom: 24,
        }}
      >
        Digital Agency · Est. 2024
      </div>

      <h1
        style={{
          fontFamily: fonts.display,
          fontSize: "clamp(52px, 8vw, 110px)",
          fontWeight: 300,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          maxWidth: 900,
          animation: "fadeUp 0.9s 0.5s both",
        }}
      >
        We Build Digital
        <br />
        Experiences That
        <br />
        <em style={{ fontStyle: "italic", color: colors.gold }}>
          Grow Businesses.
        </em>
      </h1>

      <p
        style={{
          fontFamily: fonts.body,
          fontSize: 16,
          fontWeight: 300,
          color: colors.muted,
          maxWidth: 480,
          marginTop: 28,
          lineHeight: 1.7,
          animation: "fadeUp 0.9s 0.7s both",
        }}
      >
        Davaris is a premium digital agency crafting websites, apps,
        brands, and strategies that turn visitors into loyal clients.
      </p>

      <div className="hero-actions">
        <a href="#contact" className="primary-btn">
          Start a Project
        </a>

        <a href="#portfolio" className="secondary-link">
          View Our Work
          <span />
        </a>
      </div>
    </section>
  );
}

// Keeping your existing data exactly
const services = [
  {
    num: "01",
    name: "Website Development",
    desc: "Fast, modern, and conversion-focused websites built to perform. Custom-built for speed, usability, and results.",
  },
  {
    num: "02",
    name: "Mobile App Development",
    desc: "Native and cross-platform apps designed around your users. From MVP to enterprise — built to scale.",
  },
  {
    num: "03",
    name: "UI/UX Design",
    desc: "Interfaces that feel intuitive, look beautiful, and drive action. Rooted in user psychology and brand identity.",
  },
  {
    num: "04",
    name: "Branding",
    desc: "Identity systems that make your brand impossible to ignore. Logo, color, typography — your full visual language.",
  },
  {
    num: "05",
    name: "Social Media Management",
    desc: "Content, strategy, and growth across every relevant platform. Consistent, on-brand, and always performing.",
  },
  {
    num: "06",
    name: "Digital Strategy",
    desc: "Data-driven plans that align your digital efforts with real business goals. Clarity before execution — every time.",
  },
];

function Services() {

  return (
    <section
      id="services"
      style={{ padding: "120px 24px", background: colors.offBlack }}
    >
      <div className="section-top">
        <div>
          <Reveal>
            <SectionLabel>Our Services</SectionLabel>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionTitle>
              Everything Your Brand
              <br />
              Needs to{" "}
              <em style={{ fontStyle: "italic", color: colors.gold }}>
                Win Online.
              </em>
            </SectionTitle>
          </Reveal>
        </div>

        <Reveal delay={0.2} style={{ maxWidth: 360 }}>
          <p className="section-copy">
            From first impression to final conversion — we handle every
            layer of your digital presence with precision.
          </p>

          <a href="#contact" className="primary-btn inline-btn">
            Explore All Services
          </a>
        </Reveal>
      </div>

      <div className="services-grid">
        {services.map((s, i) => (
          <Reveal key={s.num} delay={0.1 * (i % 3)}>
            <div className="service-card">
              <div className="service-number">{s.num}</div>
              <div className="service-title">{s.name}</div>
              <div className="service-desc">{s.desc}</div>
              <a href="#contact" className="service-link">
                Learn More →
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// Remaining sections preserved but responsive adjustments added
// (Shortened comments to keep file cleaner)

function About() {
  return (
    <section id="about" className="about-section">
      <Reveal>
        <div className="about-visual">
          <div className="about-inner">
            <span>D</span>
          </div>
        </div>
      </Reveal>

      <div>
        <Reveal>
          <SectionLabel>Who We Are</SectionLabel>
        </Reveal>

        <Reveal delay={0.1}>
          <SectionTitle>
            Not Just an Agency.
            <br />
            <em style={{ fontStyle: "italic", color: colors.gold }}>
              A Growth Partner.
            </em>
          </SectionTitle>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="section-copy">
            Davaris was built for ambitious brands that refuse to be average.
            We combine strategy, design, and technology to create digital
            platforms that don't just look good — they perform.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Portfolio() {
  return (
    <section id="portfolio" style={{ padding: "120px 24px" }}>
      <Reveal>
        <SectionLabel>Our Work</SectionLabel>
      </Reveal>

      <Reveal delay={0.1}>
        <SectionTitle>
          Selected <em style={{ color: colors.gold }}>Projects.</em>
        </SectionTitle>
      </Reveal>

      <div className="portfolio-grid">
        {[
          "FinEdge Platform",
          "Amara Luxe",
          "Kova App",
          "Pulse Media",
          "Venda Co.",
        ].map((item) => (
          <div key={item} className="portfolio-card">
            <div className="portfolio-overlay">
              <div className="portfolio-name">{item}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };


  return (
    <section id="contact" className="contact-section">
      <div>
        <Reveal>
          <SectionLabel>Get In Touch</SectionLabel>
        </Reveal>

        <Reveal delay={0.1}>
          <SectionTitle>
            Let's Build Something
            <br />
            <em style={{ color: colors.gold }}>Together.</em>
          </SectionTitle>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div>
              <label htmlFor="name">Full Name</label>
              <input id="name" type="text" placeholder="Your name" />
            </div>

            <div>
              <label htmlFor="email">Email Address</label>
              <input id="email" type="email" placeholder="your@email.com" />
            </div>
          </div>

          <div>
            <label htmlFor="message">Project Details</label>
            <textarea
              id="message"
              rows={6}
              placeholder="Tell us about your project..."
            />
          </div>

          <button type="submit" className="primary-btn submit-btn">
            {submitted ? "Message Sent ✓" : "Send Message →"}
          </button>
        </form>
      </Reveal>
    </section>
  );
}

function FooterWithLegal() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div>
        <div className="footer-logo">
          DAV<span style={{ color: colors.gold }}>A</span>RIS
        </div>

        <p>Building digital futures for ambitious brands.</p>
      </div>

      <div>
        <h4>Services</h4>
        <a href="#">Website Development</a>
        <a href="#">Branding</a>
        <a href="#">UI/UX Design</a>
      </div>

      <div>
        <h4>Company</h4>
        <a href="#about">About</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#contact">Contact</a>
      </div>

      <div className="footer-bottom">
        <span>© {year} Davaris. All rights reserved.</span>
        <span>
          <a href="/terms.html">Terms of Service</a>
          {' '}
          {'·'}
          {' '}
          <a href="/privacy.html">Privacy Policy</a>
        </span>
      </div>
    </footer>
  );
}

function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }

      if (ringRef.current) {
        ringRef.current.style.left = `${e.clientX}px`;
        ringRef.current.style.top = `${e.clientY}px`;
      }
    };

    document.addEventListener("mousemove", move);

    return () => document.removeEventListener("mousemove", move);
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

export default function App(): React.ReactElement {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background: ${colors.black};
          color: ${colors.white};
          overflow-x: hidden;
          font-family: ${fonts.body};
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button,
        input,
        textarea {
          font-family: inherit;
        }

        .primary-btn {
          font-family: ${fonts.ui};
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: ${colors.black};
          background: ${colors.gold};
          padding: 16px 36px;
          border: none;
          cursor: pointer;
          transition: 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .primary-btn:hover {
          transform: translateY(-2px);
        }

        .nav-links-desktop {
          display: flex;
          gap: 40px;
          list-style: none;
        }

        .nav-links-desktop a {
          font-family: ${fonts.ui};
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${colors.muted};
        }

        .nav-toggle {
          display: none;
          background: transparent;
          border: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
        }

        .nav-toggle span {
          width: 24px;
          height: 1px;
          background: white;
          display: block;
        }

        .mobile-menu {
          position: fixed;
          inset: 0;
          background: rgba(8,8,8,0.98);
          z-index: 999;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 32px;
          transform: translateY(-100%);
          transition: 0.4s ease;
        }

        .mobile-menu.open {
          transform: translateY(0);
        }

        .mobile-menu a {
          font-size: 24px;
          font-family: ${fonts.display};
        }

        .hero-stats {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          border-left: 1px solid ${colors.border};
        }

        .hero-stat-box {
          padding: 28px 48px;
          border-bottom: 1px solid ${colors.border};
          text-align: center;
        }

        .hero-stat-number {
          font-family: ${fonts.display};
          font-size: 38px;
          color: ${colors.gold};
          display: block;
        }

        .hero-stat-label {
          font-family: ${fonts.ui};
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: ${colors.muted};
        }

        .hero-actions {
          display: flex;
          gap: 24px;
          margin-top: 48px;
          align-items: center;
          flex-wrap: wrap;
        }

        .secondary-link {
          display: flex;
          align-items: center;
          gap: 10px;
          color: ${colors.muted};
          text-transform: uppercase;
          font-size: 11px;
          letter-spacing: 0.18em;
        }

        .secondary-link span {
          width: 32px;
          height: 1px;
          background: currentColor;
        }

        .section-top {
          display: flex;
          justify-content: space-between;
          gap: 40px;
          align-items: flex-end;
          margin-bottom: 72px;
          border-bottom: 1px solid ${colors.border};
          padding-bottom: 48px;
          flex-wrap: wrap;
        }

        .section-copy {
          font-size: 15px;
          color: ${colors.muted};
          line-height: 1.8;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: ${colors.border};
        }

        .service-card {
          background: ${colors.offBlack};
          padding: 44px 40px;
          transition: 0.4s ease;
        }

        .service-card:hover {
          background: ${colors.dark};
        }

        .service-number {
          font-family: ${fonts.display};
          font-size: 64px;
          color: rgba(200,169,110,0.18);
          margin-bottom: 24px;
        }

        .service-title {
          font-family: ${fonts.ui};
          font-size: 15px;
          margin-bottom: 12px;
          font-weight: 600;
        }

        .service-desc {
          color: ${colors.muted};
          line-height: 1.7;
          margin-bottom: 24px;
          font-size: 13px;
        }

        .service-link {
          color: ${colors.gold};
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .about-section,
        .contact-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          padding: 120px 24px;
        }

        .about-visual {
          background: ${colors.panel};
          border: 1px solid ${colors.border};
          min-height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about-inner span {
          font-size: 180px;
          font-family: ${fonts.display};
          color: rgba(200,169,110,0.08);
        }

        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 60px;
        }

        .portfolio-card {
          min-height: 320px;
          background: linear-gradient(135deg,#161616,#252525);
          border: 1px solid ${colors.border};
          position: relative;
          overflow: hidden;
        }

        .portfolio-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          padding: 24px;
          background: linear-gradient(to top, rgba(0,0,0,0.85), transparent);
        }

        .portfolio-name {
          font-size: 28px;
          font-family: ${fonts.display};
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .contact-form label {
          display: block;
          margin-bottom: 8px;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${colors.muted};
          font-family: ${fonts.ui};
        }

        .contact-form input,
        .contact-form textarea {
          width: 100%;
          background: ${colors.dark};
          border: 1px solid ${colors.border};
          color: white;
          padding: 16px;
          outline: none;
        }

        .contact-form input:focus,
        .contact-form textarea:focus {
          border-color: ${colors.gold};
        }

        .footer {
          padding: 80px 24px;
          border-top: 1px solid ${colors.border};
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 40px;
        }

        .footer-logo {
          font-size: 22px;
          font-family: ${fonts.ui};
          font-weight: 800;
          margin-bottom: 16px;
        }

        .footer h4 {
          margin-bottom: 16px;
          color: ${colors.gold};
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .footer a,
        .footer p {
          display: block;
          margin-bottom: 10px;
          color: ${colors.muted};
          line-height: 1.7;
        }

        .footer-bottom {
          grid-column: 1 / -1;
          margin-top: 32px;
          border-top: 1px solid ${colors.border};
          padding-top: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: ${colors.muted};
          font-size: 13px;
        }

        .cursor-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: ${colors.gold};
          position: fixed;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 9999;
        }

        .cursor-ring {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(200,169,110,0.5);
          position: fixed;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 9998;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1024px) {
          .services-grid,
          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .about-section,
          .contact-section,
          .footer {
            grid-template-columns: 1fr;
          }

          .hero-stats {
            display: none;
          }
        }

        @media (max-width: 768px) {
          body {
            cursor: auto;
          }

          .nav-links-desktop,
          .nav-cta {
            display: none;
          }

          .nav-toggle {
            display: flex;
          }

          .services-grid,
          .portfolio-grid,
          .form-grid {
            grid-template-columns: 1fr;
          }

          .service-card {
            padding: 36px 28px;
          }

          .hero-actions {
            flex-direction: column;
            align-items: flex-start;
          }

          .section-top {
            flex-direction: column;
            align-items: flex-start;
          }

          .about-visual {
            min-height: 360px;
          }

          .about-inner span {
            font-size: 120px;
          }
        }
      `}</style>

      <Cursor />

      <div
        style={{
          background: colors.black,
          color: colors.white,
          fontFamily: fonts.body,
          lineHeight: 1.6,
        }}
      >
        <Nav />
        <Hero />
        <Services />
        <About />
        <Portfolio />
        <Contact />
        <FooterWithLegal />
      </div>
    </>
  );
}