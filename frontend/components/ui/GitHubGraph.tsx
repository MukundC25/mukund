'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ContributionDay {
  level: number;
}

async function fetchContributions(username: string): Promise<ContributionDay[]> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
    );
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    return data.contributions.map((c: { level: number }) => ({ level: c.level }));
  } catch {
    return [];
  }
}

const lightColors = ['#e8e8e8', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
const darkColors = ['#1e2328', '#0e4429', '#006d32', '#26a641', '#39d353'];

export function GitHubGraph({ username }: { username: string }) {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    fetchContributions(username).then(setContributions);
  }, [username]);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Arrange into 52 weeks of 7 days
  const days = contributions.slice(-364);
  const weeks: ContributionDay[][] = [];
  for (let w = 0; w < 52; w++) {
    const week: ContributionDay[] = [];
    for (let d = 0; d < 7; d++) {
      const idx = w * 7 + d;
      week.push(days[idx] || { level: 0 });
    }
    weeks.push(week);
  }

  const colors = isDark ? darkColors : lightColors;

  // Use SVG — inherently responsive, scales to any width
  const cellSize = 10;
  const gap = 3;
  const weekWidth = cellSize + gap;
  const totalWidth = 52 * weekWidth - gap;
  const totalHeight = 7 * weekWidth - gap;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <svg
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        className="w-full h-auto"
        role="img"
        aria-label="GitHub contribution graph"
      >
        {weeks.map((week, w) =>
          week.map((day, d) => (
            <rect
              key={`${w}-${d}`}
              x={w * weekWidth}
              y={d * weekWidth}
              width={cellSize}
              height={cellSize}
              rx={2}
              ry={2}
              fill={colors[day.level]}
            />
          ))
        )}
      </svg>
    </motion.div>
  );
}
