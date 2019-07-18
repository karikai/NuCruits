import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateContainerComponent } from './state-container.component';

describe('StateContainerComponent', () => {
  let component: StateContainerComponent;
  let fixture: ComponentFixture<StateContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
