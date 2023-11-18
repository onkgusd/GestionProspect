import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TypeEvenement } from '../../../models/type-evenement';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TypeEvenementService } from '../../../services/type-evenement.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from 'src/app/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-type-evenement-list',
  templateUrl: './type-evenement-list.component.html',
  styleUrls: ['./type-evenement-list.component.scss']
})
export class TypeEvenementListComponent {
  typeEvenements: MatTableDataSource<TypeEvenement>;
  displayedColumns: string[] = ['libelle', 'actions'];
  isLoading: boolean = true;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private typeEvenementService: TypeEvenementService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.typeEvenementService.getAll().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (typeEvenements: TypeEvenement[]) => {
        this.typeEvenements = new MatTableDataSource(typeEvenements);
        this.typeEvenements.sort = this.sort;
        this.typeEvenements.paginator = this.paginator;
        this.isLoading = false;
      },
      error: error => this.snackbarService.openErrorSnackBar("😵 Erreur lors du chargement des types d'événement.")
    });
  }

  openDeleteConfirmationDialog(typeEvenement: TypeEvenement): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: { message: "Voulez-vous vraiment supprimer ce type d'événement ?" }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteEvenement(typeEvenement);
      }
    });
  }

  private deleteEvenement(typeEvenement: TypeEvenement): void {
    this.typeEvenementService.delete(typeEvenement.id).subscribe(
      {
        next: (deleteResponse) => {
          if (deleteResponse.statut === "Deleted") {
            const data = this.typeEvenements.data;
            const index = data.findIndex((p) => p.id === typeEvenement.id);

            if (index !== -1) {
              data.splice(index, 1);
              this.typeEvenements.data = data;
            }

            this.snackbarService.openSuccessSnackBar("🗑️ Suppression réussie !");
          }
          else {
            typeEvenement.actif = false;
            this.snackbarService.openWarningSnackBar("💤 Ce type d'événement est utilisé, il a été marqué comme inactif.");
          }
        },
        error: () => this.snackbarService.openErrorSnackBar("🙄 Erreur lors de la suppression.")
      }
    );
  }

  switchStatus(typeEvenement: TypeEvenement, actif: boolean): void {

    this.typeEvenementService.update({ ...typeEvenement, actif }).subscribe(
      {
        next: () => {
          this.snackbarService.openSuccessSnackBar(`👌 ${actif ? "Réactivé" : "Désactivé"} avec succés !`);
          typeEvenement.actif = actif;
        },
        error: () => this.snackbarService.openErrorSnackBar(`🙄 Une erreur est survenue lors de la ${actif ? "résactivation" : "désactivation"}.`),
      }
    )
  }
}
