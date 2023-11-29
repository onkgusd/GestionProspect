import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Utilisateur } from '../../../models/utilisateur';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { finalize } from 'rxjs';
import { DeleteConfirmationDialogComponent } from 'src/app/components/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-utilisateur-list',
  templateUrl: './utilisateur-list.component.html',
  styleUrls: ['./utilisateur-list.component.scss']
})
export class UtilisateurListComponent implements OnInit {
  utilisateurs: MatTableDataSource<Utilisateur>;
  displayedColumns: string[] = ['login', 'dateConnexion', 'dateModificationMotDePasse', 'role', 'actions'];
  isLoading: boolean = true;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private utilisateurService: UtilisateurService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.utilisateurService.getAll()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (utilisateurs: Utilisateur[]) => {
          this.utilisateurs = new MatTableDataSource(utilisateurs);
          this.utilisateurs.sort = this.sort;
          this.utilisateurs.paginator = this.paginator;
        },
        error: error => this.snackbarService.openErrorSnackBar("😵 Erreur lors du chargement de la liste des utilisateurs.")
      }
      );
  }

  openDeleteConfirmationDialog(utilisateur: Utilisateur): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: { message: "Voulez-vous vraiment supprimer cet utilisateur ?" }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteOrganisme(utilisateur);
      }
    });
  }

  private deleteOrganisme(utilisateur: Utilisateur): void {
    this.utilisateurService.delete(utilisateur.id).subscribe(
      {
        next: (deleteResponse) => {
          if (deleteResponse.statut === "Deleted") {
            const data = this.utilisateurs.data;
            const index = data.findIndex((p) => p.id === utilisateur.id);

            if (index !== -1) {
              data.splice(index, 1);
              this.utilisateurs.data = data;
            }

            this.snackbarService.openSuccessSnackBar("🗑️ Suppression réussie !");
          }
          else {
            utilisateur.actif = false;
            this.snackbarService.openWarningSnackBar("💤 Cet utilisateur est utilisé, il a été marqué comme inactif.");
          }
        },
        error: () => this.snackbarService.openErrorSnackBar("🙄 Erreur lors de la suppression.")
      }
    );
  }

  switchStatus(utilisateur: Utilisateur, actif: boolean): void {

    this.utilisateurService.update({ ...utilisateur, actif }).subscribe(
      {
        next: () => {
          this.snackbarService.openSuccessSnackBar(`👌 ${actif ? "Réactivé" : "Désactivé"} avec succés !`);
          utilisateur.actif = actif;
        },
        error: () => this.snackbarService.openErrorSnackBar(`🙄 Une erreur est survenue lors de la ${actif ? "résactivation" : "désactivation"}.`),
      }
    )
  }
}
