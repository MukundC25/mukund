const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

async function parseResume() {
  const resumePath = path.join(__dirname, '../Mukund_resume.pdf');
  const dataBuffer = fs.readFileSync(resumePath);
  
  const data = await pdf(dataBuffer);
  const text = data.text;
  
  console.log('=== RAW TEXT ===');
  console.log(text);
  console.log('\n=== PARSING ===\n');
  
  // Initialize resume structure
  const resume = {
    meta: {
      sourceFile: 'Mukund_resume.pdf',
      parsedAt: new Date().toISOString()
    },
    personal: {
      name: '',
      title: '',
      location: '',
      contacts: {
        email: '',
        phone: '',
        linkedin: '',
        github: '',
        website: ''
      }
    },
    summary: '',
    experience: [],
    projects: [],
    education: [],
    skills: {
      languages: [],
      frameworks: [],
      tools: [],
      other: []
    },
    certifications: [],
    notes: {
      warnings: [],
      fields_missing: [],
      confidence: {}
    }
  };
  
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  // Extract name (usually first line or prominent)
  const namePattern = /^([A-Z][a-z]+ [A-Z][a-z]+)$/;
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    if (namePattern.test(lines[i])) {
      resume.personal.name = lines[i];
      break;
    }
  }
  
  // Extract email
  const emailMatch = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
  if (emailMatch) resume.personal.contacts.email = emailMatch[1];
  
  // Extract phone
  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/);
  if (phoneMatch) resume.personal.contacts.phone = phoneMatch[1];
  
  // Extract LinkedIn
  const linkedinMatch = text.match(/linkedin\.com\/in\/([a-zA-Z0-9-]+)/i);
  if (linkedinMatch) resume.personal.contacts.linkedin = `https://linkedin.com/in/${linkedinMatch[1]}`;
  
  // Extract GitHub
  const githubMatch = text.match(/github\.com\/([a-zA-Z0-9-]+)/i);
  if (githubMatch) resume.personal.contacts.github = `https://github.com/${githubMatch[1]}`;
  
  // Extract location
  const locationPattern = /([\w\s]+,\s*[A-Z]{2}|[\w\s]+,\s*India|[\w\s]+,\s*USA)/;
  const locationMatch = text.match(locationPattern);
  if (locationMatch) resume.personal.location = locationMatch[1];
  
  // Parse sections
  let currentSection = '';
  let sectionContent = [];
  
  const sectionHeaders = {
    'EXPERIENCE': 'experience',
    'WORK EXPERIENCE': 'experience',
    'PROFESSIONAL EXPERIENCE': 'experience',
    'EDUCATION': 'education',
    'PROJECTS': 'projects',
    'SKILLS': 'skills',
    'TECHNICAL SKILLS': 'skills',
    'CERTIFICATIONS': 'certifications',
    'SUMMARY': 'summary',
    'PROFESSIONAL SUMMARY': 'summary'
  };
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const upperLine = line.toUpperCase();
    
    // Check if this is a section header
    let foundSection = false;
    for (const [header, section] of Object.entries(sectionHeaders)) {
      if (upperLine === header || upperLine.startsWith(header)) {
        // Process previous section
        if (currentSection && sectionContent.length > 0) {
          processSection(resume, currentSection, sectionContent);
        }
        currentSection = section;
        sectionContent = [];
        foundSection = true;
        break;
      }
    }
    
    if (!foundSection && currentSection) {
      sectionContent.push(line);
    }
  }
  
  // Process last section
  if (currentSection && sectionContent.length > 0) {
    processSection(resume, currentSection, sectionContent);
  }
  
  // Set confidence scores
  resume.notes.confidence.personal = resume.personal.name ? 0.9 : 0.3;
  resume.notes.confidence.experience = resume.experience.length > 0 ? 0.8 : 0.2;
  resume.notes.confidence.skills = resume.skills.languages.length > 0 ? 0.85 : 0.3;
  
  // Check for missing fields
  if (!resume.personal.name) resume.notes.fields_missing.push('name');
  if (!resume.personal.contacts.email) resume.notes.fields_missing.push('email');
  if (resume.experience.length === 0) resume.notes.warnings.push('No experience entries found');
  
  // Save to file
  const outputPath = path.join(__dirname, '../data/resume.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(resume, null, 2));
  
  console.log('✅ Resume parsed successfully!');
  console.log(`📄 Output: ${outputPath}`);
  console.log(`\n📊 Summary:`);
  console.log(`   Name: ${resume.personal.name || 'NOT FOUND'}`);
  console.log(`   Email: ${resume.personal.contacts.email || 'NOT FOUND'}`);
  console.log(`   Experience entries: ${resume.experience.length}`);
  console.log(`   Projects: ${resume.projects.length}`);
  console.log(`   Education: ${resume.education.length}`);
  console.log(`   Skills: ${resume.skills.languages.length + resume.skills.frameworks.length + resume.skills.tools.length}`);
  
  if (resume.notes.fields_missing.length > 0) {
    console.log(`\n⚠️  Missing fields: ${resume.notes.fields_missing.join(', ')}`);
  }
  
  return resume;
}

function processSection(resume, section, content) {
  const text = content.join('\n');
  
  switch(section) {
    case 'summary':
      resume.summary = content.join(' ').trim();
      break;
      
    case 'experience':
      parseExperience(resume, content);
      break;
      
    case 'education':
      parseEducation(resume, content);
      break;
      
    case 'projects':
      parseProjects(resume, content);
      break;
      
    case 'skills':
      parseSkills(resume, content);
      break;
      
    case 'certifications':
      resume.certifications = content.map(c => ({ name: c, date: null }));
      break;
  }
}

function parseExperience(resume, lines) {
  let currentJob = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Look for job title pattern: "Title at Company" or "Title | Company"
    const jobPattern = /^(.+?)\s+(?:at|@|\|)\s+(.+?)(?:\s+[-–—]\s+(.+))?$/;
    const match = line.match(jobPattern);
    
    // Or date pattern indicating new job
    const datePattern = /(\w+\s+\d{4})\s*[-–—]\s*(\w+\s+\d{4}|Present)/i;
    
    if (match || (currentJob && datePattern.test(line))) {
      if (currentJob) {
        resume.experience.push(currentJob);
      }
      
      if (match) {
        currentJob = {
          role: match[1].trim(),
          company: match[2].trim(),
          location: match[3] ? match[3].trim() : '',
          start: '',
          end: '',
          bullets: [],
          tech: []
        };
      }
      
      if (datePattern.test(line)) {
        const dateMatch = line.match(datePattern);
        if (currentJob) {
          currentJob.start = dateMatch[1];
          currentJob.end = dateMatch[2];
        } else {
          currentJob = {
            role: '',
            company: '',
            location: '',
            start: dateMatch[1],
            end: dateMatch[2],
            bullets: [],
            tech: []
          };
        }
      }
    } else if (currentJob && (line.startsWith('•') || line.startsWith('-') || line.startsWith('*'))) {
      currentJob.bullets.push(line.replace(/^[•\-*]\s*/, ''));
    } else if (currentJob && line.length > 10 && !datePattern.test(line)) {
      // Likely a bullet without marker
      currentJob.bullets.push(line);
    }
  }
  
  if (currentJob) {
    resume.experience.push(currentJob);
  }
}

function parseEducation(resume, lines) {
  let currentEdu = null;
  
  for (const line of lines) {
    const datePattern = /(\d{4})\s*[-–—]\s*(\d{4}|Present)/;
    
    if (datePattern.test(line) || line.includes('University') || line.includes('College') || line.includes('Institute')) {
      if (currentEdu) {
        resume.education.push(currentEdu);
      }
      
      currentEdu = {
        degree: '',
        institution: line.includes('University') || line.includes('College') ? line : '',
        start: '',
        end: '',
        notes: []
      };
      
      const dateMatch = line.match(datePattern);
      if (dateMatch) {
        currentEdu.start = dateMatch[1];
        currentEdu.end = dateMatch[2];
      }
    } else if (currentEdu) {
      if (!currentEdu.degree && (line.includes('Bachelor') || line.includes('Master') || line.includes('B.') || line.includes('M.'))) {
        currentEdu.degree = line;
      } else {
        currentEdu.notes.push(line);
      }
    }
  }
  
  if (currentEdu) {
    resume.education.push(currentEdu);
  }
}

function parseProjects(resume, lines) {
  let currentProject = null;
  
  for (const line of lines) {
    // Project title is usually bold or capitalized
    if (line === line.toUpperCase() && line.length > 3 && line.length < 50) {
      if (currentProject) {
        resume.projects.push(currentProject);
      }
      
      currentProject = {
        title: line,
        description: '',
        tech: [],
        links: {
          live: '',
          repo: ''
        }
      };
    } else if (currentProject) {
      if (line.includes('http') || line.includes('github')) {
        const urlMatch = line.match(/(https?:\/\/[^\s]+)/);
        if (urlMatch) {
          if (line.toLowerCase().includes('github')) {
            currentProject.links.repo = urlMatch[1];
          } else {
            currentProject.links.live = urlMatch[1];
          }
        }
      } else if (line.startsWith('•') || line.startsWith('-')) {
        currentProject.description += line.replace(/^[•\-]\s*/, '') + ' ';
      } else {
        currentProject.description += line + ' ';
      }
    }
  }
  
  if (currentProject) {
    resume.projects.push(currentProject);
  }
}

function parseSkills(resume, lines) {
  const text = lines.join(' ');
  
  // Common skill categories
  const categories = {
    languages: /(?:Languages?|Programming)[:\s]+([^.;]+)/i,
    frameworks: /(?:Frameworks?|Libraries)[:\s]+([^.;]+)/i,
    tools: /(?:Tools?|Technologies)[:\s]+([^.;]+)/i
  };
  
  for (const [category, pattern] of Object.entries(categories)) {
    const match = text.match(pattern);
    if (match) {
      const skills = match[1].split(/[,;]/).map(s => s.trim()).filter(s => s.length > 0);
      resume.skills[category] = skills;
    }
  }
  
  // If no categories found, treat all as general skills
  if (resume.skills.languages.length === 0 && resume.skills.frameworks.length === 0) {
    const allSkills = text.split(/[,;]/).map(s => s.trim()).filter(s => s.length > 2);
    resume.skills.other = allSkills;
  }
}

parseResume().catch(console.error);
