import { motion } from "framer-motion";
import { PROJECTS } from "../data/projects";
import type { ResumeData } from "../types/resume";
import { useEffect, useState } from "react";

/**
 * Simplified 2D layout for small screens: same narrative, no WebGL.
 */
export function MobileFallback() {
  const [resume, setResume] = useState<ResumeData | null>(null);
  useEffect(() => {
    fetch("/resume.json")
      .then((r) => r.json())
      .then(setResume)
      .catch(() => setResume(null));
  }, []);

  return (
    <div className="relative z-10 min-h-screen bg-gradient-to-b from-[#0a0e1a] via-[#030508] to-black pb-16 pt-20 md:hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
        <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-cyan-glow/20 blur-3xl" />
        <div className="absolute -right-10 bottom-40 h-72 w-72 rounded-full bg-magenta-glow/15 blur-3xl" />
      </div>

      <motion.section
        id="home"
        className="section-anchor relative px-5"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-glow/80">Portfolio</p>
        <h1 className="font-display mt-2 text-4xl font-black text-white neon-text">
          {resume?.name ?? "Lokesh"}
        </h1>
        <p className="mt-2 text-sm text-slate-400">{resume?.title}</p>
        <p className="mt-4 max-w-prose text-sm leading-relaxed text-slate-300">{resume?.summary}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-400">
          {resume?.email && (
            <a href={`mailto:${resume.email}`} className="text-cyan-glow underline">
              {resume.email}
            </a>
          )}
          {resume?.phone && <span>{resume.phone}</span>}
        </div>
      </motion.section>

      <motion.section id="projects" className="section-anchor mt-14 px-5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <h2 className="font-display text-lg font-bold text-magenta-glow">Projects</h2>
        <p className="mt-1 text-xs text-slate-500">Tap a card — full detail below.</p>
        <ul className="mt-6 space-y-4">
          {PROJECTS.map((p) => (
            <li key={p.id} className="glass rounded-xl p-4">
              <img src={p.thumbnail} alt="" className="mb-3 h-32 w-full rounded-lg object-cover" />
              <h3 className="font-medium text-cyan-glow">{p.title}</h3>
              <p className="mt-1 text-xs text-slate-400">{p.short}</p>
              <p className="mt-2 text-sm text-slate-300">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.technologies.map((t) => (
                  <span key={t} className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">
                    {t}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </motion.section>

      <motion.section id="resume" className="section-anchor mt-14 px-5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <h2 className="font-display text-lg font-bold text-electric">Resume</h2>
        {resume && (
          <>
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-200">Experience</h3>
              <ul className="mt-3 space-y-4">
                {resume.experience.map((e) => (
                  <li key={e.id} className="glass rounded-lg p-3 text-sm">
                    <p className="font-medium text-white">{e.role}</p>
                    <p className="text-xs text-cyan-glow/90">
                      {e.company} · {e.start} – {e.end}
                    </p>
                    <ul className="mt-2 list-inside list-disc text-xs text-slate-400">
                      {e.bullets.map((b, i) => (
                        <li key={i}>{b.text}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-slate-200">Education</h3>
              <ul className="mt-3 space-y-3">
                {resume.education.map((ed) => (
                  <li key={ed.id} className="glass rounded-lg p-3 text-sm text-slate-300">
                    <span className="font-medium text-white">{ed.degree}</span>
                    <br />
                    <span className="text-xs text-slate-500">
                      {ed.institution} · {ed.start} – {ed.end}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-slate-200">Skills</h3>
              <div className="mt-3 space-y-3">
                {resume.skills.map((s) => (
                  <div key={s.category} className="glass rounded-lg p-3">
                    <p className="text-xs font-medium text-magenta-glow">{s.category}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">{s.items.join(" · ")}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-slate-200">Research interests</h3>
              <p className="mt-2 text-xs text-slate-400">{resume.researchInterests.join(" · ")}</p>
            </div>
          </>
        )}
      </motion.section>
    </div>
  );
}
