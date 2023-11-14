import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeOrganisme } from '../models/type-organisme';
import { environment } from 'src/environments/environment';
import { Observable, catchError, tap } from 'rxjs';
import { DeleteResponseDto } from '../dto/delete-response-dto';

@Injectable({
  providedIn: 'root'
})
export class TypeOrganismeService {

  constructor(private http: HttpClient) { }

  getTypesOrganisme(): Observable<TypeOrganisme[]> {
    return this.http.get<TypeOrganisme[]>(`${environment.baseUrl}/types-organisme`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  getTypeOrganisme(id: number): Observable<TypeOrganisme> {
    return this.http.get<TypeOrganisme>(`${environment.baseUrl}/types-organisme/${id}`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  addTypeOrganisme(typeOrganisme: TypeOrganisme): Observable<TypeOrganisme> {
    const httpOptions = {
      headers : new HttpHeaders({"Content-Type": "application/json"})
    }

    return this.http.post<TypeOrganisme>(`${environment.baseUrl}/types-organisme`, typeOrganisme, httpOptions).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    )
  }

  updateTypeOrganisme(typeOrganisme: TypeOrganisme) {
    const httpOptions = {
      headers : new HttpHeaders({"Content-Type": "application/json"})
    }

    return this.http.put<TypeOrganisme>(`${environment.baseUrl}/types-organisme/${typeOrganisme.id}`, typeOrganisme, httpOptions).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  deleteTypeOrganisme(idTypeOrganisme: number)  {
    return this.http.delete<DeleteResponseDto>(`${environment.baseUrl}/types-organisme/${idTypeOrganisme}`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}
