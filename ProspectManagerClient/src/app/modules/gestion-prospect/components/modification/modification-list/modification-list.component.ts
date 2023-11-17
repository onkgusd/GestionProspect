import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Modification } from '../../../models/modification';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ProspectService } from '../../../services/prospect.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-modification-list',
  templateUrl: './modification-list.component.html',
  styleUrls: ['./modification-list.component.scss']
})
export class ModificationListComponent implements OnInit, OnChanges {
  modifications: MatTableDataSource<Modification>;
  displayedColumns: string[] = ['dateModification', 'champ', 'ancienneValeur', 'nouvelleValeur', 'utilisateur'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLoading: boolean;
  @Input() isVisible: boolean;
  @Input() idProspect: number;

  constructor(private snackbarService: SnackbarService, private prospectService: ProspectService) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isVisible']) {
      if (this.isVisible) {
        this.isLoading = true;
        this.prospectService.getModifications(this.idProspect)
          .pipe(finalize(() => this.isLoading = false))
          .subscribe(
            {
              next: modifications => {
                this.modifications = new MatTableDataSource(modifications);
                this.modifications.paginator = this.paginator;
                this.modifications.sort = this.sort;
                this.isLoading = false;
              },
              error: () => this.snackbarService.openErrorSnackBar("😖 L'historique des modifications n'a pas pu être chargé.")
            }
          )
      }
    }
  }
}
