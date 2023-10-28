import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkInPanelRegistrationComponent } from './walk-in-panel-registration.component';

describe('WalkInPanelRegistrationComponent', () => {
  let component: WalkInPanelRegistrationComponent;
  let fixture: ComponentFixture<WalkInPanelRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalkInPanelRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkInPanelRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
