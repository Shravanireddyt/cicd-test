import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRequestRoutingModule } from './contact-request-routing.module';
import { RequestComponent } from './request/request.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [RequestComponent],
  imports: [
    CommonModule,
    ContactRequestRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ContactRequestModule { }
