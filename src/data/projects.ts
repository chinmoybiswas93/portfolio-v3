import type { Project } from './types';

const projects: Project[] = [
  {
    title: 'TuFlamenco',
    description:
      'Developed and maintained the official website for TuFlamenco for over 3 years. The company offers education and performances for flamenco dance based in Scotland.',
    imageUrl: '/images/projects/tuflamenco.webp',
    liveUrl: 'https://tuflamenco.com',
    githubUrl: undefined,
    technologies: ['WordPress', 'Elementor Pro', 'WooCommerce'],
    year: 2022,
    madeAt: 'Personal',
    featured: true,
  },
  {
    title: 'Sylhet Helpline',
    description:
      'Developed and maintained a helpline directory website for Sylhet, featuring a custom-built directory listing system tailored for local services. Implemented custom Gutenberg blocks and a full-site editing (FSE) theme for a flexible, modern experience.',
    imageUrl: '/images/projects/sylhet-helpline.webp',
    liveUrl: 'https://staging.sylhethelpline.com/',
    githubUrl: undefined,
    technologies: ['WordPress Theme', 'WordPress Plugin', 'Gutenberg Block', 'PHP', 'JavaScript'],
    year: 2026,
    madeAt: 'Personal',
    featured: true,
  },
  {
    title: 'Cardinal Health Care BD',
    description:
      'Developed and maintained Cardinal Health Care BD, a business website featuring a custom-built products listing system, custom Gutenberg blocks, and a full-site editing (FSE) theme for a flexible, modern experience.',
    imageUrl: '/images/projects/cardinal-health-care.webp',
    liveUrl: 'https://cardinalhealthcarebd.com/',
    githubUrl: undefined,
    technologies: ['WordPress Plugin', 'WordPress Theme', 'Gutenberg', 'PHP', 'JavaScript'],
    year: 2026,
    madeAt: 'Personal',
    featured: true,
  },
  {
    title: 'CB Portfolio — WordPress Plugin',
    description:
      'Built a custom WordPress portfolio plugin to manage personal and project data with a dynamic front-end display. Implemented a modern MVC-based architecture using Vue.js for both admin and front-end interfaces.',
    imageUrl: '/images/projects/cb-portfolio.webp',
    liveUrl: 'https://chinmoybiswas.com',
    githubUrl: 'https://github.com/chinmoybiswas93/cb-portfolio',
    technologies: ['WordPress Plugin', 'Vue.js', 'PHP'],
    year: 2025,
    madeAt: 'Personal',
    featured: true,
  },
  {
    title: 'CB QR Code — WordPress Plugin',
    description:
      'Customizable QR code plugin for WordPress content links. Visitors can scan or click the QR code to quickly copy the link, making sharing content effortless with local QR generation.',
    imageUrl: '/images/projects/cb-qr-code.webp',
    liveUrl: 'https://wordpress.org/plugins/cb-qr-code/',
    githubUrl: 'https://github.com/chinmoybiswas93/cb-qr-code',
    technologies: ['WordPress Plugin', 'Vue.js', 'PHP'],
    year: 2025,
    madeAt: 'Personal',
    featured: true,
  },
  {
    title: 'M-Smart Technology BD',
    description:
      'Developed and maintained the corporate website for M-Smart Technology BD for over 3 years. The company is an industrial technology product supplier operating between Bangladesh and China.',
    imageUrl: '/images/projects/m-smart-technology.webp',
    liveUrl: 'https://mtech-bd.com/',
    githubUrl: undefined,
    technologies: ['WordPress', 'Elementor Pro', 'WooCommerce'],
    year: 2022,
    madeAt: 'Personal',
    featured: false,
  },
];

export default projects;
