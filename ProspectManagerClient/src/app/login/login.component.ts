import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { SnackbarService } from '../services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private authService: AuthService,
    private snackbarService: SnackbarService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.authService.getToken())
      this.router.navigate(['/produits']);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.snackbarService.openSnackBar("Tentative de connexion en cours...", 10000000);
      this.authService.login(this.username, this.password).subscribe((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.snackbarService.openSnackBar("Connecté :)");
          this.router.navigate(['/produits']);
        } else {
          console.log("retour ok");
          this.snackbarService.openErrorSnackBar("Erreur lors de la connexion !", 10000);
        }
      });
    }
  }
}
