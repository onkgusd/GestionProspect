import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitListComponent } from './produit-list.component';

describe('ProduitsListComponent', () => {
  let component: ProduitListComponent;
  let fixture: ComponentFixture<ProduitListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProduitListComponent]
    });
    fixture = TestBed.createComponent(ProduitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
