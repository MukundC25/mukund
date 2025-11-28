import { resumeData } from '@/lib/resume-data';

describe('Resume Data', () => {
  describe('Personal Information', () => {
    it('should have a valid name', () => {
      expect(resumeData.personal.name).toBe('Mukund Chavan');
    });

    it('should have a valid title', () => {
      expect(resumeData.personal.title).toBeTruthy();
      expect(typeof resumeData.personal.title).toBe('string');
    });

    it('should have valid contact information', () => {
      expect(resumeData.personal.contacts.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      expect(resumeData.personal.contacts.github).toContain('github.com');
      expect(resumeData.personal.contacts.linkedin).toContain('linkedin.com');
    });

    it('should have a location', () => {
      expect(resumeData.personal.location).toBeTruthy();
    });
  });

  describe('Experience', () => {
    it('should have at least one experience entry', () => {
      expect(resumeData.experience.length).toBeGreaterThan(0);
    });

    it('each experience should have required fields', () => {
      resumeData.experience.forEach((exp) => {
        expect(exp.role).toBeTruthy();
        expect(exp.company).toBeTruthy();
        expect(exp.bullets.length).toBeGreaterThan(0);
        expect(exp.tech.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Projects', () => {
    it('should have at least one project', () => {
      expect(resumeData.projects.length).toBeGreaterThan(0);
    });

    it('each project should have required fields', () => {
      resumeData.projects.forEach((project) => {
        expect(project.title).toBeTruthy();
        expect(project.description).toBeTruthy();
        expect(project.tech.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Skills', () => {
    it('should have programming languages', () => {
      expect(resumeData.skills.languages.length).toBeGreaterThan(0);
    });

    it('should have frameworks', () => {
      expect(resumeData.skills.frameworks.length).toBeGreaterThan(0);
    });

    it('should have AI/ML skills', () => {
      expect(resumeData.skills.aiml.length).toBeGreaterThan(0);
    });
  });

  describe('Education', () => {
    it('should have at least one education entry', () => {
      expect(resumeData.education.length).toBeGreaterThan(0);
    });

    it('each education should have institution and degree', () => {
      resumeData.education.forEach((edu) => {
        expect(edu.institution).toBeTruthy();
        expect(edu.degree).toBeTruthy();
      });
    });
  });

  describe('Confidence Scores', () => {
    it('should have confidence scores for major sections', () => {
      expect(resumeData.notes.confidence.personal).toBeGreaterThan(0);
      expect(resumeData.notes.confidence.experience).toBeGreaterThan(0);
      expect(resumeData.notes.confidence.skills).toBeGreaterThan(0);
    });

    it('confidence scores should be between 0 and 1', () => {
      Object.values(resumeData.notes.confidence).forEach((score) => {
        expect(score).toBeGreaterThanOrEqual(0);
        expect(score).toBeLessThanOrEqual(1);
      });
    });
  });
});
