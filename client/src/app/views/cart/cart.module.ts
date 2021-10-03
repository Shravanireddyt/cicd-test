import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { InvestorsCartComponent } from './investors-cart/investors-cart.component';
import { InvestorDetailsComponent } from './investor-details/investor-details.component';
import {FormsModule , ReactiveFormsModule} from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [InvestorsCartComponent, InvestorDetailsComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ]
})
export class CartModule { }
