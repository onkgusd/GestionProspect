import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Prospect } from '../models/prospect';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProspectSearchDto } from '../dto/prospect-search-dto';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private prospectSearchDto: ProspectSearchDto = new ProspectSearchDto();
  private searchResult: Prospect[] = [];
  private launched: boolean;

  constructor(private http: HttpClient) { }

  searchProspect(prospectSearchDto: ProspectSearchDto): Observable<Prospect[]> {
    this.prospectSearchDto = prospectSearchDto;
    this.searchResult = [];
    this.launched = true;
    
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }

    return this.http.post<Prospect[]>(`${environment.baseUrl}/prospects/search/`, prospectSearchDto, httpOptions).pipe(
      tap(result => this.searchResult = result),
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    );
  }

  getStoredResult(){
    return this.searchResult;
  }

  getStoredSearch(){
    return this.prospectSearchDto;
  }

  hasBeenLaunched(){
    return this.launched;
  }

  private saveSearch(prospectSearchDto: ProspectSearchDto){
    this.prospectSearchDto = prospectSearchDto;
  }

  private saveResult(searchResult: Prospect[]){
    this.searchResult = searchResult;
  }
}
