import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronDown, Phone, Mail, ArrowUpRight, Search, MessageSquare, Clock, Shield, HardHat, FileText, Wrench, Home } from "lucide-react";
import { Link } from "react-router-dom";

/* ─── DATA ───────────────────────────────────────────────────────────── */

const CATEGORIES = [
  { id: "all",      label: "All Questions",    Icon: MessageSquare },
  { id: "general",  label: "General",          Icon: Shield },
  { id: "process",  label: "Our Process",      Icon: Wrench },
  { id: "services", label: "Services",         Icon: Home },
  { id: "legal",    label: "Legal & Insurance",Icon: FileText },
  { id: "timing",   label: "Timing & Costs",   Icon: Clock },
];

const FAQS = [
  {
    category: "general",
    question: "What geographic areas does BCR Constructions serve?",
    answer: "BCR Constructions is headquartered in Staten Island, NY with a second office in Valley Stream, NY. We serve the entire New York metro area including Brooklyn, Queens, Manhattan, the Bronx, Staten Island, Long Island, and parts of New Jersey and Connecticut. For large commercial projects, we can discuss out-of-state arrangements.",
  },
  {
    category: "general",
    question: "Do you handle both residential and commercial projects?",
    answer: "Yes — and this is one of BCR's core strengths. We have dedicated in-house crews for residential renovations and custom home builds, as well as separate teams for commercial construction, restoration, and fit-outs. Most contractors specialize in one or the other. BCR excels at both, under the same roof.",
  },
  {
    category: "general",
    question: "Are your workers licensed and insured?",
    answer: "Absolutely. BCR Constructions is fully licensed by New York State, carries comprehensive general liability insurance, and all crew members are covered under workers' compensation. We maintain OSHA certification across our workforce. You will never have an uninsured worker on your job site.",
  },
  {
    category: "process",
    question: "What does the project process look like from start to finish?",
    answer: "Every BCR project follows a structured five-step process: (1) Free on-site consultation and assessment. (2) Detailed, itemized written estimate — no vague numbers. (3) Signed contract with a defined scope, timeline, and payment schedule. (4) Active construction phase with a dedicated project manager and weekly progress updates. (5) Final walkthrough, punch list, and handover. You have a single point of contact throughout.",
  },
  {
    category: "process",
    question: "Will I have a dedicated project manager?",
    answer: "Yes. Every BCR project is assigned a dedicated project manager from day one. They are your direct line of communication, responsible for coordinating all trades, updating you on progress, and ensuring the work matches the agreed scope. You won't be passed around between departments.",
  },
  {
    category: "process",
    question: "What if I find issues or want changes during construction?",
    answer: "Open communication is central to how we work. If an issue arises — whether it's something we discover in the walls or a change of direction from your side — your project manager will reach out immediately, walk you through the options, and provide a written change order before any additional work proceeds. No surprise charges.",
  },
  {
    category: "process",
    question: "Can you work with my existing architect or engineer?",
    answer: "Absolutely. BCR regularly collaborates with third-party architects, engineers, and interior designers. Bring your plans — we'll build them. If you don't have design drawings yet, we also offer in-house design-build services where our team takes the project from concept to completion.",
  },
  {
    category: "services",
    question: "What types of renovation services do you offer?",
    answer: "BCR offers 12 specialized services: Commercial Restoration, Condominium Renovation, Exterior Renovation, Flooded Basement Recovery, Home Design, Home Renovation, Insurance Claim Support, Interior Renovation, Kitchen & Bathroom, New / Custom Home Building, Roofing, and Waterproofing. All services are handled by in-house crews — no subcontractors.",
  },
  {
    category: "services",
    question: "Do you build custom homes from the ground up?",
    answer: "Yes. BCR's custom home division handles ground-up builds from site preparation and foundation through framing, mechanical systems, finishes, and final handover. We work closely with you and your architect (or our in-house designers) to deliver a home that matches your vision exactly — not a modified template.",
  },
  {
    category: "services",
    question: "Do you offer emergency services for flood or fire damage?",
    answer: "Yes. BCR provides 24/7 emergency response for water damage, flooded basements, and fire damage restoration. We dispatch a crew for immediate assessment, begin mitigation to prevent further damage, and coordinate the full restoration — including working directly with your insurance company.",
  },
  {
    category: "legal",
    question: "Do you assist with insurance claims?",
    answer: "Yes — BCR has a dedicated insurance claim support service. We document damage, photograph evidence, prepare detailed restoration estimates formatted for insurers, and communicate directly with your adjuster. We've handled hundreds of insurance-related restorations and know exactly what carriers need to approve claims efficiently.",
  },
  {
    category: "legal",
    question: "Do you offer warranties on completed work?",
    answer: "Yes. BCR stands behind every project with a written warranty. Labor warranties are typically 1–2 years depending on the scope of work. Many materials carry manufacturer warranties that we pass through to you. All warranty terms are documented in your contract before work begins.",
  },
  {
    category: "legal",
    question: "Do you pull permits for the work?",
    answer: "Yes. BCR obtains all required permits for work that legally requires them — structural changes, electrical, plumbing, and mechanical work all typically require permits in New York. We handle the permit process on your behalf and coordinate all required inspections. Unpermitted work creates problems when you sell — we never cut that corner.",
  },
  {
    category: "timing",
    question: "What is a typical project timeline?",
    answer: "Timelines vary by scope. A kitchen or bathroom renovation typically runs 3–6 weeks. A full home renovation can take 2–4 months. New custom home builds generally run 6–12 months depending on size and complexity. Commercial projects vary widely. We provide a written timeline as part of every contract — and we hold ourselves accountable to it.",
  },
  {
    category: "timing",
    question: "How is project cost estimated?",
    answer: "Every BCR estimate is based on an in-person site assessment. We provide a fully itemized written quote — breaking down materials, labor, permits, and contingency — so you know exactly what you're paying for. We do not offer ballpark numbers over the phone. Free, accurate on-site estimates are how we earn your trust before you've spent a dollar.",
  },
  {
    category: "timing",
    question: "What does a typical payment schedule look like?",
    answer: "BCR uses milestone-based payment schedules tied to project phases — not arbitrary dates. A typical structure is: deposit at contract signing, payments at defined completion milestones, and a final payment upon successful walkthrough and punch list completion. We never ask for more than 30% upfront. Full payment details are in your contract before work begins.",
  },
];

const CONTACT_OPTIONS = [
  {
    Icon: Phone,
    label: "Call Us",
    value: "(347) 265-4610",
    sub: "Mon–Fri 9AM–5PM, Sat 9AM–2PM",
    href: "tel:3472654610",
  },
  {
    Icon: Mail,
    label: "Email Us",
    value: "info@bcrconstructions.com",
    sub: "We reply within 1 business day",
    href: "mailto:info@bcrconstructions.com",
  },
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

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

/* ─── COMPONENT ──────────────────────────────────────────────────────── */

export default function FAQ() {
  const [openIndex,    setOpenIndex]    = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [query,        setQuery]        = useState("");

  const filtered = FAQS.filter(f => {
    const matchCat   = activeCategory === "all" || f.category === activeCategory;
    const matchQuery = !query || f.question.toLowerCase().includes(query.toLowerCase()) || f.answer.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  // Reset open item when filter changes
  useEffect(() => setOpenIndex(null), [activeCategory, query]);

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#fff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');  

        :root {
          --gold:    #C9A84C;
          --gold-lt: #E3C26A;
          --gold-dim:rgba(201,168,76,0.12);
          --ink:     #0A0A0A;
          --white:   #FFFFFF;
          --off:     #F8F5F0;
          --muted:   #666;
          --border:  rgba(0,0,0,0.08);
          --ease:    cubic-bezier(0.22,1,0.36,1);
        }

        /* search */
        .faq-search-wrap {
          position: relative; max-width: 520px; width: 100%;
        }
        .faq-search {
          width: 100%; padding: 13px 18px 13px 46px;
          border-radius: 12px;
          border: 1.5px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.08);
          color: #fff; font-family: 'Outfit', sans-serif; font-size: 14px;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          box-sizing: border-box;
        }
        .faq-search::placeholder { color: rgba(255,255,255,0.35); }
        .faq-search:focus { border-color: var(--gold); background: rgba(255,255,255,0.11); }
        .faq-search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.35); pointer-events: none; }

        /* category pills */
        .faq-cat-pill {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 8px 16px; border-radius: 100px;
          font-size: 12.5px; font-weight: 500; letter-spacing: 0.02em;
          border: 1.5px solid rgba(255,255,255,0.1);
          background: transparent; color: rgba(255,255,255,0.5);
          cursor: pointer; transition: all 0.2s; white-space: nowrap;
          font-family: 'Outfit', sans-serif;
        }
        .faq-cat-pill:hover { border-color: rgba(201,168,76,0.4); color: rgba(255,255,255,0.8); }
        .faq-cat-pill.active { background: var(--gold); border-color: var(--gold); color: var(--ink); font-weight: 600; }

        /* FAQ accordion */
        .faq-item {
          border: 1px solid var(--border); border-radius: 14px;
          background: #fff; overflow: hidden;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .faq-item.open { border-color: var(--gold); box-shadow: 0 4px 28px rgba(201,168,76,0.1); }

        .faq-btn {
          width: 100%; display: flex; align-items: flex-start; justify-content: space-between;
          padding: 22px 26px; background: none; border: none; cursor: pointer;
          text-align: left; gap: 18px; font-family: 'Outfit', sans-serif;
          transition: background 0.2s;
        }
        .faq-btn:hover { background: rgba(201,168,76,0.03); }

        .faq-num {
          font-family: 'Playfair Display', serif;
          font-size: 13px; font-weight: 600;
          color: var(--gold); opacity: 0.6;
          flex-shrink: 0; margin-top: 2px;
          min-width: 28px;
          transition: opacity 0.2s;
        }
        .faq-item.open .faq-num { opacity: 1; }

        .faq-q {
          font-size: 15.5px; font-weight: 600; color: var(--ink); line-height: 1.4; flex: 1;
          transition: color 0.2s;
        }
        .faq-item.open .faq-q { color: #000; }

        .faq-chevron {
          color: var(--gold); flex-shrink: 0; margin-top: 2px;
          transition: transform 0.35s var(--ease);
        }
        .faq-chevron.open { transform: rotate(180deg); }

        .faq-body {
          padding: 0 26px 22px 60px;
          font-size: 14.5px; color: var(--muted); line-height: 1.8;
          border-top: 1px solid rgba(0,0,0,0.05);
          padding-top: 18px;
          animation: faqIn 0.3s var(--ease);
        }
        @keyframes faqIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* contact card */
        .faq-contact-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px; padding: 24px 22px;
          display: flex; align-items: flex-start; gap: 16px;
          text-decoration: none;
          transition: border-color 0.25s, background 0.25s, transform 0.25s;
        }
        .faq-contact-card:hover { border-color: rgba(201,168,76,0.35); background: rgba(255,255,255,0.07); transform: translateY(-2px); }
        .faq-contact-icon {
          width: 44px; height: 44px; border-radius: 11px; flex-shrink: 0;
          background: rgba(201,168,76,0.12); border: 1px solid rgba(201,168,76,0.2);
          display: flex; align-items: center; justify-content: center; color: var(--gold);
          transition: background 0.2s;
        }
        .faq-contact-card:hover .faq-contact-icon { background: var(--gold); color: var(--ink); }

        /* no results */
        .faq-empty {
          text-align: center; padding: 64px 24px;
          color: var(--muted); font-size: 15px;
        }

        /* category pills on white background (FAQ body section) */
        .faq-body-section .faq-cat-pill {
          border-color: rgba(0,0,0,0.12);
          color: rgba(0,0,0,0.45);
        }
        .faq-body-section .faq-cat-pill:hover {
          border-color: rgba(201,168,76,0.5);
          color: rgba(0,0,0,0.75);
        }
        .faq-body-section .faq-cat-pill.active {
          background: var(--gold);
          border-color: var(--gold);
          color: var(--ink);
        }
      `}</style>

      <Header />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", background: "var(--ink)", paddingTop: "var(--header-h, 102px)", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/images/faqs-pic_png.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center 60%",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.88) 0%, rgba(10,10,10,0.96) 100%)" }} />
        {/* Gold rule bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1.5, background: "linear-gradient(90deg, transparent, var(--gold) 30%, var(--gold) 70%, transparent)" }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "72px clamp(24px,6vw,80px) 80px" }}>
          <Reveal>
            {/* eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 24, height: 1.5, background: "var(--gold)" }} />
              <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)" }}>Knowledge Base</span>
            </div>

            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px,5.5vw,68px)", fontWeight: 700, color: "#fff", lineHeight: 1.08, marginBottom: 18, maxWidth: 640 }}>
              Frequently Asked<br />
              <em style={{ fontStyle: "italic", color: "var(--gold-lt)" }}>Questions</em>
            </h1>
            <p style={{ fontSize: "clamp(14px,1.8vw,17px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 480, marginBottom: 44, fontWeight: 300 }}>
              Everything you need to know about working with BCR Constructions — from first consultation through final handover.
            </p>

            {/* Search bar */}
            <div className="faq-search-wrap">
              <Search size={16} className="faq-search-icon" />
              <input
                className="faq-search"
                type="text"
                placeholder="Search questions…"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
          </Reveal>

          {/* Stats row */}
          <Reveal delay={150}>
            <div style={{ display: "flex", gap: "clamp(24px,4vw,56px)", marginTop: 52, flexWrap: "wrap" }}>
              {[
                { v: `${FAQS.length}`, l: "Questions Answered" },
                { v: "6",  l: "Topic Categories" },
                { v: "24+", l: "Years of Expertise" },
              ].map(({ v, l }) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700, color: "var(--gold)", lineHeight: 1 }}>{v}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 5, fontWeight: 500 }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ BODY ─────────────────────────────────────────────────── */}
      <section className="faq-body-section" style={{ background: "#fff", padding: "80px clamp(24px,6vw,80px) 96px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          {/* Category filter */}
          <Reveal>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 48 }}>
              {CATEGORIES.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveCategory(id)}
                  className={`faq-cat-pill${activeCategory === id ? " active" : ""}`}
                >
                  <Icon size={13} strokeWidth={2} />
                  {label}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Result count */}
          {query && (
            <Reveal>
              <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 24, letterSpacing: "0.02em" }}>
                {filtered.length} result{filtered.length !== 1 ? "s" : ""} for <strong style={{ color: "var(--ink)" }}>"{query}"</strong>
              </div>
            </Reveal>
          )}

          {/* Accordion list */}
          {filtered.length === 0 ? (
            <div className="faq-empty">
              <HardHat size={40} color="var(--gold)" style={{ opacity: 0.4, margin: "0 auto 16px" }} />
              <p>No questions match your search. Try a different keyword or browse by category.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {filtered.map((faq, i) => (
                <Reveal key={`${activeCategory}-${i}`} delay={i * 40}>
                  <div className={`faq-item${openIndex === i ? " open" : ""}`}>
                    <button
                      className="faq-btn"
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      aria-expanded={openIndex === i}
                    >
                      <span className="faq-num">{String(i + 1).padStart(2, "0")}</span>
                      <span className="faq-q">{faq.question}</span>
                      <ChevronDown size={18} className={`faq-chevron${openIndex === i ? " open" : ""}`} />
                    </button>
                    {openIndex === i && (
                      <div className="faq-body">{faq.answer}</div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ── STILL HAVE QUESTIONS ─────────────────────────────────────── */}
      <section style={{ background: "var(--ink)", padding: "80px clamp(24px,6vw,80px)", position: "relative", overflow: "hidden" }}>
        {/* Decorative glow */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 380, height: 380, background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 320, height: 320, background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>

              {/* Left */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 22, height: 1.5, background: "var(--gold)" }} />
                  <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)" }}>We're Here to Help</span>
                </div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>
                  Still Have<br />Questions?
                </h2>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: 28, fontWeight: 300 }}>
                  Our team is happy to walk you through anything — your project scope, our process, timelines, costs. No commitment required, just a conversation.
                </p>
                <Link
                  to="/about"
                  style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 600, color: "var(--gold)", textDecoration: "none", letterSpacing: "0.06em", textTransform: "uppercase", transition: "gap 0.2s" }}
                >
                  Learn More About BCR <ArrowUpRight size={13} />
                </Link>
              </div>

              {/* Right — contact options */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {CONTACT_OPTIONS.map(({ Icon, label, value, sub, href }) => (
                  <a key={label} href={href} className="faq-contact-card">
                    <div className="faq-contact-icon"><Icon size={18} /></div>
                    <div>
                      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 4 }}>{label}</div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 3 }}>{value}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.38)" }}>{sub}</div>
                    </div>
                  </a>
                ))}

                {/* CTA */}
                <a
                  href="#contact"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
                    padding: "14px", borderRadius: 12,
                    background: "var(--gold)", color: "var(--ink)",
                    fontWeight: 700, fontSize: 14, textDecoration: "none",
                    letterSpacing: "0.04em", marginTop: 4,
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--gold-lt)"}
                  onMouseLeave={e => e.currentTarget.style.background = "var(--gold)"}
                >
                  Request a Free Quote <ArrowUpRight size={15} />
                </a>
              </div>

            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}