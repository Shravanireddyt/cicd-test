import { Component, OnInit , ViewChild , ElementRef} from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService , RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import {FormGroup , FormBuilder , Validators} from '@angular/forms';
import {CommonHttpService} from '../../../services/common-http.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, TableService]
})
export class BlogListComponent implements OnInit {
  @ViewChild('richtxt', { static: true }) rich: ElementRef;
  @ViewChild('richtxt')
    private rteEle: RichTextEditorComponent;
  postForm: FormGroup;
  mailData: any;
  constructor(
    private fb: FormBuilder,
    private httpSrv : CommonHttpService
  ) { }

  ngOnInit() {
    this.postForm = this.fb.group({
      ptitle : ['' , Validators.required],
      mtitle : ['' , Validators.required],
      yurl : ['' , Validators.required],
      metadec : ['' , Validators.required],
      mdec : ['' , Validators.required],
      author : ['' , Validators.required],
      content : ['' , Validators.required],
      Keywords : ['' , Validators.required]
    })
  }
  public value: string = "<p>asdfghjkl</p>";
  rteCreated(): void {
    this.rteEle.element.focus();
}

show(){
  console.log(this.value , this.postForm.value);
  
}

}
