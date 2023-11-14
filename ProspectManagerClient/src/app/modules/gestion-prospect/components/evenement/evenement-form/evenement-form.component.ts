import { Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { Evenement } from '../../../models/evenement';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { EvenementService } from '../../../services/evenement.service';
import { Location } from '@angular/common';
import { Contact } from '../../../models/contact';
import { ContactService } from '../../../services/contact.service';
import { TypeEvenementService } from '../../../services/type-evenement.service';
import { TypeEvenement } from '../../../models/type-evenement';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { Produit } from '../../../models/produit';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ProduitService } from '../../../services/produit-service';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-evenement-form',
  templateUrl: './evenement-form.component.html',
  styleUrls: ['./evenement-form.component.scss']
})
export class EvenementFormComponent implements OnInit {
  @Input() evenement: Evenement = new Evenement();
  @Input() isAddForm: boolean = false;
  @Input() idProspect: number;

  @ViewChild('produitsInput') produitsInput: ElementRef<HTMLInputElement>;

  isSubmitting: boolean = false;
  contacts: Contact[];
  typeEvenements: TypeEvenement[];

  produitsCtrl = new FormControl('');
  produits: Produit[];
  filteredProduits: Observable<Produit[]>;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private evenementService: EvenementService,
    private contactService: ContactService,
    private snackbarService: SnackbarService,
    private typeEvenementService: TypeEvenementService,
    private produitService: ProduitService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.contactService.getAll(this.idProspect).subscribe(
      {
        next: contacts => this.contacts = contacts,
        error: () => this.snackbarService.openErrorSnackBar("Impossible de lister les contacts...")
      });

    this.typeEvenementService.getAll().subscribe(
      {
        next: typeEvenements => this.typeEvenements = typeEvenements,
        error: () => this.snackbarService.openErrorSnackBar("Impossible de lister les types d'évenement...")
      });

    this.produitService.getAll().subscribe({
      next: (produits) => {
        this.produits = produits;
        this.filteredProduits = this.produitsCtrl.valueChanges.pipe(
          startWith(null),
          map((produitLibelle: string | null) => this._filter(produitLibelle ?? "")
          )
        );
        if (this.evenement.produits && this.evenement.produits.length > 0) {
          const produitsNoms = this.evenement.produits.map(produit => produit.libelle).join(', ');
          this.produitsCtrl.setValue(produitsNoms);
        }
        else {
          this.produitsCtrl.setValue(null);
        }
      },
      error: () => this.snackbarService.openErrorSnackBar("Impossible de lister les produits...")
    });
  }

  onSubmit() {
    this.isSubmitting = true;

    if (this.isAddForm) {
      this.evenementService.add(this.idProspect, this.evenement).subscribe({
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
      this.evenementService.update(this.evenement).subscribe({
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

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (!value) {
      return;
    }

    const existingProduit = this.produits.find(p => p.libelle === value);
    if (existingProduit) {
      this.evenement.produits.push(existingProduit);
    }

    event.chipInput!.clear();
    this.produitsCtrl.setValue(null);
  }

  remove(produit: Produit): void {
    this.evenement.produits = this.evenement.produits.filter(p => p.id !== produit.id);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const selectedProduit = this.produits.find(p => p.libelle === event.option.viewValue);

    if (selectedProduit) {
      this.evenement.produits.push(selectedProduit);
    }

    this.produitsInput.nativeElement.value = '';
    this.produitsCtrl.setValue(null);
  }

  private _filter(value: string): Produit[] {
    const filterValue = value.toLowerCase();

    return this.produits.filter(produit =>
      produit.libelle.toLowerCase().includes(filterValue) &&
      !this.evenement.produits.some(selectedProduit => selectedProduit.id === produit.id)
    );
  }
}
