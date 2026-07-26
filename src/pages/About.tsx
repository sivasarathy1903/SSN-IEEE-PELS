import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Lightbulb, Target } from "lucide-react";

export default function About() {

  return (
    <>
      <Helmet>
        <title>About Us | IEEE PELS SSN</title>
        <meta name="description" content="Learn about our vision, mission and activities at IEEE PELS SSN Student Branch." />
      </Helmet>

      <section className="py-margin-lg mt-10">
        <div className="max-w-container-max mx-auto px-margin-lg">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 className="font-headline-xl text-headline-xl text-white mb-6">About Us</h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          </motion.div>

          {/* Vision & Mission Vertical Sections */}
          <div className="space-y-12 mb-20">
            {/* Vision & Mission Hero Banner */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Vision Card */}
              <div className="glass-card p-8 md:p-10 rounded-3xl border border-primary/20 bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-lowest">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                    <Target className="w-6 h-6" />
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-white">Our Vision</h2>
                </div>
                <p className="text-on-surface-variant font-body-md text-base md:text-lg leading-relaxed">
                  To cultivate technically proficient, innovative engineers through hands-on practical learning, cutting-edge research, and active industry collaboration in power electronics and sustainable energy.
                </p>
              </div>

              {/* Mission Statement Card */}
              <div className="glass-card p-8 md:p-10 rounded-3xl border border-outline/10 bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-lowest">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-white">Our Mission</h2>
                </div>
                <p className="text-on-surface-variant font-body-md text-base md:text-lg leading-relaxed">
                  Empowering student members with practical technical skills, industry mentorship, research guidance, and collaborative project platforms to bridge academia with real-world engineering excellence.
                </p>
              </div>
            </motion.div>

            {/* Core Pillars / Strategic Initiatives */}
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center max-w-2xl mx-auto"
              >
                <h3 className="font-headline-md text-2xl font-bold text-white mb-2">Chapter Initiatives & Activities</h3>
                <p className="text-on-surface-variant text-sm">Key pillars driving our student chapter forward</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Technical Workshops", desc: "Hands-on sessions on power electronics, circuit design, and simulation tools.", icon: "Hardware" },
                  { title: "Guest Lectures & FDP", desc: "Expert talks and faculty programs by industry leaders and academicians.", icon: "School" },
                  { title: "Project Competitions", desc: "Hardware challenges and hackathons to transform ideas into working prototypes.", icon: "Emoji_Objects" },
                  { title: "Industrial Visits", desc: "Field visits bridging classroom concepts with industrial power applications.", icon: "Factory" },
                  { title: "Interdisciplinary Learning", desc: "Cross-departmental collaborative technical events and workshops.", icon: "Groups" },
                  { title: "Research & Publications", desc: "Guidance for technical paper presentations, journals, and project publications.", icon: "Menu_Book" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -6, boxShadow: "0 20px 40px -10px rgba(200, 16, 46, 0.25)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="glass-card p-6 rounded-2xl border border-outline/10 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <span className="material-symbols-outlined text-2xl">{item.icon.toLowerCase()}</span>
                      </div>
                      <h4 className="font-headline-md text-white mb-2 text-xl font-bold">{item.title}</h4>
                      <p className="text-on-surface-variant text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
