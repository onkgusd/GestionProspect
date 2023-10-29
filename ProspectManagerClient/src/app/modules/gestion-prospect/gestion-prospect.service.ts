import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { Produit } from './models/produit';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestionProspectService {

  constructor(private http: HttpClient) { }

  getProduits() {
    return this.http.get<Produit[]>(`${environment.baseUrl}/produits`).pipe(
      tap(pokemonList => console.log(pokemonList)),
      catchError((error) => {
        console.error(error);
        return of([]);
      })
    );
  }
}
