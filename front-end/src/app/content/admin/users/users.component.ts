import {Component, OnInit} from '@angular/core';
import {AppConstants} from '../../../appConstants';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private http: HttpClient, private userService: UserService) {
  }

  users = this.userService.users;

  ngOnInit() {
    this.userService.getUsers();
  }


}
