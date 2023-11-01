import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isSidenavOpened = true;
  title = 'ProspectManagerClient';

  constructor(private authService: AuthService, private router: Router) { }

  isConnected(): boolean {
    return !!this.authService.getToken();
  }

  toggleSidenav(): void {
    this.isSidenavOpened = !this.isSidenavOpened;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["login"]);
  }
}
