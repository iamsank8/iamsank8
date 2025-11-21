import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SkillsService } from './skills.service';
import { environment } from '../../../environments/environment';

describe('SkillsService', () => {
    let service: SkillsService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SkillsService],
        });
        service = TestBed.inject(SkillsService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch skills', () => {
        const mockSkills = [] as any;
        service.getSkills().subscribe(data => {
            expect(data).toEqual(mockSkills);
        });
        const req = httpMock.expectOne(`${environment.apiUrl}/skills`);
        expect(req.request.method).toBe('GET');
        req.flush(mockSkills);
    });
});
