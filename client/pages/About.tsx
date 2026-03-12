import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  ArrowUpRight, CheckCircle2, Shield, Users, Leaf,
  Award, HardHat, Clock, Building2, Star,
} from "lucide-react";

/* ─── DATA ───────────────────────────────────────────────────────────── */

const STATS = [
  { value: "2000",  label: "Year Founded",          note: "Over two decades serving NY" },
  { value: "500+",  label: "Projects Completed",    note: "Residential & Commercial" },
  { value: "24+",   label: "Years of Experience",   note: "In the New York market" },
  { value: "98%",   label: "Client Satisfaction",   note: "Based on post-project surveys" },
];

const TIMELINE = [
  { year: "2000", title: "BCR Founded",             body: "BCR Constructions was established in Staten Island, NY, with a single mission: deliver honest, high-quality construction to New York homeowners and businesses." },
  { year: "2005", title: "Commercial Expansion",    body: "After five years of residential excellence, BCR expanded into commercial construction — taking on office fit-outs, retail renovations, and multi-unit buildings." },
  { year: "2010", title: "Insurance Claim Division", body: "BCR launched a dedicated insurance claim support team, helping property owners navigate restoration after fire, flood, and storm damage with zero added stress." },
  { year: "2016", title: "Second Office Opens",      body: "Growing demand across the metro area led to the opening of our Valley Stream location, extending BCR's reach across Long Island and the greater NY region." },
  { year: "2020", title: "500th Project Milestone",  body: "BCR celebrated its 500th completed project — a full custom home build in Brooklyn — a milestone that reflects two decades of consistency and trust." },
  { year: "2024", title: "12 Services, One Roof",    body: "Today BCR offers 12 specialized services with in-house crews, licensed across New York — continuing to grow while staying true to the values we were built on." },
];

const CAPABILITIES = [
  "General Contracting",
  "Pre-Construction Services",
  "Construction Consulting",
  "Program Management",
  "Construction Management",
  "Design-Build",
  "Concrete Construction",
  "Property Restoration",
  "Emergency Response",
  "Insurance Claim Support",
  "Interior & Exterior Renovation",
  "Custom Home Building",
];

const VALUES = [
  { Icon: Shield,  title: "Safety Above All",      body: "Every BCR job site operates under OSHA-certified protocols. Our crews are fully trained, insured, and committed to protecting everyone — workers, clients, and neighbors alike." },
  { Icon: Users,   title: "Community Rooted",       body: "BCR was built in New York, for New York. We hire locally, support neighborhood initiatives, and take pride in the lasting impact our work has on the communities we serve." },
  { Icon: Leaf,    title: "Built Responsibly",      body: "From low-VOC materials to energy-efficient systems, BCR integrates sustainable practices into every phase of construction. Building better means building responsibly." },
  { Icon: Award,   title: "Uncompromised Quality",  body: "We don't cut corners — ever. Every project gets the same attention to detail whether it's a bathroom remodel or a full commercial build." },
  { Icon: Clock,   title: "On Time, Every Time",    body: "We know your time is valuable. BCR works to defined timelines, communicates proactively, and holds itself accountable to every deadline we set." },
  { Icon: HardHat, title: "In-House Expertise",     body: "No subcontractor surprises. Our in-house crews handle every trade — which means tighter quality control, faster communication, and full accountability." },
];

const DIFFERENTIATORS = [
  "Single point of contact from quote to completion",
  "In-house crews — no subcontractor surprises",
  "Transparent, itemized written estimates",
  "24/7 emergency response for water & fire damage",
  "Fully licensed, bonded & insured in New York",
  "12 specialized services under one roof",
  "Serving both residential and commercial clients",
  "24+ years in the New York construction market",
];

/* ─── HELPERS ────────────────────────────────────────────────────────── */

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── COMPONENT ──────────────────────────────────────────────────────── */

export default function About() {
  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#fff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');

        :root {
          --gold:    #C9A84C;
          --gold-lt: #E3C26A;
          --gold-dim:rgba(201,168,76,0.12);
          --ink:     #0A0A0A;
          --ink-2:   #141414;
          --white:   #FFFFFF;
          --off:     #F8F5F0;
          --muted:   #666;
          --border:  rgba(0,0,0,0.08);
          --ease:    cubic-bezier(0.22,1,0.36,1);
        }

        .abt-eyebrow {
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--gold);
          display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
        }
        .abt-eyebrow::before { content:''; width:22px; height:1.5px; background:var(--gold); }

        .abt-h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(30px, 4vw, 48px); font-weight: 700;
          color: var(--ink); line-height: 1.1; margin-bottom: 18px;
        }
        .abt-h2-light { color: #fff; }

        .abt-lead {
          font-size: 16px; color: var(--muted); line-height: 1.8;
        }

                /* ── responsive grids ── */
        @media (max-width: 768px) {
          .responsive-2col { grid-template-columns: 1fr !important; gap: 40px !important; }
          .responsive-form-grid { grid-template-columns: 1fr !important; }
          .responsive-4col { grid-template-columns: repeat(2, 1fr) !important; }
        }

        /* ── stat card ── */
        .abt-stat {
          text-align: center; padding: 32px 20px;
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        .abt-stat:last-child { border-right: none; }
        .abt-stat-val {
          font-family: 'Playfair Display', serif;
          font-size: clamp(38px,4.5vw,56px); font-weight: 700; color: var(--gold); line-height: 1;
        }
        .abt-stat-label { font-size: 13px; font-weight: 600; color: #fff; margin-top: 6px; }
        .abt-stat-note  { font-size: 11px; color: rgba(255,255,255,0.35); margin-top: 3px; letter-spacing:0.06em; }

        /* ── timeline ── */
        .abt-tl-line {
          position: absolute; left: 20px; top: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent 0%, rgba(201,168,76,0.4) 10%, rgba(201,168,76,0.4) 90%, transparent 100%);
        }
        .abt-tl-dot {
          position: absolute; left: 12px; top: 22px;
          width: 17px; height: 17px; border-radius: 50%;
          background: var(--ink); border: 2px solid var(--gold);
          transition: background 0.25s;
          z-index: 1;
        }
        .abt-tl-item:hover .abt-tl-dot { background: var(--gold); }
        .abt-tl-year {
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.16em;
          text-transform: uppercase; color: var(--gold); margin-bottom: 5px;
        }
        .abt-tl-title {
          font-family: 'Playfair Display', serif;
          font-size: 18px; font-weight: 600; color: var(--ink);
          margin-bottom: 6px; line-height: 1.2;
        }
        .abt-tl-body { font-size: 14px; color: var(--muted); line-height: 1.75; }

        /* ── value card ── */
        .abt-val-card {
          padding: 30px 26px; border-radius: 16px;
          border: 1px solid var(--border); background: #fff;
          transition: box-shadow 0.3s, border-color 0.3s, transform 0.3s;
          position: relative; overflow: hidden;
        }
        .abt-val-card::before {
          content: ''; position: absolute; top: -50px; right: -50px;
          width: 130px; height: 130px;
          background: radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%);
          opacity: 0; transition: opacity 0.3s;
        }
        .abt-val-card:hover { box-shadow: 0 14px 44px rgba(0,0,0,0.08); border-color: var(--gold); transform: translateY(-3px); }
        .abt-val-card:hover::before { opacity: 1; }
        .abt-val-icon {
          width: 48px; height: 48px; border-radius: 12px;
          background: var(--gold-dim); border: 1px solid rgba(201,168,76,0.25);
          display: flex; align-items: center; justify-content: center;
          color: var(--gold); margin-bottom: 18px;
          transition: background 0.2s, color 0.2s;
        }
        .abt-val-card:hover .abt-val-icon { background: var(--gold); color: var(--ink); }

        /* ── capability pill ── */
        .abt-cap {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 9px 16px; border-radius: 100px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.7);
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          cursor: default;
        }
        .abt-cap:hover { background: var(--gold-dim); border-color: rgba(201,168,76,0.3); color: var(--gold-lt); }
        .abt-cap-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }
      `}</style>

      <Header />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", minHeight: 500, background: "var(--ink)", display: "flex", alignItems: "flex-end", paddingTop: "var(--header-h, 102px)", overflow: "hidden" }}>

        {/* Background image */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage:"/images/slide-6.webp",
          backgroundSize: "cover", backgroundPosition: "center 40%",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.4) 100%)" }} />

        {/* Decorative gold line */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, var(--gold) 30%, var(--gold) 70%, transparent)" }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "80px clamp(24px,6vw,80px) 72px", width: "100%" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{ width: 32, height: 1.5, background: "var(--gold)" }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>Est. 2000 — Staten Island, NY</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px,6vw,76px)", fontWeight: 700, color: "#fff", lineHeight: 1.05, marginBottom: 20, maxWidth: 700 }}>
              Two Decades of<br />
              <em style={{ fontStyle: "italic", color: "var(--gold-lt)" }}>Building New York</em>
            </h1>
            <p style={{ fontSize: "clamp(15px,1.8vw,18px)", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: 520, marginBottom: 36, fontWeight: 300 }}>
              BCR Constructions is a full-service general contractor headquartered in Staten Island, NY. We build, restore, and renovate — with in-house crews, transparent pricing, and a track record that speaks for itself.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#story" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 26px", borderRadius: 10, background: "var(--gold)", color: "var(--ink)", fontWeight: 700, fontSize: 14, textDecoration: "none", letterSpacing: "0.03em" }}>
                Our Story <ArrowUpRight size={14} />
              </a>
              <a href="/#contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 10, border: "1.5px solid rgba(255,255,255,0.25)", color: "#fff", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
                Get a Free Quote
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────── */}
      <section style={{ background: "var(--ink-2, #141414)", borderBottom: "1px solid rgba(201,168,76,0.12)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(24px,6vw,80px)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="abt-stat">
                <div className="abt-stat-val">{s.value}</div>
                <div className="abt-stat-label">{s.label}</div>
                <div className="abt-stat-note">{s.note}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── OUR STORY ────────────────────────────────────────────────── */}
      <section id="story" style={{ background: "#fff", padding: "96px clamp(24px,6vw,80px)" }}>
        <div className="responsive-2col" style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

          <Reveal>
            <div className="abt-eyebrow">Our Story</div>
            <h2 className="abt-h2">New York's Most Trusted Construction Partner</h2>
            <p className="abt-lead" style={{ marginBottom: 22 }}>
              BCR Constructions was founded in 2000 with a simple belief: New Yorkers deserve a construction partner they can actually trust. No inflated quotes, no subcontractor runaround, no excuses when things get complicated.
            </p>
            <p className="abt-lead" style={{ marginBottom: 22 }}>
              Starting with residential renovations in Staten Island, we built our reputation one project at a time — through referrals, repeat clients, and an obsession with doing the job right. Over two decades later, BCR has grown into a full-service general contractor serving the entire New York metro area, handling everything from kitchen renovations to large-scale commercial builds.
            </p>
            <p className="abt-lead" style={{ marginBottom: 36 }}>
              What hasn't changed is our approach: every project gets an in-house crew, a dedicated project manager, and the same uncompromising standards that earned us our first five-star review in 2001 and our 500th completed project in 2020.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {DIFFERENTIATORS.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, fontSize: 14, fontWeight: 500, color: "#333" }}>
                  <CheckCircle2 size={16} color="var(--gold)" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div style={{ position: "relative" }}>
              <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "4/5", boxShadow: "0 32px 80px rgba(0,0,0,0.14)" }}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F6ba6ca8cfa574d9d947931bf019df138?format=webp&width=800&height=1200"
                  alt="BCR Constructions team at work"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 55%)" }} />
              </div>
              {/* Floating badge */}
              <div style={{
                position: "absolute", bottom: 24, left: -24,
                background: "var(--ink)", border: "1px solid rgba(201,168,76,0.3)",
                borderRadius: 14, padding: "18px 22px",
                display: "flex", alignItems: "center", gap: 14,
                boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
              }}>
                <div style={{ width: 44, height: 44, borderRadius: 11, background: "var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Building2 size={22} color="var(--ink)" />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: "0.01em" }}>Headquartered in Staten Island</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>Serving all of New York since 2000</div>
                </div>
              </div>
              {/* Rating badge */}
              <div style={{
                position: "absolute", top: 24, right: -20,
                background: "var(--gold)", borderRadius: 12, padding: "12px 18px",
                display: "flex", alignItems: "center", gap: 8,
                boxShadow: "0 8px 28px rgba(201,168,76,0.35)",
              }}>
                <Star size={16} color="var(--ink)" fill="var(--ink)" />
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>5.0</div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(0,0,0,0.55)", letterSpacing: "0.06em" }}>CLIENT RATING</div>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────────── */}
      <section style={{ background: "var(--off, #F8F5F0)", padding: "96px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", maxWidth: 540, margin: "0 auto 72px" }}>
              <div className="abt-eyebrow" style={{ justifyContent: "center" }}>Our Journey</div>
              <h2 className="abt-h2" style={{ textAlign: "center" }}>24 Years in the Making</h2>
              <p className="abt-lead" style={{ textAlign: "center" }}>
                From a single crew in Staten Island to a full-service contractor serving all of New York — here's how BCR Constructions grew.
              </p>
            </div>
          </Reveal>

          <div className="responsive-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 72px" }}>
            {TIMELINE.map((item, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="abt-tl-item" style={{ position: "relative", paddingLeft: 52, paddingBottom: 36 }}>
                  {i < TIMELINE.length - 2 && <div className="abt-tl-line" />}
                  <div className="abt-tl-dot" />
                  <div className="abt-tl-year">{item.year}</div>
                  <div className="abt-tl-title">{item.title}</div>
                  <div className="abt-tl-body">{item.body}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE OFFER ────────────────────────────────────────────── */}
      <section style={{ background: "var(--ink)", padding: "96px clamp(24px,6vw,80px)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -120, right: -120, width: 500, height: 500, background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 56, flexWrap: "wrap", gap: 24 }}>
              <div>
                <div className="abt-eyebrow">Full Spectrum</div>
                <h2 className="abt-h2 abt-h2-light" style={{ marginBottom: 0 }}>What BCR Offers</h2>
              </div>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", maxWidth: 340, lineHeight: 1.7 }}>
                12 specialized services, all delivered by in-house crews with direct accountability to you.
              </p>
            </div>
          </Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {CAPABILITIES.map((cap, i) => (
              <Reveal key={i} delay={i * 40}>
                <div className="abt-cap">
                  <span className="abt-cap-dot" />
                  {cap}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "96px clamp(24px,6vw,80px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", maxWidth: 520, margin: "0 auto 64px" }}>
              <div className="abt-eyebrow" style={{ justifyContent: "center" }}>How We Work</div>
              <h2 className="abt-h2" style={{ textAlign: "center" }}>The Principles Behind Every Project</h2>
              <p className="abt-lead" style={{ textAlign: "center" }}>
                These aren't buzzwords on a wall — they're the operating principles our crews live by on every job site, every day.
              </p>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {VALUES.map(({ Icon, title, body }, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="abt-val-card">
                  <div className="abt-val-icon"><Icon size={20} strokeWidth={1.75} /></div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, color: "var(--ink)", marginBottom: 10 }}>{title}</h3>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.75 }}>{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────── */}
      <section style={{ position: "relative", padding: "96px clamp(24px,6vw,80px)", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F12c19691924f4e068ec92133f770efa4?format=webp&width=800&height=1200')",
          backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.78)" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 18 }}>
              BCR Constructions — Est. 2000
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,5vw,58px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 18 }}>
              Let's Build Something<br />
              <em style={{ fontStyle: "italic", color: "var(--gold-lt)" }}>That Lasts.</em>
            </h2>
            <div style={{ width: 56, height: 2, background: "linear-gradient(90deg, transparent, var(--gold), transparent)", margin: "0 auto 22px" }} />
            <p style={{ fontSize: "clamp(15px,1.8vw,18px)", color: "rgba(255,255,255,0.6)", fontWeight: 300, lineHeight: 1.8, marginBottom: 36 }}>
              Whether you're planning a renovation, recovering from damage, or building from the ground up — BCR brings 24+ years of expertise, in-house crews, and a commitment to doing the job right.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/#contact" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "13px 28px", borderRadius: 10, background: "var(--gold)", color: "var(--ink)", fontWeight: 700, fontSize: 14, textDecoration: "none", letterSpacing: "0.03em" }}>
                Get a Free Consultation <ArrowUpRight size={15} />
              </a>
              <Link to="/staff" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 26px", borderRadius: 10, border: "1.5px solid rgba(255,255,255,0.25)", color: "#fff", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
                Meet Our Team
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}