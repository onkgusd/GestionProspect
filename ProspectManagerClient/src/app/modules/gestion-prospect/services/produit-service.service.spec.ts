import { TestBed } from '@angular/core/testing';
import { ProduitService } from './produit-service';


describe('GestionProspectService', () => {
  let service: ProduitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProduitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
