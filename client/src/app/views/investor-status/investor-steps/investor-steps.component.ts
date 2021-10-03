import { Component, OnInit } from '@angular/core';
import {CommonHttpService} from '../../../services/common-http.service';
import {Router} from '@angular/router';
import {DataServiceService} from '../../../services/data-service.service';

@Component({
  selector: 'app-investor-steps',
  templateUrl: './investor-steps.component.html',
  styleUrls: ['./investor-steps.component.css']
})
export class InvestorStepsComponent implements OnInit {
  uccData:any;
  spinner:Boolean = true;
  pandata:any;
  constructor(
    private httpSrv:CommonHttpService,
    private route : Router,
    private dataSrv : DataServiceService
  ) { }

  ngOnInit() {
    this.httpSrv.get('activeusers').subscribe(data=>{
      
      this.uccData = data;
      this.spinner = false;
      this.getPanData();
      // if(this.route.snapshot.paramMap.get('mail')){
      //   this.details(this.route.snapshot.paramMap.get('mail'));
      // }
    },err=>{
      console.log("error while getting ucc data");
      
    })
  }

  getPanData(){
    console.log("lksdfsj");
    
    this.httpSrv.get('registered/pan').subscribe(data=>{
      console.log("pan data",data);
      this.pandata = data;
      this.formatUccData();
    },err=>{
      console.log("err pan");
      
    })
  }

  formatUccData(){
    this.uccData.forEach(element => {
      this.pandata.forEach(ele=> {
        if(ele.reg_email == element.reg_email){
          element.company_name = ele.name;
          element.pan = ele.pan;
        }
      });
      
    });
  }

  steps(mail:any){
    this.dataSrv.getMail(mail);
    this.route.navigate(['status/steps']);
    
  }

}
