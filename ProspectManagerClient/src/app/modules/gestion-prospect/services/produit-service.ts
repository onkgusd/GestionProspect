import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Produit } from '../models/produit';
import { environment } from 'src/environments/environment';
import { DeleteResponseDto } from '../dto/delete-response-dto';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${environment.webapiBaseUrl}/produits`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  get(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${environment.webapiBaseUrl}/produits/${id}`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  add(produit: Produit): Observable<Produit> {
    const httpOptions = {
      headers : new HttpHeaders({"Content-Type": "application/json"})
    }

    return this.http.post<Produit>(`${environment.webapiBaseUrl}/produits`, produit, httpOptions).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    )
  }

  update(produit: Produit) {
    const httpOptions = {
      headers : new HttpHeaders({"Content-Type": "application/json"})
    }

    return this.http.put<Produit>(`${environment.webapiBaseUrl}/produits/${produit.id}`, produit, httpOptions).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  delete(idProduit: number) {
    return this.http.delete<DeleteResponseDto>(`${environment.webapiBaseUrl}/produits/${idProduit}`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}
