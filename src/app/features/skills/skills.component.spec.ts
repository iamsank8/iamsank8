import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsComponent } from './skills.component';
import { SkillsService } from '../../core/services/skills.service';
import { SeoService } from '../../core/services/seo.service';
import { of } from 'rxjs';
import { PrimeNGModule } from '../../core/primeng.module';

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;
  let skillsServiceSpy: jasmine.SpyObj<SkillsService>;
  let seoServiceSpy: jasmine.SpyObj<SeoService>;

  beforeEach(async () => {
    const skSpy = jasmine.createSpyObj('SkillsService', ['getSkills']);
    const sSpy = jasmine.createSpyObj('SeoService', ['generateTags']);

    skSpy.getSkills.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [SkillsComponent, PrimeNGModule],
      providers: [
        { provide: SkillsService, useValue: skSpy },
        { provide: SeoService, useValue: sSpy },
      ],
    }).compileComponents();

    skillsServiceSpy = TestBed.inject(SkillsService) as jasmine.SpyObj<SkillsService>;
    seoServiceSpy = TestBed.inject(SeoService) as jasmine.SpyObj<SeoService>;
    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call generateTags on init', () => {
    expect(seoServiceSpy.generateTags).toHaveBeenCalled();
  });

  it('should load skills on init', () => {
    expect(skillsServiceSpy.getSkills).toHaveBeenCalled();
  });
});
