import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SheetUploadComponent} from './sheet-upload/sheet-upload.component';

const routes: Routes = [
  {path:'' , component:SheetUploadComponent,data: { title: 'PanCheck'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanCheckRoutingModule { }
