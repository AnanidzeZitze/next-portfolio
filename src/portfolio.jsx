import { useState, useEffect, useRef, useCallback } from "react";

/*
 * ══════════════════════════════════════════════════════════════════
 *  THE APEX — Definitive Portfolio of Gagan Bhaskar Naik
 *  Indian Geometry × German Bauhaus × American Futurism
 *  Effects: Preloader, Magnetic Cursor, Parallax, Kinetic Type,
 *  3D Tilt, Glassmorphism, Gradient Mesh, Ripples, Glow Borders
 * ══════════════════════════════════════════════════════════════════
 */

import { useScroll, useInView } from "./hooks/index.js";
import { Preloader, MagneticCursor, GradientMesh, Reveal, TiltCard, GlassPanel, KolamMotif, Nav, Footer, GlobalStyles, clamp } from "./components/shared.jsx";
import "./styles/my-work.css";
import "./styles/home-scroll.css";


// ═══════════════════════════════════════════════════════════
//  HERO — Kinetic Typography + Parallax
// ═══════════════════════════════════════════════════════════
function Hero() {
  const [loaded, setLoaded] = useState(false);
  const scrollY = useScroll();
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const parallaxSlow = scrollY * 0.15;
  const parallaxMed = scrollY * 0.3;
  const heroOpacity = clamp(1 - scrollY / 600, 0, 1);

  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px var(--px) 80px", position: "relative", overflow: "hidden" }}>
      {/* Parallax Kolam — layer 1 (slow) */}
      <KolamMotif size={600} animate style={{ position: "absolute", top: "-120px", right: "-100px", transform: `translateY(${parallaxSlow}px)` }} />
      {/* Parallax Kolam — layer 2 (medium) */}
      <KolamMotif size={300} color="var(--steel)" animate style={{ position: "absolute", bottom: "0", left: "0", transform: `translateY(${-parallaxMed}px)` }} />
      {/* Vertical accent line */}
      <div style={{ position: "absolute", left: "var(--px)", top: "12%", bottom: "12%", width: "3px", background: "linear-gradient(180deg, transparent, var(--saffron), var(--steel), var(--lime), transparent)", opacity: 0.12, transform: `translateY(${parallaxSlow}px)` }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "860px", opacity: heroOpacity, transform: `translateY(${parallaxSlow * 0.5}px)` }}>
        {/* Cultural flags */}
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all 0.8s ease 0.3s", display: "flex", gap: "20px", marginBottom: "32px", flexWrap: "wrap" }}>
          {[{ flag: "🇩🇪", label: "Built in Germany" }, { flag: "🇮🇳", label: "Forged in India" }, { flag: "🇺🇸", label: "Sharpened in America" }].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--body)", fontSize: "11px", fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>
              <span style={{ fontSize: "14px" }}>{item.flag}</span> {item.label}
            </div>
          ))}
        </div>

        {/* KINETIC TYPOGRAPHY — staggered character reveal with distortion */}
        <h1 style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(48px, 8vw, 100px)", lineHeight: 1.0, letterSpacing: "-3px", color: "#fff", margin: "0 0 8px" }}>
          {["G", "a", "g", "a", "n", " ", "B", "h", "a", "s", "k", "a", "r"].map((c, i) => (
            <span key={i} className="hero-char" style={{
              display: "inline-block",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : `translateY(120px) rotate(${(i % 2 ? 1 : -1) * 10}deg) scale(0.8)`,
              transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${0.6 + i * 0.04}s`,
              filter: loaded ? "none" : "blur(4px)",
            }}>{c === " " ? "\u00A0" : c}</span>
          ))}
          <br />
          {/* Outlined "Naik" — stroke-path style */}
          {["N", "a", "i", "k"].map((c, i) => (
            <span key={i} style={{
              display: "inline-block",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(120px) scale(0.8)",
              transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${1.15 + i * 0.04}s`,
              filter: loaded ? "none" : "blur(4px)",
              WebkitTextStroke: "1.5px var(--saffron)", color: "transparent",
            }}>{c}</span>
          ))}
          <span style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 1.35s", color: "var(--saffron)", display: "inline-block" }}>.</span>
        </h1>

        {/* Subtitle with text reveal */}
        <div style={{
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(30px)",
          transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 1.4s",
          fontFamily: "var(--body)", fontSize: "clamp(14px, 1.8vw, 18px)", fontWeight: 400,
          color: "rgba(255,255,255,0.75)", maxWidth: "540px", lineHeight: 1.8, margin: "20px 0 44px",
        }}>
          Marketer who combines hands-on channel work in e-commerce, email, social, SEO and paid with an <span style={{ color: "var(--saffron)", fontWeight: 600 }}>analytics and builder mindset</span>.
          <br /><span style={{ fontSize: "0.85em", color: "rgba(255,255,255,0.6)" }}>4+ years · MBA in STEM Business Analytics · Austin, TX</span>
        </div>

        {/* CTAs with ripple effect */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(30px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 1.6s" }}>
          <a href="/my-marketing-work" data-magnetic className="btn-primary">Explore My Work</a>
          <a href="#contact" data-magnetic className="btn-secondary">Contact</a>
        </div>
      </div>

      {/* Parallax photo — layer 3 */}
      <div className="hero-photo" style={{
        position: "absolute", right: "var(--px)", top: "50%",
        transform: `translateY(calc(-50% + ${parallaxMed * 0.3}px))`,
        opacity: loaded ? heroOpacity : 0, transition: "opacity 1.2s ease 1.8s",
      }}>
        <div style={{ position: "relative" }}>
          <div style={{ width: "380px", height: "500px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.15)" }}>
            <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=1067,fit=crop/kP0de2JiSFqeEpCY/img_0395-VnMPjZWGGJ2ZMv1S.png" alt="Gagan" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "contrast(1.05) saturate(0.9)" }} />
          </div>
          <GlassPanel style={{ position: "absolute", bottom: "-30px", left: "-60px", padding: "18px 24px" }}>
            <div style={{ fontFamily: "var(--body)", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--saffron)", marginBottom: "4px" }}>Status</div>
            <div style={{ fontFamily: "var(--display)", fontSize: "16px", fontWeight: 600, color: "#fff" }}>Open to Opportunities</div>
          </GlassPanel>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", opacity: loaded ? 0.4 : 0, transition: "opacity 1s 2.5s", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <div style={{ width: "20px", height: "32px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.3)", display: "flex", justifyContent: "center", paddingTop: "6px" }}>
          <div className="scroll-dot" style={{ width: "2px", height: "6px", borderRadius: "1px", background: "var(--saffron)" }} />
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  STATS (with counting animation)
// ═══════════════════════════════════════════════════════════
function Counter({ end, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    let c = 0; const step = end / 40;
    const timer = setInterval(() => { c += step; if (c >= end) { setCount(end); clearInterval(timer); } else setCount(Math.floor(c)); }, 30);
    return () => clearInterval(timer);
  }, [inView, end]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function StatsBar() {
  // Headline numbers from the portfolio brief (revenue figure is approximate)
  const stats = [
    { value: "~$100K to $120K", label: "Monthly e-commerce revenue", note: "Up from about $30K to $40K", accent: "var(--saffron)" },
    { value: "2.8x", label: "Hero product conversion", note: "1.2% to 3.4% in 8 weeks", accent: "var(--steel)" },
    { value: "34%", label: "MQL-to-SQL improvement", note: "Channel attribution, 15+ B2B campaigns", accent: "var(--lime)" },
    { value: "$3M+", label: "Annual pipeline", note: "Fed by tracked email campaigns", accent: "var(--saffron)" },
  ];
  return (
    <Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid rgba(255,255,255,0.15)", borderBottom: "1px solid rgba(255,255,255,0.15)" }} className="stats-grid stagger">
        {stats.map((s, i) => (
          <div key={i} className="a fl" style={{ padding: "36px 24px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.15)" : "none", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--display)", fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 600, color: s.accent, letterSpacing: "-1px", lineHeight: 1.1 }}>
              {s.value}
            </div>
            <div style={{ fontFamily: "var(--body)", fontSize: "10px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginTop: "10px" }}>{s.label}</div>
            <div style={{ fontFamily: "var(--body)", fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "6px" }}>{s.note}</div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

// ═══════════════════════════════════════════════════════════
//  ABOUT — With parallax image
// ═══════════════════════════════════════════════════════════
function About() {
  return (
    <section id="about" style={{ padding: "120px var(--px)", position: "relative" }}>
      <KolamMotif size={400} animate style={{ position: "absolute", right: "-50px", top: "50%", transform: "translateY(-50%)" }} />
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "280px 1fr", gap: "80px", alignItems: "start", position: "relative" }} className="about-grid">
        <Reveal direction="left" className="a fu">
          <div>
            <div style={{ fontFamily: "var(--body)", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "var(--saffron)", marginBottom: "8px" }}>001</div>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(32px, 4vw, 50px)", fontWeight: 600, color: "#fff", letterSpacing: "-1.5px", lineHeight: 1.1, margin: 0 }}>About<br /><span style={{ color: "var(--saffron)" }}>Me</span></h2>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div>
            <p className="a hs-fill" style={{ fontFamily: "var(--body)", fontSize: "16px", lineHeight: 1.85, color: "rgba(255,255,255,0.8)", margin: "0 0 24px" }}>
              I started in marketing analytics and SEO as an intern, then moved into B2B growth, where I tracked email campaigns that fed a $3M+ annual sales pipeline and built a channel attribution model that improved MQL-to-SQL conversion 34%. After that I led marketing for a small e-commerce brand, growing monthly revenue from roughly $30K to $40K to roughly $100K to $120K while the budget scaled from $5K to $20K, and leading a team of 5.
            </p>
            <p className="a hs-fill" style={{ fontFamily: "var(--body)", fontSize: "16px", lineHeight: 1.85, color: "rgba(255,255,255,0.8)", margin: "0 0 24px" }}>
              I went back to school for an MBA in STEM Business Analytics at Babson College (with a quantitative finance specialization) to pair the creative side with data and modeling. Since then I have worked on nonprofit marketing operations, built an AI-assisted marketing blog, and built Maxion, an AI tool for social and ad creative. I like work where a clear test, a clean number and a good story come together.
            </p>
            <p style={{ fontFamily: "var(--body)", fontSize: "14px", lineHeight: 1.8, color: "rgba(255,255,255,0.6)", margin: "0 0 32px" }}>
              Off the clock: soccer. I have played for school and college teams since high school, and in non-professional leagues in India, Germany and the USA.
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["E-commerce & Amazon", "B2B growth", "SEO & AEO", "Email & lifecycle", "Analytics & automation"].map((tag, i) => (
                <span key={i} style={{ fontFamily: "var(--body)", fontSize: "11px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", padding: "8px 16px", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", transition: "all 0.3s" }}
                  onMouseEnter={e => { e.target.style.borderColor = "var(--saffron)"; e.target.style.color = "var(--saffron)"; e.target.style.boxShadow = "0 0 15px rgba(218,165,32,0.08)"; }}
                  onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.15)"; e.target.style.color = "rgba(255,255,255,0.7)"; e.target.style.boxShadow = "none"; }}>{tag}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  EXPERIENCE — Clickable Cards + Shared Detail Panel
// ═══════════════════════════════════════════════════════════
function Experience() {
  const roles = [
    { title: "Marketing Operations Analyst", company: "Grimes King Foundation Inc.", loc: "Boston, MA · Contract", period: "Jun 2025 to Jul 2026", flag: "🇺🇸", accent: "#b8d435", highlights: ["Grew program applicant acquisition 35% by mapping each multi-stage funnel, finding the two highest drop-off stages and rewriting the conversion copy at each", "Cut intake processing turnaround 40% across 80+ partner organizations by replacing paper workflows with structured digital intake and strict input validation", "Maintained the foundation's WordPress site, including yearly grants, grantee and donor data and the grant application; the board audits the site twice a year", "Built a one-page HTML history of the foundation's 150 years and past board members", "Produced reports on website visits, email metrics and application-link interactions"], tools: ["WordPress", "HTML/CSS"] },
    { title: "Marketing Lead (E-commerce & Amazon)", company: "Moksha Creations", loc: "Bengaluru, India", period: "Jan 2022 to Aug 2023", flag: "🇮🇳", accent: "#daa520", highlights: ["Grew monthly revenue from about $30K to $40K to about $100K to $120K while the monthly marketing budget scaled from $5K to $20K", "Led a team of 5 (2 social content creators, 1 e-commerce and Amazon marketer, 2 paid media marketers); hired 2, and the whole team stayed", "Amazon Sponsored Products: cost per order down 28% (ACOS 35% to 25%) and CTR up 24% by consolidating 14 to 16 campaigns into 5 to 6", "Lifted hero product page conversion from 1.2% to 3.4% in 8 weeks by testing main image angles, benefit-led titles and A+ content", "Built 35 to 40 HTML/CSS email templates by customer journey; open rates for recent and previous buyers rose from 17% to 29% and build time fell about 60%", "Grew organic search clicks from under 50 to about 350 to 500 a month in 4 to 5 months with 8 to 12 articles and FAQ schema", "Built an Excel stock automation with alerts to 3 vendors; stockouts fell from 3 to 4 a month to under 1"], tools: ["Google Ads", "Amazon Ads", "Meta Ads", "Mailchimp", "WooCommerce", "WordPress", "Wix", "Excel"] },
    { title: "Growth Analyst", company: "Petropath Fluids India Pvt. Ltd.", loc: "Bengaluru, India", period: "Jan 2021 to Jan 2022", flag: "🇮🇳", accent: "#6b8cae", highlights: ["Tracked and reported 10+ email campaigns that fed $3M+ in annual sales pipeline at a 35% average open rate and 12% CTR", "Improved MQL-to-SQL conversion 34% by setting up website and campaign tracking and building a channel-level attribution model across 15+ B2B campaigns", "Represented the company at 3 trade shows, handling print media, logistics and booth conversations", "Built 4 decks for prospective clients and 2 to 3 for the Indian government, turning a technical innovation into clear presentations", "Built a quotation, product data sheet and safety data sheet generator from an Excel product database and LaTeX templates"], tools: ["LinkedIn Ads", "Email", "HTML/CSS", "Excel", "LaTeX"] },
    { title: "Marketing & SEO Analytics Intern (Amazon)", company: "GAO Tek Inc.", loc: "New York, NY", period: "Oct 2019 to Mar 2020", flag: "🇺🇸", accent: "#b8d435", highlights: ["Grew organic search traffic 35% across a 500+ product catalog by auditing and rewriting Amazon SEO and listing copy", "Improved click-through rates 18% by writing and A/B testing Google Shopping and Amazon Sponsored Products headlines", "Cut manual reporting time 25% across 500+ SKUs with weekly keyword tracking and competitor pricing models in Excel and SQL"], tools: ["Amazon Ads", "Google Shopping", "Excel", "SQL", "A/B testing"] },
  ];

  return (
    <section id="experience" style={{ padding: "120px var(--px)", position: "relative" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal className="a fu">
          <div style={{ display: "flex", alignItems: "baseline", gap: "20px", marginBottom: "40px" }}>
            <span style={{ fontFamily: "var(--body)", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "var(--steel)" }}>002</span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(32px, 4vw, 50px)", fontWeight: 600, color: "#fff", letterSpacing: "-1.5px", margin: 0 }}>Professional <span style={{ color: "var(--steel)" }}>Experience</span></h2>
          </div>
        </Reveal>

        {/* Timeline: the spine draws as you scroll, each node pops at mid-screen, dates stay pinned beside each role */}
        <div className="hs-tl">
          <div className="hs-tl-spine" aria-hidden="true"><div className="hs-tl-fill" /></div>
          {roles.map((r, i) => (
            <article key={r.company} className="hs-role" style={{ "--acc": r.accent }}>
              <div className="hs-role-side">
                <div className="hs-role-idx" aria-hidden="true">{String(i + 1).padStart(2, "0")}</div>
                <div className="hs-role-period">{r.period}</div>
                <div className="hs-role-loc"><span>{r.flag}</span> {r.loc}</div>
              </div>
              <span className="hs-node" aria-hidden="true" />
              <div className="hs-role-body">
                <div className="hs-role-company">{r.company}</div>
                <h3 className="hs-role-title">{r.title}</h3>
                <ul className="hs-hl">
                  {r.highlights.map((h, j) => <li key={j} className="hs-li">{h}</li>)}
                </ul>
                <div className="hs-tools">
                  {r.tools.map(t => <span key={t} className="hs-tool">{t}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  EDUCATION — pinned stage: degrees slide in, year counts up, certificates stamp down
// ═══════════════════════════════════════════════════════════
function Education() {
  const education = [
    { degree: "B.E., Business & Engineering", note: "Technical University of Applied Sciences Würzburg-Schweinfurt", school: "THWS", loc: "Schweinfurt, Germany", years: "Oct 2016 to Dec 2020", end: "2020", flag: "🇩🇪", accent: "var(--steel)", side: "l" },
    { degree: "MBA, STEM Business Analytics", note: "Quantitative finance specialization", school: "Babson College", loc: "Wellesley, MA", years: "Sep 2023 to May 2025", end: "2025", flag: "🇺🇸", accent: "var(--lime)", side: "r" },
  ];
  const certs = ["Google AI Professional Certificate", "Google Analytics 4 (GA4) Certified", "HubSpot Inbound Marketing Certified"];

  return (
    <section id="education" className="hs-edu" aria-labelledby="hs-edu-h">
      <div className="hs-edu-stage">
        <div className="hs-edu-year" aria-hidden="true" />
        <div className="hs-edu-inner">
          <div style={{ display: "flex", alignItems: "baseline", gap: "20px", marginBottom: "40px" }} className="hs-edu-head">
            <span style={{ fontFamily: "var(--body)", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "var(--lime)" }}>003</span>
            <h2 id="hs-edu-h" style={{ fontFamily: "var(--display)", fontSize: "clamp(32px, 4vw, 50px)", fontWeight: 600, color: "#fff", letterSpacing: "-1.5px", margin: 0 }}>Edu<span style={{ color: "var(--lime)" }}>cation</span></h2>
          </div>

          <div className="hs-edu-cards">
            {education.map(ed => (
              <div key={ed.school} className={`hs-edu-card ${ed.side}`}>
                <TiltCard glowColor={ed.accent} style={{ padding: "30px 32px", height: "100%", background: "rgba(12,10,8,0.75)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
                    <div>
                      <div style={{ fontFamily: "var(--display)", fontSize: "19px", fontWeight: 600, color: "#fff", marginBottom: "6px", lineHeight: 1.3 }}>{ed.degree}</div>
                      <div style={{ fontFamily: "var(--body)", fontSize: "12px", color: "rgba(255,255,255,0.55)", marginBottom: "10px" }}>{ed.note}</div>
                      <div style={{ fontFamily: "var(--body)", fontSize: "13px", color: "rgba(255,255,255,0.75)", display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}><span>{ed.flag}</span> {ed.school}, {ed.loc}</div>
                      <div style={{ fontFamily: "var(--body)", fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>{ed.years}</div>
                    </div>
                    <div style={{ fontFamily: "var(--display)", fontSize: "34px", fontWeight: 600, color: ed.accent, opacity: 0.9, textShadow: `0 0 20px ${ed.accent}` }}>{ed.end}</div>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>

          <p className="hs-edu-course">
            MBA coursework: Business Analytics, Programming for Business Analytics, Advanced Programming for Business Analytics, Machine Learning Methods for Business, Marketing.
          </p>

          <div className="hs-edu-certs">
            <div className="hs-edu-certs-label">Certifications</div>
            {certs.map(c => <span key={c} className="hs-stamp">{c}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  SKILLS — drifting marquee rows that pull into focus, giant TOOLKIT word behind
// ═══════════════════════════════════════════════════════════
function Skills() {
  const rows = [
    { items: ["Email marketing", "SEO, FAQ schema & AEO", "Amazon Ads & listing optimization", "Google Ads (Search, Shopping, Demand Gen, PMax, Display)", "Meta Ads", "LinkedIn Ads (B2B)", "Organic social", "Landing pages", "WooCommerce merchandising", "Trade shows & in-store events"], accent: "var(--saffron)", speed: 45, direction: "left" },
    { items: ["GA4", "Google Tag Manager", "Excel", "SQL", "Tableau", "Power BI", "SEMrush", "Search Console", "Yoast", "Machine learning methods", "LaTeX"], accent: "var(--steel)", speed: 42, direction: "right" },
    { items: ["WordPress", "WooCommerce", "Wix", "HTML/CSS", "Canva", "Adobe InDesign", "Adobe Photoshop", "Adobe Illustrator", "CapCut", "PowerPoint", "Asana", "Jira", "Trello", "AI content & creative tools"], accent: "var(--lime)", speed: 48, direction: "left" },
  ];
  const labels = ["Channels", "Analytics & Data", "Web, Design & Tools"];

  return (
    <section id="skills" className="hs-skills" style={{ padding: "140px 0", position: "relative", overflow: "hidden" }}>
      <div className="hs-skills-word" aria-hidden="true">TOOLKIT</div>
      <KolamMotif size={450} color="var(--lime)" animate style={{ position: "absolute", left: "-120px", bottom: "-80px" }} />
      <div style={{ padding: "0 var(--px)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto 72px", position: "relative" }}>
          <Reveal className="a fu">
            <div style={{ display: "flex", alignItems: "baseline", gap: "20px" }}>
              <span style={{ fontFamily: "var(--body)", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "var(--lime)" }}>004</span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(32px, 4vw, 50px)", fontWeight: 600, color: "#fff", letterSpacing: "-1.5px", margin: 0 }}>Skills<span style={{ color: "var(--lime)" }}> &amp; Tools</span></h2>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Marquee rows: continuous loop + scroll-linked drift in alternating directions */}
      <div style={{ display: "flex", flexDirection: "column", gap: "56px", position: "relative" }}>
        {rows.map((row, ri) => (
          <Reveal key={ri} delay={ri * 0.12}>
            <div className="hs-row-focus" style={{ position: "relative" }}>
              <div className="hs-row-label" style={{ color: row.accent }}>
                <span>{labels[ri]}</span><span className="hs-row-count">{row.items.length}</span>
              </div>
              <div style={{ overflow: "hidden", width: "100%", maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
                <div className={`marquee-track marquee-${row.direction} ${ri % 2 ? "hs-drift-r" : "hs-drift-l"}`} style={{
                  display: "flex", gap: "12px", width: "fit-content",
                  animationDuration: `${row.speed}s`,
                }}>
                  {[...row.items, ...row.items, ...row.items].map((item, j) => (
                    <div key={j} data-magnetic style={{
                      padding: "14px 28px", whiteSpace: "nowrap",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      fontFamily: "var(--body)", fontSize: "13px", fontWeight: 500,
                      color: "rgba(255,255,255,0.75)",
                      transition: "all 0.4s ease",
                      flexShrink: 0,
                    }}
                      onMouseEnter={e => {
                        e.target.style.borderColor = `${row.accent === "var(--saffron)" ? "rgba(218,165,32,0.45)" : row.accent === "var(--steel)" ? "rgba(107,140,174,0.45)" : "rgba(184,212,53,0.45)"}`;
                        e.target.style.color = row.accent;
                        e.target.style.background = `${row.accent === "var(--saffron)" ? "rgba(218,165,32,0.06)" : row.accent === "var(--steel)" ? "rgba(107,140,174,0.06)" : "rgba(184,212,53,0.06)"}`;
                        e.target.closest('.marquee-track').style.animationPlayState = 'paused';
                      }}
                      onMouseLeave={e => {
                        e.target.style.borderColor = "rgba(255,255,255,0.15)";
                        e.target.style.color = "rgba(255,255,255,0.75)";
                        e.target.style.background = "rgba(255,255,255,0.04)";
                        e.target.closest('.marquee-track').style.animationPlayState = 'running';
                      }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  WORK PREVIEW — 3D Tilt Cards
// ═══════════════════════════════════════════════════════════
function WorkPreview() {
  // Case studies from the portfolio brief: situation, what I did, the number
  const projects = [
    { tag: "E-commerce growth", title: "Scaling a small consumer brand", situation: "A small brand selling through its own website, Amazon, wholesale buyers and physical retail stores.", did: "I led marketing and a team of 5 across Google, Amazon and Meta while the monthly budget scaled from $5K to $20K. I also tested main image angles, benefit-led titles and A+ content on the hero product page.", number: "~$100K to $120K", numberLabel: "monthly revenue, up from about $30K to $40K", extra: "Hero product conversion 1.2% to 3.4% (2.8x) in 8 weeks", accent: "var(--saffron)", wide: true },
    { tag: "B2B attribution & pipeline", title: "Making B2B channels measurable", situation: "A B2B technical fluids company running 15+ campaigns across LinkedIn Ads, email, website and paid search.", did: "I set up website and campaign tracking and built a channel-level attribution model. I tracked and reported 10+ email campaigns.", number: "34%", numberLabel: "MQL-to-SQL improvement", extra: "$3M+ annual pipeline fed by tracked email campaigns, 35% open rate, 12% CTR", accent: "var(--steel)" },
    { tag: "SEO & organic growth", title: "From page 3 to page 1", situation: "Target links sat on page 2 or 3 of search results.", did: "I ran a keyword study, published 8 to 12 articles with FAQ schema, and redesigned landing pages for the highest-traffic links.", number: "350 to 500", numberLabel: "monthly organic clicks, up from under 50 in 4 to 5 months", extra: "Time on page from 8 to 10 seconds to 45 seconds", accent: "var(--lime)" },
    { tag: "Email & lifecycle", title: "Email by customer journey", situation: "Email for the e-commerce brand's recent and previous buyers.", did: "I built 35 to 40 HTML/CSS templates organized by customer journey and the first automated flows: replenishment, abandoned cart and post-purchase (Mailchimp with WooCommerce).", number: "17% to 29%", numberLabel: "open rate for recent and previous buyers", extra: "Build time cut about 60%", accent: "var(--saffron)" },
    { tag: "Operations automation", title: "Fewer stockouts, faster intake", situation: "The brand had 3 to 4 stockouts a month, and the foundation ran partner intake on paper.", did: "I built an Excel stock tracker with end-of-day updates and soft and hard alerts to me and 3 vendors. At the foundation, I replaced paper with structured digital intake and strict input validation across 80+ partner organizations.", number: "Under 1", numberLabel: "stockout a month, down from 3 to 4", extra: "Intake turnaround cut 40%", accent: "var(--steel)" },
    { tag: "AI projects", title: "An AI-assisted blog and Maxion", situation: "Two personal builds: a marketing blog and a creative tool.", did: "The blog publishes 1 AI-assisted article a day, each reviewed by me and written for featured snippets and AEO. Maxion, built in 2 weeks, turns 13 of my best-performing ad prompts into a style library and orchestrates multiple AI providers to generate social posts and short-form ad creative.", number: "5s to 32s", numberLabel: "average blog session duration", extra: "500 visits in the first 3 months", link: "https://gbnmarketing.blogspot.com", linkLabel: "Read the blog", accent: "var(--lime)", wide: true },
    { tag: "MBA capstone", title: "Customer churn model", situation: "Team project at Babson College.", did: "Our team built a churn model to find which customers were most likely to leave.", number: "$2.4M", numberLabel: "retention opportunity identified, AUC 0.87", accent: "var(--saffron)" },
  ];
  // Same drifting mosaic as the Work page's "Selected Work" banner
  const mosaic = [
    "ai-generated-ai-gen-1.jpg", "social-media-image-drnaik-beautyserums.jpg", "design-concepts-t-shirt-design-2-instire-clothing-1.jpg",
    "print-forum-poster-gkf-1.jpg", "ai-generated-ai-powered-posts-1.jpg", "tableau-campaign-performance-dashboard.jpg",
    "logo-design-petrizllc-logo-1.jpg", "ai-generated-ai-gen-2.jpg", "social-media-image-ppfluids-social-1.jpg",
    "design-concepts-t-shirt-design-2-instire-clothing-21.jpg", "ai-generated-ai-powered-posts-10.jpg", "print-gkf-forum-primary-invite-1.jpg",
    "ai-generated-ai-gen-3.jpg", "tableau-customer-order-db.jpg", "ai-generated-ai-powered-posts-2.jpg",
    "social-media-image-aesthetic-republic-day-flyer.jpg", "design-concepts-t-shirt-design-2-instire-clothing-28.jpg", "ai-generated-ai-gen-4.jpg",
  ];
  return (
    <>
    {/* 19 · pinned "Selected Work" banner */}
    <section id="work" className="mw-pin" aria-label="Selected work">
      <div className="mw-pin-in">
        <div className="mw-pin-bg" aria-hidden="true">{mosaic.map((f, i) => <img key={i} src={`/work/${f}`} alt="" loading="lazy" />)}</div>
        <p className="mw-eyebrow">005 · Marketing · Data · Design</p>
        <h2 className="mw-pin-h">Selected <em>Work</em></h2>
        <a href="/my-marketing-work" data-magnetic className="btn-secondary" style={{ marginTop: "12px" }}>See the full portfolio →</a>
      </div>
    </section>
    <section style={{ padding: "100px var(--px) 120px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="hs-pin-row">
          <span style={{ fontFamily: "var(--body)", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Case studies</span>
          <a href="/my-marketing-work" data-magnetic style={{ fontFamily: "var(--body)", fontSize: "12px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--saffron)", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px", transition: "gap 0.3s" }} onMouseEnter={e => e.currentTarget.style.gap = "14px"} onMouseLeave={e => e.currentTarget.style.gap = "6px"}>View all →</a>
        </div>
        <div className="work-grid hs-cases stagger">
          {projects.map((p, i) => (
            <Reveal key={i} delay={(i % 3) * 0.1} className={`a bl${p.wide ? " hs-wide" : ""}`} style={{ height: "100%" }}>
              <TiltCard glowColor={p.accent} style={{ padding: "32px 30px", height: "100%", display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "28px", height: "3px", background: p.accent }} />
                  <span style={{ fontFamily: "var(--body)", fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: p.accent }}>{p.tag}</span>
                </div>
                <div style={{ fontFamily: "var(--display)", fontSize: "22px", fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>{p.title}</div>
                <div>
                  <div style={{ fontFamily: "var(--display)", fontSize: "clamp(32px, 3.4vw, 44px)", fontWeight: 600, color: p.accent, letterSpacing: "-1px", lineHeight: 1.05 }}>{p.number}</div>
                  <div style={{ fontFamily: "var(--body)", fontSize: "12px", color: "rgba(255,255,255,0.65)", marginTop: "4px" }}>{p.numberLabel}</div>
                </div>
                <div style={{ fontFamily: "var(--body)", fontSize: "14px", lineHeight: 1.7, color: "rgba(255,255,255,0.6)" }}>{p.situation}</div>
                <div style={{ fontFamily: "var(--body)", fontSize: "14px", lineHeight: 1.7, color: "rgba(255,255,255,0.82)" }}>{p.did}</div>
                {p.extra && <div style={{ fontFamily: "var(--body)", fontSize: "13px", color: "#fff", borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: "12px", marginTop: "auto" }}>{p.extra}</div>}
                {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" data-magnetic style={{ fontFamily: "var(--body)", fontSize: "12px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: p.accent, textDecoration: "none" }}>{p.linkLabel} ↗</a>}
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}

// ═══════════════════════════════════════════════════════════
//  CONTACT
// ═══════════════════════════════════════════════════════════
function Contact() {
  return (
    <section id="contact" className="hs-contact" style={{ padding: "140px var(--px)", position: "relative", overflow: "hidden" }}>
      <KolamMotif size={550} animate style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }} />
      <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center", position: "relative" }}>
        <Reveal className="a fi"><div className="hs-ink" style={{ fontFamily: "var(--body)", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "var(--saffron)", marginBottom: "20px" }}>006 · Contact</div></Reveal>
        <Reveal delay={0.1} className="a fu">
          <h2 className="hs-ink" style={{ fontFamily: "var(--display)", fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 600, color: "#fff", lineHeight: 1.1, letterSpacing: "-2px", margin: "0 0 20px" }}>
            Let's <span className="hs-stroke" style={{ WebkitTextStroke: "1.5px var(--saffron)", color: "transparent" }}>Connect</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.2} className="a fi"><p className="hs-ink-soft" style={{ fontFamily: "var(--body)", fontSize: "16px", lineHeight: 1.8, color: "rgba(255,255,255,0.75)", margin: "0 0 40px" }}>Hiring for marketing, growth or analytics? Let's talk.</p></Reveal>
        <Reveal delay={0.3} className="a fu">
          <a href="mailto:gagan.97@gmail.com" data-magnetic className="btn-primary" style={{ padding: "16px 44px", fontSize: "13px", letterSpacing: "1.5px", textTransform: "none" }}>
            gagan.97@gmail.com
          </a>
          <div className="hs-ink-soft" style={{ marginTop: "20px", display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap", fontFamily: "var(--body)", fontSize: "12px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase" }}>
            <a href="https://www.linkedin.com/in/gbn97/" target="_blank" rel="noopener noreferrer" data-magnetic style={{ color: "inherit" }}>LinkedIn</a>
            <a href="https://github.com/AnanidzeZitze" target="_blank" rel="noopener noreferrer" data-magnetic style={{ color: "inherit" }}>GitHub</a>
            <a href="https://gbnmarketing.blogspot.com" target="_blank" rel="noopener noreferrer" data-magnetic style={{ color: "inherit" }}>Marketing blog</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════════════════
export default function Apex() {
  const [loaded, setLoaded] = useState(false);
  const onPreloaderComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      <GlobalStyles />

      {!loaded && <Preloader onComplete={onPreloaderComplete} />}
      {loaded && <MagneticCursor />}
      <GradientMesh />
      <Nav
        links={[{ href: "#about", label: "About" }, { href: "#experience", label: "Experience" }, { href: "#education", label: "Education" }, { href: "#skills", label: "Skills" }, { href: "#contact", label: "Contact" }]}
        pages={[{ href: "/my-marketing-work", label: "Work" }, { href: "https://gbnmarketing.blogspot.com/", label: "Blog" }]}
      />
      <div className="mw-bar" aria-hidden="true" />
      <main className="mw">
        <Hero />
        <StatsBar />
        <About />
        <Experience />
        <Education />
        <Skills />
        <WorkPreview />
        <Contact />
      </main>
      <Footer links={[
        { label: "LinkedIn", href: "https://www.linkedin.com/in/gbn97/" },
        { label: "Medium", href: "https://medium.com/@ananidzezitze" },
        { label: "GitHub", href: "https://github.com/AnanidzeZitze?tab=repositories" },
        { label: "Tableau", href: "https://public.tableau.com/app/profile/gagan.bhaskar.naik/vizzes" }
      ]} />
    </>
  );
}
