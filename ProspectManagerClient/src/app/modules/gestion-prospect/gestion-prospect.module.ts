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
import { FormsModule } from '@angular/forms';
import { LoaderModule } from '../loader/loader.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProduitsListComponent } from './components/produit/produits-list/produits-list.component';
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

const gestionProspectRoutes: Routes = [
  // Produit
  { path: "produits", component: ProduitsListComponent, canActivate: [AuthGuard] },
  { path: "produits/add", component: ProduitAddComponent, canActivate: [AuthGuard] },
  { path: "produits/:id", component: ProduitEditComponent, canActivate: [AuthGuard] },
  // Prospect
  { path: "prospects", component: ProspectListComponent, canActivate: [AuthGuard] },
  { path: "prospects/add", component: ProspectAddComponent, canActivate: [AuthGuard] },
  { path: "prospects/:id", component: ProspectEditComponent, canActivate: [AuthGuard] },
  // Contact
  { path: "prospects/:id/contacts/add", component: ContactAddComponent, canActivate: [AuthGuard] },
  { path: "prospects/:id/contacts/:id", component: ContactEditComponent, canActivate: [AuthGuard] },
  // Type d'évenement
  { path: "types-evenement", component: TypeEvenementListComponent, canActivate: [AuthGuard] },
  { path: "types-evenement/add", component: TypeEvenementAddComponent, canActivate: [AuthGuard] },
  { path: "types-evenement/:id", component: TypeEvenementEditComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [ProduitsListComponent, ProduitAddComponent, ProduitFormComponent, ProduitEditComponent, TypeEvenementListComponent, TypeEvenementFormComponent, TypeEvenementAddComponent, TypeEvenementEditComponent, ProspectListComponent, ProspectFormComponent, ProspectAddComponent, ProspectEditComponent, ContactListComponent, ContactFormComponent, ContactEditComponent, ContactAddComponent],
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
    RouterModule.forChild(gestionProspectRoutes),
    FlexLayoutModule,
    LoaderModule
  ]
})
export class GestionProspectModule { }
