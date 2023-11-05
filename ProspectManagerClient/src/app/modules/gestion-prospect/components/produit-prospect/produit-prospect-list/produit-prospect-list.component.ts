import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProduitProspect } from '../../../models/produitprospect';
import { MatDialog } from '@angular/material/dialog';
import { ProduitProspectDialogComponent } from '../produit-prospect-dialog/produit-prospect-dialog.component';
import { Prospect } from '../../../models/prospect';
import { ProspectService } from '../../../services/prospect.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { DeleteConfirmationDialogComponent } from 'src/app/components/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-produit-prospect-list',
  templateUrl: './produit-prospect-list.component.html',
  styleUrls: ['./produit-prospect-list.component.scss']
})
export class ProduitProspectListComponent implements OnInit {
  produitsProspect: MatTableDataSource<ProduitProspect>;
  displayedColumns: string[] = ['id', 'reference', 'libelle', 'description', 'probabiliteSucces', 'actions'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() prospect: Prospect;
  produitsProspectList: ProduitProspect[];

  constructor(public dialog: MatDialog, private prospectService: ProspectService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {

    if (this.prospect.produitProspects) {
      this.produitsProspectList = this.prospect.produitProspects
      this.refreshTable();
    }
    else {
      this.prospectService.getProduits(this.prospect.id).subscribe((produits: ProduitProspect[]) => {
        this.produitsProspectList = produits;
        this.refreshTable();
      });
    }
  }

  openProductDialog(): void {
    const dialogRef = this.dialog.open(ProduitProspectDialogComponent, {
      width: '500px',
      data: { disabledProduits: this.produitsProspectList?.map(pp => pp.produit.id) }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newProduitProspect: ProduitProspect = {
          produit: result.produit,
          probabiliteSucces: result.rating,
          prospect: this.prospect
        };

        this.prospectService.addProduit(newProduitProspect).subscribe({
          next: () => {
            this.produitsProspectList.push(newProduitProspect);
            this.produitsProspect.data = this.produitsProspectList;
            this.produitsProspect._updateChangeSubscription();
          },
          error: () => this.snackbarService.openSuccessSnackBar("Erreur lors de l'ajout :(")
        });
      }
    });
  }

  refreshTable(): void {
    this.produitsProspect = new MatTableDataSource(this.produitsProspectList);
    this.produitsProspect.sort = this.sort;
    this.produitsProspect.paginator = this.paginator;
  }

  onProbabiliteSuccesChange(probabiliteSucces: number, produitProspect: ProduitProspect): void {
    produitProspect.probabiliteSucces = probabiliteSucces;
    produitProspect.prospect = this.prospect;
    this.prospectService.updateProduit(produitProspect).subscribe(
      {
        next: () => this.snackbarService.openSuccessSnackBar("Mise à jour réussie :)"),
        error: () => this.snackbarService.openSuccessSnackBar("Erreur lors de la mise à jour :(")
      }
    )
  }

  openDeleteConfirmationDialog(produitProspect: ProduitProspect): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: { message: 'Voulez-vous vraiment supprimer ce produit prospect ?' }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteProduitProspect(produitProspect);
      }
    });
  }

  private deleteProduitProspect(produitProspect: ProduitProspect): void {
    produitProspect.prospect = this.prospect;
    this.prospectService.deleteProduit(produitProspect).subscribe(
      {
        next: () => {
          const index = this.produitsProspectList.findIndex((p) => p.produit.id === produitProspect.produit.id);
          if (index !== -1) {
            this.produitsProspectList.splice(index, 1);
          }

          this.produitsProspect.data = this.produitsProspectList;
          this.produitsProspect._updateChangeSubscription();

          this.snackbarService.openSuccessSnackBar("Suppression réussie.");
        },
        error: () => this.snackbarService.openSuccessSnackBar("Erreur lors de la mise à jour :(")
      }
    );
  }
}
