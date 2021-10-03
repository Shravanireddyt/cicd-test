import { Component ,OnInit} from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import {CommonHttpService} from '../../services/common-http.service';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {DataServiceService} from '../../services/data-service.service';
import {EncdecService} from '../../services/encdec.service';
import {constants} from '../../constants/proj.constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit { 
  loginform:FormGroup;
  role:any;
  constructor(private fb:FormBuilder,
    private httpSrv:CommonHttpService,
    private authSrv:AuthService,
    private router:Router,
    private dataSrv : DataServiceService,
    private encSrv : EncdecService
    ){}
  ngOnInit(){
    this.loginform = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })

    if(this.authSrv.isLoggedIn()){
      this.router.navigate(['/']);
    }
  }

  get f(){return this.loginform.controls;}

login(){
  
  let postdata:any = {};
  postdata.username = this.loginform.get('username').value;
  postdata.password = this.loginform.get('password').value;

  //wo=ithout backend
  // let res = this.httpSrv.login(postdata);
  // if(res){
  //   this.authSrv.saveToken(postdata.username);
  //   this.router.navigate(['/']);
    

  // }
  //without backend
  console.log(postdata.password);
  
  this.httpSrv.post('login',postdata).subscribe(data=>{
    console.log("after login ",data);
    this.authSrv.saveUser(data[0]);
    this.router.navigate(['/']);
    
  },err=>{
    console.log("error while login");
    
  })
  // let res = this.httpSrv.login(postdata).subscribe(data=>{
  //   console.log("data after login",data);
    // this.role = data[0].role;
    // this.getNavs();
    // this.authSrv.saveToken(postdata.username);
    // this.router.navigate(['/']);
    
  // },err=>{
  //   console.log("error while getting login data",err);
    
  // });
  // if(res){
  //   this.authSrv.saveToken(postdata.username);
  //   this.router.navigate(['/']);

  // }
  
}

getNavs(){
  let pdata:any = {};
    pdata.role = this.role;
    this.httpSrv.post('getnavs',pdata).subscribe(data=>{
      console.log("navs",data);
      let nv:any = {};
      nv.name = data[0].name;
      nv.url = data[0].url;
      nv.icon = data[0].icon;
      console.log("nava before sharing",nv);
      
      this.dataSrv.SharingNav.next(nv);
      this.router.navigate(['/base']);
      
    },err=>{
      console.log("error while getting navs",err);
      
    })
}
  
}
