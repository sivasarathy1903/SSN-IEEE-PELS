import type { Event } from "../types";

export const events: Event[] = [
  {
    id: "simverse-hackathon-2026",
    name: "SIMVERSE Hackathon 2026",
    category: "Hackathon",
    date: "August 2026",
    timestamp: new Date("2026-08-15").getTime(),
    venue: "SSN College of Engineering, Chennai",
    participants: "Open Registration",
    description: "IEEE PELS SSN presents SIMVERSE — a high-stakes MATLAB & Simulink hackathon challenging participants to model, simulate and optimise real-world power electronics systems. From Buck-Boost converters to inverter control strategies, push the boundaries of simulation. Build. Simulate. Dominate.",
    highlights: ["MATLAB", "Simulink", "Power Electronics", "Hackathon", "Prizes Worth ₹10,000+", "Open to All"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    externalUrl: "https://simulink101-pels.vercel.app/",
    statusBadge: "REGISTER NOW",
    isPosterComingSoon: true
  },
  {
    id: "simverse-2-phase-1",
    name: "SIMVERSE 2.0 - Phase I",
    category: "Workshop",
    date: "21 July 2026",
    timestamp: new Date("2026-07-21").getTime(),
    venue: "EEE Design Thinking & Engineering Practices Lab (East Wing, Ground Floor)",
    participants: "48",
    description: `SIMVERSE 2.0: A Hands-on MATLAB & Simulink Workshop

Organized by the IEEE Power Electronics Society (PELS) SSN Student Branch Chapter on 21st July 2026.

Building upon the success of SIMVERSE - Phase I, the workshop aimed to strengthen participants' understanding of power electronics through simulation-based learning using MATLAB and Simulink, while providing practical exposure to the design, analysis, and implementation of power electronic converter circuits.

Event Details & Highlights:
• Target Audience: First, second, and third year students across EEE, ECE, BME, Mechanical, and IT departments interested in circuit simulation and power electronics.
• Mentoring Structure: Participants were divided into small mentor-led groups (7-9 members) for hands-on, personalized guidance.
• Circuits Covered: AC-DC Semi Converter, Inverting and Non-Inverting Buck-Boost Converter, Mobile Charging Circuit, Interleaved Boost Converter, and SEPIC Converter.
• Concepts & Interfacing: Simscape Electrical components, Physical Signal (PS) block interfacing, PCB design process, and real-world hardware implementation.

Faculty Coordinator: Dr. Seyezhai R
Event Organizers: Mirthika S, Rakshana, Sanjaynath V, Viya Balaji, Yazhissai K P
Mentors: Avinash R, Boobesh I R, Deepthi Anand, Deepalakshmi M, Shivashankar P, Shobana S
Reported by: Haripriya V H, Baraniidharan RV`,
    highlights: ["MATLAB", "Simulink", "AC-DC Semi Converter", "Buck-Boost Converter", "Interleaved Boost", "SEPIC Converter", "Simscape Electrical", "1-on-1 Mentorship"],
    image: "/events/simverse2.0workshop.jpeg"
  },
  {
    id: "simverse-phase-1",
    name: "SIMVERSE Phase I",
    category: "Workshop",
    date: "14 July 2026",
    timestamp: new Date("2026-07-14").getTime(),
    venue: "Electrical Workshop Lab, SSN College of Engineering",
    participants: "43",
    description: "A Hands-on Simulink Workshop introducing Buck and Boost converter simulation, power electronics fundamentals, and practical mentor-guided modeling.",
    highlights: ["MATLAB", "Simulink", "Buck Converter", "Boost Converter", "Hands-on Simulation"],
    image: "/events/simverse1.0workshop.jpeg"
  },
  {
    id: "behind-the-circuits",
    name: "Behind the Circuits",
    category: "Competition",
    date: "29 January 2026",
    timestamp: new Date("2026-01-29").getTime(),
    venue: "SSN College of Engineering, Kalavakkam",
    participants: "Open Registration",
    description: `Behind the Circuits: A Photography Contest

SSN IEEE PELS Presents "Behind the Circuits" — a photography competition showcasing the art concealed inside circuits and components.

Themes:
1. Power Electronics in Everyday Life
2. Energy & Sustainability
3. Engineering Through the Lens

Capture the hidden beauty of PCB traces, component aesthetics, power electronics in action, and sustainable energy tech through your camera lens.`,
    highlights: ["Photography Contest", "Circuit Art", "Power Electronics in Everyday Life", "Energy & Sustainability", "Engineering Through the Lens"],
    image: "/events/behindthecircuits.jpeg"
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
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
    image: "/gallery/synapse_0.jpg"
  },
  {
    id: "spice-it-up-2025",
    name: "IEEE PELS Spice It Up 2025",
    category: "Workshop",
    date: "8 August 2025",
    timestamp: new Date("2025-08-08").getTime(),
    venue: "EEE Simulation Lab",
    participants: "50",
    description: "Master the essentials of circuit simulation using LTspice. Design >> Simulate >> Analyze. Beginner-friendly hands-on workshop introducing practical circuit simulation, Op-Amps, BJTs, waveform generators, filters, and analog circuits through mentor-guided learning.",
    highlights: ["LTspice", "Circuit Simulation", "Analog Electronics", "Mentor Guided", "Design & Analyze"],
    image: "/events/spiceitup.jpeg"
  }
];
