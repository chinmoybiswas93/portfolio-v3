export interface Profile {
  name: string;
  title: string;
  tagline: string;
  about: string;
  email: string;
  phone?: string;
  location?: string;
  github: string;
  linkedin: string;
  twitter?: string;
  websiteUrl?: string;
  resumeUrl?: string;
  profileImage?: string;
  footerText: string;
}

export interface Experience {
  company: string;
  position: string;
  companyUrl?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  skills: string[];
}

export interface Project {
  title: string;
  description: string;
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
  year: number;
  madeAt?: string;
  featured: boolean;
}
