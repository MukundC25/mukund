import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/sections/Hero';
import { resumeData } from '@/lib/resume-data';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
  useInView: () => true,
}));

describe('Hero Component', () => {
  it('renders the name from resume data', () => {
    render(<Hero />);
    
    // Check that the name appears in the document
    const nameParts = resumeData.personal.name.split(' ');
    nameParts.forEach((part) => {
      expect(screen.getByText(new RegExp(part))).toBeInTheDocument();
    });
  });

  it('renders the title', () => {
    render(<Hero />);
    expect(screen.getByText(resumeData.personal.title)).toBeInTheDocument();
  });

  it('renders the summary', () => {
    render(<Hero />);
    expect(screen.getByText(resumeData.summary)).toBeInTheDocument();
  });

  it('renders call-to-action buttons', () => {
    render(<Hero />);
    expect(screen.getByText(/View My Work/i)).toBeInTheDocument();
    expect(screen.getByText(/Get In Touch/i)).toBeInTheDocument();
  });

  it('renders download resume link', () => {
    render(<Hero />);
    expect(screen.getByText(/Download Resume/i)).toBeInTheDocument();
  });
});

describe('Accessibility', () => {
  it('Hero section has proper heading hierarchy', () => {
    render(<Hero />);
    
    // Should have an h1 with the name
    const h1Elements = document.querySelectorAll('h1');
    expect(h1Elements.length).toBeGreaterThan(0);
  });
});
