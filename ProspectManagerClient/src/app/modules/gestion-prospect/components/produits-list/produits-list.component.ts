import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GestionProspectService } from '../../gestion-prospect.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Produit } from '../../models/produit';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-produits-list',
  templateUrl: './produits-list.component.html',
  styleUrls: ['./produits-list.component.scss']
})
export class ProduitsListComponent implements OnInit {
  produits: MatTableDataSource<Produit>;
  displayedColumns: string[] = ['id', 'reference', 'libelle', 'description'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private gestionProspectService: GestionProspectService) { }

  ngOnInit(): void {
    this.gestionProspectService.getProduits().subscribe((produits: Produit[]) => {
      this.produits = new MatTableDataSource(produits);
      this.produits.sort = this.sort;
      this.produits.paginator = this.paginator;
    });
  }
}
