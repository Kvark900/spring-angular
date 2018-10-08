import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConstants} from './appConstants';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private _authenticated = false;

  constructor(private http: HttpClient, private router: Router) {
  }

  authenticate(user, callback) {
    const headers = new HttpHeaders(user ?
                                    {authorization: 'Basic ' + btoa(user.username + ':' + user.password)}
                                    : {});

    this.http.get(AppConstants.API_URL + '/login', {headers: headers}).subscribe(response => {
      const user = response;
      if (user) {
        // store user details in local storage to keep user logged in between page refreshes
        localStorage.setItem('loggedInUser', JSON.stringify(user));
      }
      return callback && callback();
    });
  }

  logOut() {
    return this.http.post(AppConstants.API_URL + '/logout', {}).subscribe(response => {
        localStorage.removeItem('loggedInUser');
        this.router.navigate(['/login']);
      },
      error => {
        console.log('Error occurred when logging out'  + error);
      });
  }

  public isAuthenticated(): boolean {
    return 'loggedInUser' in localStorage;
  }

  public getLoggedInUsersInformation() {
    return localStorage.getItem('loggedInUser');
  }


}
