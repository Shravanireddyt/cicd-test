import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';

import { DataTablesModule } from 'angular-datatables';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  imports: [
    FormsModule,
    DataTablesModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    FontAwesomeModule,
    ButtonsModule.forRoot()
  ],
  declarations: [DashboardComponent, ProductDetailComponent],
  entryComponents: [
    ProductDetailComponent
  ],
})
export class DashboardModule { }
