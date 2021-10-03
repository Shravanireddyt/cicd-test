import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorsCartComponent } from './investors-cart.component';

describe('InvestorsCartComponent', () => {
  let component: InvestorsCartComponent;
  let fixture: ComponentFixture<InvestorsCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorsCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorsCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
