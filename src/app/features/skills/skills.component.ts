import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SkillsService, SkillCategory, SkillItem } from '../../core/services/skills.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../core/material.module';

interface Skill {
  name: string;
  level: number;
  category: string;
}

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [];
  skillCategories: SkillCategory[] = [];
  categories = [
    { id: 'frontend', name: 'Frontend Technologies' },
    { id: 'backend', name: 'Backend Technologies' },
    { id: 'database', name: 'Database Technologies' },
    { id: 'cloud', name: 'Cloud & DevOps' },
    { id: 'other', name: 'Other Skills' }
  ];
  loading = true;
  error = false;

  constructor(private skillsService: SkillsService) { }

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills(): void {
    this.skillsService.getSkills().subscribe({
      next: (data) => {
        this.skillCategories = data;
        this.mapSkillsFromCategories();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching skills:', err);
        this.error = true;
        this.loading = false;
        
        // Fallback to local data if API fails
        this.loadLocalSkills();
      }
    });
  }

  mapSkillsFromCategories(): void {
    this.skills = [];
    this.skillCategories.forEach(category => {
      const categoryId = this.getCategoryId(category.category);
      category.items.forEach(item => {
        this.skills.push({
          name: item.name,
          level: item.level,
          category: categoryId
        });
      });
    });
  }

  getCategoryId(categoryName: string): string {
    switch(categoryName.toLowerCase()) {
      case 'frontend': return 'frontend';
      case 'backend': return 'backend';
      case 'database': return 'database';
      case 'devops & tools': return 'cloud';
      case 'ai & ml': return 'other';
      default: return 'other';
    }
  }

  loadLocalSkills(): void {
    // Fallback data if API fails
    this.skills = [
      // Frontend
      { name: 'Angular 2+', level: 90, category: 'frontend' },
      { name: 'TypeScript', level: 85, category: 'frontend' },
      { name: 'HTML5', level: 90, category: 'frontend' },
      { name: 'CSS3', level: 85, category: 'frontend' },
      { name: 'jQuery', level: 80, category: 'frontend' },
      
      // Backend
      { name: 'C#', level: 85, category: 'backend' },
      { name: 'ASP.NET', level: 80, category: 'backend' },
      { name: 'Entity Framework', level: 75, category: 'backend' },
      { name: 'Web Services', level: 80, category: 'backend' },
      { name: '.NET Framework', level: 80, category: 'backend' },
      
      // Database
      { name: 'SQL Server', level: 85, category: 'database' },
      { name: 'PostgreSQL', level: 75, category: 'database' },
      { name: 'Database Design', level: 80, category: 'database' },
      
      // Cloud & DevOps
      { name: 'Azure', level: 70, category: 'cloud' },
      { name: 'Docker', level: 65, category: 'cloud' },
      { name: 'SonarQube', level: 75, category: 'cloud' },
      
      // Other
      { name: 'Debugging', level: 85, category: 'other' },
      { name: 'AI/ML Integration', level: 70, category: 'other' },
      { name: 'Prompt Engineering', level: 75, category: 'other' }
    ];
  }

  getSkillsByCategory(category: string): Skill[] {
    return this.skills.filter(skill => skill.category === category);
  }
}