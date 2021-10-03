import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CommonHttpService } from '../../../services/common-http.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  resolveStatus: boolean;
  isResolved: boolean;
  errorMessage: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    private httpSrv: CommonHttpService,
    private toastSrv: ToastrService,) { }

  ngOnInit(): void {
  }

  resolve(alert) {
    this.resolveStatus = true;
    let newAlert = {
      id: alert.id,
      user_key:alert.user_key
    }
    this.httpSrv.put('alerts/resolve_alert', newAlert).subscribe(data => {
      this.resolveStatus = false
      this.isResolved = true;
      this.toastSrv.success('Alert Resolved Sucessfully.')
      console.log(data)
    }, err => {
       this.isResolved = false;
      this.toastSrv.error(err.error.message)
      this.resolveStatus = false
      this.errorMessage = err.error.message
      console.log(err)
    })
  }
  

}
