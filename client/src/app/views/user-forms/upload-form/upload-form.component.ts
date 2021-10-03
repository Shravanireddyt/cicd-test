import { Component, OnInit , Input } from '@angular/core';
import {CommonHttpService} from '../../../services/common-http.service';
import {NgbModal, ModalDismissReasons,NgbModalOptions,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {
  @Input('data') data;
  @Input('which') which;
  uccStatus:Boolean = false;
  fatcaStatus:Boolean = false;
  unsigned_form:Boolean = false;
  signed_form:Boolean = false;
  stsusData:any;
  onbfile:File;
  fatcafile:File;
  ubofile:File;

  filedata:any = {
    "onb":null,
    "fatca":null,
    "ubo":null
  };


  signedfiledata:any = {
    "onb":null,
    "fatca":null,
    "ubo":null
  }

  constructor(
    private httpSrv:CommonHttpService,
    private modalSrv:NgbModal,
    private tost:ToastrService
    ) { }

  ngOnInit() {
    console.log("data in upload form ", this.data,this.which);
    let pdata:any  = {};
    pdata.mail = this.data;
    this.httpSrv.post('getuserstatus',pdata).subscribe(data=>{
      console.log("status",data[0]);
      if(data.length>0 && data[0].onboarding==1){
        this.uccStatus = true;
      }
      if(data.length>0 && data[0].fatca==1){
        this.fatcaStatus = true;
      }
      if(data.length>0 && data[0].unsigned_form==1){
        this.unsigned_form = true;
      }
      // if(data.length>0 && data[0].signed_form==1){
      //   this.signed_form = true;
      // }
      
    },err=>{
      console.log("error while getiing status of users");
      
    })
    
  }

  closeModal(){
    this.modalSrv.dismissAll();
  }


  handleFileInput(event){
    // this.file = event.target.files;
    this.filedata[event.target.name] = event.target.files[0];
    // console.log("data if change",event.target.name);
    // if(event.target.name == "onb"){
    //   this.onbfile = event.target.files[0];
    // }
    // if(event.target.name == "fatca"){
    //   this.fatcafile= event.target.files[0];
    // }
    // if(event.target.name == "ubo"){
    //   this.ubofile = event.target.files[0];
    // }
    
  }

  handleSignedFileInput(event){
    // this.file = event.target.files;
    this.signedfiledata[event.target.name] = event.target.files[0];
    // console.log("data if change",event.target.name);
    // if(event.target.name == "onb"){
    //   this.onbfile = event.target.files[0];
    // }
    // if(event.target.name == "fatca"){
    //   this.fatcafile= event.target.files[0];
    // }
    // if(event.target.name == "ubo"){
    //   this.ubofile = event.target.files[0];
    // }
    
  }

  submitUnsigned(name){
    console.log("in submitunsigned");
    if(this.filedata[name]){
      console.log("yes",this.filedata);
      let pdata:any = {};
    // pdata.file = this.onbfile;
      pdata.mail = this.data;
      pdata.fname = name;
      pdata.file = this.filedata[name];
      console.log("pdata",pdata);
      this.httpSrv.postRectifiedFile(pdata, 'uploadunsigned').subscribe(data=>{
            console.log("data",data);
            this.tost.success("Unsigned form uploaded success fully",name);
            if(data[0].onboarding_form && data[0].fatca_form && data[0].ubo_form){
              this.updateUserStatus("unsigned_form");
            }
       },err=>{
        this.tost.error(name,"error while uploading");
        //  console.log("error wwhile uploading unsigned forms");
         
       },()=>{
          
       })
    }else{
      console.log("plesse selet file");
      
    }
     
  }



  submitSigned(name){
    console.log("in submitsigned");
    if(this.signedfiledata[name]){
      let pdata:any = {};
    // pdata.file = this.onbfile;
      pdata.mail = this.data;
      pdata.fname = name;
      pdata.file = this.signedfiledata[name];
      console.log("pdata",pdata);
      this.httpSrv.postRectifiedFile(pdata, 'uploadsigned').subscribe(data=>{
            console.log("data after signed upload",data);
            this.tost.success("signed form uploaded success fully",name);
            if(data[0].onboarding_form && data[0].fatca_form && data[0].ubo_form){
              this.updateUserStatus("signed_form");
            }
       },err=>{
        this.tost.error(name,"error while uploading");
        //  console.log("error wwhile uploading signed forms");
         
       },()=>{
        
       })
    }else{
      console.log("plesse selet file");
      
    }
  }


  updateUserStatus(name:any){
    let pdata:any = {};
        pdata.mail = this.data;
        pdata[name] = 1;
        console.log("besor update status pdata",pdata);
        
  //       this.httpSrv.postxml('postuserstatus',pdata).subscribe(data=>{
  //         console.log("success",data);
    
  // })
  }


}
