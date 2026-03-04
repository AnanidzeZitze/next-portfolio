import { useState, useEffect, useRef, useCallback } from "react";

import { useScroll, useInView } from "./hooks/index.js";
import { Preloader, MagneticCursor, GradientMesh, Reveal, Nav, Footer, GlobalStyles, KolamMotif } from "./components/shared.jsx";

// ═══ WORK DATA ═══
const workItems = [
  { id: 2, src: "https://www.canva.com/design/DAHCAqMbZH4/ASpcxFtxqxEV3-Jz4b7h6w/view?embed", pt: "125%", cat: "brand", label: "Brand & Product Ad Posters" },
  { id: 1, src: "https://www.canva.com/design/DAGLEsPv4ao/F_EulhoPHsraplU9TC8FtA/view?embed", pt: "128.5714%", cat: "brand", label: "T-Shirt Design" },
  { id: 3, src: "https://www.canva.com/design/DAG5rS9JOEc/jJYYa0bVd9q8veEdt4TNLg/view?embed", pt: "56.25%", cat: "deck", label: "Youtube Banner Design" },
  { id: 4, src: "https://www.canva.com/design/DAG7tCx9plQ/Bv7Kf1TlUJIt78FyGvizEg/watch?embed", pt: "50%", cat: "print", label: "Christmas Letters", isVideo: true },
  { id: 5, src: "https://www.canva.com/design/DAGyU3P5J_Y/UuCAEVLag78R9YRwAgZ8Zg/view?embed", pt: "141.4286%", cat: "print", label: "Thank You Letters" },
  { id: 6, src: "https://www.canva.com/design/DAG0Qw4K2do/dSOZrmMNV2PqsghR83hQXQ/view?embed", pt: "141.4358%", cat: "print", label: "Newsletter & Marketing Flyer" },
  { id: 7, src: "https://www.canva.com/design/DAFZH7_qfpg/6woZaYRzBsp03QqtuLaflw/view?embed", pt: "100%", cat: "social", label: "Social Campaign" },
  { id: 8, src: "https://www.canva.com/design/DAG5MO6tClY/_5gbpEhg8KHwmp4cd_xpfA/view?embed", pt: "100%", cat: "social", label: "Brand Design" },
  { id: 9, src: "https://www.canva.com/design/DAG4bnevDMU/MZBB5xmIaMafGXcRbyPfAg/view?embed", pt: "141.4286%", cat: "print", label: "Thank You Letter" },
  { id: 10, src: "https://www.canva.com/design/DAG-KUs2YxI/Og5LB8SA4VUPnMRgYuFFag/view?embed", pt: "140.9524%", cat: "print", label: "Forum Invite" },
  { id: 11, src: "https://www.canva.com/design/DAGqF1Fb9Ts/1kmsTMnlZS9hUtgKiWgDPw/watch?embed", pt: "100%", cat: "video", label: "Promo Video", isVideo: true },
  { id: 12, src: "https://www.canva.com/design/DAG-PMZnCuE/6G9WQmTXYnQTYI2rUCT_Zw/view?embed", pt: "140%", cat: "campaign", label: "Forum Invites" },
  { id: 13, src: "https://www.canva.com/design/DAG0Q3cGQ4k/HRU2RsddslTSAB872PIjuA/view?embed", pt: "12.3626%", cat: "campaign", label: "Ad Banner Set" },
  { id: 14, src: "https://www.canva.com/design/DAG6Y11qJtE/-WIOJ8XRVWCfeHXg-O2PrQ/view?embed", pt: "133.3333%", cat: "brand", label: "Christmas Letter & Forum Invite" },
  { id: 15, src: "https://www.canva.com/design/DAG0U77Mu9w/QFf4PukDdkPyfJvq4qGXeQ/view?embed", pt: "125%", cat: "brand", label: "Product Ad Posters" },
];

const cats = [
  { key: "all", label: "All Work" }, { key: "brand", label: "Brand" }, { key: "print", label: "Print" },
  { key: "social", label: "Social" }, { key: "campaign", label: "Campaign" },
  { key: "deck", label: "Deck" }, { key: "video", label: "Video" },
];

// ═══ ROTATING ALBUM ═══
function RotatingAlbum({ items }) {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(0);
  const [anim, setAnim] = useState(false);
  const [loaded, setLoaded] = useState({});

  useEffect(() => { setCurrent(0); setLoaded({}); }, [items.length, items[0]?.id]);

  const total = items.length;
  if (!total) return <div style={{ padding: "80px", textAlign: "center", fontFamily: "var(--body)", color: "rgba(255,255,255,0.6)" }}>No items in this category</div>;

  const go = (idx) => {
    if (anim || idx === current) return;
    setDir(idx > current ? 1 : -1);
    setAnim(true);
    setTimeout(() => { setCurrent(idx); setAnim(false); }, 400);
  };
  const prev = () => go((current - 1 + total) % total);
  const next = () => go((current + 1) % total);
  const pIdx = (current - 1 + total) % total;
  const nIdx = (current + 1) % total;
  const active = items[current];

  // Side card component
  const SideCard = ({ idx, side }) => (
    <div data-magnetic onClick={side === "left" ? prev : next} style={{
      position: "absolute", [side]: "1%", width: "240px", height: "340px",
      transform: `rotateY(${side === "left" ? 28 : -28}deg) translateZ(-120px) scale(0.8)`,
      opacity: anim ? 0.1 : 0.3, filter: "blur(1px) brightness(0.5)",
      transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
      cursor: "pointer", zIndex: 1, overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.15)", background: "var(--bg)",
    }}>
      <iframe src={items[idx].src} style={{ width: "100%", height: "100%", border: "none", pointerEvents: "none" }} loading="lazy" />
    </div>
  );

  return (
    <div style={{ position: "relative" }}>
      {/* Stage */}
      <div style={{ perspective: "1200px", height: "520px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        {total > 1 && <SideCard idx={pIdx} side="left" />}

        {/* CENTER */}
        <div key={active.id} style={{
          width: "min(540px, 82vw)", height: "480px", position: "relative", zIndex: 10,
          transform: anim ? `translateX(${dir * -80}px) scale(0.92) rotateY(${dir * -10}deg)` : "none",
          opacity: anim ? 0.2 : 1,
          transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(218,165,32,0.12), 0 0 60px rgba(218,165,32,0.05)",
          overflow: "hidden", background: "var(--bg)",
        }}>
          {!loaded[active.id] && (
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.02) 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontFamily: "var(--body)", fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "3px", textTransform: "uppercase" }}>Loading</div>
            </div>
          )}
          <iframe src={active.src} onLoad={() => setLoaded(p => ({ ...p, [active.id]: true }))} style={{ width: "100%", height: "100%", border: "none", opacity: loaded[active.id] ? 1 : 0, transition: "opacity 0.4s" }} loading="lazy" allowFullScreen allow="fullscreen" />
          {active.isVideo && <div style={{ position: "absolute", top: "12px", right: "12px", padding: "5px 12px", background: "rgba(8,6,4,0.8)", backdropFilter: "blur(10px)", border: "1px solid rgba(184,212,53,0.25)", fontFamily: "var(--body)", fontSize: "9px", fontWeight: 700, color: "var(--lime)", letterSpacing: "2px", textTransform: "uppercase" }}>▶ Video</div>}
        </div>

        {total > 1 && <SideCard idx={nIdx} side="right" />}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "28px", marginTop: "32px" }}>
        <button data-magnetic onClick={prev} style={{ width: "44px", height: "44px", border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "rgba(255,255,255,0.75)", fontFamily: "var(--body)", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--saffron)"; e.currentTarget.style.color = "var(--saffron)"; e.currentTarget.style.boxShadow = "0 0 15px rgba(218,165,32,0.1)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; e.currentTarget.style.boxShadow = "none"; }}>←</button>

        <div style={{ textAlign: "center", minWidth: "200px" }}>
          <div style={{ fontFamily: "var(--display)", fontSize: "18px", fontWeight: 600, color: "#fff", marginBottom: "4px" }}>{active.label}</div>
          <div style={{ fontFamily: "var(--body)", fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "2px" }}>{active.isVideo ? "▶ VIDEO" : active.cat.toUpperCase()} · {current + 1} / {total}</div>
        </div>

        <button data-magnetic onClick={next} style={{ width: "44px", height: "44px", border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "rgba(255,255,255,0.75)", fontFamily: "var(--body)", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--saffron)"; e.currentTarget.style.color = "var(--saffron)"; e.currentTarget.style.boxShadow = "0 0 15px rgba(218,165,32,0.1)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; e.currentTarget.style.boxShadow = "none"; }}>→</button>
      </div>

      {/* Dots */}
      {total > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "20px", flexWrap: "wrap" }}>
          {items.map((_, i) => (
            <button key={i} onClick={() => go(i)} data-magnetic style={{
              width: current === i ? "24px" : "6px", height: "6px", borderRadius: "3px", border: "none",
              background: current === i ? "var(--saffron)" : "rgba(255,255,255,0.25)",
              boxShadow: current === i ? "0 0 10px rgba(218,165,32,0.2)" : "none",
              cursor: "pointer", transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)", padding: 0,
            }} />
          ))}
        </div>
      )}
    </div>
  );
}

// ═══ MAIN ═══
export default function MyWork() {
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState("all");
  const onDone = useCallback(() => setLoaded(true), []);
  const scrollY = useScroll();
  const filtered = filter === "all" ? workItems : workItems.filter(w => w.cat === filter);

  return (
    <>
      <GlobalStyles />

      {!loaded && <Preloader onComplete={onDone} />}
      {loaded && <MagneticCursor />}
      <GradientMesh />
      <Nav
        links={[{ href: "/", label: "Home" }, { href: "/my-marketing-work", label: "Work", active: true }, { href: "/my-marketing-blog", label: "Blog" }]}
      />

      {/* HERO */}
      <section style={{ padding: "160px var(--px) 60px", position: "relative", overflow: "hidden" }}>
        <KolamMotif size={400} style={{ position: "absolute", top: "-60px", right: "-60px", transform: `translateY(${scrollY * 0.12}px)` }} />
        <div style={{ position: "relative", maxWidth: "700px" }}>
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all 0.8s 0.2s", fontFamily: "var(--body)", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "var(--saffron)", marginBottom: "16px" }}>Portfolio</div>
          <h1 style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(44px, 6vw, 76px)", lineHeight: 1.05, letterSpacing: "-2px", color: "#fff", margin: "0 0 16px" }}>
            {"My ".split("").map((c, i) => <span key={i} style={{ display: "inline-block", opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(80px) rotate(5deg)", transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.4 + i * 0.04}s`, filter: loaded ? "none" : "blur(3px)" }}>{c === " " ? "\u00A0" : c}</span>)}
            {"Work".split("").map((c, i) => <span key={i} style={{ display: "inline-block", opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(80px) rotate(-5deg)", transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.55 + i * 0.04}s`, filter: loaded ? "none" : "blur(3px)", WebkitTextStroke: "1.5px var(--saffron)", color: "transparent" }}>{c}</span>)}
            <span style={{ color: "var(--saffron)", opacity: loaded ? 1 : 0, transition: "opacity 0.5s 0.8s" }}>.</span>
          </h1>
          <p style={{ fontFamily: "var(--body)", fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.75)", opacity: loaded ? 1 : 0, transition: "all 0.8s 0.9s" }}>
            Campaign assets, brand systems, presentations, social media, and video — the visual output of a strategist who thinks in systems and executes with precision.
          </p>
        </div>
      </section>

      {/* CATEGORY TABS */}
      <section style={{ padding: "0 var(--px) 48px" }}>
        <Reveal>
          <div style={{ display: "flex", gap: "3px", flexWrap: "wrap", justifyContent: "center" }}>
            {cats.map(c => {
              const count = c.key === "all" ? workItems.length : workItems.filter(w => w.cat === c.key).length;
              const isActive = filter === c.key;
              return (
                <button key={c.key} data-magnetic onClick={() => setFilter(c.key)} style={{
                  padding: "12px 24px", border: "none", cursor: "pointer",
                  fontFamily: "var(--body)", fontSize: "12px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase",
                  background: isActive ? "var(--saffron)" : "rgba(255,255,255,0.05)",
                  color: isActive ? "var(--bg)" : "rgba(255,255,255,0.7)",
                  boxShadow: isActive ? "0 0 25px rgba(218,165,32,0.15), 0 0 0 1px var(--saffron)" : "0 0 0 1px rgba(255,255,255,0.15)",
                  transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                  transform: isActive ? "translateY(-2px)" : "none",
                }} onMouseEnter={e => { if (!isActive) { e.currentTarget.style.boxShadow = "0 0 0 1px rgba(218,165,32,0.3)"; e.currentTarget.style.color = "var(--saffron)"; } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.boxShadow = "0 0 0 1px rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; } }}>
                  {c.label}<span style={{ marginLeft: "6px", opacity: 0.5, fontSize: "10px" }}>{count}</span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* ROTATING ALBUM */}
      <section style={{ padding: "0 var(--px) 120px" }}>
        <Reveal>
          <RotatingAlbum items={filtered} />
        </Reveal>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 var(--px) 120px", position: "relative" }}>
        <KolamMotif size={350} color="var(--steel)" animate style={{ position: "absolute", right: "-100px", bottom: "0px", opacity: 0.08 }} />
        <Reveal>
          <div style={{ padding: "56px", textAlign: "center", maxWidth: "900px", margin: "0 auto", background: "rgba(12,10,8,0.5)", backdropFilter: "blur(16px) saturate(140%)", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 10px 40px rgba(0,0,0,0.2)", position: "relative", zIndex: 2 }}>
            <div style={{ fontFamily: "var(--display)", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 600, color: "#fff", margin: "0 0 16px" }}>Interested in working together<span style={{ color: "var(--saffron)" }}>?</span></div>
            <a href="mailto:gagan.97@gmail.com" data-magnetic style={{ display: "inline-block", padding: "14px 36px", background: "var(--saffron)", color: "var(--bg)", textDecoration: "none", fontFamily: "var(--body)", fontSize: "12px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", transition: "all 0.4s", boxShadow: "0 0 30px rgba(218,165,32,0.12)" }}
              onMouseEnter={e => { e.target.style.background = "#fff"; e.target.style.boxShadow = "0 0 50px rgba(255,255,255,0.08)"; }}
              onMouseLeave={e => { e.target.style.background = "var(--saffron)"; e.target.style.boxShadow = "0 0 30px rgba(218,165,32,0.12)"; }}>Get In Touch</a>
          </div>
        </Reveal>
      </section>

      <Footer links={[
        { label: "LinkedIn", href: "https://www.linkedin.com/in/gbn97/" },
        { label: "Medium", href: "https://medium.com/@ananidzezitze" },
        { label: "GitHub", href: "https://github.com/AnanidzeZitze?tab=repositories" },
        { label: "Tableau", href: "https://public.tableau.com/app/profile/gagan.bhaskar.naik/vizzes" }
      ]} />
    </>
  );
}
