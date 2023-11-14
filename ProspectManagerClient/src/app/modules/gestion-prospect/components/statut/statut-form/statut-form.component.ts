import { Component, Input } from '@angular/core';
import { Statut } from '../../../models/statut';
import { StatutService } from '../../../services/statut.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-statut-form',
  templateUrl: './statut-form.component.html',
  styleUrls: ['./statut-form.component.scss']
})
export class StatutFormComponent {
  @Input() statut: Statut = new Statut();
  @Input() isAddForm: boolean = false;

  isSubmitting: boolean = false;

  constructor(private statutService: StatutService, private router: Router, private snackbarService: SnackbarService) { }

  onSubmit(){
    this.isSubmitting = true;

    if (this.isAddForm) {
      this.statutService.add(this.statut).subscribe({
        next: statut => {
          this.router.navigate(['statuts']);
          this.snackbarService.openErrorSnackBar(`Ajout de "${statut.libelle}" réussi !`);
        },
        error: error => this.snackbarService.openErrorSnackBar(`Oups, une erreur technique est survenue lors de l'ajout :(`),
        complete: () => this.isSubmitting = false
      });
    }
    else {
      this.statutService.update(this.statut).subscribe({
        next: statut => {
          this.router.navigate(['statuts']);
          this.snackbarService.openErrorSnackBar(`Mise à jour de "${statut.libelle}" réussie !`);
        },
        error: error => this.snackbarService.openErrorSnackBar(`Oups, une erreur technique est survenue lors de la sauvegarde :(`),
        complete: () => this.isSubmitting = false
      });
    }
  }
}
