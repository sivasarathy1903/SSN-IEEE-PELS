import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, User } from "lucide-react";
import { team, facultyCoordinator } from "../data/team";
import type { TeamMember } from "../types";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
  </svg>
);

const TEAM_CATEGORIES = [
  "All Members",
  "Faculty Coordinator",
  "Office Bearers",
  "Content Team",
  "Design Team",
  "Event Management",
  "Social Media & Marketing",
  "Web Development",
  "Project Team"
] as const;

function TeamMemberCard({ member, delay, enableLayout }: { member: TeamMember; delay: number; enableLayout?: boolean }) {
  const isLead = member.role === "Head" || member.role === "Lead" || member.role.includes("Secretary") || member.role.includes("Chair") || member.role.includes("Treasurer") || member.role.includes("Professor");

  return (
    <motion.div
      {...(enableLayout ? { layout: true } : {})}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px", amount: 0.15 }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
      className="bg-[#141414] border border-outline/10 rounded-2xl overflow-hidden flex flex-col group hover:border-primary/40 transition-colors duration-300"
    >
      {/* Photo */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-surface-container-high">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User className="w-16 h-16 text-on-surface-variant/30" />
          </div>
        )}
        <span
          className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md bg-black/60 backdrop-blur-md text-white"
        >
          {isLead && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>}
          {member.role}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col items-start w-full">
        <h3 className="font-headline-md text-base text-white leading-tight mb-1">{member.name}</h3>
        {member.department && (
          <p className="text-[11px] text-on-surface-variant mb-3">{member.department}</p>
        )}
        {!member.department && <div className="mb-3" />}

        <div className="flex items-center gap-2 mt-auto">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="w-8 h-8 rounded-lg bg-surface-container-high border border-outline/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
          )}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-surface-container-high border border-outline/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

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

          {/* Featured Faculty Coordinator Card */}
          {(activeCategory === "All Members" || activeCategory === "Faculty Coordinator") && (
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

          {/* Team Sections */}
          {activeCategory === "All Members" ? (
            <div className="space-y-16">
              {TEAM_CATEGORIES.filter(cat => cat !== "All Members" && cat !== "Faculty Coordinator").map(catName => {
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

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
                      {categoryMembers.map((member, idx) => (
                        <TeamMemberCard key={member.id} member={member} delay={(idx % 5) * 0.04} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : activeCategory === "Faculty Coordinator" ? null : (
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5"
            >
              <AnimatePresence mode="popLayout">
                {filteredMembers.map((member, idx) => (
                  <TeamMemberCard key={member.id} member={member} delay={(idx % 10) * 0.03} enableLayout />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

        </div>
      </section>
    </>
  );
}
