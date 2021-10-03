import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetUploadComponent } from './sheet-upload.component';

describe('SheetUploadComponent', () => {
  let component: SheetUploadComponent;
  let fixture: ComponentFixture<SheetUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
