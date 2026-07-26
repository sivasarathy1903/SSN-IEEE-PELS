import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, User } from "lucide-react";
import { team } from "../data/team";

const TEAM_CATEGORIES = [
  "All Members",
  "Office Bearers",
  "Event Management",
  "Social Media & Marketing",
  "Content Team",
  "Design Team",
  "Web Development",
  "Technical Team"
] as const;

export default function Team() {
  const [activeCategory, setActiveCategory] = useState<string>("All Members");

  const filteredMembers = useMemo(() => {
    if (activeCategory === "All Members") return team;
    return team.filter((m) => m.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <Helmet>
        <title>Our Team | IEEE PELS SSN</title>
        <meta name="description" content="Meet the student leaders of IEEE PELS SSN." />
      </Helmet>

      <section className="py-margin-lg mt-10 min-h-screen">
        <div className="max-w-container-max mx-auto px-margin-lg">
          
          <div className="flex items-center gap-2 mb-12">
            <h1 className="font-headline-xl text-headline-xl text-white">
              {activeCategory === "All Members" ? "Our" : activeCategory} <span className="text-primary">{activeCategory === "All Members" ? "Team" : ""}</span>
            </h1>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-3 mb-16">
            {TEAM_CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full font-label-caps text-xs tracking-wider transition-all duration-300 ${
                  activeCategory === category 
                    ? "bg-primary text-white shadow-[0_0_15px_rgba(200,16,46,0.4)]" 
                    : "bg-surface-container-high text-on-surface-variant hover:bg-surface-bright"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Team Sections */}
          {activeCategory === "All Members" ? (
            <div className="space-y-16">
              {TEAM_CATEGORIES.filter(cat => cat !== "All Members").map(catName => {
                const categoryMembers = team.filter(m => m.category === catName);
                if (categoryMembers.length === 0) return null;
                
                return (
                  <div key={catName} className="space-y-6">
                    <div className="flex items-center gap-4 border-b border-outline/10 pb-4">
                      <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                      <h2 className="font-headline-lg text-2xl text-white font-bold tracking-tight">{catName}</h2>
                      <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-mono-data">
                        {categoryMembers.length} {categoryMembers.length === 1 ? 'member' : 'members'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {categoryMembers.map((member, idx) => (
                        <motion.div
                          key={member.id}
                          initial={{ opacity: 0, scale: 0.9, y: 20 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: (idx % 4) * 0.08 }}
                          className="bg-[#111] border border-outline/10 rounded-3xl overflow-hidden flex flex-col group relative h-[420px]"
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10"></div>
                          
                          {/* Photo */}
                          <div className="absolute inset-0 w-full h-full">
                            {member.photo ? (
                              <img 
                                src={member.photo} 
                                alt={member.name} 
                                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" 
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-surface-container-high">
                                <User className="w-16 h-16 text-on-surface-variant/20" />
                              </div>
                            )}
                          </div>
                          
                          {/* Content */}
                          <div className="relative z-20 mt-auto p-6 flex flex-col items-start w-full">
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-md ${
                              member.role === "Head" || member.role.includes("Secretary") 
                                ? "bg-primary text-white" 
                                : "bg-surface-variant/80 text-white"
                            }`}>
                              {member.role}
                            </span>
                            
                            <h3 className="font-headline-md text-xl text-white mb-1 drop-shadow-md">{member.name}</h3>
                            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-mono-data mb-6 drop-shadow-md">IEEE PELS SSN STUDENT BRANCH</p>
                            
                            <div className="flex items-center gap-3">
                              {member.email && (
                                <a href={`mailto:${member.email}`} className="w-10 h-10 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300">
                                  <Mail className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredMembers.map((member, idx) => (
                  <motion.div
                    key={member.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.4, delay: (idx % 8) * 0.05 }}
                    className="bg-[#111] border border-outline/10 rounded-3xl overflow-hidden flex flex-col group relative h-[420px]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                    
                    {/* Photo */}
                    <div className="absolute inset-0 w-full h-full">
                      {member.photo ? (
                        <img 
                          src={member.photo} 
                          alt={member.name} 
                          className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-surface-container-high">
                          <User className="w-16 h-16 text-on-surface-variant/20" />
                        </div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-20 mt-auto p-6 flex flex-col items-start w-full">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-md ${
                        member.role === "Head" || member.role.includes("Secretary") 
                          ? "bg-primary text-white" 
                          : "bg-surface-variant/80 text-white"
                      }`}>
                        {member.role}
                      </span>
                      
                      <h3 className="font-headline-md text-xl text-white mb-1 drop-shadow-md">{member.name}</h3>
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-mono-data mb-6 drop-shadow-md">IEEE PELS SSN STUDENT BRANCH</p>
                      
                      <div className="flex items-center gap-3">
                        {member.email && (
                          <a href={`mailto:${member.email}`} className="w-10 h-10 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300">
                            <Mail className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

        </div>
      </section>
    </>
  );
}
