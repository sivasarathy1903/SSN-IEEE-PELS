
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
  // Duplicate images for seamless infinite loop
  const duplicatedImages = [...galleryImages, ...galleryImages];

  return (
    <section className="py-12 bg-[#080b09] border-y border-white/5 overflow-hidden select-none relative">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-marquee-scroll {
          display: flex;
          gap: 1.5rem;
          animation: marquee-scroll 80s linear infinite;
        }
        .animate-marquee-scroll:hover {
          animation-play-state: paused;
        }
      ` }} />

      <div className="max-w-container-max mx-auto px-6 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Chapter Event Gallery & Highlights</h2>
        </div>
      </div>

      {/* Edge Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#080b09] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#080b09] to-transparent z-10 pointer-events-none"></div>

      {/* Infinite Moving Marquee Container */}
      <div className="flex overflow-hidden">
        <div className="animate-marquee-scroll shrink-0">
          {duplicatedImages.map((img, idx) => (
            <div
              key={idx}
              className="relative w-[320px] sm:w-[380px] h-[220px] sm:h-[250px] rounded-2xl overflow-hidden group shrink-0 border border-white/10 glass-card bg-neutral-900 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(200,16,46,0.3)] transition-all duration-300"
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-primary/80 text-white backdrop-blur-md shadow-md border border-white/20">
                  {img.tag}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white text-sm font-semibold truncate group-hover:text-primary transition-colors">
                  {img.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
