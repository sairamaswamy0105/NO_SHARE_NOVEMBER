import { TestBed } from '@angular/core/testing';

import { ScannerDetailsService } from './scanner-details.service';

describe('ScannerDetailsService', () => {
  let service: ScannerDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScannerDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
