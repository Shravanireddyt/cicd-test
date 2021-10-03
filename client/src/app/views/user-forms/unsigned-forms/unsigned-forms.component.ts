import { Component, OnInit , Input } from '@angular/core';
import {CommonHttpService} from '../../../services/common-http.service';
import {NgbModal, ModalDismissReasons,NgbModalOptions,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {UploadFormComponent} from '../upload-form/upload-form.component';
import {ViewDocComponent} from '../../active-users/view-doc/view-doc.component';


@Component({
  selector: 'app-unsigned-forms',
  templateUrl: './unsigned-forms.component.html',
  styleUrls: ['./unsigned-forms.component.css']
})
export class UnsignedFormsComponent implements OnInit {
  @Input() mail:any;
  spinner:Boolean = true;
  uccData:any;
  file:FileList;
  imageURL:any = [];
  url:any;
  userDocs:any = [];
  thumbnail: any;
  showDetails:Boolean = false;
  selectedMail:any;
  selectedUsr:any;
  no:Boolean = false;

  constructor(
    private httpSrv:CommonHttpService,
    private modalService: NgbModal
    ) { }

  ngOnInit() {
    this.selectedUsr = this.mail;
    this.selectedMail = this.mail;
    console.log("data on select",this.mail,this.selectedMail);
    let pdata:any = {};
    pdata.mail = this.mail;
    this.httpSrv.post('getunsignedforms',pdata).subscribe(data=>{
      console.log("unsigned forms 1",data);
      console.log("image urls",this.imageURL);
      if(data.data){
        this.no = true;
      }
      
      if(!data.data){

        Object.keys(data).forEach(key=>{
          this.userDocs.push(data[key]);
            const byteArray = new Uint8Array(atob(data[key]).split('').map(char => char.charCodeAt(0)));
            this.url = URL.createObjectURL(new Blob([byteArray], {type: 'application/pdf'}));
            let mdata:any = {};
            mdata.key = "pdf";
            mdata.fname = key;
            mdata.dat = this.url;
            mdata.email = this.selectedMail;
            this.imageURL.push(mdata);
            this.showDetails = true;
        }) 
        
     
      }
    });
    // this.httpSrv.get('activeusers').subscribe(data=>{
    //   this.uccData = data;
    //   this.spinner = false;
      
    // },err=>{
    //   console.log("error while getting ucc data");
      
    // })
  }

  // handleFileInput(event){
  //   this.file = event.target.files;
  // }

  upload(data:any){
    const modalref =  this.modalService.open(UploadFormComponent,{size:'lg'});
    modalref.componentInstance.data = this.mail;
    modalref.componentInstance.which = "unsigned";
     
  }

  details(data:any){
    // this.selectedUsr = data;
    // this.selectedMail = data.mf_email;
    // console.log("data on select",data,this.selectedMail);
    // let pdata:any = {};
    // pdata.mail = data.mf_email;
    // this.httpSrv.post('getunsignedforms',pdata).subscribe(data=>{
    //   console.log("unsigned forms",data);
    //   Object.keys(data).forEach(key=>{
    //     this.userDocs.push(data[key]);
    //       this.userDocs.push(data[key]);
    //       const byteArray = new Uint8Array(atob(data[key]).split('').map(char => char.charCodeAt(0)));
    //       this.url = URL.createObjectURL(new Blob([byteArray], {type: 'application/pdf'}));
    //       let mdata:any = {};
    //       mdata.key = "pdf";
    //       mdata.fname = key;
    //       mdata.dat = this.url;
    //       mdata.email = this.selectedMail;
    //       this.imageURL.push(mdata);
    //       this.showDetails = true;
    //   }) 
      
    // });

  }


  viewDoc(content:any){
    console.log("content",content);
    
    const modalref =  this.modalService.open(ViewDocComponent,{size:'lg'});
    modalref.componentInstance.data = content;
    
  }

  back(){
    window.location.reload();
  }
  
  updateunsigned(){
    const modalref =  this.modalService.open(UploadFormComponent,{size:'lg'});
    modalref.componentInstance.data = this.mail;
    modalref.componentInstance.which = "unsigned";
     
  }


}

