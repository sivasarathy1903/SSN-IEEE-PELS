import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Zap } from "lucide-react";
import { siteConfig } from "../data/site";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>IEEE PELS SSN | Home</title>
        <meta name="description" content="IEEE Power Electronics Society Student Branch Chapter at SSN College of Engineering. Innovating Power Electronics." />
        <meta name="keywords" content="IEEE PELS, Power Electronics, SSN, MATLAB, Simulink, Embedded Systems, Hardware Design" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden" id="home">
        <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-transparent to-surface z-[1]"></div>
        
        {/* Animated Background Elements */}
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute right-[-10%] top-[10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none z-0"
        ></motion.div>
        
        <div className="relative z-10 max-w-container-max mx-auto px-margin-lg w-full flex flex-col md:flex-row items-center gap-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
            className="flex-1 max-w-2xl"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-caps text-label-caps text-primary uppercase tracking-[0.2em]">Live Energy Solutions</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-headline-xl text-headline-xl mb-6 text-white leading-tight"
            >
              IEEE Power <br/>Electronics Society
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="font-headline-md text-headline-md text-on-surface-variant mb-8 font-light"
            >
              {siteConfig.tagline}
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/events" className="bg-primary-container text-white px-8 py-4 rounded-lg font-label-caps text-label-caps hover:brightness-125 transition-all flex items-center gap-2 group shadow-[0_0_20px_rgba(200,16,46,0.4)]">
                Explore Events
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/projects" className="border border-outline/20 hover:border-primary/50 text-white px-8 py-4 rounded-lg font-label-caps text-label-caps transition-all flex items-center gap-2 bg-white/5 backdrop-blur-md">
                Explore Projects
              </Link>
            </motion.div>
          </motion.div>

          {/* Massive Animated Logo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
            className="flex-1 flex justify-center perspective-1000"
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                boxShadow: ["0px 0px 0px rgba(200,16,46,0)", "0px 20px 40px rgba(200,16,46,0.4)", "0px 0px 0px rgba(200,16,46,0)"]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-[400px] aspect-square rounded-full flex items-center justify-center p-4"
            >
              <img 
                src="/logo.jpg" 
                alt="IEEE PELS SSN Logo" 
                className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(200,16,46,0.8)] filter contrast-125"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/400?text=Please+Add+logo.jpg+to+public+folder";
                }}
              />
            </motion.div>
          </motion.div>

        </div>
      </section>

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
