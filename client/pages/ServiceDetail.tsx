import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParams, Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const SERVICE_DATA: Record<string, any> = {
  "commercial-restoration": {
    title: "Commercial Restoration",
    description: "Professional restoration services for commercial properties",
    image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F5a045426e9834c1083837830191b43dd?format=webp&width=800&height=1200",
    details: "BCR Constructions specializes in comprehensive commercial restoration services. Whether your property has sustained damage from fire, water, natural disasters, or general wear and tear, our expert team is ready to restore it to its original condition or better.",
    benefits: ["Licensed and insured restoration specialists", "Complete damage assessment and documentation", "Insurance claim assistance and coordination", "Minimal business disruption", "Quality restoration that meets all codes", "24/7 emergency response available"],
    coverage: ["Office buildings", "Retail centers", "Warehouses", "Industrial facilities", "Multi-tenant properties", "Corporate headquarters"],
  },
  condominium: {
    title: "Condominium",
    description: "Specialized condo renovation and restoration",
    image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F4df5c91731e44c9baf935b2f432bd6bc?format=webp&width=800&height=1200",
    details: "We understand the unique challenges of condominium renovations and restoration. Our team has extensive experience working with HOAs and individual unit owners to coordinate projects that maintain community harmony.",
    benefits: ["HOA-compliant project management", "Coordinated unit-by-unit restoration", "Minimal disruption to other residents", "Professional project scheduling", "Quality finishes and modern upgrades", "Comprehensive warranty coverage"],
    coverage: ["Unit interior renovations", "Common area restoration", "Balcony and deck work", "Plumbing and electrical upgrades", "HVAC system installation", "Exterior cladding and waterproofing"],
  },
  "exterior-renovation": {
    title: "Exterior Renovation",
    description: "Professional exterior renovation services",
    image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F31a04eba0ebf4f92a8e45c7b8c2b7335?format=webp&width=800&height=1200",
    details: "Your property's exterior is the first impression. Our exterior renovation services transform the look and functionality of residential and commercial buildings. We use premium materials and proven techniques to ensure lasting results.",
    benefits: ["Enhanced curb appeal and property value", "Improved weather protection and insulation", "Modern aesthetic with functional design", "Durable, quality materials", "Professional installation", "Long-lasting warranty coverage"],
    coverage: ["Siding replacement and repair", "Roofing installation and repair", "Window and door replacement", "Exterior painting", "Deck and patio construction", "Landscaping and hardscaping"],
  },
  "flooded-basement": {
    title: "Flooded Basement",
    description: "Rapid response for flooded basement restoration",
    image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F9279e5ae40f242798c4c039df4376013?format=webp&width=800&height=1200",
    details: "Basement flooding is a serious issue that requires immediate professional attention. BCR Constructions provides emergency water removal, drying, and restoration services to prevent structural damage and mold growth.",
    benefits: ["24/7 emergency response", "Advanced water extraction equipment", "Complete moisture removal and drying", "Mold prevention and treatment", "Full structural restoration", "Insurance claim coordination"],
    coverage: ["Water damage assessment", "Pumping and water removal", "Dehumidification and drying", "Flooring repair and replacement", "Wall and foundation restoration", "Waterproofing solutions"],
  },
  "home-design": {
    title: "Home Design",
    description: "Custom home design and planning services",
    image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F08b49164b9854b449840e31a08b51dbc?format=webp&width=800&height=1200",
    details: "Our expert design team works with you to create a custom home that meets your vision and lifestyle needs. From conceptual design to final blueprints, we guide you through every step.",
    benefits: ["Expert design consultation", "3D visualization and renderings", "Custom floor plan development", "Building code compliance", "Energy-efficient design options", "Project timeline and budget planning"],
    coverage: ["Residential home design", "Modern and traditional styles", "Sustainable design practices", "Space optimization", "Material and finish selection", "Design-to-build coordination"],
  },
  "home-renovation": {
    title: "Home Renovation",
    description: "Complete home renovation solutions",
    image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2Fa1567739cad54517803cdfd699ec2d74?format=webp&width=800&height=1200",
    details: "Whether updating a single room or the entire home, our renovation experts handle every aspect with attention to detail and commitment to quality.",
    benefits: ["Complete project management", "Quality craftsmanship", "On-time completion", "Budget transparency", "Modern design trends", "Warranty on all work"],
    coverage: ["Kitchen and bathroom remodels", "Flooring installation", "Painting and drywall", "Fixture and appliance installation", "Structural updates", "Whole home renovations"],
  },
  "insurance-claim": {
    title: "Insurance Claim",
    description: "Insurance claim assistance and support",
    image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F366d55088c7045deafb5828812d97984?format=webp&width=800&height=1200",
    details: "Navigating insurance claims can be complex. Our team assists with damage documentation, claim filing, and working directly with adjusters to ensure fair coverage.",
    benefits: ["Professional damage assessment", "Complete documentation", "Direct insurer communication", "Claim maximization expertise", "Dispute resolution support", "Peace of mind throughout process"],
    coverage: ["Fire damage claims", "Water damage claims", "Storm damage claims", "Vandalism and theft claims", "Natural disaster claims", "Full restoration coordination"],
  },
  "interior-renovation": {
    title: "Interior Renovation",
    description: "Modern interior renovation and design",
    image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F56135e5b7654466a94e8d875f5f09442?format=webp&width=800&height=1200",
    details: "Transform your living space with our interior renovation services. We focus on creating beautiful, functional spaces that reflect your personal style.",
    benefits: ["Interior design consultation", "Space planning and layout", "Custom cabinetry options", "Flooring and wall treatments", "Lighting design", "Quality finishing touches"],
    coverage: ["Living room renovations", "Bedroom updates", "Office spaces", "Accent wall design", "Built-in storage solutions", "Custom shelving and cabinetry"],
  },
  "kitchen-bathroom": {
    title: "Kitchen Bathroom",
    description: "Specialized kitchen and bathroom renovation",
    image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2Fffd7dd5c584d4c8fa2fe1e5313f70842?format=webp&width=800&height=1200",
    details: "Kitchens and bathrooms are the heart of any home. Our specialized team creates functional, beautiful spaces with premium finishes and modern conveniences.",
    benefits: ["Expert design consultation", "Premium fixture selection", "Custom cabinetry", "Plumbing expertise", "Electrical upgrades", "Luxury finishes and materials"],
    coverage: ["Kitchen remodels", "Bathroom renovations", "Tile and stone work", "Plumbing and drainage", "Lighting installation", "Appliance selection and installation"],
  },
  "new-home-custom-home": {
    title: "New Home / Custom Home",
    description: "Custom home building services",
    image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F08b49164b9854b449840e31a08b51dbc?format=webp&width=800&height=1200",
    details: "Build your dream home with BCR Constructions. From ground-breaking to final walkthrough, we manage every detail to create the home you've always wanted.",
    benefits: ["Design-build expertise", "Quality material selection", "Expert craftsmanship", "Timeline management", "Budget oversight", "Comprehensive warranty"],
    coverage: ["Foundation and framing", "Roofing and exterior", "Mechanical systems", "Interior finishes", "Smart home technology", "Energy-efficient construction"],
  },
  roofing: {
    title: "Roofing",
    description: "Professional roofing services and repair",
    image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F0a2a0c4fb8704a4b96fcb5ffbf6c0536?format=webp&width=800&height=1200",
    details: "Your roof is your home's first line of defense. We provide expert roofing services including new installation, repairs, and maintenance to protect your property.",
    benefits: ["Licensed roofing specialists", "Quality materials", "Leak prevention", "Storm damage repair", "Extended roof life", "Energy-efficient options"],
    coverage: ["Asphalt shingle roofing", "Metal roofing", "Slate and tile roofing", "Roof inspection and maintenance", "Gutter and flashing", "Attic ventilation"],
  },
  "water-proofing": {
    title: "Water Proofing",
    description: "Advanced waterproofing solutions",
    image: "https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2F7c3255273c564fef88ac2f23fd792632?format=webp&width=800&height=1200",
    details: "Water damage can be costly and dangerous. Our waterproofing solutions protect your property from moisture intrusion, foundation damage, and mold growth.",
    benefits: ["Professional moisture assessment", "Advanced waterproofing materials", "Long-term protection", "Mold prevention", "Foundation preservation", "Interior and exterior solutions"],
    coverage: ["Basement waterproofing", "Foundation sealing", "Exterior drainage systems", "Interior moisture barriers", "Sump pump installation", "Dehumidification systems"],
  },
};

export default function ServiceDetail() {
  const { service } = useParams();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const serviceKey = service?.toLowerCase().replace(/\s+/g, "-") || "";
  const data = SERVICE_DATA[serviceKey];

  if (!data) {
    return (
      <div className="w-full bg-white">
        <Header />
        <main className="pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 className="font-display font-bold text-4xl text-black mb-6">
              Service Details Coming Soon
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              We're building out detailed information for this service. In the
              meantime, please contact us for more information.
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-yellow-500 hover:text-black transition-all"
            >
              Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const faqs = [
    {
      question: `What does ${data.title} involve?`,
      answer: data.details,
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Project duration depends on the scope of work. We'll provide a detailed timeline during your consultation.",
    },
    {
      question: "Do you work with insurance claims?",
      answer:
        "Yes, we assist with insurance claims and can coordinate directly with your insurance company.",
    },
    {
      question: "Are you licensed and insured?",
      answer:
        "Yes, all our work is performed by licensed and insured professionals.",
    },
  ];

  return (
    <div className="w-full bg-white">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <div className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url('${data.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-black/60 z-1" />
          <div className="relative z-10 max-w-7xl mx-auto text-center py-20">
            <h1 className="font-display font-bold text-5xl text-white mb-4">
              {data.title}
            </h1>
            <p className="text-xl text-gray-200">{data.description}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Overview */}
          <div className="mb-16">
            <h2 className="font-display font-bold text-3xl text-black mb-6">
              Overview
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              {data.details}
            </p>
          </div>

          {/* Benefits */}
          <div className="mb-16">
            <h2 className="font-display font-bold text-3xl text-black mb-6">
              Key Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.benefits.map((benefit: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-600 text-lg">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Coverage */}
          <div className="mb-16 bg-gray-50 p-8 rounded-lg">
            <h2 className="font-display font-bold text-3xl text-black mb-6">
              What We Handle
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.coverage.map((item: string, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="mb-16">
            <h2 className="font-display font-bold text-3xl text-black mb-6">
              Our Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: 1,
                  title: "Assessment",
                  desc: "Detailed site inspection and damage evaluation",
                },
                {
                  step: 2,
                  title: "Planning",
                  desc: "Custom project plan and cost estimate",
                },
                {
                  step: 3,
                  title: "Execution",
                  desc: "Professional project completion",
                },
                {
                  step: 4,
                  title: "Follow-up",
                  desc: "Quality assurance and warranty support",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-display font-bold text-xl text-black">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-semibold text-black mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="mb-16">
            <h2 className="font-display font-bold text-3xl text-black mb-6">
              Service FAQs
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpandedFaq(expandedFaq === index ? null : index)
                    }
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-semibold text-black">{faq.question}</h3>
                    <ChevronDown
                      className={`w-5 h-5 text-yellow-400 transition-transform duration-300 ${
                        expandedFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {expandedFaq === index && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-black text-white rounded-lg p-12 text-center">
            <h2 className="font-display font-bold text-3xl mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Contact us today for a free consultation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:3472654610"
                className="px-8 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-all"
              >
                Call: 347-265-4610
              </a>
              <a
                href="mailto:info@bcrconstructions.com"
                className="px-8 py-3 border-2 border-yellow-400 text-yellow-400 font-bold rounded-lg hover:bg-yellow-400 hover:text-black transition-all"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
