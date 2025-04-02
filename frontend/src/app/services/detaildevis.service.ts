import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class DetaildevisService {
  private apiUrl = `${environment.apiUrl}/detaildevis`;
  constructor(private http: HttpClient) { }
  getDecodedToken(): any {
    const token = localStorage.getItem('token'); // Ou récupérer depuis les cookies
    if (!token) return null;
    return jwtDecode(token);
  }
  getDetaildevis(): Observable<any> {
    return this.http.get(this.apiUrl, {withCredentials: true});
  }
  getDetaildevisById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
  addDetaildevis(detaildevis: any): Observable<any> {
    return this.http.post(this.apiUrl, detaildevis, {withCredentials: true});
  }
  updateDetaildevis(id: string, detaildevis: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, detaildevis, {withCredentials: true});
  }
  deleteDetaildevis(id: string): Observable<any> {
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