import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Utilisateur } from '../../../models/utilisateur';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-utilisateur-list',
  templateUrl: './utilisateur-list.component.html',
  styleUrls: ['./utilisateur-list.component.scss']
})
export class UtilisateurListComponent implements OnInit {
  utilisateurs: MatTableDataSource<Utilisateur>;
  displayedColumns: string[] = ['login', 'dateConnexion', 'dateModificationMotDePasse', 'role', 'actif'];
  isLoading: boolean = true;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private utilisateurService: UtilisateurService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.utilisateurService.getAll()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (utilisateurs: Utilisateur[]) => {
          this.utilisateurs = new MatTableDataSource(utilisateurs);
          this.utilisateurs.sort = this.sort;
          this.utilisateurs.paginator = this.paginator;
        },
        error: error => this.snackbarService.openErrorSnackBar("😵 Erreur lors du chargement de la liste des utilisateurs.")
      }
      );
  }
}
