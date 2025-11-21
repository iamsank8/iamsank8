import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { Title, Meta } from '@angular/platform-browser';

describe('ThemeService', () => {
    let service: ThemeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ThemeService, Title, Meta],
        });
        service = TestBed.inject(ThemeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should toggle theme and emit value', (done) => {
        service.isDarkTheme$.subscribe(value => {
            expect(value).toBeTrue();
            done();
        });
        service.toggleTheme();
    });
});
