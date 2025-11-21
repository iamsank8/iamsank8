import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ExperienceService } from './experience.service';
import { environment } from '../../../environments/environment';

describe('ExperienceService', () => {
    let service: ExperienceService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ExperienceService],
        });
        service = TestBed.inject(ExperienceService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch experiences', () => {
        const mockExperiences = [] as any;
        service.getExperiences().subscribe(data => {
            expect(data).toEqual(mockExperiences);
        });
        const req = httpMock.expectOne(`${environment.apiUrl}/experience`);
        expect(req.request.method).toBe('GET');
        req.flush(mockExperiences);
    });
});
