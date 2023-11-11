export class Utilisateur
{
    id: number;
    login: string;
    dateConnexion: Date;
    dateModificationMotDePasse: Date;
    role: "Admin" | "Utilisateur";
    actif: boolean;
}
