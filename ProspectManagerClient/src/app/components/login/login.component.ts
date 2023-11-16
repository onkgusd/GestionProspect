import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  isSubmitting: boolean;

  constructor(private authService: AuthService,
    private snackbarService: SnackbarService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.authService.getToken())
      this.router.navigate(['/search']);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.isSubmitting = true;
      this.snackbarService.openSnackBar("Tentative de connexion en cours...");
      this.authService.login(this.username, this.password).subscribe((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.snackbarService.openSnackBar("Connecté :)");
          this.snackbarService.openSnackBar("Connecté :) :)");
          this.snackbarService.openSnackBar("Connecté :) :) :)");
          this.router.navigate(['/search']);
        } else {
          this.snackbarService.openErrorSnackBar("Erreur lors de la connexion !", 10000);
        }

        this.isSubmitting = false;
      });
    }
  }
}
