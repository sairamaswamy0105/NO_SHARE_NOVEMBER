import { TestBed } from '@angular/core/testing';

import { SharedDataOfUserService } from './shared-data-of-user.service';

describe('SharedDataOfUserService', () => {
  let service: SharedDataOfUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedDataOfUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
