import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Lightbulb, Target, Wrench, Monitor, Cpu, Trophy, Mic } from "lucide-react";

export default function About() {
  const cards = [
    { title: "Technical Workshops", icon: <Wrench className="w-8 h-8" />, desc: "Hands-on sessions on hardware and software tools." },
    { title: "Industry Talks", icon: <Mic className="w-8 h-8" />, desc: "Insights from leading professionals." },
    { title: "Hardware Projects", icon: <Cpu className="w-8 h-8" />, desc: "Building physical engineering solutions." },
    { title: "MATLAB & Simulink", icon: <Monitor className="w-8 h-8" />, desc: "System modeling and simulation." },
    { title: "Circuit Design", icon: <Lightbulb className="w-8 h-8" />, desc: "Analog and digital circuit synthesis." },
    { title: "Embedded Systems", icon: <Cpu className="w-8 h-8" />, desc: "Microcontroller programming and IoT." },
    { title: "Competitions", icon: <Trophy className="w-8 h-8" />, desc: "Hackathons and technical challenges." },
    { title: "Technical Symposiums", icon: <Target className="w-8 h-8" />, desc: "Showcasing research and projects." },
  ];

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
          <div className="space-y-16 mb-24">
            {/* Vision Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 md:p-12 rounded-3xl border border-primary/20 bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-high"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="font-headline-lg text-headline-lg text-white">Our Vision</h2>
              </div>
              <p className="text-on-surface-variant font-body-lg text-lg leading-relaxed max-w-4xl">
                Create technically strong, innovative engineers through hands-on practical learning, cutting-edge research, and industry collaboration in power electronics and sustainable energy technologies.
              </p>
            </motion.div>

            {/* Mission Section - Vertical Heading & Horizontally Aligned Card Grid */}
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-headline-lg text-headline-lg text-white">Our Mission</h2>
                  <p className="text-on-surface-variant text-sm mt-1">Key objectives driving our student branch chapter forward</p>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Technical Workshops", desc: "Hands-on sessions on power electronics and related technologies.", icon: "Hardware" },
                  { title: "Guest Lectures", desc: "Insights from industry experts and renowned academicians.", icon: "School" },
                  { title: "Project Competitions", desc: "Showcase your innovative ideas and build practical solutions.", icon: "Emoji_Objects" },
                  { title: "Industrial Visits", desc: "Bridging the gap between theoretical knowledge and practical applications.", icon: "Factory" },
                  { title: "Networking", desc: "Connect with peers, alumni, and professionals in the field.", icon: "Groups" },
                  { title: "Research Guidance", desc: "Support for paper presentations and research publications.", icon: "Menu_Book" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8, boxShadow: "0 20px 40px -10px rgba(200, 16, 46, 0.3)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass-card p-6 rounded-2xl border border-outline/10 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <span className="material-symbols-outlined text-2xl">{item.icon.toLowerCase()}</span>
                      </div>
                      <h3 className="font-headline-md text-white mb-2 text-xl font-bold">{item.title}</h3>
                      <p className="text-on-surface-variant text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg text-white mb-4">What We Do</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">Core focus areas to bridge the gap between academia and industry.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-8 rounded-xl hover:live-wire-hover group"
              >
                <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
                <h3 className="font-headline-md text-headline-md text-white mb-3">{card.title}</h3>
                <p className="text-on-surface-variant text-sm">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
