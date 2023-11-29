import { Contact } from "./contact";
import { Evenement } from "./evenement";
import { Modification } from "./modification";
import { ProduitProspect } from "./produitprospect";
import { Statut } from "./statut";
import { TypeOrganisme } from "./type-organisme";
import { Utilisateur } from "./utilisateur";

export class Prospect {
    id: number;
    nom: string = "";
    departement: string = "";
    adresse: string = "";
    telephone: string = "";
    mail: string = "";
    secteurActivite: string = "";
    dateCreation: string = "";
    statut?: Statut;
    typeOrganisme?: TypeOrganisme;
    contacts: Contact[] = [];
    utilisateurCreation?: Utilisateur;
    modifications: Modification[];
    produitProspects: ProduitProspect[] = [];
    evenements: Evenement[] = [];
}