import { Component, Input } from '@angular/core';
import { Contact } from '../../../models/contact';
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
  @Input() idProspect: number;

  isSubmitting: boolean = false;

  constructor(private contactService: ContactService, private snackbarService: SnackbarService, private location: Location) { }

  onSubmit() {
    this.isSubmitting = true;

    if (this.isAddForm) {
      this.contactService.add(this.contact, this.idProspect).subscribe({
        next: contact => {
          this.previousPage();
          this.snackbarService.openSuccessSnackBar(`🤗 Ajout de "${contact.nom}" réussi !`);
        },
        error: error => {
          this.snackbarService.openErrorSnackBar(`😖 Oups, une erreur est survenue lors de l'ajout.`);
          this.isSubmitting = false;
        }
      });
    } else {
      this.contactService.update(this.contact).subscribe({
        next: contact => {
          this.previousPage();
          this.snackbarService.openSuccessSnackBar(`👌 Mise à jour de "${contact.nom}" réussie !`);
        },
        error: error => {
          this.snackbarService.openErrorSnackBar(`😟 Oups, une erreur est survenue lors de la sauvegarde.`);
          this.isSubmitting = false
        }
      });
    }
  }

  previousPage() {
    this.location.back();
  }
}
