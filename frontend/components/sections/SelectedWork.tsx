'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { resumeData } from '@/lib/resume-data';
import { useRef } from 'react';

// Rich visual thumbnails for each project
function ProjectVisual({ index }: { index: number }) {
  const visuals = [
    // EKIA — agentic AI pipeline: connected nodes
    <div key="v0" className="absolute inset-0 bg-neutral-900 dark:bg-neutral-800 flex items-center justify-center">
      <svg viewBox="0 0 200 120" className="w-3/4 h-3/4 opacity-90">
        <circle cx="40" cy="60" r="8" fill="#4ade80" opacity="0.8" />
        <circle cx="80" cy="35" r="8" fill="#60a5fa" opacity="0.8" />
        <circle cx="120" cy="60" r="8" fill="#f472b6" opacity="0.8" />
        <circle cx="80" cy="85" r="8" fill="#fbbf24" opacity="0.8" />
        <circle cx="160" cy="60" r="8" fill="#a78bfa" opacity="0.8" />
        <line x1="48" y1="56" x2="72" y2="39" stroke="#ffffff" strokeWidth="1.5" opacity="0.3" />
        <line x1="88" y1="39" x2="112" y2="56" stroke="#ffffff" strokeWidth="1.5" opacity="0.3" />
        <line x1="48" y1="64" x2="72" y2="81" stroke="#ffffff" strokeWidth="1.5" opacity="0.3" />
        <line x1="88" y1="81" x2="112" y2="64" stroke="#ffffff" strokeWidth="1.5" opacity="0.3" />
        <line x1="128" y1="60" x2="152" y2="60" stroke="#ffffff" strokeWidth="1.5" opacity="0.3" />
      </svg>
    </div>,
    // Refine — clean abstract asterisk on light bg
    <div key="v1" className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-24 h-24 text-neutral-800 dark:text-neutral-200">
        <path
          d="M50 15 L50 85 M15 50 L85 50 M25 25 L75 75 M75 25 L25 75"
          stroke="currentColor"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="50" cy="50" r="5" fill="currentColor" />
      </svg>
    </div>,
    // FinMate — dark with code/terminal icons
    <div key="v2" className="absolute inset-0 bg-neutral-900 dark:bg-neutral-800 flex items-center justify-center gap-5">
      <div className="w-10 h-10 border-2 border-neutral-500 rounded-md flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      </div>
      <div className="text-neutral-400 font-mono text-sm tracking-wider">
        <span className="text-emerald-400">0</span><span className="text-neutral-500">1</span>
      </div>
      <div className="w-10 h-10 border-2 border-neutral-500 rounded-md flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      </div>
    </div>,
    // Apta — warm gradient with recommendation icons
    <div key="v3" className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center">
      <div className="grid grid-cols-3 gap-3">
        {['📚', '🎯', '💡', '🌱', '🎨', '⚡'].map((emoji, i) => (
          <div key={i} className="w-10 h-10 bg-white/60 dark:bg-white/10 rounded-lg flex items-center justify-center text-lg shadow-sm">
            {emoji}
          </div>
        ))}
      </div>
    </div>,
  ];
  return visuals[index % visuals.length];
}

export function SelectedWork() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ['2%', '-2%']);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-14 sm:py-20 border-t border-border"
    >
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-12"
        >
          <h2 className="text-2xl text-foreground">My work</h2>
          <a
            href={resumeData.personal.contacts.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all
          </a>
        </motion.div>

        {/* Project grid */}
        <motion.div
          style={prefersReducedMotion ? {} : { y: yParallax }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8"
        >
          {resumeData.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <a
                href={project.links.live || project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {/* Visual thumbnail */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-lg transition-all duration-300">
                  <ProjectVisual index={index} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors duration-300 flex items-end justify-end p-4">
                    <ArrowUpRight
                      size={20}
                      className="text-neutral-500 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
                    />
                  </div>
                </div>

                {/* Project info */}
                <h3 className="font-sans font-medium text-foreground text-[0.95rem] mb-0.5 group-hover:text-muted-foreground transition-colors">
                  {project.title.split(':')[0]}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {project.title.includes(':')
                    ? project.title.split(':')[1].trim()
                    : project.description.slice(0, 50)}
                </p>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
