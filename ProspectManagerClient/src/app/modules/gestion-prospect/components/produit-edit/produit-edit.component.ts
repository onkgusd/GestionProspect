import { Component, OnInit } from '@angular/core';
import { Produit } from '../../models/produit';
import { ProduitService } from '../../services/produit-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produit-edit',
  templateUrl: './produit-edit.component.html',
  styleUrls: ['./produit-edit.component.scss']
})
export class ProduitEditComponent implements OnInit {

  produit: Produit;

  constructor(private gestionProspectService: ProduitService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const produitId: string | null = this.route.snapshot.paramMap.get("id");
    if (produitId)
      this.gestionProspectService.getProduit(+produitId)
        .subscribe(
          produit => this.produit = produit
        );
  }
}
