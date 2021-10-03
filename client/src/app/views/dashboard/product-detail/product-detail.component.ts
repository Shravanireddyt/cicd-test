import { FormGroup, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { faArrowAltCircleLeft, faCaretDown, faCaretUp, faSadTear, faUsers } from '@fortawesome/free-solid-svg-icons';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonHttpService } from '../../../services/common-http.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  mainSpinner: boolean;
  dataAvailable: boolean;
  dataNotAvailable: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    private http: CommonHttpService, private toastSrv: ToastrService,) { }
  caretDown = faCaretDown;
  caretUp = faCaretUp;
  users = faUsers;
  sadFace = faSadTear;

  api = `https://www.finnovationz.com/mutual_fund/api/ms/all_details.php?isin=${this.data.isin}`
  schemeData;
  fundManagers;
  fundName: String;
  percentageChange1: Boolean;
  percentageChange3: Boolean;

  seoForm: FormGroup;
  seoData: any;
  seoStatus: Boolean;
  seoSubmit: Boolean;

  ngOnInit(): void {
    // console.log(this.data, "hurrrrre")
     this.seoForm = new FormGroup({
      isin: new FormControl(this.data.isin),
      meta_desc: new FormControl(''),
      meta_keys: new FormControl(''),
      meta_title: new FormControl('')
    })
    this.mainSpinner = true;
    this.http.getProductData(this.api).subscribe(data => {
      // console.log(data, "product")
      this.toastSrv.success("Data fetched Successfully.")
       this.mainSpinner = false;
      if (data.status.code === 208) {
        this.dataNotAvailable = true;
      } else {
        this.dataAvailable = true;
        this.schemeData = data.data[0]
        this.fundManagers = data.data[0].api.Managers;
        // console.log(this.fundManagers, "fund")
        this.percentageChange1 = this.schemeData.api.Return1Yr > 0 ? true : false;
        this.percentageChange3 = this.schemeData.api.Return3Yr > 0 ? true : false;
     }
    }, err => {
        this.mainSpinner = false;
        this.toastSrv.error(err.message)
    })
    this.http.getMoreData("seo/get_seo_data", { isin: this.data.isin }).subscribe(data => {
      // console.log(data)
       this.seoData = data;
      if (this.seoData.status === 404) {
        this.seoStatus = false;
      } else {
        this.seoStatus = true;
       this.initSeoForm(this.seoData.seoData[0])
      }
    }, err => {
        console.log(err)
    })
  }


  initSeoForm(seoData) {
    this.seoForm.patchValue(
      {
        meta_desc: seoData.meta_desc,
        meta_keys: seoData.meta_keys,
        meta_title:seoData.meta_title
      })
  }
  addSEO() {
    this.seoSubmit = true;
    this.http.seoPost("seo/add_seo", this.seoForm.value).subscribe(data => {
      // console.log(data)
      this.toastSrv.success("Seo added successfully.")
      this.seoSubmit = false;
    }, err => {
        this.seoSubmit = false;
       this.toastSrv.error(err.message)
    })
  }
   updateSEO() {
    this.seoSubmit = true;

    this.http.updateUcc("seo/update_seo", this.seoForm.value).subscribe(data => {
      // console.log(data)
      this.seoSubmit = false;
      this.toastSrv.success(data.message)
    }, err => {
        this.seoSubmit = false;
        this.toastSrv.error(err.message)
        // console.log(err)
    })
  }
}
