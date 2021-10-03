import { Component, OnInit,Input } from '@angular/core';
import {NgbModal, ModalDismissReasons,NgbModalOptions,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-doc',
  templateUrl: './view-doc.component.html',
  styleUrls: ['./view-doc.component.css']
})
export class ViewDocComponent implements OnInit {
  @Input('data') data;
  imgURL:any ;
  show:Boolean = true;
  showImg:Boolean = false;
  constructor(private srv:NgbModal) { }

  ngOnInit() {
    if(this.data.key == "img"){
      this.show = false;
      this.imgURL = this.data.dat;
      this.showImg = true;
    }else{
      this.showImg = false;
      document.querySelector("iframe").src = this.data.dat;
    }
  }

  close(){
    this.srv.dismissAll();
  }

}
