import { Component, OnInit, ViewChild } from '@angular/core';
import { Prospect } from '../../../models/prospect';
import { ProspectService } from '../../../services/prospect.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-prospect-list',
  templateUrl: './prospect-list.component.html',
  styleUrls: ['./prospect-list.component.scss']
})

export class ProspectListComponent implements OnInit {
  prospects: MatTableDataSource<Prospect>;
  displayedColumns: string[] = ['type-organisme', 'nom', 'statut', 'departement', 'secteurActivite', 'telephone', 'mail', 'dateCreation'];
  isLoading: boolean = true;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private prospectService: ProspectService) { }

  ngOnInit(): void {
    this.prospectService.getProspects().subscribe((prospects: Prospect[]) => {
      this.prospects = new MatTableDataSource(prospects);
      this.prospects.sort = this.sort;
      this.prospects.paginator = this.paginator;
      this.isLoading = false;
    });
  }
}
