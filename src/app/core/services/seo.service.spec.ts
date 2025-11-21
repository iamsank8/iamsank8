import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SeoService } from './seo.service';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

describe('SeoService', () => {
    let service: SeoService;
    let httpMock: HttpTestingController;
    let titleService: Title;
    let metaService: Meta;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SeoService, Title, Meta],
        });
        service = TestBed.inject(SeoService);
        httpMock = TestBed.inject(HttpTestingController);
        titleService = TestBed.inject(Title);
        metaService = TestBed.inject(Meta);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should generate tags and set title/meta', () => {
        const tags = {
            title: 'Test Title',
            description: 'Test Description',
            keywords: ['test', 'seo'],
        };
        service.generateTags(tags);
        expect(titleService.getTitle()).toBe(tags.title);
        // Meta tags are added; we can check one meta tag exists
        const descriptionTag = metaService.getTag('name="description"');
        expect(descriptionTag?.content).toBe(tags.description);
    });

    it('should fetch seo data from API', () => {
        const mockData = { title: 'API Title', description: 'API Desc', keywords: ['api'] };
        service.getSeoData().subscribe(data => {
            expect(data).toEqual(mockData);
        });
        const req = httpMock.expectOne(`${environment.apiUrl}/seo`);
        expect(req.request.method).toBe('GET');
        req.flush(mockData);
    });
});
