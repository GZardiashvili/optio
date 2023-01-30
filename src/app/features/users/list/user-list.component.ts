import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UsersService} from "../services/users.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit{
  displayedColumns:string[]=['picture', 'email', 'firstname', 'lastname', 'role', 'status', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor(private userService:UsersService) {
    this.userService.getUsers()
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
  }
}


export interface PeriodicElement {
  picture:string,
  email:string,
  firstname:string,
  lastname:string,
  role:string,
  status:string,
  action:string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    picture:'picture',
    email:'string',
    firstname:'string',
    lastname:'string',
    role:'string',
    status:'string',
    action:'action'
  },
  {
    picture:'picture1',
    email:'string1',
    firstname:'string1',
    lastname:'string1',
    role:'string1',
    status:'string1',
    action:'action1'
  }
];

