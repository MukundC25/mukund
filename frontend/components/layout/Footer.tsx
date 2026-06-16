'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { resumeData } from '@/lib/resume-data';
import { useRef } from 'react';
import { GitHubGraph } from '@/components/ui/GitHubGraph';

export function Footer() {
  const prefersReducedMotion = useReducedMotion();
  const footerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });

  const yName = useTransform(scrollYProgress, [0, 1], ['40%', '0%']);
  const opacityName = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scaleName = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  return (
    <footer ref={footerRef} className="border-t border-border mt-8 overflow-hidden">
      {/* GitHub Contribution Graph — no labels, just clean squares */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <GitHubGraph username="MukundC25" />
        </motion.div>
      </div>

      {/* Email — bold */}
      <div className="text-center pb-12">
        <motion.a
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          href={`mailto:${resumeData.personal.contacts.email}`}
          className="text-sm font-semibold text-foreground hover:text-muted-foreground transition-colors"
        >
          {resumeData.personal.contacts.email}
        </motion.a>
      </div>

      {/* Large parallax gradient name — Mukund Chavan */}
      <div className="relative h-28 sm:h-40 md:h-56 overflow-hidden">
        <motion.div
          style={prefersReducedMotion ? {} : { y: yName, opacity: opacityName, scale: scaleName }}
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none px-4"
        >
          <h2
            className="text-[2.5rem] sm:text-[4.5rem] md:text-[7rem] lg:text-[9rem] font-serif font-bold tracking-tight leading-none text-center"
            style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #555555 30%, #999999 55%, #cccccc 75%, #e8e8e8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Mukund Chavan
          </h2>
        </motion.div>
      </div>
    </footer>
  );
}
