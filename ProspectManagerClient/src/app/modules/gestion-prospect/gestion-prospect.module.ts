import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitsListComponent } from './produits-list/produits-list.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { MatTableModule } from '@angular/material/table';

const gestionProspectRoutes: Routes = [
  { path: "produits", component: ProduitsListComponent, canActivate: [AuthGuard] },
]

@NgModule({
  declarations: [ProduitsListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule.forChild(gestionProspectRoutes)
  ]
})
export class GestionProspectModule { }
