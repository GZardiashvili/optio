import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private searchTerm$ = new BehaviorSubject<string>('');
  private update$ = new BehaviorSubject<boolean>(true);

  sendSearchTerm(message: string) {
    this.searchTerm$.next(message);
  }

  getSearchTerm(): Observable<string> {
    return this.searchTerm$.asObservable();
  }

  sendUpdate(message: boolean) {
    this.update$.next(message);
  }

  getUpdate(): Observable<boolean> {
    return this.update$.asObservable();
  }


}
