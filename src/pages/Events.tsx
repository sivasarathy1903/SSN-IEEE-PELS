import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, Calendar, MapPin, Users } from "lucide-react";
import { events } from "../data/events";

const categories = ["All Events", "Upcoming", "Past Events", "Workshops", "Technical Talks", "Symposiums", "Competitions", "Quiz Events"];

export default function Events() {
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
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card rounded-xl overflow-hidden group flex flex-col"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute top-4 left-4 bg-surface/80 backdrop-blur-md px-3 py-1 rounded-full border border-outline/20">
                        <span className="font-label-caps text-xs text-primary">{event.category}</span>
                      </div>
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

        </div>
      </section>
    </>
  );
}
