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

  const missions = [
    "Conduct industry-oriented workshops",
    "Promote hardware development",
    "Encourage interdisciplinary engineering",
    "Build research culture",
    "Connect students with industry experts",
    "Foster innovation through technical projects"
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
              <ul className="space-y-4">
                {missions.map((mission, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span className="text-on-surface-variant font-body-lg">{mission}</span>
                  </li>
                ))}
              </ul>
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
