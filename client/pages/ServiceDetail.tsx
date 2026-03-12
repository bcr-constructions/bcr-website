import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParams, Link } from "react-router-dom";
import { ChevronDown, ArrowUpRight, Phone, Mail, CheckCircle2, Shield, Clock, Award, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

/* ─── DATA ──────────────────────────────────────────────────────────── */

const SERVICE_DATA: Record<string, any> = {
  "commercial-restoration": {
    title: "Commercial Restoration",
    subtitle: "Full-scope restoration for offices, retail, and industrial facilities — on time, on budget.",
    description: "Professional restoration services for commercial properties",
    image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F5a045426e9834c1083837830191b43dd?format=webp&width=800&height=1200",
    details: "BCR Constructions specializes in comprehensive commercial restoration services. Whether your property has sustained damage from fire, water, natural disasters, or general wear and tear, our expert team is ready to restore it to its original condition or better.",
    benefits: ["Licensed and insured restoration specialists", "Complete damage assessment and documentation", "Insurance claim assistance and coordination", "Minimal business disruption during restoration", "Quality restoration that meets all codes", "24/7 emergency response available"],
    coverage: ["Office buildings", "Retail centers", "Warehouses", "Industrial facilities", "Multi-tenant properties", "Corporate headquarters"],
    stat1: "24/7", stat1Label: "Emergency Response",
    stat2: "500+", stat2Label: "Projects Completed",
    stat3: "100%", stat3Label: "Code Compliant",
  },
  condominium: {
    title: "Condominium",
    subtitle: "Specialized condo renovation coordinated with HOAs for zero disruption to your community.",
    description: "Specialized condo renovation and restoration",
    image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F4df5c91731e44c9baf935b2f432bd6bc?format=webp&width=800&height=1200",
    details: "We understand the unique challenges of condominium renovations and restoration. Our team has extensive experience working with HOAs and individual unit owners to coordinate projects that maintain community harmony.",
    benefits: ["HOA-compliant project management", "Coordinated unit-by-unit restoration", "Minimal disruption to other residents", "Professional project scheduling", "Quality finishes and modern upgrades", "Comprehensive warranty coverage"],
    coverage: ["Unit interior renovations", "Common area restoration", "Balcony and deck work", "Plumbing and electrical upgrades", "HVAC system installation", "Exterior cladding and waterproofing"],
    stat1: "HOA", stat1Label: "Compliant Projects",
    stat2: "0", stat2Label: "Resident Disruptions",
    stat3: "24+", stat3Label: "Years Experience",
  },
  "exterior-renovation": {
    title: "Exterior Renovation",
    subtitle: "Premium facades, siding, windows, and entranceways — the first impression that lasts decades.",
    description: "Professional exterior renovation services",
    image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F31a04eba0ebf4f92a8e45c7b8c2b7335?format=webp&width=800&height=1200",
    details: "Your property's exterior is the first impression. Our exterior renovation services transform the look and functionality of residential and commercial buildings. We use premium materials and proven techniques to ensure lasting results.",
    benefits: ["Enhanced curb appeal and property value", "Improved weather protection and insulation", "Modern aesthetic with functional design", "Durable, premium-grade materials", "Professional installation by in-house crews", "Long-lasting warranty coverage"],
    coverage: ["Siding replacement and repair", "Roofing installation and repair", "Window and door replacement", "Exterior painting and coating", "Deck and patio construction", "Landscaping and hardscaping"],
    stat1: "30yr", stat1Label: "Material Warranties",
    stat2: "98%", stat2Label: "Client Satisfaction",
    stat3: "500+", stat3Label: "Exteriors Transformed",
  },
  "flooded-basement": {
    title: "Flooded Basement",
    subtitle: "24/7 emergency water removal, waterproofing, and complete basement recovery — fast.",
    description: "Rapid response for flooded basement restoration",
    image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F9279e5ae40f242798c4c039df4376013?format=webp&width=800&height=1200",
    details: "Basement flooding is a serious issue that requires immediate professional attention. BCR Constructions provides emergency water removal, drying, and restoration services to prevent structural damage and mold growth.",
    benefits: ["24/7 emergency response — we pick up", "Advanced water extraction equipment", "Complete moisture removal and drying", "Mold prevention and treatment", "Full structural restoration", "Insurance claim coordination included"],
    coverage: ["Water damage assessment", "Pumping and water removal", "Dehumidification and drying", "Flooring repair and replacement", "Wall and foundation restoration", "Waterproofing solutions"],
    stat1: "2hr", stat1Label: "Avg. Response Time",
    stat2: "24/7", stat2Label: "Emergency Line",
    stat3: "100%", stat3Label: "Mold-Free Guarantee",
  },
  "home-design": {
    title: "Home Design",
    subtitle: "From concept to blueprint — custom design guided by your vision and our 24 years of expertise.",
    description: "Custom home design and planning services",
    image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F08b49164b9854b449840e31a08b51dbc?format=webp&width=800&height=1200",
    details: "Our expert design team works with you to create a custom home that meets your vision and lifestyle needs. From conceptual design to final blueprints, we guide you through every step of the process.",
    benefits: ["Expert design consultation", "3D visualization and renderings", "Custom floor plan development", "Building code compliance guaranteed", "Energy-efficient design options", "Project timeline and budget planning"],
    coverage: ["Residential home design", "Modern and traditional styles", "Sustainable design practices", "Space optimization layouts", "Material and finish selection", "Design-to-build coordination"],
    stat1: "3D", stat1Label: "Renders Included",
    stat2: "100%", stat2Label: "Code Compliant",
    stat3: "24+", stat3Label: "Years Designing",
  },
  "home-renovation": {
    title: "Home Renovation",
    subtitle: "Whole-home transformations guided by your vision, delivered with zero compromises.",
    description: "Complete home renovation solutions",
    image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2Fa1567739cad54517803cdfd699ec2d74?format=webp&width=800&height=1200",
    details: "Whether updating a single room or transforming the entire home, our renovation experts handle every aspect with meticulous attention to detail and an unwavering commitment to quality.",
    benefits: ["Complete project management from day one", "In-house crews — no subcontractor surprises", "On-time, on-budget completion", "Full pricing transparency, no hidden fees", "Modern design trends and premium finishes", "Written warranty on all completed work"],
    coverage: ["Kitchen and bathroom remodels", "Flooring installation and refinishing", "Painting and drywall", "Fixture and appliance installation", "Structural updates and additions", "Whole home renovations"],
    stat1: "500+", stat1Label: "Homes Renovated",
    stat2: "98%", stat2Label: "On-Time Delivery",
    stat3: "0", stat3Label: "Hidden Fees",
  },
  "insurance-claim": {
    title: "Insurance Claim",
    subtitle: "We document, negotiate, and restore — so you don't have to fight your insurer alone.",
    description: "Insurance claim assistance and full restoration",
    image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F366d55088c7045deafb5828812d97984?format=webp&width=800&height=1200",
    details: "Navigating insurance claims can be complex and stressful. Our team assists with complete damage documentation, claim filing, and working directly with adjusters to ensure you receive the full coverage you're entitled to.",
    benefits: ["Professional damage assessment and photos", "Complete documentation package", "Direct adjuster communication", "Claim maximization expertise", "Dispute resolution and advocacy", "Full restoration from claim to completion"],
    coverage: ["Fire damage claims", "Water damage claims", "Storm damage claims", "Vandalism and theft claims", "Natural disaster claims", "Full restoration coordination"],
    stat1: "100%", stat1Label: "Claims Managed",
    stat2: "Direct", stat2Label: "Adjuster Contact",
    stat3: "24+", stat3Label: "Years Experience",
  },
  "interior-renovation": {
    title: "Interior Renovation",
    subtitle: "Layouts, finishes, fixtures, and flow — we breathe new life into interiors across every room.",
    description: "Modern interior renovation and design",
    image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F56135e5b7654466a94e8d875f5f09442?format=webp&width=800&height=1200",
    details: "Transform your living space with our interior renovation services. We focus on creating beautiful, functional spaces that reflect your personal style while maximizing comfort and value.",
    benefits: ["Interior design consultation included", "Space planning and layout optimization", "Custom cabinetry and built-in options", "Flooring and wall treatments", "Architectural lighting design", "Premium finishing touches throughout"],
    coverage: ["Living room renovations", "Bedroom and closet updates", "Home office transformations", "Accent wall and feature design", "Built-in storage solutions", "Custom shelving and cabinetry"],
    stat1: "12+", stat1Label: "Interior Services",
    stat2: "98%", stat2Label: "Client Satisfaction",
    stat3: "500+", stat3Label: "Rooms Transformed",
  },
  "kitchen-bathroom": {
    title: "Kitchen & Bathroom",
    subtitle: "The highest-ROI rooms in your home, reimagined with premium materials and expert installation.",
    description: "Specialized kitchen and bathroom renovation",
    image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2Fffd7dd5c584d4c8fa2fe1e5313f70842?format=webp&width=800&height=1200",
    details: "Kitchens and bathrooms are the heart of any home. Our specialized team creates functional, beautiful spaces with premium finishes and modern conveniences that stand the test of time.",
    benefits: ["Expert design consultation included", "Premium fixture and material selection", "Custom cabinetry built in-house", "Licensed plumbing expertise", "Electrical upgrades to code", "Luxury finishes and materials throughout"],
    coverage: ["Full kitchen remodels", "Bathroom renovations", "Tile and natural stone work", "Plumbing and drainage", "Under-cabinet and accent lighting", "Appliance selection and installation"],
    stat1: "#1", stat1Label: "ROI Renovation",
    stat2: "Premium", stat2Label: "Materials Only",
    stat3: "24+", stat3Label: "Years Expertise",
  },
  "new-home-custom-home": {
    title: "New / Custom Home",
    subtitle: "Ground-up custom builds from blueprint to handover — your vision executed without compromise.",
    description: "Custom home building from the ground up",
    image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F08b49164b9854b449840e31a08b51dbc?format=webp&width=800&height=1200",
    details: "Build your dream home with BCR Constructions. From ground-breaking to final walkthrough, we manage every detail, every trade, and every decision to deliver the home you've always envisioned.",
    benefits: ["Design-build under one roof", "Premium material selection guidance", "Expert in-house craftsmanship", "Precise timeline management", "Full budget oversight and transparency", "Comprehensive post-build warranty"],
    coverage: ["Foundation and structural framing", "Roofing and exterior envelope", "Mechanical and electrical systems", "Interior finishes and millwork", "Smart home technology integration", "Energy-efficient construction systems"],
    stat1: "Ground", stat1Label: "Up Builds",
    stat2: "100%", stat2Label: "In-House Crews",
    stat3: "24+", stat3Label: "Years Building",
  },
  roofing: {
    title: "Roofing",
    subtitle: "Your home's first line of defense — installed, repaired, and maintained by licensed specialists.",
    description: "Professional roofing services and repair",
    image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F0a2a0c4fb8704a4b96fcb5ffbf6c0536?format=webp&width=800&height=1200",
    details: "Your roof is your home's first line of defense. We provide expert roofing services including new installation, repairs, and maintenance to protect your property against New York's demanding climate.",
    benefits: ["Licensed and certified roofing specialists", "Premium, long-life materials used exclusively", "Comprehensive leak prevention systems", "Rapid storm damage response and repair", "Extended roof lifespan guaranteed", "Energy-efficient roofing options available"],
    coverage: ["Asphalt shingle roofing", "Metal roofing installation", "Slate and tile roofing", "Roof inspection and maintenance", "Gutter, flashing, and trim", "Attic ventilation and insulation"],
    stat1: "30yr", stat1Label: "Roof Warranties",
    stat2: "24/7", stat2Label: "Storm Response",
    stat3: "500+", stat3Label: "Roofs Installed",
  },
  "water-proofing": {
    title: "Water Proofing",
    subtitle: "Advanced moisture barriers and drainage systems that protect your foundation for life.",
    description: "Advanced waterproofing solutions",
    image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F7c3255273c564fef88ac2f23fd792632?format=webp&width=800&height=1200",
    details: "Water damage can be catastrophically costly and dangerous. Our waterproofing solutions protect your property from moisture intrusion, foundation damage, and mold growth using the most advanced materials available.",
    benefits: ["Professional moisture and risk assessment", "Advanced waterproofing materials and systems", "Long-term protection with written guarantee", "Complete mold prevention treatment", "Foundation preservation and sealing", "Interior and exterior solution options"],
    coverage: ["Basement waterproofing systems", "Foundation crack sealing", "Exterior drainage systems", "Interior moisture barriers", "Sump pump installation and service", "Dehumidification systems"],
    stat1: "Life", stat1Label: "Warranty Available",
    stat2: "100%", stat2Label: "Mold-Free Results",
    stat3: "24+", stat3Label: "Years Protecting",
  },
};

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

/* ─── COMPONENT ─────────────────────────────────────────────────────── */

export default function ServiceDetail() {
  const { service } = useParams();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Contact form state
  const [sdForm, setSdForm] = useState({ firstName: "", lastName: "", email: "", phone: "", service: "", message: "" });
  const [sdStatus, setSdStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSdChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setSdForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSdSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sdForm.firstName || !sdForm.email || !sdForm.phone) return;
    setSdStatus("submitting");
    await new Promise(res => setTimeout(res, 1200));
    setSdStatus("success");
    setSdForm({ firstName: "", lastName: "", email: "", phone: "", service: "", message: "" });
  };

  const serviceKey = service?.toLowerCase().replace(/\s+/g, "-") || "";
  const data = SERVICE_DATA[serviceKey];

  if (!data) {
    return (
      <div style={{ fontFamily: "'Outfit', sans-serif", background: "#fff" }}>
        <Header />
        <main style={{ paddingTop: "var(--header-h, 102px)" }}>
          <div style={{ maxWidth: 640, margin: "0 auto", padding: "120px 32px", textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold, #C9A84C)", marginBottom: 16 }}>404 — Not Found</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 700, color: "#0A0A0A", marginBottom: 16, lineHeight: 1.1 }}>Service Details Coming Soon</h1>
            <p style={{ fontSize: 17, color: "#666", lineHeight: 1.75, marginBottom: 40 }}>
              We're building out detailed information for this service. In the meantime, please contact us directly.
            </p>
            <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 10, background: "#0A0A0A", color: "#fff", fontWeight: 600, fontSize: 14, textDecoration: "none", letterSpacing: "0.03em" }}>
              Back to Home <ArrowUpRight size={14} />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const faqs = [
    { question: `What does ${data.title} involve?`, answer: data.details },
    { question: "How long does a typical project take?", answer: "Project duration depends on the scope of work. We'll provide a detailed, written timeline during your free on-site consultation — and we hold ourselves to it." },
    { question: "Do you work with insurance claims?", answer: "Yes. BCR offers a fully managed insurance claim service. We document damage, interface directly with your insurer, provide restoration estimates, and execute the work — minimizing your stress throughout." },
    { question: "Are you licensed and insured?", answer: "Absolutely. BCR Constructions is fully licensed in New York, carries comprehensive general liability insurance, and all crew members are covered under workers' compensation." },
    { question: "Do you use subcontractors?", answer: "No. All BCR work is performed by our own in-house crews — the same team from start to finish. This means consistent quality, direct accountability, and no subcontractor surprises." },
  ];

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
          --off:      #F8F5F0;
          --muted:    #666;
          --border:   rgba(0,0,0,0.08);
          --ease:     cubic-bezier(0.22,1,0.36,1);
        }

        .sd-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 500; letter-spacing: 0.04em;
          color: rgba(255,255,255,0.5);
        }
        .sd-breadcrumb a { color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.2s; }
        .sd-breadcrumb a:hover { color: var(--gold); }
        .sd-breadcrumb-sep { color: rgba(255,255,255,0.25); }

        .sd-eyebrow {
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--gold); display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
        }
        .sd-eyebrow::before { content:''; width: 24px; height: 1.5px; background: var(--gold); }

        .sd-sec-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 3.5vw, 44px); font-weight: 700;
          color: var(--ink); line-height: 1.1; margin-bottom: 16px;
        }

        /* benefit item */
        .sd-benefit {
          display: flex; align-items: flex-start; gap: 13px;
          padding: 14px 0; border-bottom: 1px solid var(--border);
          font-size: 15px; font-weight: 500; color: #333; line-height: 1.5;
        }
        .sd-benefit:last-child { border-bottom: none; }

        /* coverage pill */
        .sd-coverage-pill {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 18px; border-radius: 12px;
          background: #fff; border: 1px solid var(--border);
          font-size: 14px; font-weight: 500; color: #333;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .sd-coverage-pill:hover {
          border-color: var(--gold);
          box-shadow: 0 6px 20px rgba(201,168,76,0.12);
          transform: translateY(-2px);
        }

        /* process step */
        .sd-step-num {
          width: 56px; height: 56px; border-radius: 50%;
          background: var(--ink); color: var(--gold);
          font-family: 'Playfair Display', serif;
          font-size: 22px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 18px; flex-shrink: 0;
          border: 2px solid rgba(201,168,76,0.3);
          transition: background 0.25s, border-color 0.25s;
          position: relative; z-index: 1;
        }
        .sd-step:hover .sd-step-num {
          background: var(--gold); color: var(--ink); border-color: var(--gold);
        }
        .sd-step {
          text-align: center; padding: 32px 24px; border-radius: 16px;
          border: 1px solid var(--border);
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
          background: #fff; position: relative; overflow: hidden;
        }
        .sd-step:hover {
          border-color: var(--gold);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
          transform: translateY(-3px);
        }
        .sd-step::before {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px; background: linear-gradient(90deg, transparent, var(--gold), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .sd-step:hover::before { opacity: 1; }

        /* faq */
        .sd-faq-item {
          border: 1px solid var(--border); border-radius: 14px;
          overflow: hidden; transition: border-color 0.25s, box-shadow 0.25s;
        }
        .sd-faq-item.open {
          border-color: var(--gold);
          box-shadow: 0 4px 24px rgba(201,168,76,0.1);
        }
        .sd-faq-btn {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          padding: 20px 26px; background: none; border: none; cursor: pointer; text-align: left;
          font-family: 'Outfit', sans-serif; gap: 20px;
          transition: background 0.2s;
        }
        .sd-faq-btn:hover { background: rgba(201,168,76,0.03); }
        .sd-faq-num {
          font-family: 'Playfair Display', serif;
          font-size: 13px; font-weight: 600; color: var(--gold);
          opacity: 0.6; flex-shrink: 0; min-width: 24px;
        }
        .sd-faq-q { font-size: 15.5px; font-weight: 600; color: var(--ink); line-height: 1.4; flex: 1; }
        .sd-faq-chevron { color: var(--gold); flex-shrink: 0; transition: transform 0.3s var(--ease); }
        .sd-faq-chevron.open { transform: rotate(180deg); }
        .sd-faq-ans {
          padding: 0 26px 22px 62px;
          font-size: 14.5px; color: var(--muted); line-height: 1.8;
          border-top: 1px solid var(--border); padding-top: 18px;
          margin-top: 0;
        }

                /* ── responsive grids ── */
        @media (max-width: 768px) {
          .responsive-2col { grid-template-columns: 1fr !important; gap: 40px !important; }
          .responsive-form-grid { grid-template-columns: 1fr !important; }
          .responsive-4col { grid-template-columns: repeat(2, 1fr) !important; }
        }

        /* stat card */
        .sd-stat {
          padding: 28px 24px; border-radius: 16px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          text-align: center;
          transition: border-color 0.25s, background 0.25s;
        }
        .sd-stat:hover {
          border-color: rgba(201,168,76,0.4);
          background: rgba(201,168,76,0.06);
        }
        .sd-stat-val {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 3.5vw, 42px); font-weight: 700;
          color: var(--gold); line-height: 1; margin-bottom: 6px;
        }
        .sd-stat-label {
          font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(255,255,255,0.5);
        }

        /* cta input */
        .sd-input {
          width: 100%; padding: 13px 16px; border-radius: 10px;
          border: 1.5px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.06);
          color: #fff; font-family: 'Outfit', sans-serif; font-size: 14px;
          outline: none; transition: border-color 0.2s, background 0.2s;
          box-sizing: border-box;
        }
        .sd-input::placeholder { color: rgba(255,255,255,0.35); }
        .sd-input:focus { border-color: var(--gold); background: rgba(255,255,255,0.09); }

        .sd-submit {
          width: 100%; padding: 14px; border-radius: 10px;
          background: var(--gold); color: var(--ink);
          font-family: 'Outfit', sans-serif;
          font-size: 15px; font-weight: 700; letter-spacing: 0.04em;
          border: none; cursor: pointer; position: relative; overflow: hidden;
          transition: color 0.3s;
        }
        .sd-submit::before {
          content:''; position:absolute; inset:0;
          background: var(--ink); transform: scaleX(0); transform-origin: left;
          transition: transform 0.35s var(--ease);
        }
        .sd-submit:hover { color: var(--gold); }
        .sd-submit:hover::before { transform: scaleX(1); }
        .sd-submit span { position: relative; z-index: 1; }

        .sd-contact-btn {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 13px 26px; border-radius: 10px;
          font-size: 14px; font-weight: 700; letter-spacing: 0.04em;
          text-decoration: none; transition: all 0.25s;
          position: relative; overflow: hidden;
        }
        .sd-contact-btn-gold {
          background: var(--gold); color: var(--ink);
          box-shadow: 0 8px 24px rgba(201,168,76,0.3);
        }
        .sd-contact-btn-gold:hover { background: var(--gold-lt); transform: translateY(-2px); box-shadow: 0 12px 32px rgba(201,168,76,0.4); }
        .sd-contact-btn-ghost {
          border: 1.5px solid rgba(255,255,255,0.25);
          color: #fff; backdrop-filter: blur(6px);
        }
        .sd-contact-btn-ghost:hover { border-color: var(--gold); color: var(--gold); background: rgba(201,168,76,0.08); }
      `}</style>

      <Header />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", minHeight: 560, background: "#000", paddingTop: "var(--header-h, 102px)" }}>
        {/* BG image */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url('${data.image}')`,
          backgroundSize: "cover", backgroundPosition: "center",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.3) 100%)" }} />
        {/* Gold line accent */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, var(--gold) 0%, rgba(201,168,76,0.3) 60%, transparent 100%)" }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "72px clamp(24px,6vw,96px) 80px" }}>
          {/* Breadcrumb */}
          <div className="sd-breadcrumb" style={{ marginBottom: 32 }}>
            <Link to="/" className="sd-breadcrumb">Home</Link>
            <ChevronRight size={13} className="sd-breadcrumb-sep" />
            <Link to="/services" className="sd-breadcrumb">Services</Link>
            <ChevronRight size={13} className="sd-breadcrumb-sep" />
            <span style={{ color: "var(--gold)" }}>{data.title}</span>
          </div>

          <div style={{ maxWidth: 720 }}>
            <div className="sd-eyebrow" style={{ color: "var(--gold)" }}>
              <span style={{ width: 24, height: 1.5, background: "var(--gold)", display: "block" }} />
              BCR Constructions — Service
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(44px, 6vw, 76px)", fontWeight: 700, lineHeight: 1.05,
              color: "#fff", marginBottom: 20,
              textShadow: "0 4px 32px rgba(0,0,0,0.4)",
            }}>
              {data.title}
            </h1>
            <p style={{ fontSize: "clamp(15px, 2vw, 19px)", fontWeight: 300, color: "rgba(255,255,255,0.78)", lineHeight: 1.7, maxWidth: 560, marginBottom: 40 }}>
              {data.subtitle}
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="#contact" className="sd-contact-btn sd-contact-btn-gold">
                Get a Free Quote <ArrowUpRight size={15} />
              </a>
              <a href="tel:3472654610" className="sd-contact-btn sd-contact-btn-ghost">
                <Phone size={14} /> 347-265-4610
              </a>
            </div>
          </div>

          {/* Stats strip */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 56, maxWidth: 540 }}>
            {[
              { val: data.stat1, label: data.stat1Label },
              { val: data.stat2, label: data.stat2Label },
              { val: data.stat3, label: data.stat3Label },
            ].map((s, i) => (
              <div key={i} className="sd-stat">
                <div className="sd-stat-val">{s.val}</div>
                <div className="sd-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OVERVIEW + BENEFITS ────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "96px clamp(24px,6vw,96px)" }}>
        <div className="responsive-2col" style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>

          {/* Left — overview */}
          <Reveal>
            <div className="sd-eyebrow">Overview</div>
            <h2 className="sd-sec-title">What We Deliver</h2>
            <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.85, marginBottom: 32 }}>
              {data.details}
            </p>
            {/* Trust badges */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[
                { Icon: Shield, label: "Licensed & Insured" },
                { Icon: Award, label: "24+ Years Experience" },
                { Icon: Clock, label: "On-Time Delivery" },
              ].map(({ Icon, label }, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "9px 16px", borderRadius: 100,
                  background: "var(--gold-dim, rgba(201,168,76,0.1))",
                  border: "1px solid rgba(201,168,76,0.25)",
                  fontSize: 12.5, fontWeight: 600, color: "#333", letterSpacing: "0.03em",
                }}>
                  <Icon size={14} color="var(--gold)" strokeWidth={2} />
                  {label}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right — benefits */}
          <Reveal delay={120}>
            <div className="sd-eyebrow">Key Benefits</div>
            <h2 className="sd-sec-title">Why Choose BCR</h2>
            <div>
              {data.benefits.map((benefit: string, i: number) => (
                <div key={i} className="sd-benefit">
                  <CheckCircle2 size={17} color="var(--gold)" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }} />
                  {benefit}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── COVERAGE ──────────────────────────────────────────────────── */}
      <section style={{ background: "var(--off, #F8F5F0)", padding: "80px clamp(24px,6vw,96px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", maxWidth: 540, margin: "0 auto 52px" }}>
              <div className="sd-eyebrow" style={{ justifyContent: "center" }}>Scope of Work</div>
              <h2 className="sd-sec-title" style={{ textAlign: "center", marginBottom: 12 }}>What We Handle</h2>
              <p style={{ fontSize: 15.5, color: "var(--muted)", lineHeight: 1.7 }}>Every aspect of {data.title.toLowerCase()} — handled in-house by our specialist crews.</p>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
            {data.coverage.map((item: string, i: number) => (
              <Reveal key={i} delay={i * 60}>
                <div className="sd-coverage-pill">
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />
                  {item}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "96px clamp(24px,6vw,96px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", maxWidth: 520, margin: "0 auto 56px" }}>
              <div className="sd-eyebrow" style={{ justifyContent: "center" }}>How It Works</div>
              <h2 className="sd-sec-title" style={{ textAlign: "center" }}>Our Process</h2>
              <p style={{ fontSize: 15.5, color: "var(--muted)", lineHeight: 1.7 }}>Every BCR project follows the same proven four-step framework — no surprises, no shortcuts.</p>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {[
              { step: "01", title: "Free Assessment", desc: "On-site inspection, damage evaluation, and a detailed written estimate at no cost." },
              { step: "02", title: "Custom Plan", desc: "A tailored project plan, timeline, and itemized cost breakdown — no hidden fees." },
              { step: "03", title: "Expert Execution", desc: "In-house crews handle every trade. Same team, same standards, from start to finish." },
              { step: "04", title: "Final Walkthrough", desc: "You inspect every detail. We don't close out until you're completely satisfied." },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="sd-step">
                  <div className="sd-step-num">{item.step}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, color: "var(--ink)", marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--off, #F8F5F0)", padding: "96px clamp(24px,6vw,96px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <div className="sd-eyebrow" style={{ justifyContent: "center" }}>Common Questions</div>
              <h2 className="sd-sec-title" style={{ textAlign: "center" }}>Frequently Asked</h2>
            </div>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className={`sd-faq-item${expandedFaq === i ? " open" : ""}`}>
                  <button className="sd-faq-btn" onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}>
                    <span className="sd-faq-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="sd-faq-q">{faq.question}</span>
                    <ChevronDown size={18} className={`sd-faq-chevron${expandedFaq === i ? " open" : ""}`} />
                  </button>
                  {expandedFaq === i && (
                    <div className="sd-faq-ans">{faq.answer}</div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / CONTACT ─────────────────────────────────────────────── */}
      <section id="contact" style={{ background: "var(--ink, #0A0A0A)", padding: "96px clamp(24px,6vw,96px)", position: "relative", overflow: "hidden" }}>
        {/* Decorative glows */}
        <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -100, left: -50, width: 380, height: 380, background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="responsive-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>

            {/* Left */}
            <Reveal>
              <div className="sd-eyebrow">Free Consultation</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
                Ready to Start<br />Your Project?
              </h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: 40 }}>
                Tell us about your {data.title.toLowerCase()} needs and we'll respond within one business day with a free, no-obligation quote.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  { Icon: Phone, label: "Call Us", value: "347-265-4610", href: "tel:3472654610" },
                  { Icon: Mail,  label: "Email Us", value: "info@bcrconstructions.com", href: "mailto:info@bcrconstructions.com" },
                ].map(({ Icon, label, value, href }, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 11, background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)", flexShrink: 0 }}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 2 }}>{label}</div>
                      <a href={href} style={{ fontSize: 14.5, fontWeight: 500, color: "#fff", textDecoration: "none" }}>{value}</a>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Right — Form */}
            <Reveal delay={120}>
              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 20, padding: "40px 36px", backdropFilter: "blur(8px)" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 600, color: "#fff", marginBottom: 6 }}>Get a Free Quote</h3>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.4)", marginBottom: 28, lineHeight: 1.6 }}>We respond within 1 business day — usually sooner.</p>
                {sdStatus === "success" ? (
                  <div style={{ textAlign: "center", padding: "48px 24px" }}>
                    <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, color: "#fff", marginBottom: 10 }}>Request Received!</h4>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 24 }}>We'll be in touch within one business day.</p>
                    <button onClick={() => setSdStatus("idle")} style={{ fontSize: 13, color: "var(--gold)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Submit another request</button>
                  </div>
                ) : (
                <form onSubmit={handleSdSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div className="responsive-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <input className="sd-input" type="text" name="firstName" placeholder="First Name *" value={sdForm.firstName} onChange={handleSdChange} required />
                    <input className="sd-input" type="text" name="lastName"  placeholder="Last Name"    value={sdForm.lastName}  onChange={handleSdChange} />
                  </div>
                  <input className="sd-input" type="email" name="email" placeholder="Email Address *" value={sdForm.email} onChange={handleSdChange} required />
                  <input className="sd-input" type="tel"   name="phone" placeholder="Phone Number *"  value={sdForm.phone} onChange={handleSdChange} required />
                  <select className="sd-input" name="service" value={sdForm.service || data.title.replace(/&amp;/g, "&")} onChange={handleSdChange} style={{ appearance: "none" }}>
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
                  <textarea className="sd-input" name="message" rows={4} placeholder="Tell us about your project — location, scope, timeline..." value={sdForm.message} onChange={handleSdChange} style={{ resize: "vertical" }} />
                  <button className="sd-submit" type="submit" disabled={sdStatus === "submitting"}>
                    <span>{sdStatus === "submitting" ? "Sending…" : "Send My Request →"}</span>
                  </button>
                  <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.3)", textAlign: "center", lineHeight: 1.6 }}>
                    We never share your information. You'll hear from us within 1 business day.
                  </p>
                </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}