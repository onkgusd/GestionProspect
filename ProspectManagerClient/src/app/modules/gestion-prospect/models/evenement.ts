import { Contact } from "./contact";
import { Modification } from "./modification";
import { Produit } from "./produit";
import { TypeEvenement } from "./type-evenement";
import { Utilisateur } from "./utilisateur";

export class Evenement {
    id: number;
    typeEvenement: TypeEvenement;
    dateEvenement: Date;
    resultat: string;
    contact: Contact;
    produits: Produit[] = [];
    evaluation: number;
    utilisateur: Utilisateur;
    modifications: Modification[];
}