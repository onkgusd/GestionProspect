import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../../../models/utilisateur';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-utilisateur-edit',
  templateUrl: './utilisateur-edit.component.html',
  styleUrls: ['./utilisateur-edit.component.scss']
})
export class UtilisateurEditComponent implements OnInit {
  utilisateur: Utilisateur;
  isLoading: boolean = false;

  constructor(private utilisateurService: UtilisateurService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = true;

    const utilisateurId: string | null = this.route.snapshot.paramMap.get("id");
    if (utilisateurId) {
      this.utilisateurService.getUtilisateur(+utilisateurId)
        .subscribe(
          {
            next: utilisateur => {
              this.utilisateur = utilisateur;
              this.isLoading = false;
            },
            error: error => {
                console.error('Erreur lors du chargement de l\'utilisateur', error);
                this.isLoading = false;
              }
          }
        );
    }
  }
}
