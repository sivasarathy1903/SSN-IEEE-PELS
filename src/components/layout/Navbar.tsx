import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Events", path: "/events" },
  { name: "Projects", path: "/projects" },
  { name: "Team", path: "/team" },
  { name: "Contact", path: "/contact" }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      scrolled ? "bg-surface/80 backdrop-blur-xl border-b border-outline/10 h-20 shadow-sm" : "bg-transparent h-24"
    )}>
      <div className="max-w-container-max mx-auto px-margin-lg flex justify-between items-center h-full">
        <Link to="/" className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary-container flex items-center justify-center rounded-lg shadow-[0_0_15px_rgba(200,16,46,0.4)]">
            <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          </div>
          <span className="font-headline-md text-headline-md font-bold text-on-surface tracking-tighter">IEEE PELS SSN</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-margin-md">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "font-label-caps text-label-caps transition-colors pb-1 border-b-2",
                  isActive 
                    ? "text-primary border-primary" 
                    : "text-on-surface-variant hover:text-on-surface border-transparent hover:border-on-surface/30"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <button 
          className="md:hidden text-on-surface p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-surface/95 backdrop-blur-xl border-b border-outline/10 py-4 px-margin-lg flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="font-label-caps text-label-caps text-on-surface hover:text-primary transition-colors py-2"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
