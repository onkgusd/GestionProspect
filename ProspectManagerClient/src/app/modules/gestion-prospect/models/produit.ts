import { Modification } from "./modification";
import { ProduitProspect } from "./produitprospect";

export class Produit {
    id: number;
    reference: string;
    libelle: string;
    description: string;
    actif: boolean;
    modifications: Modification[] = [];
    produitProspects: ProduitProspect[] = [];
}