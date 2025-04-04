import { Injectable } from '@angular/core';
import {Observable, timeout} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private apiUrl = `${environment.apiUrl}/employes`;
  constructor(private http: HttpClient) { }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user, { withCredentials: true }).pipe(timeout(10000));
  }

  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/logout`, { withCredentials: true });
  }
}
