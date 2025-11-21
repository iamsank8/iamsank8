import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EducationComponent } from './education.component';
import { EducationService } from '../../core/services/education.service';
import { SeoService } from '../../core/services/seo.service';
import { of } from 'rxjs';
import { PrimeNGModule } from '../../core/primeng.module';

describe('EducationComponent', () => {
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;
  let educationServiceSpy: jasmine.SpyObj<EducationService>;
  let seoServiceSpy: jasmine.SpyObj<SeoService>;

  beforeEach(async () => {
    const eSpy = jasmine.createSpyObj('EducationService', ['getEducations', 'getCertifications']);
    const sSpy = jasmine.createSpyObj('SeoService', ['generateTags']);

    eSpy.getEducations.and.returnValue(of([]));
    eSpy.getCertifications.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [EducationComponent, PrimeNGModule],
      providers: [
        { provide: EducationService, useValue: eSpy },
        { provide: SeoService, useValue: sSpy },
      ],
    }).compileComponents();

    educationServiceSpy = TestBed.inject(EducationService) as jasmine.SpyObj<EducationService>;
    seoServiceSpy = TestBed.inject(SeoService) as jasmine.SpyObj<SeoService>;
    fixture = TestBed.createComponent(EducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call generateTags on init', () => {
    expect(seoServiceSpy.generateTags).toHaveBeenCalled();
  });

  it('should load education and certifications on init', () => {
    expect(educationServiceSpy.getEducations).toHaveBeenCalled();
    expect(educationServiceSpy.getCertifications).toHaveBeenCalled();
  });
});
