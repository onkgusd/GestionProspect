import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Contact } from '../../../models/contact';
import { ContactService } from '../../../services/contact.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from 'src/app/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})

export class ContactListComponent implements OnInit {
  contacts: MatTableDataSource<Contact>;
  displayedColumns: string[] = ['nom', 'fonction', 'email', 'telephone', 'actif', 'actions'];
  isLoading: boolean;

  @ViewChild(MatSort)
  set sort(value: MatSort) {
    if (this.contacts) {
      this.contacts.sort = value;
    }
  }

  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    if (this.contacts) {
      this.contacts.paginator = value;
    }
  }

  @Input() idProspect: number;
  @Input() contactList: Contact[];

  constructor(public dialog: MatDialog, private contactService: ContactService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    if (this.contactList) {
      this.contacts = new MatTableDataSource(this.contactList);
    }
    else {
      this.contactService.getAll(this.idProspect)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(
          {
            next: (contacts: Contact[]) => {
              this.contacts = new MatTableDataSource(contacts);
            },
            error: error => this.snackbarService.openErrorSnackBar("😵 Erreur lors du chargement des contacts.")
          });
    }
  }

  openDeleteConfirmationDialog(contact: Contact): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: { message: 'Voulez-vous vraiment supprimer ce contact ?' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteContact(contact);
      }
    });
  }

  private deleteContact(contact: Contact): void {
    this.contactService.delete(contact).subscribe(
      {
        next: () => {
          const index = this.contactList.findIndex((c) => c.id === contact.id);
          if (index !== -1) {
            this.contactList.splice(index, 1);
          }

          this.contacts.data = this.contactList;
          this.contacts._updateChangeSubscription();

          this.snackbarService.openSuccessSnackBar("Suppression réussie.");
        },
        error: () => this.snackbarService.openSuccessSnackBar("Erreur lors de la mise à jour :(")
      }
    );
  }
}
