'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useRef } from 'react';
import Image from 'next/image';

// Floating emoji component that moves on hover
function FloatingEmoji({ emoji, position }: { emoji: string; position: 'top-right' | 'bottom-right' | 'top-left' }) {
  const posClasses = {
    'top-right': '-top-3 -right-3',
    'bottom-right': '-bottom-3 -right-3',
    'top-left': '-top-3 -left-3',
  };

  return (
    <motion.div
      className={`absolute ${posClasses[position]} w-9 h-9 bg-card rounded-full shadow-lg flex items-center justify-center text-lg border border-border z-10`}
      whileHover={{ x: [0, -4, 4, -2, 2, 0], transition: { duration: 0.5 } }}
      animate={{ y: [0, -2, 0], transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' } }}
    >
      {emoji}
    </motion.div>
  );
}

export function About() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ['8%', '-4%']);
  const yImages = useTransform(scrollYProgress, [0, 1], ['4%', '-8%']);
  const rotateLeft = useTransform(scrollYProgress, [0, 1], [-3, 1]);
  const rotateRight = useTransform(scrollYProgress, [0, 1], [3, -1]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 border-t border-border"
    >
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl text-foreground">About</h2>
        </motion.div>

        {/* About text with parallax */}
        <motion.div
          style={prefersReducedMotion ? {} : { y: yText }}
          className="space-y-5 mb-16"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground leading-relaxed"
          >
            I started coding out of curiosity — building small projects and solving coding problems — and over time grew into developing complete products that balance solid architecture and great user experience.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground leading-relaxed"
          >
            My stack includes Python, React, Next.js, Django, and FastAPI, but I love exploring new technologies — especially in AI/ML and agentic systems that push what&apos;s possible.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-muted-foreground leading-relaxed"
          >
            Outside of coding, I enjoy traveling to new places, exploring beaches, discovering scenic mountain trails, and spending quality time perfecting my workspace setup for those deep coding sessions.
          </motion.p>
        </motion.div>

        {/* Photo grid — floating rotated images with emoji badges */}
        <motion.div
          style={prefersReducedMotion ? {} : { y: yImages }}
          className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8 px-2"
        >
          {/* Image 1 — travel/setup image with slight left rotation */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -5 }}
            whileInView={{ opacity: 1, y: 0, rotate: -3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={prefersReducedMotion ? {} : { rotate: rotateLeft }}
            whileHover={{ rotate: 0, scale: 1.04, transition: { duration: 0.25 } }}
            className="relative w-[28%] sm:w-[30%] md:w-[32%] max-w-[200px]"
          >
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/about-1.jpeg"
                alt="Mukund traveling"
                width={400}
                height={500}
                className="w-full h-auto"
                sizes="(max-width: 640px) 28vw, (max-width: 768px) 30vw, 200px"
              />
            </div>
            <FloatingEmoji emoji="⛰️" position="top-right" />
          </motion.div>

          {/* Image 2 — center, straight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.04, y: -4, transition: { duration: 0.25 } }}
            className="relative w-[32%] sm:w-[34%] md:w-[36%] max-w-[220px]"
          >
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/about-2.jpeg"
                alt="Mukund with coding setup"
                width={400}
                height={500}
                className="w-full h-auto"
                sizes="(max-width: 640px) 32vw, (max-width: 768px) 34vw, 220px"
              />
            </div>
            <FloatingEmoji emoji="🏖️" position="bottom-right" />
          </motion.div>

          {/* Image 3 — slight right rotation */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={prefersReducedMotion ? {} : { rotate: rotateRight }}
            whileHover={{ rotate: 0, scale: 1.04, transition: { duration: 0.25 } }}
            className="relative w-[28%] sm:w-[30%] md:w-[32%] max-w-[200px]"
          >
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/about-3.jpeg"
                alt="Mukund coding"
                width={400}
                height={500}
                className="w-full h-auto"
                sizes="(max-width: 640px) 28vw, (max-width: 768px) 30vw, 200px"
              />
            </div>
            <FloatingEmoji emoji="👨‍💻" position="top-right" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
