export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  eventId: string;
  width: number;
  height: number;
}

export const gallery: GalleryImage[] = [
  {
    id: "img1",
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "Synapse 2025 Inauguration",
    eventId: "synapse-2025",
    width: 800,
    height: 600
  },
  {
    id: "img2",
    url: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "Spice It Up - Hands-on Session",
    eventId: "spice-it-up-2025",
    width: 800,
    height: 1200
  },
  {
    id: "img3",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    caption: "Simulink Mentoring",
    eventId: "simverse-phase-1",
    width: 1200,
    height: 800
  }
];
