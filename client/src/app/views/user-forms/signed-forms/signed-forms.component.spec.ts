import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedFormsComponent } from './signed-forms.component';

describe('SignedFormsComponent', () => {
  let component: SignedFormsComponent;
  let fixture: ComponentFixture<SignedFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignedFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignedFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
