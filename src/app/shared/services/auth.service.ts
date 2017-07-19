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

  constructor(public afAuth: AngularFireAuth) {

  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(result =>{
      console.log(result);
    });
  }

  logout() {
    this.afAuth.auth.signOut();
    console.log("sign-out successful");
  }


  //Create account
  //firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {console.log(error);});

  //sign in
  //firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {console.log(error);});
}
