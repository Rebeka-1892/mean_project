import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';  // Import de l’environnement
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  // private apiUrl = 'http://localhost:5000/articles'; //vous pouvez modifier le port
  private apiUrl = `${environment.apiUrl}/articles`;  // Utilisation de la variable d’environnement
  constructor(private http: HttpClient) { }
  getArticles(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  getArticleById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  addArticle(article: any): Observable<any> {
    return this.http.post(this.apiUrl, article);
  }
  updateArticle(id: string, article: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, article);
  }
  deleteArticle(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
} 