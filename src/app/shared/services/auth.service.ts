import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


//The @Injectable() decorator tells TypeScript to emit metadata about the service.
//The metadata specifies that Angular may need to inject other dependencies into this service.
@Injectable()
export class AuthService {

  //A representation of any set of values over any amount of time.
  // This the most basic building block of RxJS.
  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    this.user = afAuth.authState; //allows us to check the authentication state
  }

  loginGoogle(): void {
    var provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(function(authData) {
      console.log(authData.credential);
      console.log(authData.additionalUserInfo.profile);
    }).catch(function(error) {
      console.log(error);
    });
  }

  loginFacebook(): void {
    var provider = new firebase.auth.FacebookAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(function(authData) {
      console.log(authData);
    }).catch(function(error) {
      console.log(error);
    });
  }

  logout(): void {
    this.afAuth.auth.signOut().then(function() {
      console.log("sign-out successful");
    }, function(error) {
      console.log(error);
    });
  }

  //Create account
  //firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {console.log(error);});

  //sign in
  //firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {console.log(error);});
}
