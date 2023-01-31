import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {UserGeneralForm} from "../entity/user-general-form";
import {environment} from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  getUsers(props: { search?: string, pageIndex?: number, pageSize?: number }) {
    return this.http.post<any>(`${environment.apiUrl}admin/users/find`, {
      pageIndex: props.pageIndex,
      pageSize: props.pageSize,
      search: props.search || "",
    })
  }

  saveUser(user: ɵTypedOrUntyped<UserGeneralForm, ɵFormGroupValue<UserGeneralForm>, any>) {
    return this.http.post<any>(`${environment.apiUrl}admin/users/save`, user)

  }

  deleteUser(id: string) {
    return this.http.post<any>(`${environment.apiUrl}admin/users/remove`, {id})
  }

  findOne(id: string) {
    return this.http.post<any>(`${environment.apiUrl}admin/users/find-one`, {id})
  }
}
