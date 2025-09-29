import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface PersonalInfo {
  fullName: string;
  title: string;
  tagline: string;
  email: string;
  nationality: string;
  languages: string[];
  adaptability: string;
}

export interface Stats {
  yearsExperience: string;
  projectsCompleted: string;
  technologies: string;
}

export interface ProfessionalSummaryItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Certification {
  id: string;
  title: string;
  year: string;
  description: string;
  icon: string;
}

export interface AboutData {
  personalInfo: PersonalInfo;
  stats: Stats;
  mission: string;
  professionalSummary: ProfessionalSummaryItem[];
  certifications: Certification[];
}

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private apiUrl = environment.apiUrl;

  // Mock data for fallback
  private mockAboutData: AboutData = {
    personalInfo: {
      fullName: "Sanket Ashokrao Thotange",
      title: "Senior Team Lead at Nitor Infotech",
      tagline: "Passionate Full Stack Developer & AI Enthusiast",
      email: "sanketat@gmail.com",
      nationality: "Indian",
      languages: ["English", "Hindi", "Marathi"],
      adaptability: "Fast-changing skills & work environments"
    },
    stats: {
      yearsExperience: "9+",
      projectsCompleted: "50+",
      technologies: "15+"
    },
    mission: "To enhance my working capacities, professional skills, and business efficiencies while serving my organization with sheer determination and commitment. I am passionate about learning and implementing cutting-edge tools & techniques to maximize efficiency, overcome challenges, and drive innovation in competitive environments.",
    professionalSummary: [
      {
        id: "full-stack-development",
        icon: "pi-code",
        title: "Full Stack Development",
        description: "9+ years of experience in Analysis, Design and Development of Full stack applications using modern technologies and best practices."
      },
      {
        id: "team-leadership",
        icon: "pi-users",
        title: "Team Leadership",
        description: "Currently working as Senior Team Lead at Nitor Infotech, an Ascendion company, leading development teams and driving project success."
      },
      {
        id: "technical-expertise",
        icon: "pi-cog",
        title: "Technical Expertise",
        description: "Strong skills with Angular 2+, TypeScript, HTML5, CSS3, jQuery, C#, MVC, ASP.Net, Web Services, and Entity Framework."
      },
      {
        id: "problem-solving",
        icon: "pi-exclamation-triangle",
        title: "Problem Solving",
        description: "Extensive experience in debugging, root cause analysis, and defect resolution with strong analytical and conceptual skills."
      },
      {
        id: "database-design",
        icon: "pi-database",
        title: "Database Design",
        description: "Strong analytical skills in database design, heavily involved in designing and developing database schemas and database objects."
      },
      {
        id: "ai-enthusiast",
        icon: "pi-lightbulb",
        title: "AI Enthusiast",
        description: "Worked with AI ML (small language models) on local machine and completed courses on Prompt engineering and context providing for AI tools."
      }
    ],
    certifications: [
      {
        id: "prompt-engineering",
        title: "Prompt Engineering",
        year: "2023",
        description: "Completed courses on Prompt engineering and context providing for AI tools.",
        icon: "pi-verified"
      },
      {
        id: "ai-ml-integration",
        title: "AI/ML Integration",
        year: "2022",
        description: "Worked with AI ML (small language models) on local machine and experimented with different IDEs which support local integration.",
        icon: "pi-verified"
      }
    ]
  };

  constructor(private http: HttpClient) { }

  /**
   * Get complete about data
   */
  getAboutData(): Observable<AboutData> {
    return this.http.get<AboutData>(`${this.apiUrl}/about`).pipe(
      map((response: any) => response[0] as AboutData),
      catchError(error => {
        console.error('Error fetching about data:', error);
        // Return mock data if API fails
        return of(this.mockAboutData);
      })
    );
  }

  /**
   * Get personal information
   */
  getPersonalInfo(): Observable<PersonalInfo> {
    return this.getAboutData().pipe(
      map(data => data.personalInfo),
      catchError(error => {
        console.error('Error fetching personal info:', error);
        return of(this.mockAboutData.personalInfo);
      })
    );
  }

  /**
   * Get statistics
   */
  getStats(): Observable<Stats> {
    return this.getAboutData().pipe(
      map(data => data.stats),
      catchError(error => {
        console.error('Error fetching stats:', error);
        return of(this.mockAboutData.stats);
      })
    );
  }

  /**
   * Get mission statement
   */
  getMission(): Observable<string> {
    return this.getAboutData().pipe(
      map(data => data.mission),
      catchError(error => {
        console.error('Error fetching mission:', error);
        return of(this.mockAboutData.mission);
      })
    );
  }

  /**
   * Get professional summary
   */
  getProfessionalSummary(): Observable<ProfessionalSummaryItem[]> {
    return this.getAboutData().pipe(
      map(data => data.professionalSummary),
      catchError(error => {
        console.error('Error fetching professional summary:', error);
        return of(this.mockAboutData.professionalSummary);
      })
    );
  }

  /**
   * Get certifications
   */
  getCertifications(): Observable<Certification[]> {
    return this.getAboutData().pipe(
      map(data => data.certifications),
      catchError(error => {
        console.error('Error fetching certifications:', error);
        return of(this.mockAboutData.certifications);
      })
    );
  }

  /**
   * Calculate total years of experience dynamically
   */
  calculateTotalExperience(): number {
    const currentYear = new Date().getFullYear();
    const startYear = 2017; // Based on the earliest job start date
    return currentYear - startYear;
  }
}