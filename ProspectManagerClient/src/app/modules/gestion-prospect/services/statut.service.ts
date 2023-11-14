import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Statut } from '../models/statut';
import { environment } from 'src/environments/environment';
import { Observable, catchError, tap } from 'rxjs';
import { DeleteResponseDto } from '../dto/delete-response-dto';

@Injectable({
  providedIn: 'root'
})
export class StatutService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Statut[]> {
    return this.http.get<Statut[]>(`${environment.baseUrl}/statuts`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  get(id: number): Observable<Statut> {
    return this.http.get<Statut>(`${environment.baseUrl}/statuts/${id}`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  add(statut: Statut): Observable<Statut> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };

    return this.http.post<Statut>(`${environment.baseUrl}/statuts`, statut, httpOptions).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  update(statut: Statut) {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };

    return this.http.put<Statut>(`${environment.baseUrl}/statuts/${statut.id}`, statut, httpOptions).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  delete(idStatut: number) {
    return this.http.delete<DeleteResponseDto>(`${environment.baseUrl}/statuts/${idStatut}`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}
