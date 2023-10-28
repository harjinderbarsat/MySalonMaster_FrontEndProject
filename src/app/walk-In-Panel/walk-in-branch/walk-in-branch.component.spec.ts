import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkInBranchComponent } from './walk-in-branch.component';

describe('BranchSelectionComponent', () => {
  let component: WalkInBranchComponent;
  let fixture: ComponentFixture<WalkInBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalkInBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkInBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
