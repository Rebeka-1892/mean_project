import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  protected apiUrl = `${environment.apiUrl}/login`;
  constructor(protected http: HttpClient) { }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user);
  }
}
