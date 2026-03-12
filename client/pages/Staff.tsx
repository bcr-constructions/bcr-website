import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight, Phone, Mail, Shield, HardHat, Wrench,
  Users, Award, Clock, CheckCircle2, ChevronDown,
  Building2, Star, Zap, Target, TrendingUp, BookOpen,
} from "lucide-react";

/* ─── DATA ──────────────────────────────────────────────────────────── */

const ROLES = [
  {
    Icon: Building2,
    title: "Executive Leadership",
    tag: "Vision & Strategy",
    description: "Our leadership team brings decades of hands-on construction experience to every decision. They set the standards, own the outcomes, and stay personally involved in every major project — from contract signing to final walkthrough.",
    qualities: ["24+ years average industry experience", "Direct client accessibility", "New York market specialists", "Licensed general contractors"],
  },
  {
    Icon: Target,
    title: "Project Management",
    tag: "Planning & Delivery",
    description: "Every BCR project is assigned a dedicated project manager who serves as your single point of contact. They coordinate every trade, manage timelines, track budgets, and communicate proactively — so you're never left wondering.",
    qualities: ["PMP-certified managers", "Real-time budget tracking", "Daily progress reporting", "Zero-surprise delivery model"],
  },
  {
    Icon: Wrench,
    title: "Field Crews & Trades",
    tag: "Craftsmanship",
    description: "Our in-house field crews are the backbone of BCR. Unlike competitors who rely on rotating subcontractors, our tradespeople are BCR employees — vetted, trained to our standards, and accountable to us directly.",
    qualities: ["100% in-house workforce", "OSHA-certified on every site", "Specialists in 12 trade disciplines", "Continuous skills training program"],
  },
  {
    Icon: BookOpen,
    title: "Design & Planning",
    tag: "Concept to Blueprint",
    description: "Our design and planning professionals translate your vision into precise, code-compliant blueprints. They collaborate directly with field crews from day one, eliminating the costly gap between what was drawn and what gets built.",
    qualities: ["3D rendering and visualization", "Energy-efficient design focus", "NYC building code expertise", "Design-build integration"],
  },
  {
    Icon: Shield,
    title: "Safety & Compliance",
    tag: "Protection First",
    description: "BCR's dedicated safety team enforces rigorous site protocols on every job — residential or commercial. They conduct daily walk-throughs, manage permit coordination, and ensure every crew member goes home safe.",
    qualities: ["OSHA 30-hour certified", "Daily site safety audits", "Full permit management", "Workers' compensation covered"],
  },
  {
    Icon: Users,
    title: "Client Relations",
    tag: "Your Experience",
    description: "Our client relations team ensures communication never falls through the cracks. From your first call to post-project follow-up, they're your advocates inside BCR — making sure expectations are set, met, and exceeded.",
    qualities: ["Dedicated to each client", "Bilingual support available", "Post-project warranty support", "24/7 emergency line access"],
  },
];

const STATS = [
  { value: "24+", label: "Years of Combined Leadership" },
  { value: "100%", label: "In-House Workforce" },
  { value: "OSHA", label: "Certified on Every Site" },
  { value: "0", label: "Subcontractor Surprises" },
];

const VALUES = [
  { Icon: Award,      title: "Accountability",   desc: "Every crew member, manager, and executive is accountable by name to every project they touch. We don't pass blame — we fix problems." },
  { Icon: TrendingUp, title: "Continuous Growth", desc: "BCR invests in ongoing training, certifications, and process improvement. Our 2024 team is better than our 2023 team — and we'll be better again next year." },
  { Icon: Zap,        title: "Urgency",           desc: "We hire people who treat your project like it's their own. Urgency isn't a stress culture — it's a deep respect for your time and investment." },
  { Icon: Star,       title: "Pride in Craft",    desc: "We hire tradespeople who take personal pride in what they build. If it's not something we'd put our own name on, it doesn't leave our hands." },
];

const FAQS = [
  {
    q: "Does BCR use subcontractors?",
    a: "No. All work is performed by BCR's own in-house employees. This means consistent quality, direct accountability, and no middle-man surprises. The crew you meet on day one is the crew that finishes your project.",
  },
  {
    q: "How experienced is the BCR team?",
    a: "Our leadership averages 24+ years in the New York construction industry. Field crew members go through a rigorous vetting process and ongoing OSHA certification. We don't hire for capacity — we hire for quality.",
  },
  {
    q: "Will I have a dedicated point of contact?",
    a: "Yes — every BCR project is assigned a dedicated project manager who serves as your single contact from kickoff to handover. You'll always know who to call, and they'll always pick up.",
  },
  {
    q: "Is your team licensed and insured?",
    a: "Absolutely. BCR Constructions is fully licensed in New York State, carries comprehensive general liability insurance, and every crew member is covered under workers' compensation. You're protected at every stage.",
  },
  {
    q: "Does the team handle emergency calls?",
    a: "Yes. Our emergency response team is available 24/7 for water damage, flooding, fire response, and other urgent situations. When you call our emergency line, a real BCR team member answers.",
  },
  {
    q: "What training does your crew undergo?",
    a: "All field staff complete OSHA safety certification, trade-specific training, and ongoing professional development. Leadership regularly attends industry certifications and code update courses to ensure BCR stays ahead of New York standards.",
  },
];

/* ─── HOOK ──────────────────────────────────────────────────────────── */

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
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─── COMPONENT ─────────────────────────────────────────────────────── */

export default function Staff() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#fff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');
        :root {
          --gold: #C9A84C; --gold-lt: #E3C26A; --gold-dim: rgba(201,168,76,0.12);
          --ink: #0A0A0A; --ink-2: #141414; --ink-3: #1C1C1C;
          --off: #F8F5F0; --muted: #666; --border: rgba(0,0,0,0.08);
          --ease: cubic-bezier(0.22,1,0.36,1);
        }

        .st-eyebrow {
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--gold); display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
        }
        .st-eyebrow::before { content:''; width: 24px; height: 1.5px; background: var(--gold); }

        .st-sec-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(30px, 3.5vw, 48px); font-weight: 700;
          color: var(--ink); line-height: 1.1; margin-bottom: 16px;
        }

        /* role card */
        .role-card {
          border: 1px solid var(--border); border-radius: 20px;
          padding: 36px 32px; background: #fff;
          transition: box-shadow 0.3s, border-color 0.3s, transform 0.3s;
          position: relative; overflow: hidden;
        }
        .role-card::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px; background: linear-gradient(90deg, transparent, var(--gold), transparent);
          opacity: 0; transition: opacity 0.35s;
        }
        .role-card:hover { box-shadow: 0 20px 60px rgba(0,0,0,0.09); border-color: var(--gold); transform: translateY(-4px); }
        .role-card:hover::after { opacity: 1; }

        .role-icon-wrap {
          width: 54px; height: 54px; border-radius: 14px;
          background: var(--gold-dim); border: 1px solid rgba(201,168,76,0.25);
          display: flex; align-items: center; justify-content: center;
          color: var(--gold); margin-bottom: 20px;
          transition: background 0.25s, color 0.25s;
        }
        .role-card:hover .role-icon-wrap { background: var(--gold); color: var(--ink); }

        .role-tag {
          display: inline-flex; align-items: center;
          font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--gold); border: 1px solid rgba(201,168,76,0.3);
          background: var(--gold-dim); padding: 4px 12px; border-radius: 100px;
          margin-bottom: 14px;
        }

        .role-quality {
          display: flex; align-items: center; gap: 9px;
          font-size: 13px; font-weight: 500; color: #444;
          padding: 7px 0; border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .role-quality:last-child { border-bottom: none; }

        /* stat card */
        .st-stat {
          padding: 32px 24px; text-align: center;
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        .st-stat:last-child { border-right: none; }
        .st-stat-val {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 4vw, 54px); font-weight: 700;
          color: var(--gold); line-height: 1; margin-bottom: 8px;
        }

        /* value card */
        .val-card {
          padding: 32px 28px; border-radius: 18px;
          border: 1px solid var(--border); background: #fff;
          transition: box-shadow 0.3s, border-color 0.3s, transform 0.3s;
        }
        .val-card:hover { box-shadow: 0 14px 48px rgba(0,0,0,0.07); border-color: var(--gold); transform: translateY(-3px); }
        .val-icon {
          width: 50px; height: 50px; border-radius: 13px;
          background: var(--gold-dim); border: 1px solid rgba(201,168,76,0.2);
          display: flex; align-items: center; justify-content: center;
          color: var(--gold); margin-bottom: 18px;
          transition: background 0.25s;
        }
        .val-card:hover .val-icon { background: var(--gold); color: var(--ink); }

        /* faq */
        .faq-item {
          border: 1px solid var(--border); border-radius: 14px;
          overflow: hidden; transition: border-color 0.25s, box-shadow 0.25s;
        }
        .faq-item.open { border-color: var(--gold); box-shadow: 0 4px 24px rgba(201,168,76,0.1); }
        .faq-btn {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          padding: 20px 26px; background: none; border: none; cursor: pointer; text-align: left;
          font-family: 'Outfit', sans-serif; gap: 20px; transition: background 0.2s;
        }
        .faq-btn:hover { background: rgba(201,168,76,0.03); }
        .faq-num { font-family: 'Playfair Display', serif; font-size: 13px; font-weight: 600; color: var(--gold); opacity: 0.6; flex-shrink: 0; }
        .faq-q { font-size: 15.5px; font-weight: 600; color: var(--ink); line-height: 1.4; flex: 1; }
        .faq-chevron { color: var(--gold); flex-shrink: 0; transition: transform 0.3s var(--ease); }
        .faq-chevron.open { transform: rotate(180deg); }
        .faq-ans { padding: 0 26px 22px 62px; font-size: 14.5px; color: var(--muted); line-height: 1.8; border-top: 1px solid var(--border); padding-top: 18px; }

        /* cta buttons */
        .cta-btn {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 14px 30px; border-radius: 10px;
          font-size: 14px; font-weight: 700; letter-spacing: 0.04em;
          text-decoration: none; transition: all 0.25s;
        }
        .cta-btn-gold { background: var(--gold); color: var(--ink); box-shadow: 0 8px 24px rgba(201,168,76,0.3); }
        .cta-btn-gold:hover { background: var(--gold-lt); transform: translateY(-2px); box-shadow: 0 14px 36px rgba(201,168,76,0.4); }
        .cta-btn-dark { background: var(--ink); color: #fff; }
        .cta-btn-dark:hover { background: #222; transform: translateY(-2px); }

        /* commitment strip */
        .commit-item {
          display: flex; align-items: center; gap: 12px;
          font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.75);
          padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .commit-item:last-child { border-bottom: none; }
      `}</style>

      <Header />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", minHeight: 520, background: "#000", paddingTop: "var(--header-h, 102px)", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "/images/team pic 1.png",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.60) 60%, rgba(0,0,0,0.3) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, var(--gold,#C9A84C) 0%, rgba(201,168,76,0.2) 70%, transparent 100%)" }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "80px clamp(24px,6vw,96px) 88px" }}>
          <div className="st-eyebrow" style={{ color: "#C9A84C" }}>BCR Constructions — People</div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(46px, 6.5vw, 80px)", fontWeight: 700, lineHeight: 1.05,
            color: "#fff", marginBottom: 20, maxWidth: 680,
            textShadow: "0 4px 32px rgba(0,0,0,0.5)",
          }}>
            Built by People<br />Who Take Pride<br />in What They Build.
          </h1>
          <p style={{ fontSize: "clamp(15px,2vw,19px)", fontWeight: 300, color: "rgba(255,255,255,0.72)", maxWidth: 520, lineHeight: 1.75, marginBottom: 40 }}>
            BCR is not a staffing company — it's a team of career construction professionals who have chosen to build their reputation here. No rotating subcontractors. No shortcuts. Just craft.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="#roles" className="cta-btn cta-btn-gold">Meet Our Team <ArrowUpRight size={15} /></a>
            <a href="tel:3472654610" className="cta-btn" style={{ border: "1.5px solid rgba(255,255,255,0.25)", color: "#fff", backdropFilter: "blur(6px)" }}>
              <Phone size={14} /> 347-265-4610
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────── */}
      <section style={{ background: "var(--ink-2, #141414)", borderBottom: "1px solid rgba(201,168,76,0.12)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {STATS.map((s, i) => (
            <div key={i} className="st-stat">
              <div className="st-stat-val">{s.value}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#fff", letterSpacing: "0.04em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── INTRO ─────────────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "96px clamp(24px,6vw,96px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <Reveal>
            <div className="st-eyebrow">Who We Are</div>
            <h2 className="st-sec-title">A Crew You Can Put Your Name On</h2>
            <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.85, marginBottom: 20 }}>
              Every person at BCR Constructions — from executive leadership to field crews — was hired for one reason: they hold themselves to a standard most companies don't ask for.
            </p>
            <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.85, marginBottom: 36 }}>
              We don't have a revolving door of laborers. Our team members are long-tenured professionals with deep expertise in their disciplines — people who have built careers here because they believe in how we work. That stability translates directly into quality on your project.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {["Licensed In-House Crews", "OSHA Certified", "Bilingual Support", "24/7 Emergency Line"].map((badge, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 7,
                  padding: "8px 16px", borderRadius: 100,
                  background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)",
                  fontSize: 12.5, fontWeight: 600, color: "#333", letterSpacing: "0.03em",
                }}>
                  <CheckCircle2 size={13} color="#C9A84C" />
                  {badge}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Quote panel */}
          <Reveal delay={120}>
            <div style={{
              background: "var(--ink, #0A0A0A)", borderRadius: 24, padding: "48px 40px",
              position: "relative", overflow: "hidden",
              border: "1px solid rgba(201,168,76,0.15)",
            }}>
              <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, background: "radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)" }} />
              <div style={{
                fontFamily: "'Playfair Display', serif", fontSize: 80,
                color: "rgba(201,168,76,0.15)", lineHeight: 1, marginBottom: 8,
                position: "relative", zIndex: 1,
              }}>"</div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(18px,2.2vw,24px)", fontStyle: "italic", color: "#fff", lineHeight: 1.7, marginBottom: 28, position: "relative", zIndex: 1 }}>
                The best buildings in New York weren't built by the lowest bidder. They were built by craftspeople who refused to cut corners — people like the ones we hire every day.
              </p>
              <div style={{ width: 40, height: 1.5, background: "var(--gold, #C9A84C)", marginBottom: 16 }} />
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(201,168,76,0.7)" }}>BCR Constructions — Est. 2000</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ROLES ─────────────────────────────────────────────────────── */}
      <section id="roles" style={{ background: "var(--off, #F8F5F0)", padding: "96px clamp(24px,6vw,96px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", maxWidth: 580, margin: "0 auto 60px" }}>
              <div className="st-eyebrow" style={{ justifyContent: "center" }}>Our Departments</div>
              <h2 className="st-sec-title" style={{ textAlign: "center" }}>Specializations Across<br />Every Phase of Construction</h2>
              <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.75 }}>
                Six specialized departments. One unified team. Each brings deep expertise that crosses over every project BCR takes on.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
            {ROLES.map(({ Icon, title, tag, description, qualities }, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="role-card">
                  <div className="role-icon-wrap"><Icon size={22} strokeWidth={1.75} /></div>
                  <div className="role-tag">{tag}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, color: "var(--ink)", marginBottom: 12, lineHeight: 1.2 }}>{title}</h3>
                  <p style={{ fontSize: 14.5, color: "var(--muted)", lineHeight: 1.8, marginBottom: 22 }}>{description}</p>
                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: 18 }}>
                    {qualities.map((q, j) => (
                      <div key={j} className="role-quality">
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />
                        {q}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ────────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "96px clamp(24px,6vw,96px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", maxWidth: 540, margin: "0 auto 60px" }}>
              <div className="st-eyebrow" style={{ justifyContent: "center" }}>What We Hire For</div>
              <h2 className="st-sec-title" style={{ textAlign: "center" }}>The Qualities Every<br />BCR Team Member Shares</h2>
              <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.75 }}>
                Skills can be trained. These four qualities can't — which is why we hire for them first.
              </p>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 22 }}>
            {VALUES.map(({ Icon, title, desc }, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="val-card">
                  <div className="val-icon"><Icon size={20} strokeWidth={1.75} /></div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 600, color: "var(--ink)", marginBottom: 10 }}>{title}</h3>
                  <p style={{ fontSize: 14.5, color: "var(--muted)", lineHeight: 1.78 }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMITMENT BANNER ─────────────────────────────────────────── */}
      <section style={{ position: "relative", padding: "96px clamp(24px,6vw,96px)", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "/images/team pic 2.png",
          backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.70) 100%)" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

          <Reveal>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#C9A84C", marginBottom: 18 }}>Our Team Commitment</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,4vw,56px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
              The Same Team.<br />Start to Finish.
            </h2>
            <div style={{ width: 48, height: 2, background: "linear-gradient(90deg, #C9A84C, rgba(201,168,76,0.3))", marginBottom: 22 }} />
            <p style={{ fontSize: "clamp(15px,2vw,17px)", color: "rgba(255,255,255,0.65)", fontWeight: 300, lineHeight: 1.8 }}>
              At BCR, the crew you meet on day one is the crew that finishes your project. No handoffs. No surprises. No strangers showing up on your job site.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 18, padding: "32px 30px", backdropFilter: "blur(10px)" }}>
              {[
                "Dedicated project manager for every job",
                "In-house crews — zero rotating subcontractors",
                "24/7 emergency line answered by real staff",
                "Direct accountability to BCR leadership",
                "Post-project follow-up and warranty support",
                "Bilingual client support available",
              ].map((item, i) => (
                <div key={i} className="commit-item">
                  <CheckCircle2 size={15} color="#C9A84C" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "96px clamp(24px,6vw,96px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <div className="st-eyebrow" style={{ justifyContent: "center" }}>Common Questions</div>
              <h2 className="st-sec-title" style={{ textAlign: "center" }}>Questions About<br />Our Team</h2>
            </div>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FAQS.map((f, i) => (
              <Reveal key={i} delay={i * 50}>
                <div className={`faq-item${openFaq === i ? " open" : ""}`}>
                  <button className="faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="faq-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="faq-q">{f.q}</span>
                    <ChevronDown size={18} className={`faq-chevron${openFaq === i ? " open" : ""}`} />
                  </button>
                  {openFaq === i && <div className="faq-ans">{f.a}</div>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--ink, #0A0A0A)", padding: "96px clamp(24px,6vw,96px)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 480, height: 480, background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 840, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#C9A84C", marginBottom: 18 }}>Work With BCR</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,4.5vw,58px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
              Ready to Meet<br />Your Project Team?
            </h2>
            <div style={{ width: 56, height: 2, background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", margin: "0 auto 24px" }} />
            <p style={{ fontSize: "clamp(15px,2vw,18px)", color: "rgba(255,255,255,0.58)", fontWeight: 300, lineHeight: 1.8, marginBottom: 44, maxWidth: 580, margin: "0 auto 44px" }}>
              Every BCR project starts with a free on-site consultation. You'll meet your project manager, walk the scope, and leave with a clear picture of what to expect — before signing anything.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
              <Link to="/#contact" className="cta-btn cta-btn-gold">
                Get a Free Consultation <ArrowUpRight size={15} />
              </Link>
              <a href="tel:3472654610" className="cta-btn" style={{ border: "1.5px solid rgba(255,255,255,0.2)", color: "#fff" }}>
                <Phone size={14} /> 347-265-4610
              </a>
              <a href="mailto:info@bcrconstructions.com" className="cta-btn" style={{ border: "1.5px solid rgba(255,255,255,0.2)", color: "#fff" }}>
                <Mail size={14} /> Email Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}