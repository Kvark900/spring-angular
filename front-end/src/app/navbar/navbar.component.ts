import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {RoleEnum} from '../roleEnum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  isAdmin(): boolean {
    return this.authService.hasRole(RoleEnum.ROLE_ADMIN);
  }

  hasRoleUser(): boolean {
    return this.authService.hasRole(RoleEnum.ROLE_USER);
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  getLoggedInUsersInformation() {
    return JSON.parse(this.authService.getLoggedInUsersInformation());
  }

  logOut(): void {
    this.authService.logOut();
  }
}
