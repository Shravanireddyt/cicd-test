import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestorStatusRoutingModule } from './investor-status-routing.module';
import { InvestorStepsComponent } from './investor-steps/investor-steps.component';
import { StepsComponent } from './steps/steps.component';
import {FormsModule , ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [InvestorStepsComponent, StepsComponent],
  imports: [
    CommonModule,
    InvestorStatusRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InvestorStatusModule { }
