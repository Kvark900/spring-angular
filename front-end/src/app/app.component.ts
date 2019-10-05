import {Component, HostListener} from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';


  constructor(private authService: AuthService) {
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event): void {
    this.authService.clearUserStorage();
  }
}
