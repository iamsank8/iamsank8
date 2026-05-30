import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QualityService } from './quality.service';
import { QualityReport } from '../models/quality-report.model';

describe('QualityService', () => {
  let service: QualityService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QualityService],
    });
    service = TestBed.inject(QualityService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch quality report', () => {
    const mockReport: QualityReport = {
      generatedAt: new Date().toISOString(),
      unitTests: {
        status: 'passing',
        coverage: { statements: 80, branches: 80, functions: 80, lines: 80 },
        totalTests: 10,
        passed: 10,
        failed: 0,
      },
      linting: { status: 'passing', errors: 0, warnings: 0 },
      e2eTests: { status: 'passing', totalTests: 5, passed: 5, failed: 0 },
      tools: {
        unitTesting: ['Karma'],
        e2eTesting: ['Cypress'],
        linting: ['ESLint'],
        formatting: ['Prettier'],
      },
    };
    service.getQualityReport().subscribe((data) => {
      expect(data).toEqual(mockReport);
    });
    const req = httpMock.expectOne('assets/quality-report.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockReport);
  });
});
