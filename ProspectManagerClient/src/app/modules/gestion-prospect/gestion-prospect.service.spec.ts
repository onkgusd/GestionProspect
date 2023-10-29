import { TestBed } from '@angular/core/testing';

import { GestionProspectService } from './gestion-prospect.service';

describe('GestionProspectService', () => {
  let service: GestionProspectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionProspectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
