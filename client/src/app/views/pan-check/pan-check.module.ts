import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanCheckRoutingModule } from './pan-check-routing.module';
import { SheetUploadComponent } from './sheet-upload/sheet-upload.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// RECOMMENDED
import { AccordionModule } from 'ngx-bootstrap/accordion';
// NOT RECOMMENDED (Angular 9 doesn't support this kind of import)
// import { AccordionModule } from 'ngx-bootstrap';


@NgModule({
  declarations: [SheetUploadComponent],
  imports: [
    CommonModule,
    PanCheckRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule.forRoot()
  ]
})
export class PanCheckModule { }
