import { Component, OnInit , Input} from '@angular/core';
import {FormControl,FormGroup,FormBuilder, Validators} from '@angular/forms';
import {CommonHttpService} from '../../../services/common-http.service';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {NgbModal, ModalDismissReasons,NgbModalOptions,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ViewDocComponent} from '../view-doc/view-doc.component';
import { DomSanitizer } from '@angular/platform-browser';
import {NotificationsService} from '../../../services/web-push/notifications.service';
import {constants} from '../../../constants/proj.constants';
import { contains } from 'jquery';

@Component({
  selector: 'app-user-docs',
  templateUrl: './user-docs.component.html',
  styleUrls: ['./user-docs.component.css']
})
export class UserDocsComponent implements OnInit {
  @Input() mail:any ;
  imageURL:any = [];
  url:any;
  userDocs:any = [];
  thumbnail: any;
  dataavail:Boolean = false;
  no:Boolean = false;
  // checked:Boolean = false;

  constructor(
    private httpSrv:CommonHttpService,
    private fb:FormBuilder,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private notSrv : NotificationsService
    ) { }

  
  ngOnInit() {
    console.log("email in docs",this.mail);
    // this.sendMail();
    let pdata:any = {};
    pdata.mail = this.mail;
    this.httpSrv.post('getuserdocs',pdata).subscribe(data=>{
      console.log("data docs",data);
      if(data.data){
        this.no = true;
      }
      if(!data.data){
        this.dataavail = true;
      Object.keys(data).forEach(key=>{
        this.userDocs.push(data[key]);
        if(key.split('.')[1]=='pdf'){
          // this.userDocs.push(data[key]);
          const byteArray = new Uint8Array(atob(data[key]).split('').map(char => char.charCodeAt(0)));

          // var reader = new FileReader();
          // reader.readAsDataURL(new Blob([byteArray])); 
          // reader.onloadend = () => {
          //   let objectURL = 'image/jpeg,' +reader.result;  
          //   console.log("fool",objectURL);
            
          //   this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);   
          // }
          
          // Here is your URL you can use
          this.url = URL.createObjectURL(new Blob([byteArray], {type: 'application/pdf'}));
          let mdata:any = {};
          mdata.key = "pdf";
          mdata.fname = key;
          mdata.dat = this.url;
          mdata.checked = true;
          mdata.description = "";
          mdata.email = this.mail;
          this.imageURL.push(mdata);
          // i.e. display the PDF content via iframe
          // document.querySelector("iframe").src = this.url;
          // <object data="data:base64...">
          // <embed width="100%" height="100%" src="data:application/pdf;base64,' + result + '" type="application/pdf" />
          // const linkElement = document.createElement('a');
          // const ur = URL.createObjectURL(new Blob([byteArray], {type: 'application/pdf'}));
          
          // linkElement.setAttribute('href', url);
          // linkElement.setAttribute('download', 'sample.pdf');
          // const clickEvent = new MouseEvent('click', {
          //   'view': window,
          //   'bubbles': true,
          // 'cancelable': false
          // });
          // linkElement.dispatchEvent(clickEvent);
        }
        else{
          
          let objectURL = 'data:image/jpeg;base64,' + data[key];
          
          this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          let mdata:any = {};
          mdata.key = "img";
          mdata.dat = this.thumbnail; 
          mdata.checked = true;
          mdata.fname = key;
          mdata.description = "";
          mdata.email = this.mail;
          this.imageURL.push(mdata);
        }
      });
      // console.log("fool",this.imageURL);
    }
      
    },err=>{
      console.log("error docs",err);
      
    })
  }

  viewDoc(content:any){
    const modalref =  this.modalService.open(ViewDocComponent,{size:'lg'});
    modalref.componentInstance.data = content;
    
  }

  isAllSelected(eve,ind) {
    console.log(ind);
    this.imageURL[ind].checked = !this.imageURL[ind].checked;
    console.log(this.imageURL);
  }


  raiseAlert(val:any,s,ind,from:any){
    console.log(this.userDocs);
    val.dat =  this.userDocs[ind];
    // val.dat = val.dat["changingThisBreaksApplicationSecurity"];
    val.description = s;
    val.place = from;
    // this.sendMail();
    this.httpSrv.post('errdocs',val).subscribe(data=>{
      console.log("alert raised successfully");
      
    },err=>{
      console.log("error while doc raise",err);
      
    })
    
  }

  sendMail(){
    let pdata:any = {};
    pdata.to = 'srinudolt1195@gmail.com';
    pdata.sub = "Images",
    pdata.msg = constants.IMAGE_ERR_MSG;
    this.notSrv.sendMail('/sendMail',pdata).subscribe(data=>{
      console.log("sent successfully");
      
    },err=>{
      console.log("error while sending mail",err);
      
    });
  }

}
