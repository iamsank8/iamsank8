import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EducationService } from './education.service';
import { environment } from '../../../environments/environment';

describe('EducationService', () => {
    let service: EducationService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [EducationService],
        });
        service = TestBed.inject(EducationService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch educations', () => {
        const mockEducations = [] as any;
        service.getEducations().subscribe(data => {
            expect(data).toEqual(mockEducations);
        });
        const req = httpMock.expectOne(`${environment.apiUrl}/education`);
        expect(req.request.method).toBe('GET');
        req.flush(mockEducations);
    });
});
