import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { team } from "../data/team";

const TEAM_CATEGORIES = [
  "Faculty Coordinator",
  "Executive Committee",
  "Core Team",
  "Technical Team",
  "Project Team",
  "Web Team",
  "Design Team",
  "Documentation Team",
  "PR Team"
] as const;

export default function Team() {
  return (
    <>
      <Helmet>
        <title>Our Team | IEEE PELS SSN</title>
        <meta name="description" content="Meet the faculty coordinator and student leaders of IEEE PELS SSN." />
      </Helmet>

      <section className="py-margin-lg mt-10 min-h-screen">
        <div className="max-w-container-max mx-auto px-margin-lg">
          
          <div className="text-center mb-16">
            <h1 className="font-headline-xl text-headline-xl text-white mb-6">Our Team</h1>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="space-y-24">
            {TEAM_CATEGORIES.map(category => {
              const members = team.filter(m => m.category === category);
              if (members.length === 0) return null;

              return (
                <div key={category}>
                  <h2 className="font-headline-lg text-headline-lg text-white mb-10 text-center">
                    {category}
                  </h2>
                  <div className="flex flex-wrap justify-center gap-8">
                    {members.map((member, idx) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="glass-card rounded-2xl p-6 w-full max-w-[280px] flex flex-col items-center text-center group hover:live-wire-hover"
                      >
                        <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-outline/20 group-hover:border-primary transition-colors">
                          <img 
                            src={member.photo} 
                            alt={member.name} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                          />
                        </div>
                        <h3 className="font-headline-md text-white mb-2">{member.name}</h3>
                        <p className="text-primary font-label-caps text-xs uppercase tracking-widest mb-2">{member.role}</p>
                        {member.department && (
                          <p className="text-on-surface-variant text-xs mb-6">{member.department}</p>
                        )}
                        
                        <div className="flex items-center gap-4 mt-auto">
                          {member.linkedin && (
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-primary hover:text-white transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                            </a>
                          )}
                          {member.email && (
                            <a href={`mailto:${member.email}`} className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-primary hover:text-white transition-colors">
                              <Mail className="w-4 h-4" />
                            </a>
                          )}
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
    </>
  );
}
