/**
 * Central motion configuration for consistent animations
 * Respects prefers-reduced-motion
 */

export const motionConfig = {
  // Easing curves
  easing: {
    default: [0.17, 0.85, 0.45, 1],
    smooth: [0.25, 0.1, 0.25, 1],
    spring: { type: "spring", stiffness: 220, damping: 20 }
  },
  
  // Durations (in seconds)
  duration: {
    fast: 0.14,
    base: 0.45,
    slow: 0.7
  },
  
  // Stagger delays
  stagger: {
    children: 0.08,
    fast: 0.05,
    slow: 0.12
  }
};

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: motionConfig.duration.base,
      ease: motionConfig.easing.default
    }
  }
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: motionConfig.duration.base,
      ease: motionConfig.easing.default
    }
  }
};

export const scaleUpVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: motionConfig.duration.base,
      ease: motionConfig.easing.default
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: motionConfig.stagger.children,
      delayChildren: 0.1
    }
  }
};
