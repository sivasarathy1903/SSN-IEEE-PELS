import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { gallery } from "../data/gallery";
import { events } from "../data/events";

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  // Group by event
  const eventsWithImages = events.filter(e => gallery.some(g => g.eventId === e.id));

  return (
    <>
      <Helmet>
        <title>Gallery | IEEE PELS SSN</title>
        <meta name="description" content="Official photographs from IEEE PELS SSN workshops, symposiums and events." />
      </Helmet>

      <section className="py-margin-lg mt-10 min-h-screen">
        <div className="max-w-container-max mx-auto px-margin-lg">
          
          <div className="text-center mb-16">
            <h1 className="font-headline-xl text-headline-xl text-white mb-6">Gallery</h1>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="space-y-24">
            {eventsWithImages.map(event => {
              const eventImages = gallery.filter(g => g.eventId === event.id);
              return (
                <div key={event.id}>
                  <h2 className="font-headline-lg text-headline-lg text-white mb-8 border-b border-outline/10 pb-4">
                    {event.name}
                  </h2>
                  <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                    {eventImages.map((img, idx) => (
                      <motion.div
                        key={img.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="relative group overflow-hidden rounded-xl cursor-pointer break-inside-avoid"
                        onClick={() => setSelectedImg(img.url)}
                      >
                        <img 
                          src={img.url} 
                          alt={img.caption} 
                          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 blur-0"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-surface/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                          <ZoomIn className="text-white w-8 h-8" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white text-sm font-medium truncate">{img.caption}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImg(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 bg-white/10 rounded-full backdrop-blur-md z-[101]"
              onClick={(e) => { e.stopPropagation(); setSelectedImg(null); }}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImg}
              alt="Fullscreen view"
              className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
