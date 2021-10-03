import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsignedFormsComponent } from './unsigned-forms.component';

describe('UnsignedFormsComponent', () => {
  let component: UnsignedFormsComponent;
  let fixture: ComponentFixture<UnsignedFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnsignedFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsignedFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
