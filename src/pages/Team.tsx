import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, User } from "lucide-react";
import { team, facultyCoordinator } from "../data/team";

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
        <meta name="description" content="Meet the faculty coordinator and student leaders of IEEE PELS SSN." />
      </Helmet>

      <section className="py-margin-lg mt-10 min-h-screen">
        <div className="max-w-container-max mx-auto px-margin-lg">
          
          <div className="flex items-center gap-2 mb-12">
            <h1 className="font-headline-xl text-headline-xl text-white">
              {activeCategory === "All Members" ? "Our" : activeCategory} <span className="text-primary">{activeCategory === "All Members" ? "Team" : ""}</span>
            </h1>
          </div>

          {/* Featured Faculty Coordinator Card */}
          {activeCategory === "All Members" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16 bg-gradient-to-r from-[#12141c] via-[#0d0e14] to-[#12141c] border border-primary/30 rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-[0_0_30px_rgba(200,16,46,0.15)]"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8102E]/10 rounded-full blur-[100px] pointer-events-none"></div>

              <div className="flex items-center gap-3 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                <span className="font-mono-data text-xs text-primary uppercase tracking-widest font-semibold">Faculty Coordinator</span>
              </div>

              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                {/* Photo */}
                <div className="w-44 h-44 md:w-52 md:h-52 rounded-2xl overflow-hidden border-2 border-primary/40 shadow-2xl shrink-0 bg-black">
                  <img
                    src={facultyCoordinator.photo}
                    alt={facultyCoordinator.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 text-center md:text-left space-y-4">
                  <div>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-1">
                      <h2 className="font-headline-lg text-3xl md:text-4xl text-white font-extrabold">{facultyCoordinator.name}</h2>
                      <span className="px-3 py-1 bg-primary/15 border border-primary/30 text-primary text-xs rounded-full font-mono font-medium">
                        {facultyCoordinator.degrees}
                      </span>
                    </div>
                    <p className="text-lg text-neutral-300 font-semibold">{facultyCoordinator.title}</p>
                    <p className="text-sm text-neutral-400">{facultyCoordinator.department}</p>
                  </div>

                  <div className="pt-2 flex flex-wrap justify-center md:justify-start items-center gap-4">
                    <a
                      href={`mailto:${facultyCoordinator.email}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white hover:bg-primary hover:border-primary transition-all duration-300 text-sm font-medium"
                    >
                      <Mail className="w-4 h-4 text-primary group-hover:text-white" />
                      {facultyCoordinator.email}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

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
