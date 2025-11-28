'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, GraduationCap, Briefcase, User, Sparkles, Brain } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { resumeData } from '@/lib/resume-data';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const infoCards = [
    {
      icon: MapPin,
      title: 'Location',
      value: resumeData.personal.location,
      subtext: 'Open to Remote',
      color: '#FFB86B',
      floatingEmoji: '📍',
    },
    {
      icon: GraduationCap,
      title: 'Education',
      value: resumeData.education[0]?.degree,
      subtext: resumeData.education[0]?.institution,
      color: '#76C893',
      floatingEmoji: '🎓',
    },
    {
      icon: Briefcase,
      title: 'Experience',
      value: `${resumeData.experience.length} Internships`,
      subtext: 'AI/ML & Full-Stack',
      color: '#60A5FA',
      floatingEmoji: '💼',
    },
  ];

  return (
    <section id="about" className="py-24 bg-[var(--background-secondary)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-[var(--accent)] blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-[var(--accent-green)] blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <motion.div
              initial={prefersReducedMotion ? {} : { scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-muted)] border border-[var(--accent-glow)] mb-4"
            >
              <User size={16} className="text-[var(--accent)]" />
              <span className="text-sm font-medium text-[var(--accent)]">About Me</span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--foreground)]">
              Passionate <span className="text-gradient">Developer</span>
            </h2>
            <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto text-lg leading-relaxed">
              {resumeData.summary}
            </p>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {infoCards.map((card, index) => (
              <motion.div
                key={card.title}
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-[var(--surface)] to-[var(--background-secondary)] border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-300 overflow-hidden"
                whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.02 }}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Floating emoji */}
                {!prefersReducedMotion && (
                  <motion.span
                    className="absolute top-3 right-3 text-sm opacity-60"
                    animate={{ 
                      rotate: [-8, 8, -8],
                      y: [-1, 1, -1],
                    }}
                    transition={{ duration: 2 + index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    {card.floatingEmoji}
                  </motion.span>
                )}
                
                {/* Hover glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at top right, ${card.color}10, transparent 70%)` }}
                />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div 
                      className="p-3 rounded-xl border"
                      style={{ 
                        backgroundColor: `${card.color}15`,
                        borderColor: `${card.color}30`
                      }}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <card.icon size={22} style={{ color: card.color }} />
                    </motion.div>
                    <h3 className="font-bold text-lg text-[var(--foreground)]">{card.title}</h3>
                  </div>
                  <p className="text-[var(--foreground)] font-medium mb-1">{card.value}</p>
                  <p className="text-sm text-[var(--foreground-dim)]">{card.subtext}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Education Details */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="text-center">
              <motion.div
                initial={prefersReducedMotion ? {} : { scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-muted)] border border-[var(--accent-glow)] mb-4"
              >
                <GraduationCap size={16} className="text-[var(--accent)]" />
                <span className="text-sm font-medium text-[var(--accent)]">Academic Background</span>
              </motion.div>
              <h3 className="text-2xl font-bold text-[var(--foreground)]">Education</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resumeData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="group relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[var(--surface)] to-[var(--background-secondary)] border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-300 overflow-hidden"
                  whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.02 }}
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: index === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  {/* Floating education emoji */}
                  {!prefersReducedMotion && (
                    <motion.span
                      className="absolute bottom-4 right-4 text-lg opacity-40"
                      animate={{ 
                        rotate: [-5, 5, -5],
                        y: [-2, 2, -2],
                      }}
                      transition={{ duration: 2.5 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      {edu.institution.includes('IIT') ? '🤖' : '📚'}
                    </motion.span>
                  )}
                  
                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[var(--accent)] opacity-[0.05] rounded-bl-full group-hover:opacity-[0.1] transition-opacity" />
                  
                  {/* AI badge for IIT */}
                  {edu.institution.includes('IIT') && (
                    <motion.div 
                      className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--accent-green)]/10 border border-[var(--accent-green)]/20"
                      animate={!prefersReducedMotion ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Brain size={12} className="text-[var(--accent-green)]" />
                      <span className="text-xs font-medium text-[var(--accent-green)]">AI Focus</span>
                    </motion.div>
                  )}

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <motion.div 
                        className="p-3 rounded-xl bg-[var(--accent-muted)] border border-[var(--accent-glow)]"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <GraduationCap size={24} className="text-[var(--accent)]" />
                      </motion.div>
                      <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[var(--background)] border border-[var(--border)]">
                        <Sparkles size={14} className="text-[var(--accent)]" />
                        <span className="text-sm font-bold text-[var(--accent)]">{edu.gpa}</span>
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                      {edu.degree}
                    </h4>
                    <p className="text-[var(--foreground-muted)] mb-3">{edu.institution}</p>
                    <div className="flex items-center gap-2 text-sm text-[var(--foreground-dim)]">
                      <span className="px-2 py-1 rounded-md bg-[var(--background)] border border-[var(--border)]">
                        {edu.start} - {edu.end}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
