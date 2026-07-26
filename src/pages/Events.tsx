import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Search, Calendar, MapPin, Users } from "lucide-react";
import { events } from "../data/events";
import { galleryImages } from "../components/ImageMarquee";

const categories = ["All Events", "Upcoming", "Past Events", "Workshops", "Technical Talks", "Symposiums", "Competitions", "Quiz Events"];

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
                filteredEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                    className="glass-card rounded-2xl overflow-hidden flex flex-col group cursor-pointer"
                    onClick={() => navigate(`/events/${event.id}`)}
                    whileHover={{ y: -10, scale: 1.02, boxShadow: "0 20px 40px -10px rgba(227, 30, 36, 0.4)" }}
                  >
                    {/* Category tag only — no image */}
                    <div className="relative h-14 overflow-hidden bg-gradient-to-r from-[#0d0e14] to-[#141620] flex items-center px-6 border-b border-white/5">
                      <span className="font-label-caps text-xs text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">{event.category}</span>
                    </div>
                    
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="font-headline-md text-headline-md text-white mb-4 group-hover:text-primary transition-colors line-clamp-2">
                        {event.name}
                      </h3>
                      
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="truncate">{event.venue}</span>
                        </div>
                        <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                          <Users className="w-4 h-4 text-primary" />
                          <span>{event.participants} Participants</span>
                        </div>
                      </div>

                      <p className="text-on-surface-variant text-sm line-clamp-3 mb-6 flex-grow">
                        {event.description}
                      </p>
                      
                      <div className="mt-auto">
                        <Link 
                          to={`/events/${event.id}`}
                          className="inline-block w-full text-center border border-primary text-primary hover:bg-primary hover:text-white py-3 rounded-lg font-label-caps text-sm transition-all"
                        >
                          Read More
                        </Link>
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
