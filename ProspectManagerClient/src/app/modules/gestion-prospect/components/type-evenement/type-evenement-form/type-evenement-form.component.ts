import { Component, Input } from '@angular/core';
import { TypeEvenement } from '../../../models/type-evenement';
import { TypeEvenementService } from '../../../services/type-evenement.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-type-evenement-form',
  templateUrl: './type-evenement-form.component.html',
  styleUrls: ['./type-evenement-form.component.scss']
})
export class TypeEvenementFormComponent {
  @Input() typeEvenement: TypeEvenement = new TypeEvenement();
  @Input() isAddForm: boolean = false;

  isSubmitting: boolean = false;

  constructor(private typeEvenementService: TypeEvenementService, private router: Router, private snackbarService: SnackbarService) { }

  onSubmit() {
    this.isSubmitting = true;

    if (this.isAddForm) {
      this.typeEvenementService.add(this.typeEvenement)
        .pipe(finalize(() => this.isSubmitting = false))
        .subscribe({
          next: typeEvenement => {
            this.router.navigate(['types-evenement']);
            this.snackbarService.openSuccessSnackBar(`🎉 Ajout de "${typeEvenement.libelle}" réussie !`);
          },
          error: error => this.snackbarService.openErrorSnackBar(`😵 Oupsss, une erreur technique est survenue l'ajout.`),
        });
    }
    else {
      this.typeEvenementService.update(this.typeEvenement)
        .pipe(finalize(() => this.isSubmitting = false))
        .subscribe({
          next: typeEvenement => {
            this.router.navigate(['types-evenement']);
            this.snackbarService.openSuccessSnackBar(`👍 Mise à jour de "${typeEvenement.libelle}" réussie !`);
          },
          error: error => this.snackbarService.openErrorSnackBar(`😟 Oupsss, une erreur technique est survenue lors de la sauvegarde.`)
        })
    }
  }

}
