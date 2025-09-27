import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface Project {
  id: number;
  name: string;
  organization: string;
  company?: string;
  period: string;
  domains: string;
  domain?: string;
  description?: string;
  responsibilities: string[];
  tasks: string[];
  technologies: string[];
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
  
  // Mock data for fallback
  private mockProjects: Project[] = [
    {
      id: 1,
      name: 'Predictive Portal',
      organization: 'Nitor Infotech, An Ascendion company',
      company: 'Nitor Infotech, An Ascendion company',
      period: 'March 2020 - Present',
      domains: 'Manufacturing',
      domain: 'Manufacturing',
      description: 'A predictive analytics portal for manufacturing industry.',
      responsibilities: [
        'Worked as individual contributor for Angular technology',
        'Analyzed figma designs and converted into Angular code'
      ],
      tasks: [],
      technologies: ['Angular 9-14', 'TypeScript', 'Docker', 'SonarQube', 'Figma']
    },
    {
      id: 2,
      name: 'Health and Safety for Petroleum Company',
      organization: 'Nitor Infotech Pvt Ltd',
      company: 'Nitor Infotech Pvt Ltd',
      period: 'Jan 2019 - Feb 2020',
      domains: 'Oil & Gas',
      domain: 'Oil & Gas',
      description: 'A health and safety application for petroleum company.',
      responsibilities: [
        'Worked as full stack developer',
        'Used .NET framework 4.5 for backend APIs with Azure services'
      ],
      tasks: [],
      technologies: ['Angular 5-9', 'TypeScript', '.NET Framework', 'Azure', 'SQL server']
    },
    {
      id: 3,
      name: 'Robotic Process Automation for PLM',
      organization: 'Infosys India',
      company: 'Infosys India',
      period: 'May 2018 - Dec 2018',
      domains: 'Retail',
      domain: 'Retail',
      description: 'Automation solution for retail product lifecycle management.',
      responsibilities: [
        'Worked as backend developer for this project',
        'Used Selenium with C# for custom code block in proprietary software'
      ],
      tasks: [],
      technologies: ['Selenium', 'C#', 'PostgreSQL', 'RabbitMQ']
    }
  ];

  constructor(private http: HttpClient) { }

  /**
   * Get all projects or filtered projects
   */
  getProjects(filter?: ProjectFilter): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`).pipe(
      map(projects => this.filterProjects(projects, filter)),
      catchError(error => {
        console.error('Error fetching projects:', error);
        // Return mock data if API fails
        return of(this.filterProjects(this.mockProjects, filter));
      })
    );
  }
  
  /**
   * Get available domains for filtering
   */
  getAvailableDomains(): Observable<string[]> {
    return this.getProjects().pipe(
      map(projects => {
        const domains = projects.map(project => project.domain || project.domains);
        return [...new Set(domains)]; // Remove duplicates
      })
    );
  }
  
  /**
   * Get available technologies for filtering
   */
  getAvailableTechnologies(): Observable<string[]> {
    return this.getProjects().pipe(
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
      if (filter.domain && project.domain !== filter.domain && project.domains !== filter.domain) {
        return false;
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