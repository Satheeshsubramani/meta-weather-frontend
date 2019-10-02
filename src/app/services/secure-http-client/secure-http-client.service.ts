import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecureHttpClientService {

  constructor(private httpClient: HttpClient) {
  }

  public getSearchResult(url: string): Observable<any> {
    return this.httpClient.get(url, this.getHttpOptions());
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }
}
