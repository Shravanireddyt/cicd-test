import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RusersComponent } from './rusers.component';

describe('RusersComponent', () => {
  let component: RusersComponent;
  let fixture: ComponentFixture<RusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
