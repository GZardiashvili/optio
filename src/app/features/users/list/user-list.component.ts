import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UsersService} from "../services/users.service";
import {User} from "../entity/user";
import {BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, Subject, switchMap, takeUntil} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {CommonService} from "../../../common/common.service";
import {environment} from 'src/environments/environment.development';
import {FormControl} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {
  readonly environment = environment;
  private componentIsDestroyed$ = new Subject<boolean>();
  searchControl = new FormControl<string>('');
  displayedColumns: string[] = ['picture', 'email', 'firstname', 'lastname', 'role', 'status', 'action'];
  dataSource = new MatTableDataSource<User>([]);
  placeholder: string = 'Search Users...'
  @Output() findById: EventEmitter<string> = new EventEmitter();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() clicked: EventEmitter<boolean> = new EventEmitter();

  constructor(private usersService: UsersService,
              private route: ActivatedRoute,
              private commonService: CommonService,
              public dialog: MatDialog,
  ) {

  }

  ngOnInit() {
    this.commonService.getUpdate().subscribe(res => {
      if (res) {
        this.getusers()
      }
    })

  }

  getusers() {
    if (this.searchControl.value === '') {
      this.usersService.getUsers({search: ''})
        .pipe(
          debounceTime(500),
          takeUntil(this.componentIsDestroyed$),
          distinctUntilChanged()
        )
        .subscribe(users => {
          this.dataSource = new MatTableDataSource<User>(users.data.entities);
        });
      this.searchControl.valueChanges.subscribe(term => {
        this.usersService.getUsers({search: term || ''})
          .pipe(
            debounceTime(500),
            takeUntil(this.componentIsDestroyed$),
            distinctUntilChanged()
          )
          .subscribe(users => {
            this.dataSource = new MatTableDataSource<User>(users.data.entities);
          });
      })
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  delete(id: string) {
    const dialogRef = this.dialog.open(DialogExample, {
      width: '250px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration:  '0ms',
    });

    dialogRef.afterClosed().subscribe(res => {
      if (id && res) {
        this.usersService.deleteUser(id).subscribe(res => {
            console.log(res)
            this.getusers()
          }
        )
      }
    })


  }

  findOne(id: string) {
    console.log(id)
    this.findById.emit(id)
    this.clicked.emit(true)
  }

}


@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-example.html',
})
export class DialogExample {

  constructor(public dialogRef: MatDialogRef<DialogExample>) {
  }
}
