import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

//The @Injectable() decorator tells TypeScript to emit metadata about the service.
//The metadata specifies that Angular may need to inject other dependencies into this service.
@Injectable()

export class SearchService {

  public searchArtists: FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase) {

   }

   search(searchValue): Observable<any> {

     console.log("search for an artist");

     this.searchArtists = this.db.list('/artists', {
       query: {
         orderByChild: 'name',
         startAt: searchValue, //.toLowerCase()
         endAt:searchValue + '\uf8ff'
       }
     });
     return this.searchArtists;
   }


}
