import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  Shield, Zap, Star,
  ArrowUpRight, Phone, Mail, MapPin, CheckCircle2,
  Building2, HardHat, Quote, ChevronDown,
} from "lucide-react";

/* ─── DATA ──────────────────────────────────────────────────────────── */

const HERO_SLIDES = [
  {
    tag: "24+ Years of Trust",
    title: "Building Dreams\nThrough Construction",
    sub: "Full-service general contracting across New York — residential, commercial, and everything in between.",
    cta: "Get a Free Quote",
    ctaHref: "#contact",
    image: "/images/slide-6.webp",
  },
  {
    tag: "Commercial Excellence",
    title: "Commercial &\nResidential Projects",
    sub: "From office towers to family homes — BCR delivers superior craftsmanship on every scale.",
    cta: "Explore Services",
    ctaHref: "#services",
    image: "/images/slide-2.webp",
  },
  {
    tag: "Modern Renovations",
    title: "Transforming Spaces\nWith Precision",
    sub: "Custom interiors, kitchens, bathrooms, and full-home renovations crafted to your exact vision.",
    cta: "View Our Work",
    ctaHref: "#services",
    image: "/images/slide-8.png",
  },
  {
    tag: "Heavy Construction",
    title: "Industrial-Grade\nSolutions",
    sub: "Engineered for demanding projects. BCR handles complex builds where precision and safety are non-negotiable.",
    cta: "Learn More",
    ctaHref: "/about",
    image: "/images/slide-4.webp",
  },
  {
    tag: "Exterior Renovation",
    title: "Premium Exterior\nRenovation",
    sub: "First impressions matter. Our exterior renovation teams deliver curb appeal that lasts decades.",
    cta: "Get a Quote",
    ctaHref: "#contact",
    image: "/images/slide-3.webp",
  },
];

const STATS = [
  { value: "24+",  label: "Years in Business",    note: "Since 2000" },
  { value: "500+", label: "Projects Completed",   note: "Residential & Commercial" },
  { value: "98%",  label: "Client Satisfaction",  note: "Based on post-project surveys" },
  { value: "12",   label: "Specialized Services", note: "Under one roof" },
];

const SERVICES = [
  { title: "Commercial Restoration",  description: "Full-scope restoration for offices, retail spaces, and industrial facilities — completed on time, on budget.", path: "/services/commercial-restoration", image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F5a045426e9834c1083837830191b43dd?format=webp&width=800&height=1200" },
  { title: "Exterior Renovation",     description: "Siding, facades, windows, and entranceways — we transform the way your property presents itself.", path: "/services/exterior-renovation",      image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F31a04eba0ebf4f92a8e45c7b8c2b7335?format=webp&width=800&height=1200" },
  { title: "Flooded Basement",        description: "24/7 emergency response, waterproofing, drainage systems, and complete basement recovery services.", path: "/services/flooded-basement",         image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F9279e5ae40f242798c4c039df4376013?format=webp&width=800&height=1200" },
  { title: "Home Renovation",         description: "Whole-home transformations guided by your vision, delivered by our craftsmen with zero compromises.", path: "/services/home-renovation",          image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2Fa1567739cad54517803cdfd699ec2d74?format=webp&width=800&height=1200" },
  { title: "Kitchen & Bathroom",      description: "The highest-ROI rooms in your home, reimagined with premium materials and expert installation.", path: "/services/kitchen-bathroom",         image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2Fffd7dd5c584d4c8fa2fe1e5313f70842?format=webp&width=800&height=1200" },
  { title: "New / Custom Home",       description: "Ground-up custom builds from blueprint to handover — your vision executed without compromise.", path: "/services/new-home-custom-home",     image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F08b49164b9854b449840e31a08b51dbc?format=webp&width=800&height=1200" },
  { title: "Interior Renovation",     description: "Layouts, finishes, fixtures, and flow — we breathe new life into interiors across every room.", path: "/services/interior-renovation",      image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F56135e5b7654466a94e8d875f5f09442?format=webp&width=800&height=1200" },
  { title: "Insurance Claim",         description: "We navigate the claims process for you — from assessment to restoration — so you don't have to.", path: "/services/insurance-claim",          image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F366d55088c7045deafb5828812d97984?format=webp&width=800&height=1200" },
];

const VALUES = [
  { Icon: Shield, title: "Safety",     description: "Every BCR job site operates under rigorous safety protocols. Our crews are OSHA-certified, fully insured, and trained to put protection above all else — for workers and clients alike." },
  { Icon: Zap,    title: "Innovation", description: "BCR stays at the forefront of modern construction methods, materials, and technology. We bring smarter, faster, and more efficient solutions to every project we undertake." },
  { Icon: Star,   title: "Excellence", description: "Good enough is never good enough at BCR. We hold every project — no matter the scale — to the same uncompromising standard of craftsmanship that has defined our reputation for 24+ years." },
];

const TESTIMONIALS = [
  { name: "Michael T.", role: "Homeowner — Brooklyn, NY",  stars: 5, text: "BCR transformed our 1960s colonial into a modern masterpiece. The team was professional from day one, respected our budget, and finished two weeks ahead of schedule. We couldn't be happier." },
  { name: "Sandra R.", role: "Property Manager — Queens, NY", stars: 5, text: "After a serious basement flood, BCR had our building back to normal in under three weeks. Their insurance claim team handled everything. Truly a one-stop shop." },
  { name: "James K.", role: "Business Owner — Manhattan, NY", stars: 5, text: "We hired BCR for a full commercial restoration after a fire. They coordinated every trade, managed the timeline precisely, and delivered results that exceeded expectations." },
];

const FAQS = [
  { q: "What areas do you serve?",                    a: "BCR Constructions is headquartered in New York and serves the greater New York metro area, including Brooklyn, Queens, Manhattan, the Bronx, Staten Island, Long Island, and parts of New Jersey and Connecticut." },
  { q: "Do you handle both residential and commercial?", a: "Yes — this is one of our core strengths. BCR has dedicated teams for residential renovations and custom builds as well as commercial construction and restoration. Most of our competitors specialize in one; we excel in both." },
  { q: "How do you handle insurance claims?",         a: "BCR offers a fully managed insurance claim service. We document damage, interface directly with your insurer, provide restoration estimates, and execute the work — minimizing your stress at an already difficult time." },
  { q: "What does a typical project process look like?", a: "We begin with a free on-site consultation and assessment. From there we provide a detailed, transparent quote with a clear timeline. Once approved, a dedicated project manager oversees your build from groundbreak to final walkthrough." },
  { q: "How is project pricing determined?",          a: "Every project is unique. Pricing is based on scope, materials, labor, and timeline. We provide itemized, written estimates with no hidden fees — and we stick to them." },
  { q: "Are you licensed and insured?",               a: "Absolutely. BCR Constructions is fully licensed in New York, carries comprehensive general liability insurance, and all crew members are covered under workers' compensation." },
];

const WHY_BCR = [
  "Single point of contact from quote to completion",
  "In-house crews — no subcontractor surprises",
  "Transparent pricing with written estimates",
  "Fully licensed, bonded & insured in New York",
  "12 specialized services under one roof",
];

/* ─── COMPONENT ─────────────────────────────────────────────────────── */

function useInView(threshold = 0.15) {
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

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [slide, setSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "", service: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.phone) return;
    setFormStatus("submitting");
    await new Promise(res => setTimeout(res, 1200));
    setFormStatus("success");
    setFormData({ firstName: "", lastName: "", email: "", phone: "", service: "", message: "" });
  };

  useEffect(() => {
    const id = setInterval(() => setSlide(p => (p + 1) % HERO_SLIDES.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#fff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');

        :root {
          --gold:     #C9A84C;
          --gold-lt:  #E3C26A;
          --gold-dim: rgba(201,168,76,0.12);
          --ink:      #0A0A0A;
          --ink-2:    #141414;
          --ink-3:    #1C1C1C;
          --white:    #FFFFFF;
          --off:      #F8F5F0;
          --muted:    #666;
          --border:   rgba(0,0,0,0.08);
          --ease:     cubic-bezier(0.22,1,0.36,1);
        }

        .hero-tag {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--gold); border: 1px solid rgba(201,168,76,0.35);
          background: rgba(201,168,76,0.08);
          padding: 6px 14px; border-radius: 100px;
          margin-bottom: 24px;
        }
        .hero-tag::before { content:''; width:6px; height:6px; background:var(--gold); border-radius:50%; }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(44px, 7vw, 88px);
          font-weight: 700; line-height: 1.05;
          color: #fff; white-space: pre-line;
          text-shadow: 0 4px 32px rgba(0,0,0,0.4);
          margin-bottom: 20px;
        }
        .hero-sub {
          font-size: clamp(15px, 2vw, 19px); font-weight: 300; color: rgba(255,255,255,0.82);
          max-width: 520px; line-height: 1.7; margin-bottom: 36px;
        }
        .hero-cta {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 14px 30px; border-radius: 10px;
          background: var(--gold); color: var(--ink);
          font-size: 14px; font-weight: 700; letter-spacing: 0.04em;
          text-decoration: none; position: relative; overflow: hidden;
          transition: color 0.3s;
          box-shadow: 0 8px 32px rgba(201,168,76,0.35);
        }
        .hero-cta::before {
          content:''; position:absolute; inset:0;
          background: var(--ink); transform: scaleX(0); transform-origin:left;
          transition: transform 0.35s var(--ease);
        }
        .hero-cta:hover { color: var(--gold); }
        .hero-cta:hover::before { transform: scaleX(1); }
        .hero-cta span, .hero-cta svg { position: relative; z-index: 1; }

        .hero-cta-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; border-radius: 10px;
          border: 1.5px solid rgba(255,255,255,0.35);
          color: #fff; font-size: 14px; font-weight: 600; letter-spacing: 0.03em;
          text-decoration: none; backdrop-filter: blur(6px);
          transition: border-color 0.25s, background 0.25s, color 0.25s;
        }
        .hero-cta-ghost:hover { border-color: var(--gold); background: rgba(201,168,76,0.1); color: var(--gold-lt); }

        .stat-val {
          font-family: 'Playfair Display', serif;
          font-size: clamp(34px, 4vw, 52px); font-weight: 700;
          color: var(--gold); line-height: 1;
        }

        .sec-eyebrow {
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--gold); display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
        }
        .sec-eyebrow::before { content:''; width:24px; height:1.5px; background: var(--gold); }

        .sec-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 4vw, 52px); font-weight: 700;
          color: var(--ink); line-height: 1.1; margin-bottom: 16px;
        }
        .sec-title-light { color: #fff; }

        .sec-lead { font-size: 17px; color: var(--muted); line-height: 1.7; max-width: 520px; }
        .sec-lead-light { color: rgba(255,255,255,0.6); }

        .svc-card {
          background: #fff; border-radius: 16px; overflow: hidden;
          border: 1px solid var(--border);
          transition: box-shadow 0.3s, transform 0.3s, border-color 0.3s;
          display: flex; flex-direction: column;
          text-decoration: none;
        }
        .svc-card:hover {
          box-shadow: 0 20px 60px rgba(0,0,0,0.1);
          transform: translateY(-4px);
          border-color: var(--gold);
        }
        .svc-card-img { position: relative; height: 210px; overflow: hidden; }
        .svc-card-img img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.55s var(--ease);
        }
        .svc-card:hover .svc-card-img img { transform: scale(1.07); }
        .svc-card-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%);
        }
        .svc-card-body { padding: 22px 22px 20px; flex: 1; display: flex; flex-direction: column; }
        .svc-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 19px; font-weight: 600; color: var(--ink);
          margin-bottom: 8px; line-height: 1.25;
          transition: color 0.2s;
        }
        .svc-card:hover .svc-card-title { color: #8a6500; }
        .svc-card-desc { font-size: 13.5px; color: var(--muted); line-height: 1.65; flex: 1; margin-bottom: 16px; }
        .svc-card-link {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 12.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--gold); transition: gap 0.2s;
        }
        .svc-card:hover .svc-card-link { gap: 9px; }

        .val-card {
          padding: 36px 32px; border-radius: 18px;
          border: 1px solid var(--border); background: #fff;
          transition: box-shadow 0.3s, border-color 0.3s, transform 0.3s;
          position: relative; overflow: hidden;
        }
        .val-card::before {
          content:''; position:absolute; top:-60px; right:-60px;
          width: 140px; height: 140px;
          background: radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%);
          transition: opacity 0.3s;
          opacity: 0;
        }
        .val-card:hover { box-shadow: 0 16px 48px rgba(0,0,0,0.08); border-color: var(--gold); transform: translateY(-3px); }
        .val-card:hover::before { opacity: 1; }
        .val-icon {
          width: 52px; height: 52px; border-radius: 13px;
          background: var(--gold-dim); border: 1px solid rgba(201,168,76,0.25);
          display: flex; align-items: center; justify-content: center;
          color: var(--gold); margin-bottom: 20px;
          transition: background 0.2s;
        }
        .val-card:hover .val-icon { background: var(--gold); color: var(--ink); }

        .testi-card {
          background: var(--ink-3); border-radius: 18px;
          padding: 32px 28px; border: 1px solid rgba(255,255,255,0.07);
          display: flex; flex-direction: column; gap: 16px;
          transition: border-color 0.25s, transform 0.25s;
        }
        .testi-card:hover { border-color: rgba(201,168,76,0.3); transform: translateY(-3px); }
        .testi-stars { display: flex; gap: 3px; }
        .testi-text { font-size: 14.5px; color: rgba(255,255,255,0.72); line-height: 1.75; font-style: italic; flex: 1; }
        .testi-name { font-size: 14px; font-weight: 600; color: #fff; }
        .testi-role { font-size: 12px; color: var(--gold); letter-spacing: 0.04em; }

        .faq-item {
          border: 1px solid var(--border); border-radius: 14px; overflow: hidden;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .faq-item.open { border-color: var(--gold); box-shadow: 0 4px 24px rgba(201,168,76,0.1); }
        .faq-btn {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          padding: 20px 24px; background: none; border: none; cursor: pointer; text-align: left;
          font-family: 'Outfit', sans-serif;
          transition: background 0.2s;
          gap: 16px;
        }
        .faq-btn:hover { background: rgba(201,168,76,0.04); }
        .faq-q { font-size: 15.5px; font-weight: 600; color: var(--ink); line-height: 1.4; }
        .faq-chevron { color: var(--gold); flex-shrink: 0; transition: transform 0.3s var(--ease); }
        .faq-chevron.open { transform: rotate(180deg); }
        .faq-ans {
          padding: 0 24px 20px;
          font-size: 14.5px; color: var(--muted); line-height: 1.75;
          border-top: 1px solid var(--border);
          padding-top: 16px;
        }

        .contact-input {
          width: 100%; padding: 13px 16px; border-radius: 10px;
          border: 1.5px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.06);
          color: #fff; font-family: 'Outfit', sans-serif; font-size: 14px;
          outline: none; transition: border-color 0.2s, background 0.2s;
        }
        .contact-input::placeholder { color: rgba(255,255,255,0.35); }
        .contact-input:focus { border-color: var(--gold); background: rgba(255,255,255,0.09); }
        .contact-select option { background: #1a1a1a; color: #fff; }

        .contact-submit {
          width: 100%; padding: 14px; border-radius: 10px;
          background: var(--gold); color: var(--ink);
          font-family: 'Outfit', sans-serif;
          font-size: 15px; font-weight: 700; letter-spacing: 0.04em;
          border: none; cursor: pointer; position: relative; overflow: hidden;
          transition: color 0.3s;
        }
        .contact-submit::before {
          content:''; position:absolute; inset:0;
          background: var(--ink); transform: scaleX(0); transform-origin: left;
          transition: transform 0.35s var(--ease);
        }
        .contact-submit:hover { color: var(--gold); }
        .contact-submit:hover::before { transform: scaleX(1); }
        .contact-submit span { position: relative; z-index: 1; }

        .contact-detail {
          display: flex; align-items: flex-start; gap: 14px;
          font-size: 14px; color: rgba(255,255,255,0.7);
        }
        .contact-detail-icon {
          width: 38px; height: 38px; border-radius: 10px;
          background: rgba(201,168,76,0.12); border: 1px solid rgba(201,168,76,0.2);
          display: flex; align-items: center; justify-content: center;
          color: var(--gold); flex-shrink: 0; margin-top: 1px;
        }

        @media (max-width: 768px) {
          .responsive-2col { grid-template-columns: 1fr !important; gap: 40px !important; }
          .responsive-form-grid { grid-template-columns: 1fr !important; }
          .hero-title { font-size: clamp(36px, 10vw, 60px) !important; }
        }

        .why-item {
          display: flex; align-items: center; gap: 12px;
          font-size: 14.5px; font-weight: 500; color: rgba(255,255,255,0.8);
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .why-item:last-child { border-bottom: none; }

        .slide-dot {
          height: 3px; border-radius: 4px; border: none; cursor: pointer; padding: 0;
          transition: width 0.35s ease, background 0.35s ease;
        }
      `}</style>

      <Header />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", height: "100vh", minHeight: 640, background: "#000", marginTop: 0, paddingTop: "var(--header-h, 102px)" }}>
        {HERO_SLIDES.map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute", inset: 0,
              opacity: i === slide ? 1 : 0,
              transition: "opacity 1.1s ease",
              pointerEvents: i === slide ? "all" : "none",
            }}
          >
            <img src={s.image} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.2) 100%)" }} />
          </div>
        ))}

        <div style={{ position: "relative", zIndex: 10, height: "100%", display: "flex", alignItems: "center", padding: "0 clamp(24px, 6vw, 96px)" }}>
          <div style={{ maxWidth: 640 }}>
            <div className="hero-tag">{HERO_SLIDES[slide].tag}</div>
            <h1 className="hero-title">{HERO_SLIDES[slide].title}</h1>
            <p className="hero-sub">{HERO_SLIDES[slide].sub}</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href={HERO_SLIDES[slide].ctaHref} className="hero-cta">
                <span>{HERO_SLIDES[slide].cta}</span>
                <ArrowUpRight size={16} />
              </a>
              <a href="tel:3472654610" className="hero-cta-ghost">
                <Phone size={14} />
                347-265-4610
              </a>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 48, right: "clamp(24px,6vw,96px)", zIndex: 20, display: "flex", gap: 8, alignItems: "center" }}>
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              aria-label={`Slide ${i + 1}`}
              className="slide-dot"
              style={{
                background: i === slide ? "var(--gold)" : "rgba(255,255,255,0.3)",
                width: i === slide ? 32 : 12,
              }}
            />
          ))}
        </div>

        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", zIndex: 20, color: "rgba(255,255,255,0.4)", fontSize: 12, letterSpacing: "0.1em", fontWeight: 500 }}>
          {String(slide + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")}
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────── */}
      <section style={{ background: "var(--ink)", borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{
                padding: "36px 24px",
                borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                textAlign: "center",
              }}
            >
              <div className="stat-val">{s.value}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginTop: 6, letterSpacing: "0.02em" }}>{s.label}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 3, letterSpacing: "0.06em" }}>{s.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT / NARRATIVE ─────────────────────────────────────────── */}
      <section style={{ padding: "96px clamp(24px,6vw,96px)", background: "#fff", maxWidth: 1280, margin: "0 auto" }}>
        <div className="responsive-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <Section>
            <div className="sec-eyebrow">About BCR Constructions</div>
            <h2 className="sec-title">New York's Most Trusted Construction Partner</h2>
            <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.8, marginBottom: 24 }}>
              Since 2000, BCR Constructions has been building, restoring, and transforming properties across the New York metro area. We are a full-service general contractor — not a middleman, not a referral network. Our in-house crews handle every phase of your project with the same team, the same standards, and direct accountability to you.
            </p>
            <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.8, marginBottom: 36 }}>
              Whether you're a homeowner planning a kitchen renovation, a property manager dealing with water damage, or a developer breaking ground on a commercial build — BCR brings 24+ years of hands-on expertise and a track record of 500+ completed projects to the table.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {WHY_BCR.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, fontSize: 14.5, fontWeight: 500, color: "#333" }}>
                  <CheckCircle2 size={17} color="var(--gold)" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 36, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="/about"
                style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "12px 26px", borderRadius: 10, background: "var(--ink)", color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none", letterSpacing: "0.03em", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#333")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--ink)")}
              >
                Our Story <ArrowUpRight size={14} />
              </a>
              <a href="/staff" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "12px 26px", borderRadius: 10, border: "1.5px solid var(--border)", color: "var(--ink)", fontSize: 14, fontWeight: 600, textDecoration: "none", letterSpacing: "0.03em" }}>
                Meet the Team
              </a>
            </div>
          </Section>

          <Section>
            <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "4/5", boxShadow: "0 32px 80px rgba(0,0,0,0.14)" }}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F6ba6ca8cfa574d9d947931bf019df138?format=webp&width=800&height=1200"
                alt="BCR Constructions team at work"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 50%)" }} />
              <div style={{
                position: "absolute", bottom: 24, left: 24, right: 24,
                background: "rgba(10,10,10,0.85)", backdropFilter: "blur(12px)",
                border: "1px solid rgba(201,168,76,0.25)",
                borderRadius: 14, padding: "18px 22px",
                display: "flex", alignItems: "center", gap: 14,
              }}>
                <div style={{ width: 44, height: 44, borderRadius: 11, background: "var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <HardHat size={22} color="var(--ink)" />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>Licensed & Fully Insured</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>New York State — Since 2000</div>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────── */}
      <section id="services" style={{ background: "var(--off)", padding: "96px clamp(24px,6vw,96px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Section>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 56, flexWrap: "wrap", gap: 24 }}>
              <div>
                <div className="sec-eyebrow">What We Do</div>
                <h2 className="sec-title" style={{ marginBottom: 0 }}>12 Services.<br />One Team. Zero Middlemen.</h2>
              </div>
              <Link to="/services/commercial-restoration" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13.5, fontWeight: 600, color: "var(--gold)", textDecoration: "none", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                View All Services <ArrowUpRight size={14} />
              </Link>
            </div>
          </Section>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {SERVICES.map((s, i) => (
              <Section key={i}>
                <Link to={s.path} className="svc-card">
                  <div className="svc-card-img">
                    <img src={s.image} alt={s.title} />
                    <div className="svc-card-img-overlay" />
                  </div>
                  <div className="svc-card-body">
                    <h3 className="svc-card-title">{s.title}</h3>
                    <p className="svc-card-desc">{s.description}</p>
                    <span className="svc-card-link">Learn More <ArrowUpRight size={13} /></span>
                  </div>
                </Link>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ────────────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "96px clamp(24px,6vw,96px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Section>
            <div style={{ textAlign: "center", maxWidth: 540, margin: "0 auto 64px" }}>
              <div className="sec-eyebrow" style={{ justifyContent: "center" }}>Our Foundation</div>
              <h2 className="sec-title" style={{ textAlign: "center" }}>The Principles Behind Every Project</h2>
              <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.7 }}>
                BCR doesn't just build structures — we build trust. These three values are hardwired into everything we do, from the first site visit to the final handshake.
              </p>
            </div>
          </Section>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {VALUES.map(({ Icon, title, description }, i) => (
              <Section key={i}>
                <div className="val-card">
                  <div className="val-icon"><Icon size={22} strokeWidth={1.75} /></div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, color: "var(--ink)", marginBottom: 12 }}>{title}</h3>
                  <p style={{ fontSize: 14.5, color: "var(--muted)", lineHeight: 1.75 }}>{description}</p>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARALLAX BANNER ───────────────────────────────────────────── */}
      <section style={{ position: "relative", padding: "120px clamp(24px,6vw,96px)", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F12c19691924f4e068ec92133f770efa4?format=webp&width=800&height=1200')",
          backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.6) 100%)" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <Section>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20 }}>BCR Constructions — Est. 2000</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
              Every Project is a Promise.<br />We Don't Break Promises.
            </h2>
            <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, transparent, var(--gold), transparent)", margin: "0 auto 24px" }} />
            <p style={{ fontSize: "clamp(15px,2vw,19px)", color: "rgba(255,255,255,0.65)", fontWeight: 300, lineHeight: 1.75, marginBottom: 36 }}>
              For over two decades, BCR Constructions has stood behind every quote, every timeline, and every handshake. That's not marketing — it's 500+ completed projects and thousands of satisfied clients across New York.
            </p>
            <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "14px 32px", borderRadius: 10, background: "var(--gold)", color: "var(--ink)", fontWeight: 700, fontSize: 14, letterSpacing: "0.04em", textDecoration: "none" }}>
              Start Your Project Today <ArrowUpRight size={15} />
            </a>
          </Section>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────── */}
      <section style={{ background: "var(--ink-2)", padding: "96px clamp(24px,6vw,96px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Section>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 56, flexWrap: "wrap", gap: 24 }}>
              <div>
                <div className="sec-eyebrow">Client Stories</div>
                <h2 className="sec-title sec-title-light" style={{ marginBottom: 0 }}>What New Yorkers<br />Say About BCR</h2>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--gold)" color="var(--gold)" />)}
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginLeft: 6 }}>5.0 avg. rating</span>
              </div>
            </div>
          </Section>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <Section key={i}>
                <div className="testi-card">
                  <Quote size={22} color="var(--gold)" style={{ opacity: 0.6 }} />
                  <p className="testi-text">"{t.text}"</p>
                  <div className="testi-stars">
                    {[...Array(t.stars)].map((_, j) => <Star key={j} size={13} fill="var(--gold)" color="var(--gold)" />)}
                  </div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "96px clamp(24px,6vw,96px)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Section>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="sec-eyebrow" style={{ justifyContent: "center" }}>Common Questions</div>
              <h2 className="sec-title" style={{ textAlign: "center" }}>Everything You Need to Know Before You Build</h2>
            </div>
          </Section>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FAQS.map((f, i) => (
              <Section key={i}>
                <div className={`faq-item${openFaq === i ? " open" : ""}`}>
                  <button className="faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="faq-q">{f.q}</span>
                    <ChevronDown size={18} className={`faq-chevron${openFaq === i ? " open" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="faq-ans">{f.a}</div>
                  )}
                </div>
              </Section>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link to="/faq" style={{ fontSize: 14, fontWeight: 600, color: "var(--gold)", textDecoration: "none", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              View All FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────────── */}
      <section id="contact" style={{ background: "var(--ink)", padding: "96px clamp(24px,6vw,96px)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -100, left: -100, width: 400, height: 400, background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="responsive-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>

            <Section>
              <div className="sec-eyebrow">Free Consultation</div>
              <h2 className="sec-title sec-title-light">Ready to Build?<br />Let's Talk.</h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: 44 }}>
                Tell us about your project and we'll get back to you within one business day with a free, no-obligation consultation. No pressure, just expertise.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 44 }}>
                <div className="contact-detail">
                  <div className="contact-detail-icon"><Phone size={16} /></div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 3 }}>Call Us</div>
                    <a href="tel:3472654610" style={{ color: "#fff", textDecoration: "none", fontWeight: 500 }}>347-265-4610</a>
                  </div>
                </div>
                <div className="contact-detail">
                  <div className="contact-detail-icon"><Mail size={16} /></div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 3 }}>Email Us</div>
                    <a href="mailto:info@bcrconstructions.com" style={{ color: "#fff", textDecoration: "none", fontWeight: 500 }}>info@bcrconstructions.com</a>
                  </div>
                </div>
                <div className="contact-detail">
                  <div className="contact-detail-icon"><MapPin size={16} /></div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 3 }}>Service Area</div>
                    <span style={{ fontWeight: 500 }}>New York Metro Area & Surroundings</span>
                  </div>
                </div>
                <div className="contact-detail">
                  <div className="contact-detail-icon"><Building2 size={16} /></div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 3 }}>Business Hours</div>
                    <span style={{ fontWeight: 500 }}>Mon–Fri 8am–6pm &nbsp;|&nbsp; Sat 9am–2pm</span>
                  </div>
                </div>
              </div>

              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "22px 24px" }}>
                {WHY_BCR.map((item, i) => (
                  <div key={i} className="why-item">
                    <CheckCircle2 size={15} color="var(--gold)" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
            </Section>

            <Section>
              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 20, padding: "40px 36px", backdropFilter: "blur(8px)" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 600, color: "#fff", marginBottom: 6 }}>Get a Free Quote</h3>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.4)", marginBottom: 28, lineHeight: 1.6 }}>We respond within 1 business day — usually sooner.</p>

                {formStatus === "success" ? (
                  <div style={{ textAlign: "center", padding: "48px 24px" }}>
                    <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, color: "#fff", marginBottom: 10 }}>Request Received!</h4>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 24 }}>We'll be in touch within one business day.</p>
                    <button onClick={() => setFormStatus("idle")} style={{ fontSize: 13, color: "var(--gold)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Submit another request</button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div className="responsive-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <input className="contact-input" type="text" name="firstName" placeholder="First Name *" value={formData.firstName} onChange={handleFormChange} required />
                      <input className="contact-input" type="text" name="lastName"  placeholder="Last Name"    value={formData.lastName}  onChange={handleFormChange} />
                    </div>
                    <input className="contact-input" type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleFormChange} required />
                    <input className="contact-input" type="tel"   name="phone" placeholder="Phone Number *"  value={formData.phone} onChange={handleFormChange} required />
                    <select className="contact-input contact-select" name="service" value={formData.service} onChange={handleFormChange}>
                      <option value="" disabled>Type of Service</option>
                      <option>Commercial Restoration</option>
                      <option>Condominium</option>
                      <option>Exterior Renovation</option>
                      <option>Flooded Basement</option>
                      <option>Home Design</option>
                      <option>Home Renovation</option>
                      <option>Insurance Claim</option>
                      <option>Interior Renovation</option>
                      <option>Kitchen & Bathroom</option>
                      <option>New / Custom Home</option>
                      <option>Roofing</option>
                      <option>Water Proofing</option>
                      <option>Other / Not Sure</option>
                    </select>
                    <textarea
                      className="contact-input"
                      name="message"
                      rows={4}
                      placeholder="Tell us about your project — location, scope, timeline..."
                      value={formData.message}
                      onChange={handleFormChange}
                      style={{ resize: "vertical" }}
                    />
                    <button className="contact-submit" type="submit" disabled={formStatus === "submitting"}>
                      <span>{formStatus === "submitting" ? "Sending…" : "Send My Request →"}</span>
                    </button>
                    <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.3)", textAlign: "center", lineHeight: 1.6 }}>
                      By submitting you agree to be contacted by BCR Constructions regarding your inquiry. We never share your information.
                    </p>
                  </form>
                )}
              </div>
            </Section>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}