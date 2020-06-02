import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearcherFormComponent } from './researcher-form.component';

describe('ResearcherFormComponent', () => {
  let component: ResearcherFormComponent;
  let fixture: ComponentFixture<ResearcherFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearcherFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearcherFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
