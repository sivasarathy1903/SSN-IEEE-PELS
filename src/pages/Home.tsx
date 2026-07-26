import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, useTransform, useScroll } from "framer-motion";
import { ArrowRight, ChevronRight, Zap } from "lucide-react";
import { siteConfig } from "../data/site";
import HeroPCBScene from "../components/HeroPCBScene";
import { ImageMarquee } from "../components/ImageMarquee";

export default function Home() {
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

      {/* Hero Section – Seamless Full-Bleed 3D Showcase */}
      <motion.section 
        style={{ opacity: heroOpacity }}
        className="relative h-[calc(100vh-80px)] min-h-[460px] max-h-[640px] flex items-center overflow-hidden bg-[#050706] text-white select-none" 
        id="home"
      >
        {/* Layer 0: Faint Engineering Grid (<3% opacity) */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.8) 1px, transparent 0),
                              linear-gradient(to right, rgba(200, 16, 46, 0.15) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(200, 16, 46, 0.15) 1px, transparent 1px)`,
            backgroundSize: '40px 40px, 80px 80px, 80px 80px',
            maskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 80%)'
          }}
        ></div>

        {/* Layer 1: Ambient Slow Red Glow (20-30s cycle) */}
        <motion.div 
          animate={{ opacity: [0.12, 0.18, 0.12], scale: [1, 1.08, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(200,16,46,0.25)_0%,_transparent_70%)] blur-[100px] pointer-events-none z-0"
        ></motion.div>

        {/* Seamless 3D Canvas spanning full-width of Hero with gradient blend */}
        <div className="absolute inset-0 -translate-x-[10%] md:translate-x-0 z-0 pointer-events-none">
          <HeroPCBScene />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050706]/85 via-[#050706]/45 to-[#050706] md:bg-gradient-to-r md:from-[#050706] md:via-[#050706]/50 md:to-transparent pointer-events-none" />
        </div>

        {/* Main Content Layout – Left Content overlay */}
        <div className="relative z-10 w-full h-full max-w-container-max mx-auto px-6 md:px-12 flex items-center">

          {/* LEFT – Text + Buttons */}
          <div className="w-full md:w-[52%] lg:w-[48%] shrink-0">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05, delayChildren: 0 }
                }
              }}
              className="w-full max-w-xl pointer-events-auto"
            >
              {/* Live Pill Badge */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
                }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md mb-4"
              >
                <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse shadow-[0_0_8px_rgba(200,16,46,0.9)]"></span>
                <span className="font-mono-data text-[11px] sm:text-xs text-neutral-300 tracking-widest uppercase font-semibold">IEEE PELS SSN CHAPTER</span>
              </motion.div>

              {/* Main Headline with Red Accent */}
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } }
                }}
                className="font-headline-xl text-3xl sm:text-4xl lg:text-5xl mb-3 text-white leading-[1.1] tracking-tight font-extrabold"
              >
                IEEE Power <br />
                <span className="text-[#C8102E]">
                  Electronics
                </span> <br />
                Society
              </motion.h1>

              {/* Tagline */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } }
                }}
                className="font-body-lg text-sm sm:text-base text-neutral-400 mb-6 max-w-lg font-light leading-relaxed"
              >
                Innovating Power Electronics.<br />
                Inspiring Future Engineers.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } }
                }}
                className="flex flex-wrap items-center gap-3.5"
              >
                <Link
                  to="/events"
                  className="bg-[#C8102E] text-white px-6 py-3 rounded-xl font-label-caps text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2.5 transition-all duration-200 hover:brightness-110 hover:scale-[1.02] hover:shadow-[0_8px_25px_rgba(200,16,46,0.5)] group active:scale-100 font-semibold"
                >
                  Explore Events
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
                </Link>
                <Link
                  to="/projects"
                  className="border border-white/15 bg-white/[0.04] text-white px-7 py-3.5 rounded-xl font-label-caps text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 backdrop-blur-xl transition-all duration-200 hover:bg-white/[0.08] hover:border-white/30 hover:scale-[1.02] active:scale-100 font-semibold"
                >
                  Explore Projects
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>

        </div>

        {/* Bottom Feature Metrics Bar & Scroll Indicator matching screenshot */}
        <div className="absolute bottom-3 inset-x-0 z-20 px-8 md:px-16 pointer-events-none flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Feature Pillars */}
          <div className="flex items-center gap-8 text-neutral-400 text-xs font-mono-data">
            <div className="flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-[#C8102E]" />
              <div>
                <div className="text-white font-semibold">Power Electronics</div>
                <div className="text-neutral-500 text-[10px]">Innovation</div>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2.5">
              <span className="material-symbols-outlined text-sm text-[#C8102E]">memory</span>
              <div>
                <div className="text-white font-semibold">Hands-on</div>
                <div className="text-neutral-500 text-[10px]">Learning</div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-2.5">
              <span className="material-symbols-outlined text-sm text-[#C8102E]">groups</span>
              <div>
                <div className="text-white font-semibold">Industry</div>
                <div className="text-neutral-500 text-[10px]">Collaboration</div>
              </div>
            </div>
          </div>

          {/* Scroll to Explore Mouse */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-4 h-7 rounded-full border border-white/30 flex justify-center p-1">
              <motion.div
                animate={{ y: [0, 6, 0], opacity: [0.8, 0.2, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-1 rounded-full bg-white"
              ></motion.div>
            </div>
            <span className="text-[9px] font-mono-data tracking-[0.25em] text-neutral-400 uppercase">SCROLL</span>
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
              className="relative h-[500px] glass-card overflow-hidden group rounded-xl"
            >
              <img 
                src="/gallery/synapse_0.jpg" 
                alt="IEEE PELS SSN Synapse Event" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-105" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
              <div className="absolute bottom-margin-md left-margin-md">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <Zap className="text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white">SSN</div>
                </div>
                <div className="font-label-caps text-label-caps text-primary tracking-widest uppercase">Student Branch Chapter</div>
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
