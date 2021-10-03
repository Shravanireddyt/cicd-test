import { Component, OnInit } from '@angular/core';
import {FormGroup , FormBuilder , FormControl , Validators} from '@angular/forms';
import {CommonHttpService} from '../../../services/common-http.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userForm:FormGroup;
  disabled = false;
  ShowFilter = true;
  limitSelection = false;
  cities: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  routes:any = [];
  userRoles:any;

  constructor(
    private fb : FormBuilder,
    private httpSrv : CommonHttpService
  ) { }

  ngOnInit() {
    this.httpSrv.get('getroutes').subscribe(data=>{
      console.log("dta users",data);
      let uniqueObject = {};
      for (let i in data) { 
          let objTitle = data[i]['name']; 
          uniqueObject[objTitle] = data[i]; 
      } 
        
      for (let i in uniqueObject) { 
          this.routes.push(uniqueObject[i]); 
      } 
      console.log(this.routes);
      
    },err=>{
      console.log("err",err);
      
    });

    this.getRoles();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All', 
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 6,
      allowSearchFilter: this.ShowFilter
  };

    this.userForm = this.fb.group({
    username : ['' , Validators.required],
    password : ['' , Validators.required],
    role : ['',Validators.required],
    routes: []
    
    });
  }

  get user(){
    return this.userForm.controls;
  }

  getRoles(){
    this.httpSrv.get('getusers').subscribe(data=>{
      console.log("usr roles",data);
      this.userRoles = data;
      
    },err=>{
      console.log("err while roles",err);
      
    })
  }

  deleteUser(id){
    let pdata:any = {};
    pdata.id = id;
    this.httpSrv.post('deleteuser',pdata).subscribe(data=>{
      console.log("yes deleted");
      
    },err=>{
      console.log("err dele");
      
    })
  }

  createUser(){
    let pdata:any = {};
    pdata.username = this.userForm.get('username').value;
    pdata.password = this.userForm.get('password').value;
    pdata.role = this.userForm.get('role').value;
    pdata.routes = [];
    let tempRoutes = this.routes;
    console.log(this.userForm.get('routes').value);
    this.userForm.get('routes').value.forEach(element => {
      tempRoutes.forEach(ele => {
        if(ele.name == element.name){
          ele.role = this.userForm.get('role').value;
          delete ele.id;
          pdata.routes.push(ele);
        }
      });
    });
    console.log("pdata",pdata);
    
    this.httpSrv.post('createuser',pdata).subscribe(data=>{
      console.log("success",data);
      
    },err=>{
      console.log("eroor while create user",err);
      
    }) 
  }

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
}
onSelectAll(items: any) {
    console.log('onSelectAll', items);
}
toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
}

handleLimitSelection() {
    if (this.limitSelection) {
        this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    } else {
        this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    }
}

}
