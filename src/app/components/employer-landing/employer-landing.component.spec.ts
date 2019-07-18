import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerLandingComponent } from './employer-landing.component';

describe('EmployerLandingComponent', () => {
  let component: EmployerLandingComponent;
  let fixture: ComponentFixture<EmployerLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
