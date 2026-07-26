import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import { ArrowRight, ChevronRight, Zap } from "lucide-react";
import { siteConfig } from "../data/site";
import { lazy, Suspense } from "react";

const HeroPCBScene = lazy(() => import("../components/HeroPCBScene"));

export default function Home() {
  // Mouse position tracking for ultra-smooth 3D parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax layers
  const textX = useTransform(mouseX, [-500, 500], [-2, 2]);
  const textY = useTransform(mouseY, [-500, 500], [-2, 2]);

  const bgX = useTransform(mouseX, [-500, 500], [-10, 10]);
  const bgY = useTransform(mouseY, [-500, 500], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Scroll opacity/scale reaction
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.96]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.4]);

  return (
    <>
      <Helmet>
        <title>IEEE PELS SSN | Home</title>
        <meta name="description" content="IEEE Power Electronics Society Student Branch Chapter at SSN College of Engineering. Innovating Power Electronics." />
        <meta name="keywords" content="IEEE PELS, Power Electronics, SSN, MATLAB, Simulink, Embedded Systems, Hardware Design" />
      </Helmet>

      {/* Hero Section - Engineering Excellence & Motion Design */}
      <motion.section 
        style={{ scale: heroScale, opacity: heroOpacity }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-[92vh] min-h-[650px] flex items-center overflow-hidden bg-black text-white select-none" 
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
          style={{ x: bgX, y: bgY }}
          animate={{ opacity: [0.12, 0.18, 0.12], scale: [1, 1.08, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(200,16,46,0.25)_0%,_transparent_70%)] blur-[140px] pointer-events-none z-0"
        ></motion.div>

        {/* Layer 2: Moving Studio Spotlight (20s cycle, 5% opacity) */}
        <motion.div
          animate={{ 
            x: ["-30%", "30%", "-30%"],
            y: ["-20%", "20%", "-20%"]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05)_0%,_transparent_60%)] pointer-events-none z-0"
        ></motion.div>

        {/* Layer 3: PCB Circuit Traces & Dynamic Current Signals (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-[2] opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
          {/* Circuit Lines */}
          <path d="M 0 150 H 300 L 400 250 H 800" stroke="#C8102E" strokeWidth="1" fill="none" />
          <path d="M 200 0 V 200 L 350 350 V 700" stroke="#C8102E" strokeWidth="1" fill="none" strokeDasharray="4 4" />
          <path d="M 1200 100 H 900 L 750 250 H 500" stroke="#C8102E" strokeWidth="1" fill="none" />
          <path d="M 1000 800 V 500 L 850 350 V 0" stroke="#C8102E" strokeWidth="1" fill="none" />
          
          {/* Circuit Nodes */}
          <circle cx="300" cy="150" r="3" fill="#C8102E" />
          <circle cx="400" cy="250" r="3" fill="#C8102E" />
          <circle cx="900" cy="100" r="3" fill="#C8102E" />
          <circle cx="750" cy="250" r="3" fill="#C8102E" />
        </svg>

        {/* Electrical Wave Pulsing Energy Effect */}
        <div className="absolute inset-0 pointer-events-none z-[3] overflow-hidden opacity-20">
          <motion.div 
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            className="w-1/2 h-full bg-gradient-to-r from-transparent via-primary/40 to-transparent transform -skew-x-12 blur-md"
          ></motion.div>
        </div>

        {/* Layer 4: Floating Laboratory Dust Particles (Parallax, No cartoon emojis) */}
        <div className="absolute inset-0 pointer-events-none z-[3]">
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: `${(i * 6.5) % 100}%`, 
                y: `${(i * 7.2) % 100}%`,
                opacity: 0.04 + (i % 4) * 0.02 
              }}
              animate={{ 
                y: [`${(i * 7.2) % 100}%`, `${((i * 7.2) % 100) - 8}%`, `${(i * 7.2) % 100}%`],
                x: [`${(i * 6.5) % 100}%`, `${((i * 6.5) % 100) + 4}%`, `${(i * 6.5) % 100}%`]
              }}
              transition={{ 
                duration: 14 + (i % 5) * 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute w-[2px] h-[2px] rounded-full bg-white/60 shadow-[0_0_4px_white]"
            ></motion.div>
          ))}
        </div>

        {/* Main Content Layout */}
        <div className="relative z-10 max-w-container-max mx-auto px-margin-lg w-full flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Text Container with Precise Motion Staggering */}
          <motion.div 
            style={{ x: textX, y: textY }}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.2 }
              }
            }}
            className="flex-1 max-w-2xl"
          >
            {/* Live Badge */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(200,16,46,0.8)]"></span>
              <span className="font-mono-data text-xs text-primary tracking-widest uppercase font-semibold">IEEE PELS SSN CHAPTER</span>
            </motion.div>
            
            {/* Main Title - Lines fading in with Y translation */}
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="font-headline-xl text-headline-xl mb-6 text-white leading-[1.08] tracking-tight"
            >
              IEEE Power <br/>
              <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                Electronics Society
              </span>
            </motion.h1>
            
            {/* Tagline */}
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="font-body-lg text-lg text-on-surface-variant mb-10 max-w-xl font-light leading-relaxed"
            >
              {siteConfig.tagline}
            </motion.p>
            
            {/* Buttons */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link 
                to="/events" 
                className="bg-primary text-white px-8 py-4 rounded-xl font-label-caps text-sm tracking-wider uppercase flex items-center gap-3 transition-all duration-200 hover:brightness-110 hover:scale-[1.02] hover:shadow-[0_8px_25px_rgba(200,16,46,0.4)] group active:scale-100"
              >
                Explore Events
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
              </Link>
              <Link 
                to="/projects" 
                className="border border-white/15 bg-white/[0.04] text-white px-8 py-4 rounded-xl font-label-caps text-sm tracking-wider uppercase flex items-center gap-2 backdrop-blur-xl transition-all duration-200 hover:bg-white/[0.08] hover:border-white/30 hover:scale-[1.02] active:scale-100"
              >
                Explore Projects
              </Link>
            </motion.div>
          </motion.div>

          {/* ── Cinematic 3D PCB Scene (React Three Fiber) ── */}
          <div className="flex-1 flex items-center justify-center relative min-h-[480px] w-full md:w-auto">
            {/* Soft breathing ambient aura behind canvas */}
            <motion.div
              animate={{ scale: [0.98, 1.04, 0.98], opacity: [0.35, 0.65, 0.35] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(200,16,46,0.35)_0%,_transparent_70%)] blur-[90px] pointer-events-none"
            />
            <Suspense
              fallback={
                <div className="w-full h-[480px] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 border-2 border-primary/40 border-t-primary rounded-full animate-spin" />
                    <span className="text-[10px] font-mono-data text-primary/50 tracking-[0.2em] uppercase">Loading 3D Scene</span>
                  </div>
                </div>
              }
            >
              <HeroPCBScene />
            </Suspense>
          </div>

        </div>

        {/* Premium Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.4, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
        >
          <div className="w-5 h-8 rounded-full border-2 border-white/40 flex justify-center p-1">
            <motion.div 
              animate={{ y: [0, 10, 0], opacity: [0.8, 0.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1.5 rounded-full bg-white"
            ></motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* About Preview Section */}
      <section className="py-margin-lg relative">
        <div className="max-w-container-max mx-auto px-margin-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-margin-lg items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
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
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[500px] glass-card overflow-hidden group rounded-xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Engineering Laboratory" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60" 
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
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #c8102e 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
        </div>
        <div className="max-w-container-max mx-auto px-margin-lg relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-gutter text-center">
            {siteConfig.stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 glass-card border-none rounded-xl"
              >
                <div className="font-headline-xl text-headline-xl text-white mb-2">{stat.value}</div>
                <div className="font-label-caps text-label-caps text-on-surface-variant tracking-widest">{stat.label.toUpperCase()}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
