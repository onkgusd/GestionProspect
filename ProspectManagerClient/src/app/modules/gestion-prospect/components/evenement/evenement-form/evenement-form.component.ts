import { Component, Input, OnInit } from '@angular/core';
import { Evenement } from '../../../models/evenement';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { EvenementService } from '../../../services/evenement.service';
import { Location } from '@angular/common';
import { Contact } from '../../../models/contact';
import { ContactService } from '../../../services/contact.service';
import { TypeEvenementService } from '../../../services/type-evenement.service';
import { TypeEvenement } from '../../../models/type-evenement';

@Component({
  selector: 'app-evenement-form',
  templateUrl: './evenement-form.component.html',
  styleUrls: ['./evenement-form.component.scss']
})
export class EvenementFormComponent implements OnInit {
  @Input() evenement: Evenement = new Evenement();
  @Input() isAddForm: boolean = false;
  @Input() idProspect: number;


  isSubmitting: boolean = false;
  contacts: Contact[];
  typeEvenements: TypeEvenement[];

  constructor(
    private evenementService: EvenementService,
    private contactService: ContactService,
    private snackbarService: SnackbarService,
    private tyepEvenementService: TypeEvenementService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.contactService.getContacts(this.idProspect).subscribe(
      {
        next: contacts => this.contacts = contacts,
        error: () => this.snackbarService.openErrorSnackBar("Impossible de lister les contacts...")
      });

    this.tyepEvenementService.getTypesEvenement().subscribe(
      {
        next: typeEvenements => this.typeEvenements = typeEvenements,
        error: () => this.snackbarService.openErrorSnackBar("Impossible de lister les types d'évenement...")
      });
  }

  onSubmit() {
    this.isSubmitting = true;

    if (this.isAddForm) {
      this.evenementService.addEvenement(this.idProspect, this.evenement).subscribe({
        next: () => {
          this.snackbarService.openSuccessSnackBar(`Ajout de "${this.evenement.typeEvenement.libelle}" réussi !`);
          this.previousPage();
        },
        error: () => {
          this.snackbarService.openErrorSnackBar(`Oups, une erreur est survenue lors de l'ajout :(`);
          this.isSubmitting = false;
        }
      });
    } else {
      this.evenementService.updateEvenement(this.evenement).subscribe({
        next: () => {
          this.snackbarService.openSuccessSnackBar(`Mise à jour de "${this.evenement.typeEvenement.libelle}" réussie !`);
          this.previousPage();
        },
        error: error => {
          this.snackbarService.openErrorSnackBar(`Oups, une erreur est survenue lors de la mise à jour :(`);
          this.isSubmitting = false;
        }
      });
    }
  }

  previousPage() {
    this.location.back();
  }

  compareContacts(contact1: Evenement, contact2: Evenement): boolean {
    return contact1 && contact2 ? contact1.id === contact2.id : contact1 === contact2;
  }

  compareTypeEvenement(typeEvenement1: Evenement, typeEvenement: Evenement): boolean {
    return typeEvenement1 && typeEvenement ? typeEvenement1.id === typeEvenement.id : typeEvenement1 === typeEvenement;
  }
}
