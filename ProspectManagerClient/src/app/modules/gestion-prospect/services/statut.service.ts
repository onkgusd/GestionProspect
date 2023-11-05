import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Statut } from '../models/statut';
import { environment } from 'src/environments/environment';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatutService {

  constructor(private http: HttpClient) { }

  getStatuts(): Observable<Statut[]> {
    return this.http.get<Statut[]>(`${environment.baseUrl}/statuts`).pipe(
      tap(statutList => console.log(statutList)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  getStatut(id: number): Observable<Statut> {
    return this.http.get<Statut>(`${environment.baseUrl}/statuts/${id}`).pipe(
      tap(statut => console.log(statut)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  addStatut(statut: Statut): Observable<Statut> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };

    return this.http.post<Statut>(`${environment.baseUrl}/statuts`, statut, httpOptions).pipe(
      tap(statut => console.log(statut)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  updateStatut(statut: Statut) {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };

    return this.http.put<Statut>(`${environment.baseUrl}/statuts/${statut.id}`, statut, httpOptions).pipe(
      tap(response => console.log(response)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  deleteStatut(statut: Statut) {
    return this.http.delete<Statut>(`${environment.baseUrl}/statuts/${statut.id}`).pipe(
      tap(response => console.log(response)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}
