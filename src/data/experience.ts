import type { Experience } from './types';

const experience: Experience[] = [
  {
    company: 'WPManageNinja',
    position: 'Technical Support Engineer',
    companyUrl: 'https://wpmanageninja.com/',
    startDate: 'May 2024',
    endDate: undefined,
    current: true,
    description:
      'Providing technical support via tickets and live chat for users of WPManageNinja LLC, specializing in 7 flagship products debugging and testing. Improving customer support for powerful WordPress plugins trusted by over 700k users globally.',
    skills: ['WordPress Plugin Dev', 'Bug Tracking', 'Tech Support'],
  },
  {
    company: 'SEOPage1',
    position: 'Senior WordPress Developer',
    companyUrl: 'https://seopage1.net/',
    startDate: 'Sep 2023',
    endDate: 'Apr 2024',
    current: false,
    description:
      'Managing front-end and back-end development. Maintaining high-quality coding standards with PHP and JS. Guiding and monitoring junior developers. Creating, implementing, and managing websites. Developing custom themes and plugins. Debugging and resolving compatibility problems, bugs, and errors.',
    skills: ['WordPress', 'Elementor Pro', 'WooCommerce', 'JavaScript', 'PHP'],
  },
  {
    company: 'Jessore IT Institute',
    position: 'Instructor · Web Developer',
    companyUrl: 'https://jessoreit.com/',
    startDate: 'Jan 2023',
    endDate: 'Jul 2023',
    current: false,
    description:
      'Developing the Jessore IT Institute web app with Next.js. Developing and implementing APIs with Node.js. Building WordPress websites. Implementing UI with Tailwind and React components based on Figma designs. Tutoring HTML, CSS, JavaScript, MySQL, and PHP.',
    skills: ['Next.js', 'PHP', 'WordPress', 'Express.js'],
  },
  {
    company: 'Web Solutions BD',
    position: 'Jr. WordPress Developer',
    companyUrl: 'https://websolutions.tech/',
    startDate: 'Feb 2022',
    endDate: 'Nov 2022',
    current: false,
    description:
      'Understanding client requirements. Design and UI research. Website design with WordPress. Theme and plugin customization. WordPress speed optimization.',
    skills: ['WordPress', 'PHP', 'JavaScript', 'Elementor Pro'],
  },
];

export default experience;
