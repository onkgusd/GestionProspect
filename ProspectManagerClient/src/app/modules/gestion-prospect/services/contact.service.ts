import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Contact } from '../models/contact';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  
  constructor(private http: HttpClient) { }

  getContacts(idProspect: number): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${environment.baseUrl}/prospects/${idProspect}/contacts`).pipe(
      tap(contactsList => console.log(contactsList)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  getContact(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${environment.baseUrl}/contacts/${id}`).pipe(
      tap(contact => console.log(contact)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  addContact(contact: Contact): Observable<Contact> {
    const httpOptions = {
      headers : new HttpHeaders({"Content-Type": "application/json"})
    }

    return this.http.post<Contact>(`${environment.baseUrl}/contacts`, contact, httpOptions).pipe(
      tap(contact => console.log(contact)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    )
  }

  updateContact(contact: Contact) {
    const httpOptions = {
      headers : new HttpHeaders({"Content-Type": "application/json"})
    }

    return this.http.put<Contact>(`${environment.baseUrl}/contacts/${contact.id}`, contact, httpOptions).pipe(
      tap(response => console.log(response)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  deleteContact(contact: Contact) {
    return this.http.delete<Contact>(`${environment.baseUrl}/contacts/${contact.id}`).pipe(
      tap(response => console.log(response)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}
