import { useState, useEffect, useRef, useCallback } from "react";

/*
 * ══════════════════════════════════════════════════════════════════
 *  THE APEX — Blog Page
 *  Full effects: Preloader, Magnetic Cursor, Parallax, Kinetic Type,
 *  3D Tilt, Glassmorphism, Gradient Mesh, Ripples, Self-Drawing SVG
 * ══════════════════════════════════════════════════════════════════
 */

import { useScroll, useInView } from "./hooks/index.js";
import { Preloader, MagneticCursor, GradientMesh, Reveal, TiltCard, KolamMotif, Skeleton, Nav, Footer, GlobalStyles } from "./components/shared.jsx";

// ═══ MAIN ═══
export default function MyBlog() {
  const [loaded, setLoaded] = useState(false);
  const [feedLoaded, setFeedLoaded] = useState(false);
  const scrollY = useScroll();
  const onDone = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    const existingScript = document.getElementById("rssapp-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://widget.rss.app/v1/wall.js";
      script.id = "rssapp-script";
      script.async = true;
      script.onload = () => {
        // Give the widget a moment to render before fading out skeleton
        setTimeout(() => setFeedLoaded(true), 1200);
      };
      document.body.appendChild(script);
    } else {
      setTimeout(() => setFeedLoaded(true), 800);
    }

    return () => {
      // We don't necessarily want to remove the script as subsequent mounts might need it
    };
  }, []);

  const parallaxSlow = scrollY * 0.12;

  const topics = [
    { label: "Marketing Analytics", accent: "var(--saffron)" },
    { label: "Growth Strategy", accent: "var(--saffron)" },
    { label: "AI Marketing", accent: "var(--lime)" },
    { label: "Digital Strategy", accent: "var(--saffron)" },
    { label: "Data Storytelling", accent: "var(--saffron)" },
    { label: "SEO & SEM", accent: "var(--lime)" },
    { label: "Brand Building", accent: "var(--saffron)" },
  ];

  return (
    <>
      <GlobalStyles />

      {!loaded && <Preloader onComplete={onDone} />}
      {loaded && <MagneticCursor />}
      <GradientMesh />
      <Nav
        links={[{ href: "/", label: "Home" }, { href: "/my-marketing-work", label: "Work" }, { href: "/my-marketing-blog", label: "Blog", active: true }]}
      />

      {/* ═══ HERO ═══ */}
      <section style={{ padding: "160px var(--px) 60px", position: "relative", overflow: "hidden" }}>
        {/* Parallax Kolam */}
        <KolamMotif size={400} style={{ position: "absolute", bottom: "-100px", right: "-60px", transform: `translateY(${-parallaxSlow}px)` }} />
        <KolamMotif size={250} color="var(--saffron)" style={{ position: "absolute", top: "10%", left: "60%", transform: `translateY(${parallaxSlow * 0.7}px)` }} />

        {/* Vertical accent line — parallax */}
        <div style={{ position: "absolute", left: "var(--px)", top: "10%", bottom: "10%", width: "3px", background: "linear-gradient(180deg, transparent, var(--saffron), var(--lime), transparent)", opacity: 0.1, transform: `translateY(${parallaxSlow * 0.5}px)` }} />

        <div style={{ position: "relative", maxWidth: "700px" }}>
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all 0.8s 0.2s", fontFamily: "var(--body)", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "var(--saffron)", marginBottom: "16px" }}>
            Thoughts & Analysis
          </div>

          {/* KINETIC TYPOGRAPHY */}
          <h1 style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(44px, 6vw, 76px)", lineHeight: 1.05, letterSpacing: "-2px", color: "#fff", margin: "0 0 16px" }}>
            {"My ".split("").map((c, i) => (
              <span key={i} style={{
                display: "inline-block",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "none" : `translateY(100px) rotate(${i % 2 ? 6 : -6}deg)`,
                transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.4 + i * 0.04}s`,
                filter: loaded ? "none" : "blur(3px)",
              }}>{c === " " ? "\u00A0" : c}</span>
            ))}
            {"Blog".split("").map((c, i) => (
              <span key={i} style={{
                display: "inline-block",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "none" : `translateY(100px) rotate(${i % 2 ? -6 : 6}deg)`,
                transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.55 + i * 0.04}s`,
                filter: loaded ? "none" : "blur(3px)",
                WebkitTextStroke: "1.5px var(--saffron)", color: "transparent",
              }}>{c}</span>
            ))}
            <span style={{ color: "var(--saffron)", opacity: loaded ? 1 : 0, transition: "opacity 0.5s 0.8s" }}>.</span>
          </h1>

          <p style={{
            fontFamily: "var(--body)", fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.75)",
            maxWidth: "520px",
            opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)",
            transition: "all 0.8s 0.9s",
          }}>
            Writing on marketing analytics, growth strategy, AI-driven marketing, and the craft of turning data into narrative. Published on Medium.
          </p>
        </div>
      </section>

      {/* ═══ TOPIC TAGS — with glow hover ═══ */}
      <section style={{ padding: "0 var(--px) 48px" }}>
        <Reveal delay={0.1}>
          <div style={{ display: "flex", gap: "3px", flexWrap: "wrap" }}>
            {topics.map((t, i) => (
              <span key={i} data-magnetic style={{
                fontFamily: "var(--body)", fontSize: "11px", fontWeight: 600,
                letterSpacing: "1px", textTransform: "uppercase",
                padding: "8px 16px",
                border: `1px solid rgba(255,255,255,0.15)`,
                color: "rgba(255,255,255,0.6)",
                transition: "all 0.4s ease",
                cursor: "default",
              }}
                onMouseEnter={e => {
                  e.target.style.borderColor = t.accent;
                  e.target.style.color = t.accent;
                  e.target.style.boxShadow = `0 0 20px ${t.accent === "var(--saffron)" ? "rgba(218,165,32,0.1)" : t.accent === "var(--steel)" ? "rgba(218,165,32,0.1)" : "rgba(184,212,53,0.1)"}`;
                }}
                onMouseLeave={e => {
                  e.target.style.borderColor = "rgba(255,255,255,0.15)";
                  e.target.style.color = "rgba(255,255,255,0.6)";
                  e.target.style.boxShadow = "none";
                }}>
                {t.label}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ═══ DIVIDER — self-drawing ═══ */}
      <Reveal>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "0 var(--px)", marginBottom: "48px" }}>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(218,165,32,0.3), transparent)" }} />
          <svg width="12" height="12" viewBox="0 0 12 12"><polygon points="6,0 12,6 6,12 0,6" fill="var(--saffron)" opacity="0.5" /></svg>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(218,165,32,0.3), transparent)" }} />
        </div>
      </Reveal>

      {/* ═══ RSS FEED — Glassmorphism container with skeleton ═══ */}
      <section style={{ padding: "0 var(--px) 100px" }}>
        <Reveal>
          <div style={{
            maxWidth: "1000px", margin: "0 auto", overflow: "hidden",
            background: "rgba(12,10,8,0.5)",
            backdropFilter: "blur(16px) saturate(140%)",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
          }}>
            {/* Header — glassmorphism bar */}
            <div style={{
              padding: "16px 24px",
              borderBottom: "1px solid rgba(255,255,255,0.15)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              background: "rgba(255,255,255,0.05)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <polygon points="10,1 19,10 10,19 1,10" fill="none" stroke="var(--saffron)" strokeWidth="1" />
                  <polygon points="10,5 15,10 10,15 5,10" fill="var(--saffron)" opacity="0.3" />
                </svg>
                <div>
                  <div style={{ fontFamily: "var(--display)", fontSize: "14px", fontWeight: 600, color: "#fff" }}>Latest Articles</div>
                  <div style={{ fontFamily: "var(--body)", fontSize: "9px", color: "rgba(255,255,255,0.5)", letterSpacing: "2px", textTransform: "uppercase" }}>From Medium</div>
                </div>
              </div>
              <div style={{
                padding: "4px 12px",
                border: "1px solid rgba(218,165,32,0.4)",
                fontFamily: "var(--body)", fontSize: "9px", fontWeight: 700,
                color: "var(--saffron)", letterSpacing: "2px", textTransform: "uppercase",
                boxShadow: "0 0 10px rgba(218,165,32,0.06)",
              }}>Live Feed</div>
            </div>

            {/* Skeleton while loading */}
            {!feedLoaded && (
              <div style={{ padding: "20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} style={{ padding: "0" }}>
                      <Skeleton height="180px" />
                      <div style={{ padding: "16px 0" }}>
                        <Skeleton height="14px" />
                        <div style={{ height: "8px" }} />
                        <Skeleton height="10px" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RSS Widget (Dynamic Height) */}
            <div style={{ width: "100%", background: "var(--bg)", display: feedLoaded ? "block" : "none" }}>
              <rssapp-wall id="Am3kjPWYpKWqVRPv"></rssapp-wall>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══ DUAL CTA — 3D Tilt Cards ═══ */}
      <section style={{ padding: "0 var(--px) 120px", position: "relative" }}>
        <KolamMotif size={600} color="var(--steel)" animate style={{ position: "absolute", left: "50%", bottom: "0px", transform: "translateX(-50%)", opacity: 0.05, zIndex: 0 }} />
        <Reveal>
          <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px", position: "relative", zIndex: 2 }} className="cta-grid">
            <TiltCard glowColor="var(--saffron)" style={{ padding: "44px 36px" }}>
              <div style={{ width: "32px", height: "3px", background: "var(--saffron)", marginBottom: "24px" }} />
              <div style={{ fontFamily: "var(--display)", fontSize: "22px", fontWeight: 600, color: "#fff", margin: "0 0 10px" }}>Have a topic in mind?</div>
              <p style={{ fontFamily: "var(--body)", fontSize: "14px", lineHeight: 1.7, color: "rgba(255,255,255,0.7)", margin: "0 0 24px" }}>
                I'm open to guest posts, collaborations, and content partnerships on marketing, data, and growth.
              </p>
              <a href="mailto:gagan.97@gmail.com" data-magnetic style={{
                fontFamily: "var(--body)", fontSize: "12px", fontWeight: 600,
                letterSpacing: "1.5px", textTransform: "uppercase",
                color: "var(--saffron)", textDecoration: "none",
                display: "flex", alignItems: "center", gap: "6px", transition: "gap 0.3s",
              }} onMouseEnter={e => e.currentTarget.style.gap = "14px"} onMouseLeave={e => e.currentTarget.style.gap = "6px"}>
                Reach out →
              </a>
            </TiltCard>

            <TiltCard glowColor="var(--saffron)" style={{ padding: "44px 36px" }}>
              <div style={{ width: "32px", height: "3px", background: "var(--saffron)", marginBottom: "24px" }} />
              <div style={{ fontFamily: "var(--display)", fontSize: "22px", fontWeight: 600, color: "#fff", margin: "0 0 10px" }}>See my design work</div>
              <p style={{ fontFamily: "var(--body)", fontSize: "14px", lineHeight: 1.7, color: "rgba(255,255,255,0.7)", margin: "0 0 24px" }}>
                Campaign assets, brand systems, presentations, video — the visual arsenal of a strategic mind.
              </p>
              <a href="/my-marketing-work" data-magnetic style={{
                fontFamily: "var(--body)", fontSize: "12px", fontWeight: 600,
                letterSpacing: "1.5px", textTransform: "uppercase",
                color: "var(--saffron)", textDecoration: "none",
                display: "flex", alignItems: "center", gap: "6px", transition: "gap 0.3s",
              }} onMouseEnter={e => e.currentTarget.style.gap = "14px"} onMouseLeave={e => e.currentTarget.style.gap = "6px"}>
                View portfolio →
              </a>
            </TiltCard>
          </div>
        </Reveal>
      </section>

      {/* ═══ FOOTER ═══ */}
      <Footer links={[
        { label: "LinkedIn", href: "https://www.linkedin.com/in/gbn97/" },
        { label: "Medium", href: "https://medium.com/@ananidzezitze" },
        { label: "GitHub", href: "https://github.com/AnanidzeZitze?tab=repositories" },
        { label: "Tableau", href: "https://public.tableau.com/app/profile/gagan.bhaskar.naik/vizzes" }
      ]} />
    </>
  );
}
