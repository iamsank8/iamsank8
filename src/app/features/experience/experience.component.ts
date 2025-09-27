import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../core/material.module';

interface WorkExperience {
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

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExperienceComponent implements OnInit {
  workExperiences: WorkExperience[] = [
    {
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

  constructor() { }

  ngOnInit(): void {
  }
}