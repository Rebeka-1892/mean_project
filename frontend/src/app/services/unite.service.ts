import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UniteService {
  private apiUrl = `${environment.apiUrl}/unites`;
  constructor(private http: HttpClient) { }
  getUnites(): Observable<any> {
    return this.http.get(this.apiUrl, {withCredentials: true});
  }
  getUniteById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
  addUnite(unite: any): Observable<any> {
    return this.http.post(this.apiUrl, unite, {withCredentials: true});
  }
  updateUnite(id: string, unite: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, unite, {withCredentials: true});
  }
  deleteUnite(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
  async getIds(): Promise<string[]> {
    const unites = await this.getUnites().toPromise();
    return unites.map((unite: any) => unite._id);
  }
}
