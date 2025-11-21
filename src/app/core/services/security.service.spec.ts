import { TestBed } from '@angular/core/testing';
import { SecurityService } from './security.service';
import { Title, Meta } from '@angular/platform-browser';

describe('SecurityService', () => {
    let service: SecurityService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SecurityService, Title, Meta],
        });
        service = TestBed.inject(SecurityService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should initialize security without errors', () => {
        service.initializeSecurity();
        expect(true).toBeTrue();
    });
});
