import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocuemntsComponent } from './docuemnts.component';

describe('DocuemntsComponent', () => {
  let component: DocuemntsComponent;
  let fixture: ComponentFixture<DocuemntsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocuemntsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocuemntsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
