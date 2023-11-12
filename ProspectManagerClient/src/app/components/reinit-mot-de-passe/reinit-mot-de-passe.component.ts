import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { PasswordHelper } from 'src/app/utils/PasswordHelper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reinit-mot-de-passe',
  templateUrl: './reinit-mot-de-passe.component.html',
  styleUrls: ['./reinit-mot-de-passe.component.scss']
})
export class ReinitMotDePasseComponent implements OnInit {
  motdepasse: string;
  email: string;
  passwordHasBeenChanged: boolean;
  showPassword: boolean;
  isSubmitting: boolean;
  token: string | null;

  constructor(private route: ActivatedRoute, private snackbarService: SnackbarService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (!this.token) {
       this.snackbarService.openErrorSnackBar("Demande invalide !");
       this.router.navigate(["/login"]);
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) { 
      this.authService.reinitMotDePasse(this.email, this.motdepasse, this.token || "").subscribe({
        next: () => this.snackbarService.openSuccessSnackBar("Mot passe réinitialisé :)"),
        error: () => this.snackbarService.openErrorSnackBar("Une erreur est survenue lors de la modification du mot de passe...")
      });
    }
  }

  generatePassword() {
    this.motdepasse = PasswordHelper.generatePassword();
    this.showPassword = true;
    this.setPasswordHasBeenChanged();
  }

  setPasswordHasBeenChanged() {
    this.passwordHasBeenChanged = true;
  }
}
