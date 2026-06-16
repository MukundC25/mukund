'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { resumeData } from '@/lib/resume-data';
import { useRef } from 'react';
import Image from 'next/image';

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.97]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[60vh] sm:min-h-[65vh] flex items-center pt-24 sm:pt-32 pb-12"
    >
      <div className="max-w-3xl mx-auto px-6 w-full">
        <motion.div
          style={prefersReducedMotion ? {} : { y: yText, opacity, scale }}
          className="flex flex-col gap-5"
        >
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-border shadow-md"
          >
            <Image
              src="/avatar.jpg"
              alt="Mukund Chavan"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h1 className="text-[2rem] sm:text-[2.5rem] tracking-tight text-foreground leading-tight">
              Hi, I&apos;m Mukund
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-[1.05rem] text-muted-foreground max-w-lg leading-relaxed"
          >
            Glad you found me 😉. So, I'm an AI Engineer, a Software developer, GSoC &apos;26 contributor, & Open Source developer, basically building intelligent AI systems, multi-agent frameworks, & cool web designs. That's my playground.
          </motion.p>

          {/* Email link — bold */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <a
              href={`mailto:${resumeData.personal.contacts.email}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-muted-foreground transition-colors group"
            >
              <Mail size={14} className="group-hover:scale-110 transition-transform" />
              <span className="border-b border-foreground/20 group-hover:border-foreground/50 transition-colors">
                {resumeData.personal.contacts.email}
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
