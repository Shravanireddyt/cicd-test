import { Component, OnInit , ElementRef , ViewChild} from '@angular/core';
import * as XLSX from 'xlsx';
import {CommonHttpService} from '../../../services/common-http.service';
// import {NgbAccordionConfig} from '@ng-bootstrap/ng-bootstrap';

type AOA = any[][];

@Component({
  selector: 'app-sheet-upload',
  templateUrl: './sheet-upload.component.html',
  styleUrls: ['./sheet-upload.component.css']
})



export class SheetUploadComponent implements OnInit {

  data: AOA = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'mailSheet.xlsx';
  mails:any = [];
  mailData:any;
  pan_count:any;
  spinner:Boolean = true;
  constructor(private httpSrv:CommonHttpService) { }

  ngOnInit() {
    
  }


  fileChange(evt: any) {
    
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      this.data.forEach((element,i) => {
        if(i==0){
          return;
        }
        let obj:any = {};
        obj.name = element[0];
        obj.state = element[1];
        obj.pan = element[2];
        obj.status = "";
        obj.kra = "";
        this.mails.push(obj);
      
        
      });
      
      this.submit();
      

    };
    reader.readAsBinaryString(target.files[0]);
    
  }

  submit(){
    this.mails.pop();
    this.pan_count = this.mails.length;
    this.mails.forEach((ele,i) => {
      if(this.mails.length-1 == i){
        
        this.spinner = !this.spinner;
      }
      this.httpSrv.getxml(ele['pan']).subscribe(data=>{
        if("sources" in data){
          ele["status"] = "complaint";
          ele["kra"] = data.sources[0].name;

        }
        else{
          ele["status"] = "non complaint";
          ele["kra"] = "none";
        }
        
      },error=>{
        console.log("data not came",error);
      },()=>{
        this.httpSrv.post('postpancheck',ele).subscribe(data=>{
          
        },err=>{
          
        })
      });
      
    });
  }
  files: any[] = [];

  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
  }

}