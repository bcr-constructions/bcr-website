import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="w-full bg-white">
      <Header />
      <main className="pt-24">
        <div className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl">
            <h1 className="font-display font-bold text-8xl text-black mb-4">404</h1>
            <h2 className="font-display font-bold text-4xl text-black mb-6">
              Page Not Found
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We're sorry, but the page you're looking for doesn't exist. This
              might be a service page we're still building out. Please explore our
              other services or contact us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-yellow-500 hover:text-black transition-all transform hover:scale-105"
              >
                Return to Home
              </Link>
              <a
                href="tel:3472654610"
                className="px-8 py-3 border-2 border-black text-black font-bold rounded-lg hover:bg-black hover:text-white transition-all"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
