import { useState, useCallback } from "react";

import { useScroll } from "./hooks/index.js";
import { Preloader, MagneticCursor, GradientMesh, Nav, Footer, GlobalStyles, KolamMotif } from "./components/shared.jsx";
import "./styles/my-work.css";

// ═══ ASSETS (public/work) ═══
const w = (f) => `/work/${f}`;

const mosaic = [
  "ai-generated-ai-gen-1.jpg", "social-media-image-drnaik-beautyserums.jpg", "design-concepts-t-shirt-design-2-instire-clothing-1.jpg",
  "print-forum-poster-gkf-1.jpg", "ai-generated-ai-powered-posts-1.jpg", "social-media-image-ceramic-sink.jpg",
  "logo-design-petrizllc-logo-1.jpg", "ai-generated-ai-gen-2.jpg", "social-media-image-ppfluids-social-1.jpg",
  "design-concepts-t-shirt-design-2-instire-clothing-21.jpg", "ai-generated-ai-powered-posts-10.jpg", "print-gkf-forum-primary-invite-1.jpg",
  "ai-generated-ai-gen-3.jpg", "design-concepts-t-shirt-design-2-instire-clothing-22.jpg", "ai-generated-ai-powered-posts-2.jpg",
  "social-media-image-aesthetic-republic-day-flyer.jpg", "design-concepts-t-shirt-design-2-instire-clothing-28.jpg", "ai-generated-ai-gen-4.jpg",
];

const categories = [
  { id: "social", t: "Social media & ads", d: "Posts, reels and banners for small brands", bg: "#14202e", fan: ["social-media-image-ceramic-sink.jpg", "social-media-image-drnaik-beautyserums.jpg", "social-media-image-ppfluids-social-1.jpg"] },
  { id: "ai", t: "AI creative", d: "Posters and spec ads made with AI tools", bg: "#1d1729", fan: ["ai-generated-ai-gen-2.jpg", "ai-generated-ai-gen-1.jpg", "ai-generated-ai-gen-3.jpg"] },
  { id: "identity", t: "Brand identity", d: "Marks for Petriz, BloggEd, Instire, VesperVox", bg: "#132620", fan: ["logo-design-blogge-logo-blogged-logo.jpg", "logo-design-petrizllc-logo-1.jpg", "logo-design-vespervox-logo-1.jpg"], kind: "sq" },
  { id: "apparel", t: "Apparel graphics", d: "T-shirt concepts for Instire Clothing", bg: "#2a1c0c", fan: ["design-concepts-t-shirt-design-2-instire-clothing-21.jpg", "design-concepts-t-shirt-design-2-instire-clothing-1.jpg", "design-concepts-t-shirt-design-2-instire-clothing-22.jpg"] },
  { id: "print", t: "Print & editorial", d: "Forum posters, invites, letters, newsletters", bg: "#2a1219", fan: ["print-gkf-forum-primary-invite-1.jpg", "print-forum-poster-gkf-1.jpg", "print-petropath-newsletter-1.jpg"] },
  { id: "data", t: "Data visualization", d: "Marketing and sales dashboards in Tableau", bg: "#111014", fan: ["tableau-dashboard-1.jpg", "tableau-campaign-performance-dashboard.jpg", "tableau-customer-order-db.jpg"], kind: "wide" },
];

const social = [
  { video: "video-instire-new-drop.mp4", poster: "video-instire-new-drop-poster.jpg", t: "Instire — New Drop", s: "Reel" },
  { img: "social-media-image-drnaik-beautyserums.jpg", t: "Dr Naik — Beauty Serums", s: "Product launch post" },
  { video: "video-moksha-creations.mp4", poster: "video-moksha-creations-poster.jpg", t: "Moksha Creations", s: "Reel" },
  { img: "social-media-image-mokshacreations-epoxy-resin.jpg", t: "Moksha Creations — Epoxy Resin", s: "Story" },
  { img: "social-media-image-ceramic-sink.jpg", t: "Ceramic Sink — New Arrival", s: "Product post" },
  { video: "video-mokshacreations-countdown.mp4", poster: "video-mokshacreations-countdown-poster.jpg", t: "Flash Sale Countdown", s: "Animated post" },
  { img: "social-media-image-ppfluids-social-1.jpg", t: "PP Fluids — Solid Control", s: "B2B social post" },
  { img: "social-media-image-ppfluids-social-2.jpg", t: "PP Fluids — HDD Solutions", s: "B2B social post" },
  { video: "video-instire.mp4", poster: "video-instire-poster.jpg", t: "@instire", s: "Reel" },
  { img: "social-media-image-aesthetic-republic-day-flyer.jpg", t: "Republic Day", s: "Festive flyer" },
];

const banners = [
  ["social-media-image-ad-banners-awareness-banner.jpg", "Awareness"],
  ["social-media-image-ad-banners-reach-banner.jpg", "Reach"],
  ["social-media-image-ad-banners-product-focused-banner.jpg", "Product focus"],
  ["social-media-image-ad-banners-coversion-focus-banner.jpg", "Conversion"],
];

const aiPosters = [
  ["ai-generated-ai-gen-1.jpg", "Content Visual poster"], ["ai-generated-ai-gen-2.jpg", "Impact poster"], ["ai-generated-ai-gen-3.jpg", "Universe poster"],
  ["ai-generated-ai-gen-4.jpg", "Imagining poster"], ["ai-generated-ai-gen-5.jpg", "Rocket poster"], ["ai-generated-ai-gen-6.jpg", "Potential poster"],
];

const specAds = [
  ["ai-generated-ai-powered-posts-7.jpg", "Herbal liqueur spec ad", true],
  ["ai-generated-ai-powered-posts-2.jpg", "Sports car spec ad"],
  ["ai-generated-ai-powered-posts-6.jpg", "Burger spec ad"],
  ["ai-generated-ai-powered-posts-4.jpg", "Luxury car spec ad"],
  ["ai-generated-ai-powered-posts-1.jpg", "Supercar spec ad"],
  ["ai-generated-ai-powered-posts-10.jpg", "Sneaker spec ad"],
  ["ai-generated-ai-powered-posts-3.jpg", "Yellow supercar spec ad"],
  ["ai-generated-ai-powered-posts-12.jpg", "Foldable phone spec ad", true],
  ["ai-generated-ai-powered-posts-5.jpg", "Grand tourer spec ad"],
  ["ai-generated-ai-powered-posts-9.jpg", "Basketball sneaker spec ad"],
];

const logos = [
  ["logo-design-petrizllc-logo-1.jpg", "Petriz LLC", "Oilfield specialists · primary mark"],
  ["logo-design-petrizllc-logo-3.jpg", "Petriz LLC", "Mono variant"],
  ["logo-design-blogge-logo-blogged-logo.jpg", "BloggEd", "Blog wordmark"],
  ["logo-design-instireclothing-logo-1.jpg", "Instire Clothing", "Apparel brand mark"],
  ["logo-design-vespervox-logo-1.jpg", "VesperVox", "Neon monogram"],
  ["logo-design-vespervox-logo-2.jpg", "VesperVox", "Wordmark"],
];

const tees = [
  ["design-concepts-t-shirt-design-2-instire-clothing-1.jpg", "Savage tiger"], ["design-concepts-t-shirt-design-2-instire-clothing-10.jpg", "Work Hard Stay Humble"],
  ["design-concepts-t-shirt-design-2-instire-clothing-16.jpg", "Lost in the Woods"], ["design-concepts-t-shirt-design-2-instire-clothing-21.jpg", "I'm Not Old, I'm Classic"],
  ["design-concepts-t-shirt-design-2-instire-clothing-22.jpg", "Gym"], ["design-concepts-t-shirt-design-2-instire-clothing-28.jpg", "Floral heart"],
  ["design-concepts-t-shirt-design-2-instire-clothing-30.jpg", "She Believed"], ["design-concepts-t-shirt-design-2-instire-clothing-13.jpg", "Full of Rock"],
  ["design-concepts-t-shirt-design-instire-clothing-1.jpg", "Vibe With Music"], ["design-concepts-t-shirt-design-instire-clothing-12.jpg", "Drummer"],
  ["design-concepts-t-shirt-design-instire-clothing-14.jpg", "Summer Vibes"], ["design-concepts-t-shirt-design-instire-clothing-15.jpg", "Beast Mode"],
  ["design-concepts-t-shirt-design-instire-clothing-5.jpg", "Music Is Life"], ["design-concepts-t-shirt-design-instire-clothing-6.jpg", "Shred the Silence"],
];

const printCols = [
  { cls: "ps", items: [["print-forum-poster-gkf-1.jpg", "GKF forum poster"], ["print-gkf-forum-primary-invite-1.jpg", "GKF forum primary invite"], ["print-petropath-newsletter-1.jpg", "Petropath newsletter page 1"]] },
  { cls: "pf", offset: true, items: [["print-forum-poster-gkf-2.jpg", "GKF holiday poster"], ["print-thankyou-letters-design-gkf-1.jpg", "GKF thank-you letter"], ["print-petropath-newsletter-2.jpg", "Petropath newsletter page 2"]] },
  { cls: "ps", items: [["print-gkf-forum-secondary-invites-1.jpg", "GKF forum secondary invite"], ["print-gkf-forum-primary-invite-2.jpg", "GKF forum invite, page 2"], ["print-board-member-christmas-letter-1-1.jpg", "Board member Christmas letter"]] },
];

const dashboards = [
  ["tableau-campaign-performance-dashboard.jpg", "Digital Campaign Performance", "https://public.tableau.com/app/profile/gagan.bhaskar.naik/viz/DigitalCampaignPerformanceDashboard/CampaignPerformanceDashboard"],
  ["tableau-customer-order-db.jpg", "E-Commerce Orders & Product Sales", "https://public.tableau.com/app/profile/gagan.bhaskar.naik/viz/E-CommerceConsumerOrdersProductSalesReport/CostomerOrderDB"],
  ["tableau-dashboard-1.jpg", "Marketing Dashboard", "https://public.tableau.com/app/profile/gagan.bhaskar.naik/viz/MarketingDashboard-1_17495926496190/Dashboard1"],
];

const tools = ["Canva", "Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Adobe Premiere Pro", "Adobe After Effects", "Adobe Lightroom", "Adobe Express", "Tableau", "AI image tools"];

function Head({ id, title, sub, children }) {
  return (
    <div className="mw-head">
      <h2 id={id} className="mw-h2 a fu">{title}</h2>
      {children || <p className="mw-sub a fi">{sub}</p>}
    </div>
  );
}

// ═══ MAIN ═══
export default function MyWork() {
  const [loaded, setLoaded] = useState(false);
  const onDone = useCallback(() => setLoaded(true), []);
  const scrollY = useScroll();

  return (
    <>
      <GlobalStyles />

      {!loaded && <Preloader onComplete={onDone} />}
      {loaded && <MagneticCursor />}
      <GradientMesh />
      <Nav
        links={[{ href: "/", label: "Home" }, { href: "/my-marketing-work", label: "Work", active: true }, { href: "https://gbnmarketing.blogspot.com/", label: "Blog" }]}
      />
      <div className="mw-bar" aria-hidden="true" />

      {/* HERO */}
      <section style={{ padding: "160px var(--px) 100px", position: "relative", overflow: "hidden" }}>
        <KolamMotif size={400} style={{ position: "absolute", top: "-60px", right: "-60px", transform: `translateY(${scrollY * 0.12}px)` }} />
        <div style={{ position: "relative", maxWidth: "760px" }}>
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all 0.8s 0.2s", fontFamily: "var(--body)", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "var(--saffron)", marginBottom: "16px" }}>Portfolio</div>
          <h1 style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: "clamp(44px, 6vw, 76px)", lineHeight: 1.05, letterSpacing: "-2px", color: "#fff", margin: "0 0 16px" }}>
            {"My ".split("").map((c, i) => <span key={i} style={{ display: "inline-block", opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(80px) rotate(5deg)", transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.4 + i * 0.04}s`, filter: loaded ? "none" : "blur(3px)" }}>{c === " " ? " " : c}</span>)}
            {"Work".split("").map((c, i) => <span key={i} style={{ display: "inline-block", opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(80px) rotate(-5deg)", transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.55 + i * 0.04}s`, filter: loaded ? "none" : "blur(3px)", WebkitTextStroke: "1.5px var(--saffron)", color: "transparent" }}>{c}</span>)}
            <span style={{ color: "var(--saffron)", opacity: loaded ? 1 : 0, transition: "opacity 0.5s 0.8s" }}>.</span>
          </h1>
          <p style={{ fontFamily: "var(--body)", fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.75)", opacity: loaded ? 1 : 0, transition: "all 0.8s 0.9s" }}>
            Design that makes ideas easy to feel and data easy to read — social campaigns, AI creative, brand identity, apparel, print and dashboards.
          </p>
        </div>
      </section>

      <main className="mw">
        {/* 19 · Selected Work */}
        <section className="mw-pin" aria-label="Selected work">
          <div className="mw-pin-in">
            <div className="mw-pin-bg" aria-hidden="true">{mosaic.map((f, i) => <img key={i} src={w(f)} alt="" loading="lazy" />)}</div>
            <p className="mw-eyebrow">Canva · Adobe Suite · AI · Tableau</p>
            <h2 className="mw-pin-h">Selected <em>Work</em></h2>
            <p className="mw-sub" style={{ color: "rgba(255,255,255,0.8)" }}>Social &amp; ads · AI creative · Brand identity · Apparel · Print · Data</p>
          </div>
        </section>

        {/* 21 · What I make */}
        <section className="mw-sec" aria-labelledby="mw-make">
          <div className="mw-wrap">
            <Head id="mw-make" title={<>What I <em>make</em></>} sub="Tap a card to jump to that work" />
            <div className="mw-stack-list">
              {categories.map((c, i) => (
                <a key={c.id} href={`#${c.id}`} className="mw-stack" data-magnetic style={{ top: `${96 + i * 24}px`, background: c.bg }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <span className="mw-stack-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="mw-stack-t">{c.t}</span>
                    <span className="mw-stack-d">{c.d}</span>
                  </span>
                  <span className={`mw-fan ${c.kind || ""}`} aria-hidden="true">
                    {c.fan.map(f => <img key={f} src={w(f)} alt="" loading="lazy" />)}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 20 · Social */}
        <section id="social" className="mw-hg" aria-labelledby="mw-social">
          <div className="mw-hg-in">
            <div className="mw-wrap" style={{ width: "100%" }}>
              <div className="mw-head" style={{ marginBottom: 0 }}>
                <h2 id="mw-social" className="mw-h2">Social media <em>&amp;</em> ads</h2>
                <p className="mw-sub">Posts and reels for small brands</p>
              </div>
            </div>
            <div className="mw-hg-track">
              {social.map(s => (
                <figure key={s.t} className="mw-hg-card">
                  {s.video
                    ? <video className="mw-hg-media" src={w(s.video)} poster={w(s.poster)} autoPlay muted loop playsInline aria-label={s.t} />
                    : <img className="mw-hg-media" src={w(s.img)} alt={s.t} loading="lazy" />}
                  <figcaption style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span className="mw-cap-t">{s.t}</span><span className="mw-cap-s">{s.s}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Display ads */}
        <section className="mw-sec" aria-labelledby="mw-banners" style={{ paddingTop: "72px" }}>
          <div className="mw-wrap">
            <Head id="mw-banners" title="Display ad set" sub="One product, four campaign objectives — 728 × 90" />
            <div className="mw-banners stagger">
              {banners.map(([f, l]) => (
                <figure key={f} className="mw-fig a fu">
                  <img className="mw-pic" src={w(f)} alt={`${l} banner`} loading="lazy" style={{ borderRadius: "4px" }} />
                  <figcaption className="mw-cap-s">{l}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* 13 + 6 · AI creative */}
        <section id="ai" className="mw-sec" aria-labelledby="mw-ai">
          <div className="mw-wrap">
            <Head id="mw-ai" title={<>AI <em>creative</em></>} sub="Poster series made with AI image tools, art-directed and typeset by me" />
            <div className="mw-g3 stagger">
              {aiPosters.map(([f, a]) => <img key={f} className="mw-pic a bl" src={w(f)} alt={a} loading="lazy" />)}
            </div>
            <div className="mw-head" style={{ marginTop: "96px" }}>
              <h3 className="mw-h2 a fu" style={{ fontSize: "clamp(28px, 3vw, 36px)" }}>Spec ad concepts</h3>
              <p className="mw-sub a fi">Self-initiated concepts for brands I admire — not commissioned</p>
            </div>
            <div className="mw-bento stagger">
              {specAds.map(([f, a, big]) => <img key={f} className={`a bl${big ? " big" : ""}`} src={w(f)} alt={a} loading="lazy" />)}
            </div>
          </div>
        </section>

        {/* 13 + 1 · Brand identity */}
        <section id="identity" className="mw-sec" aria-labelledby="mw-id">
          <div className="mw-wrap">
            <Head id="mw-id" title={<>Brand <em>identity</em></>} sub="Marks for an oilfield firm, a blog, a clothing label and a podcast" />
            <div className="mw-g3 stagger">
              {logos.map(([f, t, s]) => (
                <figure key={f} className="mw-fig a fu">
                  <div className="mw-logo-tile"><img src={w(f)} alt={`${t} — ${s}`} loading="lazy" /></div>
                  <figcaption style={{ display: "flex", flexDirection: "column", gap: "2px" }}><span className="mw-cap-t">{t}</span><span className="mw-cap-s">{s}</span></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* 12 · Apparel */}
        <section id="apparel" className="mw-sec" aria-labelledby="mw-app">
          <div className="mw-wrap">
            <Head id="mw-app" title={<>Apparel <em>graphics</em></>} sub="T-shirt concepts for Instire Clothing" />
            <div className="mw-g4 stagger">
              {tees.map(([f, a]) => <img key={f} className="mw-pic a sk" src={w(f)} alt={`${a} tee graphic`} loading="lazy" />)}
            </div>
          </div>
        </section>

        {/* 14 · Print */}
        <section id="print" className="mw-sec" aria-labelledby="mw-print" style={{ overflow: "hidden" }}>
          <div className="mw-wrap">
            <Head id="mw-print" title={<>Print <em>&amp;</em> editorial</>} sub="GKF forum campaign, letters and the Petropath newsletter" />
            <div className="mw-cols">
              {printCols.map((col, i) => (
                <div key={i} className={`mw-col a ${col.cls}`} style={col.offset ? { marginTop: "120px" } : undefined}>
                  {col.items.map(([f, a]) => <img key={f} className="mw-pic" src={w(f)} alt={a} loading="lazy" />)}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11 · Data */}
        <section id="data" className="mw-sec" aria-labelledby="mw-data">
          <div className="mw-wrap">
            <Head id="mw-data" title={<>Data <em>visualization</em></>}>
              <a className="mw-link a fi" data-magnetic href="https://public.tableau.com/app/profile/gagan.bhaskar.naik/vizzes" target="_blank" rel="noreferrer">All dashboards on Tableau Public →</a>
            </Head>
            <div className="mw-g3 stagger">
              {dashboards.map(([f, t, href]) => (
                <article key={f} className="a fl" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <img className="mw-pic" src={w(f)} alt={`${t} dashboard`} loading="lazy" style={{ border: "1px solid rgba(255,255,255,0.12)" }} />
                  <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 600 }}>{t}</h3>
                  <p className="mw-cap-s" style={{ margin: 0 }}>Tableau dashboard</p>
                  <a className="mw-link" data-magnetic href={href} target="_blank" rel="noreferrer">View interactive dashboard →</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 18 · Toolkit */}
        <section className="mw-sec" aria-labelledby="mw-about" style={{ paddingTop: "130px", paddingBottom: "130px" }}>
          <div className="mw-wrap mw-split">
            <h2 id="mw-about" className="mw-h2 a fu">Tool<em>kit</em></h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              <p className="mw-fill a">I turn stories, brands and numbers into visuals people remember.</p>
              <div className="mw-tools a fu">
                {tools.map(t => <span key={t} className="mw-tool">{t}</span>)}
              </div>
            </div>
          </div>
        </section>

        {/* 22 · Contact */}
        <section className="mw-contact" aria-labelledby="mw-contact">
          <div className="mw-wrap mw-contact-in">
            <h2 id="mw-contact" className="a fu" style={{ margin: 0, fontFamily: "var(--display)", fontWeight: 400, fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 1.05, letterSpacing: "-1.5px", maxWidth: "860px" }}>Have a project in mind? Let's talk.</h2>
            <div className="a fi" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <a className="mw-btn" data-magnetic href="mailto:gagan.97@gmail.com">Get in touch</a>
              <a className="mw-btn" data-magnetic href="https://www.linkedin.com/in/gbn97/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="mw-btn" data-magnetic href="https://public.tableau.com/app/profile/gagan.bhaskar.naik/vizzes" target="_blank" rel="noreferrer">Tableau Public</a>
            </div>
          </div>
        </section>
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
