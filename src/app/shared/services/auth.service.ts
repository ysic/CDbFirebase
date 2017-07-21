import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


//The @Injectable() decorator tells TypeScript to emit metadata about the service.
//The metadata specifies that Angular may need to inject other dependencies into this service.
@Injectable()

export class AuthService {

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

}
