import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { siteConfig } from "../data/site";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us | IEEE PELS SSN</title>
        <meta name="description" content="Get in touch with the IEEE PELS SSN Student Branch Chapter." />
      </Helmet>

      <section className="py-margin-lg mt-10 min-h-screen">
        <div className="max-w-container-max mx-auto px-margin-lg">
          
          <div className="text-center mb-16">
            <h1 className="font-headline-xl text-headline-xl text-white mb-6">Contact Us</h1>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-margin-lg">
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h2 className="font-headline-lg text-headline-lg text-white mb-8">Get in Touch</h2>
              
              <div className="flex items-start gap-4 p-6 glass-card rounded-xl">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-headline-md mb-2">Email</h3>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-on-surface-variant hover:text-primary transition-colors">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 glass-card rounded-xl">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-headline-md mb-2">Location</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    {siteConfig.contact.location}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <a href={siteConfig.contact.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-primary hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href={siteConfig.contact.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-primary hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-8 rounded-2xl"
            >
              <h3 className="font-headline-md text-white mb-6">Send a Message</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="name" className="block text-sm text-on-surface-variant mb-2">Name</label>
                  <input type="text" id="name" className="w-full bg-surface border border-outline/20 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-on-surface-variant mb-2">Email</label>
                  <input type="email" id="email" className="w-full bg-surface border border-outline/20 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Your email address" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-on-surface-variant mb-2">Message</label>
                  <textarea id="message" rows={4} className="w-full bg-surface border border-outline/20 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors resize-none" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-label-caps flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
                  Send Message
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>

          </div>

          {/* Google Maps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 h-[400px] w-full rounded-2xl overflow-hidden glass-card p-2"
          >
            <iframe 
              src={siteConfig.contact.googleMapsEmbed} 
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: '0.75rem' }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>

        </div>
      </section>
    </>
  );
}
