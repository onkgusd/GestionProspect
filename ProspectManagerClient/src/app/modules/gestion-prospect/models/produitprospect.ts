import { Modification } from "./modification";
import { Produit } from "./produit";
import { Prospect } from "./prospect";

export class ProduitProspect{
    produit: Produit;
    prospect: Prospect;
    probabiliteSucces: number;
    modifications?: Modification[];
    dateProposition?: Date;
}