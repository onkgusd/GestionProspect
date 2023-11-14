import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeEvenement } from '../models/type-evenement';
import { environment } from 'src/environments/environment';
import { Observable, catchError, tap } from 'rxjs';
import { DeleteResponseDto } from '../dto/delete-response-dto';

@Injectable({
  providedIn: 'root'
})
export class TypeEvenementService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<TypeEvenement[]> {
    return this.http.get<TypeEvenement[]>(`${environment.baseUrl}/types-evenement`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  get(id: number): Observable<TypeEvenement> {
    return this.http.get<TypeEvenement>(`${environment.baseUrl}/types-evenement/${id}`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  add(typeEvenement: TypeEvenement): Observable<TypeEvenement> {
    const httpOptions = {
      headers : new HttpHeaders({"Content-Type": "application/json"})
    }

    return this.http.post<TypeEvenement>(`${environment.baseUrl}/types-evenement`, typeEvenement, httpOptions).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    )
  }

  update(typeEvenement: TypeEvenement) {
    const httpOptions = {
      headers : new HttpHeaders({"Content-Type": "application/json"})
    }

    return this.http.put<TypeEvenement>(`${environment.baseUrl}/types-evenement/${typeEvenement.id}`, typeEvenement, httpOptions).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  delete(idTypeEvenement: number)  {
    return this.http.delete<DeleteResponseDto>(`${environment.baseUrl}/types-evenement/${idTypeEvenement}`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}
