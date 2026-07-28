import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Calendar, MapPin, Users, CheckCircle } from "lucide-react";
import { events } from "../data/events";

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center flex-col gap-4">
        <h2 className="text-white text-2xl">Event not found</h2>
        <Link to="/events" className="text-primary hover:underline">Return to Events</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{event.name} | IEEE PELS SSN</title>
        <meta name="description" content={event.description} />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative h-[60vh] flex items-end pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={event.image} alt={event.name} className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-surface/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-container-max mx-auto px-margin-lg w-full">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Link to="/events" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-white transition-colors bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <ArrowLeft className="w-4 h-4" /> Back to Events
            </Link>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/20 border border-primary/30">
              <span className="font-label-caps text-xs text-primary font-bold uppercase tracking-wider">{event.category}</span>
            </div>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-white mb-6 max-w-4xl">{event.name}</h1>
          <div className="flex flex-wrap gap-6 text-on-surface-variant font-body-md">
            <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" /> {event.date}</div>
            <div className="flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> {event.venue}</div>
            <div className="flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> {event.participants} Participants</div>
          </div>
        </div>
      </section>

      {/* Overview & Highlights */}
      <section className="py-margin-lg">
        <div className="max-w-container-max mx-auto px-margin-lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-margin-lg">
            
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-white mb-6">Overview</h2>
                <p className="text-on-surface-variant font-body-lg leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </div>
              
              <div>
                <h2 className="font-headline-lg text-headline-lg text-white mb-6">Key Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-surface-container-high p-4 rounded-lg border border-outline/10">
                      <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" />
                      <span className="text-on-surface text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Details */}
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-xl">
                <h3 className="font-headline-md text-white mb-4">Event Details</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-on-surface-variant text-sm mb-1">Date</div>
                    <div className="text-white font-medium">{event.date}</div>
                  </div>
                  <div className="section-divider"></div>
                  <div>
                    <div className="text-on-surface-variant text-sm mb-1">Venue</div>
                    <div className="text-white font-medium">{event.venue}</div>
                  </div>
                  <div className="section-divider"></div>
                  <div>
                    <div className="text-on-surface-variant text-sm mb-1">Category</div>
                    <div className="text-white font-medium">{event.category}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
