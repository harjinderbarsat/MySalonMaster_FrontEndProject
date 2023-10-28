import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoylityPointsComponent } from './loylity-points.component';

describe('LoylityPointsComponent', () => {
  let component: LoylityPointsComponent;
  let fixture: ComponentFixture<LoylityPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoylityPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoylityPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
