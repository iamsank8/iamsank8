import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface Project {
  id: string;
  name: string;
  organization: string;
  company?: string;
  period: string;
  domains: string[] | string;
  domain?: string;
  description?: string;
  responsibilities: string[];
  tasks: string[];
  technologies: string[];
  achievements?: string[];
  status?: string;
  featured?: boolean;
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

export interface ProjectFilter {
  domain?: string;
  technology?: string;
  search?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private apiUrl = environment.apiUrl;
  private projectsCache$: Observable<Project[]> | null = null;
  private projectsSubject = new BehaviorSubject<Project[]>([]);
  
  // Mock data for fallback - updated to match new structure
  private mockProjects: Project[] = [
    {
      id: 'predictive-portal',
      name: 'Predictive Portal',
      organization: 'Nitor Infotech, An Ascendion company',
      company: 'Nitor Infotech, An Ascendion company',
      period: 'March 2020 - Present',
      domains: ['Manufacturing', 'Analytics'],
      domain: 'Manufacturing',
      description: 'A comprehensive predictive analytics platform for manufacturing operations, providing real-time insights and forecasting capabilities.',
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
      technologies: ['Angular 9-14', 'TypeScript', 'Docker', 'SonarQube', 'Figma'],
      achievements: [
        'Improved application performance by 40%',
        'Reduced code defects by implementing comprehensive testing',
        'Enhanced user experience through responsive design implementation'
      ],
      status: 'Active',
      featured: true
    },
    {
      id: 'health-safety-petroleum',
      name: 'Health and Safety for Petroleum Company',
      organization: 'Nitor Infotech Pvt Ltd',
      company: 'Nitor Infotech Pvt Ltd',
      period: 'Jan 2019 - Feb 2020',
      domains: ['Oil & Gas', 'Safety Management'],
      domain: 'Oil & Gas',
      description: 'A comprehensive health and safety management system for petroleum operations, ensuring compliance and risk management.',
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
      technologies: ['Angular 5-9', 'TypeScript', '.NET Framework', 'Azure', 'SQL Server'],
      achievements: [
        'Successfully delivered project on time and within budget',
        'Implemented scalable architecture handling large datasets',
        'Received positive client feedback for user-friendly interface'
      ],
      status: 'Completed',
      featured: true
    },
    {
      id: 'portfolio-website',
      name: 'Personal Portfolio Website',
      organization: 'Personal Project',
      period: '2024 - Present',
      domains: ['Web Development', 'Personal Branding'],
      description: 'A modern, responsive portfolio website built with Angular and Firebase, showcasing professional experience and projects.',
      responsibilities: [
        'Full-stack development using Angular and Firebase',
        'Implemented secure API with Firebase Cloud Functions',
        'Designed responsive UI with PrimeNG',
        'Implemented security best practices including CSP and CORS',
        'Set up CI/CD pipeline with Firebase Hosting'
      ],
      tasks: [
        'Requirements analysis and planning',
        'UI/UX design and implementation',
        'Backend API development',
        'Security implementation',
        'Performance optimization',
        'Deployment and maintenance'
      ],
      technologies: ['Angular 17', 'TypeScript', 'Firebase', 'PrimeNG', 'SCSS'],
      achievements: [
        'Achieved 95+ Lighthouse performance score',
        'Implemented comprehensive security measures',
        'Created reusable component library'
      ],
      status: 'Active',
      featured: true,
      githubUrl: 'https://github.com/username/portfolio',
      liveUrl: 'https://portfolio-sanket-c5165.web.app'
    }
  ];

  constructor(private http: HttpClient) { }

  /**
   * Get all projects from cache or API
   */
  private getAllProjects(): Observable<Project[]> {
    if (!this.projectsCache$) {
      this.projectsCache$ = this.http.get<Project[]>(`${this.apiUrl}/projects`).pipe(
        tap(projects => this.projectsSubject.next(projects)),
        catchError(error => {
          console.error('Error fetching projects:', error);
          // Return mock data if API fails
          const mockData = this.mockProjects;
          this.projectsSubject.next(mockData);
          return of(mockData);
        }),
        shareReplay(1) // Cache the result
      );
    }
    return this.projectsCache$;
  }

  /**
   * Get all projects or filtered projects
   */
  getProjects(filter?: ProjectFilter): Observable<Project[]> {
    return this.getAllProjects().pipe(
      map(projects => this.filterProjects(projects, filter))
    );
  }
  
  /**
   * Get available domains for filtering
   */
  getAvailableDomains(): Observable<string[]> {
    return this.getAllProjects().pipe(
      map(projects => {
        const domains: string[] = [];
        projects.forEach(project => {
          if (Array.isArray(project.domains)) {
            domains.push(...project.domains);
          } else if (typeof project.domains === 'string') {
            domains.push(project.domains);
          }
          if (project.domain) {
            domains.push(project.domain);
          }
        });
        return [...new Set(domains)]; // Remove duplicates
      })
    );
  }
  
  /**
   * Get available technologies for filtering
   */
  getAvailableTechnologies(): Observable<string[]> {
    return this.getAllProjects().pipe(
      map(projects => {
        // Flatten all technology arrays and remove duplicates
        const technologies = projects.flatMap(project => project.technologies);
        return [...new Set(technologies)];
      })
    );
  }
  
  /**
   * Filter projects based on criteria
   */
  private filterProjects(projects: Project[], filter?: ProjectFilter): Project[] {
    if (!filter) {
      return projects;
    }
    
    return projects.filter(project => {
      // Filter by domain
      if (filter.domain) {
        const projectDomains = Array.isArray(project.domains) ? project.domains : [project.domains];
        const hasMatchingDomain = projectDomains.includes(filter.domain) || project.domain === filter.domain;
        if (!hasMatchingDomain) {
          return false;
        }
      }
      
      // Filter by technology
      if (filter.technology && !project.technologies.includes(filter.technology)) {
        return false;
      }
      
      // Filter by search term
      if (filter.search) {
        const searchTerm = filter.search.toLowerCase();
        const nameMatch = project.name.toLowerCase().includes(searchTerm);
        const descMatch = project.description?.toLowerCase().includes(searchTerm) || false;
        const orgMatch = project.organization.toLowerCase().includes(searchTerm);
        
        if (!nameMatch && !descMatch && !orgMatch) {
          return false;
        }
      }
      
      return true;
    });
  }
}