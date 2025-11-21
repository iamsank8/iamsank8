import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProjectsService } from './projects.service';
import { environment } from '../../../environments/environment';

describe('ProjectsService', () => {
    let service: ProjectsService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProjectsService],
        });
        service = TestBed.inject(ProjectsService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch projects', () => {
        const mockProjects = [] as any;
        service.getProjects().subscribe(data => {
            expect(data).toEqual(mockProjects);
        });
        const req = httpMock.expectOne(`${environment.apiUrl}/projects`);
        expect(req.request.method).toBe('GET');
        req.flush(mockProjects);
    });
});
