import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Statut } from '../../../models/statut';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { StatutService } from '../../../services/statut.service';
import { DeleteConfirmationDialogComponent } from 'src/app/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-statut-list',
  templateUrl: './statut-list.component.html',
  styleUrls: ['./statut-list.component.scss']
})
export class StatutListComponent {
  statuts: MatTableDataSource<Statut>;
  displayedColumns: string[] = ['libelle', 'actions'];
  isLoading: boolean = true;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private statutService: StatutService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.statutService.getAll().subscribe((statuts: Statut[]) => {
      this.statuts = new MatTableDataSource(statuts);
      this.statuts.sort = this.sort;
      this.statuts.paginator = this.paginator;
      this.isLoading = false;
    });
  }

  openDeleteConfirmationDialog(statut: Statut): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: { message: "Voulez-vous vraiment supprimer ce type d'événement ?" }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteEvenement(statut);
      }
    });
  }

  private deleteEvenement(statut: Statut): void {
    this.statutService.delete(statut.id).subscribe(
      {
        next: (deleteResponse) => {
          if (deleteResponse.statut === "Deleted") {
            const data = this.statuts.data;
            const index = data.findIndex((p) => p.id === statut.id);

            if (index !== -1) {
              data.splice(index, 1);
              this.statuts.data = data;
            }
          }
          else {
            statut.actif = false;
          }

          this.snackbarService.openSuccessSnackBar(deleteResponse.statut === "Deleted"
            ? "🗑️ Suppression réussie."
            : "💤 Ce statut est utilisé, il a été marqué comme inactif.");

        },
        error: () => this.snackbarService.openSuccessSnackBar("🙄 Erreur lors de la suppression.")
      }
    );
  }

  switchStatus(statut: Statut, actif: boolean): void {

    this.statutService.update({ ...statut, actif }).subscribe(
      {
        next: () => {
          this.snackbarService.openSuccessSnackBar(`👌 ${actif ? "Réactivé" : "Désactivé"} avec succés !`);
          statut.actif = actif;
        },
        error: () => this.snackbarService.openErrorSnackBar(`😒 Une erreur est survenue lors de la ${actif ? "résactivation" : "désactivation" } :(`),
      }
    )
  }
}
