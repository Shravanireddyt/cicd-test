import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorStepsComponent } from './investor-steps.component';

describe('InvestorStepsComponent', () => {
  let component: InvestorStepsComponent;
  let fixture: ComponentFixture<InvestorStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
