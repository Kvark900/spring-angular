import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth.service';

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

  isAdmin() {

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
