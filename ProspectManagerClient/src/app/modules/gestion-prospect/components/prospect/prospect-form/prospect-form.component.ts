import { Component, Input, OnInit } from '@angular/core';
import { Prospect } from '../../../models/prospect';
import { ProspectService } from '../../../services/prospect.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Statut } from '../../../models/statut';
import { StatutService } from '../../../services/statut.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-prospect-form',
  templateUrl: './prospect-form.component.html',
  styleUrls: ['./prospect-form.component.scss']
})
export class ProspectFormComponent implements OnInit {
  @Input() prospect: Prospect = new Prospect();
  @Input() isAddForm: boolean = false;
  isSubmitting: boolean = false;
  statuts: Statut[];
  constructor(private prospectService: ProspectService, private router: Router, private snackbarService: SnackbarService, private statutService: StatutService) { }

  ngOnInit(): void {
    this.statutService.getStatuts().subscribe(statuts =>
        this.statuts = statuts
    );
  }

  onSubmit() {
    this.isSubmitting = true;

    if (this.isAddForm) {
      this.prospectService.addProspect(this.prospect).subscribe({
        next: prospect => {
          this.router.navigate(['prospects']);
          this.snackbarService.openErrorSnackBar(`Ajout de "${prospect.nom}" réussi !`);
        },
        error: error => this.snackbarService.openErrorSnackBar(`Oups, une erreur technique est survenue lors de l'ajout :(`),
        complete: () => (this.isSubmitting = false)
      });
    } else {
      this.prospectService.updateProspect(this.prospect).subscribe({
        next: prospect => {
          this.router.navigate(['prospects']);
          this.snackbarService.openErrorSnackBar(`Mise à jour de "${prospect.nom}" réussie !`);
        },
        error: error =>
          this.snackbarService.openErrorSnackBar(`Oups, une erreur technique est survenue lors de la sauvegarde :(`),
        complete: () => (this.isSubmitting = false)
      });
    }
  }
  
  compareStatuts(statut1: Statut, statut2: Statut): boolean {
    return statut1 && statut2 ? statut1.id === statut2.id : statut1 === statut2;
  }
}
