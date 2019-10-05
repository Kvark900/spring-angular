import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users; // PageRequest
  currentPage = 1;
  pageSize = 20;

  constructor(private http: HttpClient, private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUsersPageable(--this.currentPage, this.pageSize).subscribe(response => this.users = response);
  }

  onPageChange(currentPage: number): void {
    this.userService.getUsersPageable(--currentPage, this.pageSize).subscribe(response => this.users = response);
  }
}
