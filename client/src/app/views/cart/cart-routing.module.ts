import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InvestorsCartComponent} from './investors-cart/investors-cart.component';
import {InvestorDetailsComponent} from './investor-details/investor-details.component';


const routes: Routes = [
  {
    path: '',
    component : InvestorsCartComponent,
    data: {
      title: 'Users'
    }
  },
  {
    path: 'details/:id',
    component : InvestorDetailsComponent,
    data: {
      title: 'investorDetails'
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
