import { Produit } from "../models/produit";
import { SecteurGeographique } from "../models/secteur-geographique";
import { Statut } from "../models/statut";
import { TypeOrganisme } from "../models/type-organisme";

export class ProspectSearchRequestDto {
    noms: string[] = [];
    statuts: Statut[] = [];
    secteursGeographiques: SecteurGeographique[] = [];
    secteursActivite: string[] = [];
    produits: Produit[] = [];
    typesOrganisme: TypeOrganisme[] = [];
    inclureInactif: boolean = false;
}