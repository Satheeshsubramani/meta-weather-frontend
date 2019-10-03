import { TestBed } from '@angular/core/testing';
import * as td from 'testdouble';
import {Observable} from 'rxjs';

import { SecureHttpClientService } from './secure-http-client.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SecureHttpClientService', () => {

  let mockHttpClient;
  let expectedUrl;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [SecureHttpClientService]
  }));

  beforeEach(() => {
    mockHttpClient = td.object(['get']);
    expectedUrl = 'some/endpoint';
  });

  it('should be created', () => {
    const service: SecureHttpClientService = TestBed.get(SecureHttpClientService);
    expect(service).toBeTruthy();
  });

  it('should add content type header from get methods', () => {
    const mockObservable = new Observable<Object>();
    td.when(mockHttpClient.get(td.matchers.anything(), td.matchers.anything())).thenReturn(mockObservable);

    const optionsCaptor = td.matchers.captor();

    const postBody = td.object({});

    const secureClient = new SecureHttpClientService(mockHttpClient);
    const returnedFromGet = secureClient.getSearchResult(expectedUrl);

    td.verify(mockHttpClient.get(expectedUrl, optionsCaptor.capture()));
    expect(optionsCaptor.values[0].headers.get('Content-Type')).toEqual('application/json');

    expect(returnedFromGet).toEqual(mockObservable);
  });
});
