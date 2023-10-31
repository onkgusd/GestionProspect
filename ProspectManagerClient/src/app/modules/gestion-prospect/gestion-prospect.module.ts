import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitsListComponent } from './produits-list/produits-list.component';
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
import { ProduitAddComponent } from './produit-add/produit-add.component';
import { ProduitFormComponent } from './produit-form/produit-form.component';
import { FormsModule } from '@angular/forms';
import { ProduitEditComponent } from './produit-edit/produit-edit.component';

const gestionProspectRoutes: Routes = [
  { path: "produits", component: ProduitsListComponent, canActivate: [AuthGuard] },
  { path: "produits/add", component: ProduitAddComponent, canActivate: [AuthGuard] },
  { path: "produits/:id/edit", component: ProduitEditComponent, canActivate: [AuthGuard] },
]

@NgModule({
  declarations: [ProduitsListComponent, ProduitAddComponent, ProduitFormComponent, ProduitEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatSnackBarModule,
    MatIconModule,
    MatSortModule,
    RouterModule.forChild(gestionProspectRoutes)
  ]
})
export class GestionProspectModule { }
