import { Component, Input } from '@angular/core';
import { Produit } from '../../models/produit'; // Assurez-vous d'importer correctement le chemin vers votre modèle de produit
import { GestionProspectModule } from '../../gestion-prospect.module';
import { GestionProspectService } from '../../gestion-prospect.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-produit-form',
  templateUrl: './produit-form.component.html',
  styleUrls: ['./produit-form.component.scss']
})
export class ProduitFormComponent {
  @Input() produit: Produit = new Produit();
  @Input() isAddForm: boolean = false;

  isSubmitting: boolean = false;

  constructor(private gestionProspectService: GestionProspectService, private router: Router, private snackbarService: SnackbarService) { }

  onSubmit() {
    if (this.isAddForm) {
      this.gestionProspectService.addProduits(this.produit).subscribe({
        next: produit => this.router.navigate(['produits', produit?.id]),
        error: error => this.snackbarService.openErrorSnackBar(`Oupsss, une erreur technique est survenue l'ajout :(`)
    });
    }
    else {
      this.gestionProspectService.updateProduit(this.produit).subscribe({
        next: produit => this.router.navigate(['produits']),
        error: error => this.snackbarService.openErrorSnackBar(`Oupsss, une erreur technique est survenue lors de la sauvegarde :(`)
      })
    }
  }
}