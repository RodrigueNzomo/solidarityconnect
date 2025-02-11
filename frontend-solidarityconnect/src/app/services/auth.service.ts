import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // ✅ Permet à Angular d'injecter ce service automatiquement
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // Exemple d'URL d'API

  constructor(private http: HttpClient) {} // ✅ Vérifie que `HttpClient` est bien ici

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
