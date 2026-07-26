import type { Event } from "../types";

export const events: Event[] = [
  {
    id: "spice-it-up-2025",
    name: "IEEE PELS Spice It Up 2025",
    category: "Workshop",
    date: "8 August 2025",
    timestamp: new Date("2025-08-08").getTime(),
    venue: "EEE Simulation Lab",
    participants: "50",
    description: "Hands-on LTspice workshop introducing practical circuit simulation, Op-Amps, BJTs, waveform generators, filters and analog circuits through mentor-guided learning.",
    highlights: ["LTspice", "Circuit Simulation", "Analog Electronics", "Mentor Guided", "Interdisciplinary Learning"],
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // placeholder
  },
  {
    id: "synapse-2025",
    name: "IEEE PELS Synapse 2025",
    category: "Technical Symposium",
    date: "26–27 September 2025",
    timestamp: new Date("2025-09-26").getTime(),
    venue: "EEE Seminar Hall",
    participants: "100+",
    description: "Two-day technical symposium featuring experts from MathWorks, Microchip and Motherson Health & Medical on embedded systems, Simulink, firmware development and hardware design.",
    highlights: ["Simulink", "Embedded Systems", "Firmware", "Hardware Design", "PCB Design"],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // placeholder
  },
  {
    id: "dead-end-ahead",
    name: "Dead End Ahead",
    category: "Technical Quiz",
    date: "16 February 2026",
    timestamp: new Date("2026-02-16").getTime(),
    venue: "ME Classroom",
    participants: "31",
    description: "A themed quiz competition inspired by Stranger Things and Harry Potter featuring buzzer rounds, bonus challenges and rapid-fire finals.",
    highlights: ["Team Quiz", "Online Buzzer", "Bonus Round", "Rapid Fire"],
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // placeholder
  },
  {
    id: "simverse-phase-1",
    name: "SIMVERSE Phase I",
    category: "Workshop",
    date: "14 July 2026",
    timestamp: new Date("2026-07-14").getTime(),
    venue: "EEE Design Thinking & Engineering Practices Lab",
    participants: "43",
    description: "Hands-on MATLAB & Simulink workshop covering Buck and Boost converter simulation, power electronics fundamentals and practical mentor-guided modelling.",
    highlights: ["MATLAB", "Simulink", "Buck Converter", "Boost Converter", "Hands-on Simulation"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // placeholder
  }
];
