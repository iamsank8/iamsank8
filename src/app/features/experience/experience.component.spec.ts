import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperienceComponent } from './experience.component';
import { ExperienceService } from '../../core/services/experience.service';
import { SeoService } from '../../core/services/seo.service';
import { of } from 'rxjs';
import { PrimeNGModule } from '../../core/primeng.module';
import { TimelineModule } from 'primeng/timeline';

describe('ExperienceComponent', () => {
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;
  let experienceServiceSpy: jasmine.SpyObj<ExperienceService>;
  let seoServiceSpy: jasmine.SpyObj<SeoService>;

  beforeEach(async () => {
    const eSpy = jasmine.createSpyObj('ExperienceService', [
      'getExperiences',
      'getTotalExperience',
    ]);
    const sSpy = jasmine.createSpyObj('SeoService', ['generateTags']);

    eSpy.getExperiences.and.returnValue(of([]));
    eSpy.getTotalExperience.and.returnValue(10);

    await TestBed.configureTestingModule({
      imports: [ExperienceComponent, PrimeNGModule, TimelineModule],
      providers: [
        { provide: ExperienceService, useValue: eSpy },
        { provide: SeoService, useValue: sSpy },
      ],
    }).compileComponents();

    experienceServiceSpy = TestBed.inject(ExperienceService) as jasmine.SpyObj<ExperienceService>;
    seoServiceSpy = TestBed.inject(SeoService) as jasmine.SpyObj<SeoService>;
    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call generateTags on init', () => {
    expect(seoServiceSpy.generateTags).toHaveBeenCalled();
  });

  it('should load experiences on init', () => {
    expect(experienceServiceSpy.getExperiences).toHaveBeenCalled();
  });
});
