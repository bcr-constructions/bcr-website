import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Linkedin, Mail, Phone } from "lucide-react";

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "John Smith",
    title: "Chief Executive Officer",
    bio: "With over 28 years of experience, John leads BCR Constructions with vision and expertise.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    title: "Director of Operations",
    bio: "Maria manages all project operations ensuring timely and quality delivery on every project.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "David Chen",
    title: "Chief Project Manager",
    bio: "David oversees multiple projects simultaneously, maintaining our high standards of excellence.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Sarah Williams",
    title: "Head of Design",
    bio: "Sarah leads our design team, creating innovative solutions for complex construction challenges.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Michael Johnson",
    title: "Safety Director",
    bio: "Michael ensures all projects meet and exceed industry safety standards and regulations.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Emily Davis",
    title: "Client Relations Manager",
    bio: "Emily maintains strong relationships with clients, ensuring their needs are met at every stage.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
];

export default function Staff() {
  return (
    <div className="w-full bg-white">
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="font-display font-bold text-5xl mb-4 animate-fade-in">
              Our Team
            </h1>
            <p className="text-xl text-gray-300 animate-fade-in-up">
              Meet the Experts Behind BCR Constructions
            </p>
          </div>
        </div>

        {/* Team Introduction */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl text-black mb-6">
              Skilled Professionals Dedicated to Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our team consists of experienced professionals with decades of
              combined expertise in construction management, design, safety, and
              client relations. Each member brings unique skills and dedication
              to ensuring your project's success.
            </p>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <div
                key={member.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Member Image */}
                <div className="relative h-80 overflow-hidden bg-gray-200">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Member Info */}
                <div className="p-6">
                  <h3 className="font-display font-bold text-2xl text-black mb-2">
                    {member.name}
                  </h3>
                  <p className="text-yellow-600 font-semibold mb-4">
                    {member.title}
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {member.bio}
                  </p>

                  {/* Contact Links */}
                  <div className="flex gap-4 pt-4 border-t border-gray-200">
                    <a
                      href="#contact"
                      className="flex items-center gap-2 text-black hover:text-yellow-600 transition-colors"
                      title="Send Email"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                    <a
                      href="#contact"
                      className="flex items-center gap-2 text-black hover:text-yellow-600 transition-colors"
                      title="Call"
                    >
                      <Phone className="w-5 h-5" />
                    </a>
                    <a
                      href="#contact"
                      className="flex items-center gap-2 text-black hover:text-yellow-600 transition-colors"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display font-bold text-4xl mb-6">
              Ready to Work With Our Team?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Contact us today to discuss your construction project with our
              experienced professionals.
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
