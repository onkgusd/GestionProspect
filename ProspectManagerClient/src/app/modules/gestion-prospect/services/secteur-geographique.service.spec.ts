import { TestBed } from '@angular/core/testing';

import { SecteurGeographiqueService } from './secteur-geographique.service';

describe('SecteurGeographiqueService', () => {
  let service: SecteurGeographiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecteurGeographiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
