import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogComponent } from './blog.component';
import { SeoService } from '../../core/services/seo.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;
  let seoServiceSpy: jasmine.SpyObj<SeoService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('SeoService', ['generateTags']);

    await TestBed.configureTestingModule({
      imports: [BlogComponent, RouterTestingModule],
      providers: [{ provide: SeoService, useValue: spy }],
    }).compileComponents();

    seoServiceSpy = TestBed.inject(SeoService) as jasmine.SpyObj<SeoService>;
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call generateTags on init', () => {
    expect(seoServiceSpy.generateTags).toHaveBeenCalledWith({
      title: 'Blog',
      description:
        'Insights, tutorials, and thoughts on software development, architecture, and technology.',
      keywords: ['Blog', 'Software Development', 'Angular', 'Tech', 'Tutorials'],
    });
  });
});
