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

// Helper function to parse start date from period string
const parseStartDate = (period) => {
  try {
    // Extract the start date part (before the dash)
    const startDateStr = period.split(' - ')[0].trim();
    
    // Handle different date formats
    const monthYearMatch = startDateStr.match(/^(\w+)\s+(\d{4})$/);
    if (monthYearMatch) {
      const [, monthStr, yearStr] = monthYearMatch;
      const monthMap = {
        'january': 0, 'jan': 0,
        'february': 1, 'feb': 1,
        'march': 2, 'mar': 2,
        'april': 3, 'apr': 3,
        'may': 4,
        'june': 5, 'jun': 5,
        'july': 6, 'jul': 6,
        'august': 7, 'aug': 7,
        'september': 8, 'sep': 8,
        'october': 9, 'oct': 9,
        'november': 10, 'nov': 10,
        'december': 11, 'dec': 11
      };
      
      const month = monthMap[monthStr.toLowerCase()];
      const year = parseInt(yearStr, 10);
      
      if (month !== undefined && !isNaN(year)) {
        return new Date(year, month, 1);
      }
    }
    
    // Fallback: try to parse as a regular date
    const fallbackDate = new Date(startDateStr);
    if (!isNaN(fallbackDate.getTime())) {
      return fallbackDate;
    }
    
    // If all parsing fails, return a very old date to put it at the end
    console.warn(`Could not parse date: ${startDateStr}`);
    return new Date(1900, 0, 1);
    
  } catch (error) {
    console.error(`Error parsing date from period: ${period}`, error);
    return new Date(1900, 0, 1);
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
  
  // Sort experiences by date (most recent first)
  const sortedExperiences = experiences.sort((a, b) => {
    const dateA = parseStartDate(a.period);
    const dateB = parseStartDate(b.period);
    return dateB.getTime() - dateA.getTime();
  });
  
  res.json(sortedExperiences);
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