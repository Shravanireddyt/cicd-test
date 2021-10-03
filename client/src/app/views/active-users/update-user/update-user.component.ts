import { Component, OnInit, Input} from '@angular/core';
import {CommonHttpService} from '../../../services/common-http.service';
import {FormGroup,FormControl,FormBuilder,FormArray} from '@angular/forms';
import { DatePipe } from '@angular/common';
import {NgbModal, ModalDismissReasons,NgbModalOptions,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  @Input('data') data;
  @Input('id') id;
  uccform:FormGroup;
  usrdetails:any;keys = Object.keys;
  constructor(
    private httpSrv:CommonHttpService,
    private fb:FormBuilder,
    public datepipe: DatePipe,
    private modalService: NgbModal,
    private toast:ToastrService
    ) { }

  ngOnInit() {
    this.usrdetails =  this.data.filter(ele=>ele.id == this.id)[0];
    console.log("userdetails",this.usrdetails);
    // this.fatca_pan = this.usrdetails.pan;
    // this.fatca_name =  this.usrdetails.company_name;
    let control:any = {};
    for (const property in this.usrdetails) {
      control[property] = new FormControl(this.usrdetails[property]);
    }
    this.uccform =  this.fb.group(control);
  }


  update(){
    console.log(this.uccform.value);
    this.httpSrv.post('updateusrdetails',this.uccform.value).subscribe(data=>{
      console.log(data);
      this.toast.success("User Data Updated Successfully");
      
    },err=>{
      this.toast.error("Eroor while updating User Data");
    })
  }

} 









