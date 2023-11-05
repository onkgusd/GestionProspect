import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitProspectListComponent } from './produit-prospect-list.component';

describe('ProduitProspectListComponent', () => {
  let component: ProduitProspectListComponent;
  let fixture: ComponentFixture<ProduitProspectListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProduitProspectListComponent]
    });
    fixture = TestBed.createComponent(ProduitProspectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
