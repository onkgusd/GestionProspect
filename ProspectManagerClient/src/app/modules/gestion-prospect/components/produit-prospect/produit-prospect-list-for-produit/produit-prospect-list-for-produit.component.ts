import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProduitProspect } from '../../../models/produitprospect';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { DeleteConfirmationDialogComponent } from 'src/app/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ProduitService } from '../../../services/produit-service';
import { Produit } from '../../../models/produit';

@Component({
  selector: 'app-produit-prospect-for-produit-list',
  templateUrl: './produit-prospect-list-for-produit.component.html',
  styleUrls: ['./produit-prospect-list-for-produit.component.scss']
})
export class ProduitProspectListForProduitComponent implements OnInit {
  produitProspects: MatTableDataSource<ProduitProspect>;
  displayedColumns: string[] = ['dateProposition', 'statut', 'nom', 'typeOrganisme', 'secteurActivite', 'secteurGeographique', 'probabiliteSucces', 'actions'];
  isLoading: boolean;

  @ViewChild(MatSort)
  set sort(value: MatSort) {
    if (this.produitProspects) {
      this.produitProspects.sort = value;
    }
  }

  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    if (this.produitProspects) {
      this.produitProspects.paginator = value;
    }
  }

  @Input() produit: Produit;
  produitProspectList: ProduitProspect[];

  constructor(public dialog: MatDialog, private produitService: ProduitService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {

    if (this.produit.produitProspects) {
      this.produitProspectList = this.produit.produitProspects
      this.refreshTable();
    }
  }

  refreshTable(): void {
    this.produitProspects = new MatTableDataSource(this.produitProspectList);
  }

  onProbabiliteSuccesChange(probabiliteSucces: number, produitProspect: ProduitProspect): void {
    produitProspect.probabiliteSucces = probabiliteSucces;
    produitProspect.produit = this.produit;
    this.produitService.updateProspect(produitProspect).subscribe(
      {
        next: () => this.snackbarService.openSuccessSnackBar("👍 Mise à jour réussie !"),
        error: () => this.snackbarService.openSuccessSnackBar("😟 Erreur lors de la mise à jour.")
      }
    )
  }

  openDeleteConfirmationDialog(produitProspect: ProduitProspect): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: { message: 'Voulez-vous vraiment supprimer ce prospect du produit ?' }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteProduitProspect(produitProspect);
      }
    });
  }

  private deleteProduitProspect(produitProspect: ProduitProspect): void {
    produitProspect.produit = this.produit;
    this.produitService.deleteProspect(produitProspect).subscribe(
      {
        next: () => {
          const index = this.produitProspectList.findIndex((p) => p.prospect.id === produitProspect.prospect.id);
          if (index !== -1) {
            this.produitProspectList.splice(index, 1);
          }

          this.produitProspects.data = this.produitProspectList;
          this.produitProspects._updateChangeSubscription();

          this.snackbarService.openSuccessSnackBar("👍 Suppression réussie.");
        },
        error: () => this.snackbarService.openSuccessSnackBar("😵 Erreur lors de la mise à jour.")
      }
    );
  }
}
