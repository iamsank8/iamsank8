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
    // Try to fetch from Firestore first, fallback to hardcoded data
    const db = admin.firestore();
    const projectsSnapshot = await db.collection("projects").get();
    
    let projects = [];
    
    if (!projectsSnapshot.empty) {
      // Use Firestore data if available
      projectsSnapshot.forEach(doc => {
        projects.push({
          id: doc.id,
          ...doc.data()
        });
      });
    } else {
      // Fallback to enhanced hardcoded data
      projects = [
        {
          id: "predictive-portal",
          name: "Predictive Portal",
          organization: "Nitor Infotech, An Ascendion company",
          period: "March 2020 - Present",
          domains: ["Manufacturing", "Analytics"],
          description: "A comprehensive predictive analytics platform for manufacturing operations, providing real-time insights and forecasting capabilities.",
          responsibilities: [
            "Worked as individual contributor for Angular technology",
            "Gained domain knowledge and was able to co-relate the features and value additions",
            "Analyzed figma designs and converted into Angular code",
            "Used the organizational theme to style the components",
            "Contributed to repository look and feel",
            "Written unit tests based on Jasmine and Karma stack",
            "Using SonarQube for tracking code quality and security vulnerabilities"
          ],
          tasks: [
            "Requirement understanding",
            "Code quality discussion",
            "Peer code reviews",
            "Cross team communication",
            "Client-side discussions and deliveries"
          ],
          technologies: ["Angular 9-14", "TypeScript", "Docker", "SonarQube", "Figma"],
          achievements: [
            "Improved application performance by 40%",
            "Reduced code defects by implementing comprehensive testing",
            "Enhanced user experience through responsive design implementation"
          ],
          status: "Active",
          featured: true
        },
        {
          id: "health-safety-petroleum",
          name: "Health and Safety for Petroleum Company",
          organization: "Nitor Infotech Pvt Ltd",
          period: "Jan 2019 - Feb 2020",
          domains: ["Oil & Gas", "Safety Management"],
          description: "A comprehensive health and safety management system for petroleum operations, ensuring compliance and risk management.",
          responsibilities: [
            "Worked as full stack developer",
            "Got first-hand experience in interacting with customer interaction and requirement gathering",
            "Understood the business need and customer's expectations from the project very early",
            "Helped design new modules from the scratch",
            "Focused on the scalability of the application with strong backend for storing large data",
            "Used .NET framework 4.5 for backend APIs with Azure services"
          ],
          tasks: [
            "Requirement gathering",
            "Code structuring",
            "Database design",
            "Peer code review",
            "Client-side discussions and deliveries"
          ],
          technologies: ["Angular 5-9", "TypeScript", ".NET Framework", "Azure", "SQL Server"],
          achievements: [
            "Successfully delivered project on time and within budget",
            "Implemented scalable architecture handling large datasets",
            "Received positive client feedback for user-friendly interface"
          ],
          status: "Completed",
          featured: true
        },
        {
          id: "portfolio-website",
          name: "Personal Portfolio Website",
          organization: "Personal Project",
          period: "2024 - Present",
          domains: ["Web Development", "Personal Branding"],
          description: "A modern, responsive portfolio website built with Angular and Firebase, showcasing professional experience and projects.",
          responsibilities: [
            "Full-stack development using Angular and Firebase",
            "Implemented secure API with Firebase Cloud Functions",
            "Designed responsive UI with Angular Material",
            "Implemented security best practices including CSP and CORS",
            "Set up CI/CD pipeline with Firebase Hosting"
          ],
          tasks: [
            "Requirements analysis and planning",
            "UI/UX design and implementation",
            "Backend API development",
            "Security implementation",
            "Performance optimization",
            "Deployment and maintenance"
          ],
          technologies: ["Angular 17", "TypeScript", "Firebase", "Angular Material", "SCSS"],
          achievements: [
            "Achieved 95+ Lighthouse performance score",
            "Implemented comprehensive security measures",
            "Created reusable component library"
          ],
          status: "Active",
          featured: true,
          githubUrl: "https://github.com/username/portfolio",
          liveUrl: "https://portfolio-sanket-c5165.web.app"
        },
        {
          id: "task-management-app",
          name: "Task Management Application",
          organization: "Side Project",
          period: "2023",
          domains: ["Productivity", "Project Management"],
          description: "A collaborative task management application with real-time updates and team collaboration features.",
          responsibilities: [
            "Designed and developed full-stack application",
            "Implemented real-time collaboration features",
            "Created intuitive user interface for task management",
            "Integrated third-party APIs for notifications"
          ],
          tasks: [
            "System architecture design",
            "Frontend development with Angular",
            "Backend API development",
            "Real-time features implementation",
            "Testing and deployment"
          ],
          technologies: ["Angular 15", "Node.js", "Socket.io", "MongoDB", "Express"],
          achievements: [
            "Implemented real-time collaboration features",
            "Achieved sub-second response times",
            "Created comprehensive test suite with 90% coverage"
          ],
          status: "Completed",
          featured: false
        }
      ];
    }
    
    return res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({error: "Something went wrong"});
  }
});

// Skills API endpoints
app.get("/skills", async (req, res) => {
  try {
    // Try to fetch from Firestore first, fallback to hardcoded data
    const db = admin.firestore();
    const skillsSnapshot = await db.collection("skills").get();
    
    let skills = [];
    
    if (!skillsSnapshot.empty) {
      // Use Firestore data if available
      skillsSnapshot.forEach(doc => {
        skills.push({
          id: doc.id,
          ...doc.data()
        });
      });
    } else {
      // Fallback to enhanced hardcoded data
      skills = [
        {
          category: "Frontend",
          items: [
            { name: "Angular", level: 95, yearsOfExperience: 5 },
            { name: "TypeScript", level: 90, yearsOfExperience: 4 },
            { name: "JavaScript", level: 85, yearsOfExperience: 6 },
            { name: "HTML5", level: 90, yearsOfExperience: 6 },
            { name: "CSS3/SCSS", level: 85, yearsOfExperience: 5 },
            { name: "RxJS", level: 85, yearsOfExperience: 4 },
            { name: "Angular Material", level: 90, yearsOfExperience: 4 },
            { name: "Responsive Design", level: 85, yearsOfExperience: 5 },
            { name: "PWA", level: 75, yearsOfExperience: 2 }
          ]
        },
        {
          category: "Backend",
          items: [
            { name: "C#", level: 85, yearsOfExperience: 4 },
            { name: "ASP.NET Core", level: 80, yearsOfExperience: 3 },
            { name: "MVC", level: 75, yearsOfExperience: 3 },
            { name: "Entity Framework", level: 70, yearsOfExperience: 2 },
            { name: "RESTful APIs", level: 85, yearsOfExperience: 4 },
            { name: "Node.js", level: 75, yearsOfExperience: 3 },
            { name: "Express", level: 70, yearsOfExperience: 2 },
            { name: "Firebase Functions", level: 80, yearsOfExperience: 2 }
          ]
        },
        {
          category: "Database",
          items: [
            { name: "SQL Server", level: 80, yearsOfExperience: 4 },
            { name: "PostgreSQL", level: 75, yearsOfExperience: 2 },
            { name: "MongoDB", level: 65, yearsOfExperience: 1 },
            { name: "Firestore", level: 80, yearsOfExperience: 2 },
            { name: "Redis", level: 60, yearsOfExperience: 1 }
          ]
        },
        {
          category: "DevOps & Cloud",
          items: [
            { name: "Git", level: 85, yearsOfExperience: 5 },
            { name: "GitHub Actions", level: 80, yearsOfExperience: 2 },
            { name: "Docker", level: 75, yearsOfExperience: 2 },
            { name: "Azure", level: 70, yearsOfExperience: 2 },
            { name: "Firebase", level: 85, yearsOfExperience: 2 },
            { name: "SonarQube", level: 75, yearsOfExperience: 3 },
            { name: "CI/CD", level: 80, yearsOfExperience: 3 }
          ]
        },
        {
          category: "AI & ML",
          items: [
            { name: "Prompt Engineering", level: 85, yearsOfExperience: 1 },
            { name: "LLM Integration", level: 80, yearsOfExperience: 1 },
            { name: "AI-powered UX", level: 75, yearsOfExperience: 1 },
            { name: "ChatGPT API", level: 80, yearsOfExperience: 1 }
          ]
        },
        {
          category: "UI/UX",
          items: [
            { name: "Figma", level: 75, yearsOfExperience: 2 },
            { name: "Responsive Design", level: 85, yearsOfExperience: 5 },
            { name: "Accessibility", level: 80, yearsOfExperience: 3 },
            { name: "User Testing", level: 70, yearsOfExperience: 2 }
          ]
        },
        {
          category: "Security",
          items: [
            { name: "OWASP", level: 75, yearsOfExperience: 2 },
            { name: "Authentication", level: 80, yearsOfExperience: 3 },
            { name: "Authorization", level: 80, yearsOfExperience: 3 },
            { name: "Content Security Policy", level: 85, yearsOfExperience: 2 }
          ]
        }
      ];
    }
    
    return res.status(200).json(skills);
  } catch (error) {
    console.error("Error fetching skills:", error);
    return res.status(500).json({error: "Something went wrong"});
  }
});

// Experience API endpoints
app.get("/experience", async (req, res) => {
  try {
    // Try to fetch from Firestore first, fallback to hardcoded data
    const db = admin.firestore();
    const experienceSnapshot = await db.collection("experience").get();
    
    let experiences = [];
    
    if (!experienceSnapshot.empty) {
      // Use Firestore data if available
      experienceSnapshot.forEach(doc => {
        experiences.push({
          id: doc.id,
          ...doc.data()
        });
      });
      // Sort by period (most recent first)
      experiences.sort((a, b) => {
        const aYear = parseInt(a.period.split(" - ")[0].split(" ").pop());
        const bYear = parseInt(b.period.split(" - ")[0].split(" ").pop());
        return bYear - aYear;
      });
    } else {
      // Fallback to hardcoded data
      experiences = [
        {
          id: "nitor-senior",
          position: "Senior Software Engineer",
          company: "Nitor Infotech, An Ascendion company",
          period: "March 2020 - Present",
          location: "Pune, India",
          employmentType: "Full-time",
          summary: "Leading frontend development initiatives with Angular technology stack, focusing on manufacturing domain solutions and enterprise-grade applications.",
          keyAchievements: [
            "Successfully delivered multiple Angular applications from version 9 to 14",
            "Implemented comprehensive unit testing strategy achieving 85%+ code coverage",
            "Collaborated with cross-functional teams to deliver client solutions on time",
            "Mentored junior developers and contributed to code quality improvements"
          ],
          skillsGained: [
            "Advanced Angular development",
            "Enterprise application architecture",
            "Client communication and requirement gathering",
            "Code quality and testing best practices",
            "Docker containerization"
          ],
          domains: ["Manufacturing", "Enterprise Software"]
        },
        {
          id: "nitor-software-engineer",
          position: "Software Engineer",
          company: "Nitor Infotech Pvt Ltd",
          period: "Jan 2019 - Feb 2020",
          location: "Pune, India",
          employmentType: "Full-time",
          summary: "Full-stack developer specializing in Angular frontend and .NET backend development for oil & gas industry applications.",
          keyAchievements: [
            "Designed and developed scalable backend APIs using .NET Framework 4.5",
            "Integrated Azure cloud services for enhanced application performance",
            "Implemented Google Maps integration for geospatial data visualization",
            "Built robust ABAC (Attribute-Based Access Control) authorization system"
          ],
          skillsGained: [
            "Full-stack development expertise",
            "Azure cloud services integration",
            "Database design and optimization",
            "Customer requirement analysis",
            "System architecture design"
          ],
          domains: ["Oil & Gas", "Cloud Computing"]
        },
        {
          id: "infosys-developer",
          position: "Software Developer",
          company: "Infosys India",
          period: "May 2018 - Dec 2018",
          location: "Bangalore, India",
          employmentType: "Full-time",
          summary: "Backend developer focused on robotic process automation solutions for retail industry, specializing in workflow automation and process optimization.",
          keyAchievements: [
            "Automated multiple manual processes reducing operational time by 70%",
            "Developed custom automation solutions using Selenium and C#",
            "Analyzed complex business workflows and provided technical estimates",
            "Successfully delivered automation solutions for PLM systems"
          ],
          skillsGained: [
            "Process automation expertise",
            "Workflow analysis and optimization",
            "Selenium automation framework",
            "Business process understanding",
            "Technical estimation and planning"
          ],
          domains: ["Retail", "Process Automation"]
        },
        {
          id: "syntel-junior",
          position: "Junior Software Developer",
          company: "Syntel Pvt Ltd",
          period: "May 2017 - Apr 2018",
          location: "Chennai, India",
          employmentType: "Full-time",
          summary: "Full-stack developer working on enterprise applications for retail and manufacturing domains, gaining experience in legacy system maintenance and modern development practices.",
          keyAchievements: [
            "Maintained and enhanced global retail management systems",
            "Successfully migrated legacy ASP applications to modern frameworks",
            "Implemented comprehensive unit testing for critical business logic",
            "Collaborated with international teams for requirement gathering"
          ],
          skillsGained: [
            "Legacy system maintenance",
            "ASP.NET and Classic ASP development",
            "International team collaboration",
            "Quality assurance practices",
            "Database management"
          ],
          domains: ["Retail & Logistics", "Manufacturing"]
        }
      ];
    }
    
    return res.status(200).json(experiences);
  } catch (error) {
    console.error("Error fetching experience:", error);
    return res.status(500).json({error: "Something went wrong"});
  }
});

// Export the API as a Firebase Cloud Function
exports.api = functions.https.onRequest(app);