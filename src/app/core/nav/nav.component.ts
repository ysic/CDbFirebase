import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  //The constructor itself does nothing. The parameter simultaneously defines a
  //public authService property and identifies it as a AuthService injection site.

  //When a member is marked private, it cannot be accessed from outside of its containing class
  constructor(public authService: AuthService) {
  }
  ngOnInit() {
  }

  //void -> prevent the page from refreshing
  loginGoogle(): void {
    this.authService.loginGoogle();
  }

  loginFacebook(): void {
    this.authService.loginFacebook();
  }

    logout(): void {
      this.authService.logout();
    }
}
