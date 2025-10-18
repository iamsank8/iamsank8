import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface WorkExperience {
  id: string;
  position: string;
  company: string;
  period: string;
  location?: string;
  employmentType: string;
  summary: string;
  keyAchievements: string[];
  skillsGained: string[];
  domains: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private apiUrl = environment.apiUrl;

  // Mock data for fallback
  private mockExperiences: WorkExperience[] = [
    {
      id: 'nitor-senior',
      position: 'Senior Software Engineer',
      company: 'Nitor Infotech, An Ascendion company',
      period: 'March 2020 - Present',
      location: 'Pune, India',
      employmentType: 'Full-time',
      summary: 'Leading frontend development initiatives with Angular technology stack, focusing on manufacturing domain solutions and enterprise-grade applications.',
      keyAchievements: [
        'Successfully delivered multiple Angular applications from version 9 to 14',
        'Implemented comprehensive unit testing strategy achieving 85%+ code coverage',
        'Collaborated with cross-functional teams to deliver client solutions on time',
        'Mentored junior developers and contributed to code quality improvements'
      ],
      skillsGained: [
        'Advanced Angular development',
        'Enterprise application architecture',
        'Client communication and requirement gathering',
        'Code quality and testing best practices',
        'Docker containerization'
      ],
      domains: ['Manufacturing', 'Enterprise Software']
    },
    {
      id: 'nitor-software-engineer',
      position: 'Software Engineer',
      company: 'Nitor Infotech Pvt Ltd',
      period: 'Jan 2019 - Feb 2020',
      location: 'Pune, India',
      employmentType: 'Full-time',
      summary: 'Full-stack developer specializing in Angular frontend and .NET backend development for oil & gas industry applications.',
      keyAchievements: [
        'Designed and developed scalable backend APIs using .NET Framework 4.5',
        'Integrated Azure cloud services for enhanced application performance',
        'Implemented Google Maps integration for geospatial data visualization',
        'Built robust ABAC (Attribute-Based Access Control) authorization system'
      ],
      skillsGained: [
        'Full-stack development expertise',
        'Azure cloud services integration',
        'Database design and optimization',
        'Customer requirement analysis',
        'System architecture design'
      ],
      domains: ['Oil & Gas', 'Cloud Computing']
    },
    {
      id: 'infosys-developer',
      position: 'Software Developer',
      company: 'Infosys India',
      period: 'May 2018 - Dec 2018',
      location: 'Bangalore, India',
      employmentType: 'Full-time',
      summary: 'Backend developer focused on robotic process automation solutions for retail industry, specializing in workflow automation and process optimization.',
      keyAchievements: [
        'Automated multiple manual processes reducing operational time by 70%',
        'Developed custom automation solutions using Selenium and C#',
        'Analyzed complex business workflows and provided technical estimates',
        'Successfully delivered automation solutions for PLM systems'
      ],
      skillsGained: [
        'Process automation expertise',
        'Workflow analysis and optimization',
        'Selenium automation framework',
        'Business process understanding',
        'Technical estimation and planning'
      ],
      domains: ['Retail', 'Process Automation']
    },
    {
      id: 'syntel-junior',
      position: 'Junior Software Developer',
      company: 'Syntel Pvt Ltd',
      period: 'May 2017 - Apr 2018',
      location: 'Chennai, India',
      employmentType: 'Full-time',
      summary: 'Full-stack developer working on enterprise applications for retail and manufacturing domains, gaining experience in legacy system maintenance and modern development practices.',
      keyAchievements: [
        'Maintained and enhanced global retail management systems',
        'Successfully migrated legacy ASP applications to modern frameworks',
        'Implemented comprehensive unit testing for critical business logic',
        'Collaborated with international teams for requirement gathering'
      ],
      skillsGained: [
        'Legacy system maintenance',
        'ASP.NET and Classic ASP development',
        'International team collaboration',
        'Quality assurance practices',
        'Database management'
      ],
      domains: ['Retail & Logistics', 'Manufacturing']
    }
  ];

  constructor(private http: HttpClient) { }

  /**
   * Get all work experiences
   */
  getExperiences(): Observable<WorkExperience[]> {
    // Check if we're using static files (GitHub Pages) or API
    const isStaticMode = this.apiUrl.includes('/assets');
    const url = isStaticMode ? `${this.apiUrl}/experience.json` : `${this.apiUrl}/experience`;
    
    return this.http.get<WorkExperience[]>(url).pipe(
      catchError(error => {
        console.error('Error fetching experiences:', error);
        // Return mock data if API fails
        return of(this.mockExperiences);
      })
    );
  }

  /**
   * Get experience by ID
   */
  getExperienceById(id: string): Observable<WorkExperience | undefined> {
    // For static mode, get all experiences and filter by ID
    const isStaticMode = this.apiUrl.includes('/assets');
    
    if (isStaticMode) {
      return this.getExperiences().pipe(
        map(experiences => experiences.find(exp => exp.id === id)),
        catchError(error => {
          console.error('Error fetching experience:', error);
          const experience = this.mockExperiences.find(exp => exp.id === id);
          return of(experience);
        })
      );
    } else {
      return this.http.get<WorkExperience>(`${this.apiUrl}/experience/${id}`).pipe(
        catchError(error => {
          console.error('Error fetching experience:', error);
          // Return mock data if API fails
          const experience = this.mockExperiences.find(exp => exp.id === id);
          return of(experience);
        })
      );
    }
  }

  /**
   * Get total years of experience
   */
  getTotalExperience(): number {
    const currentYear = new Date().getFullYear();
    const startYear = 2017; // Based on the earliest job start date
    return currentYear - startYear;
  }

  /**
   * Get unique companies
   */
  getUniqueCompanies(): Observable<string[]> {
    return this.getExperiences().pipe(
      map(experiences => {
        const companies = experiences.map(exp => exp.company);
        return [...new Set(companies)];
      }),
      catchError(() => {
        const companies = this.mockExperiences.map(exp => exp.company);
        return of([...new Set(companies)]);
      })
    );
  }

  /**
   * Get unique domains from experience
   */
  getUniqueDomains(): Observable<string[]> {
    return this.getExperiences().pipe(
      map(experiences => {
        const domains: string[] = [];
        experiences.forEach(exp => domains.push(...exp.domains));
        return [...new Set(domains)];
      }),
      catchError(() => {
        const domains: string[] = [];
        this.mockExperiences.forEach(exp => domains.push(...exp.domains));
        return of([...new Set(domains)]);
      })
    );
  }

  /**
   * Get top skills from all experiences
   */
  getTopSkills(): Observable<string[]> {
    return this.getExperiences().pipe(
      map(experiences => {
        const skillCount = new Map<string, number>();
        
        experiences.forEach(exp => {
          exp.skillsGained.forEach(skill => {
            skillCount.set(skill, (skillCount.get(skill) || 0) + 1);
          });
        });

        return Array.from(skillCount.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 8)
          .map(entry => entry[0]);
      }),
      catchError(() => {
        const skillCount = new Map<string, number>();
        
        this.mockExperiences.forEach(exp => {
          exp.skillsGained.forEach(skill => {
            skillCount.set(skill, (skillCount.get(skill) || 0) + 1);
          });
        });

        const topSkills = Array.from(skillCount.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 8)
          .map(entry => entry[0]);
        
        return of(topSkills);
      })
    );
  }
}