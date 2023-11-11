import { Component, Input, OnInit } from '@angular/core';
import { Utilisateur } from '../../../models/utilisateur';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-utilisateur-form',
  templateUrl: './utilisateur-form.component.html',
  styleUrls: ['./utilisateur-form.component.scss']
})
export class UtilisateurFormComponent implements OnInit {
  @Input() utilisateur: Utilisateur = new Utilisateur();
  @Input() isAddForm: boolean = false;

  isSubmitting: boolean = false;

  constructor(
    private utilisateurService: UtilisateurService,
    private snackbarService: SnackbarService,
    private location: Location
  ) { }

  ngOnInit(): void { }

  onSubmit() {
    this.isSubmitting = true;

    if (this.isAddForm) {
      this.utilisateurService.addUtilisateur(this.utilisateur).subscribe({
        next: () => {
          this.snackbarService.openSuccessSnackBar(`Utilisateur ajouté avec succès`);
          this.previousPage();
        },
        error: () => {
          this.snackbarService.openErrorSnackBar(`Erreur lors de l'ajout de l'utilisateur`);
          this.isSubmitting = false;
        }
      });
    } else {
      this.utilisateurService.updateUtilisateur(this.utilisateur).subscribe({
        next: () => {
          this.snackbarService.openSuccessSnackBar(`Utilisateur mis à jour avec succès`);
          this.previousPage();
        },
        error: () => {
          this.snackbarService.openErrorSnackBar(`Erreur lors de la mise à jour de l'utilisateur`);
          this.isSubmitting = false;
        }
      });
    }
  }

  previousPage() {
    this.location.back();
  }
}
