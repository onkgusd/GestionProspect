import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProspectSearchRequestDto } from '../dto/prospect-search-request-dto';
import { ProspectSummaryResponseDto } from '../dto/prospect-summary-response-dto';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private prospectSearchDto: ProspectSearchRequestDto = new ProspectSearchRequestDto();
  private searchResult: ProspectSummaryResponseDto[] = [];
  private launched: boolean;

  constructor(private http: HttpClient) { }

  searchProspect(prospectSearchDto: ProspectSearchRequestDto): Observable<ProspectSummaryResponseDto[]> {
    this.prospectSearchDto = prospectSearchDto;
    this.searchResult = [];
    this.launched = true;
    
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }

    return this.http.post<ProspectSummaryResponseDto[]>(`${environment.webapiBaseUrl}/prospects/search/`, prospectSearchDto, httpOptions).pipe(
      tap(result => this.searchResult = result),
      catchError((error) => {
        console.log(error);
        throw error;
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

  reinitSearch(){
    this.prospectSearchDto = new ProspectSearchRequestDto();
    this.searchResult = [];
  }
}
