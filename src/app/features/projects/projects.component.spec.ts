import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsComponent } from './projects.component';
import { ProjectsService } from '../../core/services/projects.service';
import { SeoService } from '../../core/services/seo.service';
import { of } from 'rxjs';
import { PrimeNGModule } from '../../core/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let projectsServiceSpy: jasmine.SpyObj<ProjectsService>;
  let seoServiceSpy: jasmine.SpyObj<SeoService>;

  beforeEach(async () => {
    const pSpy = jasmine.createSpyObj('ProjectsService', [
      'getProjects',
      'getAvailableDomains',
      'getAvailableTechnologies',
    ]);
    const sSpy = jasmine.createSpyObj('SeoService', ['generateTags']);

    // Mock return values
    pSpy.getProjects.and.returnValue(of([]));
    pSpy.getAvailableDomains.and.returnValue(of([]));
    pSpy.getAvailableTechnologies.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [ProjectsComponent, PrimeNGModule, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [
        { provide: ProjectsService, useValue: pSpy },
        { provide: SeoService, useValue: sSpy },
      ],
    }).compileComponents();

    projectsServiceSpy = TestBed.inject(ProjectsService) as jasmine.SpyObj<ProjectsService>;
    seoServiceSpy = TestBed.inject(SeoService) as jasmine.SpyObj<SeoService>;
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call generateTags on init', () => {
    expect(seoServiceSpy.generateTags).toHaveBeenCalled();
  });

  it('should load projects on init', () => {
    expect(projectsServiceSpy.getProjects).toHaveBeenCalled();
  });
});
