import {Component ,OnInit} from '@angular/core';
import { navItems } from '../../_nav';



import {CommonHttpService} from '../../services/common-http.service';
import {AuthService} from  '../../services/auth/auth.service';
// import {MdbTableDirective} from 'PATH-TO-MDB-ANGULAR';
import {DataServiceService} from '../../services/data-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit{
  notiData:any;
  shl:Boolean = false;
  updateDat:any = [];
  navs:any = [];
  tnavs:any = [];
  constructor(
    private httpSrv:CommonHttpService,
    private authSrv:AuthService,
    private dataSrv:DataServiceService
    ){
      this.httpSrv.get('useralertdocs').subscribe(data=>{
        console.log("alerts in  upadate",data);
        data.forEach(ele => {
          this.dataSrv.SharingData.next(ele);
        });
        
      })
      this.dataSrv.SharingData.subscribe(data=>{
        this.updateDat.push(data);
        // this.updateDat = this.updateDat.filter(ele=>ele.status==0);
        
      });
      console.log("user data in auth",this.authSrv.getUser().role);
      let pdata:any = {};
      pdata.role = this.authSrv.getUser().role;
      this.httpSrv.post('getnavs',pdata).subscribe(data=>{
        console.log("haiii",data);
        
        data.forEach(ele => {
          let nv:any = {};
          nv.name = ele.name;
          nv.url = ele.url;
          nv.icon = ele.icon;
          nv.parent = ele.parent;
          if(ele.parent != null){
            let status = false;
            let i=0;
            this.navs.forEach(element => {
              if(element.parent == ele.parent){
                console.log(this.navs);
                status = true;
                nv.url = ele.parent+ele.url;
                element.children.push(nv);
              }
              i++;
              
            });
            if(!status){
              
              let children = [];
               let route = 
                  {
                    name:  ele.name,
                    url: ele.parent+ele.url,
                    icon: 'icon-user'
                  };
                  children.push(route);
                nv.children = children;
                this.navs.push(nv);
            }
            }else{
              let x:Boolean = true;
              this.navs.forEach(element => {
                if(element.name == ele.name){
                  x = false;
                }
                
              });
              if(x){
                this.navs.push(nv);
              }
              
            }
            
          });
          // let uniqueObject = {};
          // for (let i in this.navs) { 
          //     let objTitle = data[i]['name']; 
          //     uniqueObject[objTitle] = data[i]; 
          // } 
            
          // for (let i in uniqueObject) { 
          //     this.tnavs.push(uniqueObject[i]); 
          // } 
          console.log("nava before sharing",this.navs);
        },err=>{
          console.log("error while getting navs",err);
        });
      
      // this.dataSrv.SharingNav.subscribe(data=>{
        // this.navs = [
        //   {
        //     name : "Registered Users",
        //     url : "base/registered",
        //     icon : "fa fa-user"
        //   }
        // ];
      //   console.log("fooolol",this.navs);
        
      // });



  }

  ngOnInit(){
    this.httpSrv.get('notifications').subscribe(data=>{
      console.log("data in notifications",data);
      this.notiData = data;
      
    },err=>{
      console.log("erroe while getting notifications",err);
      
    })
  }
  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout(){
    this.authSrv.logout();
  }

  rmupdate(data,i){
    if(data.status == 1){
      this.updateDat.splice(i,1);
    }
  }

  getNavs(role:any){
    let pdata:any = {};
      pdata.role = role;
      this.httpSrv.post('getnavs',pdata).subscribe(data=>{
        console.log("navs",data);
        let nv:any = {};
        nv.name = data[0].name;
        nv.url = data[0].url;
        nv.icon = data[0].icon;
        console.log("nava before sharing",nv);
        
      },err=>{
        console.log("error while getting navs",err);
        
      })
  }
}
