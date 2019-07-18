import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantTileComponent } from './applicant-tile.component';

describe('ApplicantTileComponent', () => {
  let component: ApplicantTileComponent;
  let fixture: ComponentFixture<ApplicantTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
