import { TestBed } from '@angular/core/testing';

import { TypeOrganismeService } from './type-organisme.service';

describe('TypeOrganismeService', () => {
  let service: TypeOrganismeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeOrganismeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
