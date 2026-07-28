import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, CheckCircle2, Cpu, MonitorPlay, Activity, Users, UserCheck } from "lucide-react";
import { projects } from "../data/projects";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center flex-col gap-4">
        <h2 className="text-white text-2xl">Project not found</h2>
        <Link to="/projects" className="text-primary hover:underline">Return to Projects</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.title} | Projects | IEEE PELS SSN</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <section className="py-margin-lg mt-10">
        <div className="max-w-container-max mx-auto px-margin-lg">
          <Link to="/projects" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <span className={`inline-block mb-4 text-xs font-label-caps px-3 py-1 rounded-full border ${
                project.status === "Completed" ? "bg-green-900/20 text-green-400 border-green-500/30" :
                project.status === "In Progress" ? "bg-primary/20 text-primary border-primary/30" :
                "bg-gray-800 text-gray-400 border-gray-600"
              }`}>
                {project.status}
              </span>
              <h1 className="font-headline-xl text-headline-xl text-white">{project.title}</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-margin-lg">
            
            <div className="lg:col-span-2 space-y-12">
              <div className="glass-card p-8 rounded-xl border-l-4 border-l-primary">
                <h3 className="font-headline-md text-white mb-3">Problem Statement</h3>
                <p className="text-on-surface-variant font-body-md">
                  {project.problemStatement || project.description}
                </p>
              </div>

              {project.objectives && (
                <div>
                  <h2 className="font-headline-lg text-headline-lg text-white mb-6">Objectives</h2>
                  <div className="grid gap-4">
                    {project.objectives.map((obj, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span className="text-on-surface font-body-md">{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface-container-high p-6 rounded-xl border border-outline/10">
                  <div className="flex items-center gap-3 mb-4">
                    <MonitorPlay className="text-primary w-6 h-6" />
                    <h3 className="font-headline-md text-white">Simulation</h3>
                  </div>
                  <p className="text-on-surface-variant text-sm">{project.simulation || "N/A"}</p>
                </div>
                
                <div className="bg-surface-container-high p-6 rounded-xl border border-outline/10">
                  <div className="flex items-center gap-3 mb-4">
                    <Cpu className="text-primary w-6 h-6" />
                    <h3 className="font-headline-md text-white">Hardware</h3>
                  </div>
                  <p className="text-on-surface-variant text-sm">{project.hardware || "N/A"}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Project Team Members */}
              {project.team && project.team.length > 0 && (
                <div className="glass-card p-6 rounded-xl border border-primary/20 bg-gradient-to-b from-[#C8102E]/10 to-transparent">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="text-primary w-5 h-5" />
                    <h3 className="font-headline-md text-white">Project Team</h3>
                  </div>
                  <div className="space-y-2.5">
                    {project.team.map((member) => (
                      <div
                        key={member}
                        className="flex items-center gap-3 p-2.5 rounded-lg bg-surface-container-high/80 border border-white/5 hover:border-primary/30 transition-colors"
                      >
                        <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary text-xs font-bold">
                          {member.charAt(0)}
                        </div>
                        <span className="text-white text-sm font-medium">{member}</span>
                        <UserCheck className="w-3.5 h-3.5 text-green-400 ml-auto opacity-70" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="glass-card p-6 rounded-xl">
                <h3 className="font-headline-md text-white mb-6">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span key={tech} className="bg-surface-container-highest border border-outline/10 text-on-surface px-3 py-1.5 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="text-primary w-5 h-5" />
                  <h3 className="font-headline-md text-white">Current Progress</h3>
                </div>
                <p className="text-on-surface-variant font-body-md">
                  {project.currentProgress}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

