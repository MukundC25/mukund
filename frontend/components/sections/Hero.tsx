'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Download, Mail, Code2, Sparkles, Zap } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { resumeData } from '@/lib/resume-data';
import { Button } from '@/components/ui/Button';

// Floating code symbols for background animation
const floatingElements = [
  { symbol: '<>', delay: 0, duration: 15, x: '10%', y: '20%' },
  { symbol: '{}', delay: 2, duration: 18, x: '85%', y: '15%' },
  { symbol: '/>', delay: 4, duration: 20, x: '75%', y: '70%' },
  { symbol: '()', delay: 1, duration: 16, x: '15%', y: '75%' },
  { symbol: '[]', delay: 3, duration: 17, x: '90%', y: '45%' },
  { symbol: '=>', delay: 5, duration: 19, x: '5%', y: '50%' },
];

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.17, 0.85, 0.45, 1] as const,
      },
    },
  };

  // Split name for staggered animation
  const nameParts = resumeData.personal.name.split(' ');

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-[var(--background)] to-[var(--background-secondary)]" />
      
      {/* Animated mesh gradient */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-1/2 -left-1/2 w-full h-full"
            style={{
              background: 'radial-gradient(circle at center, rgba(255,184,107,0.08) 0%, transparent 50%)',
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute -bottom-1/2 -right-1/2 w-full h-full"
            style={{
              background: 'radial-gradient(circle at center, rgba(118,200,147,0.05) 0%, transparent 50%)',
            }}
            animate={{
              x: [0, -80, 0],
              y: [0, -60, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      )}
      
      {/* Floating code symbols */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {floatingElements.map((el, i) => (
            <motion.div
              key={i}
              className="absolute text-[var(--accent)] opacity-[0.08] font-mono text-2xl sm:text-3xl font-bold select-none"
              style={{ left: el.x, top: el.y }}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: [0.05, 0.12, 0.05],
                y: [0, -30, 0],
                x: [0, 15, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: el.duration,
                delay: el.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {el.symbol}
            </motion.div>
          ))}
        </div>
      )}

      {/* Animated particles */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[var(--accent)]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
                y: [0, -100],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 5,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(var(--foreground) 1px, transparent 1px),
              linear-gradient(90deg, var(--foreground) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating accent orbs */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[var(--accent)] opacity-[0.04] blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[var(--accent-green)] opacity-[0.03] blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 40, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-[var(--accent)] opacity-[0.02] blur-3xl"
            animate={{
              x: [0, 40, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Greeting */}
          <motion.p
            variants={itemVariants}
            className="text-[var(--accent)] font-medium tracking-wide"
          >
            Hello, I&apos;m
          </motion.p>

          {/* Name with staggered reveal and floating icons */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight relative"
          >
            {/* Floating icon near M */}
            {!prefersReducedMotion && (
              <motion.span
                className="absolute -left-6 sm:-left-8 top-0 text-base sm:text-lg"
                animate={{ 
                  rotate: [-5, 5, -5],
                  y: [-2, 2, -2],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                ⚡
              </motion.span>
            )}
            
            {nameParts.map((part, index) => (
              <motion.span
                key={index}
                className={index === 0 ? 'text-[var(--foreground)]' : 'text-gradient'}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + index * 0.1,
                  ease: [0.17, 0.85, 0.45, 1],
                }}
              >
                {part}{' '}
              </motion.span>
            ))}
            
            {/* Floating icon near N */}
            {!prefersReducedMotion && (
              <motion.span
                className="absolute -right-6 sm:-right-8 top-0 text-base sm:text-lg"
                animate={{ 
                  rotate: [5, -5, 5],
                  y: [2, -2, 2],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                💻
              </motion.span>
            )}
          </motion.h1>

          {/* Title */}
          <motion.h2
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl text-[var(--foreground-muted)] font-light"
          >
            {resumeData.personal.title}
          </motion.h2>

          {/* Highlighted tagline - like reference image */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-4 pt-2"
          >
            {/* Line 1 */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-lg sm:text-xl text-[var(--foreground-muted)]">
              <span>From</span>
              <motion.span 
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-400 font-medium"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
              >
                <span>🏛️</span> research papers
              </motion.span>
              <span>to</span>
              <motion.span 
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[var(--accent-green)]/15 border border-[var(--accent-green)]/30 text-[var(--accent-green)] font-medium"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
              >
                <span>🚀</span> production apps
              </motion.span>
            </div>
            
            {/* Line 2 */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-lg sm:text-xl text-[var(--foreground-muted)]">
              <span>I build solutions that</span>
              <motion.span 
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-[var(--accent)] font-medium"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
              >
                deliver results
              </motion.span>
            </div>

          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-4"
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[var(--accent)]">700+</div>
              <div className="text-sm text-[var(--foreground-muted)]">Problems Solved</div>
            </div>
            <div className="w-px h-12 bg-[var(--border)] hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[var(--accent)]">Top 5%</div>
              <div className="text-sm text-[var(--foreground-muted)]">CodeChef</div>
            </div>
            <div className="w-px h-12 bg-[var(--border)] hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[var(--accent)]">8+</div>
              <div className="text-sm text-[var(--foreground-muted)]">AI/ML Projects</div>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
          >
            <Button size="lg" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View My Work
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="secondary" size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              <Mail className="mr-2 h-4 w-4" />
              Get In Touch
            </Button>
          </motion.div>

          {/* Download CV */}
          <motion.div variants={itemVariants} className="pt-4">
            <a
              href="/Mukund_resume.pdf"
              download
              className="inline-flex items-center gap-2 text-sm text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors"
            >
              <Download size={16} />
              Download Resume
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border-2 border-[var(--border)] flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full bg-[var(--accent)]"
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
