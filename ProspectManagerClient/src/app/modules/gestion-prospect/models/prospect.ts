import { Contact } from "./contact";
import { Statut } from "./statut";

export class Prospect {
    id: number;
    nom: string;
    departement: string;
    adresse: string;
    telephone: string;
    mail: string;
    secteurActivite: string;
    dateCreation: string;
    statut: Statut;
    // typeOrganisme: TypeOrganisme;
    contacts: Contact[];
    // utilisateurCreation: Utilisateur;
    // modifications: Modification[];
    // produitProspects: ProduitProspect[];
}