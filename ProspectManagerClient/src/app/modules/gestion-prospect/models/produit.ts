import { Modification } from "./modification";

export class Produit {
    id: number;
    reference: string;
    libelle: string;
    description: string;
    actif: boolean;
    modifications: Modification[];
}