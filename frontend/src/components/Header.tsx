import React, { useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Try It", href: "#linkInput" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-[#1D2042] to-[#16182B] shadow-md text-white sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 font-extrabold text-2xl">
          <p className="text-2xl">🎧</p>
          <p className="">PodSum</p>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 items-center font-medium">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="hover:text-cyan-400 transition-colors duration-150 focus:outline-none focus:text-cyan-300"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          aria-label="Open menu"
          className="md:hidden p-2 rounded hover:bg-[#23234a] transition"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg
            className="w-6 h-6"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="md:hidden bg-[#181A31] py-2 px-4">
          <ul className="flex flex-col gap-5">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="block py-2 px-2 rounded hover:bg-cyan-900 hover:text-cyan-300 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
