import { Component, Input } from '@angular/core';
import { SecteurGeographique } from '../../../models/secteur-geographique';
import { SecteurGeographiqueService } from '../../../services/secteur-geographique.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-secteur-geographique-form',
  templateUrl: './secteur-geographique-form.component.html',
  styleUrls: ['./secteur-geographique-form.component.scss']
})
export class SecteurGeographiqueFormComponent {
  @Input() secteurGeographique: SecteurGeographique = new SecteurGeographique();
  @Input() isAddForm: boolean = false;

  isSubmitting: boolean = false;

  constructor(private secteurGeographiqueService: SecteurGeographiqueService, private router: Router, private snackbarService: SnackbarService) { }

  onSubmit() {
    this.isSubmitting = true;

    if (this.isAddForm) {
      this.secteurGeographiqueService.add(this.secteurGeographique)
        .pipe(finalize(() => this.isSubmitting = false))
        .subscribe({
          next: secteurGeographique => {
            this.router.navigate(['secteurs-geographiques']);
            this.snackbarService.openSuccessSnackBar(`👌 Ajout de "${secteurGeographique.libelle}" réussie !`);
          },
          error: error => this.snackbarService.openErrorSnackBar(`😟 Oupsss, une erreur technique est survenue l'ajout.`),
        });
    }
    else {
      this.secteurGeographiqueService.update(this.secteurGeographique)
        .pipe(finalize(() => this.isSubmitting = false))
        .subscribe({
          next: secteurGeographique => {
            this.router.navigate(['secteurs-geographiques']);
            this.snackbarService.openSuccessSnackBar(`👍 Mise à jour de "${secteurGeographique.libelle}" réussie !`);
          },
          error: error => this.snackbarService.openErrorSnackBar(`😖 Oupsss, une erreur technique est survenue lors de la sauvegarde.`),
        })
    }
  }

}
