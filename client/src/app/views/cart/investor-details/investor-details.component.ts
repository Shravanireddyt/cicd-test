import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonHttpService} from '../../../services/common-http.service';

@Component({
  selector: 'app-investor-details',
  templateUrl: './investor-details.component.html',
  styleUrls: ['./investor-details.component.css']
})
export class InvestorDetailsComponent implements OnInit {

  constructor(
    private httpSrv:CommonHttpService,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.httpSrv.get('getuserscart').subscribe(data=>{
      
    },err=>{
      console.log("error while in detials");
      
    })
    console.log("in details",this.route.snapshot.paramMap.get('id'));
    
  }

}
