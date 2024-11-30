import { TestBed } from '@angular/core/testing';

import { TwoStepDataService } from './two-step-data.service';

describe('TwoStepDataService', () => {
  let service: TwoStepDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwoStepDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
