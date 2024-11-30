import { TestBed } from '@angular/core/testing';

import { AuthenticatorServiceService } from './authenticator-service.service';

describe('AuthenticatorServiceService', () => {
  let service: AuthenticatorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticatorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
