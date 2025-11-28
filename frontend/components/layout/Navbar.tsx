'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { resumeData } from '@/lib/resume-data';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const firstName = resumeData.personal.name.split(' ')[0];

  return (
    <>
      <motion.header
        initial={prefersReducedMotion ? {} : { y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.17, 0.85, 0.45, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass border-b border-[var(--border)]'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2">
              <motion.div
                className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center text-[var(--background)] font-bold text-sm"
                whileHover={prefersReducedMotion ? {} : { rotate: 5, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {firstName.charAt(0)}
              </motion.div>
              <span className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                {firstName}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors group"
                >
                  {link.label}
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
              ))}
            </div>

            {/* Social Links & CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={resumeData.personal.contacts.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={resumeData.personal.contacts.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <Link
                href="#contact"
                className="ml-2 px-4 py-2 text-sm font-medium bg-[var(--accent)] text-[var(--background)] rounded-lg hover:bg-[var(--accent-hover)] transition-colors"
              >
                Hire Me
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
              animate={prefersReducedMotion ? { opacity: 1 } : { x: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
              transition={{ duration: 0.3, ease: [0.17, 0.85, 0.45, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[var(--background-secondary)] border-l border-[var(--border)] md:hidden"
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex justify-end mb-8">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>

                <nav className="flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-3 text-lg text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] rounded-lg transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-[var(--border)]">
                  <div className="flex items-center gap-4 mb-4">
                    <a
                      href={resumeData.personal.contacts.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                      aria-label="GitHub"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href={resumeData.personal.contacts.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={20} />
                    </a>
                    <a
                      href={`mailto:${resumeData.personal.contacts.email}`}
                      className="p-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
                      aria-label="Email"
                    >
                      <Mail size={20} />
                    </a>
                  </div>
                  <Link
                    href="#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 text-center font-medium bg-[var(--accent)] text-[var(--background)] rounded-lg hover:bg-[var(--accent-hover)] transition-colors"
                  >
                    Hire Me
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
