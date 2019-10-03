import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ConfigurationService {

  public getApiUrl() {
    return environment.apiUrl;
  }

}

