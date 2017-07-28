import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class RatingService {

  public commentsForOneArtist: FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase) {

   }

   rating(artistId): Observable<any> {

     this.commentsForOneArtist = this.db.list('/comments', {
       query: {
         orderByChild: 'artistID',
         equalTo: artistId
       }
     });
     this.commentsForOneArtist.subscribe (comments =>{

     });
     return this.commentsForOneArtist;
   }

}
