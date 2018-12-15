import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users;

  constructor(private http: HttpClient, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(response => this.users = response);
  }

}
