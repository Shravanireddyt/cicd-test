import { Component, OnInit , Input} from '@angular/core';
import {CommonHttpService} from '../../../services/common-http.service';
import {NgbModal, ModalDismissReasons,NgbModalOptions,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {UploadFormComponent} from '../upload-form/upload-form.component';
import {ViewDocComponent} from '../../active-users/view-doc/view-doc.component';
import {FormGroup,FormControl,FormBuilder,FormArray} from '@angular/forms';
import {DataServiceService} from '../../../services/data-service.service';

@Component({
  selector: 'app-signed-forms',
  templateUrl: './signed-forms.component.html',
  styleUrls: ['./signed-forms.component.css']
})
export class SignedFormsComponent implements OnInit {
  @Input() mail:any;
  uccData:any;
  spinner:Boolean = true;
  imageURL:any = [];
  url:any;
  userDocs:any = [];
  thumbnail: any;
  showDetails:Boolean = false;


  inpform:FormGroup;

  inputs:any = [];
  no:Boolean = false;


  constructor(
    private httpSrv:CommonHttpService,
    private modalSrv:NgbModal,
    private fb:FormBuilder,
    private dataSrv:DataServiceService
    ) { }

  ngOnInit() {
    console.log("input in signed forms",this.mail);
      
      let pdata:any = {};
      pdata.mail = this.mail;
      this.httpSrv.post('getsignedforms',pdata).subscribe(data=>{
        console.log("signed forms",data);
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
            mdata.checked = true;
            mdata.email = this.mail;
            this.imageURL.push(mdata);
              this.showDetails = true;
          }) 
        }
        
        
      },err=>{

      },()=>{
        this.spinner = false;
      });
    // this.inpform =this.fb.group({
      
    //   text: this.fb.group([ ]),
    //   email:this.fb.group([]),
    //   password:this.fb.group([])
    // });

    // this.httpSrv.get('activeusers').subscribe(data=>{
    //   this.uccData = data;
    //   this.spinner = false;
      
    // },err=>{
    //   console.log("error while getting ucc data");
      
    // })
  }

  upload(){
    const modalref =  this.modalSrv.open(UploadFormComponent,{size:'lg'});
    modalref.componentInstance.data = this.mail;
    modalref.componentInstance.which = "signed";
      
    }


    details(mail:any){
      // console.log("mail",mail);
      
      // let pdata:any = {};
      // pdata.mail = mail;
      // this.httpSrv.post('getsignedforms',pdata).subscribe(data=>{
      //   console.log("unsigned forms",data);
      //   Object.keys(data).forEach(key=>{
      //     this.userDocs.push(data[key]);
      //       const byteArray = new Uint8Array(atob(data[key]).split('').map(char => char.charCodeAt(0)));
      //       this.url = URL.createObjectURL(new Blob([byteArray], {type: 'application/pdf'}));
      //       let mdata:any = {};
      //     mdata.key = "pdf";
      //     mdata.fname = key;
      //     mdata.dat = this.url;
      //     mdata.checked = true;
      //     mdata.email = mail;
      //     this.imageURL.push(mdata);
      //       this.showDetails = true;
      //   }) 
        
      // });
  
    }
  
    viewDoc(content:any){
      console.log("content",content);
      
      const modalref =  this.modalSrv.open(ViewDocComponent,{size:'lg'});
      modalref.componentInstance.data = content;
      
    }
  
    back(){
      window.location.reload();
    }

    isAllSelected(eve,ind) {
      console.log(ind);
      this.imageURL[ind].checked = !this.imageURL[ind].checked;
      console.log(this.imageURL);
    }
  
  
    raiseAlert(val:any,s,ind,from:any){
      console.log("data in signed",val,s,ind);
      console.log(this.userDocs);
      val.dat =  this.userDocs[ind];
      val.description = s;
      val.place = from;
      this.httpSrv.post('errdocs',val).subscribe(data=>{
        console.log("alert raised successfully");
        
      },err=>{
        console.log("error while doc raise",err);
        
      });
      this.dataSrv.SharingData.next(val);
       
    }
    
    // addInputs(type:any){
    //   let inp:any = {};
    //   inp.type = type;
    //   inp.val = '';
    //   this.inputs.push(inp);
    // }
    
    // create(){
    //   console.log(this.inputs);
      
    // }

  }