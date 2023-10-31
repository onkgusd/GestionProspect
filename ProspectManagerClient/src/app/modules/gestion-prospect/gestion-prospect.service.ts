import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Produit } from './models/produit';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestionProspectService {

  constructor(private http: HttpClient) { }

  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${environment.baseUrl}/produits`).pipe(
      tap(produitsList => console.log(produitsList)),
      catchError((error) => {
        console.error(error);
        throw new Error(error.message);
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
        throw new Error(error.message);
      })
    )
  }
}
