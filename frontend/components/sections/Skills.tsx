'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Code2, Layers, Wrench, Brain, Database, BookOpen, Trophy, Target, Award, Star, TrendingUp, Zap } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { resumeData } from '@/lib/resume-data';
import Image from 'next/image';

// Tech logos mapping - using devicon CDN
const techLogos: Record<string, string> = {
  'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'HTML/CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'React.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'React Native': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'FastAPI': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
  'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  'SQLite': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg',
  'TensorFlow': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
  'PyTorch': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
  'Pandas': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
  'NumPy': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
  'Scikit-learn': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg',
  'Vite': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
};

const skillCategories = [
  {
    title: 'Languages',
    icon: Code2,
    skills: resumeData.skills.languages,
    color: '#FFB86B',
    gradient: 'from-amber-500/20 to-orange-500/10',
    floatingEmoji: '⌨️',
  },
  {
    title: 'Frameworks',
    icon: Layers,
    skills: resumeData.skills.frameworks,
    color: '#60A5FA',
    gradient: 'from-blue-500/20 to-cyan-500/10',
    floatingEmoji: '🛠️',
  },
  {
    title: 'AI/ML',
    icon: Brain,
    skills: resumeData.skills.aiml,
    color: '#76C893',
    gradient: 'from-green-500/20 to-emerald-500/10',
    floatingEmoji: '🤖',
  },
  {
    title: 'Tools',
    icon: Wrench,
    skills: resumeData.skills.tools,
    color: '#F472B6',
    gradient: 'from-pink-500/20 to-rose-500/10',
    floatingEmoji: '🔧',
  },
  {
    title: 'Databases',
    icon: Database,
    skills: resumeData.skills.databases,
    color: '#A78BFA',
    gradient: 'from-purple-500/20 to-violet-500/10',
    floatingEmoji: '🗄️',
  },
  {
    title: 'Coursework',
    icon: BookOpen,
    skills: resumeData.skills.other,
    color: '#FBBF24',
    gradient: 'from-yellow-500/20 to-amber-500/10',
    floatingEmoji: '📖',
  },
];

function SkillChip({ skill, index, categoryIndex }: { skill: string; index: number; categoryIndex: number }) {
  const prefersReducedMotion = useReducedMotion();
  const logo = techLogos[skill];
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.5, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.4, 
        delay: categoryIndex * 0.1 + index * 0.05,
        type: 'spring',
        stiffness: 200
      }}
      whileHover={prefersReducedMotion ? {} : { 
        scale: 1.1, 
        y: -5,
        boxShadow: '0 10px 30px rgba(255,184,107,0.2)'
      }}
      className="group relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-br from-[var(--surface)] to-[var(--background-secondary)] border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-300 cursor-default"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-[var(--accent)] opacity-0 group-hover:opacity-[0.05] transition-opacity" />
      
      {logo && !imageError ? (
        <div className="relative w-5 h-5 flex-shrink-0">
          <Image
            src={logo}
            alt={skill}
            width={20}
            height={20}
            className="object-contain"
            onError={() => setImageError(true)}
            unoptimized
          />
        </div>
      ) : (
        <div className="w-5 h-5 rounded bg-[var(--accent-muted)] flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-[var(--accent)]">{skill.charAt(0)}</span>
        </div>
      )}
      <span className="text-sm font-medium text-[var(--foreground-muted)] group-hover:text-[var(--foreground)] transition-colors">
        {skill}
      </span>
    </motion.div>
  );
}

function SkillCategory({ category, index }: { category: typeof skillCategories[0]; index: number }) {
  const prefersReducedMotion = useReducedMotion();
  const Icon = category.icon;

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-6 rounded-2xl bg-gradient-to-br from-[var(--surface)] to-[var(--background-secondary)] border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-500 overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />
      
      {/* Floating category emoji */}
      {!prefersReducedMotion && (
        <motion.span
          className="absolute top-4 right-4 text-base opacity-50"
          animate={{ 
            rotate: [-6, 6, -6],
            y: [-1, 1, -1],
          }}
          transition={{ duration: 2 + index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        >
          {category.floatingEmoji}
        </motion.span>
      )}
      
      {/* Floating particles on hover */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{ 
                backgroundColor: category.color,
                left: `${20 + i * 15}%`,
                bottom: '10%'
              }}
              animate={{
                y: [-10, -60],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <motion.div 
            className="p-3 rounded-xl border"
            style={{ 
              backgroundColor: `${category.color}15`,
              borderColor: `${category.color}30`
            }}
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Icon size={22} style={{ color: category.color }} />
          </motion.div>
          <div>
            <h3 className="font-bold text-lg text-[var(--foreground)]">{category.title}</h3>
            <p className="text-xs text-[var(--foreground-dim)]">{category.skills.length} skills</p>
          </div>
        </div>
        
        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill, i) => (
            <SkillChip key={skill} skill={skill} index={i} categoryIndex={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Achievement stats for visual display
const achievementStats = [
  { label: 'Problems Solved', value: '700+', icon: Target, color: '#FFB86B' },
  { label: 'CodeChef Rating', value: '1682', icon: Star, color: '#76C893' },
  { label: 'LeetCode Rating', value: '1668', icon: TrendingUp, color: '#60A5FA' },
  { label: 'Top Percentile', value: '4.73%', icon: Trophy, color: '#F472B6' },
];

function AchievementCard({ achievement, index }: { achievement: typeof resumeData.achievements[0]; index: number }) {
  const prefersReducedMotion = useReducedMotion();
  const isCompetitive = achievement.category === 'Competitive Programming';

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15, type: 'spring' }}
      className="group relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[var(--surface)] to-[var(--background-secondary)] border border-[var(--border)] overflow-hidden"
    >
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--accent)] opacity-[0.03] rounded-bl-full" />
      
      {/* Floating achievement emoji */}
      {!prefersReducedMotion && (
        <motion.span
          className="absolute bottom-4 right-4 text-lg opacity-40"
          animate={{ 
            rotate: [-8, 8, -8],
            y: [-2, 2, -2],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {isCompetitive ? '🏆' : '🎖️'}
        </motion.span>
      )}
      
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,184,107,0.1), transparent)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['200% 0', '-200% 0'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <motion.div 
            className="p-3 rounded-xl bg-[var(--accent-muted)] border border-[var(--accent-glow)]"
            whileHover={{ rotate: 10, scale: 1.1 }}
            animate={!prefersReducedMotion ? { 
              boxShadow: ['0 0 0 0 rgba(255,184,107,0)', '0 0 0 8px rgba(255,184,107,0.1)', '0 0 0 0 rgba(255,184,107,0)']
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {isCompetitive ? <Trophy size={24} className="text-[var(--accent)]" /> : <Award size={24} className="text-[var(--accent)]" />}
          </motion.div>
          <h3 className="text-xl font-bold text-[var(--foreground)]">
            {achievement.category}
          </h3>
        </div>

        {/* Stats grid for competitive programming */}
        {isCompetitive && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {achievementStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-center"
              >
                <stat.icon size={18} className="mx-auto mb-1" style={{ color: stat.color }} />
                <div className="text-lg font-bold text-[var(--foreground)]">{stat.value}</div>
                <div className="text-xs text-[var(--foreground-dim)]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Achievement items */}
        <ul className="space-y-3">
          {achievement.items.slice(0, isCompetitive ? 4 : undefined).map((item, i) => (
            <motion.li
              key={i}
              initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 + i * 0.08 }}
              className="flex items-start gap-3 group/item"
            >
              <motion.div
                className="mt-1.5 flex-shrink-0"
                whileHover={{ scale: 1.3, rotate: 180 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Zap size={14} className="text-[var(--accent)]" />
              </motion.div>
              <span className="text-[var(--foreground-muted)] group-hover/item:text-[var(--foreground)] transition-colors">
                {item}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="skills" className="py-24 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <Zap size={16} className="text-[var(--accent)]" />
            <span className="text-sm font-medium text-[var(--accent)]">Tech Stack</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-4">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-[var(--foreground-muted)] max-w-2xl mx-auto text-lg">
            Technologies and tools I work with to build modern, scalable applications.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {skillCategories.map((category, index) => (
            <SkillCategory key={category.title} category={category} index={index} />
          ))}
        </div>

        {/* Achievements Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={prefersReducedMotion ? {} : { scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-muted)] border border-[var(--accent-glow)] mb-4"
          >
            <Trophy size={16} className="text-[var(--accent)]" />
            <span className="text-sm font-medium text-[var(--accent)]">Recognition</span>
          </motion.div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
            Achievements & <span className="text-gradient">Awards</span>
          </h3>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {resumeData.achievements.map((achievement, index) => (
            <AchievementCard key={achievement.category} achievement={achievement} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
