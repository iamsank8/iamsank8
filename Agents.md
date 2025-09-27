# Portfolio Website Project Documentation

## Project Overview
This project is a personal portfolio website built with Angular and Firebase. It showcases professional experience, skills, education, and projects based on the owner's resume. The website includes a secure API built with Firebase Cloud Functions for serving project and skills data.

## Project Structure

### Frontend (Angular)
- **Angular Version**: Angular 13
- **UI Framework**: Angular Material
- **Styling**: SCSS

### Backend
- **API**: Firebase Cloud Functions
- **Database**: Firestore
- **Hosting**: Firebase Hosting

## Key Components

### Core Components
- **Header**: Navigation component with links to different sections
- **Home/Landing**: Introduction section
- **About**: Profile information based on resume
- **Skills**: Technical skills with proficiency levels
- **Experience**: Professional work experience
- **Education**: Educational qualifications
- **Projects**: Showcase of professional projects
- **Contact**: Contact form

### Services
- **ProjectsService**: Fetches project data from the API
- **SkillsService**: Fetches skills data from the API
- **ContactService**: Handles contact form submissions
- **SecurityService**: Implements security features like CSP

## API Endpoints
- **/projects**: Returns a list of professional projects
- **/skills**: Returns a list of technical skills grouped by category

## Security Measures

### Firestore Security Rules
- Default rule denies all access (principle of least privilege)
- Specific read-only access for projects and skills collections
- Secure contact form submission with data validation
- Protection against unauthorized writes

### API Security
- **CORS Protection**: Strict CORS policy with specific allowed origins
- **Rate Limiting**: 100 requests per IP address per 15 minutes
- **Secure HTTP Headers**: Using Helmet.js for protection against common web vulnerabilities
- **Request Body Limiting**: Limited to 10KB to prevent abuse

### Frontend Security
- **Content Security Policy (CSP)**: Restricts resource loading to trusted sources
- **Secure HTTP Headers**: Protection against XSS, clickjacking, etc.

## Environment Configuration
- **Development**: Uses local API endpoints
  - API URL: `http://localhost:5001/portfolio-sanket-c5165/us-central1/api`
- **Production**: Uses deployed Firebase Functions
  - API URL: `https://us-central1-portfolio-sanket-c5165.cloudfunctions.net/api`

## Firebase Configuration
- **Project ID**: portfolio-sanket-c5165
- **Functions Region**: us-central1
- **Firestore Rules**: Custom rules for secure data access

## Deployment
- Frontend is deployed to Firebase Hosting
- API is deployed as Firebase Cloud Functions
- Firestore database is used for data storage

## Development Workflow
1. Run `ng serve` to start the Angular development server
2. Run `cd api && node server.js` to start the local API server
3. For Firebase Functions development, use `firebase serve --only functions`
4. Deploy with `firebase deploy --only hosting,functions,firestore`

## Recent Improvements
1. Fixed Firebase deployment issues
2. Enhanced security measures:
   - Implemented CORS protection
   - Added rate limiting
   - Configured secure HTTP headers
   - Implemented Content Security Policy
3. Updated environment configuration with correct API URLs
4. Fixed dependency vulnerabilities

## Future Enhancements
1. Add authentication for admin access
2. Implement blog section
3. Add portfolio project filtering
4. Enhance mobile responsiveness
5. Add dark/light theme toggle

## Dependencies
- Angular core packages
- Angular Material
- Firebase/Firestore
- Express (for API)
- Helmet (for security headers)
- Express Rate Limit (for API protection)

This documentation provides a comprehensive overview of the portfolio website project, its structure, components, security measures, and development workflow.