import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {element} from 'protractor';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private http: HttpClient) {
  }

  ngOnInit() {
  }

  roleChecker(role: string) {
    const authorities = this.getLoggedInUsersInformation().principal.authorities;
    for (let i = 0; i < authorities.length; i++) {
      if (authorities[i].authority === role) {
        return true;
      }
    }

    return false;
  }

  isAdmin() {
    return this.roleChecker('ROLE_ADMIN');
  }

  hasRoleUser() {
    return this.roleChecker('ROLE_USER');
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logOut() {
    this.authService.logOut();
  }

  getLoggedInUsersInformation() {
    return JSON.parse(this.authService.getLoggedInUsersInformation());
  }
}
