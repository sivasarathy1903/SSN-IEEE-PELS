
export interface GalleryItem {
  src: string;
  title: string;
  tag: string;
}

export const galleryImages: GalleryItem[] = [
  { src: "/gallery/first-%20Varghese%20James.jpg", title: "Behind The Circuits – 1st Place (Varghese James)", tag: "Behind The Circuits" },
  { src: "/gallery/second%20-%20Deepak%20S.jpg", title: "Behind The Circuits – 2nd Place (Deepak S)", tag: "Behind The Circuits" },
  { src: "/gallery/third%20Malleshkumar%20K.jpeg", title: "Behind The Circuits – 3rd Place (Malleshkumar K)", tag: "Behind The Circuits" },
  { src: "/gallery/Behind%20the%20Circuits%20(1)%20(1).png", title: "Behind The Circuits Event Banner", tag: "Behind The Circuits" },
  { src: "/gallery/synapse_0.jpg", title: "Synapse '25 Flagship Event", tag: "Synapse '25" },
  { src: "/gallery/ltspice_6.jpg", title: "LTSpice Circuit Simulation", tag: "LTSpice Workshop" },
  { src: "/gallery/synapse_1.jpg", title: "Technical Workshop Session", tag: "Synapse '25" },
  { src: "/gallery/ltspice_7.jpg", title: "Power Electronics Hands-on Lab", tag: "LTSpice Workshop" },
  { src: "/gallery/synapse_2.jpg", title: "Hardware Testing & Circuitry", tag: "Synapse '25" },
  { src: "/gallery/ltspice_8.jpg", title: "MATLAB & LTSpice Simulation", tag: "LTSpice Workshop" },
  { src: "/gallery/synapse_3.jpg", title: "Student Project Presentation", tag: "Synapse '25" },
  { src: "/gallery/ltspice_9.jpg", title: "Workshop Mentorship & Demo", tag: "LTSpice Workshop" },
  { src: "/gallery/synapse_4.jpg", title: "Firmware & Embedded Systems", tag: "Synapse '25" },
  { src: "/gallery/synapse_5.jpg", title: "Interactive Learning & Team", tag: "Synapse '25" },
  { src: "/gallery/deadend_firstprize.jpg", title: "Dead End Ahead – First Prize Winners", tag: "Dead End Ahead" },
  { src: "/gallery/deadend_secondprize.jpg", title: "Dead End Ahead – Second Prize Winners", tag: "Dead End Ahead" },
  { src: "/gallery/deadend_thirdprize.jpg", title: "Dead End Ahead – Third Prize Winners", tag: "Dead End Ahead" },
  { src: "/gallery/deadend_unnamed_1.jpg", title: "Dead End Ahead – Quiz Moments", tag: "Dead End Ahead" },
  { src: "/gallery/deadend_unnamed_2.jpg", title: "Dead End Ahead – Team Challenge", tag: "Dead End Ahead" },
  { src: "/gallery/deadend_unnamed_3.jpg", title: "Dead End Ahead – Rapid Fire Round", tag: "Dead End Ahead" },
];

export function ImageMarquee() {
  return (
    <section className="py-20 bg-[#080b09] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-container-max mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C8102E] animate-pulse"></span>
              <span className="font-mono-data text-xs text-[#C8102E] uppercase tracking-widest font-semibold">CHAPTER GALLERY</span>
            </div>
            <h2 className="font-headline-xl text-3xl md:text-4xl text-white font-extrabold tracking-tight">
              Event <span className="text-[#C8102E]">Highlights</span> & Showcase
            </h2>
          </div>
          <p className="text-neutral-400 text-sm max-w-md font-light">
            An interactive visual archive of our workshops, competitions, and technical summits at IEEE PELS SSN.
          </p>
        </div>

        {/* Professional Staggered Reveal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.45,
                delay: (idx % 4) * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              className={`relative overflow-hidden rounded-2xl group border border-white/10 bg-neutral-900 shadow-lg cursor-pointer ${
                idx % 7 === 0 ? "sm:col-span-2 sm:row-span-2 min-h-[360px]" : "min-h-[220px]"
              }`}
            >
              {/* Background Image */}
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out brightness-90 group-hover:brightness-105"
                loading="lazy"
              />

              {/* Dynamic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300"></div>

              {/* Top Category Badge */}
              <div className="absolute top-3.5 left-3.5 z-10">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono-data font-semibold bg-[#C8102E]/80 text-white backdrop-blur-md border border-white/20 shadow-sm">
                  {img.tag}
                </span>
              </div>

              {/* Bottom Caption on Hover/Reveal */}
              <div className="absolute bottom-0 inset-x-0 p-4 z-10 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white text-sm font-semibold leading-snug drop-shadow-md group-hover:text-[#C8102E] transition-colors">
                  {img.title}
                </h3>
              </div>

              {/* Hover Glow Edge */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#C8102E]/50 transition-colors pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
