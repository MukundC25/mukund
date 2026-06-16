'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { resumeData } from '@/lib/resume-data';
import { useRef } from 'react';

// Format date strings like "2025-06" to "2025"
function formatYear(dateStr: string): string {
  if (!dateStr || dateStr === 'Present') return 'Present';
  const parts = dateStr.split('-');
  return parts[0];
}

export function Experience() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const yLeft = useTransform(scrollYProgress, [0, 1], ['4%', '-3%']);
  const yRight = useTransform(scrollYProgress, [0, 1], ['6%', '-4%']);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-20 border-t border-border"
    >
      <div className="max-w-3xl mx-auto px-6">
        {/* Two-column layout matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20">
          {/* Left column - Experience */}
          <motion.div style={prefersReducedMotion ? {} : { y: yLeft }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="text-2xl text-foreground mb-10"
            >
              Experience
            </motion.h2>

            <div className="flex flex-col gap-8">
              {resumeData.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className="group"
                >
                  <h3 className="font-sans font-medium text-foreground text-[0.95rem] mb-0.5">
                    {exp.company}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {exp.role}
                  </p>
                  <p className="text-sm text-muted-foreground/60 mt-0.5">
                    {formatYear(exp.start)} - {formatYear(exp.end)}
                  </p>
                </motion.div>
              ))}

              {/* Education */}
              {resumeData.education.map((edu, index) => (
                <motion.div
                  key={`edu-${index}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{
                    duration: 0.5,
                    delay: (resumeData.experience.length + index) * 0.08,
                  }}
                  className="group"
                >
                  <h3 className="font-sans font-medium text-foreground text-[0.95rem] mb-0.5">
                    {edu.institution}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {edu.degree}
                  </p>
                  <p className="text-sm text-muted-foreground/60 mt-0.5">
                    {edu.start} - {edu.end}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column - Skills */}
          <motion.div style={prefersReducedMotion ? {} : { y: yRight }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl text-foreground mb-10"
            >
              Skills
            </motion.h2>

            <div className="flex flex-col gap-1.5">
              {[
                'Python / C++ / TypeScript (ES6+)',
                'React / Next.js / React Native',
                'Django / FastAPI / Node.js / Express',
                'LangChain / LangGraph / Agentic AI',
                'TensorFlow / PyTorch / Scikit-learn',
                'FAISS / Neo4j / GraphRAG / RAG systems',
                'PostgreSQL / MongoDB / Redis / SQLite',
                'Docker / Git CI/CD / GitHub Actions',
                'REST APIs / WebSockets / OAuth / JWT',
                'Responsive design & accessibility',
                'Competitive Programming (700+ solved)',
              ].map((skill, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className="text-sm text-muted-foreground py-1.5 leading-relaxed"
                >
                  {skill}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
