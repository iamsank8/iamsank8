import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CodeQualityComponent } from './code-quality.component';
import { QualityService } from '../../core/services/quality.service';
import { SeoService } from '../../core/services/seo.service';
import { of } from 'rxjs';

describe('CodeQualityComponent', () => {
  let component: CodeQualityComponent;
  let fixture: ComponentFixture<CodeQualityComponent>;
  let qualityServiceSpy: jasmine.SpyObj<QualityService>;
  let seoServiceSpy: jasmine.SpyObj<SeoService>;

  beforeEach(async () => {
    const qSpy = jasmine.createSpyObj('QualityService', [
      'getQualityReport',
      'getStatusColor',
      'getCoverageColor',
    ]);
    const sSpy = jasmine.createSpyObj('SeoService', ['generateTags']);

    qSpy.getQualityReport.and.returnValue(
      of({
        generatedAt: new Date().toISOString(),
        unitTests: {
          status: 'passing',
          coverage: { statements: 80, branches: 75, functions: 85, lines: 82 },
          totalTests: 22,
          passed: 22,
          failed: 0,
        },
        linting: { status: 'passing', errors: 0, warnings: 0 },
        e2eTests: { status: 'configured', totalTests: 5, passed: 5, failed: 0 },
        tools: {
          unitTesting: ['Karma', 'Jasmine'],
          e2eTesting: ['Cypress'],
          linting: ['ESLint'],
          formatting: ['Prettier'],
        },
      })
    );

    qSpy.getStatusColor.and.returnValue('var(--success)');
    qSpy.getCoverageColor.and.returnValue('var(--success)');

    await TestBed.configureTestingModule({
      imports: [CodeQualityComponent, HttpClientTestingModule],
      providers: [
        { provide: QualityService, useValue: qSpy },
        { provide: SeoService, useValue: sSpy },
      ],
    }).compileComponents();

    qualityServiceSpy = TestBed.inject(QualityService) as jasmine.SpyObj<QualityService>;
    seoServiceSpy = TestBed.inject(SeoService) as jasmine.SpyObj<SeoService>;
    fixture = TestBed.createComponent(CodeQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call generateTags on init', () => {
    expect(seoServiceSpy.generateTags).toHaveBeenCalled();
  });

  it('should load quality report on init', () => {
    expect(qualityServiceSpy.getQualityReport).toHaveBeenCalled();
    expect(component.report).toBeTruthy();
  });
});
