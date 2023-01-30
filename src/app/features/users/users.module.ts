import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';

import {MatTableModule} from '@angular/material/table';
import {UserListComponent} from "./list/user-list.component";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    UsersRoutingModule,
    MatPaginatorModule,
  ]
})
export class UsersModule {
}
