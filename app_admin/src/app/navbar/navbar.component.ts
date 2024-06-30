import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  constructor(
    public authenticationService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit() { }
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
  public onLogout(): void {
    this.authenticationService.logout();
    this.router.navigateByUrl('/');
    return;
  }
}
