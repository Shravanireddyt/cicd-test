import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  api:any = "http://localhost:8083";
  constructor(private http: HttpClient) {

  }

  addPushSubscriber(sub:any) {
      return this.http.post(this.api+'/pushSub', sub);
  }

  post(sub:any) {
    return this.http.post(this.api+'/test', sub);
  }

  sendMail(api:any , data:any):Observable<any>{
    return this.http.post(this.api+api , data);
  }

  send(data:any) {
    return this.http.post(this.api+'/sendNotification', data);
}

}
