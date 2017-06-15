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

  // a login method that will be called when a login button is clicked
  loginGoogle() {
     this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
       .catch(function (error){
       alert('${error.message} Please try again');
     });
     console.log(this.afAuth.auth.currentUser.displayName);

   }

   loginFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .catch(function (error){
      alert('${error.message} Please try again')
    })
  }

    logout() {
      this.afAuth.auth.signOut();
    }

}
