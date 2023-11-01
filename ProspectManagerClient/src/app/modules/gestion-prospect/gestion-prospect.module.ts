import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitsListComponent } from './components/produits-list/produits-list.component';
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
import { MatPaginatorModule} from '@angular/material/paginator';
import { ProduitAddComponent } from './components/produit-add/produit-add.component';
import { ProduitFormComponent } from './components/produit-form/produit-form.component';
import { FormsModule } from '@angular/forms';
import { ProduitEditComponent } from './components/produit-edit/produit-edit.component';
import { ProduitViewComponent } from './components/produit-view/produit-view.component';
import { LoaderModule } from '../loader/loader.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const gestionProspectRoutes: Routes = [
  { path: "produits", component: ProduitsListComponent, canActivate: [AuthGuard] },
  { path: "produits/add", component: ProduitAddComponent, canActivate: [AuthGuard] },
  { path: "produits/:id", component: ProduitEditComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [ProduitsListComponent, ProduitAddComponent, ProduitFormComponent, ProduitEditComponent, ProduitViewComponent],
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
    RouterModule.forChild(gestionProspectRoutes),
    FlexLayoutModule,
    LoaderModule
  ]
})
export class GestionProspectModule { }
