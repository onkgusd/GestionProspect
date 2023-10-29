import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, duration: number = 5000) {
    this.snackBar.open(message, 'Fermer', {
      duration: duration,
    });
  }

  openErrorSnackBar(message: string, duration: number = 5000) {
    this.snackBar.open(message, 'Fermer', {
      duration: duration,
      panelClass: ['snack-error']
    });
  }

  openSuccessSnackBar(message: string, duration: number = 5000) {
    this.snackBar.open(message, 'Fermer', {
      duration: duration,
      panelClass: ['mat-success-bar']
    });
  }

  openWarningSnackBar(message: string, duration: number = 5000) {
    this.snackBar.open(message, 'Fermer', {
      duration: duration,
      panelClass: ['mat-warning-bar']
    });
  }

}