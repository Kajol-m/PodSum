export default function Footer() {
  return (
    <footer className=" py-8 mt-6 text-center text-white text-sm font-medium select-none">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
          &copy; {new Date().getFullYear()} PodSum. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href="#features"
            className="hover:text-[#d600ff] transition-colors text-white drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="hover:text-[#d600ff] transition-colors text-white drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]"
          >
            Pricing
          </a>
          <a
            href="#contact"
            className="hover:text-[#d600ff] transition-colors text-white drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
