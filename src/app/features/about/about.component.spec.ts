import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { AboutService } from '../../core/services/about.service';
import { SeoService } from '../../core/services/seo.service';
import { of } from 'rxjs';
import { PrimeNGModule } from '../../core/primeng.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let aboutServiceSpy: jasmine.SpyObj<AboutService>;
  let seoServiceSpy: jasmine.SpyObj<SeoService>;

  beforeEach(async () => {
    const aSpy = jasmine.createSpyObj('AboutService', ['getAboutData']);
    const sSpy = jasmine.createSpyObj('SeoService', ['generateTags']);

    aSpy.getAboutData.and.returnValue(
      of({
        personalInfo: {
          languages: [],
        },
        stats: {},
        mission: '',
        professionalSummary: [],
        certifications: [],
      } as unknown as import('../../core/services/about.service').AboutData)
    );

    await TestBed.configureTestingModule({
      imports: [AboutComponent, PrimeNGModule, RouterTestingModule],
      providers: [
        { provide: AboutService, useValue: aSpy },
        { provide: SeoService, useValue: sSpy },
      ],
    }).compileComponents();

    aboutServiceSpy = TestBed.inject(AboutService) as jasmine.SpyObj<AboutService>;
    seoServiceSpy = TestBed.inject(SeoService) as jasmine.SpyObj<SeoService>;
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call generateTags on init', () => {
    expect(seoServiceSpy.generateTags).toHaveBeenCalled();
  });

  it('should load about data on init', () => {
    expect(aboutServiceSpy.getAboutData).toHaveBeenCalled();
  });
});
