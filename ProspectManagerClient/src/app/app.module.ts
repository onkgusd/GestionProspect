import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from './services/snackbar.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { GestionProspectModule } from './modules/gestion-prospect/gestion-prospect.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoaderModule } from './modules/loader/loader.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { DeleteConfirmationDialogComponent } from './components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { MotDePasseOublieComponent } from './components/mot-de-passe-oublie/mot-de-passe-oublie.component';
import { ReinitMotDePasseComponent } from './components/reinit-mot-de-passe/reinit-mot-de-passe.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "forbidden", component: ForbiddenComponent },
  { path: "login/mot-de-passe-oublie", component: MotDePasseOublieComponent },
  { path: "login/reinit-mot-de-passe", component: ReinitMotDePasseComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    DeleteConfirmationDialogComponent,
    ForbiddenComponent,
    MotDePasseOublieComponent,
    ReinitMotDePasseComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
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
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatListModule,
    GestionProspectModule,
    LoaderModule
  ],
  providers: [SnackbarService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  } as Provider],
  bootstrap: [AppComponent]
})
export class AppModule { }
