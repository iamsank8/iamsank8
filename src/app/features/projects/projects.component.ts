import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProjectsService, Project, ProjectFilter } from '../../core/services/projects.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../core/material.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  loading = true;
  error = false;
  
  // Filter options
  availableDomains: string[] = [];
  availableTechnologies: string[] = [];
  
  // Filter form
  filterForm = new FormGroup({
    domain: new FormControl(''),
    technology: new FormControl(''),
    search: new FormControl('')
  });

  constructor(private projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.loadProjects();
    this.loadFilterOptions();
    this.setupFilterListeners();
  }

  loadProjects(filter?: ProjectFilter): void {
    this.loading = true;
    this.projectsService.getProjects(filter).subscribe({
      next: (data) => {
        this.projects = data.map(project => {
          return {
            ...project,
            company: project.organization || project.company,
            domain: project.domains || project.domain,
            description: project.description || `${project.name} project for ${project.domains || project.domain} domain.`
          };
        });
        this.filteredProjects = [...this.projects];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }
  
  loadFilterOptions(): void {
    // Load domains
    this.projectsService.getAvailableDomains().subscribe(domains => {
      this.availableDomains = domains;
    });
    
    // Load technologies
    this.projectsService.getAvailableTechnologies().subscribe(technologies => {
      this.availableTechnologies = technologies;
    });
  }
  
  setupFilterListeners(): void {
    // Listen for form changes
    this.filterForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged((prev, curr) =>
          prev.domain === curr.domain &&
          prev.technology === curr.technology &&
          prev.search === curr.search
        )
      )
      .subscribe(values => {
        this.applyFilters();
      });
  }
  
  applyFilters(): void {
    const filter: ProjectFilter = {
      domain: this.filterForm.get('domain')?.value || undefined,
      technology: this.filterForm.get('technology')?.value || undefined,
      search: this.filterForm.get('search')?.value || undefined
    };
    
    // Only apply filters if at least one is set
    if (filter.domain || filter.technology || filter.search) {
      this.loadProjects(filter);
    } else {
      this.loadProjects();
    }
  }
  
  resetFilters(): void {
    this.filterForm.reset();
    this.loadProjects();
  }
  
  /**
   * Get appropriate icon for project domain
   */
  getProjectIcon(domain: string): string {
    const iconMap: { [key: string]: string } = {
      'Manufacturing': 'precision_manufacturing',
      'Oil & Gas': 'local_gas_station',
      'Retail': 'shopping_cart',
      'Retail & Logistics': 'local_shipping',
      'Healthcare': 'local_hospital',
      'Finance': 'account_balance',
      'Technology': 'computer',
      'Education': 'school'
    };
    return iconMap[domain] || 'work';
  }
  
  /**
   * Extract key technical highlights from responsibilities
   */
  getProjectHighlights(responsibilities: string[]): string[] {
    if (!responsibilities || responsibilities.length === 0) {
      return [];
    }
    
    // Extract the most technical and impactful points
    return responsibilities
      .map(resp => {
        // Extract key technical achievements
        if (resp.includes('Angular') || resp.includes('TypeScript')) {
          return 'Advanced Angular/TypeScript development';
        }
        if (resp.includes('Azure') || resp.includes('cloud')) {
          return 'Cloud services integration';
        }
        if (resp.includes('API') || resp.includes('backend')) {
          return 'Backend API development';
        }
        if (resp.includes('automation') || resp.includes('Selenium')) {
          return 'Process automation solutions';
        }
        if (resp.includes('database') || resp.includes('SQL')) {
          return 'Database design and optimization';
        }
        if (resp.includes('testing') || resp.includes('unit test')) {
          return 'Comprehensive testing implementation';
        }
        return resp.length > 100 ? resp.substring(0, 100) + '...' : resp;
      })
      .slice(0, 3); // Limit to top 3 highlights
  }
  
  /**
   * Get color for technology chips based on technology type
   */
  getTechChipColor(tech: string): string {
    const frontendTechs = ['Angular', 'TypeScript', 'HTML', 'CSS', 'JavaScript', 'jQuery'];
    const backendTechs = ['.NET', 'C#', 'VB.Net', 'ASP.Net', 'MVC'];
    const cloudTechs = ['Azure', 'Docker'];
    const databaseTechs = ['SQL Server', 'PostgreSQL'];
    
    if (frontendTechs.some(t => tech.includes(t))) return 'primary';
    if (backendTechs.some(t => tech.includes(t))) return 'accent';
    if (cloudTechs.some(t => tech.includes(t))) return 'warn';
    if (databaseTechs.some(t => tech.includes(t))) return '';
    
    return 'accent';
  }
  
  /**
   * Get project impact description
   */
  getProjectImpact(project: Project): string {
    const impactMap: { [key: string]: string } = {
      'Predictive Portal': 'Enhanced manufacturing efficiency',
      'Health and Safety': 'Improved workplace safety compliance',
      'Robotic Process Automation': '70% reduction in manual processes',
      'Order Management': 'Global retail system optimization',
      'ECU Flashing': 'Automated firmware update process'
    };
    
    return impactMap[project.name] || '';
  }
}