import { Component, OnInit } from '@angular/core';
import {DataServiceService} from '../../../services/data-service.service'; 
import { CommonHttpService } from "../../../services/common-http.service";
import {Location} from '@angular/common';
import { Route, Router } from "@angular/router";

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {
  mail:any;
  invData:any;
  stack:any = [];
  dshow:Boolean = false;
  StepsExist:Boolean = true;
  constructor(
    private dataSrv : DataServiceService,
    private httpSrv : CommonHttpService,
    private location : Location,
    private router : Router
  ) {}

  ngOnInit() {
    this.dataSrv.currentMail.subscribe(data=>{
      this.mail = data;
      console.log("mail in steps",this.mail);
      if(this.mail != ''){
        this.getSteps();
      }
      else{
        this.location.back();
      }
    })
  }

  getSteps(){
    let pdata:any = {};
    pdata.mail = this.mail;
    console.log(this.mail);
    this.httpSrv.post('getsteps' , pdata).subscribe(data=>{
      if(data.length>0){
        this.invData = data[0];
      
      this.formatData();
      }
      else{
        this.StepsExist = false;
      }
      
    },err=>{
      console.log("error while get user steps",err);
      
    })
  }

  formatData(){
    console.log("inva data",this.invData);
    
    Object.keys(this.invData).forEach(key => {
      if(key !='id' && key !='registered_contact_details'){
        let dat:any = {};
        dat.label = key;
        dat.completed = this.invData[key]=='1'?'yes':'no';
        this.stack.push(dat);
      }
      
    });
    this.dshow = true;
    
  }

  openDetials(data:any){
    console.log("dftusrtusrtu",this.mail);
    
    this.router.navigate(['activeusers/err',this.mail]);
  }

}
