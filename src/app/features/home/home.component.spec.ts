import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { SeoService } from '../../core/services/seo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { PrimeNGModule } from '../../core/primeng.module';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let seoServiceSpy: jasmine.SpyObj<SeoService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('SeoService', ['generateTags']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule, PrimeNGModule],
      providers: [{ provide: SeoService, useValue: spy }],
    }).compileComponents();

    seoServiceSpy = TestBed.inject(SeoService) as jasmine.SpyObj<SeoService>;
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call generateTags on init', () => {
    expect(seoServiceSpy.generateTags).toHaveBeenCalledWith({
      title: 'Home',
      description:
        'Welcome to the portfolio of Sanket Thotange, a Senior Team Lead and Full Stack Developer.',
      keywords: [
        'Sanket Thotange',
        'Portfolio',
        'Full Stack Developer',
        'Angular',
        '.NET',
        'Azure',
      ],
    });
  });
});
