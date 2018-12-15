import {Injectable} from '@angular/core';
import {AppConstants} from '../../../appConstants';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../../../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getUsers() {
    return this.http.get(AppConstants.API_URL + '/admin/users', {headers: this.authService.getHeaders()});
  }
}
