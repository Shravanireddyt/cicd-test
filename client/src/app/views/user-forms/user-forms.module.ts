import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignedFormsComponent } from './signed-forms/signed-forms.component';
import { UnsignedFormsComponent } from './unsigned-forms/unsigned-forms.component';
import {UserFormsROutingModule} from './user-forms-routing.module';
import { UploadFormComponent } from './upload-form/upload-form.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {ActiveUsersModule} from '../active-users/active-users.module';


@NgModule({
  declarations: [SignedFormsComponent, UnsignedFormsComponent, UploadFormComponent],
  imports: [
    CommonModule,
    UserFormsROutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[SignedFormsComponent , UnsignedFormsComponent , UploadFormComponent],
  entryComponents : [UploadFormComponent]
})
export class UserFormsModule { }
