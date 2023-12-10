import { Component } from '@angular/core';
import { TypeEvenement } from '../../../models/type-evenement';
import { TypeEvenementService } from '../../../services/type-evenement.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-type-evenement-edit',
  templateUrl: './type-evenement-edit.component.html',
  styleUrls: ['./type-evenement-edit.component.scss']
})
export class TypeEvenementEditComponent {
  typeEvenement: TypeEvenement;
  isLoading: boolean = true;

  constructor(private typeEvenementService: TypeEvenementService, private route: ActivatedRoute, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    const typeEvenementId: string | null = this.route.snapshot.paramMap.get("id");
    if (typeEvenementId)
      this.typeEvenementService.get(+typeEvenementId).pipe(
        finalize(() => this.isLoading = false)
      ).subscribe({
        next:
          typeEvenement => {
            this.typeEvenement = typeEvenement;
            this.isLoading = false;
          },
        error: error => this.snackbarService.openErrorSnackBar("😵 Erreur lors du chargement du type d'évenement.")
      });
  }
}
