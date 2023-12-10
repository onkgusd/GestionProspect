import { Component } from '@angular/core';
import { SecteurGeographique } from '../../../models/secteur-geographique';
import { SecteurGeographiqueService } from '../../../services/secteur-geographique.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-secteur-geographique-edit',
  templateUrl: './secteur-geographique-edit.component.html',
  styleUrls: ['./secteur-geographique-edit.component.scss']
})
export class SecteurGeographiqueEditComponent {
  secteurGeographique: SecteurGeographique;
  isLoading: boolean = true;

  constructor(private secteurGeographiqueService: SecteurGeographiqueService, private route: ActivatedRoute, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    const secteurGeographiqueId: string | null = this.route.snapshot.paramMap.get("id");
    if (secteurGeographiqueId)
      this.secteurGeographiqueService.get(+secteurGeographiqueId).pipe(
        finalize(() => this.isLoading = false)
      ).subscribe({
        next:
          secteurGeographique => {
            this.secteurGeographique = secteurGeographique;
            this.isLoading = false;
          },
        error: error => this.snackbarService.openErrorSnackBar("😵 Erreur lors du chargement du secteur géographique.")
      });
  }
}
