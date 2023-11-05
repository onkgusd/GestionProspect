import { Component, OnInit, ViewChild } from '@angular/core';
import { ProduitService } from '../../../services/produit-service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Produit } from '../../../models/produit';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-produit-list',
  templateUrl: './produit-list.component.html',
  styleUrls: ['./produit-list.component.scss']
})
export class ProduitListComponent implements OnInit {
  produits: MatTableDataSource<Produit>;
  displayedColumns: string[] = ['id', 'reference', 'libelle', 'description'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private produitService: ProduitService) { }

  ngOnInit(): void {
    this.produitService.getProduits().subscribe((produits: Produit[]) => {
      this.produits = new MatTableDataSource(produits);
      this.produits.sort = this.sort;
      this.produits.paginator = this.paginator;
    });
  }
}
