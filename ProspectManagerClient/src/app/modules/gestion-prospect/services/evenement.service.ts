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

  getAll(idProspect: number): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(`${environment.webapiBaseUrl}prospects/${idProspect}/evenements`).pipe(
      tap(evenements => console.log(evenements)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  get(id: number): Observable<Evenement> {
    return this.http.get<Evenement>(`${environment.webapiBaseUrl}/evenements/${id}`).pipe(
      tap(evenement => console.log(evenement)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  add(idProspect: number, evenement: Evenement): Observable<Evenement> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };

    return this.http.post<Evenement>(`${environment.webapiBaseUrl}/prospects/${idProspect}/evenements`, evenement, httpOptions).pipe(
      tap(newEvenement => console.log(newEvenement)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  update(evenement: Evenement): Observable<Evenement> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };

    return this.http.put<Evenement>(`${environment.webapiBaseUrl}/evenements/${evenement.id}`, evenement, httpOptions).pipe(
      tap(updatedEvenement => console.log(updatedEvenement)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  delete(id: number): Observable<Evenement> {
    return this.http.delete<Evenement>(`${environment.webapiBaseUrl}/evenements/${id}`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}
