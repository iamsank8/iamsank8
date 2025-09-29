const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Load data from JSON files
const loadJsonData = (filename) => {
  try {
    const filePath = path.join(__dirname, '..', 'data', filename);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    return [];
  }
};

// Projects API endpoint
app.get('/api/projects', (req, res) => {
  const projects = loadJsonData('projects.json');
  res.json(projects);
});

// Skills API endpoint
app.get('/api/skills', (req, res) => {
  const skills = loadJsonData('skills.json');
  res.json(skills);
});

// Experience API endpoint
app.get('/api/experience', (req, res) => {
  const experiences = loadJsonData('experience.json');
  res.json(experiences);
});

// Education API endpoint
app.get('/api/education', (req, res) => {
  const education = loadJsonData('education.json');
  res.json(education);
});

// About API endpoint
app.get('/api/about', (req, res) => {
  const about = loadJsonData('about.json');
  res.json(about);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    endpoints: ['/api/projects', '/api/skills', '/api/experience', '/api/education', '/api/about']
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Local API server running on http://localhost:${PORT}`);
  console.log(`📊 Available endpoints:`);
  console.log(`   - GET /api/projects`);
  console.log(`   - GET /api/skills`);
  console.log(`   - GET /api/experience`);
  console.log(`   - GET /api/education`);
  console.log(`   - GET /api/about`);
  console.log(`   - GET /api/health`);
});