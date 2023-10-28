import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkschduleComponent } from './workschdule.component';

describe('WorkschduleComponent', () => {
  let component: WorkschduleComponent;
  let fixture: ComponentFixture<WorkschduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkschduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkschduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
