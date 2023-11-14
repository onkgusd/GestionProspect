import { Produit } from "../models/produit";
import { Statut } from "../models/statut";
import { TypeOrganisme } from "../models/type-organisme";

export class ProspectSearchDto {
    noms: string[] = [];
    statuts: Statut[] = [];
    departements: string[] = [];
    secteursActivite: string[] = [];
    produits: Produit[] = [];
    typesOrganisme: TypeOrganisme[] = [];
}