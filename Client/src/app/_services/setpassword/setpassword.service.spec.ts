import { TestBed } from '@angular/core/testing';

import { SetpasswordService } from './setpassword.service';

describe('SetpasswordService', () => {
  let service: SetpasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetpasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
