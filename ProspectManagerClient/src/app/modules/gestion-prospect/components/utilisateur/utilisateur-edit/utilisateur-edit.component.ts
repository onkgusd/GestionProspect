import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../../../models/utilisateur';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-utilisateur-edit',
  templateUrl: './utilisateur-edit.component.html',
  styleUrls: ['./utilisateur-edit.component.scss']
})
export class UtilisateurEditComponent implements OnInit {
  utilisateur: Utilisateur;
  isLoading: boolean = false;

  constructor(private utilisateurService: UtilisateurService, private route: ActivatedRoute, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.isLoading = true;

    const utilisateurId: string | null = this.route.snapshot.paramMap.get("id");
    if (utilisateurId) {
      this.utilisateurService.get(+utilisateurId).pipe(
        finalize(() => this.isLoading = false)
      ).subscribe(
          {
            next: utilisateur => {
              this.utilisateur = utilisateur;
              this.isLoading = false;
            },
            error: error => {
                this.snackbarService.openErrorSnackBar("😖 Erreur lors du chargement de l'utilisateur.", error);
                this.isLoading = false;
              }
          }
        );
    }
  }
}
