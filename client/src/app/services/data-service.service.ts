import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  public mail:any = '';
  SharingData = new Subject();  
  SharingNav = new Subject();
  sharingMail = new BehaviorSubject(this.mail);
  currentMail = this.sharingMail.asObservable();

  constructor() { }

  getMail(mail:any){
    this.sharingMail.next(mail);
  }
}
