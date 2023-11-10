import { Contact } from "./contact";
import { Produit } from "./produit";
import { TypeEvenement } from "./type-evenement";

export class Evenement {
    id: number;
    typeEvenement: TypeEvenement;
    dateEvenement: Date;
    resultat: string;
    contact: Contact;
    produits: Produit[] = [];
    // utilisateur: Utilisateur;
    // modifications: Modification[];
}