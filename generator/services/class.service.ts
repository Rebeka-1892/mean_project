import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class [MajClass]Service {
  private apiUrl = `${environment.apiUrl}/[MinClass]s`;
  constructor(private http: HttpClient) { }
  get[MajClass]s(): Observable<any> {
    return this.http.get(this.apiUrl, {withCredentials: true});
  }
  get[MajClass]ById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
  add[MajClass]([MinClass]: any): Observable<any> {
    return this.http.post(this.apiUrl, [MinClass], {withCredentials: true});
  }
  update[MajClass](id: string, [MinClass]: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, [MinClass], {withCredentials: true});
  }
  delete[MajClass](id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
  async getIds(): Promise<string[]> {
    const response: any[] | undefined = await this.http.get<any[]>(`${this.apiUrl}/ids`, { withCredentials: true }).toPromise();
    if (!Array.isArray(response)) {
      return [];
    }
    return response.map(item => item._id);
  }
} 