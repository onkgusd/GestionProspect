import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Prospect } from '../../../models/prospect';
import { ProspectService } from '../../../services/prospect.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ProspectSummaryResponseDto } from '../../../dto/prospect-summary-response-dto';
import { DeleteConfirmationDialogComponent } from 'src/app/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-prospect-list',
  templateUrl: './prospect-list.component.html',
  styleUrls: ['./prospect-list.component.scss']
})

export class ProspectListComponent implements OnInit {
  @Input() isPrintable: boolean;
  @Input() prospectList: ProspectSummaryResponseDto[];

  prospects: MatTableDataSource<ProspectSummaryResponseDto>;
  displayedColumns: string[] = ['type-organisme', 'nom', 'statut', 'secteurGeographique', 'secteurActivite', 'telephone', 'mail', 'dateCreation', 'actions'];
  isLoading: boolean = true;

  @ViewChild(MatSort)
  set sort(value: MatSort) {
    if (this.prospects) {
      this.prospects.sort = value;
    }
  }

  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    if (this.prospects) {
      this.prospects.paginator = value;
    }
  }

  constructor(private prospectService: ProspectService,
    private snackbarService: SnackbarService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.prospectList !== void 0) {
      this.prospects = new MatTableDataSource(this.prospectList);
      this.isLoading = false;
    }
    else {
      this.prospectService.getAll()
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(
          {
            next: (prospects: ProspectSummaryResponseDto[]) => {
              this.prospects = new MatTableDataSource(prospects);
              this.isLoading = false;
            },
            error: error => this.snackbarService.openErrorSnackBar("😵 Erreur lors du chargement des prospects.")
          });
    }
  }

  printList() {
    window.print();
  }

  exportToCsv() {
    const filename = `exportProspect_${new Date().toLocaleDateString('fr-FR')}.csv`
    const headers = Object.keys(this.prospectList[0]);
    const BOM = '\uFEFF';
    const csvContent = [headers.join(';')].concat(this.prospectList.map(row => {
      return Object.values(row).map(value => {
        if (value instanceof Date) {
          return value.toLocaleDateString();
        }
        if (value instanceof Object) {
          if (Array.isArray(value)) {
            return value.length;
          }
          return value.libelle || value.login || "";
        }

        return value ? `"${value}"` : "";
      }).join(';');
    })).join('\n');

    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  openDeleteConfirmationDialog(prospect: Prospect): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: { message: "Voulez-vous vraiment supprimer ce produit ?" }
    });

    dialogRef.afterClosed()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((result) => {
        if (result) {
          this.deleteEvenement(prospect);
        }
      });
  }

  private deleteEvenement(prospect: Prospect): void {
    this.prospectService.delete(prospect.id).subscribe(
      {
        next: (deleteResponse) => {
          if (deleteResponse.statut === "Deleted") {
            const data = this.prospects.data;
            const index = data.findIndex((p) => p.id === prospect.id);

            if (index !== -1) {
              data.splice(index, 1);
              this.prospects.data = data;
            }

            this.snackbarService.openSuccessSnackBar("🗑️ Suppression réussie !");
          }
          else {
            prospect.actif = false;
            this.snackbarService.openWarningSnackBar("💤 Ce produit est utilisé, il a été marqué comme inactif.");
          }
        },
        error: () => this.snackbarService.openErrorSnackBar("🙄 Erreur lors de la suppression.")
      }
    );
  }

  switchStatus(prospect: Prospect, actif: boolean): void {

    this.prospectService.update({ ...prospect, actif }).subscribe(
      {
        next: () => {
          this.snackbarService.openSuccessSnackBar(`👌 ${actif ? "Réactivé" : "Désactivé"} avec succés !`);
          prospect.actif = actif;
        },
        error: () => this.snackbarService.openErrorSnackBar(`🙄 Une erreur est survenue lors de la ${actif ? "résactivation" : "désactivation"}.`),
      }
    );
  }
}
