import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  motion,
  useDragControls,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Target,
  Lightbulb,
  Zap,
  Wrench,
  GraduationCap,
  Trophy,
  Users,
  BookOpen,
} from "lucide-react";

// Card data for the swipe deck
const initialAboutCards = [
  {
    id: 1,
    category: "Initiative 01",
    title: "Technical Workshops",
    icon: Wrench,
    description:
      "Hands-on sessions on power electronics, circuit design, MATLAB, Simulink, and LTspice simulation tools guided by domain mentors.",
    url: "/gallery/ltspice_6.jpg",
    badge: "WORKSHOPS",
  },
  {
    id: 2,
    category: "Initiative 02",
    title: "Guest Lectures & FDP",
    icon: GraduationCap,
    description:
      "Expert talks and faculty development programs delivered by industry leaders, academicians, and MathWorks engineers.",
    url: "/gallery/synapse_3.jpg",
    badge: "SPEAKER TALKS",
  },
  {
    id: 3,
    category: "Initiative 03",
    title: "Project Competitions",
    icon: Trophy,
    description:
      "Hardware challenges and hackathons like SIMVERSE to transform student ideas into functional hardware & simulation prototypes.",
    url: "/gallery/deadend_firstprize.jpg",
    badge: "HACKATHONS",
  },
  {
    id: 4,
    category: "Initiative 04",
    title: "Interdisciplinary Learning",
    icon: Users,
    description:
      "Cross-departmental collaborative technical events, quiz challenges, and multidisciplinary hardware projects.",
    url: "/gallery/synapse_4.jpg",
    badge: "COLLABORATION",
  },
  {
    id: 5,
    category: "Initiative 05",
    title: "Research & Publications",
    icon: BookOpen,
    description:
      "Guidance for technical paper presentations, IEEE conference submissions, international journals, and patent documentation.",
    url: "/gallery/ltspice_8.jpg",
    badge: "RESEARCH",
  },
];

// ── Individual SwipeCard ─────────────────────────────────────────────────────
function SwipeCard({
  id,
  category,
  title,
  icon: IconComp,
  description,
  url,
  badge,
  onSwipe,
  cards,
}: any) {
  const x = useMotionValue(0);
  const dragControls = useDragControls();

  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const isFront = id === cards[cards.length - 1].id;

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : id % 2 ? 6 : -6;
    return `${rotateRaw.get() + offset}deg`;
  });

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 50) onSwipe();
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isFront) dragControls.start(e, { distanceThreshold: 0 });
  };

  return (
    <motion.div
      draggable={false}
      onPointerDown={handlePointerDown}
      className="h-[420px] w-80 origin-bottom touch-none select-none rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between p-6 relative hover:cursor-grab active:cursor-grabbing group"
      style={{
        gridRow: 1,
        gridColumn: 1,
        zIndex: isFront ? cards.length : id,
        pointerEvents: isFront ? "auto" : "none",
        x,
        opacity,
        rotate,
        boxShadow: isFront
          ? "0 25px 50px -12px rgba(0,0,0,0.8), 0 0 20px rgba(200,16,46,0.2)"
          : undefined,
        border: "1px solid rgba(63,63,70,0.8)",
        background: "#16161c",
      }}
      animate={{ scale: isFront ? 1 : 0.96 }}
      drag={isFront ? "x" : false}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragSnapToOrigin
      onDragEnd={handleDragEnd}
    >
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none transition-all duration-500"
        style={{
          backgroundImage: `url(${url})`,
          filter: "brightness(0.32)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/25 pointer-events-none" />

      {/* Top badges */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="font-mono text-[10px] font-bold text-white bg-primary px-3 py-1 rounded-full uppercase tracking-wider">
          {badge}
        </span>
        <span className="font-mono text-[11px] font-bold text-zinc-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 my-auto pt-4">
        <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary mb-4 shadow-lg">
          <IconComp className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-extrabold text-white mb-2 leading-tight tracking-tight drop-shadow">
          {title}
        </h3>
        <p className="text-zinc-300 text-xs leading-relaxed drop-shadow-sm">
          {description}
        </p>
      </div>

      {/* Footer */}
      <div className="relative z-10 pt-3 border-t border-white/15 flex items-center justify-between">
        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
          IEEE PELS SSN
        </span>
        <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest">
          Swipe →
        </span>
      </div>
    </motion.div>
  );
}

// ── Swipe Deck + Revealed grid section ──────────────────────────────────────
function SwipeDeckSection() {
  const [stackCards, setStackCards] = useState(initialAboutCards);
  const [swipedCards, setSwipedCards] = useState<typeof initialAboutCards>([]);

  const handleCardSwiped = (card: (typeof initialAboutCards)[0]) => {
    setStackCards((prev) => prev.filter((c) => c.id !== card.id));
    setSwipedCards((prev) => [card, ...prev]);
  };

  return (
    <div className="my-12">
      {/* Stack — disappears once all cards are swiped */}
      {stackCards.length > 0 && (
        <div className="flex flex-col items-center mb-10">
          {/* Subtle hint label */}
          <div className="flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-500 text-[11px] font-mono uppercase tracking-widest select-none">
            <span className="text-primary">←</span> Swipe to Explore{" "}
            <span className="text-primary">→</span>
          </div>

          <div className="grid h-[440px] w-full max-w-sm place-items-center">
            {stackCards.map((card) => (
              <SwipeCard
                key={card.id}
                cards={stackCards}
                onSwipe={() => handleCardSwiped(card)}
                {...card}
              />
            ))}
          </div>
        </div>
      )}

      {/* Revealed cards grid — grows with each swipe */}
      {swipedCards.length > 0 && (
        <div className="pt-8 border-t border-zinc-800/80">
          <div className="flex items-center gap-3 mb-8">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-xs font-mono text-primary uppercase tracking-widest font-bold">
              Chapter Initiatives
            </span>
            <span className="ml-auto text-[11px] font-mono text-zinc-500">
              {swipedCards.length} / {initialAboutCards.length} revealed
            </span>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {swipedCards.map((card) => {
                const IconComp = card.icon;
                return (
                  <motion.div
                    key={card.id}
                    layout
                    initial={{ opacity: 0, y: 36, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className="bg-[#141418] border border-zinc-800 hover:border-primary/60 rounded-2xl p-6 flex flex-col justify-between shadow-xl group transition-colors duration-300 cursor-default"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-md uppercase">
                        {card.badge}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                        {card.category}
                      </span>
                      <h4 className="font-bold text-lg text-white mb-2 group-hover:text-primary transition-colors">
                        {card.title}
                      </h4>
                      <p className="text-zinc-400 text-xs leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-zinc-500">
                        IEEE PELS SSN
                      </span>
                      <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// ── 3D Tilt Card ─────────────────────────────────────────────────────────────
function ThreeDCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setRotateX(((e.clientY - rect.top - cy) / cy) * -12);
    setRotateY(((e.clientX - rect.left - cx) / cx) * 12);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setRotateX(0); setRotateY(0); }}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className={`relative group ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | IEEE PELS SSN</title>
        <meta
          name="description"
          content="Learn about our vision, mission and activities at IEEE PELS SSN Student Branch."
        />
      </Helmet>

      <section className="py-margin-lg pt-16 min-h-screen relative overflow-hidden bg-[#0a0c10]">
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-10 w-[450px] h-[450px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-container-max mx-auto px-margin-lg relative z-10">

          {/* ── Header ── */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-headline-xl text-headline-xl text-white mb-4 tracking-tight"
            >
              About Our Chapter
            </motion.h1>

            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6 rounded-full" />

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-on-surface-variant max-w-2xl mx-auto text-sm leading-relaxed"
            >
              Building a vibrant community of power electronics enthusiasts,
              hardware engineers, and innovators at Sri Sivasubramaniya Nadar
              College of Engineering.
            </motion.p>
          </div>

          {/* ── Vision & Mission (3D tilt cards) ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
            {/* Vision */}
            <ThreeDCard className="h-full">
              <div className="bg-gradient-to-b from-[#181820] to-[#121217] p-8 md:p-10 rounded-3xl border border-zinc-800 group-hover:border-primary/60 transition-all duration-300 shadow-2xl h-full flex flex-col justify-between relative overflow-hidden">
                <div style={{ transform: "translateZ(45px)" }}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(200,16,46,0.4)]">
                      <Target className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl text-white font-extrabold">
                        Our Vision
                      </h2>
                    </div>
                  </div>
                  <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                    To cultivate technically proficient, innovative engineers
                    through hands-on practical learning, cutting-edge research,
                    and active industry collaboration in power electronics and
                    sustainable energy.
                  </p>
                </div>
                <div className="h-1 w-full bg-gradient-to-r from-primary/80 to-transparent rounded-full mt-8 group-hover:scale-x-105 transition-transform duration-500 origin-left" />
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/40 transition-colors pointer-events-none" />
              </div>
            </ThreeDCard>

            {/* Mission */}
            <ThreeDCard className="h-full">
              <div className="bg-gradient-to-b from-[#181820] to-[#121217] p-8 md:p-10 rounded-3xl border border-zinc-800 group-hover:border-primary/60 transition-all duration-300 shadow-2xl h-full flex flex-col justify-between relative overflow-hidden">
                <div style={{ transform: "translateZ(45px)" }}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(200,16,46,0.4)]">
                      <Lightbulb className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl text-white font-extrabold">
                        Our Mission
                      </h2>
                    </div>
                  </div>
                  <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                    Empowering student members with practical technical skills,
                    industry mentorship, research guidance, and collaborative
                    project platforms to bridge academia with real-world
                    engineering excellence.
                  </p>
                </div>
                <div className="h-1 w-full bg-gradient-to-r from-primary/80 to-transparent rounded-full mt-8 group-hover:scale-x-105 transition-transform duration-500 origin-left" />
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/40 transition-colors pointer-events-none" />
              </div>
            </ThreeDCard>
          </div>

          {/* ── Swipe Deck → Horizontal Grid ── */}
          <SwipeDeckSection />

        </div>
      </section>
    </>
  );
}
