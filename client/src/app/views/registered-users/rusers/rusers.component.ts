import { Component, OnInit, VERSION, ViewChild } from "@angular/core";
import { CommonHttpService } from "../../../services/common-http.service";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import * as XLSX from "xlsx";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";


import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from "@angular/forms";

@Component({
  selector: "app-rusers",
  templateUrl: "./rusers.component.html",
  styleUrls: ["./rusers.component.css"],
})
export class RusersComponent implements OnInit {
  mulform: FormGroup;
  panData: any;
  getkeys = Object.keys;
  spinner: Boolean = true;
  isDesc: Boolean = false;
  usrdetails: any = [];
  showDetails: boolean = false;
  count: any;
  searchString: any;
  column: any;
  ser: any = [];
  mulselected: Boolean = false;

  version = "Angular: v" + VERSION.full;
  dtOptions: DataTables.Settings = {};
  userData: any;
  pan: any;
  tot = new Array();
  dtTrigger: Subject<any> = new Subject();

  // spinnerr
  mainSpinner: Boolean = false;

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  constructor(
    private http: HttpClient,
    private httpSrv: CommonHttpService,
    private toast: ToastrService,
    private router: Router,
    private acRouter: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.mulform = this.fb.group({
      checkArray: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      scrollCollapse: true,
      pageLength: 10,
    };
    this.mainSpinner = true;
    this.httpSrv.getInfo("users_info").subscribe((users) => {
      
      this.tot = users.users;
      this.tot.forEach((item) => {
        item.password = item.password ? "Yes" : "No";
      });
       this.mainSpinner = false;
      this.dtTrigger.next();
    }, err => {
         this.mainSpinner = false;
        this.toast.error(err.message)
    });
  }

  applyFilter(filterValue: any) {
    console.log(filterValue);
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.tot.filter = filterValue;
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
    // this.dtTrigger.unsubscribe();
    console.log("coming des");
  }

  details(id: any) {
    this.usrdetails = this.tot.filter((ele) => ele.id == id)[0];

    this.showDetails = true;
  }

  xlsDow(file) {
    {
      let element = document.getElementById("tab");
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, file + ".xlsx");
    }
  }

  back() {
    this.showDetails = false;
  }
  sort(property) {
    this.isDesc = !this.isDesc; //change the direction
    // this.column = property;
    let direction = this.isDesc ? 1 : -1;

    this.tot.sort(function (a, b) {
      if (a[property] < b[property]) {
        return -1 * direction;
      } else if (a[property] > b[property]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  }
}
