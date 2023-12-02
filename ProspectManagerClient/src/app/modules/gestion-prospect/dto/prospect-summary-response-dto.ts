import { SecteurGeographique } from "../models/secteur-geographique";
import { Statut } from "../models/statut";
import { TypeOrganisme } from "../models/type-organisme";
import { Utilisateur } from "../models/utilisateur";

export class ProspectSummaryResponseDto {
    id: number;
    statut?: Statut;
    typeOrganisme?: TypeOrganisme;
    nom: string = "";
    secteurActivite: string = "";
    secteurGeographique?: SecteurGeographique;
    adresse: string = "";
    telephone: string = "";
    mail: string = "";
    dateCreation: string = "";
    utilisateurCreation?: Utilisateur;
    contactsCount: number;
    produitProspectsCount: number;
    evenementsCount: number;
}