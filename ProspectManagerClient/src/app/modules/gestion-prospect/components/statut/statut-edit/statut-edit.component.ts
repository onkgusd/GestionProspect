import { Component } from '@angular/core';
import { Statut } from '../../../models/statut';
import { StatutService } from '../../../services/statut.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-statut-edit',
  templateUrl: './statut-edit.component.html',
  styleUrls: ['./statut-edit.component.scss']
})
export class StatutEditComponent {
  statut: Statut;
  isLoading: boolean;

  constructor(private statutService: StatutService, private route: ActivatedRoute, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.isLoading = true;

    const statutId: string | null = this.route.snapshot.paramMap.get("id");
    if (statutId)
      this.statutService.get(+statutId).pipe(
        finalize(() => this.isLoading = false)
      ).subscribe({
        next: statut => {
          this.statut = statut;
          this.isLoading = false;
        },
        error: error => this.snackbarService.openErrorSnackBar("😵 Erreur lors du chargement du statut.")
      });
  }
}
