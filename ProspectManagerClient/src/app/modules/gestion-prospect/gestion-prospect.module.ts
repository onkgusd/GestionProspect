import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from '../loader/loader.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProduitListComponent } from './components/produit/produit-list/produit-list.component';
import { ProduitAddComponent } from './components/produit/produit-add/produit-add.component';
import { ProduitFormComponent } from './components/produit/produit-form/produit-form.component';
import { ProduitEditComponent } from './components/produit/produit-edit/produit-edit.component';
import { TypeEvenementListComponent } from './components/type-evenement/type-evenement-list/type-evenement-list.component';
import { TypeEvenementFormComponent } from './components/type-evenement/type-evenement-form/type-evenement-form.component';
import { TypeEvenementAddComponent } from './components/type-evenement/type-evenement-add/type-evenement-add.component';
import { TypeEvenementEditComponent } from './components/type-evenement/type-evenement-edit/type-evenement-edit.component';
import { ProspectListComponent } from './components/prospect/prospect-list/prospect-list.component';
import { ProspectFormComponent } from './components/prospect/prospect-form/prospect-form.component';
import { ProspectAddComponent } from './components/prospect/prospect-add/prospect-add.component';
import { ProspectEditComponent } from './components/prospect/prospect-edit/prospect-edit.component';
import { ContactListComponent } from './components/contact/contact-list/contact-list.component';
import { ContactFormComponent } from './components/contact/contact-form/contact-form.component';
import { ContactEditComponent } from './components/contact/contact-edit/contact-edit.component';
import { ContactAddComponent } from './components/contact/contact-add/contact-add.component';
import { StatutListComponent } from './components/statut/statut-list/statut-list.component';
import { StatutFormComponent } from './components/statut/statut-form/statut-form.component';
import { StatutEditComponent } from './components/statut/statut-edit/statut-edit.component';
import { StatutAddComponent } from './components/statut/statut-add/statut-add.component';
import { ProduitProspectListComponent } from './components/produit-prospect/produit-prospect-list/produit-prospect-list.component';
import { RatingComponent } from 'src/app/components/rating/rating.component';
import { ProduitProspectDialogComponent } from './components/produit-prospect/produit-prospect-dialog/produit-prospect-dialog.component';
import { EvenementListComponent } from './components/evenement/evenement-list/evenement-list.component';
import { EvenementFormComponent } from './components/evenement/evenement-form/evenement-form.component';
import { EvenementEditComponent } from './components/evenement/evenement-edit/evenement-edit.component';
import { EvenementAddComponent } from './components/evenement/evenement-add/evenement-add.component';
import { AdminGuard } from 'src/app/admin.guard';
import { UtilisateurListComponent } from './components/utilisateur/utilisateur-list/utilisateur-list.component';
import { UtilisateurFormComponent } from './components/utilisateur/utilisateur-form/utilisateur-form.component';
import { UtilisateurEditComponent } from './components/utilisateur/utilisateur-edit/utilisateur-edit.component';
import { UtilisateurAddComponent } from './components/utilisateur/utilisateur-add/utilisateur-add.component';
import { TypeOrganismeListComponent } from './components/type-organisme/type-organisme-list/type-organisme-list.component';
import { TypeOrganismeEditComponent } from './components/type-organisme/type-organisme-edit/type-organisme-edit.component';
import { TypeOrganismeAddComponent } from './components/type-organisme/type-organisme-add/type-organisme-add.component';
import { TypeOrganismeFormComponent } from './components/type-organisme/type-organisme-form/type-organisme-form.component';
import { ProspectSearchComponent } from './components/prospect-search/prospect-search.component';
import { ModificationListComponent } from './components/modification/modification-list/modification-list.component';

const gestionProspectRoutes: Routes = [
  // Produit
  { path: "produits", component: ProduitListComponent, canActivate: [AuthGuard] },
  { path: "produits/add", component: ProduitAddComponent, canActivate: [AuthGuard] },
  { path: "produits/:id", component: ProduitEditComponent, canActivate: [AuthGuard] },
  // Prospect
  { path: "prospects", component: ProspectListComponent, canActivate: [AuthGuard] },
  { path: "prospects/add", component: ProspectAddComponent, canActivate: [AuthGuard] },
  { path: "prospects/:id", component: ProspectEditComponent, canActivate: [AuthGuard] },
  // Contact
  { path: "prospects/:id/contacts/add", component: ContactAddComponent, canActivate: [AuthGuard] },
  { path: "prospects/:id/contacts/:idContact", component: ContactEditComponent, canActivate: [AuthGuard] },
  // Evenement
  { path: "prospects/:id/evenements/add", component: EvenementAddComponent, canActivate: [AuthGuard] },
  { path: "prospects/:id/evenements/:idEvenement", component: EvenementEditComponent, canActivate: [AuthGuard] },
  // Type d'évenement
  { path: "types-evenement", component: TypeEvenementListComponent, canActivate: [AdminGuard] },
  { path: "types-evenement/add", component: TypeEvenementAddComponent, canActivate: [AdminGuard] },
  { path: "types-evenement/:id", component: TypeEvenementEditComponent, canActivate: [AdminGuard] },
  // Type d'organisme
  { path: "types-organisme", component: TypeOrganismeListComponent, canActivate: [AdminGuard] },
  { path: "types-organisme/add", component: TypeOrganismeAddComponent, canActivate: [AdminGuard] },
  { path: "types-organisme/:id", component: TypeOrganismeEditComponent, canActivate: [AdminGuard] },
  // Statut
  { path: "statuts", component: StatutListComponent, canActivate: [AdminGuard] },
  { path: "statuts/add", component: StatutAddComponent, canActivate: [AdminGuard] },
  { path: "statuts/:id", component: StatutEditComponent, canActivate: [AdminGuard] },
  // Utilisateur
  { path: "utilisateurs", component: UtilisateurListComponent, canActivate: [AdminGuard] },
  { path: "utilisateurs/add", component: UtilisateurAddComponent, canActivate: [AdminGuard] },
  { path: "utilisateurs/:id", component: UtilisateurEditComponent, canActivate: [AdminGuard] },

  // Search
  { path: "search", component: ProspectSearchComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [
    ProduitListComponent, ProduitAddComponent, ProduitFormComponent, ProduitEditComponent,
    TypeEvenementListComponent, TypeEvenementFormComponent, TypeEvenementAddComponent, TypeEvenementEditComponent,
    ProspectListComponent, ProspectFormComponent, ProspectAddComponent, ProspectEditComponent,
    ContactListComponent, ContactFormComponent, ContactEditComponent, ContactAddComponent,
    StatutListComponent, StatutFormComponent, StatutEditComponent, StatutAddComponent,
    ProduitProspectListComponent, RatingComponent, ProduitProspectDialogComponent,
    EvenementListComponent, EvenementFormComponent, EvenementEditComponent, EvenementAddComponent,
    UtilisateurListComponent, UtilisateurFormComponent, UtilisateurEditComponent, UtilisateurAddComponent,
    TypeOrganismeListComponent, TypeOrganismeEditComponent, TypeOrganismeAddComponent, TypeOrganismeFormComponent,
    ProspectSearchComponent,
    ModificationListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatSnackBarModule,
    MatIconModule,
    MatTabsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDividerModule,
    ReactiveFormsModule,
    RouterModule.forChild(gestionProspectRoutes),
    FlexLayoutModule,
    LoaderModule
  ]
})
export class GestionProspectModule { }
