import { FormGroup, FormControl, FormGroupName, Validators } from '@angular/forms';
import { Component, Inject, OnInit,ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { CommonHttpService } from '../../../services/common-http.service';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  faBell = faBell;
  alertForm: FormGroup;
  alertRaising: boolean;
 

  fieldsArray = ['acc_no', 'pan', 'email', 'address'];
  selectedFields;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
  private httpSrv: CommonHttpService,
  private toastSrv: ToastrService) { }

  ngOnInit(): void {
    this.alertForm = new FormGroup({
      form_name: new FormControl('',[Validators.required]),
      title: new FormControl('',[Validators.required]),
      description: new FormControl('', [Validators.required]),
       formFields : new FormControl("",[Validators.required])
    })
  }


  raiseAlert() {
    console.log(this.selectedFields)
    this.alertRaising = true;
    let data = {
      email:this.data.email,
      user_key: this.data.user_key,
      form_name: this.alertForm.controls['form_name'].value,
      fields: this.selectedFields,
      title: this.alertForm.controls['title'].value,
      description:this.alertForm.controls['description'].value
    }
    console.log(data, "email")
    this.httpSrv.getMoreData("alerts/raise_alert", data).subscribe(data => {
       this.alertRaising = false;
      this.toastSrv.success('Alert raised Successfully.')
      this.alertForm.reset()
    }, err => {
       this.alertRaising = false;
      this.toastSrv.error(err.error.message)
    })
  }

}
