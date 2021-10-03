import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UccComponent } from './ucc.component';

describe('UccComponent', () => {
  let component: UccComponent;
  let fixture: ComponentFixture<UccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
