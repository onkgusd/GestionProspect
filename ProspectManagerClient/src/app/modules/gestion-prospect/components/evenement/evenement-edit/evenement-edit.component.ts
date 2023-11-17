import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evenement } from '../../../models/evenement';
import { EvenementService } from '../../../services/evenement.service';
import { finalize } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-evenement-edit',
  templateUrl: './evenement-edit.component.html',
  styleUrls: ['./evenement-edit.component.scss']
})
export class EvenementEditComponent implements OnInit {

  evenement: Evenement;
  idProspect: string | null;
  isLoading: boolean = true;

  constructor(private evenementService: EvenementService, private route: ActivatedRoute, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    const idEvenement: string | null = this.route.snapshot.paramMap.get("idEvenement");
    if (idEvenement)
      this.evenementService.get(+idEvenement)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(
          {
            next: evenement => {
              this.evenement = evenement
              this.isLoading = false;
            },
            error: error => this.snackbarService.openErrorSnackBar("😵 Erreur lors du chargement de l'événement.")
          });

    const idProspect: string | null = this.route.snapshot.paramMap.get("id");
    if (idProspect) {
      this.idProspect = this.route.snapshot.paramMap.get('id');
    }
  }
}