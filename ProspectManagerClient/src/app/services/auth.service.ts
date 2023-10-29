import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';

interface AuthResponse {
  token: string;
  expirationDate: Date;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  token: string;

  constructor(private http: HttpClient) { }

  login(login: string, password: string): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }

    return this.http.post<AuthResponse>(`${environment.baseUrl}/authentication/getToken`, { login, password }, httpOptions).pipe(
      map((response: AuthResponse) => {
        localStorage.setItem("token", response.token)
        localStorage.setItem("expires_at", response.expirationDate.toString());
        return true;
      }),
      catchError((error) => {
        console.log(error);
        return of(false);
      })
    );
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }
}
