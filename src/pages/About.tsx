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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-margin-lg mb-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-10 rounded-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <Target className="text-primary w-10 h-10" />
                <h2 className="font-headline-lg text-headline-lg text-white">Our Vision</h2>
              </div>
              <p className="text-on-surface-variant font-body-lg leading-relaxed">
                Create technically strong engineers through practical learning, innovation and collaboration in power electronics and emerging technologies.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-10 rounded-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <Lightbulb className="text-primary w-10 h-10" />
                <h2 className="font-headline-lg text-headline-lg text-white">Our Mission</h2>
              </div>
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
                  initial={{ opacity: 0, scale: 0.8, rotateX: 30 }}
                  whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                  whileHover={{ scale: 1.05, translateY: -10, boxShadow: "0 20px 40px -10px rgba(227, 30, 36, 0.3)" }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1, type: "spring", bounce: 0.5 }}
                  className="glass-card p-8 rounded-2xl border border-outline/10 group cursor-default"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                    <span className="material-symbols-outlined text-3xl">{item.icon.toLowerCase()}</span>
                  </div>
                  <h3 className="font-headline-md text-white mb-3 text-xl">{item.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
            </motion.div>
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
