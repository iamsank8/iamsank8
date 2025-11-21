import { TestBed } from '@angular/core/testing';
import { ThemeToggleComponent } from './theme-toggle.component';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';

describe('ThemeToggleComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [ThemeToggleComponent],
            providers: [ThemeService],
        }).compileComponents();
    });

    it('should create the component', () => {
        const fixture = TestBed.createComponent(ThemeToggleComponent);
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });
});
