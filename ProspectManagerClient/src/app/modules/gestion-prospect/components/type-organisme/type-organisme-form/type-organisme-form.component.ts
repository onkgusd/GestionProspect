import { Component, Input } from '@angular/core';
import { TypeOrganisme } from '../../../models/type-organisme';
import { TypeOrganismeService } from '../../../services/type-organisme.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-type-organisme-form',
  templateUrl: './type-organisme-form.component.html',
  styleUrls: ['./type-organisme-form.component.scss']
})
export class TypeOrganismeFormComponent {
  @Input() typeOrganisme: TypeOrganisme = new TypeOrganisme();
  @Input() isAddForm: boolean = false;

  isSubmitting: boolean = false;

  constructor(private typeOrganismeService: TypeOrganismeService, private router: Router, private snackbarService: SnackbarService) { }

  onSubmit(){
    this.isSubmitting = true;

    if (this.isAddForm) {
      this.typeOrganismeService.addTypeOrganisme(this.typeOrganisme).subscribe({
        next: typeOrganisme => {
          this.router.navigate(['types-organisme']);
          this.snackbarService.openErrorSnackBar(`😊 Ajout de "${typeOrganisme.libelle}" réussie !`);
        },
        error: error => this.snackbarService.openErrorSnackBar(`😔 Oupsss, une erreur technique est survenue l'ajout.`),
        complete: () => this.isSubmitting = false
    });
    }
    else {
      this.typeOrganismeService.updateTypeOrganisme(this.typeOrganisme).subscribe({
        next: typeOrganisme => {
          this.router.navigate(['types-organisme']);
          this.snackbarService.openErrorSnackBar(`👌 Mise à jour de "${typeOrganisme.libelle}" réussie !`);
        },
        error: error => this.snackbarService.openErrorSnackBar(`😥 Oupsss, une erreur technique est survenue lors de la sauvegarde.`),
        complete: () => this.isSubmitting = false
      })
    }
  }

}
