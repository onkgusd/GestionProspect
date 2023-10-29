import { Component, OnInit } from '@angular/core';
import { Produit } from '../models/produit'
import { GestionProspectService } from '../gestion-prospect.service';

@Component({
  selector: 'app-produits-list',
  templateUrl: './produits-list.component.html',
  styleUrls: ['./produits-list.component.scss']
})
export class ProduitsListComponent implements OnInit {
  produits: Produit[];
  displayedColumns: string[] = ['id', 'reference', 'libelle', 'description'];

  constructor(private gestionProspectService: GestionProspectService) { }
  ngOnInit(): void {
    this.gestionProspectService.getProduits().subscribe(produits => {
      this.produits = produits;
    });
  }
}
