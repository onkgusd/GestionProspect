import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitProspectListForProspectComponent } from './produit-prospect-list-for-prospect.component';

describe('ProduitProspectListComponent', () => {
  let component: ProduitProspectListForProspectComponent;
  let fixture: ComponentFixture<ProduitProspectListForProspectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProduitProspectListForProspectComponent]
    });
    fixture = TestBed.createComponent(ProduitProspectListForProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
