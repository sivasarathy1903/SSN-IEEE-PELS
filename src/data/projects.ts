import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "bidirectional-buck-boost",
    title: "Bidirectional Buck-Boost Converter",
    description:
      "Design and implementation of a bidirectional DC-DC converter enabling efficient power flow in both directions — suitable for battery storage and regenerative systems.",
    problemStatement:
      "Design and Implementation of a Bidirectional Buck-Boost Converter: Create a power converter capable of operating in both step-up (boost) and step-down (buck) modes while supporting bidirectional energy flow for applications such as battery charging/discharging and renewable energy integration.",
    objectives: [
      "Design a bidirectional DC-DC converter topology",
      "Implement closed-loop control strategy for both buck and boost modes",
      "Simulate converter performance in MATLAB/Simulink",
      "Fabricate and test hardware with efficiency measurements",
      "Validate bidirectional energy flow between source and load"
    ],
    currentProgress: "Literature review complete. Problem statement finalised on 30.06.2026. Simulation phase initiated.",
    technologies: ["MATLAB", "Simulink", "Power Electronics", "PCB Design", "Control Systems"],
    simulation: "In Progress — Simulink model under development",
    hardware: "Planned — to be completed before CAT 2",
    simulationDeadline: "Before CAT 1",
    hardwareDeadline: "Before CAT 2",
    status: "In Progress",
    team: ["Shiva Shankar", "Goutham G", "Aravind Krishna", "Aishwarya L"]
  },
  {
    id: "sensorless-bldc",
    title: "Sensorless BLDC Motor Drive",
    description:
      "Design and implementation of a sensorless BLDC motor controller using Back-EMF Zero-Crossing Detection and six-step commutation, eliminating Hall sensors for a cost-effective and robust drive system.",
    problemStatement:
      "Design and Implementation of a Sensorless BLDC Motor Drive Using Back-EMF Zero-Crossing Detection and Six-Step Commutation: Eliminate the dependency on Hall-effect sensors by detecting rotor position through back-EMF signals, implementing reliable six-step commutation for motor control.",
    objectives: [
      "Implement back-EMF sensing circuit and zero-crossing detection algorithm",
      "Develop six-step commutation sequence for the motor drive",
      "Simulate the complete motor drive system in MATLAB/Simulink",
      "Design and test the gate driver and inverter hardware",
      "Evaluate performance parameters: speed, torque, efficiency"
    ],
    currentProgress: "Problem statement finalised on 30.06.2026. Algorithm research and Simulink modelling in progress.",
    technologies: ["Embedded Systems", "MATLAB", "Simulink", "Motor Control", "C/C++", "Microcontrollers"],
    simulation: "In Progress — Motor drive simulation being developed",
    hardware: "Planned — Custom drive board design to follow simulation",
    simulationDeadline: "Before CAT 1",
    hardwareDeadline: "Before CAT 2",
    status: "In Progress",
    team: ["Gowri Shankar", "Avinash", "Shobana", "M. Kishore"]
  },
  {
    id: "high-side-mosfet",
    title: "Gate Driver for High-Side MOSFET",
    description:
      "Design and implementation of a robust gate driver circuit for a high-side N-channel MOSFET, incorporating bootstrap circuitry to achieve a floating supply for reliable high-frequency switching.",
    problemStatement:
      "Design and Implementation of a Gate Driver for a High-Side MOSFET: Driving a high-side N-channel MOSFET requires a gate voltage higher than the supply rail. Design a gate driver using a bootstrap circuit or isolated supply to ensure reliable switching performance with minimal propagation delay and loss.",
    objectives: [
      "Design bootstrap-based floating supply for high-side MOSFET gate driving",
      "Minimise turn-on and turn-off switching losses",
      "Implement overcurrent and shoot-through protection",
      "Simulate gate drive waveforms in LTspice",
      "Verify functionality through hardware testing"
    ],
    currentProgress: "Problem statement finalised on 30.06.2026. LTspice simulation and initial design in progress.",
    technologies: ["Circuit Design", "LTspice", "Power Electronics", "PCB Design"],
    simulation: "In Progress — LTspice gate driver simulation under verification",
    hardware: "Planned — Protoboard assembly to follow simulation",
    simulationDeadline: "Before CAT 1",
    hardwareDeadline: "Before CAT 2",
    status: "In Progress",
    team: ["Keerthi Sheevani", "Vennela SRPNS", "K. Nithesh Kumar", "Lokesh K"]
  },
  {
    id: "high-efficiency-dc-dc",
    title: "Compact Inductorless DC-DC Converter",
    description:
      "Design a compact and efficient DC-DC converter without an inductor for ultra-low-power IoT and wearable devices, stepping up from 3.7 V to 12 V with minimal switching noise and high conversion efficiency.",
    problemStatement:
      "Design a Compact and Efficient DC-DC Converter (Without an Inductor) for Ultra Low-Power Devices, Stepping Up from 3.7 V to 12 V with Minimal Noise and High Conversion Efficiency: Address the need for small-form-factor power conversion solutions that avoid bulky magnetic components, suitable for IoT and medical-grade low-power applications.",
    objectives: [
      "Design a switched-capacitor (charge pump) voltage converter topology",
      "Achieve a 3.7 V to 12 V step-up without any inductors",
      "Optimise for ultra-low quiescent current and high power efficiency",
      "Minimise output voltage ripple and switching noise",
      "Validate design through simulation and hardware prototyping"
    ],
    currentProgress: "Problem statement finalised on 30.06.2026. Switched-capacitor topology research initiated.",
    technologies: ["Switched-Capacitor Design", "Analog Electronics", "LTspice", "Low Power Design", "PCB Layout"],
    simulation: "In Progress — Switched-capacitor model under development",
    hardware: "Planned — after simulation verification",
    simulationDeadline: "Before CAT 1",
    hardwareDeadline: "Before CAT 2",
    status: "In Progress",
    team: ["Nandhini", "Shakthivel R", "Thanuj S", "Surya SS"]
  },
  {
    id: "solid-state-transformer",
    title: "Single-Phase Solid-State Transformer",
    description:
      "Design and simulation of a Single-Phase Solid-State Transformer (SST) using power electronics to replace conventional low-frequency transformers with compact, high-frequency switching stages.",
    problemStatement:
      "Design of a Single-Phase Solid-State Transformer: Replace bulky low-frequency (50 Hz) power transformers with a high-frequency power-electronics-based transformer that provides galvanic isolation, voltage regulation, reactive power control, and compatibility with DC microgrids — all in a compact form factor.",
    objectives: [
      "Understand and model the three-stage SST architecture: AC-DC rectifier, DC-DC high-frequency isolation, DC-AC inverter",
      "Simulate each stage individually in MATLAB/Simulink",
      "Integrate all stages and verify end-to-end power transfer",
      "Analyse efficiency, power factor, and harmonic distortion",
      "Develop hardware prototype of the isolation stage"
    ],
    currentProgress: "Problem statement finalised on 30.06.2026. Three-stage architecture study complete. AC-DC rectifier stage simulation in progress.",
    technologies: ["Power Systems", "MATLAB", "Simulink", "High-Frequency Transformers", "Inverter Design", "Control Systems"],
    simulation: "In Progress — AC-DC stage under simulation in Simulink",
    hardware: "Planned — isolation stage hardware to follow simulation",
    simulationDeadline: "Before CAT 1",
    hardwareDeadline: "Before CAT 2",
    status: "In Progress",
    team: ["Jeffi Majala", "Vanavan U", "Deepti Anand", "Muthu Palaniyappan"]
  }
];
