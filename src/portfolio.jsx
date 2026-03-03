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
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--body)", fontSize: "11px", fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
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
          color: "rgba(255,255,255,0.4)", maxWidth: "540px", lineHeight: 1.8, margin: "20px 0 44px",
        }}>
          Growth strategist. Marketing analytician. Data-driven storyteller.
          <br />I don't just read the market — <span style={{ color: "var(--saffron)", fontWeight: 600 }}>I move it</span>.
        </div>

        {/* CTAs with ripple effect */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(30px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 1.6s" }}>
          <a href="#experience" data-magnetic className="btn-primary" style={{
            position: "relative", overflow: "hidden",
            padding: "14px 36px", background: "var(--saffron)", color: "var(--bg)", textDecoration: "none",
            fontFamily: "var(--body)", fontSize: "12px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase",
            transition: "all 0.4s", boxShadow: "0 0 30px rgba(218,165,32,0.15)",
          }}>Explore My Work</a>
          <a href="#contact" data-magnetic style={{
            padding: "14px 36px", background: "transparent", border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.6)", textDecoration: "none",
            fontFamily: "var(--body)", fontSize: "12px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase",
            transition: "all 0.4s",
          }}>Contact</a>
        </div>
      </div>

      {/* Parallax photo — layer 3 */}
      <div className="hero-photo" style={{
        position: "absolute", right: "var(--px)", top: "50%",
        transform: `translateY(calc(-50% + ${parallaxMed * 0.3}px))`,
        opacity: loaded ? heroOpacity : 0, transition: "opacity 1.2s ease 1.8s",
      }}>
        <div style={{ position: "relative" }}>
          <div style={{ width: "280px", height: "360px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
            <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=1067,fit=crop/kP0de2JiSFqeEpCY/img_0395-VnMPjZWGGJ2ZMv1S.png" alt="Gagan" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "contrast(1.05) saturate(0.9)" }} />
          </div>
          <GlassPanel style={{ position: "absolute", bottom: "-20px", left: "-40px", padding: "14px 18px" }}>
            <div style={{ fontFamily: "var(--body)", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--saffron)", marginBottom: "4px" }}>Status</div>
            <div style={{ fontFamily: "var(--display)", fontSize: "16px", fontWeight: 600, color: "#fff" }}>Open to Opportunities</div>
          </GlassPanel>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", opacity: loaded ? 0.4 : 0, transition: "opacity 1s 2.5s", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <div style={{ width: "20px", height: "32px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.15)", display: "flex", justifyContent: "center", paddingTop: "6px" }}>
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
  const stats = [
    { value: 230, suffix: "%", label: "Engagement Growth", accent: "var(--saffron)" },
    { value: 10, suffix: "M+", label: "Bids Supported", accent: "var(--steel)", prefix: "$" },
    { value: 40, suffix: "%", label: "Process Time Cut", accent: "var(--lime)" },
    { value: 3, suffix: "", label: "Continents Worked", accent: "var(--saffron)" },
  ];
  return (
    <Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }} className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} style={{ padding: "36px var(--px)", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 600, color: s.accent, letterSpacing: "-1px" }}>
              {s.prefix || ""}<Counter end={s.value} suffix={s.suffix} />
            </div>
            <div style={{ fontFamily: "var(--body)", fontSize: "10px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginTop: "8px" }}>{s.label}</div>
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
        <Reveal direction="left">
          <div>
            <div style={{ fontFamily: "var(--body)", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "var(--saffron)", marginBottom: "8px" }}>001</div>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(32px, 4vw, 50px)", fontWeight: 600, color: "#fff", letterSpacing: "-1.5px", lineHeight: 1.1, margin: 0 }}>The<br /><span style={{ color: "var(--saffron)" }}>Strategist</span></h2>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div>
            <p style={{ fontFamily: "var(--body)", fontSize: "16px", lineHeight: 1.85, color: "rgba(255,255,255,0.5)", margin: "0 0 24px" }}>
              I'm a data-driven marketer who operates at the intersection of growth strategy, analytics, and finance. I don't just look at numbers — I decode the <em style={{ color: "var(--saffron)", fontStyle: "italic" }}>why</em> behind human behavior, then architect systems that turn those insights into scalable growth.
            </p>
            <p style={{ fontFamily: "var(--body)", fontSize: "16px", lineHeight: 1.85, color: "rgba(255,255,255,0.5)", margin: "0 0 32px" }}>
              My perspective is shaped by three cultures: German engineering precision, Indian entrepreneurial intensity, and American tech-forward ambition. That global lens is my competitive advantage.
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["Growth Strategy", "Marketing Analytics", "AI-Driven Marketing", "Data Storytelling"].map((tag, i) => (
                <span key={i} style={{ fontFamily: "var(--body)", fontSize: "11px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", padding: "8px 16px", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)", transition: "all 0.3s" }}
                  onMouseEnter={e => { e.target.style.borderColor = "var(--saffron)"; e.target.style.color = "var(--saffron)"; e.target.style.boxShadow = "0 0 15px rgba(218,165,32,0.08)"; }}
                  onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.06)"; e.target.style.color = "rgba(255,255,255,0.4)"; e.target.style.boxShadow = "none"; }}>{tag}</span>
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
  const [activeRole, setActiveRole] = useState(0);
  const roles = [
    { title: "Marketing & Operations Consultant", company: "Grimes King Foundation", loc: "Boston, USA", period: "Aug 2023 — Present", flag: "🇺🇸", accent: "var(--lime)", highlights: ["Digitized donor & grant system (80+ applicants) — 40% faster processing", "+50% donor engagement via SEO + email campaigns", "End-to-end CRM, WordPress, and marketing operations", "Built scalable digital workflows for non-profit operations"], tools: ["WordPress", "Mailchimp", "SEO", "Canva"] },
    { title: "Digital Marketing Manager", company: "Moksha Creations", loc: "Bengaluru, India", period: "Feb 2022 — Aug 2023", flag: "🇮🇳", accent: "var(--saffron)", highlights: ["Launched e-commerce platform → doubled online sales in 3 months", "+230% engagement via social media, blogs & paid campaigns", "Integrated analytics dashboards → +30% qualified leads", "Managed $50K+ ad spend across Google, Meta, and LinkedIn"], tools: ["Google Ads", "Meta Ads", "Shopify", "GA4", "Tableau", "Canva"] },
    { title: "Growth Marketing & Pricing Analyst", company: "Petropath Fluids India", loc: "Bengaluru, India", period: "Jan 2021 — Aug 2023", flag: "🇮🇳", accent: "var(--saffron)", highlights: ["15+ digital campaigns → +30% B2B leads, +20% sales inquiries", "Pricing/profitability models supporting $10M+ bids", "Website redesign → bounce rate ↓25%, session time ↑60s", "Built financial models (DCF, 3-statement) for strategic decisions"], tools: ["Excel", "Power BI", "Salesforce", "SEMrush", "WordPress", "Financial Modeling"] },
    { title: "Digital Marketing Intern", company: "GAO Tek Inc.", loc: "NYC (Remote)", period: "Oct 2019 — Mar 2020", flag: "🇺🇸", accent: "var(--steel)", highlights: ["+35% organic traffic via Amazon SEO & keyword optimization", "+22% conversion rates through A/B testing & optimized listings", "Managed product listings across multiple e-commerce platforms"], tools: ["Amazon Seller Central", "SEMrush", "A/B Testing", "Google Analytics"] },
  ];
  const education = [
    { degree: "MBA — Quant Finance; Analytics & ML", school: "Babson College", loc: "MA, USA", gpa: "3.6", flag: "🇺🇸", accent: "var(--lime)" },
    { degree: "B.Eng — Business & Engineering", school: "TH Schweinfurt", loc: "Germany", gpa: "3.87", flag: "🇩🇪", accent: "var(--steel)" },
  ];

  const active = roles[activeRole];

  return (
    <section id="experience" style={{ padding: "120px var(--px)", position: "relative" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "baseline", gap: "20px", marginBottom: "60px" }}>
            <span style={{ fontFamily: "var(--body)", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "var(--steel)" }}>002</span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(32px, 4vw, 50px)", fontWeight: 600, color: "#fff", letterSpacing: "-1.5px", margin: 0 }}>Career <span style={{ color: "var(--steel)" }}>Intelligence</span></h2>
          </div>
        </Reveal>

        {/* Two-column layout: clickable cards left, detail panel right */}
        <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "3px", alignItems: "start" }} className="exp-layout">

          {/* LEFT — Role selector cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            {roles.map((r, i) => {
              const isActive = activeRole === i;
              return (
                <Reveal key={i} delay={i * 0.06}>
                  <div data-magnetic onClick={() => setActiveRole(i)}
                    style={{
                      padding: "20px 24px", cursor: "pointer", position: "relative", overflow: "hidden",
                      background: isActive ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.01)",
                      borderLeft: isActive ? `3px solid ${r.accent}` : "3px solid transparent",
                      boxShadow: isActive ? `0 0 0 1px ${r.accent}22, 0 0 30px ${r.accent}08` : "0 0 0 1px rgba(255,255,255,0.04)",
                      transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                      transform: isActive ? "translateX(4px)" : "none",
                    }}
                    onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.boxShadow = `0 0 0 1px rgba(255,255,255,0.08)`; } }}
                    onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.01)"; e.currentTarget.style.boxShadow = "0 0 0 1px rgba(255,255,255,0.04)"; } }}>
                    <div style={{ fontFamily: "var(--display)", fontSize: "16px", fontWeight: 600, color: isActive ? "#fff" : "rgba(255,255,255,0.5)", transition: "color 0.3s", marginBottom: "3px" }}>
                      {r.title}
                    </div>
                    <div style={{ fontFamily: "var(--body)", fontSize: "12px", color: isActive ? r.accent : "rgba(255,255,255,0.25)", transition: "color 0.3s", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>{r.flag}</span> {r.company}
                    </div>
                    {/* Active indicator dot */}
                    {isActive && <div style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", width: "6px", height: "6px", borderRadius: "50%", background: r.accent, boxShadow: `0 0 10px ${r.accent}66` }} />}
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* RIGHT — Detail panel (changes based on selected role) */}
          <div key={activeRole} style={{
            padding: "36px 40px",
            background: "rgba(12,10,8,0.5)",
            backdropFilter: "blur(16px) saturate(140%)",
            border: `1px solid ${active.accent}22`,
            boxShadow: `0 10px 40px rgba(0,0,0,0.2), 0 0 40px ${active.accent}06`,
            animation: "detailFadeIn 0.5s cubic-bezier(0.16,1,0.3,1)",
            position: "sticky", top: "80px",
          }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <div style={{ fontFamily: "var(--body)", fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: active.accent, marginBottom: "8px" }}>
                  {active.period}
                </div>
                <div style={{ fontFamily: "var(--display)", fontSize: "24px", fontWeight: 600, color: "#fff", lineHeight: 1.2, marginBottom: "4px" }}>
                  {active.title}
                </div>
                <div style={{ fontFamily: "var(--body)", fontSize: "14px", color: "rgba(255,255,255,0.35)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "16px" }}>{active.flag}</span> {active.company} · {active.loc}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: `linear-gradient(90deg, ${active.accent}33, transparent)`, marginBottom: "24px" }} />

            {/* Accomplishments */}
            <div style={{ fontFamily: "var(--body)", fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: "16px" }}>Key Accomplishments</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
              {active.highlights.map((h, j) => (
                <div key={j} style={{
                  fontFamily: "var(--body)", fontSize: "14px", lineHeight: 1.7, color: "rgba(255,255,255,0.5)",
                  paddingLeft: "20px", position: "relative",
                  animation: `detailItemIn 0.4s cubic-bezier(0.16,1,0.3,1) ${j * 0.08}s both`,
                }}>
                  <span style={{ position: "absolute", left: 0, top: "8px", width: "8px", height: "2px", background: active.accent, opacity: 0.7 }} />
                  {h}
                </div>
              ))}
            </div>

            {/* Tools used */}
            <div style={{ fontFamily: "var(--body)", fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: "12px" }}>Tools & Stack</div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {active.tools.map((tool, j) => (
                <span key={j} style={{
                  fontFamily: "var(--body)", fontSize: "11px", fontWeight: 500,
                  padding: "5px 12px", border: `1px solid ${active.accent}25`,
                  color: active.accent, background: `${active.accent}08`,
                  animation: `detailItemIn 0.4s cubic-bezier(0.16,1,0.3,1) ${0.3 + j * 0.05}s both`,
                }}>{tool}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Education */}
        <Reveal delay={0.2}>
          <div style={{ marginTop: "48px" }}>
            <div style={{ fontFamily: "var(--body)", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: "16px" }}>Education</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px" }} className="edu-grid">
              {education.map((ed, i) => (
                <TiltCard key={i} glowColor={ed.accent} style={{ padding: "28px 32px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontFamily: "var(--display)", fontSize: "16px", fontWeight: 600, color: "#fff", marginBottom: "6px", lineHeight: 1.3 }}>{ed.degree}</div>
                      <div style={{ fontFamily: "var(--body)", fontSize: "13px", color: "rgba(255,255,255,0.3)", display: "flex", alignItems: "center", gap: "6px" }}><span>{ed.flag}</span> {ed.school}, {ed.loc}</div>
                    </div>
                    <div style={{ fontFamily: "var(--display)", fontSize: "28px", fontWeight: 600, color: ed.accent, opacity: 0.2 }}>{ed.gpa}</div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  SKILLS — Infinite Rolling Marquee Carousel
// ═══════════════════════════════════════════════════════════
function Skills() {
  const rows = [
    { items: ["SEO / SEM / GEM", "Paid Media", "Content Strategy", "A/B Testing & CRO", "E-commerce & DTC", "Web Design & UX", "Email Marketing", "Brand Strategy"], accent: "var(--saffron)", speed: 35, direction: "left" },
    { items: ["Google Analytics 4", "Tableau", "Power BI", "SQL", "R", "Python", "Advanced Excel", "Data Visualization", "Attribution Modeling", "Tag Manager"], accent: "var(--steel)", speed: 42, direction: "right" },
    { items: ["Salesforce", "HubSpot", "Mailchimp", "Figma", "Canva", "Adobe Suite", "WordPress", "Framer", "Jira", "Financial Modeling (DCF, LBO)"], accent: "var(--lime)", speed: 38, direction: "left" },
  ];
  const labels = ["Marketing & Growth", "Analytics & Data", "Tools & Platforms"];

  return (
    <section id="skills" style={{ padding: "120px 0", position: "relative", overflow: "hidden" }}>
      <KolamMotif size={450} color="var(--lime)" animate style={{ position: "absolute", left: "-120px", bottom: "-80px" }} />
      <div style={{ maxWidth: "1100px", margin: "0 auto 60px", padding: "0 var(--px)", position: "relative" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "baseline", gap: "20px" }}>
            <span style={{ fontFamily: "var(--body)", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "var(--lime)" }}>003</span>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(32px, 4vw, 50px)", fontWeight: 600, color: "#fff", letterSpacing: "-1.5px", margin: 0 }}>Arsenal<span style={{ color: "var(--lime)" }}>.</span></h2>
          </div>
        </Reveal>
      </div>

      {/* Marquee rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {rows.map((row, ri) => (
          <Reveal key={ri} delay={ri * 0.12}>
            <div style={{ position: "relative" }}>
              {/* Category label */}
              <div style={{ position: "absolute", left: "var(--px)", top: "-20px", fontFamily: "var(--body)", fontSize: "9px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: row.accent, opacity: 0.5, zIndex: 2 }}>
                {labels[ri]}
              </div>
              {/* Marquee container */}
              <div style={{ overflow: "hidden", width: "100%", maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
                <div className={`marquee-track marquee-${row.direction}`} style={{
                  display: "flex", gap: "12px", width: "fit-content",
                  animationDuration: `${row.speed}s`,
                }}>
                  {/* Double the items for seamless loop */}
                  {[...row.items, ...row.items, ...row.items].map((item, j) => (
                    <div key={j} data-magnetic style={{
                      padding: "14px 28px", whiteSpace: "nowrap",
                      background: "rgba(255,255,255,0.015)",
                      border: "1px solid rgba(255,255,255,0.04)",
                      fontFamily: "var(--body)", fontSize: "13px", fontWeight: 500,
                      color: "rgba(255,255,255,0.4)",
                      transition: "all 0.4s ease",
                      flexShrink: 0,
                    }}
                      onMouseEnter={e => {
                        e.target.style.borderColor = `${row.accent}44`;
                        e.target.style.color = row.accent;
                        e.target.style.background = `${row.accent === "var(--saffron)" ? "rgba(218,165,32,0.06)" : row.accent === "var(--steel)" ? "rgba(107,140,174,0.06)" : "rgba(184,212,53,0.06)"}`;
                        e.target.style.boxShadow = `0 0 20px ${row.accent === "var(--saffron)" ? "rgba(218,165,32,0.08)" : row.accent === "var(--steel)" ? "rgba(107,140,174,0.08)" : "rgba(184,212,53,0.08)"}`;
                        // Pause the track
                        e.target.closest('.marquee-track').style.animationPlayState = 'paused';
                      }}
                      onMouseLeave={e => {
                        e.target.style.borderColor = "rgba(255,255,255,0.04)";
                        e.target.style.color = "rgba(255,255,255,0.4)";
                        e.target.style.background = "rgba(255,255,255,0.015)";
                        e.target.style.boxShadow = "none";
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
  const projects = [
    { title: "Analytics Dashboards", desc: "Interactive Tableau dashboards — marketing performance, segmentation, KPI tracking.", link: "https://public.tableau.com/app/profile/gagan.bhaskar.naik/vizzes", accent: "var(--steel)" },
    { title: "Financial Models", desc: "3-statement, DCF & LBO models for $10M+ strategic decisions.", link: "#", accent: "var(--saffron)" },
    { title: "Web & Brand Design", desc: "Full website builds, campaign assets, and brand identity systems.", link: "https://moody-head-244737.framer.app/", accent: "var(--lime)" },
  ];
  return (
    <section style={{ padding: "120px var(--px)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", flexWrap: "wrap", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "20px" }}>
              <span style={{ fontFamily: "var(--body)", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "var(--saffron)" }}>004</span>
              <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(32px, 4vw, 50px)", fontWeight: 600, color: "#fff", letterSpacing: "-1.5px", margin: 0 }}>Selected <span style={{ color: "var(--saffron)" }}>Work</span></h2>
            </div>
            <a href="/my-marketing-work" data-magnetic style={{ fontFamily: "var(--body)", fontSize: "12px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--saffron)", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px", transition: "gap 0.3s" }} onMouseEnter={e => e.currentTarget.style.gap = "14px"} onMouseLeave={e => e.currentTarget.style.gap = "6px"}>View all →</a>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "3px" }} className="work-grid">
          {projects.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
                <TiltCard glowColor={p.accent} style={{ padding: "36px 32px", height: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
                    <div style={{ width: "40px", height: "3px", background: p.accent }} />
                    <span style={{ fontFamily: "var(--body)", fontSize: "14px", color: p.accent }}>↗</span>
                  </div>
                  <div style={{ fontFamily: "var(--display)", fontSize: "22px", fontWeight: 600, color: "#fff", marginBottom: "10px" }}>{p.title}</div>
                  <div style={{ fontFamily: "var(--body)", fontSize: "14px", lineHeight: 1.7, color: "rgba(255,255,255,0.4)" }}>{p.desc}</div>
                </TiltCard>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  CONTACT
// ═══════════════════════════════════════════════════════════
function Contact() {
  return (
    <section id="contact" style={{ padding: "140px var(--px)", position: "relative", overflow: "hidden" }}>
      <KolamMotif size={550} animate style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }} />
      <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center", position: "relative" }}>
        <Reveal><div style={{ fontFamily: "var(--body)", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "var(--saffron)", marginBottom: "20px" }}>005 · Contact</div></Reveal>
        <Reveal delay={0.1}>
          <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 600, color: "#fff", lineHeight: 1.1, letterSpacing: "-2px", margin: "0 0 20px" }}>
            The next move<br />is <span style={{ WebkitTextStroke: "1.5px var(--saffron)", color: "transparent" }}>yours</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.2}><p style={{ fontFamily: "var(--body)", fontSize: "16px", lineHeight: 1.8, color: "rgba(255,255,255,0.4)", margin: "0 0 40px" }}>Whether you need a growth strategist, a data-minded marketer, or someone who sees the whole board — let's talk.</p></Reveal>
        <Reveal delay={0.3}>
          <a href="mailto:gagan.97@gmail.com" data-magnetic style={{ display: "inline-block", padding: "16px 44px", background: "var(--saffron)", color: "var(--bg)", textDecoration: "none", fontFamily: "var(--body)", fontSize: "13px", fontWeight: 700, letterSpacing: "1.5px", transition: "all 0.4s", boxShadow: "0 0 40px rgba(218,165,32,0.15)" }} onMouseEnter={e => { e.target.style.background = "#fff"; e.target.style.boxShadow = "0 0 60px rgba(255,255,255,0.1)"; }} onMouseLeave={e => { e.target.style.background = "var(--saffron)"; e.target.style.boxShadow = "0 0 40px rgba(218,165,32,0.15)"; }}>
            gagan.97@gmail.com
          </a>
          <div style={{ marginTop: "16px", fontFamily: "var(--body)", fontSize: "14px", color: "rgba(255,255,255,0.2)" }}>+1 (774) 290-3032</div>
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
        links={[{ href: "#about", label: "About" }, { href: "#experience", label: "Experience" }, { href: "#skills", label: "Skills" }, { href: "#contact", label: "Contact" }]}
        pages={[{ href: "/my-marketing-work", label: "Work" }, { href: "/my-marketing-blog", label: "Blog" }]}
      />
      <Hero />
      <StatsBar />
      <About />
      <Experience />
      <Skills />
      <WorkPreview />
      <Contact />
      <Footer links={[
        { label: "LinkedIn", href: "https://linkedin.com" },
        { label: "Medium", href: "https://medium.com/@ananidzezitze" },
        { label: "GitHub", href: "https://github.com/AnanidzeZitze?tab=repositories" },
        { label: "Tableau", href: "https://public.tableau.com/app/profile/gagan.bhaskar.naik/vizzes" },
        { label: "Email", href: "mailto:gagan.97@gmail.com" }
      ]} />
    </>
  );
}
