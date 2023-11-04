import { Component, Input } from '@angular/core';
import { Prospect } from '../../../models/prospect';
import { ProspectService } from '../../../services/prospect.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-prospect-form',
  templateUrl: './prospect-form.component.html',
  styleUrls: ['./prospect-form.component.scss']
})
export class ProspectFormComponent {
  @Input() prospect: Prospect = new Prospect();
  @Input() isAddForm: boolean = false;

  isSubmitting: boolean = false;

  constructor(private prospectService: ProspectService, private router: Router, private snackbarService: SnackbarService) { }

  onSubmit() {
    this.isSubmitting = true;

    if (this.isAddForm) {
      this.prospectService.addProspect(this.prospect).subscribe({
        next: prospect => {
          this.router.navigate(['prospects']);
          this.snackbarService.openErrorSnackBar(`Ajout de "${prospect.nom}" réussie !`);
        },
        error: error => this.snackbarService.openErrorSnackBar(`Oupsss, une erreur technique est survenue lors de l'ajout :(`),
        complete: () => this.isSubmitting = false
    });
    }
    else {
      this.prospectService.updateProspect(this.prospect).subscribe({
        next: prospect => {
          this.router.navigate(['prospects']);
          this.snackbarService.openErrorSnackBar(`Mise à jour de "${prospect.nom}" réussie !`);
        },
        error: error => this.snackbarService.openErrorSnackBar(`Oupsss, une erreur technique est survenue lors de la sauvegarde :(`),
        complete: () => this.isSubmitting = false
      })
    }
  }
}
