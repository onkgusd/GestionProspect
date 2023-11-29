import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from "jwt-decode";
import { ReinitMotDePasseDto } from '../modules/gestion-prospect/dto/reinit-motdepasse-dto';

interface AuthResponse {
  token: string;
  expirationDate: Date;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private token: string | undefined = localStorage.getItem("token") ?? void 0;
  private role: string | undefined;
  private userName: string | undefined;

  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn.asObservable();

  private _userName = new BehaviorSubject<string>("");
  userName$ = this._userName.asObservable();

  private _isAdmin = new BehaviorSubject<boolean>(false);
  isAdmin$ = this._isAdmin.asObservable();

  constructor(private http: HttpClient) {
    if (this.token)
      this.readToken(this.token);
  }

  login(login: string, password: string): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }

    return this.http.post<AuthResponse>(`${environment.webapiBaseUrl}/authentication/getToken`, { login, password }, httpOptions).pipe(
      map((response: AuthResponse) => {
        localStorage.setItem("token", response.token)
        localStorage.setItem("expires_at", response.expirationDate.toString());
        this.token = response.token;
        this.readToken(response.token);
        return true;
      }),
      catchError((error) => {
        console.log(error);
        return of(false);
      })
    );
  }

  logout() {
    this.role = void 0;
    this.token = void 0;
    this.userName = void 0;
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");
    this._userName.next("");
    this._isLoggedIn.next(false);
    this._isAdmin.next(false);
  }

  getToken(): string | undefined {
    return this.token;
  }

  isAdmin(): boolean {
    return this.role === "Admin";
  }

  private readToken(token: string): boolean {
    const decodedToken = this.getDecodedToken(token);

    if (decodedToken) {
      this.role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      this.userName = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] as string;
      this._userName.next(this.userName);
      this._isLoggedIn.next(true);
      this._isAdmin.next(this.role === "Admin");
      return true;
    }

    this._userName.next("");
    this._isLoggedIn.next(false);

    return false;
  }

  private getDecodedToken(token: string): any {
    try {
      return jwtDecode(token);
    }
    catch (Error) {
      return null;
    }
  }

  demandeLienReinitialisationMotDePasse(email: string) {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }

    return this.http.post(`${environment.webapiBaseUrl}/authentication/demande-reinitialisation`, { email }, httpOptions).pipe(
      map(() => true),
      catchError((error) => {
        console.log(error);
        return of(false);
      })
    );
  }

  reinitMotDePasse(email: string, nouveauMotDePasse: string, token: string): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }
    const request: ReinitMotDePasseDto = { email, nouveauMotDePasse, token };

    return this.http.post<any>(`${environment.webapiBaseUrl}/authentication/reinitialiser-motdepasse`, request, httpOptions).pipe(
      catchError((error) => {
        console.log(error);
        return of(false);
      })
    );
  }
}
