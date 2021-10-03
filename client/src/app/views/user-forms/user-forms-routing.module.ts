import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignedFormsComponent} from './signed-forms/signed-forms.component';
import {UnsignedFormsComponent} from './unsigned-forms/unsigned-forms.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Forms'
    },
    children: [
      {
        path: '',
        redirectTo: 'unsigned'
      },
      {
        path: 'unsigned',
        component: UnsignedFormsComponent,
        data: {
          title: 'Unsigned Forms'
        }
      },
      
      {
        path: 'signed',
        component: SignedFormsComponent,
        data: {
          title: 'Signed Forms'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserFormsROutingModule { }
