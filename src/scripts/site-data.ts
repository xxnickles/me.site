export interface SkillGroup {
  group: string;
  items: string[];
}

export interface ExperienceEntry {
  company: string;
  flag: string;
  role: string;
  period: string;
  stack: string;
  note: string;
}

export interface EducationEntry {
  school: string;
  flag: string;
  degree: string;
  period: string;
}

export interface Contact {
  linkedin: string;
  github: string;
  resume: string;
  site: string;
}

export interface SiteData {
  name: string;
  role: string;
  tagline: string;
  location: string;
  yearsXp: number;
  blurb: string;
  contact: Contact;
  skills: SkillGroup[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  certs: string[];
}

export const SITE: SiteData = {
  name: 'Alex Flechas',
  role: 'Software Engineer',
  tagline: 'I \u2764 software development. Do you really need to know anything else?',
  location: 'Virginia, US \u00b7 bilingual EN/ES',
  yearsXp: 15,
  blurb:
    'Bilingual full-stack engineer with 15+ years shipping web and desktop software \u2014 mostly .NET and TypeScript. Currently at AAMVA, building services for US jurisdictions with Angular and .NET Core.',
  contact: {
    linkedin: 'https://www.linkedin.com/in/alexflechas/',
    github: 'https://github.com/xxnickles',
    resume: 'https://github.com/xxnickles/me.site/blob/main/resume/README.md',
    site: 'https://www.aflechas.me/',
  },
  skills: [
    { group: 'Languages', items: ['C#', 'TypeScript', 'JavaScript', 'F#'] },
    {
      group: 'Web',
      items: [
        '.NET',
        'ASP.NET MVC',
        'Blazor',
        'REST / gRPC',
        'Entity Framework',
        'Node.js',
        'Angular',
        'Vue',
        'RxJS',
        'HTMX',
        'Web Components',
        'Vite',
      ],
    },
    { group: 'Cloud', items: ['Azure', 'Docker', 'CI/CD'] },
    { group: 'Data', items: ['SQL Server', 'MongoDB', 'Cosmos DB'] },
    {
      group: 'AI',
      items: [
        'Claude Code',
        'Claude (Anthropic API)',
        'Claude Agent SDK',
        'GitHub Copilot',
        'Prompt Engineering',
        'Agentic Workflows',
      ],
    },
    {
      group: 'Practices',
      items: ['SOLID', 'Design Patterns', 'OOP', 'Functional', 'Reactive', 'SCRUM', 'Testing'],
    },
  ],
  experience: [
    {
      company: 'AAMVA',
      flag: '\uD83C\uDDFA\uD83C\uDDF8',
      role: 'Sr. Software Engineer',
      period: '2018 \u2014 Present',
      stack: 'Angular \u00b7 .NET Core \u00b7 Azure \u00b7 Claude Code \u00b7 Copilot',
      note: 'Services for US motor-vehicle jurisdictions; AI-assisted development with Claude Code and Copilot.',
    },
    {
      company: 'Jobspring / ACR',
      flag: '\uD83C\uDDFA\uD83C\uDDF8',
      role: '.NET Developer',
      period: '2017',
      stack: '.NET Framework \u00b7 ASP.NET \u00b7 Vue.js',
      note: 'Accreditation project; set up CI/CD and test tooling.',
    },
    {
      company: 'Intersoft (eltiempo.com)',
      flag: '\uD83C\uDDE8\uD83C\uDDF4',
      role: 'Consultant Engineer',
      period: '2013 \u2014 2014',
      stack: '.NET 3.5 \u00b7 SQL Server',
      note: 'High-traffic, transactional news application.',
    },
    {
      company: 'Bizonte (Nuevagenda)',
      flag: '\uD83C\uDDE8\uD83C\uDDF4',
      role: 'Software Engineer',
      period: '2013',
      stack: 'MVC 4 \u00b7 SQL Server',
      note: 'Greenfield web application.',
    },
    {
      company: 'ITBF Consulting',
      flag: '\uD83C\uDDE8\uD83C\uDDF4',
      role: 'Software Engineer',
      period: '2012',
      stack: '.NET WinForms \u00b7 Oracle',
      note: 'Desktop app for Legis Colombia.',
    },
    {
      company: 'Estudios y Dise\u00f1os',
      flag: '\uD83C\uDDE8\uD83C\uDDF4',
      role: 'Developer & Infra Manager',
      period: '2010 \u2014 2012',
      stack: 'Joomla \u00b7 .NET \u00b7 SQL Server',
      note: 'Internal and client apps; ran the infrastructure too.',
    },
  ],
  education: [
    {
      school: 'Strayer University',
      flag: '\uD83C\uDDFA\uD83C\uDDF8',
      degree: 'M.S., Information Systems',
      period: '2015 \u2014 2016',
    },
    {
      school: 'Universidad Libre',
      flag: '\uD83C\uDDE8\uD83C\uDDF4',
      degree: 'B.A., Software Engineering',
      period: '2004 \u2014 2009',
    },
  ],
  certs: ['Azure Fundamentals \u2014 Microsoft'],
};
