import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Evenement } from '../../../models/evenement';
import { EvenementService } from '../../../services/evenement.service';
import { DeleteConfirmationDialogComponent } from 'src/app/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-evenement-list',
  templateUrl: './evenement-list.component.html',
  styleUrls: ['./evenement-list.component.scss']
})
export class EvenementListComponent implements OnInit {
  evenements: MatTableDataSource<Evenement>;
  displayedColumns: string[] = ['typeEvenement', 'dateEvenement', 'resultat', 'contact', 'produit', 'actions'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() idProspect: number;
  @Input() evenementList: Evenement[];

  constructor(public dialog: MatDialog, private evenementService: EvenementService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    if (this.evenementList) {
      this.evenements = new MatTableDataSource(this.evenementList);
    }
    else {
      this.evenementService.getEvenements(this.idProspect).subscribe((evenements: Evenement[]) => {
        this.evenements = new MatTableDataSource(evenements);
      });
    }

    this.evenements.sort = this.sort;
    this.evenements.paginator = this.paginator;
  }

  openDeleteConfirmationDialog(evenement: Evenement): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: { message: 'Voulez-vous vraiment supprimer cet évènement ?' }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteEvenement(evenement);
      }
    });
  }

  private deleteEvenement(evenement: Evenement): void {
    this.evenementService.deleteEvenement(evenement.id).subscribe(
      {
        next: () => {
          const index = this.evenementList.findIndex((p) => p.id === evenement.id);
          if (index !== -1) {
            this.evenementList.splice(index, 1);
          }

          this.evenements.data = this.evenementList;
          this.evenements._updateChangeSubscription();

          this.snackbarService.openSuccessSnackBar("Suppression réussie.");
        },
        error: () => this.snackbarService.openSuccessSnackBar("Erreur lors de la mise à jour :(")
      }
    );
  }
}
