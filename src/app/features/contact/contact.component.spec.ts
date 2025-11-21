import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { ContactService } from '../../core/services/contact.service';
import { SeoService } from '../../core/services/seo.service';
import { MessageService } from 'primeng/api';
import { PrimeNGModule } from '../../core/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let seoServiceSpy: jasmine.SpyObj<SeoService>;

  beforeEach(async () => {
    const cSpy = jasmine.createSpyObj('ContactService', ['sendContactForm']);
    const sSpy = jasmine.createSpyObj('SeoService', ['generateTags']);
    const mSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      imports: [ContactComponent, PrimeNGModule, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [
        { provide: ContactService, useValue: cSpy },
        { provide: SeoService, useValue: sSpy },
        { provide: MessageService, useValue: mSpy },
      ],
    }).compileComponents();

    seoServiceSpy = TestBed.inject(SeoService) as jasmine.SpyObj<SeoService>;
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call generateTags on init', () => {
    expect(seoServiceSpy.generateTags).toHaveBeenCalled();
  });

  it('should initialize the form', () => {
    expect(component.contactForm).toBeDefined();
    expect(component.contactForm.get('name')).toBeTruthy();
    expect(component.contactForm.get('email')).toBeTruthy();
  });
});
