const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cache = require("memory-cache");

// Initialize Firebase Admin
admin.initializeApp();

// Initialize Express app
const app = express();

// Trust proxy for Firebase Functions (required for rate limiting)
app.set("trust proxy", true);

// Security middleware
// Configure CORS with specific origins
const allowedOrigins = [
  "http://localhost:4200",
  "https://portfolio-sanket-c5165.web.app",
  "https://portfolio-sanket-c5165.firebaseapp.com",
  "https://iamsank8.web.app",
  "https://iamsank8.firebaseapp.com",
];

// Function to check if origin is a Firebase preview URL
const isFirebasePreviewUrl = (origin) => {
  return origin && (
    origin.includes("portfolio-sanket-c5165--") ||
    origin.includes("iamsank8--")
  ) && origin.includes(".web.app");
};

const corsOptions = {
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests,
    // server-to-server)
    if (!origin || origin === undefined) {
      return callback(null, true);
    }
    if (allowedOrigins.indexOf(origin) !== -1 || isFirebasePreviewUrl(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: [
    "Content-Type", "Authorization", "Accept", "X-Requested-With",
    "Cache-Control", "Pragma", "Priority", "Sec-CH-UA", "Sec-CH-UA-Mobile",
    "Sec-CH-UA-Platform", "Sec-Fetch-Dest", "Sec-Fetch-Mode",
    "Sec-Fetch-Site", "User-Agent", "Accept-Language",
  ],
  exposedHeaders: [
    "X-Cache", "X-RateLimit-Limit", "X-RateLimit-Remaining",
  ],
  optionsSuccessStatus: 204,
  credentials: false,
  preflightContinue: false,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Apply Helmet for secure HTTP headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://apis.google.com", "https://www.googletagmanager.com", "https://www.google-analytics.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://www.google-analytics.com", "https://storage.googleapis.com"],
      connectSrc: ["'self'", "https://www.google-analytics.com"],
    },
  },
  xssFilter: true,
  noSniff: true,
  frameguard: {action: "deny"},
}));

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

// Cache middleware
const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    const key = "__express__" + req.originalUrl || req.url;
    const cachedBody = cache.get(key);

    if (cachedBody) {
      res.set("X-Cache", "HIT");
      res.send(cachedBody);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        cache.put(key, body, duration * 1000);
        res.set("X-Cache", "MISS");
        res.sendResponse(body);
      };
      next();
    }
  };
};

// Projects API endpoint with 1-hour cache
app.get("/projects", cacheMiddleware(3600), async (req, res) => {
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

// Skills API endpoint with 1-hour cache
app.get("/skills", cacheMiddleware(3600), async (req, res) => {
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

// Cache invalidation endpoint (admin only)
app.post("/admin/cache/clear", async (req, res) => {
  try {
    // In a real app, this would have authentication
    // For now, we'll just clear the cache
    cache.clear();
    return res.status(200).json({message: "Cache cleared successfully"});
  } catch (error) {
    console.error("Error clearing cache:", error);
    return res.status(500).json({error: "Something went wrong"});
  }
});

// Export the API as a Firebase Cloud Function
exports.api = functions.https.onRequest(app);
