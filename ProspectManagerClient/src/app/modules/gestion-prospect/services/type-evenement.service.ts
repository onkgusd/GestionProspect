import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeEvenement } from '../models/type-evenement';
import { environment } from 'src/environments/environment';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeEvenementService {

  constructor(private http: HttpClient) { }

  getTypesEvenement(): Observable<TypeEvenement[]> {
    return this.http.get<TypeEvenement[]>(`${environment.baseUrl}/types-evenement`).pipe(
      tap(typeEvenementList => console.log(typeEvenementList)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  getTypeEvenement(id: number): Observable<TypeEvenement> {
    return this.http.get<TypeEvenement>(`${environment.baseUrl}/types-evenement/${id}`).pipe(
      tap(typeEvenement => console.log(typeEvenement)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  addTypeEvenement(typeEvenement: TypeEvenement): Observable<TypeEvenement> {
    const httpOptions = {
      headers : new HttpHeaders({"Content-Type": "application/json"})
    }

    return this.http.post<TypeEvenement>(`${environment.baseUrl}/types-evenement`, typeEvenement, httpOptions).pipe(
      tap(produit => console.log(produit)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    )
  }

  updateTypeEvenement(typeEvenement: TypeEvenement) {
    const httpOptions = {
      headers : new HttpHeaders({"Content-Type": "application/json"})
    }

    return this.http.put<TypeEvenement>(`${environment.baseUrl}/types-evenement/${typeEvenement.id}`, typeEvenement, httpOptions).pipe(
      tap(response => console.log(response)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  deleteProduit(typeEvenement: TypeEvenement) {
    return this.http.delete<TypeEvenement>(`${environment.baseUrl}/types-evenement/${typeEvenement.id}`).pipe(
      tap(response => console.log(response)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}
