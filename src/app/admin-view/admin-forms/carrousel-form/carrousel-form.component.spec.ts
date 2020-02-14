import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrouselFormComponent } from './carrousel-form.component';

describe('CarrouselFormComponent', () => {
  let component: CarrouselFormComponent;
  let fixture: ComponentFixture<CarrouselFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrouselFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrouselFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
