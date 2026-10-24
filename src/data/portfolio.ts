type Project = {
  title: string
  role: string
  period: string
  description: string
  tags: string[]
  url?: string
}

type Portfolio = {
  name: string
  role: string
  intro: string
  about: string
  email: string
  location: string
  telegram: string
  skills: string[]
  projects: Project[]
  experience: {
    organization: string
    role: string
    period: string
    location: string
    highlights: string[]
  }[]
  education: {
    degree: string
    institution: string
    specialization: string
    distinction: string
    date: string
  }
  achievements: { title: string; detail: string; date: string }[]
  socials: { label: string; url: string }[]
}

// Profile details transcribed and summarized from Carla's CV.
export const portfolio: Portfolio = {
  name: 'Carla Jean Zozobrado',
  role: 'Educator & front-end developer',
  intro: 'I bring technology into the classroom and build accessible, user-friendly digital experiences that help people learn and connect.',
  about: 'I am an educator with a Bachelor of Science in Information Technology, specializing in Information Security. My work connects teaching, front-end development, and project management. I enjoy making technology easier to understand, encouraging critical thinking, and creating inclusive learning experiences that strengthen digital literacy.',
  email: 'carlajeanzozobrado26@gmail.com',
  location: 'Phnom Penh, Cambodia',
  telegram: '+855 68 562 049',
  skills: [
    'Curriculum Development', 'Classroom Management', 'Lesson Planning',
    'Student Engagement', 'Digital Citizenship', 'ICT', 'Educational Software',
    'Critical Thinking', 'Collaboration', 'Problem-Solving', 'Time Management',
    'Communication', 'Interpersonal Skills',
  ],
  projects: [
    {
      title: 'City Health Card System',
      role: 'Front-end Developer Intern',
      period: 'August 29 – November 29, 2024',
      description: 'Collaborated with the City Health Office team on a user-friendly web application to improve community access to health services. Helped troubleshoot web issues and improve the front-end design and functionality.',
      tags: ['Front-end Development', 'User Experience', 'Public Health'],
    },
    {
      title: 'Library Inventory and TMS System',
      role: 'Project Manager · USEP',
      period: 'June 18 – September 13, 2024',
      description: 'Led the implementation of a library inventory management system, improving operational efficiency by approximately 25%. Coordinated the team and resources, and introduced inventory tracking processes to improve accuracy and accountability.',
      tags: ['Project Management', 'Inventory Systems', 'Team Leadership'],
    },
  ],
  experience: [
    {
      organization: 'University of Mindanao – Tagum College',
      role: 'Faculty Member, Department of Computing Education',
      period: 'August 2025 – June 2026',
      location: 'Tagum City, Davao del Norte, Philippines',
      highlights: [
        'Designed and delivered ICT lessons aligned with curriculum objectives.',
        'Taught digital citizenship, online safety, and responsible technology use.',
        'Assessed learning through quizzes and practical activities, with personalized feedback.',
        'Created an inclusive classroom that encouraged critical thinking and collaboration.',
        'Integrated educational software and tools into lesson plans.',
      ],
    },
    {
      organization: 'City Health Card System, City Health Office',
      role: 'Front-end Developer Intern',
      period: 'August 29 – November 29, 2024',
      location: 'Tagum City, Davao del Norte, Philippines',
      highlights: [
        'Collaborated on a web application supporting access to community health services.',
        'Troubleshot web technology issues and contributed front-end design improvements.',
      ],
    },
    {
      organization: 'Library Inventory and TMS System USEP',
      role: 'Project Manager',
      period: 'June 18 – September 13, 2024',
      location: 'Tagum-Mabini Campus, Philippines',
      highlights: [
        'Coordinated team members, resources, and deadlines for system implementation.',
        'Improved inventory tracking accuracy and accountability.',
      ],
    },
  ],
  education: {
    degree: 'Bachelor of Science in Information Technology',
    institution: 'University of Southeastern Philippines',
    specialization: 'Major in Information Security',
    distinction: 'Cum Laude',
    date: 'June 25, 2025',
  },
  achievements: [
    {
      title: '2nd Runner-Up · Pitching Competition',
      detail: 'Plug-In: Davao del Norte Leg – IDEAS x Tagum City',
      date: 'July 26, 2024',
    },
    {
      title: 'TOPCIT · Level 2 Passer',
      detail: 'Test of Practical Competency in IT · Daejeon, Korea',
      date: 'November 22, 2023',
    },
  ],
  socials: [],
}
