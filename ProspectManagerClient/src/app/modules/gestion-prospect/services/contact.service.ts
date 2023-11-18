import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Contact } from '../models/contact';
import { environment } from 'src/environments/environment';
import { IEntityService } from './IEntity.service';
import { DeleteResponseDto } from '../dto/delete-response-dto';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  
  constructor(private http: HttpClient) { }

  getAll(idProspect: number): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${environment.baseUrl}/prospects/${idProspect}/contacts`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  get(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${environment.baseUrl}/contacts/${id}`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  add(contact: Contact, idProspect: number): Observable<Contact> {
    const httpOptions = {
      headers : new HttpHeaders({"Content-Type": "application/json"})
    }

    return this.http.post<Contact>(`${environment.baseUrl}/prospects/${idProspect}/contacts`, contact, httpOptions).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    )
  }

  update(contact: Contact) {
    const httpOptions = {
      headers : new HttpHeaders({"Content-Type": "application/json"})
    }

    return this.http.put<Contact>(`${environment.baseUrl}/contacts/${contact.id}`, contact, httpOptions).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  delete(contact: Contact) {
    return this.http.delete<DeleteResponseDto>(`${environment.baseUrl}/contacts/${contact.id}`).pipe(
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}
