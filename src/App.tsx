import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Loader } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { ChaosScene } from './components/ChaosScene';
import { ParticleTsunami } from './components/ParticleTsunami';
// Removed procedural 3D models per user request
import { ResumeRibbon } from './components/ResumeRibbon';
import { SkillCloud } from './components/SkillCloud';
import { StellarEffects } from './components/StellarEffects';
import { useAppStore } from './store/useAppStore';
import projectData from '../public/projectData.json';
import resumeData from '../public/resume.json';
import { Brain, FlaskConical, CarFront } from 'lucide-react';
import { motion } from 'framer-motion';

export default function App() {
  const particlesEnabled = useAppStore((state) => state.particlesEnabled);

  return (
    <div className="w-screen h-screen bg-[#050510] overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#0a0a0f']} />
        <fog attach="fog" args={['#0a0a0f', 8, 30]} />

        <Suspense fallback={null}>
          <ScrollControls pages={11} damping={0.15} distance={1.2}>

            {/* The 3D World */}
            <StellarEffects />
            <ChaosScene />
            {particlesEnabled && <ParticleTsunami count={4000} />}
            {/* 3D project models removed, replaced by 2D HTML images */}
            <ResumeRibbon />
            <SkillCloud />

            {/* The 2D Overlay linked to Scroll */}
            <Scroll html style={{ width: '100vw' }}>
              {/* Hero Borderline Mounting Frame - scrolls up and disappears naturally */}
              <div className="absolute top-6 left-6 md:top-10 md:left-10 md:right-10 w-[calc(100vw-3rem)] md:w-auto h-[calc(100vh-3rem)] md:h-[calc(100vh-5rem)] border border-white/15 rounded-[3rem] pointer-events-none z-0 opacity-70 shadow-[inset_0_0_80px_rgba(255,255,255,0.02)]" />

              <div className="w-full relative pointer-events-none flex flex-col pt-[25vh] pb-[20vh] gap-[30vh] z-10">

                {/* Hero Section */}
                <section className="flex flex-col justify-center items-start px-10 md:px-24 w-full min-h-[50vh]">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="p-10 max-w-5xl pointer-events-auto flex flex-col md:flex-row items-center md:justify-between gap-10 md:gap-24"
                  >
                    <div className="flex-1 md:max-w-2xl">
                      <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight text-white text-glow">
                        {resumeData.basics.name}
                      </h1>
                      <h2 className="text-xl md:text-2xl font-light text-gray-300 mb-2 tracking-wide">
                        {resumeData.basics.label}
                      </h2>
                      <h3 className="text-lg md:text-xl font-medium text-gray-400 mb-6 tracking-wider uppercase">
                        University of Delhi
                      </h3>
                      <p className="text-lg text-gray-400 font-light leading-relaxed">
                        {resumeData.basics.summary}
                      </p>
                    </div>

                    <div className="flex-shrink-0 relative group md:ml-12">
                      <div className="absolute inset-0 bg-white/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      <div className="relative p-2 md:p-3 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-[0_0_40px_rgba(255,255,255,0.05)] z-10 transition-all duration-700 group-hover:border-white/30 group-hover:bg-white/[0.05]">
                        <img
                          src="/profile.jpg"
                          alt="Lokesh"
                          className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full border border-white/20"
                        />
                      </div>
                    </div>
                  </motion.div>
                </section>

                {/* Timeline Container */}
                <div className="relative w-full max-w-7xl mx-auto mt-[10vh]">
                  {/* The Continuous Vertical Timeline String */}
                  <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2 z-0" />

                  {/* Streamlined Projects Overlay (Right Side) */}
                  {projectData.map((project) => (
                    <div key={project.id} className="relative flex w-full mb-[25vh] group">
                      {/* Timeline Dot */}
                      <div className="absolute left-8 md:left-1/2 top-1/2 w-4 h-4 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] border-[3px] border-[#0a0a0f] z-10 transition-transform duration-500 group-hover:scale-[1.7]" />

                      {/* Project Image Panel (Left Side on Desktop) */}
                      <section className="hidden md:flex absolute left-0 w-1/2 pr-16 items-center justify-end h-full pointer-events-none">
                        <motion.div
                          initial={{ opacity: 0, x: -30, scale: 0.95 }}
                          whileInView={{ opacity: 1, x: 0, scale: 1 }}
                          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                          viewport={{ once: false, amount: 0.4 }}
                          className="w-64 h-64 md:w-80 md:h-80 flex items-center justify-center transition-transform duration-700 group-hover:scale-110"
                        >
                          {project.id === "p1" && <Brain className="w-32 h-32 md:w-40 md:h-40 text-gray-500 group-hover:text-white transition-colors duration-500 stroke-[1]" />}
                          {project.id === "p2" && <FlaskConical className="w-32 h-32 md:w-40 md:h-40 text-gray-500 group-hover:text-white transition-colors duration-500 stroke-[1]" />}
                          {project.id === "p3" && <CarFront className="w-32 h-32 md:w-40 md:h-40 text-gray-500 group-hover:text-white transition-colors duration-500 stroke-[1]" />}
                        </motion.div>
                      </section>

                      <section className="flex items-center w-full pl-20 pr-6 md:w-1/2 md:ml-auto md:pl-16 md:pr-10">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.85, y: 40 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
                          viewport={{ once: false, amount: 0.4 }}
                          className="glass-panel p-10 rounded-2xl w-full pointer-events-auto text-left hover:border-white/30 transition-colors"
                        >
                          <h2 className="text-3xl font-bold text-white tracking-tight">{project.title}</h2>
                          <p className="text-gray-400 font-mono text-xs tracking-widest uppercase mb-6 mt-2">{project.meta}</p>
                          <ul className="list-disc pl-5 space-y-3 text-gray-300 text-sm md:text-base leading-relaxed hidden md:block">
                            {project.bullets.map((bullet, i) => (
                              <li key={i}>{bullet}</li>
                            ))}
                          </ul>
                          <p className="md:hidden text-gray-400 mt-4">{project.short}</p>
                        </motion.div>
                      </section>
                    </div>
                  ))}

                  {resumeData.work.map((job, idx) => (
                    <div key={idx} className="relative flex w-full mb-[25vh] group">
                      {/* Timeline Dot */}
                      <div className="absolute left-8 md:left-1/2 top-1/2 w-4 h-4 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] border-[3px] border-[#0a0a0f] z-10 transition-transform duration-500 group-hover:scale-[1.7]" />

                      <section className="flex items-center w-full pl-20 pr-6 md:w-1/2 md:mr-auto md:pr-16 md:pl-10">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.85, y: 40 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
                          viewport={{ once: false, amount: 0.4 }}
                          className="glass-panel p-10 rounded-2xl w-full pointer-events-auto hover:border-white/30 transition-colors"
                        >
                          <h2 className="text-3xl font-bold text-white tracking-tight">{job.company}</h2>
                          <div className="flex justify-between items-center text-gray-400 font-mono text-xs tracking-wide mb-6 mt-2 border-b border-white/10 pb-4">
                            <span>{job.position}</span>
                            <span>{job.startDate} - {job.endDate}</span>
                          </div>
                          <ul className="list-disc pl-5 space-y-3 text-gray-300 text-sm md:text-base leading-relaxed">
                            {job.highlights.map((hlt, i) => (
                              <li key={i}>{hlt}</li>
                            ))}
                          </ul>
                        </motion.div>
                      </section>
                    </div>
                  ))}

                  {/* Skills Map Card (Right side alternating) */}
                  <div className="relative flex w-full mb-[25vh] group">
                    {/* Timeline Dot */}
                    <div className="absolute left-8 md:left-1/2 top-1/2 w-4 h-4 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] border-[3px] border-[#0a0a0f] z-10 transition-transform duration-500 group-hover:scale-[1.7]" />

                    <section className="flex items-center w-full pl-20 pr-6 md:w-1/2 md:ml-auto md:pl-16 md:pr-10">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 40 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
                        viewport={{ once: false, amount: 0.4 }}
                        className="glass-panel p-10 rounded-2xl w-full pointer-events-auto text-left hover:border-white/30 transition-colors"
                      >
                        <h2 className="text-3xl font-bold text-white tracking-tight mb-8">Technical Snapshot</h2>
                        <div className="flex flex-wrap gap-3">
                          {resumeData.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-4 py-2 text-sm font-medium text-gray-200 bg-white/[0.05] border border-white/10 rounded-lg shadow-sm hover:bg-white/10 hover:border-white/30 transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </section>
                  </div>

                  {resumeData.education.map((edu, idx) => (
                    <div key={`edu-${idx}`} className="relative flex w-full mb-[15vh] group">
                      {/* Timeline Dot */}
                      <div className="absolute left-8 md:left-1/2 top-1/2 w-4 h-4 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] border-[3px] border-[#0a0a0f] z-10 transition-transform duration-500 group-hover:scale-[1.7]" />

                      <section className="flex items-center justify-center w-full pl-20 pr-6 md:px-24">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.85, y: 40 }}
                          whileInView={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
                          viewport={{ once: false, amount: 0.5 }}
                          className="glass-panel p-8 rounded-2xl max-w-2xl w-full text-center pointer-events-auto hover:border-white/30 transition-colors"
                        >
                          <h3 className="text-2xl font-bold text-white tracking-tight">{edu.institution}</h3>
                          <p className="text-gray-300 mt-2 font-light">{edu.area}</p>
                          <p className="text-gray-500 font-mono text-xs mt-4">{edu.startDate} - {edu.endDate}</p>
                        </motion.div>
                      </section>
                    </div>
                  ))}

                </div>

              </div>
            </Scroll>

          </ScrollControls>
        </Suspense>

        {/* Global Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#00f3ff" />
        <directionalLight position={[-10, -10, -5]} intensity={2} color="#ff00ea" />

        {/* Post Processing Stack */}
        <EffectComposer multisampling={0}>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={0.5} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>

      </Canvas>
      <Loader />

      {/* HUD Elements */}
      <div className="absolute bottom-5 left-5 text-gray-500/50 text-[10px] uppercase font-mono tracking-widest">
        Intelligent Sensing • Embedded Systems • ML Inference
      </div>
    </div>
  );
}
