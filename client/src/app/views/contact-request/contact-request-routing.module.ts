import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RequestComponent} from './request/request.component';

const routes: Routes = [
  {path:'' , component:RequestComponent,data: {
    title: 'ContactRequest'
  }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRequestRoutingModule { }
