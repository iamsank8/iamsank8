const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Projects API endpoint
app.get('/api/projects', (req, res) => {
  const projects = [
    {
      id: 1,
      name: 'Predictive Portal',
      organization: 'Nitor Infotech, An Ascendion company',
      period: 'March 2020 - Present',
      domains: 'Manufacturing',
      responsibilities: [
        'Worked as individual contributor for Angular technology',
        'Gained domain knowledge and was able to co-relate the features and value additions',
        'Analyzed figma designs and converted into Angular code',
        'Used the organizational theme to style the components',
        'Contributed to repository look and feel',
        'Written unit tests based on Jasmine and Karma stack',
        'Using SonarQube for tracking code quality and security vulnerabilities'
      ],
      tasks: [
        'Requirement understanding',
        'Code quality discussion',
        'Peer code reviews',
        'Cross team communication',
        'Client-side discussions and deliveries'
      ],
      technologies: ['Angular 9-14', 'TypeScript', 'Docker', 'SonarQube', 'Figma']
    },
    {
      id: 2,
      name: 'Health and Safety for Petroleum Company',
      organization: 'Nitor Infotech Pvt Ltd',
      period: 'Jan 2019 - Feb 2020',
      domains: 'Oil & Gas',
      responsibilities: [
        'Worked as full stack developer',
        'Got first-hand experience in interacting with customer interaction and requirement gathering',
        'Understood the business need and customer\'s expectations from the project very early',
        'Helped design new modules from the scratch',
        'Focused on the scalability of the application with strong backend for storing large data',
        'Used .NET framework 4.5 for backend APIs with Azure services'
      ],
      tasks: [
        'Requirement gathering',
        'Code structuring',
        'Database design',
        'Peer code review',
        'Client-side discussions and deliveries'
      ],
      technologies: ['Angular 5-9', 'TypeScript', '.NET Framework', 'Azure', 'SQL server']
    },
    {
      id: 3,
      name: 'Robotic Process Automation for PLM',
      organization: 'Infosys India',
      period: 'May 2018 - Dec 2018',
      domains: 'Retail',
      responsibilities: [
        'Worked as backend developer for this project',
        'Presented with different manual tasks that were happening multiple times on daily or weekly basis',
        'Analyzed the process flow of the tasks that needed automation',
        'Provided estimates for the work',
        'Used Selenium with C# for custom code block in proprietary software to achieve the automation and desired results'
      ],
      tasks: [
        'Requirement understanding',
        'Flow analysis',
        'Peer code review',
        'Client-side discussion and deliveries'
      ],
      technologies: ['Selenium', 'C#', 'PostgreSQL', 'RabbitMQ', 'AssistEdge (Infosys proprietary)']
    },
    {
      id: 4,
      name: 'Order Management',
      organization: 'Syntel Pvt Ltd',
      period: 'May 2018 - Dec 2018',
      domains: 'Retail & Logistics',
      responsibilities: [
        'Worked as full stack developer for this project',
        'Helped maintained and enhance some parts of the application',
        'The project was mostly built in ASP.Net but it also had some classic ASP bits',
        'Got directions from the onsite counterpart which helped gather and finalize requirements for code changes',
        'This was a stable project and was used around the world',
        'Making any changes carried a lot of responsibility so unit testing the code changes and ensuring the code quality was must'
      ],
      tasks: [
        'Requirement understanding',
        'Client-side discussion and deliveries',
        'Unit testing'
      ],
      technologies: ['C#', 'SQL Server', 'PostgreSQL', 'Classic ASP', 'MVC']
    },
    {
      id: 5,
      name: 'ECU Flashing',
      organization: 'Syntel Pvt Ltd',
      period: 'May 2018 - Dec 2018',
      domains: 'Manufacturing',
      responsibilities: [
        'Worked as backend developer',
        'This was built in VB.Net and JavaScript and interfacing was done using ActiveXObject in internet explorer',
        'This project was used to flash ECU with new firmware updates',
        'It would also list down all the features of it, and tell which new feature is available to upgrade'
      ],
      tasks: [
        'Requirement understanding',
        'Client-side discussion and deliveries',
        'Unit testing',
        'Cross team communication'
      ],
      technologies: ['HTML', 'jQuery', 'JavaScript', 'VBScript', 'C#']
    }
  ];
  
  res.json(projects);
});

// Skills API endpoint
app.get('/api/skills', (req, res) => {
  const skills = [
    {
      category: 'Frontend',
      items: [
        { name: 'Angular', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'HTML5', level: 90 },
        { name: 'CSS3/SCSS', level: 85 },
        { name: 'jQuery', level: 80 }
      ]
    },
    {
      category: 'Backend',
      items: [
        { name: 'C#', level: 85 },
        { name: 'ASP.NET', level: 80 },
        { name: 'MVC', level: 75 },
        { name: 'Entity Framework', level: 70 },
        { name: 'Web Services', level: 75 },
        { name: 'Node.js', level: 65 }
      ]
    },
    {
      category: 'Database',
      items: [
        { name: 'SQL Server', level: 80 },
        { name: 'PostgreSQL', level: 75 },
        { name: 'MongoDB', level: 60 }
      ]
    },
    {
      category: 'DevOps & Tools',
      items: [
        { name: 'Git', level: 85 },
        { name: 'Docker', level: 70 },
        { name: 'Azure', level: 65 },
        { name: 'SonarQube', level: 75 },
        { name: 'Figma', level: 70 }
      ]
    },
    {
      category: 'AI & ML',
      items: [
        { name: 'Prompt Engineering', level: 80 },
        { name: 'Local LLM Integration', level: 70 }
      ]
    }
  ];
  
  res.json(skills);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API endpoints:`);
  console.log(`- Projects: http://localhost:${PORT}/api/projects`);
  console.log(`- Skills: http://localhost:${PORT}/api/skills`);
});