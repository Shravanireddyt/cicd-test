import { Injectable } from '@angular/core';
import {JSEncrypt} from 'jsencrypt';

@Injectable({
  providedIn: 'root'
})
export class EncdecService {
  jencrypt = new JSEncrypt();
  constructor() { }
  rsaenc(key,value:string){

    // let buffer = new Buffer(value);
    // console.log("buffer",buffer);
    
    // let encrypted = crypto.privateEncrypt('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC3yvZpIAwdkhuJZWBbIZxHTIMou5WR0Ca8UeTafdD67Y0O1On1BTa3IBfm53kya/FhIipIowso12yodjrV2b9BekSzW7e6AWKZXuqNtMZ2RdI+vBKFGv/1DFJatMwACvbl9GxXJ3L4vWGoGvEkZWuBeNiD6UVDxPWeV0LuAsZs5QIDAQAB', buffer);
    // console.log("fooooooool ra",encrypted);
    
    // return encrypted.toString('base64');



    const text = value.trim();
    this.jencrypt.setPublicKey(key);
    let cp:string = this.jencrypt.encrypt(text);
    return cp;

  }
}
