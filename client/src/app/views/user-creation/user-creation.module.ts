import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCreationRoutingModule } from './user-creation-routing.module';
import { CreateUserComponent } from './create-user/create-user.component';
import {FormsModule , ReactiveFormsModule} from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [CreateUserComponent],
  imports: [
    CommonModule,
    UserCreationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class UserCreationModule { }
