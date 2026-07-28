import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { siteConfig } from "../data/site";
import { ImageMarquee } from "../components/ImageMarquee";

const aboutPhotos = [
  { src: "/gallery/synapse_0.jpg", title: "Synapse Technical Session", tag: "Workshop" },
  { src: "/gallery/synapse_1.jpg", title: "IEEE PELS SSN Chapter Event", tag: "Symposium" },
  { src: "/gallery/ltspice_6.jpg", title: "Hands-on Hardware Lab", tag: "Hands-on" },
  { src: "/gallery/deadend_firstprize.jpg", title: "Technical Competition", tag: "Competition" }
];

const heroVideos = [
  "/hero-bg-2.mp4", // 277095_medium.mp4
  "/hero-bg-3.mp4"  // 174086-850404739_medium.mp4
];

export default function Home() {
  // Persistent refs for each video element — never changes across renders
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Hero background multi-video playlist rotation state
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Smooth photo stack rotation state
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const photoTimer = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % aboutPhotos.length);
    }, 3500);
    return () => clearInterval(photoTimer);
  }, []);

  // ─── CORE FIX: useEffect explicitly controls every video on index change ───
  // This runs every time currentVideoIndex changes — including when it cycles
  // back to 0 — which ref callbacks alone cannot reliably detect.
  useEffect(() => {
    const activeVideo = videoRefs.current[currentVideoIndex];

    // First pause + reset all inactive videos
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index !== currentVideoIndex) {
        video.pause();
        video.currentTime = 0;
      }
    });

    if (!activeVideo) return;

    // Reset and play the active video from the beginning
    activeVideo.currentTime = 0;
    activeVideo.play().catch((err) => {
      console.warn("Hero video playback failed:", err);
    });
  }, [currentVideoIndex]);

  // Scroll opacity reaction
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.4]);

  return (
    <>
      <Helmet>
        <title>IEEE PELS SSN | Home</title>
        <meta name="description" content="IEEE Power Electronics Society Student Branch Chapter at SSN College of Engineering. Innovating Power Electronics." />
        <meta name="keywords" content="IEEE PELS, Power Electronics, SSN, MATLAB, Simulink, Embedded Systems, Hardware Design" />
      </Helmet>

      {/* Hero Section – Seamless Full-Bleed Cinematic Showcase */}
      <motion.section 
        style={{ opacity: heroOpacity }}
        className="relative h-[calc(100vh-100px)] min-h-[500px] max-h-[720px] flex items-center overflow-hidden bg-[#05070A] text-white select-none" 
        id="home"
      >
        {/* Layer 0: Restrained Technical Subliminal Overlay (<3-6% opacity) */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.8) 1px, transparent 0),
                              linear-gradient(to right, rgba(200, 16, 46, 0.2) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(200, 16, 46, 0.2) 1px, transparent 1px)`,
            backgroundSize: '40px 40px, 80px 80px, 80px 80px',
            maskImage: 'radial-gradient(circle at 50% 50%, black 40%, transparent 85%)'
          }}
        ></div>

        {/* Layer 1: Subtle Red Glow Ambient Accent */}
        <motion.div 
          animate={{ opacity: [0.1, 0.18, 0.1], scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(200,16,46,0.2)_0%,_transparent_70%)] blur-[90px] pointer-events-none z-0"
        ></motion.div>

        {/* Right Side Background Image */}
        <div className="absolute inset-0 left-0 md:left-[38%] w-full md:w-[62%] h-full z-0 overflow-hidden pointer-events-none">
          {/* Seamless Edge Gradient Blend Masks — always on top */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-transparent to-[#05070A] z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#05070A] via-[#05070A]/60 to-transparent z-10"></div>

          {/* Hero Background Image */}
          <img 
            src="/hero-synapse.jpg" 
            alt="IEEE PELS SSN Chapter Team" 
            className="absolute inset-0 w-full h-full object-cover object-center brightness-90"
            style={{ zIndex: 0 }}
          />
        </div>

        {/* Main Content Layout – Left 45% Content overlay */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex items-center h-full">

          {/* LEFT – Text + Buttons */}
          <div className="w-full md:w-[46%] lg:w-[44%] shrink-0">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.1 }
                }
              }}
              className="w-full pointer-events-auto"
            >
              {/* Minimal Chapter Badge */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md mb-5"
              >
                <span className="w-2 h-2 rounded-full bg-[#C8102E] shadow-[0_0_8px_rgba(200,16,46,0.9)]"></span>
                <span className="text-[11px] text-gray-300 tracking-widest uppercase font-semibold">IEEE PELS SSN CHAPTER</span>
              </motion.div>

              {/* Main Headline with Red Accent */}
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                }}
                className="text-4xl sm:text-5xl lg:text-[3.4rem] mb-4 text-white leading-[1.12] tracking-tight font-black"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                IEEE <span className="text-[#C8102E] whitespace-nowrap">Power Electronics</span> <br />
                Society
              </motion.h1>

              {/* Tagline */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                }}
                className="text-sm sm:text-base text-gray-300 mb-8 max-w-md font-normal leading-relaxed"
              >
                Innovating Power Electronics.<br />
                Inspiring Future Engineers.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                }}
                className="flex flex-wrap items-center gap-4"
              >
                <Link
                  to="/events"
                  className="bg-[#C8102E] text-white px-6 py-3.5 rounded-xl text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2.5 transition-all duration-200 hover:bg-[#E31837] hover:scale-[1.02] shadow-lg shadow-[#C8102E]/25 group font-bold"
                >
                  EXPLORE EVENTS
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
                </Link>
                <Link
                  to="/projects"
                  className="border border-white/20 bg-white/[0.05] text-white px-6 py-3.5 rounded-xl text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 backdrop-blur-md transition-all duration-200 hover:bg-white/[0.12] hover:border-white/40 hover:scale-[1.02] font-bold"
                >
                  EXPLORE PROJECTS
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>

        </div>

        {/* Minimal Scroll Indicator */}
        <div className="absolute bottom-4 inset-x-0 z-20 pointer-events-none flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col items-center gap-1.5"
          >
            <div className="w-4 h-7 rounded-full border border-white/30 flex justify-center p-1">
              <motion.div
                animate={{ y: [0, 6, 0], opacity: [0.8, 0.2, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-1 rounded-full bg-white"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* About Preview Section */}
      <section className="py-margin-lg relative">
        <div className="max-w-container-max mx-auto px-margin-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-margin-lg items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h3 className="font-label-caps text-label-caps text-primary mb-4 uppercase tracking-[0.3em]">About Us</h3>
              <h2 className="font-headline-lg text-headline-lg mb-8 text-white">Empowering Future Engineers</h2>
              <p className="text-on-surface-variant font-body-lg mb-8 leading-relaxed whitespace-pre-line">
                {siteConfig.aboutText}
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors font-label-caps uppercase tracking-widest">
                Read More <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="relative h-[420px] md:h-[480px] flex items-center justify-center"
            >
              {/* Smooth Dynamic Photo Stack Showcase */}
              <div className="relative w-full max-w-md h-[380px]">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentPhotoIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-2xl overflow-hidden border border-[#C8102E]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-neutral-900"
                  >
                    <img 
                      src={aboutPhotos[currentPhotoIndex].src} 
                      alt={aboutPhotos[currentPhotoIndex].title} 
                      className="w-full h-full object-cover brightness-95" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent"></div>
                    
                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-bold text-white bg-[#C8102E] px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1.5 inline-block">
                          {aboutPhotos[currentPhotoIndex].tag}
                        </span>
                        <div className="text-white font-extrabold text-lg leading-tight">IEEE PELS SSN</div>
                        <div className="text-gray-300 text-xs font-medium tracking-wide">
                          {aboutPhotos[currentPhotoIndex].title}
                        </div>
                      </div>

                      {/* Official IEEE PELS Badge replacing lightning icon */}
                      <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-lg border border-gray-200 shrink-0">
                        <img 
                          src="/ieee_pels_logo.svg" 
                          alt="IEEE PELS Logo" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Progress Indicators */}
                <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
                  {aboutPhotos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPhotoIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentPhotoIndex ? "w-6 bg-[#C8102E]" : "w-2 bg-white/20 hover:bg-white/40"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-surface-container-lowest relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="h-full w-full" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #c8102e 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
        </div>
        <div className="max-w-container-max mx-auto px-margin-lg relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-gutter text-center">
            {siteConfig.stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
                className="p-6 glass-card border-none rounded-xl"
              >
                <div className="font-headline-xl text-headline-xl text-white mb-2">{stat.value}</div>
                <div className="font-label-caps text-label-caps text-on-surface-variant tracking-widest">{stat.label.toUpperCase()}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Infinite Moving Marquee Image Gallery (Positioned at the very end of Home page) */}
      <ImageMarquee />
    </>
  );
}
