import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TypeOrganisme } from '../../../models/type-organisme';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TypeOrganismeService } from '../../../services/type-organisme.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from 'src/app/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-type-organisme-list',
  templateUrl: './type-organisme-list.component.html',
  styleUrls: ['./type-organisme-list.component.scss']
})
export class TypeOrganismeListComponent {
  typeOrganismes: MatTableDataSource<TypeOrganisme>;
  displayedColumns: string[] = ['libelle', 'actions'];
  isLoading: boolean = true;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private typeOrganismeService: TypeOrganismeService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.typeOrganismeService.getAll().subscribe((typeOrganismes: TypeOrganisme[]) => {
      this.typeOrganismes = new MatTableDataSource(typeOrganismes);
      this.typeOrganismes.sort = this.sort;
      this.typeOrganismes.paginator = this.paginator;
      this.isLoading = false;
    });
  }

  openDeleteConfirmationDialog(typeOrganisme: TypeOrganisme): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: { message: "Voulez-vous vraiment supprimer ce type d'événement ?" }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteOrganisme(typeOrganisme);
      }
    });
  }

  private deleteOrganisme(typeOrganisme: TypeOrganisme): void {
    this.typeOrganismeService.delete(typeOrganisme.id).subscribe(
      {
        next: (deleteResponse) => {
          if (deleteResponse.statut === "Deleted") {
            const data = this.typeOrganismes.data;
            const index = data.findIndex((p) => p.id === typeOrganisme.id);

            if (index !== -1) {
              data.splice(index, 1);
              this.typeOrganismes.data = data;
            }
          }
          else {
            typeOrganisme.actif = false;
          }


          this.snackbarService.openSuccessSnackBar(deleteResponse.statut === "Deleted"
            ? "🗑️ Suppression réussie !"
            : "💤 Ce type d'événement est utilisé, il a été marqué comme inactif.");

        },
        error: () => this.snackbarService.openSuccessSnackBar("🙄 Erreur lors de la suppression.")
      }
    );
  }

  switchStatus(typeOrganisme: TypeOrganisme, actif: boolean): void {

    this.typeOrganismeService.update({ ...typeOrganisme, actif }).subscribe(
      {
        next: () => {
          this.snackbarService.openSuccessSnackBar(`👌 ${actif ? "Réactivé" : "Désactivé"} avec succés !`);
          typeOrganisme.actif = actif;
        },
        error: () => this.snackbarService.openErrorSnackBar(`🙄 Une erreur est survenue lors de la ${actif ? "résactivation" : "désactivation" }.`),
      }
    )
  }
}
