import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogListComponent } from './blog-list/blog-list.component';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import {FormsModule , ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [BlogListComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    RichTextEditorAllModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
  
  
export class BlogModule { }
