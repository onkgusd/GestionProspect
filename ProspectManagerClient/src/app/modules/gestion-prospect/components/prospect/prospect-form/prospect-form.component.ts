import { Component, Input, OnInit } from '@angular/core';
import { Prospect } from '../../../models/prospect';
import { ProspectService } from '../../../services/prospect.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Statut } from '../../../models/statut';
import { StatutService } from '../../../services/statut.service';
import { TypeOrganisme } from '../../../models/type-organisme';
import { TypeOrganismeService } from '../../../services/type-organisme.service';
import { SecteurGeographique } from '../../../models/secteur-geographique';
import { SecteurGeographiqueService } from '../../../services/secteur-geographique.service';
import { Location } from '@angular/common';
import { finalize } from 'rxjs';

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
  secteursGeographiques: SecteurGeographique[];
  typesOrganisme: TypeOrganisme[];

  constructor(private prospectService: ProspectService,
    private router: Router,
    private snackbarService: SnackbarService,
    private statutService: StatutService,
    private typeOrganismeService: TypeOrganismeService,
    private secteurGeographiqueService: SecteurGeographiqueService,
    private location: Location) { }

  ngOnInit(): void {
    this.statutService.getAll().subscribe(statuts =>
      this.statuts = statuts
    );
    this.typeOrganismeService.getAll().subscribe(typesOrganisme =>
      this.typesOrganisme = typesOrganisme
    );
    this.secteurGeographiqueService.getAll().subscribe(secteursGeographiques =>
      this.secteursGeographiques = secteursGeographiques
    );
  }

  onSubmit() {
    this.isSubmitting = true;

    if (this.isAddForm) {
      this.prospectService.add(this.prospect)
      .pipe(finalize(() => this.isSubmitting = false))
      .subscribe({
        next: prospect => {
          this.router.navigate(['prospects', prospect.id]);
          this.snackbarService.openSuccessSnackBar(`😊 Ajout de "${prospect.nom}" réussi !`);
        },
        error: error => this.snackbarService.openErrorSnackBar(`😖 Oups, une erreur technique est survenue lors de l'ajout.`),
      });
    } else {
      this.prospectService.update(this.prospect)
      .pipe(finalize(() => this.isSubmitting = false))
      .subscribe({
        next: prospect => {
          this.router.navigate(['prospects', prospect.id]);
          this.snackbarService.openSuccessSnackBar(`👌 Mise à jour de "${prospect.nom}" réussie !`);
        },
        error: error =>
          this.snackbarService.openErrorSnackBar(`🙄 Oups, une erreur technique est survenue lors de la sauvegarde.`),
      });
    }
  }

  compareStatuts(statut1: Statut, statut2: Statut): boolean {
    return statut1 && statut2 ? statut1.id === statut2.id : statut1 === statut2;
  }

  compareTypesOrganisme(typeOrganisme1: TypeOrganisme, typeOrganisme2: TypeOrganisme): boolean {
    return typeOrganisme1 && typeOrganisme2 ? typeOrganisme1.id === typeOrganisme2.id : typeOrganisme1 === typeOrganisme2;
  }

  compareSecteursGeographiques(secteur1: TypeOrganisme, secteur2: TypeOrganisme): boolean {
    return secteur1 && secteur2 ? secteur1.id === secteur2.id : secteur1 === secteur2;
  }

  previousPage() {
    this.location.back();
  }
}
