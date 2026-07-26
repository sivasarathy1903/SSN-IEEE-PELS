import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Settings } from "lucide-react";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <>
      <Helmet>
        <title>Projects | IEEE PELS SSN</title>
        <meta name="description" content="Explore the technical hardware and simulation projects built by IEEE PELS SSN students." />
      </Helmet>

      <section className="py-margin-lg mt-10 min-h-screen">
        <div className="max-w-container-max mx-auto px-margin-lg">
          
          <div className="text-center mb-16">
            <h1 className="font-headline-xl text-headline-xl text-white mb-6">Technical Projects</h1>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
            <p className="mt-8 text-on-surface-variant max-w-2xl mx-auto font-body-lg">
              Showcasing our members' innovations in power electronics, embedded systems, and hardware design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 50, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, type: "spring" }}
                whileHover={{ scale: 1.03, zIndex: 10, boxShadow: "0 30px 60px -15px rgba(227, 30, 36, 0.3)" }}
                className="glass-card rounded-2xl p-6 flex flex-col relative overflow-hidden group cursor-default"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                    <Settings className="w-6 h-6 animate-spin-slow" />
                  </div>
                  <span className={`text-[10px] font-label-caps px-3 py-1 rounded-full border uppercase tracking-widest ${
                    project.status === "Completed" ? "bg-green-900/20 text-green-400 border-green-500/30" :
                    project.status === "In Progress" ? "bg-primary/20 text-primary border-primary/30" :
                    "bg-gray-800 text-gray-400 border-gray-600"
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <h3 className="font-headline-md text-headline-md text-white mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-on-surface-variant text-sm line-clamp-3 mb-6 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.slice(0, 3).map(tech => (
                    <span key={tech} className="text-xs bg-surface-container-high text-on-surface px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs bg-surface-container-high text-on-surface px-2 py-1 rounded">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                <Link 
                  to={`/projects/${project.id}`}
                  className="mt-auto flex items-center gap-2 text-primary font-label-caps text-sm hover:text-white transition-colors group/link"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
