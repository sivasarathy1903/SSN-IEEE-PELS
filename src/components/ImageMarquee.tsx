
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, X, Images, Calendar } from "lucide-react";

export interface EventFolder {
  id: string;
  name: string;
  category: string;
  date: string;
  count: number;
  coverImage: string;
  description: string;
  photos: { src: string; title: string }[];
}

export const eventFolders: EventFolder[] = [
  {
    id: "dead-end-ahead",
    name: "Dead End Ahead 2026",
    category: "Technical Quiz",
    date: "16th Feb 2026",
    count: 6,
    coverImage: "/gallery/deadend_firstprize.jpg",
    description: "Pop-culture themed non-tech & tech quiz (Stranger Things & Harry Potter) featuring online buzzers and strategic bidding rounds.",
    photos: [
      { src: "/gallery/deadend_firstprize.jpg", title: "1st Place Winners – Tarrun & Solomon" },
      { src: "/gallery/deadend_secondprize.jpg", title: "2nd Place Winners – Mughilan Paul & Siddarth Krishna" },
      { src: "/gallery/deadend_thirdprize.jpg", title: "3rd Place Winners – Arvindh & Shashwath" },
      { src: "/gallery/deadend_unnamed_1.jpg", title: "Buzzer Round Highlights" },
      { src: "/gallery/deadend_unnamed_2.jpg", title: "Strategic Bidding Segment" },
      { src: "/gallery/deadend_unnamed_3.jpg", title: "Rapid-Fire Final Round" },
    ]
  },
  {
    id: "synapse-25",
    name: "Synapse '25 Flagship Summit",
    category: "Flagship Summit",
    date: "26-27 Sept 2025",
    count: 6,
    coverImage: "/gallery/synapse_0.jpg",
    description: "Annual IEEE PELS SSN technical symposium featuring hardware project demos and expert talks.",
    photos: [
      { src: "/gallery/synapse_0.jpg", title: "Synapse '25 Inaugural Ceremony" },
      { src: "/gallery/synapse_1.jpg", title: "Hardware Prototype Showcase" },
      { src: "/gallery/synapse_2.jpg", title: "Power Electronics Component Testbed" },
      { src: "/gallery/synapse_3.jpg", title: "Technical Paper Presentations" },
      { src: "/gallery/synapse_4.jpg", title: "Embedded Firmware Demonstration" },
      { src: "/gallery/synapse_5.jpg", title: "Student Branch Interactive Networking" },
    ]
  },
  {
    id: "ltspice-workshop",
    name: "Spice It Up (LTspice Workshop)",
    category: "Hands-on Workshop",
    date: "8th Aug 2025",
    count: 5,
    coverImage: "/gallery/ltspice_6.jpg",
    description: "Practical circuit simulation workshop covering Op-Amps, BJTs, Differential Amplifiers, and Waveform Generators.",
    photos: [
      { src: "/gallery/ltspice_6.jpg", title: "LTspice Simulation Guidance" },
      { src: "/gallery/ltspice_7.jpg", title: "Mentor Demonstration & Circuit Analysis" },
      { src: "/gallery/ltspice_8.jpg", title: "Interdisciplinary Hands-on Lab Session" },
      { src: "/gallery/ltspice_9.jpg", title: "Student Team Mentorship" },
      { src: "/gallery/synapse_10.jpg", title: "Closing Remarks & Certificate Distribution" },
    ]
  },
  {
    id: "behind-circuits",
    name: "Behind The Circuits",
    category: "Photography Contest",
    date: "2025 - 2026",
    count: 4,
    coverImage: "/gallery/first-%20Varghese%20James.jpg",
    description: "Creative photography competition capturing hardware engineering moments and circuit aesthetic excellence.",
    photos: [
      { src: "/gallery/first-%20Varghese%20James.jpg", title: "1st Place – Varghese James (III EEE)" },
      { src: "/gallery/second%20-%20Deepak%20S.jpg", title: "2nd Place – Deepak S" },
      { src: "/gallery/third%20Malleshkumar%20K.jpeg", title: "3rd Place – Malleshkumar K" },
      { src: "/gallery/Behind%20the%20Circuits%20(1)%20(1).png", title: "Official Behind The Circuits Banner" },
    ]
  }
];

export const galleryImages = eventFolders.flatMap((folder) =>
  folder.photos.map((p) => ({ src: p.src, title: p.title, tag: folder.name }))
);

export function ImageMarquee() {
  const [selectedFolder, setSelectedFolder] = useState<EventFolder | null>(null);

  return (
    <section className="py-20 bg-[#080b09] border-t border-white/10 relative overflow-hidden select-none">
      <div className="max-w-container-max mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C8102E] animate-pulse"></span>
              <span className="font-mono-data text-xs text-[#C8102E] uppercase tracking-widest font-semibold">EVENT ARCHIVES & FOLDERS</span>
            </div>
            <h2 className="font-headline-xl text-3xl md:text-4xl text-white font-extrabold tracking-tight">
              Interactive Event <span className="text-[#C8102E]">Vaults</span>
            </h2>
          </div>
          <p className="text-neutral-400 text-sm max-w-md font-light">
            Click on any event folder to open and reveal the photos.
          </p>
        </div>

        {/* Event Folders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {eventFolders.map((folder, idx) => (
            <motion.div
              key={folder.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setSelectedFolder(folder)}
              className="group relative cursor-pointer"
            >
              {/* Stacked Backing Card Effect */}
              <div className="absolute inset-0 bg-[#C8102E]/20 rounded-2xl transform rotate-2 group-hover:rotate-4 group-hover:scale-102 transition-transform duration-300 pointer-events-none"></div>
              <div className="absolute inset-0 bg-neutral-800/60 rounded-2xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300 pointer-events-none"></div>

              {/* Main Folder Front Card */}
              <div className="relative glass-card border border-white/15 bg-neutral-900/90 rounded-2xl overflow-hidden p-5 shadow-2xl group-hover:border-[#C8102E]/60 transition-all duration-300">
                {/* Folder Top Tab Graphic */}
                <div className="flex items-center justify-between gap-2 mb-4 h-9">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C8102E]/20 border border-[#C8102E]/40 text-[#C8102E] shrink min-w-0">
                    <Folder className="w-3.5 h-3.5 shrink-0" />
                    <span className="font-mono-data text-[10px] sm:text-[11px] font-semibold truncate">{folder.category}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-neutral-400 font-mono-data shrink-0">
                    <Images className="w-3.5 h-3.5 text-[#C8102E]" />
                    <span>{folder.count} photos</span>
                  </div>
                </div>

                {/* Folder Preview Image Stack with Fan-Out Effect */}
                <div className="relative h-44 w-full rounded-xl overflow-hidden mb-4 bg-black/50">
                  <img
                    src={folder.coverImage}
                    alt={folder.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-90 group-hover:brightness-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* Floating Open Prompt Pill */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-xs">
                    <span className="bg-[#C8102E] text-white font-label-caps text-xs px-4 py-2 rounded-full uppercase tracking-wider shadow-lg transform group-hover:scale-105 transition-transform">
                      Open Folder
                    </span>
                  </div>
                </div>

                {/* Folder Details */}
                <div>
                  <div className="flex items-center gap-1.5 text-neutral-400 text-xs font-mono-data mb-1">
                    <Calendar className="w-3.5 h-3.5 text-[#C8102E]" />
                    <span>{folder.date}</span>
                  </div>
                  <h3 className="font-headline-md text-lg text-white font-bold group-hover:text-[#C8102E] transition-colors truncate">
                    {folder.name}
                  </h3>
                  <p className="text-neutral-400 text-xs line-clamp-2 font-light mt-1">
                    {folder.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Folder Lightbox View when clicked */}
      <AnimatePresence>
        {selectedFolder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedFolder(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="relative w-full max-w-5xl max-h-[85vh] bg-neutral-900 border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-neutral-950/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C8102E]/20 border border-[#C8102E]/40 flex items-center justify-center text-[#C8102E]">
                    <Folder className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white text-xl font-bold font-headline-md">{selectedFolder.name}</h3>
                    <p className="text-neutral-400 text-xs font-mono-data">{selectedFolder.category} • {selectedFolder.date} • {selectedFolder.count} Photos</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFolder(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C8102E] text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Photo Vault */}
              <div className="p-6 overflow-y-auto custom-scrollbar flex-grow">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {selectedFolder.photos.map((photo, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="group relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 aspect-video shadow-md"
                    >
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-0 inset-x-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-xs font-semibold drop-shadow">{photo.title}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
