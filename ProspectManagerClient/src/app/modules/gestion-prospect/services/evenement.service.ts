import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Evenement } from '../models/evenement';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  
  constructor(private http: HttpClient) { }

  getEvenements(idProspect: number): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(`${environment.baseUrl}prospects/${idProspect}/evenements`).pipe(
      tap(evenements => console.log(evenements)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  getEvenement(id: number): Observable<Evenement> {
    return this.http.get<Evenement>(`${environment.baseUrl}/evenements/${id}`).pipe(
      tap(evenement => console.log(evenement)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  addEvenement(evenement: Evenement): Observable<Evenement> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };

    return this.http.post<Evenement>(`${environment.baseUrl}/evenements`, evenement, httpOptions).pipe(
      tap(newEvenement => console.log(newEvenement)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  updateEvenement(evenement: Evenement): Observable<Evenement> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };

    return this.http.put<Evenement>(`${environment.baseUrl}/evenements/${evenement.id}`, evenement, httpOptions).pipe(
      tap(updatedEvenement => console.log(updatedEvenement)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  deleteEvenement(id: number): Observable<Evenement> {
    return this.http.delete<Evenement>(`${environment.baseUrl}/evenements/${id}`).pipe(
      tap(_ => console.log(`Deleted evenement with id=${id}`)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}
