import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProduitProspectListForProduitComponent } from './produit-prospect-list-for-produit.component';

describe('ProduitProspectListForProduitComponent', () => {
  let component: ProduitProspectListForProduitComponent;
  let fixture: ComponentFixture<ProduitProspectListForProduitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProduitProspectListForProduitComponent]
    });
    fixture = TestBed.createComponent(ProduitProspectListForProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
