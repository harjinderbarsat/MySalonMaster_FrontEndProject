import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductCategoryComponent } from './new-product-category.component';

describe('NewProductCategoryComponent', () => {
  let component: NewProductCategoryComponent;
  let fixture: ComponentFixture<NewProductCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProductCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
