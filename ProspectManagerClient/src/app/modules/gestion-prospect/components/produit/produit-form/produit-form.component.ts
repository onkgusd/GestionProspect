import { Component, Input } from '@angular/core';
import { Produit } from '../../../models/produit';
import { ProduitService } from '../../../services/produit-service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-produit-form',
  templateUrl: './produit-form.component.html',
  styleUrls: ['./produit-form.component.scss']
})
export class ProduitFormComponent {
  @Input() produit: Produit = new Produit();
  @Input() isAddForm: boolean = false;

  isSubmitting: boolean = false;

  constructor(private produitService: ProduitService,
    private router: Router,
    private snackbarService: SnackbarService,
    private location: Location) { }

  onSubmit() {
    this.isSubmitting = true;

    if (this.isAddForm) {
      this.produitService.add(this.produit).subscribe({
        next: produit => {
          this.previousPage()
          this.snackbarService.openSuccessSnackBar(`👌 Ajout de "${produit.libelle}" réussie !`);
        },
        error: error => this.snackbarService.openErrorSnackBar(`😵 Oupsss, une erreur technique est survenue l'ajout.`),
        complete: () => this.isSubmitting = false
      });
    }
    else {
      this.produitService.update(this.produit).subscribe({
        next: produit => {
          this.previousPage()
          this.snackbarService.openSuccessSnackBar(`👍 Mise à jour de "${produit.libelle}" réussie !`);
        },
        error: error => this.snackbarService.openErrorSnackBar(`😖 Oupsss, une erreur technique est survenue lors de la sauvegarde.`),
        complete: () => this.isSubmitting = false
      })
    }
  }

  previousPage() {
    this.location.back();
  }
}