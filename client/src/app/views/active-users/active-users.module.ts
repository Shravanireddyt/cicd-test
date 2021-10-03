import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActiveUsersRoutingModule } from './active-users-routing.module';
import { UccComponent } from './ucc/ucc.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { UserDocsComponent } from './user-docs/user-docs.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ViewDocComponent } from './view-doc/view-doc.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AlertsComponent } from './alerts/alerts.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserFormsModule } from '../user-forms/user-forms.module';

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgxSpinnerModule } from "ngx-spinner";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


// material
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatNativeDateModule } from '@angular/material/core';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EmailComponent } from './email/email.component';






@NgModule({
  declarations: [
    UccComponent,
    UserDocsComponent,
    ViewDocComponent,
    AlertsComponent,
    UpdateUserComponent,
    DialogComponent,
    EmailComponent,
  ],
  imports: [
    MatDialogModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    CommonModule,
    ActiveUsersRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    UserFormsModule,
    AccordionModule.forRoot(),
    FontAwesomeModule,
    NgxSpinnerModule,
    PdfViewerModule
  ],
  providers: [DatePipe],
  entryComponents: [ViewDocComponent, UpdateUserComponent,DialogComponent, EmailComponent],
  exports: [ViewDocComponent],
})
export class ActiveUsersModule {}
