export default function Index() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-primary to-primary/95 flex items-center justify-center relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -mr-48 -mt-48 animate-float"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -ml-48 -mb-48 animate-float" style={{ animationDelay: "1.5s" }}></div>

      <div className="relative z-10 text-center px-4">
        <div className="animate-fade-in">
          <div className="mb-8 relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/40 to-accent/20 rounded-2xl blur-2xl animate-pulse-slow"></div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F073d05d262c84cc181e4182325be69b5%2Fcee3e505f4074df894a2e0239ff311d7?format=webp&width=800&height=1200"
              alt="BCR Constructions Logo"
              className="relative w-48 md:w-56 h-auto animate-float drop-shadow-2xl"
            />
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">
            BCR Constructions
          </h1>

          <h2 className="text-3xl md:text-4xl font-semibold text-accent mb-2">
            Under Construction
          </h2>

          <p className="text-white/70 text-lg max-w-md mx-auto">
            We're building something amazing. Coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}
