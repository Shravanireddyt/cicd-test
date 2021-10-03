import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisteredUsersRoutingModule } from './registered-users-routing.module';
import { RusersComponent } from './rusers/rusers.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { SearfilterPipe } from './searfilter.pipe';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [RusersComponent, UserDetailsComponent, SearfilterPipe],
  imports: [
    CommonModule,
    RegisteredUsersRoutingModule,
    FormsModule,
    DataTablesModule,
    ReactiveFormsModule,
  ],
})
export class RegisteredUsersModule {}
