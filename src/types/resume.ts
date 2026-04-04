/** Shape of public/resume.json — replace file contents with your own data. */
export type ResumeBullet = { text: string };

export type ResumeExperience = {
  id: string;
  role: string;
  company: string;
  location?: string;
  start: string;
  end: string;
  bullets: ResumeBullet[];
  url?: string;
};

export type ResumeEducation = {
  id: string;
  degree: string;
  institution: string;
  start: string;
  end: string;
  detail?: string;
};

export type ResumeSkillCategory = {
  category: string;
  items: string[];
};

export type ResumeData = {
  name: string;
  title: string;
  summary: string;
  email: string;
  phone?: string;
  location?: string;
  links: { label: string; href: string }[];
  researchInterests: string[];
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skills: ResumeSkillCategory[];
};
