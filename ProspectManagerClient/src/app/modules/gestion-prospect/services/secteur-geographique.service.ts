import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecteurGeographique } from '../models/secteur-geographique';
import { environment } from 'src/environments/environment';
import { Observable, catchError, tap } from 'rxjs';
import { DeleteResponseDto } from '../dto/delete-response-dto';

@Injectable({
  providedIn: 'root'
})
export class SecteurGeographiqueService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<SecteurGeographique[]> {
    return this.http.get<SecteurGeographique[]>(`${environment.webapiBaseUrl}/secteurs-geographiques`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  get(id: number): Observable<SecteurGeographique> {
    return this.http.get<SecteurGeographique>(`${environment.webapiBaseUrl}/secteurs-geographiques/${id}`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  add(secteurGeographique: SecteurGeographique): Observable<SecteurGeographique> {
    const httpOptions = {
      headers : new HttpHeaders({"Content-Type": "application/json"})
    }

    return this.http.post<SecteurGeographique>(`${environment.webapiBaseUrl}/secteurs-geographiques`, secteurGeographique, httpOptions).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    )
  }

  update(secteurGeographique: SecteurGeographique) {
    const httpOptions = {
      headers : new HttpHeaders({"Content-Type": "application/json"})
    }

    return this.http.put<SecteurGeographique>(`${environment.webapiBaseUrl}/secteurs-geographiques/${secteurGeographique.id}`, secteurGeographique, httpOptions).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  delete(idSecteurGeographique: number)  {
    return this.http.delete<DeleteResponseDto>(`${environment.webapiBaseUrl}/secteurs-geographiques/${idSecteurGeographique}`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}
