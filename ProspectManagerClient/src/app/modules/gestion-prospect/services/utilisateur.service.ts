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

  getUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${environment.baseUrl}/utilisateurs`).pipe(
      tap(utilisateurs => console.log(utilisateurs)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  getUtilisateur(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${environment.baseUrl}/utilisateurs/${id}`).pipe(
      tap(utilisateur => console.log(utilisateur)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  addUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };

    return this.http.post<Utilisateur>(`${environment.baseUrl}/utilisateurs`, utilisateur, httpOptions).pipe(
      tap(newUtilisateur => console.log(newUtilisateur)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  updateUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };

    return this.http.put<Utilisateur>(`${environment.baseUrl}/utilisateurs/${utilisateur.id}`, utilisateur, httpOptions).pipe(
      tap(updatedUtilisateur => console.log(updatedUtilisateur)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  deleteUtilisateur(id: number): Observable<Utilisateur> {
    return this.http.delete<Utilisateur>(`${environment.baseUrl}/utilisateurs/${id}`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}
