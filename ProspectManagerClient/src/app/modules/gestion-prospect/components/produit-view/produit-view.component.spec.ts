import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitViewComponent } from './produit-view.component';

describe('ProduitViewComponent', () => {
  let component: ProduitViewComponent;
  let fixture: ComponentFixture<ProduitViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProduitViewComponent]
    });
    fixture = TestBed.createComponent(ProduitViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
