import { Modification } from "./modification";
import { ProduitProspect } from "./produitprospect";

export class Produit {
    id: number;
    reference: string;
    libelle: string;
    description: string;
    actif: boolean = true;
    modifications: Modification[] = [];
    produitProspects: ProduitProspect[] = [];
}