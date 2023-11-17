import { Component, OnInit, ViewChild } from '@angular/core';
import { ProduitService } from '../../../services/produit-service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Produit } from '../../../models/produit';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { DeleteConfirmationDialogComponent } from 'src/app/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-produit-list',
  templateUrl: './produit-list.component.html',
  styleUrls: ['./produit-list.component.scss']
})
export class ProduitListComponent implements OnInit {
  produits: MatTableDataSource<Produit>;
  displayedColumns: string[] = ['reference', 'libelle', 'description', 'actions'];
  isLoading: boolean;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private produitService: ProduitService, public dialog: MatDialog, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.produitService.getAll()
    .pipe(finalize(() => this.isLoading = false))
    .subscribe({
      next: (produits: Produit[]) => {
      this.produits = new MatTableDataSource(produits);
      this.produits.sort = this.sort;
      this.produits.paginator = this.paginator;
      },
      error: error => this.snackbarService.openErrorSnackBar("😵 Erreur lors du chargement de la liste des produits.")
    });
  }

  openDeleteConfirmationDialog(produit: Produit): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: { message: "Voulez-vous vraiment supprimer ce produit ?" }
    });

    dialogRef.afterClosed()
    .pipe(finalize(() => this.isLoading = false))
    .subscribe((result) => {
      if (result) {
        this.deleteEvenement(produit);
      }
    });
  }

  private deleteEvenement(produit: Produit): void {
    this.produitService.delete(produit.id).subscribe(
      {
        next: (deleteResponse) => {
          if (deleteResponse.statut === "Deleted") {
            const data = this.produits.data;
            const index = data.findIndex((p) => p.id === produit.id);

            if (index !== -1) {
              data.splice(index, 1);
              this.produits.data = data;
            }
          }
          else {
            produit.actif = false;
          }


          this.snackbarService.openSuccessSnackBar(deleteResponse.statut === "Deleted"
            ? "🗑️ Suppression réussie !"
            : "💤 Ce produit est utilisé, il a été marqué comme inactif.");

        },
        error: () => this.snackbarService.openSuccessSnackBar("🙄 Erreur lors de la suppression.")
      }
    );
  }

  switchStatus(produit: Produit, actif: boolean): void {

    this.produitService.update({ ...produit, actif }).subscribe(
      {
        next: () => {
          this.snackbarService.openSuccessSnackBar(`👌 ${actif ? "Réactivé" : "Désactivé"} avec succés !`);
          produit.actif = actif;
        },
        error: () => this.snackbarService.openErrorSnackBar(`🙄 Une erreur est survenue lors de la ${actif ? "résactivation" : "désactivation"}.`),
      }
    )
  }
}
