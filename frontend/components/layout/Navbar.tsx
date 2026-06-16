'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X, Github, Linkedin, Home, Briefcase, User, Award, Sun, Moon } from 'lucide-react';
import { resumeData } from '@/lib/resume-data';
import { useTheme } from '@/components/ui/ThemeProvider';

const navLinks = [
  { href: '#hero', label: 'Home', icon: Home },
  { href: '#work', label: 'Work', icon: Briefcase },
  { href: '#about', label: 'About', icon: User },
  { href: '#experience', label: 'Experience', icon: Award },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  return (
    <>
      {/* Floating pill navbar — glass morphism */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        style={{ paddingTop: isScrolled ? '12px' : '20px' }}
      >
        <motion.nav
          animate={{
            paddingLeft: isScrolled ? '16px' : '24px',
            paddingRight: isScrolled ? '16px' : '24px',
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="pointer-events-auto hidden md:flex items-center gap-1 py-2.5 rounded-full border border-white/20 dark:border-white/10 shadow-xl backdrop-blur-2xl"
          style={{
            background: theme === 'dark'
              ? 'rgba(20, 20, 20, 0.55)'
              : 'rgba(255, 255, 255, 0.45)',
            boxShadow: theme === 'dark'
              ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05), inset 0 -1px 0 rgba(0, 0, 0, 0.1)'
              : '0 8px 32px rgba(0, 0, 0, 0.06), inset 0 1px 1px rgba(255, 255, 255, 0.8), inset 0 -1px 1px rgba(0, 0, 0, 0.03)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
            backdropFilter: 'blur(24px) saturate(1.8)',
          }}
        >
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="custom-tooltip p-2.5 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-foreground/5"
                data-tooltip={link.label}
              >
                <Icon size={18} strokeWidth={1.8} />
              </Link>
            );
          })}

          {/* Divider */}
          <div className="w-px h-5 bg-border mx-1" />

          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            className="custom-tooltip p-2.5 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-foreground/5"
            data-tooltip={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={17} strokeWidth={1.8} /> : <Moon size={17} strokeWidth={1.8} />}
          </button>

          {/* Divider */}
          <div className="w-px h-5 bg-border mx-1" />

          {/* Socials */}
          <a
            href={resumeData.personal.contacts.github}
            target="_blank"
            rel="noopener noreferrer"
            className="custom-tooltip p-2.5 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-foreground/5"
            data-tooltip="GitHub"
          >
            <Github size={17} strokeWidth={1.8} />
          </a>
          <a
            href={resumeData.personal.contacts.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="custom-tooltip p-2.5 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-foreground/5"
            data-tooltip="LinkedIn"
          >
            <Linkedin size={17} strokeWidth={1.8} />
          </a>
        </motion.nav>

        {/* Mobile nav */}
        <nav
          className="pointer-events-auto md:hidden flex items-center justify-between w-full px-5 py-2.5 mx-4 mt-1 rounded-full border border-white/20 dark:border-white/10 shadow-xl"
          style={{
            background: theme === 'dark'
              ? 'rgba(20, 20, 20, 0.55)'
              : 'rgba(255, 255, 255, 0.45)',
            boxShadow: theme === 'dark'
              ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
              : '0 8px 32px rgba(0, 0, 0, 0.06), inset 0 1px 1px rgba(255, 255, 255, 0.8)',
            maxWidth: 'calc(100% - 2rem)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
            backdropFilter: 'blur(24px) saturate(1.8)',
          }}
        >
          <Link href="/" className="font-serif text-xl text-foreground">
            M
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 left-4 right-4 z-50 bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-xl md:hidden"
            >
              <div className="flex flex-col p-4 gap-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-xl transition-colors"
                    >
                      <Icon size={18} strokeWidth={1.8} />
                      <span className="text-sm font-medium">{link.label}</span>
                    </Link>
                  );
                })}
                <div className="border-t border-border mt-3 pt-3 flex items-center gap-4 px-4">
                  <a
                    href={resumeData.personal.contacts.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href={resumeData.personal.contacts.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Linkedin size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
