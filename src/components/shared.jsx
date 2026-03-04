import { useState, useEffect, useRef } from "react";
import { useInView, useMouse, useScroll } from "../hooks";

export function GlobalStyles() {
    return (
        <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500;600;700&display=swap');
      :root { --display: 'Instrument Serif', Georgia, serif; --body: 'Outfit', sans-serif; --bg: #080604; --saffron: #daa520; --steel: #6b8cae; --lime: #b8d435; --px: 6%; }
      *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
      html { scroll-behavior: smooth; cursor: none; }
      body { background: var(--bg); color: #fff; overflow-x: hidden; -webkit-font-smoothing: antialiased; cursor: none; }
      a, button { cursor: none; }
      body::after { content: ''; position: fixed; inset: 0; opacity: 0.018; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); pointer-events: none; z-index: 10000; }

      ::selection { background: var(--saffron); color: var(--bg); }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: var(--bg); }
      ::-webkit-scrollbar-thumb { background: rgba(218,165,32,0.3); border-radius: 2px; }

      @keyframes floatOrb1 { 0%,100% { transform: translate(0,0); } 33% { transform: translate(30px,-40px); } 66% { transform: translate(-20px,30px); } }
      @keyframes floatOrb2 { 0%,100% { transform: translate(0,0); } 33% { transform: translate(-40px,20px); } 66% { transform: translate(20px,-30px); } }
      @keyframes floatOrb3 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(25px,25px); } }
      .grad-orb-1 { animation: floatOrb1 20s ease-in-out infinite; }
      .grad-orb-2 { animation: floatOrb2 25s ease-in-out infinite; }
      .grad-orb-3 { animation: floatOrb3 18s ease-in-out infinite; }

      @keyframes scrollDotAnim { 0% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(12px); opacity: 0.3; } 100% { transform: translateY(0); opacity: 1; } }
      .scroll-dot { animation: scrollDotAnim 1.8s infinite; }

      .logo-diamond { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
      a:hover .logo-diamond { transform: rotate(90deg); }

      .btn-primary:hover { background: #fff !important; box-shadow: 0 0 60px rgba(255,255,255,0.1) !important; }

      @keyframes rippleExpand { 0% { width: 0; height: 0; opacity: 1; } 100% { width: 400px; height: 400px; opacity: 0; } }
      @keyframes ripple { 0% { width: 0; height: 0; opacity: 1; } 100% { width: 400px; height: 400px; opacity: 0; } }

      @keyframes detailFadeIn { 0% { opacity: 0; transform: translateY(12px); } 100% { opacity: 1; transform: translateY(0); } }
      @keyframes detailItemIn { 0% { opacity: 0; transform: translateX(-12px); } 100% { opacity: 1; transform: translateX(0); } }

      @keyframes marqueeLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
      @keyframes marqueeRight { 0% { transform: translateX(-33.333%); } 100% { transform: translateX(0); } }
      .marquee-left { animation: marqueeLeft linear infinite; }
      .marquee-right { animation: marqueeRight linear infinite; }

      @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

      @media (max-width: 900px) {
        html, body, a, button { cursor: auto !important; }
        .cursor-outer, .cursor-outer + div, .cursor-ring, .cursor-ring + div { display: none !important; }
        .desk-nav { display: none !important; }
        .mob-btn { display: flex !important; }
        .about-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        .skills-grid, .work-grid { grid-template-columns: 1fr !important; }
        .edu-grid { grid-template-columns: 1fr !important; }
        .hero-photo { display: none !important; }
        .exp-layout { grid-template-columns: 1fr !important; }
        .cta-grid { grid-template-columns: 1fr !important; }
      }
      @media (min-width: 901px) { .mob-btn { display: none !important; } }
    `}</style>
    );
}


export const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
export const lerp = (a, b, t) => a + (b - a) * t;

export function Preloader({ onComplete, title = "Gagan", dotColor = "var(--saffron)" }) {
    const [progress, setProgress] = useState(0);
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        let p = 0;
        const interval = setInterval(() => {
            p += Math.random() * 8 + 2;
            if (p >= 100) {
                p = 100;
                clearInterval(interval);
                setTimeout(() => setExiting(true), 300);
                setTimeout(onComplete, 1000);
            }
            setProgress(Math.min(p, 100));
        }, 60);
        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div style={{
            position: "fixed", inset: 0, zIndex: 99999, background: "var(--bg)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            opacity: exiting ? 0 : 1, transform: exiting ? "scale(1.05)" : "none",
            transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
        }}>
            <svg width="120" height="120" viewBox="0 0 200 200" fill="none" style={{ marginBottom: "32px" }}>
                <circle cx="100" cy="100" r="80" stroke="var(--saffron)" strokeWidth="0.8" strokeDasharray="502" strokeDashoffset={502 - (502 * progress / 100)} style={{ transition: "stroke-dashoffset 0.3s" }} />
                <circle cx="100" cy="100" r="55" stroke="var(--steel)" strokeWidth="0.8" strokeDasharray="345" strokeDashoffset={345 - (345 * progress / 100)} style={{ transition: "stroke-dashoffset 0.3s ease 0.1s" }} />
                <circle cx="100" cy="100" r="30" stroke="var(--lime)" strokeWidth="0.8" strokeDasharray="188" strokeDashoffset={188 - (188 * progress / 100)} style={{ transition: "stroke-dashoffset 0.3s ease 0.2s" }} />
                {[0, 60, 120].map((a, i) => (
                    <line key={a} x1="100" y1="20" x2="100" y2="180" transform={`rotate(${a} 100 100)`} stroke="var(--saffron)" strokeWidth="0.5" strokeDasharray="160" strokeDashoffset={160 - (160 * progress / 100)} style={{ transition: `stroke-dashoffset 0.3s ease ${0.1 * i}s` }} />
                ))}
                <polygon points="100,30 115,70 155,70 125,95 135,135 100,110 65,135 75,95 45,70 85,70" stroke="var(--saffron)" strokeWidth="0.6" strokeDasharray="400" strokeDashoffset={400 - (400 * progress / 100)} style={{ transition: "stroke-dashoffset 0.4s ease 0.15s" }} />
            </svg>
            <div style={{ fontFamily: "var(--display)", fontSize: "24px", color: "#fff", marginBottom: "24px", letterSpacing: "-0.5px" }}>
                {title}<span style={{ color: dotColor }}>.</span>
            </div>
            <div style={{ width: "180px", height: "1px", background: "rgba(255,255,255,0.15)" }}>
                <div style={{ width: `${progress}%`, height: "100%", background: "var(--saffron)", transition: "width 0.2s" }} />
            </div>
            <div style={{ fontFamily: "var(--body)", fontSize: "10px", color: "rgba(255,255,255,0.4)", marginTop: "12px", letterSpacing: "3px" }}>
                {Math.round(progress)}%
            </div>
        </div>
    );
}

export function MagneticCursor() {
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const [hovering, setHovering] = useState(false);
    const [clicking, setClicking] = useState(false);

    useEffect(() => {
        const move = (e) => setPos({ x: e.clientX, y: e.clientY });
        const over = (e) => { if (e.target.closest("[data-magnetic]") || e.target.closest("a") || e.target.closest("button")) setHovering(true); };
        const out = () => setHovering(false);
        const down = () => setClicking(true);
        const up = () => setClicking(false);

        window.addEventListener("mousemove", move);
        window.addEventListener("mouseover", over);
        window.addEventListener("mouseout", out);
        window.addEventListener("mousedown", down);
        window.addEventListener("mouseup", up);

        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseover", over);
            window.removeEventListener("mouseout", out);
            window.removeEventListener("mousedown", down);
            window.removeEventListener("mouseup", up);
        };
    }, []);

    return (
        <>
            <div className="cursor-outer" style={{
                position: "fixed", zIndex: 99998, pointerEvents: "none",
                width: hovering ? "34px" : "28px", height: hovering ? "34px" : "28px",
                border: `1.5px solid ${hovering ? "var(--saffron)" : "rgba(255,255,255,0.65)"}`,
                left: pos.x, top: pos.y,
                clipPath: hovering ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "polygon(25% 0, 75% 0, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0 75%, 0 25%)",
                WebkitClipPath: hovering ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "polygon(25% 0, 75% 0, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0 75%, 0 25%)",
                transform: `translate(-50%, -50%) rotate(45deg) scale(${clicking ? 0.8 : 1})`,
                transition: "width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s cubic-bezier(0.16,1,0.3,1), clip-path 0.3s cubic-bezier(0.16,1,0.3,1), -webkit-clip-path 0.3s cubic-bezier(0.16,1,0.3,1), transform 0.3s cubic-bezier(0.16,1,0.3,1)",
                mixBlendMode: "difference",
            }} />
            <div style={{
                position: "fixed", zIndex: 99998, pointerEvents: "none",
                width: hovering ? "16px" : "6px", height: hovering ? "16px" : "6px",
                background: "var(--saffron)",
                left: pos.x, top: pos.y,
                transform: "translate(-50%, -50%) rotate(45deg)",
                transition: "width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1)",
            }} />
        </>
    );
}

export function GradientMesh() {
    return (
        <div style={{ position: "fixed", inset: 0, zIndex: -1, overflow: "hidden" }}>
            <div className="grad-orb grad-orb-1" style={{
                position: "absolute", width: "60vw", height: "60vw", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(218,165,32,0.04) 0%, transparent 70%)",
                top: "-20%", right: "-15%", filter: "blur(80px)",
            }} />
            <div className="grad-orb grad-orb-2" style={{
                position: "absolute", width: "40vw", height: "40vw", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(107,140,174,0.04) 0%, transparent 70%)",
                bottom: "10%", left: "-10%", filter: "blur(60px)",
            }} />
            <div className="grad-orb grad-orb-3" style={{
                position: "absolute", width: "30vw", height: "30vw", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(184,212,53,0.03) 0%, transparent 70%)",
                top: "40%", left: "30%", filter: "blur(70px)",
            }} />
        </div>
    );
}

export function Reveal({ children, delay = 0, direction = "up", parallax = 0, style = {} }) {
    const [ref, inView] = useInView(0.08);
    const scrollY = useScroll();
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        if (parallax && ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const center = rect.top + rect.height / 2;
            const vCenter = window.innerHeight / 2;
            setOffset((center - vCenter) * parallax * 0.1);
        }
    }, [scrollY, parallax]);

    const t = { up: "translateY(80px)", down: "translateY(-80px)", left: "translateX(-80px)", right: "translateX(80px)", scale: "scale(0.92)" };
    return (
        <div ref={ref} style={{
            opacity: inView ? 1 : 0,
            transform: inView ? (parallax ? `translateY(${offset}px)` : "none") : t[direction] || t.up,
            transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform ${parallax ? "0.1s linear" : `1s cubic-bezier(0.16,1,0.3,1) ${delay}s`}`,
            willChange: "opacity, transform",
            ...style,
        }}>{children}</div>
    );
}

export function TiltCard({ children, style = {}, glowColor = "var(--saffron)" }) {
    const cardRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [hovering, setHovering] = useState(false);
    const [ripple, setRipple] = useState(null);

    const handleMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
        setTilt({ x, y });
    };

    const handleClick = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top, id: Date.now() });
        setTimeout(() => setRipple(null), 600);
    };

    return (
        <div ref={cardRef} data-magnetic
            onMouseMove={handleMove}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => { setHovering(false); setTilt({ x: 0, y: 0 }); }}
            onClick={handleClick}
            style={{
                perspective: "800px", cursor: "pointer", position: "relative", overflow: "hidden",
                transform: `perspective(800px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) ${hovering ? "translateY(-6px)" : ""}`,
                transition: hovering ? "transform 0.1s ease" : "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                boxShadow: hovering ? `0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px ${glowColor}55, inset 0 0 30px ${glowColor}15` : "0 0 0 1px rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.03)",
                ...style,
            }}>
            {hovering && (
                <div style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    background: `radial-gradient(circle at ${(tilt.x / 12 + 0.5) * 100}% ${(-tilt.y / 12 + 0.5) * 100}%, ${glowColor}0a 0%, transparent 60%)`,
                }} />
            )}
            {ripple && (
                <div key={ripple.id} style={{
                    position: "absolute", left: ripple.x, top: ripple.y,
                    width: "0px", height: "0px", borderRadius: "50%",
                    background: `${glowColor}15`,
                    animation: "rippleExpand 0.6s ease-out forwards",
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none",
                }} />
            )}
            {children}
        </div>
    );
}

export function GlassPanel({ children, style = {} }) {
    return (
        <div style={{
            background: "rgba(12,10,8,0.6)",
            backdropFilter: "blur(20px) saturate(150%)",
            border: `1px solid rgba(255,255,255,0.15)`,
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            ...style,
        }}>{children}</div>
    );
}

export function KolamMotif({ size = 200, color = "var(--saffron)", opacity = 0.12, style = {}, animate = false }) {
    const [ref, inView] = useInView(0.3);
    const dashProgress = animate && inView ? 0 : 1;
    return (
        <svg ref={ref} width={size} height={size} viewBox="0 0 200 200" style={{ ...style, opacity, pointerEvents: "none" }} fill="none" stroke={color} strokeWidth="0.8">
            <circle cx="100" cy="100" r="90" strokeDasharray="565" strokeDashoffset={565 * dashProgress} style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.16,1,0.3,1)" }} />
            <circle cx="100" cy="100" r="70" strokeDasharray="440" strokeDashoffset={440 * dashProgress} style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.16,1,0.3,1) 0.2s" }} />
            <circle cx="100" cy="100" r="50" strokeDasharray="314" strokeDashoffset={314 * dashProgress} style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.16,1,0.3,1) 0.4s" }} />
            <circle cx="100" cy="100" r="30" strokeDasharray="188" strokeDashoffset={188 * dashProgress} style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.16,1,0.3,1) 0.6s" }} />
            {[0, 30, 60, 90, 120, 150].map((a, i) => <line key={a} x1="100" y1="10" x2="100" y2="190" transform={`rotate(${a} 100 100)`} strokeDasharray="180" strokeDashoffset={180 * dashProgress} style={{ transition: `stroke-dashoffset 1.5s ease ${0.1 * i}s` }} />)}
            <polygon points="100,20 120,60 160,60 130,85 140,125 100,100 60,125 70,85 40,60 80,60" strokeWidth="0.6" strokeDasharray="400" strokeDashoffset={400 * dashProgress} style={{ transition: "stroke-dashoffset 2.5s ease 0.3s" }} />
        </svg>
    );
}

export function Skeleton({ height = "300px" }) {
    return <div style={{ width: "100%", height, background: "linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.05) 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />;
}

export function Nav({ links = [], pages = [] }) {
    const [scrolled, setScrolled] = useState(false);
    const [mob, setMob] = useState(false);
    const scrollY = useScroll();
    useEffect(() => { setScrolled(scrollY > 60); }, [scrollY]);

    return (
        <nav data-magnetic style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
            padding: scrolled ? "10px var(--px)" : "18px var(--px)",
            background: scrolled ? "rgba(8,6,4,0.75)" : "transparent",
            backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
            borderBottom: scrolled ? "1px solid rgba(255,255,255,0.04)" : "none",
            transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
            <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
                <svg width="28" height="28" viewBox="0 0 28 28">
                    <polygon points="14,2 26,14 14,26 2,14" fill="none" stroke="var(--saffron)" strokeWidth="1.5" className="logo-diamond" />
                    <polygon points="14,7 21,14 14,21 7,14" fill="var(--saffron)" opacity="0.3" />
                </svg>
                <span style={{ fontFamily: "var(--display)", fontSize: "18px", fontWeight: 600, color: "#fff", letterSpacing: "-0.3px" }}>Gagan Bhaskar <span style={{ WebkitTextStroke: "1px var(--saffron)", color: "transparent" }}>Naik</span><span style={{ color: "var(--saffron)" }}>.</span></span>
            </a>
            <div className="desk-nav" style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                {links.map(l => (
                    <a key={l.label} href={l.href} data-magnetic
                        style={{
                            padding: l.active ? "7px 18px" : "6px 14px",
                            border: l.active ? "1px solid var(--saffron)" : "none",
                            fontFamily: "var(--body)", fontSize: "11px", fontWeight: 600,
                            letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none",
                            color: l.active ? "var(--saffron)" : "rgba(255,255,255,0.65)",
                            transition: "all 0.3s",
                            boxShadow: l.active ? "0 0 15px rgba(218,165,32,0.1)" : "none"
                        }}
                        onMouseEnter={e => { if (!l.active) e.target.style.color = "var(--saffron)"; }}
                        onMouseLeave={e => { if (!l.active) e.target.style.color = "rgba(255,255,255,0.65)"; }}>
                        {l.label}
                    </a>
                ))}
                {pages && pages.length > 0 && <span style={{ width: "1px", height: "16px", background: "rgba(255,255,255,0.2)", margin: "0 8px" }} />}
                {pages && pages.map(l => (
                    <a key={l.label} href={l.href} data-magnetic
                        style={{
                            padding: l.active ? "7px 18px" : "7px 18px",
                            border: l.active ? "1px solid var(--saffron)" : "1px solid rgba(255,255,255,0.2)",
                            fontFamily: "var(--body)", fontSize: "11px", fontWeight: 600,
                            letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none",
                            color: l.active ? "var(--saffron)" : "rgba(255,255,255,0.7)",
                            transition: "all 0.3s",
                            boxShadow: l.active ? "0 0 20px rgba(218,165,32,0.1)" : "none"
                        }}
                        onMouseEnter={e => {
                            if (!l.active) {
                                e.target.style.borderColor = "var(--saffron)";
                                e.target.style.color = "var(--saffron)";
                                e.target.style.boxShadow = "0 0 20px rgba(218,165,32,0.1)";
                            }
                        }}
                        onMouseLeave={e => {
                            if (!l.active) {
                                e.target.style.borderColor = "rgba(255,255,255,0.2)";
                                e.target.style.color = "rgba(255,255,255,0.7)";
                                e.target.style.boxShadow = "none";
                            }
                        }}>
                        {l.label}
                    </a>
                ))}
            </div>
            <button className="mob-btn" onClick={() => setMob(!mob)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: "8px", flexDirection: "column", gap: "5px", zIndex: 1001 }}>
                {[0, 1, 2].map(i => <span key={i} style={{ display: "block", width: "20px", height: "1.5px", background: "#fff", transition: "all 0.3s", transform: mob ? (i === 0 ? "rotate(45deg) translateY(6.5px)" : i === 2 ? "rotate(-45deg) translateY(-6.5px)" : "scaleX(0)") : "none" }} />)}
            </button>
            {mob && <div style={{ position: "fixed", inset: 0, background: "rgba(8,6,4,0.97)", backdropFilter: "blur(30px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "24px", zIndex: 999 }}>
                {[...links, ...pages].map(l => <a key={l.label} href={l.href} onClick={() => setMob(false)} style={{ fontFamily: "var(--display)", fontSize: "28px", fontWeight: 600, color: l.active ? "var(--saffron)" : "#fff", textDecoration: "none" }}>{l.label}</a>)}
            </div>}
        </nav>
    );
}

export function Footer({ links }) {
    return (
        <footer style={{ padding: "28px var(--px)", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <span style={{ fontFamily: "var(--body)", fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>© 2026 Gagan Bhaskar Naik</span>
            <div style={{ display: "flex", gap: "20px" }}>
                {links.map((l, i) => (
                    <a key={i} href={l.href} target={l.href.startsWith("/") || l.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer"
                        style={{ fontFamily: "var(--body)", fontSize: "11px", color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.3s" }}
                        onMouseEnter={e => e.target.style.color = "var(--saffron)"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}>{l.label}</a>
                ))}
            </div>
        </footer>
    );
}
