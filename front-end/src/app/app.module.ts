import {BrowserModule} from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {AuthService} from './auth.service';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './content/login/login.component';
import {RegisterComponent} from './content/register/register.component';
import {ContentComponent} from './content/content.component';
import {HomeComponent} from './content/home/home.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AdminComponent} from './content/admin/admin.component';
import {UsersComponent} from './content/admin/users/users.component';
import {RolesComponent} from './content/admin/roles/roles.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'admin', component: AdminComponent,
    children: [
      {path: '', redirectTo: 'users', pathMatch: 'full'},
      {path: 'users', component: UsersComponent},
      {path: 'roles', component: RolesComponent}
    ]
  }
];


@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ContentComponent,
    HomeComponent,
    AdminComponent,
    UsersComponent,
    RolesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    FormsModule
  ],
  providers: [AuthService, {provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
