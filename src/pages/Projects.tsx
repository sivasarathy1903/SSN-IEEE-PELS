import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Code2 } from "lucide-react";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <>
      <Helmet>
        <title>Technical Projects | IEEE PELS SSN</title>
        <meta name="description" content="IEEE PELS SSN Technical & Project Building team — active hardware and simulation engineering projects." />
      </Helmet>

      <section className="py-margin-lg pt-16 min-h-screen">
        <div className="max-w-container-max mx-auto px-margin-lg">

          {/* Page Header */}
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="font-headline-xl text-headline-xl text-white mb-4 tracking-tight"
            >
              Technical Projects
            </motion.h1>
            
            <div className="w-16 h-1 bg-primary mx-auto mb-6 rounded-full" />
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-on-surface-variant max-w-2xl mx-auto text-sm leading-relaxed"
            >
              Hardware and simulation projects engineered by the PELS Technical Team — solving real-world power electronics challenges with structured development.
            </motion.p>
          </div>

          {/* Clean Solid Engineering Cards Grid with 3D Red Pushpin Animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative bg-[#141418] border border-zinc-800 hover:border-primary/60 rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-black/70"
              >
                {/* HUGE 3D RED PUSHPIN AT TOP-RIGHT CORNER */}
                <div className="absolute -top-6 -right-2 z-30 pointer-events-none flex flex-col items-center">
                  {/* Huge Animated 3D Pin Head */}
                  <motion.div 
                    initial={{ y: -10, rotate: -20, scale: 0.9 }}
                    whileHover={{ y: 2, rotate: 0, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 450, damping: 14 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-950 via-red-600 to-red-400 border-2 border-red-200/60 shadow-[0_10px_25px_rgba(0,0,0,0.9),0_0_20px_rgba(200,16,46,0.8)] relative flex items-center justify-center transition-all duration-300"
                  >
                    {/* Metallic Pin Glass Highlight Spot */}
                    <div className="absolute top-1 left-1.5 w-3 h-3 rounded-full bg-white/90 blur-[0.4px]" />
                    {/* Inner 3D Rim */}
                    <div className="w-5 h-5 rounded-full border border-red-300/30 bg-red-700/40" />
                  </motion.div>

                  {/* Metallic Needle Shaft Shadow Pin */}
                  <div className="w-1.5 h-2 bg-gradient-to-b from-gray-400 via-gray-300 to-transparent -mt-1" />

                  {/* Large Pin Cast Shadow on Card Surface */}
                  <div className="w-6 h-2 bg-black/90 rounded-full blur-[1.5px] -mt-1 group-hover:scale-125 transition-transform" />
                </div>

                {/* Top Accent Line Draw on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div>
                  {/* Top Metadata: Index & Status */}
                  <div className="flex justify-between items-center mb-5 pb-4 border-b border-zinc-800/80">
                    <span className="font-mono text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-md">
                      PROJECT 0{idx + 1}
                    </span>

                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border mr-6 ${
                      project.status === "Completed" ? "bg-green-950/40 text-green-400 border-green-800/50" :
                      project.status === "In Progress" ? "bg-red-950/40 text-red-400 border-red-800/50" :
                      "bg-zinc-800 text-zinc-400 border-zinc-700"
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-lg text-white mb-3 group-hover:text-primary transition-colors leading-snug">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-400 text-xs line-clamp-3 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Stack Pills */}
                  <div className="mb-6">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">
                      <Code2 className="w-3 h-3 text-primary" /> Technologies
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map(tech => (
                        <span 
                          key={tech} 
                          className="text-[11px] font-mono bg-zinc-900 text-zinc-300 px-2.5 py-1 rounded border border-zinc-800 group-hover:border-zinc-700 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-[11px] font-mono bg-zinc-900 text-zinc-400 px-2 py-1 rounded border border-zinc-800">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Read More Button Action */}
                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-500 tracking-wider">
                      IEEE PELS SSN
                    </span>

                    <Link
                      to={`/projects/${project.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-[#a00c24] text-white font-bold text-xs uppercase tracking-wider transition-colors group/btn"
                    >
                      Read More
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

