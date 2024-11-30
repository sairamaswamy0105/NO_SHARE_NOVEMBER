import { TestBed } from '@angular/core/testing';

import { GetuserbyidService } from './getuserbyid.service';

describe('GetuserbyidService', () => {
  let service: GetuserbyidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetuserbyidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
