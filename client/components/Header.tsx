import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown, Menu, X, ArrowUpRight, Phone,
  Building2, Building, Home, Droplets, PenLine,
  Wrench, FileText, Sofa, UtensilsCrossed, HousePlus,
  HardHat, ShieldCheck, LucideIcon,
} from "lucide-react";

const SERVICES: { name: string; path: string; Icon: LucideIcon; tag: string }[] = [
  { name: "Commercial Restoration",  path: "/services/commercial-restoration",  Icon: Building2,        tag: "Popular" },
  { name: "Condominium",             path: "/services/condominium",              Icon: Building,         tag: "" },
  { name: "Exterior Renovation",     path: "/services/exterior-renovation",      Icon: Home,             tag: "" },
  { name: "Flooded Basement",        path: "/services/flooded-basement",         Icon: Droplets,         tag: "Urgent" },
  { name: "Home Design",             path: "/services/home-design",              Icon: PenLine,          tag: "" },
  { name: "Home Renovation",         path: "/services/home-renovation",          Icon: Wrench,           tag: "Popular" },
  { name: "Insurance Claim",         path: "/services/insurance-claim",          Icon: FileText,         tag: "" },
  { name: "Interior Renovation",     path: "/services/interior-renovation",      Icon: Sofa,             tag: "" },
  { name: "Kitchen & Bathroom",      path: "/services/kitchen-bathroom",         Icon: UtensilsCrossed,  tag: "Popular" },
  { name: "New / Custom Home",       path: "/services/new-home-custom-home",     Icon: HousePlus,        tag: "" },
  { name: "Roofing",                 path: "/services/roofing",                  Icon: HardHat,          tag: "" },
  { name: "Water Proofing",          path: "/services/water-proofing",           Icon: ShieldCheck,      tag: "" },
];

const NAV_LINKS = [
  { label: "Home",     to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Our Team", to: "/staff" },
];

const SERVICE_DESCRIPTIONS: Record<string, string> = {
  "Commercial Restoration":  "Full-scale restoration for offices, retail, and industrial spaces with minimal downtime.",
  "Condominium":             "Tailored condo renovation packages — from single units to entire floors.",
  "Exterior Renovation":     "Curb appeal transformations: siding, facades, windows, and landscaping.",
  "Flooded Basement":        "24/7 emergency response. Waterproofing, drainage, and full basement recovery.",
  "Home Design":             "Concept to blueprint — our designers craft spaces that inspire everyday living.",
  "Home Renovation":         "Whole-home makeovers that respect your timeline and your budget.",
  "Insurance Claim":         "We navigate the claims process so you don't have to. Stress-free restoration.",
  "Interior Renovation":     "Breathing new life into interiors — layouts, finishes, and fixtures.",
  "Kitchen & Bathroom":      "The highest-ROI rooms in your home, reimagined with premium craftsmanship.",
  "New / Custom Home":       "Ground-up builds designed exactly to your vision. No compromises.",
  "Roofing":                 "Durable installs, expert repairs, and storm damage recovery for any roof type.",
  "Water Proofing":          "Keep moisture out for good with industry-leading waterproofing solutions.",
};

const BCR_LOGO = "/images/bcr-logo-7.png";

export default function Header() {
  const [scrolled,            setScrolled]            = useState(false);
  const [servicesOpen,        setServicesOpen]        = useState(false);
  const [mobileOpen,          setMobileOpen]          = useState(false);
  const [mobileServicesOpen,  setMobileServicesOpen]  = useState(false);
  const [activeService,       setActiveService]       = useState(SERVICES[0]);
  const [headerHeight,        setHeaderHeight]        = useState(102);
  const dropdownRef  = useRef<HTMLDivElement>(null);
  const closeTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setServicesOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Measure actual header height so drawer always aligns perfectly
  useEffect(() => {
    const measure = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const openServices  = () => { clearTimeout(closeTimer.current!); setServicesOpen(true); };
  const closeServices = () => { closeTimer.current = setTimeout(() => setServicesOpen(false), 160); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Outfit:wght@300;400;500;600&display=swap');

        :root {
          --gold:       #C9A84C;
          --gold-lt:    #E3C26A;
          --gold-dim:   rgba(201,168,76,0.12);
          --gold-border:rgba(201,168,76,0.25);
          --ink:        #0A0A0A;
          --ink-2:      #111;
          --ink-3:      #1C1C1C;
          --white:      #FFFFFF;
          --off-white:  #F7F4EF;
          --muted:      #888;
          --border:     rgba(255,255,255,0.08);
          --r-lg:       16px;
          --r-xl:       22px;
          --ease-out:   cubic-bezier(0.22,1,0.36,1);
        }

        .hdr { font-family: 'Outfit', sans-serif; position: fixed; top:0; left:0; right:0; z-index:999; }

        /* ── ticker ── */
        .hdr-ticker {
          background: var(--ink);
          border-bottom: 1px solid var(--gold-border);
          height: 34px;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        .hdr-ticker-track {
          display: inline-flex;
          gap: 72px;
          animation: hdr-scroll 32s linear infinite;
          white-space: nowrap;
        }
        .hdr-ticker-track:hover { animation-play-state: paused; }
        @keyframes hdr-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .hdr-ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.85);
        }
        .hdr-ticker-dot {
          width: 3px; height: 3px;
          background: var(--gold);
          border-radius: 50%;
          opacity: 0.6;
        }
        .hdr-ticker-phone {
          margin-left: auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: var(--gold);
          white-space: nowrap;
          border-left: 1px solid var(--gold-border);
          height: 100%;
          flex-shrink: 0;
          text-decoration: none;
          transition: color 0.2s;
        }
        .hdr-ticker-phone:hover { color: var(--gold-lt); }

        /* ── nav bar ── */
        .hdr-nav {
          background: var(--ink-2);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: background 0.35s, box-shadow 0.35s;
        }
        .hdr-nav.scrolled {
          background: rgba(10,10,10,0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 8px 40px rgba(0,0,0,0.45);
          border-bottom-color: var(--gold-border);
        }
        .hdr-inner {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 36px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* ── logo ── */
        .hdr-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          flex-shrink: 0;
        }
        .hdr-logo-img {
          height: 44px;
          width: auto;
          filter: drop-shadow(0 1px 3px rgba(0,0,0,0.4));
          transition: filter 0.3s var(--ease-out), transform 0.4s var(--ease-out), opacity 0.3s;
          opacity: 0.92;
        }
        .hdr-logo:hover .hdr-logo-img {
          filter:
            drop-shadow(0 0 10px rgba(201,168,76,0.3))
            drop-shadow(0 1px 3px rgba(0,0,0,0.5));
          transform: scale(1.03);
          opacity: 1;
        }

        /* ── desktop links ── */
        .hdr-links { display: flex; align-items: center; gap: 2px; }

        .hdr-link {
          position: relative;
          font-size: 13.5px; font-weight: 500;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          padding: 7px 14px;
          border-radius: 9px;
          letter-spacing: 0.025em;
          transition: color 0.2s, background 0.2s;
        }
        .hdr-link::after {
          content: '';
          position: absolute; bottom: 5px; left: 14px; right: 14px;
          height: 1.5px;
          background: var(--gold);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s var(--ease-out);
          border-radius: 2px;
        }
        .hdr-link:hover { color: var(--white); background: rgba(255,255,255,0.06); }
        .hdr-link:hover::after { transform: scaleX(1); }

        /* ── services trigger ── */
        .hdr-svc-btn {
          display: flex; align-items: center; gap: 5px;
          font-family: 'Outfit', sans-serif;
          font-size: 13.5px; font-weight: 500;
          color: rgba(255,255,255,0.75);
          background: none; border: none; cursor: pointer;
          padding: 7px 14px; border-radius: 9px;
          letter-spacing: 0.025em;
          position: relative;
          transition: color 0.2s, background 0.2s;
        }
        .hdr-svc-btn::after {
          content: '';
          position: absolute; bottom: 5px; left: 14px; right: 14px;
          height: 1.5px; background: var(--gold);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s var(--ease-out);
          border-radius: 2px;
        }
        .hdr-svc-btn:hover, .hdr-svc-btn.open {
          color: var(--white); background: rgba(255,255,255,0.06);
        }
        .hdr-svc-btn:hover::after, .hdr-svc-btn.open::after { transform: scaleX(1); }
        .hdr-chevron { color: var(--gold); transition: transform 0.3s var(--ease-out); }
        .hdr-chevron.open { transform: rotate(180deg); }

        /* ── mega menu ── */
        .hdr-mega {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 800px;
          background: var(--ink-3);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: var(--r-xl);
          box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.06);
          opacity: 0; visibility: hidden; pointer-events: none;
          transform: translateY(-8px) scale(0.99);
          transition: opacity 0.28s var(--ease-out), transform 0.28s var(--ease-out), visibility 0.28s;
          display: flex;
          overflow: hidden;
        }
        .hdr-mega.open {
          opacity: 1; visibility: visible; pointer-events: all;
          transform: translateY(0) scale(1);
        }

        .hdr-mega-grid {
          flex: 1; min-width: 0;
          padding: 16px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 3px;
          align-content: start;
        }

        .hdr-mega-item {
          display: flex; align-items: flex-start; gap: 10px;
          text-decoration: none;
          padding: 10px 11px;
          border-radius: 10px;
          transition: background 0.18s;
          position: relative;
        }
        .hdr-mega-item:hover, .hdr-mega-item.active {
          background: rgba(255,255,255,0.06);
        }
        .hdr-mega-item.active { background: var(--gold-dim); }

        .hdr-mega-icon {
          display: flex; align-items: center; justify-content: center;
          width: 30px; height: 30px; flex-shrink: 0;
          border-radius: 8px;
          background: rgba(255,255,255,0.06);
          color: var(--gold);
          margin-top: 1px;
          transition: background 0.18s, color 0.18s;
        }
        .hdr-mega-item:hover .hdr-mega-icon,
        .hdr-mega-item.active .hdr-mega-icon {
          background: var(--gold-dim);
          color: var(--gold-lt);
        }
        .hdr-mega-text { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
        .hdr-mega-name {
          font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,0.88);
          line-height: 1.3;
          transition: color 0.18s;
        }
        .hdr-mega-item:hover .hdr-mega-name,
        .hdr-mega-item.active .hdr-mega-name { color: var(--gold-lt); }

        .hdr-mega-tag {
          display: inline-block;
          font-size: 9px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--gold); background: var(--gold-dim);
          border: 1px solid var(--gold-border);
          border-radius: 4px; padding: 1px 5px;
          line-height: 1.5;
          width: fit-content;
        }

        .hdr-mega-divider {
          width: 1px;
          background: linear-gradient(to bottom, transparent 5%, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent 95%);
          flex-shrink: 0;
        }

        .hdr-mega-preview {
          width: 240px; flex-shrink: 0;
          padding: 28px 22px;
          display: flex; flex-direction: column;
          background: linear-gradient(160deg, rgba(201,168,76,0.07) 0%, rgba(10,10,10,0) 60%);
          position: relative;
          overflow: hidden;
        }
        .hdr-mega-preview::before {
          content: '';
          position: absolute; top: -60px; right: -60px;
          width: 180px; height: 180px;
          background: radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .hdr-preview-eyebrow {
          font-size: 9.5px; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 12px;
          display: flex; align-items: center; gap: 7px;
        }
        .hdr-preview-eyebrow::before {
          content: ''; display: block;
          width: 18px; height: 1px; background: var(--gold); opacity: 0.5;
        }

        .hdr-preview-name {
          font-family: 'Playfair Display', serif;
          font-size: 21px; font-weight: 600;
          color: var(--white); line-height: 1.2;
          margin-bottom: 10px;
          transition: all 0.2s;
        }
        .hdr-preview-desc {
          font-size: 12.5px; color: rgba(255,255,255,0.5);
          line-height: 1.65; flex: 1;
        }
        .hdr-preview-cta {
          display: inline-flex; align-items: center; gap: 6px;
          margin-top: 20px;
          font-size: 11.5px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--gold); text-decoration: none;
          transition: gap 0.25s var(--ease-out), color 0.2s;
        }
        .hdr-preview-cta:hover { gap: 10px; color: var(--gold-lt); }
        .hdr-preview-footer {
          margin-top: 20px; padding-top: 14px;
          border-top: 1px solid rgba(255,255,255,0.07);
          font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.25);
        }

        /* ── CTA button ── */
        .hdr-cta {
          position: relative;
          display: inline-flex; align-items: center; gap: 7px;
          padding: 9px 22px; border-radius: 10px;
          background: var(--gold);
          color: var(--ink); font-size: 13.5px; font-weight: 700;
          text-decoration: none; letter-spacing: 0.03em;
          overflow: hidden; margin-left: 10px;
          border: 1.5px solid var(--gold);
          transition: color 0.3s, border-color 0.3s;
        }
        .hdr-cta span { position: relative; z-index: 1; }
        .hdr-cta svg { position: relative; z-index: 1; transition: transform 0.25s var(--ease-out); }
        .hdr-cta:hover svg { transform: translate(2px, -2px); }
        .hdr-cta::before {
          content: '';
          position: absolute; inset: 0;
          background: var(--ink);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.35s var(--ease-out);
        }
        .hdr-cta:hover { color: var(--gold); border-color: rgba(201,168,76,0.4); }
        .hdr-cta:hover::before { transform: scaleX(1); }

        /* ── hamburger ── */
        .hdr-burger {
          display: none;
          background: none; border: none; cursor: pointer;
          color: rgba(255,255,255,0.8); padding: 7px; border-radius: 9px;
          transition: background 0.2s, color 0.2s;
        }
        .hdr-burger:hover { background: rgba(255,255,255,0.08); color: var(--white); }

        /* ── mobile overlay ── */
        .hdr-overlay {
          position: fixed; left: 0; right: 0; bottom: 0; z-index: 997;
          background: rgba(0,0,0,0.65);
          opacity: 0; pointer-events: none;
          transition: opacity 0.35s;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
        .hdr-overlay.open { opacity: 1; pointer-events: all; }

        /* ── mobile drawer ── */
        .hdr-drawer {
          position: fixed; right: 0; bottom: 0; z-index: 998;
          width: min(360px, 92vw);
          background: var(--ink-3);
          border-left: 1px solid rgba(255,255,255,0.07);
          border-top: 1px solid var(--gold-border);
          display: flex; flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.38s var(--ease-out);
          box-shadow: -20px 0 60px rgba(0,0,0,0.6);
          overflow-y: auto;
        }
        .hdr-drawer.open { transform: translateX(0); }

        /* ── drawer close row ── */
        .hdr-drawer-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          flex-shrink: 0;
          background: rgba(0,0,0,0.2);
        }
        .hdr-drawer-label {
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }
        .hdr-drawer-close {
          background: rgba(255,255,255,0.06); border: none; cursor: pointer;
          color: rgba(255,255,255,0.7); padding: 8px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, color 0.2s;
        }
        .hdr-drawer-close:hover { background: rgba(255,255,255,0.12); color: var(--white); }

        .hdr-drawer-body { overflow-y: auto; flex: 1; padding: 8px 0; }

        .hdr-mob-link {
          display: flex; align-items: center; justify-content: space-between;
          font-size: 16px; font-weight: 500;
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          padding: 14px 22px;
          transition: color 0.2s, padding-left 0.25s var(--ease-out), background 0.2s;
        }
        .hdr-mob-link:hover { color: var(--white); padding-left: 28px; background: rgba(255,255,255,0.04); }

        .hdr-mob-svc-btn {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          font-family: 'Outfit', sans-serif;
          font-size: 16px; font-weight: 500;
          color: rgba(255,255,255,0.8); background: none;
          border: none; cursor: pointer;
          padding: 14px 22px;
          transition: color 0.2s, background 0.2s;
        }
        .hdr-mob-svc-btn:hover { color: var(--white); background: rgba(255,255,255,0.04); }

        .hdr-mob-svc-list {
          overflow: hidden;
          transition: max-height 0.38s var(--ease-out);
          background: rgba(0,0,0,0.25);
          border-top: 1px solid rgba(255,255,255,0.04);
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .hdr-mob-svc-item {
          display: flex; align-items: center; gap: 11px;
          font-size: 13.5px; color: rgba(255,255,255,0.6);
          text-decoration: none;
          padding: 11px 28px;
          transition: color 0.2s, background 0.2s;
          border-bottom: 1px solid rgba(255,255,255,0.03);
        }
        .hdr-mob-svc-item:hover { color: var(--gold-lt); background: rgba(201,168,76,0.05); }
        .hdr-mob-svc-item-icon {
          display: flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; flex-shrink: 0;
          border-radius: 7px;
          background: rgba(255,255,255,0.05);
          color: var(--gold);
        }

        .hdr-mob-svc-tag {
          font-size: 8.5px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--gold); background: var(--gold-dim);
          border: 1px solid var(--gold-border);
          border-radius: 3px; padding: 1px 4px; margin-left: auto;
        }

        .hdr-drawer-foot {
          padding: 16px 22px;
          border-top: 1px solid rgba(255,255,255,0.07);
          flex-shrink: 0;
        }
        .hdr-mob-cta {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 13px;
          background: var(--gold); color: var(--ink);
          font-size: 14px; font-weight: 700; letter-spacing: 0.04em;
          text-decoration: none; border-radius: 11px;
          transition: background 0.25s, transform 0.2s;
        }
        .hdr-mob-cta:hover { background: var(--gold-lt); transform: translateY(-1px); }

        /* ── responsive ── */
        @media (max-width: 960px) {
          .hdr-links  { display: none; }
          .hdr-burger { display: flex; }
        }
      `}</style>

      <div className="hdr" ref={headerRef}>

        {/* ── Ticker ── */}
        <div className="hdr-ticker" aria-hidden="true">
          <div className="hdr-ticker-track">
            {[...Array(2)].map((_, i) => (
              <span key={i} style={{ display: "inline-flex", gap: 72, alignItems: "center" }}>
                {[
                  "Premium Construction Services",
                  "Licensed & Insured",
                  "Free Consultations",
                  "20+ Years of Excellence",
                  "Trusted by 1,000+ Homeowners",
                  "Serving the Greater Region",
                ].map((t) => (
                  <span key={t} className="hdr-ticker-item">
                    <span className="hdr-ticker-dot" />
                    {t}
                  </span>
                ))}
              </span>
            ))}
          </div>
          <a href="tel:+1234567890" className="hdr-ticker-phone">
            <Phone size={11} />
            (123) 456-7890
          </a>
        </div>

        {/* ── Nav ── */}
        <nav
          className={`hdr-nav${scrolled ? " scrolled" : ""}`}
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="hdr-inner">

            {/* Logo */}
            <Link to="/" className="hdr-logo" aria-label="BCR Constructions — Home">
              <img
                src={BCR_LOGO}
                alt="BCR Constructions"
                className="hdr-logo-img"
              />
            </Link>

            {/* Desktop Links */}
            <div className="hdr-links" role="menubar">

              {NAV_LINKS.map((l) => (
                <Link key={l.to} to={l.to} className="hdr-link" role="menuitem">{l.label}</Link>
              ))}

              {/* Services dropdown */}
              <div
                ref={dropdownRef}
                style={{ position: "relative", zIndex: 200 }}
                onMouseEnter={openServices}
                onMouseLeave={closeServices}
              >
                <button
                  className={`hdr-svc-btn${servicesOpen ? " open" : ""}`}
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
                  onClick={() => setServicesOpen((v) => !v)}
                >
                  Services
                  <ChevronDown size={14} className={`hdr-chevron${servicesOpen ? " open" : ""}`} />
                </button>

                <div
                  className={`hdr-mega${servicesOpen ? " open" : ""}`}
                  role="menu"
                  onMouseEnter={openServices}
                  onMouseLeave={closeServices}
                >
                  <div className="hdr-mega-grid">
                    {SERVICES.map((s) => (
                      <Link
                        key={s.path}
                        to={s.path}
                        role="menuitem"
                        className={`hdr-mega-item${activeService?.path === s.path ? " active" : ""}`}
                        onMouseEnter={() => setActiveService(s)}
                        onClick={() => setServicesOpen(false)}
                      >
                        <span className="hdr-mega-icon"><s.Icon size={15} strokeWidth={1.75} /></span>
                        <span className="hdr-mega-text">
                          <span className="hdr-mega-name">{s.name}</span>
                          {s.tag && <span className="hdr-mega-tag">{s.tag}</span>}
                        </span>
                      </Link>
                    ))}
                  </div>

                  <div className="hdr-mega-divider" />

                  <div className="hdr-mega-preview">
                    <div className="hdr-preview-eyebrow">Spotlight</div>
                    <div className="hdr-preview-name">{activeService?.name}</div>
                    <div className="hdr-preview-desc">
                      {SERVICE_DESCRIPTIONS[activeService?.name] ?? "Expert craftsmanship on every project we touch."}
                    </div>
                    <Link
                      to={activeService?.path}
                      className="hdr-preview-cta"
                      onClick={() => setServicesOpen(false)}
                    >
                      Explore Service <ArrowUpRight size={13} />
                    </Link>
                    <div className="hdr-preview-footer">12 Specialized Services</div>
                  </div>
                </div>
              </div>

              <Link to="/faq" className="hdr-link" role="menuitem">FAQs</Link>

              <a href="#contact" className="hdr-cta">
                <span>Get a Quote</span>
                <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Hamburger */}
            <button
              className="hdr-burger"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={22} />
            </button>

          </div>
        </nav>
      </div>

      {/* ── Mobile Overlay — sits below header ── */}
      <div
        className={`hdr-overlay${mobileOpen ? " open" : ""}`}
        style={{ top: headerHeight }}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* ── Mobile Drawer — anchored below header ── */}
      <div
        className={`hdr-drawer${mobileOpen ? " open" : ""}`}
        style={{ top: headerHeight }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Drawer header row — close button only, no logo needed */}
        <div className="hdr-drawer-head">
          <span className="hdr-drawer-label">Navigation</span>
          <button
            className="hdr-drawer-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <div className="hdr-drawer-body">
          {NAV_LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="hdr-mob-link" onClick={() => setMobileOpen(false)}>
              {l.label}
            </Link>
          ))}

          <button
            className="hdr-mob-svc-btn"
            onClick={() => setMobileServicesOpen((v) => !v)}
            aria-expanded={mobileServicesOpen}
          >
            Services
            <ChevronDown
              size={16}
              style={{
                color: "var(--gold)",
                transition: "transform 0.3s",
                transform: mobileServicesOpen ? "rotate(180deg)" : "none",
              }}
            />
          </button>

          <div
            className="hdr-mob-svc-list"
            style={{ maxHeight: mobileServicesOpen ? `${SERVICES.length * 46}px` : 0 }}
          >
            {SERVICES.map((s) => (
              <Link
                key={s.path}
                to={s.path}
                className="hdr-mob-svc-item"
                onClick={() => setMobileOpen(false)}
              >
                <span className="hdr-mob-svc-item-icon"><s.Icon size={13} strokeWidth={1.75} /></span>
                {s.name}
                {s.tag && <span className="hdr-mob-svc-tag">{s.tag}</span>}
              </Link>
            ))}
          </div>

          <Link to="/faq" className="hdr-mob-link" onClick={() => setMobileOpen(false)}>FAQs</Link>
        </div>

        <div className="hdr-drawer-foot">
          <a href="#contact" className="hdr-mob-cta" onClick={() => setMobileOpen(false)}>
            Get a Free Quote <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </>
  );
}