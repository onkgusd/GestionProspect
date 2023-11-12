import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-mot-de-passe-oublie',
  templateUrl: './mot-de-passe-oublie.component.html',
  styleUrls: ['./mot-de-passe-oublie.component.scss']
})
export class MotDePasseOublieComponent implements OnInit {
  isSubmitting: boolean;
  email: string;

  constructor(private snackbarService: SnackbarService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.router.navigate(["/login"]);
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.isSubmitting = true;
      this.snackbarService.openSnackBar("Demande d'envoi de mot de passe...");
      this.authService.demandeLienReinitialisationMotDePasse(this.email).subscribe((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.snackbarService.openSnackBar("Un lien de réinitialisation a été envoyé :)");
          this.router.navigate(['/login']);
        } else {
          this.snackbarService.openErrorSnackBar("Erreur lors de la connexion !", 10000);
        }

        this.isSubmitting = false;
      });
    }
  }
}
