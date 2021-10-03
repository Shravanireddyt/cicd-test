import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RusersComponent} from './rusers/rusers.component';
import {UserDetailsComponent} from './user-details/user-details.component';

const routes: Routes = [
 {path:'' , component:RusersComponent,data: { title: 'RegisteredUsers'}},
 {path:':id',component:UserDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisteredUsersRoutingModule { }
