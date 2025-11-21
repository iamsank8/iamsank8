import { Component, OnInit, inject } from '@angular/core';
import { ProjectsService, Project, ProjectFilter } from '../../core/services/projects.service';
import { CommonModule } from '@angular/common';
import { PrimeNGModule } from '../../core/primeng.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: true,
  imports: [CommonModule, PrimeNGModule, ReactiveFormsModule],
})
export class ProjectsComponent implements OnInit {
  private readonly projectsService = inject(ProjectsService);
  private readonly seoService = inject(SeoService);

  projects: Project[] = [];
  filteredProjects: Project[] = [];
  loading = true;
  error = false;

  // Filter options
  availableDomains: string[] = [];
  availableTechnologies: string[] = [];
  domainOptions: { label: string; value: string }[] = [];
  technologyOptions: { label: string; value: string }[] = [];

  // Filter form
  filterForm = new FormGroup({
    domain: new FormControl([]),
    technology: new FormControl([]),
    search: new FormControl(''),
  });

  ngOnInit(): void {
    this.seoService.generateTags({
      title: 'Projects',
      description:
        'Explore my portfolio of technical projects, including full-stack applications, cloud solutions, and automation tools.',
      keywords: ['Projects', 'Portfolio', 'Case Studies', 'Angular', '.NET', 'Azure'],
    });
    this.loadProjects();
    this.loadFilterOptions();
    this.setupFilterListeners();
  }

  loadProjects(filter?: ProjectFilter): void {
    this.loading = true;
    this.projectsService.getProjects(filter).subscribe({
      next: (data) => {
        this.projects = data.map((project) => {
          // Handle domains array to string conversion for backward compatibility
          const primaryDomain = Array.isArray(project.domains)
            ? project.domains[0]
            : project.domains || project.domain || '';

          return {
            ...project,
            company: project.organization || project.company,
            domain: primaryDomain,
            description:
              project.description || `${project.name} project for ${primaryDomain} domain.`,
          };
        });
        this.filteredProjects = [...this.projects];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
        this.error = true;
        this.loading = false;
      },
    });
  }

  loadFilterOptions(): void {
    // Load domains
    this.projectsService.getAvailableDomains().subscribe((domains) => {
      this.availableDomains = domains;
      this.domainOptions = domains.map((domain) => ({ label: domain, value: domain }));
    });

    // Load technologies
    this.projectsService.getAvailableTechnologies().subscribe((technologies) => {
      this.availableTechnologies = technologies;
      this.technologyOptions = technologies.map((tech) => ({ label: tech, value: tech }));
    });
  }

  setupFilterListeners(): void {
    // Listen for form changes
    this.filterForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(
          (prev, curr) =>
            JSON.stringify(prev.domain) === JSON.stringify(curr.domain) &&
            JSON.stringify(prev.technology) === JSON.stringify(curr.technology) &&
            prev.search === curr.search
        )
      )
      .subscribe(() => {
        this.applyFilters();
      });
  }

  applyFilters(): void {
    const domainValues = this.filterForm.get('domain')?.value || [];
    const technologyValues = this.filterForm.get('technology')?.value || [];
    const searchValue = this.filterForm.get('search')?.value || '';

    // Filter projects locally for multi-select functionality
    this.filteredProjects = this.projects.filter((project) => {
      // Domain filter - check if project domain matches any selected domains
      const domainMatch =
        domainValues.length === 0 ||
        domainValues.some((selectedDomain: string) => {
          const projectDomain = this.getPrimaryDomain(project);
          return projectDomain === selectedDomain;
        });

      // Technology filter - check if project has any of the selected technologies
      const technologyMatch =
        technologyValues.length === 0 ||
        technologyValues.some((selectedTech: string) =>
          project.technologies?.includes(selectedTech)
        );

      // Search filter - check if search term matches name, description, or technologies
      const searchMatch =
        !searchValue ||
        project.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchValue.toLowerCase()) ||
        project.technologies?.some((tech) =>
          tech.toLowerCase().includes(searchValue.toLowerCase())
        );

      return domainMatch && technologyMatch && searchMatch;
    });
  }

  resetFilters(): void {
    this.filterForm.reset({
      domain: [],
      technology: [],
      search: '',
    });
    this.filteredProjects = [...this.projects];
  }

  /**
   * Get appropriate icon for project domain
   */
  getProjectIcon(domain: string): string {
    const iconMap: Record<string, string> = {
      Manufacturing: 'pi-cog',
      'Oil & Gas': 'pi-circle-fill',
      Retail: 'pi-shopping-cart',
      'Retail & Logistics': 'pi-truck',
      Healthcare: 'pi-heart',
      Finance: 'pi-dollar',
      Technology: 'pi-desktop',
      Education: 'pi-book',
    };
    return iconMap[domain] || 'pi-briefcase';
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
      .map((resp) => {
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

    if (frontendTechs.some((t) => tech.includes(t))) return 'primary';
    if (backendTechs.some((t) => tech.includes(t))) return 'accent';
    if (cloudTechs.some((t) => tech.includes(t))) return 'warn';
    if (databaseTechs.some((t) => tech.includes(t))) return '';

    return 'accent';
  }

  /**
   * Get project impact description
   */
  getProjectImpact(project: Project): string {
    const impactMap: Record<string, string> = {
      'Predictive Portal': 'Enhanced manufacturing efficiency',
      'Health and Safety': 'Improved workplace safety compliance',
      'Robotic Process Automation': '70% reduction in manual processes',
      'Order Management': 'Global retail system optimization',
      'ECU Flashing': 'Automated firmware update process',
    };

    return impactMap[project.name] || '';
  }

  /**
   * Get total number of projects
   */
  getTotalProjects(): number {
    return this.projects.length;
  }

  /**
   * Get unique domains from all projects
   */
  getUniqueDomains(): string[] {
    const domains: string[] = [];
    this.projects.forEach((project) => {
      if (Array.isArray(project.domains)) {
        domains.push(...project.domains);
      } else if (typeof project.domains === 'string') {
        domains.push(project.domains);
      }
      if (project.domain) {
        domains.push(project.domain);
      }
    });
    return [...new Set(domains.filter(Boolean))];
  }

  /**
   * Get unique technologies from all projects
   */
  getUniqueTechnologies(): string[] {
    const allTechs = this.projects.flatMap((p) => p.technologies || []);
    return [...new Set(allTechs)];
  }

  /**
   * Get primary domain string from project domains
   */
  getPrimaryDomain(project: Project): string {
    if (Array.isArray(project.domains)) {
      return project.domains[0] || '';
    }
    return project.domains || project.domain || '';
  }

  /**
   * Get showcase icon for hero animation
   */
  getShowcaseIcon(index: number): string {
    const icons = ['pi-code', 'pi-cloud', 'pi-database', 'pi-shield', 'pi-chart-bar', 'pi-sitemap'];
    return icons[index] || 'pi-briefcase';
  }

  /**
   * Track by function for ngFor performance
   */
  trackByProject(index: number, project: Project): string {
    return project.name + project.period;
  }

  /**
   * Get domain slug for CSS classes
   */
  getDomainSlug(domain: string): string {
    return domain ? domain.toLowerCase().replace(/[^a-z0-9]/g, '-') : '';
  }

  /**
   * Get technology type for styling
   */
  getTechType(tech: string): string {
    const frontendTechs = ['Angular', 'TypeScript', 'HTML', 'CSS', 'JavaScript', 'jQuery'];
    const backendTechs = ['.NET', 'C#', 'VB.Net', 'ASP.Net', 'MVC'];
    const cloudTechs = ['Azure', 'Docker'];
    const databaseTechs = ['SQL Server', 'PostgreSQL'];

    if (frontendTechs.some((t) => tech.includes(t))) return 'frontend';
    if (backendTechs.some((t) => tech.includes(t))) return 'backend';
    if (cloudTechs.some((t) => tech.includes(t))) return 'cloud';
    if (databaseTechs.some((t) => tech.includes(t))) return 'database';

    return 'other';
  }

  /**
   * Get frontend technology count
   */
  getFrontendTechCount(): number {
    const frontendTechs = ['Angular', 'TypeScript', 'HTML', 'CSS', 'JavaScript', 'jQuery'];
    const uniqueFrontend = new Set(
      this.getUniqueTechnologies().filter((tech) => frontendTechs.some((ft) => tech.includes(ft)))
    );
    return uniqueFrontend.size;
  }

  /**
   * Get backend technology count
   */
  getBackendTechCount(): number {
    const backendTechs = ['.NET', 'C#', 'VB.Net', 'ASP.Net', 'MVC'];
    const uniqueBackend = new Set(
      this.getUniqueTechnologies().filter((tech) => backendTechs.some((bt) => tech.includes(bt)))
    );
    return uniqueBackend.size;
  }

  /**
   * Get cloud technology count
   */
  getCloudTechCount(): number {
    const cloudTechs = ['Azure', 'Docker'];
    const uniqueCloud = new Set(
      this.getUniqueTechnologies().filter((tech) => cloudTechs.some((ct) => tech.includes(ct)))
    );
    return uniqueCloud.size;
  }

  /**
   * Open external URL
   */
  openUrl(url: string): void {
    window.open(url, '_blank');
  }

  /**
   * Get current origin for live demo
   */
  getCurrentOrigin(): string {
    return window.location.origin;
  }
}
