'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Github, Linkedin, ExternalLink, MessageCircle, Sparkles } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { resumeData } from '@/lib/resume-data';
import { Button } from '@/components/ui/Button';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: '',
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Message sent successfully! I\'ll get back to you soon.',
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or email me directly.',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClasses = (fieldName: string) => `
    w-full px-5 py-4 rounded-xl bg-[var(--background)] border-2
    ${focusedField === fieldName ? 'border-[var(--accent)] shadow-lg shadow-[var(--accent)]/10' : 'border-[var(--border)]'}
    text-[var(--foreground)] placeholder-[var(--foreground-dim)]
    focus:outline-none focus:border-[var(--accent)] focus:shadow-lg focus:shadow-[var(--accent)]/10
    transition-all duration-300
  `;

  return (
    <section id="contact" className="py-24 bg-[var(--background)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-[var(--accent)] blur-3xl" />
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
            <MessageCircle size={16} className="text-[var(--accent)]" />
            <span className="text-sm font-medium text-[var(--accent)]">Contact</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto text-lg">
            I&apos;m currently open to new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-6 flex items-center gap-2">
                <Sparkles size={18} className="text-[var(--accent)]" />
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <motion.a
                  href={`mailto:${resumeData.personal.contacts.email}`}
                  className="group relative flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-[var(--surface)] to-[var(--background-secondary)] border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-300"
                  whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.02 }}
                >
                  {/* Floating email emoji */}
                  {!prefersReducedMotion && (
                    <motion.span
                      className="absolute top-3 right-3 text-sm opacity-50"
                      animate={{ rotate: [-5, 5, -5], y: [-1, 1, -1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      ✉️
                    </motion.span>
                  )}
                  <motion.div 
                    className="p-4 rounded-xl bg-[var(--accent)]/15 border border-[var(--accent)]/30"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Mail size={22} className="text-[var(--accent)]" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-[var(--foreground-muted)] mb-1">Email</p>
                    <p className="text-[var(--foreground)] font-medium group-hover:text-[var(--accent)] transition-colors">
                      {resumeData.personal.contacts.email}
                    </p>
                  </div>
                </motion.a>

                <motion.div 
                  className="relative flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-[var(--surface)] to-[var(--background-secondary)] border border-[var(--border)]"
                  whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.02 }}
                >
                  {/* Floating location emoji */}
                  {!prefersReducedMotion && (
                    <motion.span
                      className="absolute top-3 right-3 text-sm opacity-50"
                      animate={{ rotate: [-5, 5, -5], y: [-1, 1, -1] }}
                      transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      🌍
                    </motion.span>
                  )}
                  <motion.div 
                    className="p-4 rounded-xl bg-[var(--accent-green)]/15 border border-[var(--accent-green)]/30"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <MapPin size={22} className="text-[var(--accent-green)]" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-[var(--foreground-muted)] mb-1">Location</p>
                    <p className="text-[var(--foreground)] font-medium">{resumeData.personal.location}</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                <Sparkles size={18} className="text-[var(--accent)]" />
                Connect With Me
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { href: resumeData.personal.contacts.github, icon: Github, label: 'GitHub', color: '#FFB86B' },
                  { href: resumeData.personal.contacts.linkedin, icon: Linkedin, label: 'LinkedIn', color: '#60A5FA' },
                  { href: resumeData.personal.contacts.leetcode, icon: ExternalLink, label: 'LeetCode', color: '#76C893' },
                ].map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-br from-[var(--surface)] to-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[var(--accent)] transition-all"
                    whileHover={prefersReducedMotion ? {} : { y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <link.icon size={18} />
                    <span className="font-medium">{link.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <motion.div 
              className="p-6 rounded-2xl bg-gradient-to-br from-[var(--accent-green)]/10 to-transparent border border-[var(--accent-green)]/30"
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <motion.span 
                  className="w-3 h-3 rounded-full bg-[var(--accent-green)]"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-base font-bold text-[var(--accent-green)]">
                  Available for opportunities
                </span>
              </div>
              <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                I&apos;m actively looking for internship and full-time opportunities in software engineering and AI/ML roles.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            {/* Form card */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[var(--surface)] to-[var(--background-secondary)] border border-[var(--border)] relative overflow-hidden">
              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--accent)] opacity-[0.05] rounded-bl-full" />
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-[var(--foreground)] mb-3">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={inputClasses('name')}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-[var(--foreground)] mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={inputClasses('email')}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-[var(--foreground)] mb-3">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={5}
                    className={inputClasses('message') + ' resize-none'}
                    placeholder="Your message..."
                  />
                </div>

                {/* Status Message */}
                {status.type !== 'idle' && status.type !== 'loading' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-3 p-4 rounded-xl ${
                      status.type === 'success'
                        ? 'bg-[var(--accent-green)]/10 border border-[var(--accent-green)]/30 text-[var(--accent-green)]'
                        : 'bg-red-500/10 border border-red-500/30 text-red-400'
                    }`}
                    role="alert"
                    aria-live="polite"
                  >
                    {status.type === 'success' ? (
                      <CheckCircle size={20} />
                    ) : (
                      <AlertCircle size={20} />
                    )}
                    <span className="font-medium">{status.message}</span>
                  </motion.div>
                )}

                <motion.div
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full py-4 text-base font-bold"
                    isLoading={status.type === 'loading'}
                    disabled={status.type === 'loading'}
                  >
                    <Send size={18} className="mr-2" />
                    Send Message
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
