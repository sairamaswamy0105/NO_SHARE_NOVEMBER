import { TestBed } from '@angular/core/testing';

import { GetUserRoleService } from './get-user-role.service';

describe('GetUserRoleService', () => {
  let service: GetUserRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUserRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
