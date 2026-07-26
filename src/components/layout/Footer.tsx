import { Link } from "react-router-dom";
import { siteConfig } from "../../data/site";

export function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline/10 pt-margin-lg pb-margin-sm">
      <div className="max-w-container-max mx-auto px-margin-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-margin-lg mb-margin-lg">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3.5 group mb-6 w-fit">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-black p-0.5 border border-[#C8102E]/60 shadow-[0_0_15px_rgba(200,16,46,0.5)] group-hover:scale-105 transition-transform duration-200">
                <img src="/logo.jpg" alt="IEEE PELS SSN Logo" className="w-full h-full object-cover rounded-lg" />
              </div>
              <span className="font-headline-md text-headline-md font-extrabold text-on-surface tracking-tight group-hover:text-primary transition-colors">IEEE PELS SSN</span>
            </Link>
            <p className="text-on-surface-variant/90 font-body-md max-w-md leading-relaxed">
              <span className="font-semibold text-white tracking-wide block mb-1">IEEE Power Electronics Society</span>
              <span className="text-neutral-400 block mb-3 font-medium">Student Branch Chapter</span>
            </p>
            <div className="flex items-start gap-2.5 text-on-surface-variant/70 text-sm max-w-sm mt-4">
              <span className="material-symbols-outlined text-primary shrink-0 text-lg mt-0.5">location_on</span>
              <span className="font-body-md text-sm text-neutral-400 leading-relaxed">{siteConfig.contact.location}</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-label-caps text-label-caps text-primary mb-6 uppercase tracking-widest">Quick Links</h4>
            <div className="flex flex-col gap-4">
              <Link to="/about" className="group flex items-center gap-2 text-on-surface-variant hover:text-primary transition-all font-body-md hover:translate-x-1 duration-200">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-125 transition-all"></span>
                About Us
              </Link>
              <Link to="/events" className="group flex items-center gap-2 text-on-surface-variant hover:text-primary transition-all font-body-md hover:translate-x-1 duration-200">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-125 transition-all"></span>
                Events
              </Link>
              <Link to="/projects" className="group flex items-center gap-2 text-on-surface-variant hover:text-primary transition-all font-body-md hover:translate-x-1 duration-200">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-125 transition-all"></span>
                Projects
              </Link>
              <Link to="/team" className="group flex items-center gap-2 text-on-surface-variant hover:text-primary transition-all font-body-md hover:translate-x-1 duration-200">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-125 transition-all"></span>
                Team
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-label-caps text-label-caps text-primary mb-6 uppercase tracking-widest">Connect</h4>
            <div className="flex flex-col gap-4">
              <a href={siteConfig.contact.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-on-surface-variant hover:text-primary transition-all font-body-md hover:translate-x-1 duration-200">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-125 transition-all"></span>
                LinkedIn
              </a>
              <a href={siteConfig.contact.instagram} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-on-surface-variant hover:text-primary transition-all font-body-md hover:translate-x-1 duration-200">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-125 transition-all"></span>
                Instagram
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="group flex items-center gap-2 text-on-surface-variant hover:text-primary transition-all font-body-md hover:translate-x-1 duration-200">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-125 transition-all"></span>
                Contact Us
              </a>
            </div>
          </div>
        </div>
        
        <div className="section-divider mb-8"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-2">
          <p className="text-on-surface-variant/60 font-mono-data text-sm">
            Copyright © {new Date().getFullYear()} IEEE PELS SSN. All Rights Reserved.
          </p>
          <p className="text-on-surface-variant/60 font-mono-data text-sm flex items-center gap-1.5">
            Designed & Developed by <span className="text-primary hover:underline hover:text-primary-container transition-colors cursor-pointer font-semibold">IEEE PELS SSN Web Team</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
