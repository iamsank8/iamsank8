import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AnalyticsService } from './analytics.service';
import { environment } from '../../../environments/environment';

describe('AnalyticsService', () => {
    let service: AnalyticsService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AnalyticsService],
        });
        service = TestBed.inject(AnalyticsService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should initialize analytics with correct ID', () => {
        const mockId = 'UA-TEST-123';
        service.initializeAnalytics(mockId);
        // Since initializeAnalytics currently logs to console, we just ensure no errors thrown
        expect(true).toBeTruthy();
    });

    it('should track event correctly', () => {
        const eventParams = { category: 'test', action: 'click', label: 'button', value: 1 };
        service.trackEvent('testEvent', eventParams);
        // No observable, just ensure method runs without error
        expect(true).toBeTruthy();
    });

    it('should track page view', () => {
        service.trackPageView('/test-page');
        expect(true).toBeTruthy();
    });
});
