import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeEvenement } from '../models/type-evenement';
import { environment } from 'src/environments/environment';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeEvenementService {

  constructor(private http: HttpClient) { }

  getEvenements(): Observable<TypeEvenement[]> {
    return this.http.get<TypeEvenement[]>(`${environment.baseUrl}/types-evenement`).pipe(
      tap(typeEvenementList => console.log(typeEvenementList)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}
