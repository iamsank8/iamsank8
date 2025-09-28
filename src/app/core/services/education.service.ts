import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface Education {
  id: string;
  degree: string;
  year: string;
  institution: string;
  board: string;
  percentage: string;
  type: string;
  description?: string;
}

export interface Certification {
  id: string;
  title: string;
  year: string;
  description: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private apiUrl = environment.apiUrl;

  // Mock data for fallback
  private mockEducations: Education[] = [
    {
      id: 'be-computer-science',
      degree: 'B.E (Computer Science)',
      year: '2015',
      institution: 'Sipna College of Engineering & Technology, Amravati',
      board: 'SGBAU',
      percentage: '64.12',
      type: 'degree',
      description: 'Bachelor of Engineering in Computer Science with focus on software development, algorithms, and system design.'
    },
    {
      id: 'hsc',
      degree: 'XII',
      year: '2011',
      institution: 'Samarth Junior College, Amravati',
      board: 'MH',
      percentage: '62.17',
      type: 'higher-secondary',
      description: 'Higher Secondary Certificate with Science stream focusing on Mathematics, Physics, and Chemistry.'
    },
    {
      id: 'ssc',
      degree: 'X',
      year: '2009',
      institution: 'Narayandas Laddha High School, Amravati',
      board: 'MH',
      percentage: '84.85',
      type: 'secondary',
      description: 'Secondary School Certificate with excellent academic performance.'
    }
  ];

  private mockCertifications: Certification[] = [
    {
      id: 'prompt-engineering',
      title: 'Prompt Engineering',
      year: '2023',
      description: 'Completed courses on Prompt engineering and context providing for AI tools.',
      icon: 'pi-verified'
    },
    {
      id: 'ai-ml-integration',
      title: 'AI/ML Integration',
      year: '2022',
      description: 'Worked with AI ML (small language models) on local machine and experimented with different IDEs which support local integration.',
      icon: 'pi-verified'
    }
  ];

  constructor(private http: HttpClient) { }

  /**
   * Get all education records
   */
  getEducations(): Observable<Education[]> {
    return this.http.get<Education[]>(`${this.apiUrl}/education`).pipe(
      catchError(error => {
        console.error('Error fetching education:', error);
        // Return mock data if API fails
        return of(this.mockEducations);
      })
    );
  }

  /**
   * Get education by ID
   */
  getEducationById(id: string): Observable<Education | undefined> {
    return this.getEducations().pipe(
      map(educations => educations.find(edu => edu.id === id)),
      catchError(error => {
        console.error('Error fetching education by ID:', error);
        const education = this.mockEducations.find(edu => edu.id === id);
        return of(education);
      })
    );
  }

  /**
   * Get certifications (hardcoded for now, can be moved to API later)
   */
  getCertifications(): Observable<Certification[]> {
    // For now, return mock data. This can be moved to API later if needed
    return of(this.mockCertifications);
  }

  /**
   * Get education by type
   */
  getEducationByType(type: string): Observable<Education[]> {
    return this.getEducations().pipe(
      map(educations => educations.filter(edu => edu.type === type)),
      catchError(error => {
        console.error('Error fetching education by type:', error);
        const filteredEducations = this.mockEducations.filter(edu => edu.type === type);
        return of(filteredEducations);
      })
    );
  }

  /**
   * Get highest qualification
   */
  getHighestQualification(): Observable<Education | undefined> {
    return this.getEducations().pipe(
      map(educations => {
        // Assuming the first education record is the highest qualification
        return educations.find(edu => edu.type === 'degree') || educations[0];
      }),
      catchError(error => {
        console.error('Error fetching highest qualification:', error);
        const highest = this.mockEducations.find(edu => edu.type === 'degree') || this.mockEducations[0];
        return of(highest);
      })
    );
  }
}