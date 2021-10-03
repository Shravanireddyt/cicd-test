import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InvestorStepsComponent} from './investor-steps/investor-steps.component';
import { StepsComponent } from './steps/steps.component';

const routes: Routes = [
  {
    path : '' , redirectTo : 'users' , pathMatch : 'full'
  },
  {
    path : 'users', component : InvestorStepsComponent
  },
  {
    path : 'steps' , component : StepsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestorStatusRoutingModule { }
