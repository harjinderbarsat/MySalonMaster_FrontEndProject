import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSaleHistoryComponent } from './product-sale-history.component';

describe('ProductSaleHistoryComponent', () => {
  let component: ProductSaleHistoryComponent;
  let fixture: ComponentFixture<ProductSaleHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSaleHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSaleHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
