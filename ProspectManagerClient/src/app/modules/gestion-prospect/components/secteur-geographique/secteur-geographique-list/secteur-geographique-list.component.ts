import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SecteurGeographique } from '../../../models/secteur-geographique';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SecteurGeographiqueService } from '../../../services/secteur-geographique.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from 'src/app/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-secteur-geographique-list',
  templateUrl: './secteur-geographique-list.component.html',
  styleUrls: ['./secteur-geographique-list.component.scss']
})
export class SecteurGeographiqueListComponent {
  secteurGeographiques: MatTableDataSource<SecteurGeographique>;
  displayedColumns: string[] = ['libelle', 'actions'];
  isLoading: boolean = true;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private secteurGeographiqueService: SecteurGeographiqueService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.secteurGeographiqueService.getAll().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (secteurGeographiques: SecteurGeographique[]) => {
        this.secteurGeographiques = new MatTableDataSource(secteurGeographiques);
        this.secteurGeographiques.sort = this.sort;
        this.secteurGeographiques.paginator = this.paginator;
        this.isLoading = false;
      },
      error: error => this.snackbarService.openErrorSnackBar("😵 Erreur lors du chargement des secteurs géographiques.")
    });
  }

  openDeleteConfirmationDialog(secteurGeographique: SecteurGeographique): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: { message: "Voulez-vous vraiment supprimer ce secteur géographique ?" }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteEvenement(secteurGeographique);
      }
    });
  }

  private deleteEvenement(secteurGeographique: SecteurGeographique): void {
    this.secteurGeographiqueService.delete(secteurGeographique.id).subscribe(
      {
        next: (deleteResponse) => {
          if (deleteResponse.statut === "Deleted") {
            const data = this.secteurGeographiques.data;
            const index = data.findIndex((p) => p.id === secteurGeographique.id);

            if (index !== -1) {
              data.splice(index, 1);
              this.secteurGeographiques.data = data;
            }

            this.snackbarService.openSuccessSnackBar("🗑️ Suppression réussie !");
          }
          else {
            secteurGeographique.actif = false;
            this.snackbarService.openWarningSnackBar("💤 Ce secteur géographique est utilisé, il a été marqué comme inactif.");
          }
        },
        error: () => this.snackbarService.openErrorSnackBar("🙄 Erreur lors de la suppression.")
      }
    );
  }

  switchStatus(secteurGeographique: SecteurGeographique, actif: boolean): void {

    this.secteurGeographiqueService.update({ ...secteurGeographique, actif }).subscribe(
      {
        next: () => {
          this.snackbarService.openSuccessSnackBar(`👌 ${actif ? "Réactivé" : "Désactivé"} avec succés !`);
          secteurGeographique.actif = actif;
        },
        error: () => this.snackbarService.openErrorSnackBar(`🙄 Une erreur est survenue lors de la ${actif ? "résactivation" : "désactivation"}.`),
      }
    )
  }
}
