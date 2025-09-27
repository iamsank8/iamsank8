import { Component, OnInit } from '@angular/core';

interface Experience {
  title: string;
  company: string;
  period: string;
  domain: string;
  responsibilities: string[];
  tasks: string[];
  technologies: string[];
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [
    {
      title: 'Project Name - Predictive Portal',
      company: 'Nitor Infotech, An Ascendion company',
      period: 'March 2020 - Present',
      domain: 'Manufacturing',
      responsibilities: [
        'I worked as individual contributor for Angular technology. While working on the project, I gained domain knowledge and was able to co-relate the features and value additions that I could bring into the project.',
        'I analyze the figma designs and convert into Angular code. I have used the organizational theme to style the components and have contributed to creating its look and feel.',
        'I also written unit tests which are based on Jasmine and Karma stack. We are also using SonarQube for tracking code quality and security vulnerabilities.'
      ],
      tasks: [
        'Requirement understanding',
        'Code quality discussion',
        'Peer code reviews',
        'Cross team communication',
        'Client-side discussions and deliveries'
      ],
      technologies: ['Angular 9-14', 'TypeScript', 'Docker', 'SonarQube', 'Figma']
    },
    {
      title: 'Project Name - Health and Safety for Petroleum Company',
      company: 'Nitor Infotech Pvt Ltd',
      period: 'Jan 2019 - Feb 2020',
      domain: 'Oil & Gas',
      responsibilities: [
        'I worked as full stack developer. I got a first-hand experience in interacting with customer interaction and requirement gathering.',
        'I was able to understand the business need and customer\'s expectations from this project very early. I helped design new modules from the scratch and they were well received.',
        'I focused mainly on the scalability of the application which meant strong backend for storing large data. I used .NET framework 4.5 for backend APIs with Azure services such as Blob store, Web Service, Service Bus, CRON Jobs for email notifications.',
        'In later part of the project, we integrated Google Map APIs to showcase different markers on Map to show different things which provided birds eye view to the end user. I have also built a ABAC system to better control the Authorization in the application.'
      ],
      tasks: [
        'Requirement gathering',
        'Code structuring',
        'Database design',
        'Peer code review',
        'Client-side discussions and deliveries'
      ],
      technologies: ['Angular 5-9', 'TypeScript', '.NET Framework', 'Azure', 'SQL server']
    },
    {
      title: 'Project Name - Robotic Process Automation for PLM',
      company: 'Infosys India',
      period: 'May 2018 - Dec 2018',
      domain: 'Retail',
      responsibilities: [
        'I worked as backend developer for this project. We were presented with different manual tasks that were happening multiple times on daily or weekly basis.',
        'I analyzed the process flow of the tasks that needed automation and provided estimates for the work. I used Selenium with C# for custom code block in proprietary software to achieve the automation and desired results.'
      ],
      tasks: [
        'Requirement understanding',
        'Flow analysis',
        'Peer code review',
        'Client-side discussion and deliveries'
      ],
      technologies: ['Selenium', 'C#', 'PostgreSQL', 'RabbitMQ', 'AssistEdge (Infosys proprietary)']
    },
    {
      title: 'Project Name - Order Management',
      company: 'Syntel Pvt Ltd',
      period: 'May 2018 - Dec 2018',
      domain: 'Retail & Logistics',
      responsibilities: [
        'I worked as full stack developer for this project. I helped maintained and enhance some parts of the application.',
        'The project was mostly built in ASP.Net but it also had some classic ASP bits. I was getting directions from the onsite counterpart which helped gather and finalize requirements for project.',
        'Since this was a stable project and was used around the world, making any changes carried a lot of responsibility so unit testing the code changes and ensuring the code quality was must.'
      ],
      tasks: [
        'Requirement understanding',
        'Client-side discussion and deliveries',
        'Unit testing'
      ],
      technologies: ['C#', 'SQL Server', 'PostgreSQL', 'Classic ASP', 'MVC']
    },
    {
      title: 'Project Name - ECU Flashing',
      company: 'Syntel Pvt Ltd',
      period: 'May 2018 - Dec 2018',
      domain: 'Manufacturing',
      responsibilities: [
        'I worked as backend developer. This was built in VB.Net and JavaScript and interfacing was done using ActiveXObject in internet explorer.',
        'This project was used to flash ECU with new firmware updates. It would also list down all the features of it, and tell if new feature is available to upgrade.'
      ],
      tasks: [
        'Requirement understanding',
        'Client-side discussion and deliveries',
        'Unit testing',
        'Cross team communication'
      ],
      technologies: ['HTML', 'jQuery', 'JavaScript', 'VBScript', 'C#']
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}