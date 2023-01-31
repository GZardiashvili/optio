import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  getUsers(term: any) {
    return this.http.post<any>(`https://development.api.optio.ai/api/v2/admin/users/find`, {})
  }
}
