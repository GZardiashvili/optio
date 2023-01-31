import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchComponent} from "./search/search.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";

const components = [SearchComponent]

@NgModule({
  declarations: [...components,],
  exports: [
    SearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class SharedModule {
}
