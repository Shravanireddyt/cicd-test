import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searfilter'
})
export class SearfilterPipe implements PipeTransform {

  transform(items:any[] , field:string , value:string): any[] {
    console.log("sldkfj",items,field,value);
    
    
    if(!items){
      return [];
    }

    if(!field || !value){
      return items;
    }

    return items.filter(item=> item[field].toLowerCase().includes(value.toLowerCase()));
  }
}
