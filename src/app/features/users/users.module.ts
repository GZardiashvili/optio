import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';

import {MatTableModule} from '@angular/material/table';
import {DialogExample, UserListComponent} from "./list/user-list.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ManagerComponent} from "./manager/manager.component";
import {SharedModule} from "../../shared/shared.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import { UserFormComponent } from './user-form/user-form.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";

const components = [
  UserListComponent,
  ManagerComponent,
  DialogExample,
  UserFormComponent

]

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    UsersRoutingModule,
    SharedModule,
    MatSidenavModule,
    MatButtonModule,
    HttpClientModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  exports: [
    ...components
  ]})
export class UsersModule {
}
