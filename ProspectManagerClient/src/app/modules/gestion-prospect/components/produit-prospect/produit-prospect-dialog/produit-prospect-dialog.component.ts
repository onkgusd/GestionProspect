import { Component, Inject, OnInit } from '@angular/core';
import { Produit } from '../../../models/produit';
import { ProduitService } from '../../../services/produit-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-produit-prospect-dialog',
  templateUrl: './produit-prospect-dialog.component.html',
  styleUrls: ['./produit-prospect-dialog.component.scss']
})
export class ProduitProspectDialogComponent implements OnInit {
  produits: Produit[];
  selectedProduit: Produit | null = null;
  selectedRating: number = 0;
  isSubmitting: boolean = false;
  disabledProduits: Set<number | string>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private produitService: ProduitService,
    public dialogRef: MatDialogRef<ProduitProspectDialogComponent>) {
    this.disabledProduits = new Set(data.disabledProduits || []);
  }

  ngOnInit(): void {
    this.produitService.getAll().subscribe(
      {
        next: (produits) => {
          this.produits = produits;
        }
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onRatingChanged(newRating: number): void {
    this.selectedRating = newRating;
  }

  onSubmit(): void {
    if (this.selectedProduit) {
      this.dialogRef.close({ produit: this.selectedProduit, rating: this.selectedRating });
    }
  }
}