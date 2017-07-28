import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/take';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class RatingService {

  public concertsForOneArtist: FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase) {

   }

   rating(artistId): Observable<any> {
     let i=0;
     let total=0;
     this.concertsForOneArtist = this.db.list('/concerts', {
       query: {
         orderByChild: 'artistID',
         equalTo: artistId
       }
     });
     this.concertsForOneArtist.take(1).subscribe (concerts =>{
       concerts.forEach (concert =>{
         i++;
         total = concert["ratings"]["avgrating"] + total;
         this.db.object("/artists/" + artistId).update({ avgrating: (total/i)});
       });
     });
     return this.concertsForOneArtist;
   }

}
