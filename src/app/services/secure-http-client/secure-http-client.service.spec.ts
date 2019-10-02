import { TestBed } from '@angular/core/testing';

import { SecureHttpClientService } from './secure-http-client.service';

describe('SecureHttpClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SecureHttpClientService = TestBed.get(SecureHttpClientService);
    expect(service).toBeTruthy();
  });
});
