import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteReviewsComponent } from './write-reviews.component';

describe('WriteReviewsComponent', () => {
  let component: WriteReviewsComponent;
  let fixture: ComponentFixture<WriteReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
