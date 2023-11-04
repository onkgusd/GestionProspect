import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Produit } from '../models/produit';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http: HttpClient) { }

  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${environment.baseUrl}/produits`).pipe(
      tap(produitsList => console.log(produitsList)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  getProduit(id: number): Observable<Produit> {
    return this.http.delete<Produit>(`${environment.baseUrl}/produits/${id}`).pipe(
      tap(produit => console.log(produit)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  addProduits(produit: Produit): Observable<Produit> {
    const httpOptions = {
      headers : new HttpHeaders({"Content-Type": "application/json"})
    }

    return this.http.post<Produit>(`${environment.baseUrl}/produits`, produit, httpOptions).pipe(
      tap(produit => console.log(produit)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    )
  }

  updateProduit(produit: Produit) {
    const httpOptions = {
      headers : new HttpHeaders({"Content-Type": "application/json"})
    }

    return this.http.put<Produit>(`${environment.baseUrl}/produits/${produit.id}`, produit, httpOptions).pipe(
      tap(response => console.log(response)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  deleteProduit(produit: Produit) {
    return this.http.delete<Produit>(`${environment.baseUrl}/produits/${produit.id}`).pipe(
      tap(response => console.log(response)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}
