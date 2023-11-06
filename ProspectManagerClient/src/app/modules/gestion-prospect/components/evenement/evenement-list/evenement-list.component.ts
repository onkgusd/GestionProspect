import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Evenement } from '../../../models/evenement';
import { EvenementService } from '../../../services/evenement.service';
import { Produit } from '../../../models/produit';
import { DeleteConfirmationDialogComponent } from 'src/app/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-evenement-list',
  templateUrl: './evenement-list.component.html',
  styleUrls: ['./evenement-list.component.scss']
})
export class EvenementListComponent implements OnInit {
  evenements: MatTableDataSource<Evenement>;
  displayedColumns: string[] = ['id', 'typeEvenement', 'dateEvenement', 'resultat', 'contact', 'produit'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() idProspect: number;
  @Input() evenementList: Evenement[];

  constructor(public dialog: MatDialog, private evenementService: EvenementService) { }

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
}
