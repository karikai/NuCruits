import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpEmployersComponent } from './sign-up-employers.component';

describe('SignUpEmployersComponent', () => {
  let component: SignUpEmployersComponent;
  let fixture: ComponentFixture<SignUpEmployersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpEmployersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpEmployersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
