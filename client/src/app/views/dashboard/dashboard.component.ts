import { Component,OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { DataTableDirective } from "angular-datatables";

import {CommonHttpService} from '../../services/common-http.service';
import { ToastrService } from 'ngx-toastr';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {

  // mine
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  products: any;

  // spinnerr
  mainSpinner: Boolean = false;

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  constructor(private httpSrv:CommonHttpService,
    private toast: ToastrService,public dialog: MatDialog,private toastSrv: ToastrService){
  }

  ngOnInit(): void {
    
   this.dtOptions = {
      pagingType: 'full_numbers',
     pageLength: 10,
      scrollX:true
    }; 
    this.mainSpinner = true;
     this.httpSrv.getInfo("product_data").subscribe((data) => {
      this.toastSrv.success("Date fetched successfully.")
       this.products = data.productData
       this.mainSpinner = false;
      this.dtTrigger.next();
     }, err => {
         this.toastSrv.error(err.message)
          this.mainSpinner = false;
    });
  }
   ngAfterViewInit(): void {
    this.dtTrigger.subscribe((x) => {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.columns().every(function (i) {
          const that = this;
          $("input[type=text]", this.footer()).on("keyup change", function () {
            console.log("lskadf", that);

            if (that.search() !== this["value"]) {
              that.search(this["value"]).draw();
            }
          });
        });
      });
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  openDialog(isin, name) {
    console.log(isin, "isin")
    const dialogRef = this.dialog.open(ProductDetailComponent,{width: '900px',data:{isin,name}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}