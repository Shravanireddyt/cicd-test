import { DialogComponent } from './../dialog/dialog.component';
import { Component, OnInit, ElementRef } from '@angular/core';
import {NgbModal, ModalDismissReasons,NgbModalOptions,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {CommonHttpService} from '../../../services/common-http.service';
import {ViewDocComponent} from '../view-doc/view-doc.component';
import { DataServiceService } from '../../../services/data-service.service';
import { MatDialog } from '@angular/material/dialog';



import { Data } from '@angular/router';
import { faClosedCaptioning, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  userdocs:any;
  file:File;
  activeData:any;
  closedData: any;
  
  // mine
  allAlerts: any;
  mainSpinner: boolean;
  selectedIndex = null;
  resolveStatus: boolean;
  faRefresh = faSyncAlt;
  constructor(
    private modalService: NgbModal,
    private httpSrv:CommonHttpService,
    private dataSrv: DataServiceService,
    public dialog: MatDialog,
    private el: ElementRef
    ) { }

  ngOnInit() {
    this.mainSpinner = true;
   this.loadAlerts()

  }
  openDialog(alert) {
    console.log(alert)
    let dialogRef = this.dialog.open(DialogComponent, { width: '500px', data: { alert } });
    dialogRef.afterClosed().subscribe(result => {
      this.loadAlerts()
    });
  }
  refresh() {
    let myTag = this.el.nativeElement.querySelector("#rotate");
    if(!myTag.classList.contains('rotating')){
        myTag.classList.add('rotating'); 
    }
    this.loadAlerts(myTag)
  }

  loadAlerts(...args) {
     this.httpSrv.getMoreData('alerts/get_alerts',{}).subscribe(data=>{
      console.log("usert alert docs", data);
       this.mainSpinner = false;
       this.allAlerts = data['result']
       if (args.length > 0) {
         args[0].classList.remove('rotating')
       }
      console.log(this.allAlerts)
    }, err => {
      this.mainSpinner = false;
      console.log(err)
    })
  }


  viewDoc(val:any){
    const modalref = this.modalService.open(ViewDocComponent,{size:'lg'});
    modalref.componentInstance.data = val;
  }

  handleFileInput(event){
    this.file = event.target.files[0];
  }

  upload(data){
    if(this.file){
      let pdata:any = {};
      pdata.file = this.file;
      pdata.mail = data.email;
      pdata.fname = data.fname;
      this.httpSrv.postRectifiedFile(pdata, 'uploadrectified').subscribe(data=>{
        console.log("data",data);
        
      })
    }
    else{
      console.log("plesse selet file");
      
    }
    
  }

  close(data,i){
    console.log("data on closing",data);
    this.httpSrv.post('updatealertstatus',JSON.stringify(data)).subscribe(data=>{
      console.log("status dta after updating alert status",data);
      let alrt:any = {};
      // alrt.data = data[0];
      alrt.msg = 'close';
      data[0]['msg'] = 'close';
      this.dataSrv.SharingData.next(data[0]);
      this.activeData.splice(i,1);
    },err=>{
      console.log("err in updating alert status",err);
      
    });
  }

}
