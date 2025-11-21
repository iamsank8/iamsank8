import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AboutService } from './about.service';
import { environment } from '../../../environments/environment';

describe('AboutService', () => {
    let service: AboutService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AboutService],
        });
        service = TestBed.inject(AboutService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch about data', () => {
        const mockData = { /* mock about data */ } as any;
        service.getAboutData().subscribe(data => {
            expect(data).toEqual(mockData);
        });
        const req = httpMock.expectOne(`${environment.apiUrl}/about`);
        expect(req.request.method).toBe('GET');
        req.flush(mockData);
    });
});
