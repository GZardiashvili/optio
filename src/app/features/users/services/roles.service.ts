import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http:HttpClient) { }

  getRoles(){
    return this.http.post<any>(`${environment.apiUrl}reference-data/find`, {
      typeId: 4,
      sortBy: "name",
      sortDirection: "asc",
      pageIndex: 0,
      pageSize: 50,
      includes: [
        "code", "name"
      ]
    })
  }
}
