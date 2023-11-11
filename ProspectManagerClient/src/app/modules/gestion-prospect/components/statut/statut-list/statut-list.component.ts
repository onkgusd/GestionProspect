import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Statut } from '../../../models/statut';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { StatutService } from '../../../services/statut.service';

@Component({
  selector: 'app-statut-list',
  templateUrl: './statut-list.component.html',
  styleUrls: ['./statut-list.component.scss']
})
export class StatutListComponent {
  statuts: MatTableDataSource<Statut>;
  displayedColumns: string[] = ['id', 'libelle'];
  isLoading: boolean = true;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private statutService: StatutService) { }

  ngOnInit(): void {
    this.statutService.getStatuts().subscribe((statuts: Statut[]) => {
      this.statuts = new MatTableDataSource(statuts);
      this.statuts.sort = this.sort;
      this.statuts.paginator = this.paginator;
      this.isLoading = false;
    });
  }
}
