import { Component, OnInit } from '@angular/core';
import { ProjectsService, Project } from '../../core/services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  loading = true;
  error = false;

  constructor(private projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectsService.getProjects().subscribe({
      next: (data) => {
        this.projects = data.map(project => {
          return {
            ...project,
            company: project.organization,
            domain: project.domains,
            description: `${project.name} project for ${project.domains} domain.`
          };
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
        this.error = true;
        this.loading = false;
        
        // Fallback to local data if API fails
        this.loadLocalProjects();
      }
    });
  }

  loadLocalProjects(): void {
    // Fallback data if API fails
    this.projects = [
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
      }
    ];
  }
}