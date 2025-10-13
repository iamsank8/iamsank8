import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SkillsService, SkillCategory, SkillItem } from '../../core/services/skills.service';
import { CommonModule } from '@angular/common';
import { PrimeNGModule } from '../../core/primeng.module';

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
  imports: [CommonModule, PrimeNGModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [];
  skillCategories: SkillCategory[] = [];
  categories = [
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'database', name: 'Database' },
    { id: 'devops', name: 'DevOps & Cloud' },
    { id: 'ai', name: 'AI & ML' },
    { id: 'uiux', name: 'UI/UX' },
    { id: 'security', name: 'Security' }
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
      case 'devops & cloud': return 'devops';
      case 'ai & ml': return 'ai';
      case 'ui/ux': return 'uiux';
      case 'security': return 'security';
      default: return 'frontend'; // Default to frontend instead of 'other'
    }
  }

  loadLocalSkills(): void {
    // Minimal fallback data if API fails - encourage using API
    console.warn('Skills API failed, using minimal fallback data. Please check API connection.');
    this.skills = [
      { name: 'Angular', level: 90, category: 'frontend' },
      { name: 'TypeScript', level: 85, category: 'frontend' },
      { name: 'C#', level: 85, category: 'backend' },
      { name: 'SQL Server', level: 85, category: 'database' },
      { name: 'Azure', level: 75, category: 'devops' }
    ];
  }

  getSkillsByCategory(category: string): Skill[] {
    return this.skills.filter(skill => skill.category === category);
  }

  // New methods for enhanced UI
  getTotalSkills(): number {
    return this.skills.length;
  }

  getExpertSkills(): number {
    return this.skills.filter(skill => skill.level >= 85).length;
  }

  getCategoryIcon(categoryId: string): string {
    const icons: { [key: string]: string } = {
      'frontend': 'pi-desktop',
      'backend': 'pi-server',
      'database': 'pi-database',
      'devops': 'pi-cloud',
      'ai': 'pi-bolt',
      'uiux': 'pi-palette',
      'security': 'pi-shield'
    };
    return icons[categoryId] || 'pi-code';
  }

  getCategoryAverage(categoryId: string): number {
    const categorySkills = this.getSkillsByCategory(categoryId);
    if (categorySkills.length === 0) return 0;
    
    const total = categorySkills.reduce((sum, skill) => sum + skill.level, 0);
    return Math.round(total / categorySkills.length);
  }

  getSkillLevelText(level: number): string {
    if (level >= 85) return 'Expert';
    if (level >= 70) return 'Advanced';
    if (level >= 50) return 'Intermediate';
    return 'Beginner';
  }

  getSkillsByLevel(levelType: string): Skill[] {
    switch (levelType) {
      case 'expert':
        return this.skills.filter(skill => skill.level >= 85);
      case 'advanced':
        return this.skills.filter(skill => skill.level >= 70 && skill.level < 85);
      case 'intermediate':
        return this.skills.filter(skill => skill.level >= 50 && skill.level < 70);
      default:
        return [];
    }
  }

  // TrackBy functions for performance
  trackByCategory(index: number, category: any): string {
    return category.id;
  }

  trackBySkill(index: number, skill: Skill): string {
    return skill.name;
  }
}