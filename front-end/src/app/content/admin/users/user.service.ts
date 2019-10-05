import {Injectable} from '@angular/core';
import {AppConstants} from '../../../appConstants';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../../../auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getUsers(): Observable<Object> {
    return this.http.get(AppConstants.API_URL + '/admin/users', {headers: this.authService.getHeaders()});
  }

  getUsersPageable(page: number, pageSize: number): Observable<Object> {
    const url = `${AppConstants.API_URL}/admin/users?page=${page}&pageSize=${pageSize}`;
    return this.http.get(url, {headers: this.authService.getHeaders()});
  }
}
