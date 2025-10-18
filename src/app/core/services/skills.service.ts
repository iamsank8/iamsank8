import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface SkillItem {
  name: string;
  level: number;
  yearsOfExperience?: number;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getSkills(): Observable<SkillCategory[]> {
    // Check if we're using static files (GitHub Pages) or API
    const isStaticMode = this.apiUrl.includes('/assets');
    const url = isStaticMode ? `${this.apiUrl}/skills.json` : `${this.apiUrl}/skills`;
    
    return this.http.get<SkillCategory[]>(url);
  }
}