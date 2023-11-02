import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitAddComponent } from './produit-add.component';

describe('ProduitAddComponent', () => {
  let component: ProduitAddComponent;
  let fixture: ComponentFixture<ProduitAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProduitAddComponent]
    });
    fixture = TestBed.createComponent(ProduitAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
