import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "../data/projects";

type Props = {
  projectId: string | null;
  onClose: () => void;
};

/**
 * Glass overlay for the active project: tech tags, links, thumbnail, full description.
 */
export function ProjectModal({ projectId, onClose }: Props) {
  const project = projectId ? PROJECTS.find((p) => p.id === projectId) : null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Close project details"
            onClick={onClose}
          />
          <motion.article
            className="glass-strong relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-cyan-glow/30 p-6 shadow-glow md:p-8"
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300 hover:bg-white/10"
            >
              Close
            </button>
            <img
              src={project.thumbnail}
              alt=""
              className="mb-5 h-40 w-full rounded-lg object-cover md:h-48"
            />
            <h2
              id="project-modal-title"
              className="font-display text-xl font-bold tracking-wide text-cyan-glow neon-text md:text-2xl"
            >
              {project.title}
            </h2>
            <p className="mt-2 text-sm text-slate-400">{project.short}</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-magenta-glow/30 bg-magenta-dim/20 px-3 py-0.5 text-xs text-fuchsia-200"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.liveUrl && project.liveUrl !== "#" && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-cyan-glow/20 px-4 py-2 text-sm font-medium text-cyan-glow ring-1 ring-cyan-glow/40 hover:bg-cyan-glow/30"
                >
                  Live demo
                </a>
              )}
              {project.githubUrl && project.githubUrl !== "#" && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-white/15 px-4 py-2 text-sm text-slate-200 hover:bg-white/5"
                >
                  GitHub
                </a>
              )}
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
