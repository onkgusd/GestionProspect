import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitProspectDialogComponent } from './produit-prospect-dialog.component';

describe('ProduitProspectDialogComponent', () => {
  let component: ProduitProspectDialogComponent;
  let fixture: ComponentFixture<ProduitProspectDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProduitProspectDialogComponent]
    });
    fixture = TestBed.createComponent(ProduitProspectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
