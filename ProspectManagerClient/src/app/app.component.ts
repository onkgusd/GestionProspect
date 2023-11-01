import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isSidenavOpened = true;
  title = 'ProspectManagerClient';
  userName: string | undefined;
  isLoggedIn: boolean;
  isAdmin: boolean;

  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.authService.userName$.subscribe((userName) => {
      this.userName = userName;
    });

    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }

  toggleSidenav(): void {
    this.isSidenavOpened = !this.isSidenavOpened;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["login"]);
  }
}
