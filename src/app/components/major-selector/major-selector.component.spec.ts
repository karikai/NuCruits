import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorSelectorComponent } from './major-selector.component';

describe('MajorSelectorComponent', () => {
  let component: MajorSelectorComponent;
  let fixture: ComponentFixture<MajorSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MajorSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MajorSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
