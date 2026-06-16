'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useRef } from 'react';

// Full stack — three rows of rounded-square icons
const techItems: { name: string; icon: string; colorIcon: string }[] = [
  { name: 'Python', icon: 'devicon-python-plain', colorIcon: 'devicon-python-plain colored' },
  { name: 'C++', icon: 'devicon-cplusplus-plain', colorIcon: 'devicon-cplusplus-plain colored' },
  { name: 'TypeScript', icon: 'devicon-typescript-plain', colorIcon: 'devicon-typescript-plain colored' },
  { name: 'JavaScript', icon: 'devicon-javascript-plain', colorIcon: 'devicon-javascript-plain colored' },
  { name: 'React', icon: 'devicon-react-original', colorIcon: 'devicon-react-original colored' },
  { name: 'Next.js', icon: 'devicon-nextjs-plain', colorIcon: 'devicon-nextjs-plain colored' },
  { name: 'Node.js', icon: 'devicon-nodejs-plain', colorIcon: 'devicon-nodejs-plain colored' },
  { name: 'Django', icon: 'devicon-django-plain', colorIcon: 'devicon-django-plain colored' },
  { name: 'FastAPI', icon: 'devicon-fastapi-plain', colorIcon: 'devicon-fastapi-plain colored' },
  { name: 'TensorFlow', icon: 'devicon-tensorflow-original', colorIcon: 'devicon-tensorflow-original colored' },
  { name: 'PyTorch', icon: 'devicon-pytorch-plain', colorIcon: 'devicon-pytorch-plain colored' },
  { name: 'Docker', icon: 'devicon-docker-plain', colorIcon: 'devicon-docker-plain colored' },
  { name: 'PostgreSQL', icon: 'devicon-postgresql-plain', colorIcon: 'devicon-postgresql-plain colored' },
  { name: 'MongoDB', icon: 'devicon-mongodb-plain', colorIcon: 'devicon-mongodb-plain colored' },
  { name: 'Redis', icon: 'devicon-redis-plain', colorIcon: 'devicon-redis-plain colored' },
  { name: 'Git', icon: 'devicon-git-plain', colorIcon: 'devicon-git-plain colored' },
  { name: 'NumPy', icon: 'devicon-numpy-plain', colorIcon: 'devicon-numpy-plain colored' },
  { name: 'Pandas', icon: 'devicon-pandas-plain', colorIcon: 'devicon-pandas-plain colored' },
  { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-original', colorIcon: 'devicon-tailwindcss-original colored' },
  { name: 'MySQL', icon: 'devicon-mysql-plain', colorIcon: 'devicon-mysql-plain colored' },
  { name: 'Scikit-learn', icon: 'devicon-scikitlearn-plain', colorIcon: 'devicon-scikitlearn-plain colored' },
  { name: 'Jupyter', icon: 'devicon-jupyter-plain', colorIcon: 'devicon-jupyter-plain colored' },
  { name: 'Keras', icon: 'devicon-keras-plain', colorIcon: 'devicon-keras-plain colored' },
  { name: 'OpenCV', icon: 'devicon-opencv-plain', colorIcon: 'devicon-opencv-plain colored' },
  { name: 'Matplotlib', icon: 'devicon-matplotlib-plain', colorIcon: 'devicon-matplotlib-plain colored' },
  { name: 'Anaconda', icon: 'devicon-anaconda-original', colorIcon: 'devicon-anaconda-original colored' },
  { name: 'Google Cloud', icon: 'devicon-googlecloud-plain', colorIcon: 'devicon-googlecloud-plain colored' },
  { name: 'Linux', icon: 'devicon-linux-plain', colorIcon: 'devicon-linux-plain colored' },
  { name: 'VS Code', icon: 'devicon-vscode-plain', colorIcon: 'devicon-vscode-plain colored' },
  { name: 'Figma', icon: 'devicon-figma-plain', colorIcon: 'devicon-figma-plain colored' },
];

export function TechStack() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const xParallax = useTransform(scrollYProgress, [0, 1], ['-1%', '1%']);

  return (
    <section ref={sectionRef} className="py-20 border-t border-border">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-2xl text-foreground">My stack</h2>
        </motion.div>

        <motion.div
          style={prefersReducedMotion ? {} : { x: xParallax }}
          className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3"
        >
          {techItems.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: index * 0.025,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={{ scale: 1.1, y: -3 }}
              className="custom-tooltip group flex items-center justify-center aspect-square rounded-2xl bg-muted dark:bg-muted border border-transparent hover:border-border transition-all cursor-default hover:shadow-md"
              data-tooltip={tech.name}
            >
              {/* Dark/gray icon by default, colored on hover */}
              <i className={`${tech.icon} text-[1.6rem] text-neutral-500 dark:text-neutral-400 group-hover:hidden`} />
              <i className={`${tech.colorIcon} text-[1.6rem] hidden group-hover:block`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
