import { Link } from "react-router-dom";
import { siteConfig } from "../../data/site";

export function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline/10 pt-margin-lg pb-margin-sm">
      <div className="max-w-container-max mx-auto px-margin-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-margin-lg mb-margin-lg">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3.5 mb-6 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-black p-0.5 border border-[#C8102E]/60 shadow-[0_0_15px_rgba(200,16,46,0.6)] group-hover:scale-105 transition-transform duration-200">
                <img src="/logo.jpg" alt="IEEE PELS SSN Logo" className="w-full h-full object-cover rounded-lg" />
              </div>
              <span className="font-headline-md text-headline-md font-bold text-on-surface tracking-tighter">IEEE PELS SSN</span>
            </Link>
            <div className="text-on-surface-variant font-body-md max-w-md space-y-1">
              <p className="font-semibold text-white">IEEE Power Electronics Society</p>
              <p className="text-sm">Student Branch Chapter</p>
              <p className="text-sm text-neutral-400">Sri Sivasubramaniya Nadar College of Engineering</p>
              <p className="text-sm text-neutral-400">SH 49A, Kalavakkam, Thaiyur, Tamil Nadu 603110</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-label-caps text-label-caps text-primary mb-6 uppercase tracking-widest">Quick Links</h4>
            <div className="flex flex-col gap-4">
              <Link to="/about" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">About Us</Link>
              <Link to="/events" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">Events</Link>
              <Link to="/projects" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">Projects</Link>
              <Link to="/team" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">Team</Link>
            </div>
          </div>

          <div>
            <h4 className="font-label-caps text-label-caps text-primary mb-6 uppercase tracking-widest">Connect</h4>
            <div className="flex flex-col gap-4">
              <a href={siteConfig.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">LinkedIn</a>
              <a href={siteConfig.contact.instagram} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">Instagram</a>
              <a href={`mailto:${siteConfig.contact.email}`} className="text-on-surface-variant hover:text-primary transition-colors font-body-md">Contact Us</a>
            </div>
          </div>
        </div>
        
        <div className="section-divider mb-8"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-on-surface-variant/60 font-mono-data text-sm">
            Copyright © {new Date().getFullYear()} IEEE PELS SSN. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
