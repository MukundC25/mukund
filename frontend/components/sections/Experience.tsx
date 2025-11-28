'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Calendar, MapPin, ChevronDown, Briefcase, Building2, Sparkles } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { resumeData, Experience as ExperienceType } from '@/lib/resume-data';

function ExperienceCard({ experience, index }: { experience: ExperienceType; index: number }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Present';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.17, 0.85, 0.45, 1] }}
      className="relative pl-8 sm:pl-12 pb-12 last:pb-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Timeline line */}
      <motion.div 
        className="absolute left-0 sm:left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--accent)] via-[var(--border)] to-transparent"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        style={{ originY: 0 }}
      />
      
      {/* Animated Timeline dot with pulse */}
      <motion.div
        className="absolute left-0 sm:left-2 top-6 -translate-x-1/2 z-10"
        initial={prefersReducedMotion ? {} : { scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.3, type: 'spring' }}
      >
        <div className="relative">
          <div className="w-4 h-4 rounded-full bg-[var(--accent)] border-4 border-[var(--background)]" />
          {!prefersReducedMotion && (
            <motion.div
              className="absolute inset-0 rounded-full bg-[var(--accent)]"
              animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </div>
      </motion.div>

      {/* Card */}
      <motion.div
        className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[var(--surface)] to-[var(--background-secondary)] border border-[var(--border)] overflow-hidden group"
        whileHover={prefersReducedMotion ? {} : { 
          scale: 1.02, 
          y: -4,
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Floating work emoji */}
        {!prefersReducedMotion && (
          <motion.span
            className="absolute bottom-4 right-4 text-lg opacity-40"
            animate={{ 
              rotate: [-6, 6, -6],
              y: [-2, 2, -2],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {experience.company.includes('Finmate') ? '💰' : 
             experience.company.includes('Apta') ? '🧠' : '⚙️'}
          </motion.span>
        )}
        
        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[var(--accent-glow)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[var(--accent)] opacity-[0.05] rounded-bl-full" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div className="flex items-start gap-4">
              {/* Company Icon */}
              <motion.div 
                className="p-3 rounded-xl bg-[var(--accent-muted)] border border-[var(--accent-glow)]"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Building2 size={24} className="text-[var(--accent)]" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                  {experience.role}
                </h3>
                <p className="text-[var(--accent)] font-semibold text-lg">{experience.company}</p>
              </div>
            </div>
            
            {/* Date & Location badges */}
            <div className="flex flex-wrap gap-2">
              <motion.div 
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--background)] border border-[var(--border)] text-sm"
                whileHover={{ scale: 1.05 }}
              >
                <Calendar size={14} className="text-[var(--accent)]" />
                <span className="text-[var(--foreground-muted)]">
                  {formatDate(experience.start)} - {formatDate(experience.end)}
                </span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--background)] border border-[var(--border)] text-sm"
                whileHover={{ scale: 1.05 }}
              >
                <MapPin size={14} className="text-[var(--accent-green)]" />
                <span className="text-[var(--foreground-muted)]">{experience.location}</span>
              </motion.div>
            </div>
          </div>

          {/* Bullets with stagger animation */}
          <motion.ul className="space-y-3 mb-6">
            {experience.bullets.map((bullet, i) => (
              <motion.li
                key={i}
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 + i * 0.1 }}
                className="flex items-start gap-3 text-[var(--foreground-muted)] group/item"
              >
                <motion.span 
                  className="mt-2 flex-shrink-0"
                  whileHover={{ scale: 1.5 }}
                >
                  <Sparkles size={14} className="text-[var(--accent)]" />
                </motion.span>
                <span className="group-hover/item:text-[var(--foreground)] transition-colors">{bullet}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Tech tags with stagger */}
          <div className="pt-4 border-t border-[var(--border)]">
            <div className="flex flex-wrap gap-2">
              {experience.tech.map((tech, i) => (
                <motion.span
                  key={i}
                  initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-[var(--accent-muted)] to-[var(--background)] text-[var(--accent)] border border-[var(--accent-glow)] cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="experience" className="py-24 bg-[var(--background)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">
            Experience
          </h2>
          <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto">
            My professional journey in software engineering and AI/ML development.
          </p>
        </motion.div>

        <div className="relative">
          {resumeData.experience.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
