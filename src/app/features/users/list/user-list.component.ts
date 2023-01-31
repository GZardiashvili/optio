import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UsersService} from "../services/users.service";
import {User} from "../entity/user";
import {BehaviorSubject, Observable, Subject, takeUntil} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {CommonService} from "../../../common/common.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {
  private componentIsDestroyed$ = new Subject<boolean>();
  private readonly reloadUsers$ = new BehaviorSubject(true);
  displayedColumns: string[] = ['picture', 'email', 'firstname', 'lastname', 'role', 'status', 'action'];
  users$!: Observable<User[]>;
  users!: User[];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private usersService: UsersService,
              private route: ActivatedRoute,
              private commonService: CommonService,
  ) {

  }

  ngOnInit() {
    this.usersService.getUsers('')
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(users => {
        this.users = users.data.entities;
        console.log(users)
      });
  }

  ngAfterViewInit() {

    // this.dataSource.paginator = this.paginator;
  }
}

