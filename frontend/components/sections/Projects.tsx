'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Calendar, ChevronRight, Sparkles, Rocket, Folder } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { resumeData, Project } from '@/lib/resume-data';

// Project accent colors for variety
const projectColors = [
  { gradient: 'from-amber-500/20 via-orange-500/10 to-transparent', accent: '#FFB86B' },
  { gradient: 'from-emerald-500/20 via-green-500/10 to-transparent', accent: '#76C893' },
  { gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent', accent: '#60A5FA' },
  { gradient: 'from-purple-500/20 via-violet-500/10 to-transparent', accent: '#A78BFA' },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const colorScheme = projectColors[index % projectColors.length];
  const isOngoing = project.date.toLowerCase().includes('ongoing');

  return (
    <motion.article
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', stiffness: 100 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-full"
    >
      <motion.div
        className="relative p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[var(--surface)] to-[var(--background-secondary)] border border-[var(--border)] overflow-hidden h-full flex flex-col"
        whileHover={prefersReducedMotion ? {} : { 
          y: -8, 
          scale: 1.02,
          boxShadow: `0 25px 50px rgba(0,0,0,0.4), 0 0 0 1px ${colorScheme.accent}20`
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Animated gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${colorScheme.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />
        
        {/* Floating particles on hover */}
        {!prefersReducedMotion && isHovered && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{ 
                  backgroundColor: colorScheme.accent,
                  left: `${15 + i * 15}%`,
                  bottom: '5%'
                }}
                animate={{
                  y: [0, -80],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.15,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>
        )}

        {/* Corner decoration */}
        <div 
          className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-[0.05] group-hover:opacity-[0.1] transition-opacity"
          style={{ background: `linear-gradient(to bottom left, ${colorScheme.accent}, transparent)` }}
        />
        
        {/* Floating project-specific emoji */}
        {!prefersReducedMotion && (
          <motion.span
            className="absolute bottom-4 right-4 text-lg opacity-40 z-20"
            animate={{ 
              rotate: [-8, 8, -8],
              y: [-2, 2, -2],
            }}
            transition={{ duration: 2.5 + index * 0.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {project.title.toLowerCase().includes('jobeez') ? '💼' :
             project.title.toLowerCase().includes('finmate') ? '💳' :
             project.title.toLowerCase().includes('apta') ? '🎯' :
             project.title.toLowerCase().includes('conversational') ? '📄' : '🚀'}
          </motion.span>
        )}

        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex-1">
              {/* Project icon */}
              <motion.div 
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 border"
                style={{ 
                  backgroundColor: `${colorScheme.accent}15`,
                  borderColor: `${colorScheme.accent}30`
                }}
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Folder size={20} style={{ color: colorScheme.accent }} />
              </motion.div>
              
              <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors mb-2 leading-tight">
                {project.title}
              </h3>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-sm text-[var(--foreground-dim)]">
                  <Calendar size={14} />
                  <span>{project.date}</span>
                </div>
                {isOngoing && (
                  <motion.span 
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--accent-green)]/10 text-[var(--accent-green)] border border-[var(--accent-green)]/20"
                    animate={!prefersReducedMotion ? { opacity: [1, 0.7, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
                    Active
                  </motion.span>
                )}
              </div>
            </div>
            
            {/* Links */}
            <div className="flex items-center gap-2">
              {project.links.repo && (
                <motion.a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[var(--background)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--accent)] transition-all"
                  aria-label="View source code"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={18} />
                </motion.a>
              )}
              {project.links.live ? (
                <motion.a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[var(--accent)] text-[var(--background)] hover:bg-[var(--accent-hover)] transition-all"
                  aria-label="View live demo"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink size={18} />
                </motion.a>
              ) : (
                <motion.div
                  className="p-2.5 rounded-xl bg-[var(--background)] text-[var(--foreground-dim)] border border-[var(--border)] cursor-not-allowed opacity-50"
                  title="Live demo coming soon"
                >
                  <ExternalLink size={18} />
                </motion.div>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-[var(--foreground-muted)] text-sm mb-4 leading-relaxed flex-grow">
            {project.description}
          </p>

          {/* Highlights */}
          <ul className="space-y-2 mb-5">
            {project.highlights.slice(0, 3).map((highlight, i) => (
              <motion.li
                key={i}
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                className="flex items-start gap-2 text-sm text-[var(--foreground-muted)] group/item"
              >
                <motion.span 
                  className="mt-1 flex-shrink-0"
                  whileHover={{ scale: 1.3, rotate: 180 }}
                >
                  <Sparkles size={12} style={{ color: colorScheme.accent }} />
                </motion.span>
                <span className="group-hover/item:text-[var(--foreground)] transition-colors">{highlight}</span>
              </motion.li>
            ))}
          </ul>

          {/* Tech Stack */}
          <div className="pt-4 border-t border-[var(--border)] mt-auto">
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 5).map((tech, i) => (
                <motion.span
                  key={i}
                  initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 + i * 0.03 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[var(--background)] text-[var(--foreground-muted)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
              {project.tech.length > 5 && (
                <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[var(--background)] text-[var(--foreground-dim)] border border-[var(--border)]">
                  +{project.tech.length - 5}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="projects" className="py-24 bg-[var(--background-secondary)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[var(--accent)] blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[var(--accent-green)] blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={prefersReducedMotion ? {} : { scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-muted)] border border-[var(--accent-glow)] mb-4"
          >
            <Rocket size={16} className="text-[var(--accent)]" />
            <span className="text-sm font-medium text-[var(--accent)]">Portfolio</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto text-lg">
            A selection of projects showcasing my expertise in AI/ML, full-stack development, and mobile applications.
          </p>
        </motion.div>

        {/* Projects Grid - 2 columns for better card display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {resumeData.projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* View More */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <motion.a
            href={resumeData.personal.contacts.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--surface)] to-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)] transition-all group"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github size={20} className="group-hover:rotate-12 transition-transform" />
            <span className="font-medium">View More on GitHub</span>
            <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
