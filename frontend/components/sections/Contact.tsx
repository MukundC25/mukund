'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { resumeData } from '@/lib/resume-data';

export function Contact() {
  return (
    <section id="contact" className="py-20 border-t border-border">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl text-foreground mb-3">Get in touch</h2>
          <p className="text-muted-foreground">
            Have a project in mind or just want to say hi? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-8"
        >
          {/* Email — bold and prominent */}
          <div>
            <p className="text-xs text-muted-foreground/70 uppercase tracking-wide mb-2">Email</p>
            <a
              href={`mailto:${resumeData.personal.contacts.email}`}
              className="text-lg font-semibold text-foreground hover:text-muted-foreground transition-colors inline-flex items-center gap-2 group"
            >
              {resumeData.personal.contacts.email}
              <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
            {/* Location */}
            <div>
              <p className="text-xs text-muted-foreground/70 uppercase tracking-wide mb-2">Location</p>
              <p className="text-foreground font-medium">
                {resumeData.personal.location}
              </p>
            </div>

            {/* Status */}
            <div>
              <p className="text-xs text-muted-foreground/70 uppercase tracking-wide mb-2">Status</p>
              <div className="inline-flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <span className="text-foreground font-medium text-sm">
                  Open to opportunities
                </span>
              </div>
            </div>

            {/* Socials */}
            <div>
              <p className="text-xs text-muted-foreground/70 uppercase tracking-wide mb-2">Connect</p>
              <div className="flex items-center gap-4">
                <a
                  href={resumeData.personal.contacts.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
                <a
                  href={resumeData.personal.contacts.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href={resumeData.personal.contacts.leetcode || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  LeetCode
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
