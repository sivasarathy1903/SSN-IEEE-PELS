export interface Event {
  id: string;
  name: string;
  category: "Workshop" | "Technical Symposium" | "Technical Quiz" | "Technical Talk" | "Competition" | "Seminar" | "Hackathon";
  date: string;
  timestamp?: number;
  venue: string;
  participants: string;
  description: string;
  highlights: string[];
  image: string;
  /** When set, 'Read More' opens this external URL instead of the internal detail page */
  externalUrl?: string;
  /** Badge shown on card — e.g. 'UPCOMING', 'REGISTER NOW' */
  statusBadge?: string;
  /** When true, card image area displays a sleek 'POSTER COMING SOON' banner graphics box */
  isPosterComingSoon?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  problemStatement?: string;
  objectives?: string[];
  currentProgress?: string;
  technologies: string[];
  simulation?: string;
  hardware?: string;
  status: "Completed" | "In Progress" | "Planned";
  /** Team members for this project */
  team?: string[];
  /** Simulation and hardware deadlines */
  simulationDeadline?: string;
  hardwareDeadline?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department?: string;
  photo: string;
  category: TeamCategory;
  email?: string;
  linkedin?: string;
}

export type TeamCategory = 
  | "Office Bearers"
  | "Event Management"
  | "Social Media & Marketing"
  | "Content Team"
  | "Design Team"
  | "Web Development"
  | "Technical Team"
  | "Project Team"
  | "Faculty Coordinator";

export interface SiteConfig {
  tagline: string;
  aboutText: string;
  stats: { label: string; value: string }[];
  contact: {
    email: string;
    linkedin: string;
    instagram: string;
    location: string;
    googleMapsEmbed: string;
  };
}
