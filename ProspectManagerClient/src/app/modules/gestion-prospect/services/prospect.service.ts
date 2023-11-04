import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Prospect } from '../models/prospect';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProspectService {
  
  constructor(private http: HttpClient) { }

  getProspects(): Observable<Prospect[]> {
    return this.http.get<Prospect[]>(`${environment.baseUrl}/prospects`).pipe(
      tap(produitsList => console.log(produitsList)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  getProspect(id: number): Observable<Prospect> {
    return this.http.get<Prospect>(`${environment.baseUrl}/prospects/${id}`).pipe(
      tap(prospect => console.log(prospect)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  addProspect(prospect: Prospect): Observable<Prospect> {
    const httpOptions = {
      headers : new HttpHeaders({"Content-Type": "application/json"})
    }

    return this.http.post<Prospect>(`${environment.baseUrl}/prospects`, prospect, httpOptions).pipe(
      tap(prospect => console.log(prospect)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    )
  }

  updateProspect(prospect: Prospect) {
    const httpOptions = {
      headers : new HttpHeaders({"Content-Type": "application/json"})
    }

    return this.http.put<Prospect>(`${environment.baseUrl}/prospects/${prospect.id}`, prospect, httpOptions).pipe(
      tap(response => console.log(response)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  deleteProspect(prospect: Prospect) {
    return this.http.delete<Prospect>(`${environment.baseUrl}/produits/${prospect.id}`).pipe(
      tap(response => console.log(response)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}
