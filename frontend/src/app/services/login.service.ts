import { Injectable } from '@angular/core';
import {Service} from './service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LoginService extends Service {
  constructor(protected override http: HttpClient) {
    super(http);
    this.apiUrl = `${this.apiUrl}/login`;
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user);
  }
}
