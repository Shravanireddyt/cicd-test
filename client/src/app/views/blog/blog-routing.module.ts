import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlogListComponent} from './blog-list/blog-list.component';

const routes: Routes = [
  {path:'' , component: BlogListComponent},
  {path: 'list' , component:BlogListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
