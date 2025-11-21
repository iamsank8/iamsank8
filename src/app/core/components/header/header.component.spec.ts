import { TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ThemeService } from '../../services/theme.service';
import { RouterTestingModule } from '@angular/router/testing';
import { PrimeNGModule } from '../../primeng.module';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { CommonModule } from '@angular/common';

describe('HeaderComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, RouterTestingModule, PrimeNGModule, ThemeToggleComponent],
            declarations: [HeaderComponent],
            providers: [ThemeService],
        }).compileComponents();
    });

    it('should create the header', () => {
        const fixture = TestBed.createComponent(HeaderComponent);
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });
});
