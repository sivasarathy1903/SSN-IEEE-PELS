import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "bidirectional-buck-boost",
    title: "Bidirectional Buck-Boost Converter",
    description: "Design and implementation of a bidirectional DC-DC converter.",
    problemStatement: "Need for efficient bidirectional power flow in battery storage systems.",
    objectives: ["Design bidirectional converter", "Implement control strategy", "Test hardware efficiency"],
    currentProgress: "Hardware testing phase",
    technologies: ["Power Electronics", "MATLAB", "Hardware Design"],
    simulation: "Completed in Simulink",
    hardware: "PCB fabricated and assembled",
    status: "In Progress"
  },
  {
    id: "sensorless-bldc",
    title: "Sensorless BLDC Motor Drive",
    description: "Back-EMF Zero Crossing Detection based BLDC controller.",
    problemStatement: "Eliminating Hall sensors for BLDC motor control to reduce cost and increase reliability.",
    objectives: ["Implement Back-EMF sensing", "Develop zero-crossing detection algorithm", "Test motor drive"],
    currentProgress: "Algorithm development",
    technologies: ["Embedded Systems", "Motor Control", "C++", "Microcontrollers"],
    simulation: "Simulated in MATLAB",
    hardware: "Custom drive board in design",
    status: "In Progress"
  },
  {
    id: "high-side-mosfet",
    title: "High Side MOSFET Driver",
    description: "Design and implementation of a high-side MOSFET gate driver.",
    problemStatement: "Driving high-side N-channel MOSFETs requires a floating supply or bootstrap circuitry.",
    objectives: ["Design bootstrap circuit", "Minimize switching losses", "Ensure robust protection"],
    currentProgress: "Completed",
    technologies: ["Circuit Design", "Power Electronics", "LTspice"],
    simulation: "Verified in LTspice",
    hardware: "Tested on protoboard",
    status: "Completed"
  },
  {
    id: "high-efficiency-dc-dc",
    title: "High Efficiency DC-DC Converter",
    description: "Inductorless ultra-low-power converter.",
    problemStatement: "Need for compact, high-efficiency power converters for IoT devices without bulky inductors.",
    objectives: ["Design switched-capacitor converter", "Optimize for ultra-low power", "Measure efficiency"],
    currentProgress: "Design phase",
    technologies: ["Switched-Capacitor", "Low Power Design", "Analog Electronics"],
    simulation: "In progress",
    hardware: "Planned",
    status: "Planned"
  },
  {
    id: "solid-state-transformer",
    title: "Single Phase Solid State Transformer",
    description: "Simulation and hardware implementation of SST.",
    problemStatement: "Replacing traditional bulky low-frequency transformers with compact high-frequency power electronic transformers.",
    objectives: ["Design high-frequency isolation stage", "Implement AC-DC and DC-AC stages", "Test full system"],
    currentProgress: "Simulation phase",
    technologies: ["Power Systems", "Simulink", "High-Frequency Transformers", "Inverters"],
    simulation: "AC-DC stage completed",
    hardware: "Not started",
    status: "In Progress"
  }
];
