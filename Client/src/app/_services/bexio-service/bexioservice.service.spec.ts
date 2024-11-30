import { TestBed } from '@angular/core/testing';

import { BexioserviceService } from './bexioservice.service';

describe('BexioserviceService', () => {
  let service: BexioserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BexioserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
