import resumeJson from '../data/resume.json';

export interface Contact {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  website?: string;
  codechef?: string;
  leetcode?: string;
  codeforces?: string;
}

export interface Personal {
  name: string;
  title: string;
  location: string;
  contacts: Contact;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
  tech: string[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  links: {
    live: string;
    repo: string;
  };
  date: string;
  highlights: string[];
}

export interface Education {
  degree: string;
  institution: string;
  start: string;
  end: string;
  gpa?: string;
  notes: string[];
}

export interface Skills {
  languages: string[];
  frameworks: string[];
  tools: string[];
  aiml: string[];
  databases: string[];
  other: string[];
}

export interface Achievement {
  category: string;
  items: string[];
}

export interface ResumeData {
  meta: {
    sourceFile: string;
    parsedAt: string;
  };
  personal: Personal;
  summary: string;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  skills: Skills;
  achievements: Achievement[];
  certifications: any[];
  notes: {
    warnings: string[];
    fields_missing: string[];
    confidence: Record<string, number>;
  };
}

export const resumeData: ResumeData = resumeJson as ResumeData;
