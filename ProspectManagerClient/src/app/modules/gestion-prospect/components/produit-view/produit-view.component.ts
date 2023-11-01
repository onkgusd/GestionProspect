import { Component, OnInit } from '@angular/core';
import { Produit } from '../../models/produit';
import { ProduitService } from '../../services/produit-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produit-view',
  templateUrl: './produit-view.component.html',
  styleUrls: ['./produit-view.component.scss']
})
export class ProduitViewComponent implements OnInit {

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
