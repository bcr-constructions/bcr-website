import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ChevronDown,
  Phone,
  Mail,
  ArrowUpRight,
  Search,
  MessageSquare,
  Clock,
  Shield,
  HardHat,
  FileText,
  Wrench,
  Home
} from "lucide-react";

import { Link } from "react-router-dom";

/* ─── DATA ───────────────────────────────── */

const CATEGORIES = [
  { id: "all", label: "All Questions", Icon: MessageSquare },
  { id: "general", label: "General", Icon: Shield },
  { id: "process", label: "Our Process", Icon: Wrench },
  { id: "services", label: "Services", Icon: Home },
  { id: "legal", label: "Legal & Insurance", Icon: FileText },
  { id: "timing", label: "Timing & Costs", Icon: Clock }
];

const FAQS = [
  {
    category: "general",
    question: "What geographic areas does BCR Constructions serve?",
    answer:
      "We serve the entire New York metro area including Brooklyn, Queens, Manhattan, Bronx, Staten Island and Long Island."
  },
  {
    category: "general",
    question: "Do you handle residential and commercial projects?",
    answer:
      "Yes. We have dedicated teams for both residential renovations and commercial construction projects."
  },
  {
    category: "general",
    question: "Are your workers licensed and insured?",
    answer:
      "Yes. All BCR workers are licensed, insured, and OSHA compliant."
  },
  {
    category: "process",
    question: "What does the project process look like?",
    answer:
      "Our process includes consultation, detailed estimate, signed contract, construction phase, and final walkthrough."
  },
  {
    category: "services",
    question: "Do you build custom homes?",
    answer:
      "Yes. We build fully custom homes from foundation to finishing."
  },
  {
    category: "legal",
    question: "Do you help with insurance claims?",
    answer:
      "Yes. We assist clients with insurance documentation and claim support."
  },
  {
    category: "timing",
    question: "What is a typical project timeline?",
    answer:
      "Kitchen renovations usually take 3–6 weeks, while full home renovations can take 2–4 months."
  }
];

const CONTACT_OPTIONS = [
  {
    Icon: Phone,
    label: "Call Us",
    value: "(347) 265-4610",
    sub: "Mon-Fri 9AM-5PM",
    href: "tel:3472654610"
  },
  {
    Icon: Mail,
    label: "Email Us",
    value: "info@bcrconstructions.com",
    sub: "We reply within 1 business day",
    href: "mailto:info@bcrconstructions.com"
  }
];

/* ─── HOOK ───────────────────────────────── */

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [threshold]);

  return { ref, visible };
}

function Reveal({ children }: { children: React.ReactNode }) {
  const { ref, visible } = useInView();

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "all 0.6s ease"
      }}
    >
      {children}
    </div>
  );
}

/* ─── COMPONENT ───────────────────────────────── */

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = FAQS.filter((faq) => {
    const matchCategory =
      activeCategory === "all" || faq.category === activeCategory;

    const matchQuery =
      faq.question.toLowerCase().includes(query.toLowerCase()) ||
      faq.answer.toLowerCase().includes(query.toLowerCase());

    return matchCategory && matchQuery;
  });

  useEffect(() => {
    setOpenIndex(null);
  }, [activeCategory, query]);

  return (
    <div style={{ fontFamily: "Outfit, sans-serif", background: "#fff" }}>
      <Header />

      {/* HERO */}

      <section
        style={{
          position: "relative",
          background: "#0A0A0A",
          paddingTop: "120px",
          paddingBottom: "100px",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/images/faqs-pic.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.35
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 20px",
            color: "white"
          }}
        >
          <Reveal>
            <h1 style={{ fontSize: "48px", fontWeight: 700, marginBottom: 20 }}>
              Frequently Asked Questions
            </h1>

            <div style={{ position: "relative", maxWidth: 450 }}>
              <Search
                size={16}
                style={{
                  position: "absolute",
                  top: 14,
                  left: 14,
                  color: "#999"
                }}
              />

              <input
                type="text"
                placeholder="Search questions..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px 12px 40px",
                  borderRadius: 10,
                  border: "none"
                }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ SECTION */}

      <section style={{ padding: "80px 20px", maxWidth: 900, margin: "auto" }}>
        {/* Category buttons */}

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 40 }}>
          {CATEGORIES.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              style={{
                padding: "8px 14px",
                borderRadius: 20,
                border: "1px solid #ddd",
                background: activeCategory === id ? "#C9A84C" : "white",
                color: activeCategory === id ? "black" : "#444",
                display: "flex",
                alignItems: "center",
                gap: 6,
                cursor: "pointer"
              }}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* FAQ List */}

        {filtered.map((faq, i) => (
          <Reveal key={i}>
            <div
              style={{
                border: "1px solid #eee",
                borderRadius: 12,
                marginBottom: 12
              }}
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === i ? null : i)
                }
                style={{
                  width: "100%",
                  padding: 20,
                  display: "flex",
                  justifyContent: "space-between",
                  background: "white",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600
                }}
              >
                {faq.question}

                <ChevronDown
                  style={{
                    transform:
                      openIndex === i ? "rotate(180deg)" : "rotate(0)"
                  }}
                />
              </button>

              {openIndex === i && (
                <div
                  style={{
                    padding: "0 20px 20px",
                    color: "#666",
                    lineHeight: 1.6
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </section>

      {/* CONTACT SECTION */}

      <section
        style={{
          background: "#0A0A0A",
          padding: "80px 20px",
          color: "white"
        }}
      >
        <div style={{ maxWidth: 900, margin: "auto" }}>
          <h2 style={{ marginBottom: 30 }}>Still Have Questions?</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {CONTACT_OPTIONS.map(({ Icon, label, value, sub, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: 20,
                  borderRadius: 12,
                  textDecoration: "none",
                  color: "white",
                  display: "flex",
                  gap: 14
                }}
              >
                <Icon />

                <div>
                  <div style={{ fontWeight: 600 }}>{value}</div>
                  <div style={{ fontSize: 13, opacity: 0.6 }}>{sub}</div>
                </div>
              </a>
            ))}

            <Link
              to="/contact"
              style={{
                background: "#C9A84C",
                color: "black",
                padding: 14,
                borderRadius: 10,
                textAlign: "center",
                fontWeight: 600,
                textDecoration: "none"
              }}
            >
              Request Free Quote <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}