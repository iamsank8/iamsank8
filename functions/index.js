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

// Projects API endpoint
app.get("/projects", async (req, res) => {
  try {
    const projectsSnapshot = await admin.firestore()
        .collection("projects").get();
    const projects = [];

    projectsSnapshot.forEach((doc) => {
      projects.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({error: "Something went wrong"});
  }
});

// Skills API endpoint
app.get("/skills", async (req, res) => {
  try {
    const skillsSnapshot = await admin.firestore().collection("skills").get();
    const skills = [];

    skillsSnapshot.forEach((doc) => {
      skills.push(doc.data());
    });

    return res.status(200).json(skills);
  } catch (error) {
    console.error("Error fetching skills:", error);
    return res.status(500).json({error: "Something went wrong"});
  }
});

// Export the API as a Firebase Cloud Function
exports.api = functions.https.onRequest(app);
