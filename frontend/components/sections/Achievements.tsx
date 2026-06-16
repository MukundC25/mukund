'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { resumeData } from '@/lib/resume-data';
import { useState } from 'react';
import Image from 'next/image';

const profiles = [
  {
    name: 'CodeChef',
    url: resumeData.personal.contacts.codechef || 'https://www.codechef.com/users/mukundc',
    type: 'svg',
    src: '/codechef.svg',
    color: '#5B4638',
  },
  {
    name: 'LeetCode',
    url: resumeData.personal.contacts.leetcode || 'https://leetcode.com/mukund2503',
    type: 'devicon',
    icon: 'devicon-leetcode-plain',
    color: '#FFA116',
  },
  {
    name: 'Codeforces',
    url: resumeData.personal.contacts.codeforces || 'https://codeforces.com/profile/mukundc',
    type: 'svg',
    src: '/codeforces.svg',
    color: '#1F8ACB',
  },
  {
    name: 'GitHub',
    url: resumeData.personal.contacts.github,
    type: 'devicon',
    icon: 'devicon-github-original',
    color: '#181717',
  },
];

export function Achievements() {
  const [showProfiles, setShowProfiles] = useState(false);

  const allAchievements = resumeData.achievements.flatMap((group) =>
    group.items.map((item) => ({
      category: group.category,
      text: item,
    }))
  );

  const featured = allAchievements.slice(0, 4);

  return (
    <section className="py-20 border-t border-border">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-10"
        >
          <h2 className="text-2xl text-foreground">Achievements</h2>

          {/* View profiles — hover to reveal logos */}
          <div
            className="relative"
            onMouseEnter={() => setShowProfiles(true)}
            onMouseLeave={() => setShowProfiles(false)}
            onClick={() => setShowProfiles(!showProfiles)}
          >
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer font-medium">
              View profiles
            </button>

            <AnimatePresence>
              {showProfiles && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-3 flex items-center gap-3 p-3.5 bg-card border border-border rounded-2xl shadow-xl z-50"
                >
                  {profiles.map((profile) => (
                    <a
                      key={profile.name}
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="custom-tooltip group flex items-center justify-center w-11 h-11 rounded-full bg-muted hover:bg-muted/80 border border-border transition-all hover:scale-115 hover:shadow-md"
                      data-tooltip={profile.name}
                    >
                      {profile.type === 'svg' ? (
                        <Image
                          src={profile.src!}
                          alt={profile.name}
                          width={22}
                          height={22}
                          className="transition-all dark:invert group-hover:scale-110"
                          style={{ filter: 'brightness(0)' }}
                          onMouseEnter={(e) => { (e.target as HTMLElement).style.filter = 'none'; }}
                          onMouseLeave={(e) => { (e.target as HTMLElement).style.filter = 'brightness(0)'; }}
                        />
                      ) : (
                        <i
                          className={`${profile.icon} text-xl transition-colors text-foreground`}
                          onMouseEnter={(e) => { (e.target as HTMLElement).style.color = profile.color; }}
                          onMouseLeave={(e) => { (e.target as HTMLElement).style.color = ''; }}
                        />
                      )}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Achievement cards */}
        <div className="flex flex-col gap-1">
          {featured.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group px-4 sm:px-6 py-4 sm:py-5 rounded-xl hover:bg-muted/60 transition-colors cursor-default border border-transparent hover:border-border"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-foreground font-medium text-[0.95rem] mb-1 leading-snug">
                    {achievement.text}
                  </p>
                  <p className="text-xs text-muted-foreground/70 uppercase tracking-wide font-medium">
                    {achievement.category}
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  className="text-muted-foreground/40 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all mt-1 flex-shrink-0"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
