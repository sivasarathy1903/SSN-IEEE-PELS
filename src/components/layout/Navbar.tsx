import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: "HOME", path: "/" },
  { name: "ABOUT", path: "/about" },
  { name: "EVENTS", path: "/events" },
  { name: "PROJECTS", path: "/projects" },
  { name: "TEAM", path: "/team" },
  { name: "CONTACT", path: "/contact" }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 w-full z-50 transition-all duration-500",
        scrolled
          ? "bg-[#080B10]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-white/5"
          : "bg-[#080B10]/80 backdrop-blur-md border-b border-white/[0.06]"
      )}
    >
      {/* Top Branding Row */}
      <div
        className={cn(
          "transition-all duration-300 px-4 md:px-8",
          scrolled ? "py-2" : "py-3 md:py-4"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: IEEE PELS Logo */}
          <Link to="/" className="flex items-center group py-1">
            <img
              src="/ieee_pels_logo.svg"
              alt="IEEE Power Electronics Society"
              className="h-16 md:h-18 w-auto object-contain group-hover:scale-[1.01] transition-transform duration-200"
            />
          </Link>

          {/* Right: IEEE Logo then SSN Logo */}
          <div className="flex items-center gap-3.5 md:gap-5 text-white">
            {/* IEEE Logo */}
            <a href="https://www.ieee.org" target="_blank" rel="noopener noreferrer" className="block hover:text-white/80 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115 36" className="h-7 md:h-11 w-auto fill-current">
                <g transform="translate(0, 0)">
                  <polygon points="18,0 36,18 18,36 0,18" fill="none" stroke="currentColor" strokeWidth="2.5"/>
                  <line x1="18" y1="30" x2="18" y2="9" stroke="currentColor" strokeWidth="2.5"/>
                  <polygon points="18,5 14,12 22,12" fill="currentColor"/>
                  <path d="M 7,18 C 7,13 29,13 29,18 C 29,23 7,23 7,18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeDasharray="14,10"/>
                  <path d="M 7,18 C 7,22.5 29,22.5 29,18" fill="none" stroke="currentColor" strokeWidth="1.8"/>
                  <polygon points="7,18 4,22 10,22" fill="currentColor" transform="rotate(-15, 7, 18)"/>
                </g>
                <text x="42" y="28" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="26" letterSpacing="-1">IEEE</text>
              </svg>
            </a>

            {/* Separator */}
            <div className="h-6 w-[1.5px] bg-white/20 self-center mx-1"></div>

            {/* SSN Logo */}
            <a
              href="https://www.ssn.edu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-white/80 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 15 230 85" className="h-7 md:h-11 w-auto fill-current">
                <text x="0" y="95" fontFamily="'Arial Black', 'Impact', sans-serif" fontWeight="900" fontSize="110" fontStyle="italic" letterSpacing="-3">ssn</text>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Row */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-11">
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.path ||
                (link.path !== "/" && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "relative text-[11px] font-extrabold tracking-[0.18em] transition-all duration-200 py-3 group",
                    "font-['Inter',_sans-serif]",
                    isActive
                      ? "text-[#E8172E]"
                      : "text-[#A0AEC0] hover:text-white"
                  )}
                >
                  {link.name}
                  {/* Active indicator */}
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 h-[2px] bg-[#E8172E] transition-all duration-300",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center justify-end w-full py-1">
            <button
              className="text-gray-300 p-2 hover:text-white hover:bg-white/5 rounded transition-colors focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#080B10]/98 backdrop-blur-xl border-t border-white/10 py-4 px-6 flex flex-col gap-1 shadow-2xl">
          {navLinks.map((link) => {
            const isActive =
              location.pathname === link.path ||
              (link.path !== "/" && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "font-extrabold text-xs tracking-[0.2em] py-3 border-l-2 pl-4 transition-all duration-200 font-['Inter',_sans-serif]",
                  isActive
                    ? "text-[#E8172E] border-[#E8172E] bg-[#E8172E]/5"
                    : "text-[#8A9BB5] border-transparent hover:text-white hover:border-white/30"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
