import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Utilisateur } from '../models/utilisateur';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  
  constructor(private http: HttpClient) { }

  getAll(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${environment.webapiBaseUrl}/utilisateurs`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  get(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${environment.webapiBaseUrl}/utilisateurs/${id}`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  add(utilisateur: Utilisateur): Observable<Utilisateur> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };

    return this.http.post<Utilisateur>(`${environment.webapiBaseUrl}/utilisateurs`, utilisateur, httpOptions).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  update(utilisateur: Utilisateur): Observable<Utilisateur> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };

    return this.http.put<Utilisateur>(`${environment.webapiBaseUrl}/utilisateurs/${utilisateur.id}`, utilisateur, httpOptions).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  delete(id: number): Observable<Utilisateur> {
    return this.http.delete<Utilisateur>(`${environment.webapiBaseUrl}/utilisateurs/${id}`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}
