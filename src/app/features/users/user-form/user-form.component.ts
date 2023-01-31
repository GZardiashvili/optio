import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {UserGeneralForm} from "../entity/user-general-form";
import {ErrorStateMatcher} from "@angular/material/core";
import {User} from "../entity/user";
import {Subject, takeUntil} from "rxjs";
import {UsersService} from "../services/users.service";
import {CommonService} from "../../../common/common.service";
import {RolesService} from "../services/roles.service";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  private componentIsDestroyed$ = new Subject<boolean>();
  matcher = new MyErrorStateMatcher();
  @Output() closed = new EventEmitter();
  @Input() value: User | undefined;
  form = new FormGroup<UserGeneralForm>(
    {
      firstName: new FormControl<string>('', Validators.required),
      lastName: new FormControl<string>('', Validators.required),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      roles: new FormControl('', [Validators.required]),
      locked: new FormControl<boolean>(true, [Validators.required])
    }
  )
  id: string | null = null;
  roles: any[] = [];

  get emailFormControl() {
    return this.form.get('email') as FormControl<string>;
  }

  get rolesFormControl() {
    return this.form.get('roles') as FormControl<any>;
  }

  get firstNameFormControl() {
    return this.form.get('firstName') as FormControl<string>;
  }

  get lastNameFormControl() {
    return this.form.get('lastName') as FormControl<string>;
  }

  get lockedFormControl() {
    return this.form.get('locked') as FormControl<boolean>;
  }

  constructor(private usersService: UsersService,
              private rolesService: RolesService,
              private commonService: CommonService) {
  }

  ngOnInit() {
    this.setValue()
    this.getRoles()
  }

  setValue() {
    this.commonService.getSearchTerm().subscribe((id: string) => {
      this.id = id;
      if (id) {
        this.usersService.findOne(id).subscribe(
          (user: any) => {
            this.form.patchValue(user.data);
          }
        );
      } else {
        this.form.reset()
      }

    })
  }

  saveUser() {

    console.log(this.id == null)
    console.log(this.form.value)
    if (this.form.valid) {
      if (this.id) {
        const user = {
          id: this.id ? this.id : null,
          ...this.form.value,
        }
        this.usersService.saveUser(user)
          .pipe(takeUntil(this.componentIsDestroyed$))
          .subscribe(
            () => {
              this.commonService.sendUpdate(true)
              console.log('User saved');
              this.close()
            },
          );
        console.log('exsisted')
      } else {
        const user = {
          ...this.form.value,
        }
        this.usersService.saveUser(user)
          .pipe(takeUntil(this.componentIsDestroyed$))
          .subscribe(
            () => {
              this.commonService.sendUpdate(true)
              console.log('User saved');
              this.close()
            },
          );
        console.log('new')
      }
    }
  }

  getRoles() {
    this.rolesService.getRoles().subscribe(
      (roles: any) => {
        this.roles = roles.data.entities;
      })
  }

  close() {
    this.form.reset()
    this.closed.emit()
    this.id = null
  }

}
