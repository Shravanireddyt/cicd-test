import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: "root",
})
export class CommonHttpService {
  API_URL = "https://backop.takeoff.in/backop_back_end/index.php/";
  LAPI_URL = "http://localhost:4400/api/";
   NSE_URL = 'https://www.nsenmf.com/NMFIITrxnService/NMFTrxnService/CREATECUSTOMER';

  // API_URL = "http://localhost/fin/backop_back_end/index.php/";
  new_api = "http://localhost:9000";
  uname = "takeoff";
  passwd = "Findestination@55";
  //   Hostname: https://15.207.96.218:2083/

  // Domain name: takeoff.in

  // User name: finnovationz

  // Password: P@ssw0rd@cpanel

  // http://takeoff.in/
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // this.httpClient.get<any>(this.new_api+'/api/lessons').subscribe(data=>{
    //   console.log("foooooooooooooooool",data);
    // })
  }

  getHeaders() {
    const options = { headers: {}, body: {} };
    options.headers["Content-Type"] = "application/json";
    options.headers['Access-Control-Allow-Origin'] = '*';
    options.headers["Access-Control-Allow-Credentials"] = "true";
    options.headers["Access-Control-Allow-Headers"] = "Content-Type";
    return options;
  }

  get(api): Observable<any> {
    return this.httpClient.get(this.API_URL + api, this.getHeaders());
  }

  getInfo(api): Observable<any> {
    return this.httpClient.get(this.LAPI_URL + api, this.getHeaders());
  }
  getProductData(api): Observable<any>{
    return this.httpClient.get(api, this.getHeaders())
  }
  getMoreData(api, data) {
   
    return this.httpClient.post(this.LAPI_URL + api, data)
  }
  updateUcc(api, data): Observable<any> {
    return this.httpClient.put(this.LAPI_URL + api, data);
  }
  
   put(api, data): Observable<any> {
    return this.httpClient.put(this.LAPI_URL + api, data);
  }

  post(api, data): Observable<any> {
    console.log("data in post", data);
    return this.httpClient.post(this.API_URL + api, data);
  }
  seoPost(api, data): Observable<any>{
     return this.httpClient.post(this.LAPI_URL + api, data);
  }
  delete(api, data): Observable<any>{
    console.log(data,"from service")
    return this.httpClient.post(this.LAPI_URL + api, data)
  }

  postxml(api,data): Observable<any>{

    // Set your HttpHeaders to ask for XML.
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "text/xml",
      }),
    };
   return this.httpClient.post(this.LAPI_URL + api, data,{ responseType: 'text' })
  }

  getxml(id): Observable<any> {
    return this.httpClient.get(
      "https://finnovationz.com/mutual_fund/v2/api/kyc/pan_status_check?pan=" +
        id,
      this.getHeaders()
    );
  }

  login(data: any): any {
    // return this.httpClient.post(this.API_URL+api,data);
    if (data.username == this.uname && data.password == this.passwd) {
      return true;
    } else {
      return false;
    }
  }

  // delete(data: any, api): Observable<any> {
  //   console.log("data in ser", data);

  //   let postdata: any = {};
  //   postdata.selected = data;
  //   console.log("postdata", postdata);

  //   return this.httpClient.post(
  //     this.API_URL + api,
  //     postdata,
  //     this.getHeaders()
  //   );
  // }

  postFile(fileToUpload: File, api): Observable<any> {
    console.log("came into ", fileToUpload);
    const formData: FormData = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);
    let some: any = this.httpClient.post(this.API_URL + api, formData);
    console.log("some", some);
    return some;
  }

  postRectifiedFile(data: any, api): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    };
    let fd = new FormData();
    for (let key of Object.keys(data)) {
      fd.append(key, data[key]);
    }
    // var body = "mail=" +data.email + "&fname=" +data.fname +  "&file=" + formData;
    console.log("body", fd);

    return this.httpClient.post<any>(this.API_URL + api, fd);
  }
} 
