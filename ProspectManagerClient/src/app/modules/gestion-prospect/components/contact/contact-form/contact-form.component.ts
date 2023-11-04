import { Component, Input } from '@angular/core';
import { Contact } from '../../../models/contact';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ContactService } from '../../../services/contact.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  @Input() contact: Contact = new Contact();
  @Input() isAddForm: boolean = false;
  @Input() prospectId: number;

  isSubmitting: boolean = false;

  constructor(private contactService: ContactService, private router: Router, private snackbarService: SnackbarService, private location: Location) { }

  onSubmit() {
    this.isSubmitting = true;

    if (this.isAddForm) {
      this.contact.prospectId = this.prospectId;
      this.contactService.addContact(this.contact).subscribe({
        next: contact => {
          this.previousPage();
          this.snackbarService.openErrorSnackBar(`Ajout de "${contact.nom}" réussi !`);
        },
        error: error => {
          this.snackbarService.openErrorSnackBar(`Oups, une erreur est survenue lors de l'ajout :(`);
          this.isSubmitting = false;
        }
      });
    } else {
      this.contactService.updateContact(this.contact).subscribe({
        next: contact => {
          this.previousPage();
          this.snackbarService.openErrorSnackBar(`Mise à jour de "${contact.nom}" réussie !`);
        },
        error: error => {
          this.snackbarService.openErrorSnackBar(`Oups, une erreur est survenue lors de la sauvegarde :(`);
          this.isSubmitting = false
        }
      });
    }
  }

  previousPage() {
    this.location.back();
  }
}
