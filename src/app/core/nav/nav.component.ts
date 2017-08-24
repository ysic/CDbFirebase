import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router} from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public user: Observable<firebase.User>;
  public displayName: string;
  public photoURL: string;

  //The constructor itself does nothing. The parameter simultaneously defines a
  //public authService property and identifies it as a AuthService injection site.

  //When a member is marked private, it cannot be accessed from outside of its containing class
  constructor(
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private router: Router
  ) {
    // only triggered on sign-in/out (for old behavior use .idToken)
    // //allows us to check the authentication state
    this.user = afAuth.authState;
    this.user.subscribe(userInfo => {
      if (userInfo) {
        console.log(userInfo.displayName);
        this.displayName = userInfo.displayName;
        this.photoURL = userInfo.photoURL;
      }
    })
  }

  ngOnInit() {
  }

  loginGoogle() {
    this.authService.loginGoogle();
  }

  logout() {
    this.authService.logout();
  }

  getSearch(queryValue) {
    this.router.navigate(['/search/' + queryValue]);
  }
}
