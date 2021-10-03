import { Component, OnInit } from '@angular/core';
import {CommonHttpService} from '../../../services/common-http.service'; 
import * as XLSX from 'xlsx'; 
import {FormBuilder,FormGroup,FormArray,FormControl} from '@angular/forms';
import {SwPush} from '@angular/service-worker';
import {NotificationsService} from '../../../services/web-push/notifications.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  contactData:any;
  spinner:Boolean = true;
  mulform:FormGroup;
  mulselected:Boolean = false;

  sub: PushSubscription;

    readonly VAPID_PUBLIC_KEY = "BDA-i2SyxmY8bf0sRkuciMF62uh83LQm-dyBcd8tIWILFNcPTw-RrlMOEKfIpnYvtI5a485MZRA2GNW-GDEx9_k";
  
  constructor(
    private httpSrv:CommonHttpService,
    private fb:FormBuilder,
    private notSrv:NotificationsService,
    private swpush:SwPush
  ) { 
    this.mulform = this.fb.group({
      checkArray: this.fb.array([])
    })
  }

  ngOnInit() {
    this.httpSrv.getInfo('get_contact_requests').subscribe(data=>{
      console.log("data",data);
      this.contactData = data;
      this.spinner = !this.spinner;
    },err=>{
      console.log("error while getting req data");
      
    })
  }

  xlsDow(file){
    { 
      let element = document.getElementById('tab'); 
      const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb,file+".xlsx");
   }
  }

  tempArr: any = [] ;

  onCheckboxChange(e) {
    const checkArray: FormArray = this.mulform.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return; 
        }
        i++;
      });
    }
    if(this.mulform.get('checkArray').value.length>0){
      this.mulselected = true;
    }
    else{
      this.mulselected = false;
    }
  }

  deleteSelectedUsers(){
    console.log(this.mulform.get('checkArray').value,this.mulform.get('checkArray').value.length);
    
    this.httpSrv.delete(this.mulform.get('checkArray').value,'delete').subscribe(res=>{
      console.log("deleted successfully");
      window.location.reload();
      
    },err=>{


      console.log("failed to delete");
      
    })
  }

  sendNewsletter() {
    console.log("Sending Newsletter to all Subscribers ...");
    let pdata:any = {};
    pdata.from = "backop";
    pdata.title = "Sr";
    pdata.msg = "notification from backop";
    this.notSrv.send(pdata).subscribe();
}

subcribe(){
  this.swpush.requestSubscription({
    serverPublicKey: this.VAPID_PUBLIC_KEY
})
.then(sub => {

    this.sub = sub;
    console.log("Notification Subscription: ", sub);
  let postdata:any = {};
  postdata.sub = this.sub;
  postdata.form = "backop";
    this.notSrv.addPushSubscriber(postdata).subscribe(
        () => console.log('Sent push subscription object to server.'),
        err =>  console.log('Could not send subscription object to server, reason: ', err)
    );

})
.catch(err => console.error("Could not subscribe to notifications", err));
}


}
