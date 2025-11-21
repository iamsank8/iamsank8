import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QualityService } from './quality.service';
import { environment } from '../../../environments/environment';

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
        const mockReport = { /* mock report structure */ } as any;
        service.getQualityReport().subscribe(data => {
            expect(data).toEqual(mockReport);
        });
        const req = httpMock.expectOne(`${environment.apiUrl}/quality`);
        expect(req.request.method).toBe('GET');
        req.flush(mockReport);
    });
});
