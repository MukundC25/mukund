'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Heart, Code2, Sparkles, ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { resumeData } from '@/lib/resume-data';

const socialLinks = [
  {
    name: 'GitHub',
    href: resumeData.personal.contacts.github,
    icon: Github,
    color: '#FFB86B',
  },
  {
    name: 'LinkedIn',
    href: resumeData.personal.contacts.linkedin,
    icon: Linkedin,
    color: '#60A5FA',
  },
  {
    name: 'Email',
    href: `mailto:${resumeData.personal.contacts.email}`,
    icon: Mail,
    color: '#76C893',
  },
];

const codingProfiles = [
  { name: 'LeetCode', href: resumeData.personal.contacts.leetcode, color: '#FFB86B' },
  { name: 'CodeChef', href: resumeData.personal.contacts.codechef, color: '#76C893' },
  { name: 'Codeforces', href: resumeData.personal.contacts.codeforces, color: '#60A5FA' },
];

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export function Footer() {
  const prefersReducedMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--border)] bg-gradient-to-b from-[var(--background-secondary)] to-[var(--background)] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[var(--accent)] blur-3xl" />
        <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-[var(--accent-green)] blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-5 relative">
            {/* Floating code emoji */}
            {!prefersReducedMotion && (
              <motion.span
                className="absolute -top-2 -right-2 text-base opacity-40"
                animate={{ rotate: [-8, 8, -8], y: [-2, 2, -2] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                👨‍💻
              </motion.span>
            )}
            <motion.div 
              className="flex items-center gap-3"
              whileHover={prefersReducedMotion ? {} : { x: 4 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] flex items-center justify-center text-[var(--background)] font-bold text-lg shadow-lg shadow-[var(--accent)]/20">
                {resumeData.personal.name.charAt(0)}
              </div>
              <span className="font-bold text-lg text-[var(--foreground)]">
                {resumeData.personal.name}
              </span>
            </motion.div>
            <p className="text-sm text-[var(--foreground-muted)] leading-relaxed max-w-xs">
              {resumeData.personal.title}. Building innovative solutions with AI/ML and modern web technologies.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.name !== 'Email' ? '_blank' : undefined}
                  rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="p-3 rounded-xl bg-gradient-to-br from-[var(--surface)] to-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground-muted)] hover:border-[var(--accent)] transition-all"
                  style={{ '--hover-color': link.color } as React.CSSProperties}
                  aria-label={link.name}
                  whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <link.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider flex items-center gap-2">
              <Sparkles size={14} className="text-[var(--accent)]" />
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors group"
                    whileHover={prefersReducedMotion ? {} : { x: 4 }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--border)] group-hover:bg-[var(--accent)] transition-colors" />
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coding Profiles */}
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider flex items-center gap-2">
              <Code2 size={14} className="text-[var(--accent)]" />
              Coding Profiles
            </h3>
            <ul className="space-y-3">
              {codingProfiles.map((profile) => (
                <li key={profile.name}>
                  <motion.a
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors group"
                    whileHover={prefersReducedMotion ? {} : { x: 4 }}
                  >
                    <span 
                      className="w-1.5 h-1.5 rounded-full transition-colors"
                      style={{ backgroundColor: profile.color }}
                    />
                    {profile.name}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider flex items-center gap-2">
              <Mail size={14} className="text-[var(--accent)]" />
              Get In Touch
            </h3>
            <div className="space-y-4">
              <p className="text-sm text-[var(--foreground-muted)]">
                {resumeData.personal.contacts.email}
              </p>
              <p className="text-sm text-[var(--foreground-muted)]">
                {resumeData.personal.location}
              </p>
              
              {/* Availability badge */}
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-green)]/10 border border-[var(--accent-green)]/30"
                animate={!prefersReducedMotion ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] animate-pulse" />
                <span className="text-xs font-medium text-[var(--accent-green)]">
                  Available for work
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[var(--border)]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <motion.p 
              className="text-sm text-[var(--foreground-dim)] flex items-center gap-2"
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
            >
              © {currentYear} {resumeData.personal.name}. Built with
              <motion.span
                animate={!prefersReducedMotion ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart size={14} className="text-[var(--accent)] fill-[var(--accent)]" />
              </motion.span>
              by Mukund
            </motion.p>
            
            <motion.a
              href="#hero"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-br from-[var(--surface)] to-[var(--background-secondary)] border border-[var(--border)] text-sm text-[var(--foreground-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
              whileHover={prefersReducedMotion ? {} : { y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to top
              <motion.span
                animate={!prefersReducedMotion ? { y: [0, -3, 0] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ↑
              </motion.span>
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
