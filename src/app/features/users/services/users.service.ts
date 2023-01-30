import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }
  getUsers() {
    this.http.get('https://development.api.optio.ai/api/v2/admin/users/find').pipe().subscribe((data)=>{
      console.log(data)
    })
  }
}
