import { Link } from "react-router-dom";
import {
  Facebook, Instagram, Linkedin, Youtube,
  Phone, MapPin, Mail, Clock, ArrowUpRight,
  ChevronRight, HardHat,
} from "lucide-react";

const BCR_LOGO = "/images/bcr-logo-7.png";
const SERVICES = [
  { name: "Commercial Restoration", path: "/services/commercial-restoration" },
  { name: "Condominium",            path: "/services/condominium" },
  { name: "Exterior Renovation",    path: "/services/exterior-renovation" },
  { name: "Flooded Basement",       path: "/services/flooded-basement" },
  { name: "Home Design",            path: "/services/home-design" },
  { name: "Home Renovation",        path: "/services/home-renovation" },
  { name: "Insurance Claim",        path: "/services/insurance-claim" },
  { name: "Interior Renovation",    path: "/services/interior-renovation" },
  { name: "Kitchen & Bathroom",     path: "/services/kitchen-bathroom" },
  { name: "New / Custom Home",      path: "/services/new-home-custom-home" },
  { name: "Roofing",                path: "/services/roofing" },
  { name: "Water Proofing",         path: "/services/water-proofing" },
];

const QUICK_LINKS = [
  { label: "Home",     to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Our Team", to: "/staff" },
  { label: "FAQs",     to: "/faq" },
  { label: "Contact",  to: "/#contact" },
];

const OFFICES = [
  {
    label: "Head Office",
    address: "60 Bush Ave, Staten Island, NY 10303",
    phone: "(347) 265-4610",
    hours: "Mon – Fri: 9AM – 5PM",
    email: "info@bcrconstructions.com",
  },
  {
    label: "Secondary Office",
    address: "10 North Grove St, Valley Stream, NY 11580",
    phone: "(347) 265-4610",
    hours: "Mon – Fri: 9AM – 5PM",
    email: "info@bcrconstructions.com",
  },
];

const SOCIALS = [
  { Icon: Facebook,  href: "https://facebook.com",  label: "Facebook" },
  { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: Linkedin,  href: "https://linkedin.com",  label: "LinkedIn" },
  { Icon: Youtube,   href: "https://youtube.com",   label: "YouTube" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ fontFamily: "\'Outfit\', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Outfit:wght@300;400;500;600&display=swap');

        :root {
          --gold:     #C9A84C;
          --gold-lt:  #E3C26A;
          --gold-dim: rgba(201,168,76,0.12);
          --gold-bdr: rgba(201,168,76,0.22);
          --ink:      #0A0A0A;
          --ink-2:    #111111;
          --ease:     cubic-bezier(0.22,1,0.36,1);
        }

        /* ── CTA band ── */
        .ft-cta-band {
          background: var(--gold);
          padding: 28px clamp(24px,6vw,96px);
          display: flex; align-items: center; justify-content: space-between;
          gap: 24px; flex-wrap: wrap;
        }
        .ft-cta-left { display: flex; align-items: center; gap: 16px; }
        .ft-cta-icon {
          width: 48px; height: 48px; border-radius: 12px;
          background: rgba(0,0,0,0.12);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .ft-cta-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(17px,2.2vw,22px); font-weight: 700; color: var(--ink); line-height: 1.2;
        }
        .ft-cta-sub { font-size: 13px; color: rgba(0,0,0,0.55); font-weight: 400; margin-top: 2px; }
        .ft-cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 26px; border-radius: 10px;
          background: var(--ink); color: #fff;
          font-size: 13.5px; font-weight: 700; letter-spacing: 0.04em;
          text-decoration: none; white-space: nowrap;
          transition: background 0.25s, transform 0.2s;
        }
        .ft-cta-btn:hover { background: #2a2a2a; transform: translateY(-1px); }

        /* ── main body ── */
        .ft-body {
          background: var(--ink-2);
          padding: 72px clamp(24px,6vw,96px) 56px;
          border-top: 1px solid var(--gold-bdr);
        }
        .ft-grid {
          max-width: 1280px; margin: 0 auto;
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1.4fr;
          gap: 48px;
        }

        /* ── brand ── */
        .ft-logo-img {
          height: 52px;
          width: auto;
          display: block;
          margin-bottom: 4px;
          opacity: 0.92;
          filter: drop-shadow(0 1px 3px rgba(0,0,0,0.4));
          transition: opacity 0.3s, transform 0.35s var(--ease), filter 0.3s;
        }
        .ft-logo-wrap:hover .ft-logo-img {
          opacity: 1;
          transform: scale(1.03);
          filter: drop-shadow(0 0 10px rgba(201,168,76,0.3)) drop-shadow(0 1px 3px rgba(0,0,0,0.4));
        }
        .ft-brand-tag {
          font-size: 9px; font-weight: 600; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--gold); margin-bottom: 18px; display: block;
        }
        .ft-brand-desc {
          font-size: 13.5px; color: rgba(255,255,255,0.42);
          line-height: 1.82; margin-bottom: 24px;
        }
        .ft-badge {
          display: inline-flex; align-items: center; gap: 9px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px; padding: 10px 14px;
          font-size: 12px; color: rgba(255,255,255,0.5);
        }
        .ft-badge-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #3ecf6e; flex-shrink: 0;
          box-shadow: 0 0 7px #3ecf6e;
          animation: ft-pulse 2.2s ease-in-out infinite;
        }
        @keyframes ft-pulse {
          0%,100% { opacity:1; } 50% { opacity:0.35; }
        }

        /* ── col headers ── */
        .ft-col-head {
          font-size: 10px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--gold);
          display: flex; align-items: center; gap: 9px;
          margin-bottom: 22px; padding-bottom: 14px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .ft-col-head::before {
          content:''; width:18px; height:1.5px;
          background: var(--gold); flex-shrink:0;
        }

        /* ── service links ── */
        .ft-svc-grid { display:grid; grid-template-columns:1fr 1fr; gap:2px; }
        .ft-link {
          display:flex; align-items:center; gap:5px;
          font-size:12.5px; color:rgba(255,255,255,0.42);
          text-decoration:none; padding:6px 8px; border-radius:7px;
          transition: color 0.18s, background 0.18s, padding-left 0.22s var(--ease);
        }
        .ft-link svg { opacity:0; flex-shrink:0; transition:opacity 0.18s, transform 0.18s; }
        .ft-link:hover { color:var(--gold-lt); background:var(--gold-dim); padding-left:12px; }
        .ft-link:hover svg { opacity:1; transform:translateX(2px); }

        /* ── quick links ── */
        .ft-quick-link {
          display:flex; align-items:center; gap:8px;
          font-size:13.5px; color:rgba(255,255,255,0.42);
          text-decoration:none; padding:8px 0;
          border-bottom:1px solid rgba(255,255,255,0.04);
          transition: color 0.2s, gap 0.2s var(--ease);
        }
        .ft-quick-link:last-of-type { border-bottom:none; }
        .ft-quick-link svg { color:var(--gold); opacity:0; transition:opacity 0.2s; }
        .ft-quick-link:hover { color:#fff; gap:12px; }
        .ft-quick-link:hover svg { opacity:1; }

        /* ── emergency callout ── */
        .ft-emergency {
          margin-top:26px; padding:16px;
          background:rgba(201,168,76,0.07);
          border:1px solid rgba(201,168,76,0.2);
          border-radius:12px;
        }
        .ft-emergency-label {
          font-size:9.5px; font-weight:700; letter-spacing:0.16em;
          text-transform:uppercase; color:var(--gold); margin-bottom:7px;
        }
        .ft-emergency-num {
          display:flex; align-items:center; gap:8px;
          color:#fff; text-decoration:none;
          font-weight:600; font-size:15px;
          transition:color 0.2s;
        }
        .ft-emergency-num:hover { color:var(--gold-lt); }
        .ft-emergency-sub { font-size:11.5px; color:rgba(255,255,255,0.32); margin-top:4px; }

        /* ── office cards ── */
        .ft-office {
          background:rgba(255,255,255,0.03);
          border:1px solid rgba(255,255,255,0.07);
          border-radius:14px; padding:20px 18px; margin-bottom:12px;
          transition:border-color 0.25s;
        }
        .ft-office:last-child { margin-bottom:0; }
        .ft-office:hover { border-color:var(--gold-bdr); }
        .ft-office-label {
          font-size:9.5px; font-weight:700; letter-spacing:0.16em;
          text-transform:uppercase; color:var(--gold); margin-bottom:12px;
        }
        .ft-office-row {
          display:flex; align-items:flex-start; gap:10px; margin-bottom:8px;
          font-size:12.5px; color:rgba(255,255,255,0.47); line-height:1.55;
        }
        .ft-office-row:last-child { margin-bottom:0; }
        .ft-office-icon { color:var(--gold); flex-shrink:0; margin-top:1px; }
        .ft-office-a { color:rgba(255,255,255,0.47); text-decoration:none; transition:color 0.2s; }
        .ft-office-a:hover { color:var(--gold-lt); }

        /* ── divider ── */
        .ft-divider {
          max-width:1280px; margin:0 auto;
          border:none; border-top:1px solid rgba(255,255,255,0.07);
          padding-top:0;
        }

        /* ── bottom bar ── */
        .ft-bottom {
          background:var(--ink);
          padding:22px clamp(24px,6vw,96px);
          border-top:1px solid rgba(255,255,255,0.05);
        }
        .ft-bottom-inner {
          max-width:1280px; margin:0 auto;
          display:flex; align-items:center; justify-content:space-between;
          flex-wrap:wrap; gap:16px;
        }
        .ft-copyright { font-size:12px; color:rgba(255,255,255,0.3); line-height:1.65; }
        .ft-copyright a { color:var(--gold); text-decoration:none; }
        .ft-copyright a:hover { color:var(--gold-lt); }
        .ft-legal { display:flex; gap:18px; margin-top:5px; }
        .ft-legal a { font-size:11.5px; color:rgba(255,255,255,0.22); text-decoration:none; transition:color 0.2s; }
        .ft-legal a:hover { color:rgba(255,255,255,0.55); }

        /* ── socials ── */
        .ft-socials { display:flex; gap:10px; }
        .ft-social {
          width:38px; height:38px; border-radius:10px;
          background:rgba(255,255,255,0.05);
          border:1px solid rgba(255,255,255,0.08);
          display:flex; align-items:center; justify-content:center;
          color:rgba(255,255,255,0.42); text-decoration:none;
          transition: background 0.22s, border-color 0.22s, color 0.22s, transform 0.22s var(--ease);
        }
        .ft-social:hover {
          background:var(--gold); border-color:var(--gold);
          color:var(--ink); transform:translateY(-3px);
        }

        /* ── responsive ── */
        @media (max-width: 1024px) {
          .ft-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .ft-grid { grid-template-columns: 1fr; gap: 36px; }
          .ft-cta-band { flex-direction: column; align-items: flex-start; }
          .ft-bottom-inner { flex-direction: column; align-items: flex-start; }
          .ft-svc-grid { grid-template-columns: 1fr 1fr; }
          .ft-legal { flex-wrap: wrap; gap: 10px; }
        }
      `}</style>

      {/* ── CTA Band ─────────────────────────────────────────────── */}
      <div className="ft-cta-band">
        <div className="ft-cta-left">
          <div className="ft-cta-icon">
            <HardHat size={22} color="var(--ink)" />
          </div>
          <div>
            <div className="ft-cta-heading">Ready to Start Your Project?</div>
            <div className="ft-cta-sub">Free consultation — get a detailed quote from BCR's in-house team within 1 business day.</div>
          </div>
        </div>
        <a href="/#contact" className="ft-cta-btn">
          Get a Free Quote <ArrowUpRight size={14} />
        </a>
      </div>

      {/* ── Main Body ────────────────────────────────────────────── */}
      <div className="ft-body">
        <div className="ft-grid">

          {/* Brand */}
          <div>
            <Link to="/" className="ft-logo-wrap" style={{ textDecoration: "none" }}>
              <img
                src={BCR_LOGO}
                alt="BCR Constructions"
                className="ft-logo-img"
              />
              <span className="ft-brand-tag">Build · Craft · Restore</span>
            </Link>
            <p className="ft-brand-desc">
              BCR Constructions is New York's full-service general contractor. Since 2000, we've delivered 500+ residential and commercial projects with in-house crews, transparent pricing, and a commitment we stand behind.
            </p>
            <div className="ft-badge">
              <span className="ft-badge-dot" />
              Currently Accepting New Projects
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="ft-col-head">Services</div>
            <div className="ft-svc-grid">
              {SERVICES.map((s) => (
                <Link key={s.path} to={s.path} className="ft-link">
                  <ChevronRight size={11} />
                  {s.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <div className="ft-col-head">Company</div>
            {QUICK_LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="ft-quick-link">
                <ChevronRight size={13} />
                {l.label}
              </Link>
            ))}
            <div className="ft-emergency">
              <div className="ft-emergency-label">24/7 Emergency Line</div>
              <a href="tel:3472654610" className="ft-emergency-num">
                <Phone size={14} color="var(--gold)" />
                (347) 265-4610
              </a>
              <div className="ft-emergency-sub">Water &amp; fire damage response</div>
            </div>
          </div>

          {/* Offices */}
          <div>
            <div className="ft-col-head">Our Offices</div>
            {OFFICES.map((o) => (
              <div key={o.label} className="ft-office">
                <div className="ft-office-label">{o.label}</div>
                <div className="ft-office-row">
                  <MapPin size={13} className="ft-office-icon" />
                  <span>{o.address}</span>
                </div>
                <div className="ft-office-row">
                  <Phone size={13} className="ft-office-icon" />
                  <a href={`tel:${o.phone.replace(/\D/g, "")}`} className="ft-office-a">{o.phone}</a>
                </div>
                <div className="ft-office-row">
                  <Clock size={13} className="ft-office-icon" />
                  <span>{o.hours}</span>
                </div>
                <div className="ft-office-row">
                  <Mail size={13} className="ft-office-icon" />
                  <a href={`mailto:${o.email}`} className="ft-office-a">{o.email}</a>
                </div>
              </div>
            ))}
          </div>

        </div>

        <hr className="ft-divider" style={{ marginTop: 56 }} />
      </div>

      {/* ── Bottom Bar ───────────────────────────────────────────── */}
      <div className="ft-bottom">
        <div className="ft-bottom-inner">

          <div>
            <p className="ft-copyright">
              © 2000–{year} <a href="/">BCR Constructions</a>. All rights reserved. Licensed General Contractor — New York State.
            </p>
            <div className="ft-legal">
              <a href="/privacy-policy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/sitemap">Sitemap</a>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Follow Us
            </span>
            <div className="ft-socials">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="ft-social"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}