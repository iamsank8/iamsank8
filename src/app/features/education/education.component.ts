import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../core/material.module';

interface Education {
  degree: string;
  year: string;
  institution: string;
  board: string;
  percentage: string;
}

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EducationComponent implements OnInit {
  educations: Education[] = [
    {
      degree: 'B.E (Computer Science)',
      year: '2015',
      institution: 'Sipna College of Engineering & Technology, Amravati',
      board: 'SGBAU',
      percentage: '64.12'
    },
    {
      degree: 'XII',
      year: '2011',
      institution: 'Samarth Junior College, Amravati',
      board: 'MH',
      percentage: '62.17'
    },
    {
      degree: 'X',
      year: '2009',
      institution: 'Narayandas Laddha High School, Amravati',
      board: 'MH',
      percentage: '84.85'
    }
  ];

  displayedColumns: string[] = ['degree', 'year', 'institution', 'board', 'percentage'];

  constructor() { }

  ngOnInit(): void {
  }
}