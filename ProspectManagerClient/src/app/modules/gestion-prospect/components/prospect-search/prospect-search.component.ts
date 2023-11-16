import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ProspectSearchDto } from '../../dto/prospect-search-dto';
import { Produit } from '../../models/produit';
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ProduitService } from '../../services/produit-service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StatutService } from '../../services/statut.service';
import { Statut } from '../../models/statut';
import { TypeOrganisme } from '../../models/type-organisme';
import { TypeOrganismeService } from '../../services/type-organisme.service';
import { SearchService } from '../../services/search.service';
import { Prospect } from '../../models/prospect';

@Component({
  selector: 'app-prospect-search',
  templateUrl: './prospect-search.component.html',
  styleUrls: ['./prospect-search.component.scss']
})

export class ProspectSearchComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  searchForm: FormGroup;
  isLoading: boolean;
  hasBeenLaunched: boolean;
  prospectSearchResult: Prospect[] = [];
  prospectSearchDto: ProspectSearchDto = new ProspectSearchDto();
  searchCriteria: string[] = [];

  @ViewChild('produitsInput') produitsInput: ElementRef<HTMLInputElement>;
  produitsCtrl = new FormControl('');
  produits: Produit[];
  filteredProduits: Observable<Produit[]>;

  @ViewChild('statutsInput') statutsInput: ElementRef<HTMLInputElement>;
  statutsCtrl = new FormControl('');
  statuts: Statut[];
  filteredStatuts: Observable<Statut[]>;

  @ViewChild('typesOrganismeInput') typesOrganismeInput: ElementRef<HTMLInputElement>;
  typesOrganismeCtrl = new FormControl('');
  typesOrganisme: Statut[];
  filteredTypesOrganisme: Observable<TypeOrganisme[]>;

  constructor(private produitService: ProduitService,
              private statutService: StatutService,
              private typeOrganismeService: TypeOrganismeService,
              private searchService: SearchService,
              private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.produitService.getAll().subscribe({
      next: (produits) => {
        this.produits = produits;
        this.filteredProduits = this.produitsCtrl.valueChanges.pipe(
          startWith(null),
          map((produitLibelle: string | null) => this._filterProduit(produitLibelle ?? "")
          )
        );
        if (this.prospectSearchDto.produits && this.prospectSearchDto.produits.length > 0) {
          const produitsNoms = this.prospectSearchDto.produits.map(produit => produit.libelle).join(', ');
          this.produitsCtrl.setValue(produitsNoms);
        }
        else {
          this.produitsCtrl.setValue(null);
        }
      },
      error: () => this.snackbarService.openErrorSnackBar("😒 Impossible de lister les produits...")
    });

    this.statutService.getAll().subscribe({
      next: (statuts) => {
        this.statuts = statuts;
        this.filteredStatuts = this.statutsCtrl.valueChanges.pipe(
          startWith(null),
          map((statutLibelle: string | null) => this._filterStatut(statutLibelle ?? "")
          )
        );
        if (this.prospectSearchDto.statuts && this.prospectSearchDto.statuts.length > 0) {
          const statutsNoms = this.prospectSearchDto.statuts.map(statut => statut.libelle).join(', ');
          this.statutsCtrl.setValue(statutsNoms);
        }
        else {
          this.statutsCtrl.setValue(null);
        }
      },
      error: () => this.snackbarService.openErrorSnackBar("😒 Impossible de lister les statuts...")
    });

    this.typeOrganismeService.getAll().subscribe({
      next: (typesOrganisme) => {
        this.typesOrganisme = typesOrganisme;
        this.filteredTypesOrganisme = this.typesOrganismeCtrl.valueChanges.pipe(
          startWith(null),
          map((typeOrganismeLibelle: string | null) => this._filterTypeOrganisme(typeOrganismeLibelle ?? "")
          )
        );
        if (this.prospectSearchDto.typesOrganisme && this.prospectSearchDto.typesOrganisme.length > 0) {
          const typesOrganismeNoms = this.prospectSearchDto.typesOrganisme.map(typeOrganisme => typeOrganisme.libelle).join(', ');
          this.typesOrganismeCtrl.setValue(typesOrganismeNoms);
        }
        else {
          this.typesOrganismeCtrl.setValue(null);
        }
      },
      error: () => this.snackbarService.openErrorSnackBar("😒 Impossible de lister les types d'organisme...")
    });

    this.prospectSearchResult = this.searchService.getStoredResult();
    this.prospectSearchDto = this.searchService.getStoredSearch();
    this.hasBeenLaunched = this.searchService.hasBeenLaunched();
  }

  addNom(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.prospectSearchDto.noms.push(value);
    }

    event.chipInput!.clear();
  }

  removeNom(nom: string): void {
    const index = this.prospectSearchDto.noms.indexOf(nom);

    if (index >= 0) {
      this.prospectSearchDto.noms.splice(index, 1);
    }
  }

  editNom(nom: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.removeNom(nom);
      return;
    }

    const index = this.prospectSearchDto.noms.indexOf(nom);
    if (index >= 0) {
      this.prospectSearchDto.noms[index] = value;
    }
  }

  addSecteurActivite(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.prospectSearchDto.secteursActivite.push(value);
    }

    event.chipInput!.clear();
  }

  removeSecteurActivite(secteurActivite: string): void {
    const index = this.prospectSearchDto.secteursActivite.indexOf(secteurActivite);

    if (index >= 0) {
      this.prospectSearchDto.secteursActivite.splice(index, 1);
    }
  }

  editSecteurActivite(secteurActivite: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.removeSecteurActivite(secteurActivite);
      return;
    }

    const index = this.prospectSearchDto.secteursActivite.indexOf(secteurActivite);
    if (index >= 0) {
      this.prospectSearchDto.secteursActivite[index] = value;
    }
  }

  addSecteurGeographique(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.prospectSearchDto.departements.push(value);
    }

    event.chipInput!.clear();
  }

  removeSecteurGeographique(secteurGeographique: string): void {
    const index = this.prospectSearchDto.departements.indexOf(secteurGeographique);

    if (index >= 0) {
      this.prospectSearchDto.departements.splice(index, 1);
    }
  }

  editSecteurGeographique(secteurGeographique: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.removeSecteurGeographique(secteurGeographique);
      return;
    }

    const index = this.prospectSearchDto.departements.indexOf(secteurGeographique);
    if (index >= 0) {
      this.prospectSearchDto.departements[index] = value;
    }
  }

  addProduit(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (!value) {
      return;
    }

    const existingProduit = this.prospectSearchDto.produits.find(p => p.libelle === value);
    if (existingProduit) {
      this.prospectSearchDto.produits.push(existingProduit);
    }

    event.chipInput!.clear();
    this.produitsCtrl.setValue(null);
  }

  removeProduit(produit: Produit): void {
    this.prospectSearchDto.produits = this.prospectSearchDto.produits.filter(p => p.id !== produit.id);
  }

  selectedProduit(event: MatAutocompleteSelectedEvent): void {
    const selectedProduit = this.produits.find(p => p.libelle === event.option.viewValue);

    if (selectedProduit) {
      this.prospectSearchDto.produits.push(selectedProduit);
    }

    this.produitsInput.nativeElement.value = '';
    this.produitsCtrl.setValue(null);
  }

  private _filterProduit(value: string): Produit[] {
    const filterValue = value.toLowerCase();

    return this.produits.filter(produit =>
      produit.libelle.toLowerCase().includes(filterValue) &&
      !this.prospectSearchDto.produits.some(selectedProduit => selectedProduit.id === produit.id)
    );
  }

  addStatut(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (!value) {
      return;
    }

    const existingStatut = this.prospectSearchDto.statuts.find(p => p.libelle === value);
    if (existingStatut) {
      this.prospectSearchDto.statuts.push(existingStatut);
    }

    event.chipInput!.clear();
    this.statutsCtrl.setValue(null);
  }

  removeStatut(statut: Statut): void {
    this.prospectSearchDto.statuts = this.prospectSearchDto.statuts.filter(p => p.id !== statut.id);
  }

  selectedStatut(event: MatAutocompleteSelectedEvent): void {
    const selectedStatut = this.statuts.find(p => p.libelle === event.option.viewValue);

    if (selectedStatut) {
      this.prospectSearchDto.statuts.push(selectedStatut);
    }

    this.statutsInput.nativeElement.value = '';
    this.statutsCtrl.setValue(null);
  }

  private _filterStatut(value: string): Statut[] {
    const filterValue = value.toLowerCase();

    return this.statuts.filter(statut =>
      statut.libelle.toLowerCase().includes(filterValue) &&
      !this.prospectSearchDto.statuts.some(selectedStatut => selectedStatut.id === statut.id)
    );
  }

  addTypeOrganisme(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
  
    if (!value) {
      return;
    }
  
    const existingTypeOrganisme = this.prospectSearchDto.typesOrganisme.find(p => p.libelle === value);
    if (existingTypeOrganisme) {
      this.prospectSearchDto.typesOrganisme.push(existingTypeOrganisme);
    }
  
    event.chipInput!.clear();
    this.typesOrganismeCtrl.setValue(null);
  }
  
  removeTypeOrganisme(typeOrganisme: TypeOrganisme): void {
    this.prospectSearchDto.typesOrganisme = this.prospectSearchDto.typesOrganisme.filter(p => p.id !== typeOrganisme.id);
  }
  
  selectedTypeOrganisme(event: MatAutocompleteSelectedEvent): void {
    const selectedTypeOrganisme = this.typesOrganisme.find(p => p.libelle === event.option.viewValue);
  
    if (selectedTypeOrganisme) {
      this.prospectSearchDto.typesOrganisme.push(selectedTypeOrganisme);
    }
  
    this.typesOrganismeInput.nativeElement.value = '';
    this.typesOrganismeCtrl.setValue(null);
  }
  
  private _filterTypeOrganisme(value: string): TypeOrganisme[] {
    const filterValue = value.toLowerCase();
  
    return this.typesOrganisme.filter(typeOrganisme =>
      typeOrganisme.libelle.toLowerCase().includes(filterValue) &&
      !this.prospectSearchDto.typesOrganisme.some(selectedTypeOrganisme => selectedTypeOrganisme.id === typeOrganisme.id)
    );
  }

  onSubmit(): void {
    this.isLoading = true;
    this.prospectSearchResult = [];
    this.hasBeenLaunched = true;
    this.searchService.searchProspect(this.prospectSearchDto).subscribe({
      next: result => {
        this.prospectSearchResult = result;
        this.isLoading = false;
        this.refreshSearchCriteriaLabel();
      },
      error: error => this.snackbarService.openErrorSnackBar("😖 Une erreur est survenue lors de la recherche...")
    })
  }

  refreshSearchCriteriaLabel() {
    this.searchCriteria = [];

    if (this.prospectSearchDto.noms?.length > 0){
      this.searchCriteria.push(`Nom : ${this.prospectSearchDto.noms.join(", ")}`);
    }
    
    if (this.prospectSearchDto.departements?.length > 0){
      this.searchCriteria.push(`Zone géographique : ${this.prospectSearchDto.departements.join(", ")}`);
    }
    
    if (this.prospectSearchDto.secteursActivite?.length > 0){
      this.searchCriteria.push(`Secteur d'activité : ${this.prospectSearchDto.secteursActivite.join(", ")}`);
    }

    if (this.prospectSearchDto.statuts?.length > 0){
      this.searchCriteria.push(`Statut : ${this.prospectSearchDto.statuts.map(s => s.libelle).join(", ")}`);
    }

    if (this.prospectSearchDto.typesOrganisme?.length > 0){
      this.searchCriteria.push(`Type d'organisme : ${this.prospectSearchDto.typesOrganisme.map(t => t.libelle).join(", ")}`);
    }

    if (this.prospectSearchDto.produits?.length > 0){
      this.searchCriteria.push(`Produits proposés : ${this.prospectSearchDto.produits.map(p => p.libelle).join(", ")}`);
    }
  }
}
