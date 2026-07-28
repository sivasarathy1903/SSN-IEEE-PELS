import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Search, Calendar, MapPin } from "lucide-react";
import { events } from "../data/events";
import { galleryImages } from "../components/ImageMarquee";

const categories = ["All Events", "Upcoming", "Past Events", "Workshops", "Technical Talks", "Symposiums", "Competitions", "Quiz Events", "Hackathons"];

export default function Events() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All Events");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = useMemo(() => {
    const now = new Date().getTime();
    return events.filter((event) => {
      // Search matching
      const searchMatch = 
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!searchMatch) return false;

      // Category matching
      if (activeCategory === "All Events") return true;
      if (activeCategory === "Upcoming") return event.timestamp ? event.timestamp > now : false;
      if (activeCategory === "Past Events") return event.timestamp ? event.timestamp <= now : false;
      if (activeCategory === "Workshops") return event.category === "Workshop";
      if (activeCategory === "Technical Talks") return event.category === "Technical Talk";
      if (activeCategory === "Symposiums") return event.category === "Technical Symposium";
      if (activeCategory === "Competitions") return event.category === "Competition";
      if (activeCategory === "Quiz Events") return event.category === "Technical Quiz";
      if (activeCategory === "Hackathons") return event.category === "Hackathon";

      return true;
    });
  }, [activeCategory, searchQuery]);

  return (
    <>
      <Helmet>
        <title>Events | IEEE PELS SSN</title>
        <meta name="description" content="Explore workshops, symposiums, and competitions at IEEE PELS SSN." />
      </Helmet>

      <section className="py-margin-lg mt-10 min-h-screen">
        <div className="max-w-container-max mx-auto px-margin-lg">
          
          <div className="text-center mb-16">
            <h1 className="font-headline-xl text-headline-xl text-white mb-6">Events</h1>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          {/* Filters & Search */}
          <div className="mb-12 flex flex-col md:flex-row gap-6 justify-between items-center bg-surface-container-high p-4 rounded-xl border border-outline/10">
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full font-label-caps text-xs tracking-wider transition-all duration-300 ${
                    activeCategory === cat 
                      ? "bg-primary text-white shadow-[0_0_15px_rgba(200,16,46,0.3)]" 
                      : "bg-surface text-on-surface-variant hover:bg-surface-bright"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <input 
                type="text" 
                placeholder="Search events..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface border border-outline/20 rounded-full py-2 pl-10 pr-4 text-on-surface focus:outline-none focus:border-primary transition-colors"
              />
              <Search className="absolute left-3 top-2.5 text-on-surface-variant w-4 h-4" />
            </div>
          </div>

          {/* Events Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredEvents.length > 0 ? (
                filteredEvents
                  .slice()
                  .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
                  .map((event) => (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card rounded-2xl overflow-hidden flex flex-col group cursor-pointer border border-white/10 hover:border-[#C8102E]/40 relative"
                    onClick={() => {
                      if (event.externalUrl) {
                        window.open(event.externalUrl, "_blank", "noopener,noreferrer");
                      } else {
                        navigate(`/events/${event.id}`);
                      }
                    }}
                    whileHover={{ y: -4, boxShadow: "0 15px 30px -10px rgba(200, 16, 46, 0.3)" }}
                  >
                    {/* Primary Poster Image Container */}
                    <div className="relative h-72 sm:h-80 overflow-hidden bg-neutral-950 border-b border-white/10">
                      <img 
                        src={event.image} 
                        alt={event.name} 
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 brightness-95 group-hover:brightness-100"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/gallery/synapse_0.jpg";
                        }}
                      />

                      {/* Category badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="font-bold text-[10px] uppercase tracking-wider text-white bg-[#C8102E] px-3 py-1 rounded-full shadow-md">
                          {event.category}
                        </span>
                      </div>

                      {/* Upcoming / status badge */}
                      {event.statusBadge && (
                        <div className={`absolute top-3 right-3 z-10 flex items-center gap-1.5 backdrop-blur-md px-3 py-1 rounded-full border shadow-lg ${
                          event.statusBadge === "COMING SOON"
                            ? "bg-amber-950/80 border-amber-500/60 text-amber-300"
                            : "bg-black/80 border-[#E8172E]/60 text-[#FF4D6D]"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                            event.statusBadge === "COMING SOON" ? "bg-amber-400" : "bg-[#E8172E]"
                          }`} />
                          <span className="font-extrabold text-[9px] tracking-widest uppercase">{event.statusBadge}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="font-extrabold text-xl text-white mb-3 group-hover:text-[#C8102E] transition-colors line-clamp-1">
                        {event.name}
                      </h3>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-gray-300 text-xs">
                          <Calendar className="w-3.5 h-3.5 text-[#C8102E]" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300 text-xs">
                          <MapPin className="w-3.5 h-3.5 text-[#C8102E]" />
                          <span className="truncate">{event.venue}</span>
                        </div>
                      </div>

                      <p className="text-gray-400 text-xs line-clamp-2 mb-6 flex-grow leading-relaxed">
                        {event.description}
                      </p>
                      
                      <div className="mt-auto">
                        {event.externalUrl ? (
                            <a
                            href={event.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#C8102E] to-[#E8172E] text-white py-2.5 px-4 rounded-lg font-extrabold text-xs tracking-wider uppercase transition-all hover:shadow-[0_0_20px_rgba(200,16,46,0.5)] hover:from-[#E8172E] hover:to-[#C8102E]"
                          >
                            <span>REGISTER NOW</span>
                            <span>→</span>
                          </a>
                        ) : (
                          <Link 
                            to={`/events/${event.id}`}
                            className="inline-flex items-center justify-between w-full border border-white/15 text-white group-hover:border-[#C8102E] group-hover:bg-[#C8102E] py-2.5 px-4 rounded-lg font-bold text-xs tracking-wider uppercase transition-all"
                          >
                            <span>READ MORE</span>
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-20"
                >
                  <p className="text-on-surface-variant font-body-lg">No events found matching your criteria.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Event Photo Gallery with Reveal Animation */}
          <div className="mt-24">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                <span className="font-mono-data text-xs text-primary uppercase tracking-widest font-semibold">Chapter Moments</span>
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
              </div>
              <h2 className="font-headline-lg text-3xl md:text-4xl text-white font-extrabold mb-4">
                Event <span className="text-primary">Highlights</span>
              </h2>
              <p className="text-neutral-400 max-w-lg mx-auto text-sm">
                A glimpse into our workshops, symposiums and technical sessions at IEEE PELS SSN.
              </p>
            </motion.div>

            {/* Staggered Reveal Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((img, idx) => (
                <motion.div
                  key={img.src}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.55, delay: (idx % 4) * 0.1, ease: "easeOut" }}
                  whileHover={{ scale: 1.04, zIndex: 10 }}
                  className={`relative overflow-hidden rounded-2xl group border border-white/10 bg-neutral-900 ${
                    idx === 0 || idx === 5 ? "col-span-2 row-span-2 h-[360px]" : "h-[180px]"
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>

                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-primary/80 text-white backdrop-blur-md shadow-sm border border-white/20">
                      {img.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                    <p className="text-white text-xs font-semibold truncate">{img.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
