import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TypeEvenement } from '../../../models/type-evenement';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TypeEvenementService } from '../../../services/type-evenement.service';

@Component({
  selector: 'app-type-evenement-list',
  templateUrl: './type-evenement-list.component.html',
  styleUrls: ['./type-evenement-list.component.scss']
})
export class TypeEvenementListComponent {
  typeEvenements: MatTableDataSource<TypeEvenement>;
  displayedColumns: string[] = ['id', 'libelle'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private typeEvenementService: TypeEvenementService) { }

  ngOnInit(): void {
    this.typeEvenementService.getTypesEvenement().subscribe((typeEvenements: TypeEvenement[]) => {
      this.typeEvenements = new MatTableDataSource(typeEvenements);
      this.typeEvenements.sort = this.sort;
      this.typeEvenements.paginator = this.paginator;
    });
  }
}
