const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

// Initialize Firebase Admin
admin.initializeApp();

// Initialize Express app
const app = express();

// Security middleware
// Configure CORS with specific origins
const allowedOrigins = [
  "http://localhost:4200",
  "https://portfolio-sanket-c5165.web.app",
  "https://portfolio-sanket-c5165.firebaseapp.com",
];

const corsOptions = {
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET"],
  optionsSuccessStatus: 200,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Apply Helmet for secure HTTP headers
app.use(helmet());

// Apply rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {error: "Too many requests, please try again later."},
});

// Apply rate limiting to all requests
app.use(limiter);

// Parse JSON bodies
app.use(express.json({limit: "10kb"})); // Body size limiting

// Projects API endpoints
app.get("/projects", async (req, res) => {
  try {
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
    
    return res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({error: "Something went wrong"});
  }
});

// Skills API endpoints
app.get("/skills", async (req, res) => {
  try {
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
    
    return res.status(200).json(skills);
  } catch (error) {
    console.error("Error fetching skills:", error);
    return res.status(500).json({error: "Something went wrong"});
  }
});

// Export the API as a Firebase Cloud Function
exports.api = functions.https.onRequest(app);