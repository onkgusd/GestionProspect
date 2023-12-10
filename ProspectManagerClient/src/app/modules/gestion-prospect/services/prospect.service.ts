import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Prospect } from '../models/prospect';
import { environment } from 'src/environments/environment';
import { ProduitProspect } from '../models/produitprospect';
import { ProduitProspectDto } from '../dto/produitprospect-dto';
import { Modification } from '../models/modification';
import { ProspectSummaryResponseDto } from '../dto/prospect-summary-response-dto';
import { DeleteResponseDto } from '../dto/delete-response-dto';

@Injectable({
  providedIn: 'root'
})
export class ProspectService {
  
  constructor(private http: HttpClient) { }

  getAll(): Observable<ProspectSummaryResponseDto[]> {
    return this.http.get<ProspectSummaryResponseDto[]>(`${environment.webapiBaseUrl}/prospects`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  get(id: number): Observable<Prospect> {
    return this.http.get<Prospect>(`${environment.webapiBaseUrl}/prospects/${id}`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  add(prospect: Prospect): Observable<Prospect> {
    const httpOptions = {
      headers : new HttpHeaders({"Content-Type": "application/json"})
    }

    return this.http.post<Prospect>(`${environment.webapiBaseUrl}/prospects`, prospect, httpOptions).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    )
  }

  update(prospect: Prospect) {
    const httpOptions = {
      headers : new HttpHeaders({"Content-Type": "application/json"})
    }

    return this.http.put<Prospect>(`${environment.webapiBaseUrl}/prospects/${prospect.id}`, prospect, httpOptions).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  delete(idProspect: number) {
    return this.http.delete<DeleteResponseDto>(`${environment.webapiBaseUrl}/prospects/${idProspect}`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  addProduit(produitProspect: ProduitProspect)  {
    const httpOptions = {
      headers : new HttpHeaders({"Content-Type": "application/json"})
    }

    const produitProspectDto: ProduitProspectDto = {
      probabiliteSucces: produitProspect.probabiliteSucces
    }

    return this.http.post<Prospect>(`${environment.webapiBaseUrl}/prospects/${produitProspect.prospect.id}/produits/${produitProspect.produit.id}`, produitProspectDto, httpOptions).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    )
  }

  getProduits(idProspect: number): Observable<ProduitProspect[]> {
    return this.http.get<ProduitProspect[]>(`${environment.webapiBaseUrl}/prospects/${idProspect}/produits`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  updateProduit(produitProspect: ProduitProspect){
    const httpOptions = {
      headers : new HttpHeaders({"Content-Type": "application/json"})
    }

    const produitProspectDto: ProduitProspectDto = {
      probabiliteSucces: produitProspect.probabiliteSucces
    }

    return this.http.put<Prospect>(`${environment.webapiBaseUrl}/prospects/${produitProspect.prospect.id}/produits/${produitProspect.produit.id}`, produitProspectDto, httpOptions).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    )
  }

  deleteProduit(produitProspect: ProduitProspect){
    return this.http.delete<Prospect>(`${environment.webapiBaseUrl}/prospects/${produitProspect.prospect.id}/produits/${produitProspect.produit.id}`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  getModifications(idProspect: number): Observable<Modification[]> {
    return this.http.get<Modification[]>(`${environment.webapiBaseUrl}/prospects/${idProspect}/modifications`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}
