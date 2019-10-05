import {HostListener, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConstants} from './appConstants';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {RoleEnum} from './roleEnum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
  }

  authenticate(user, callback): void {
    const headers: HttpHeaders = new HttpHeaders(user ?
                                    {authorization: 'Basic ' + btoa(user.username + ':' + user.password)}
                                    : {});

    this.http.get(AppConstants.API_URL + '/login', {headers: headers}).subscribe(response => {
      const user: Object = response;
      if (user) {
        // store user details in local storage to keep user logged in between page refreshes
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        localStorage.setItem('header', JSON.stringify(headers.get('authorization')));
      }
      return callback && callback();
    });
  }

  logOut(): Subscription {
    return this.http.post(AppConstants.API_URL + '/logout', {}).subscribe(response => {
        this.clearUserStorage();
        this.router.navigate(['/login']);
      },
      error => {
        console.log('Error occurred when logging out' + error);
      });
  }

  clearUserStorage(): void {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('header');
  }

  isAuthenticated(): boolean {
    return 'loggedInUser' in localStorage;
  }

  getLoggedInUsersInformation(): string {
    return localStorage.getItem('loggedInUser');
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({authorization: JSON.parse(localStorage.getItem('header'))});
  }

  hasRole(role: RoleEnum): boolean {
    return JSON.parse(this.getLoggedInUsersInformation()).principal.authorities.find(e => e.authority === role.toString());
  }

  isAdmin(): boolean {
    return this.hasRole(RoleEnum.ROLE_ADMIN);
  }

  hasRoleUser(): boolean {
    return this.hasRole(RoleEnum.ROLE_USER);
  }

}
