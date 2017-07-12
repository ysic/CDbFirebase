import { Component, OnInit } from '@angular/core';
import { Concert } from '../../shared/models/concert';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from "firebase";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})

export class ArtistComponent implements OnInit {
  // instance properties
  futureConcerts: FirebaseListObservable<any[]>;
  pastConcerts: FirebaseListObservable<any[]>;

  artist: FirebaseObjectObservable<any[]>;

  arrayPastConcerts: Concert[] = [];
  arrayFuturConcerts: Concert[] = [];

  constructor(private db: AngularFireDatabase) {
    //called first time before the ngOnInit()

    const artistID = "-JRHTHaIs-jNPLXOQivY";

    this.artist = db.object('/artists/' + artistID);

    this.futureConcerts = db.list('/artists/' +artistID + '/futureConcerts', { preserveSnapshot: true});
    this.futureConcerts.subscribe(snapshotFuturConcerts => {
        snapshotFuturConcerts.forEach(snapshotFuturConcert => {
          this.db.object('/concerts/' + snapshotFuturConcert.key, { preserveSnapshot: true}).subscribe(snapshotChildFutur =>{
            this.arrayFuturConcerts.push(snapshotChildFutur.val());
            //console.log(this.arrayFuturConcerts);
          });
        });
    });

    this.pastConcerts = db.list('/artists/' +artistID + '/pastConcerts', { preserveSnapshot: true});
    this.pastConcerts.subscribe(snapshotPastConcerts => {
        snapshotPastConcerts.forEach(snapshotPastConcert => {
          console.log("id past concert: " + snapshotPastConcert.key);
          this.db.object('/concerts/' + snapshotPastConcert.key, { preserveSnapshot: true}).subscribe(snapshotChildPast =>{

            console.log("id venue for past concert: " + snapshotChildPast.val().venueID);

            this.arrayPastConcerts.push(snapshotChildPast.val());
            console.log(this.arrayPastConcerts);

            var concert = firebase.database().ref('/concerts/'+ snapshotPastConcert.key).limitToFirst(1);
            var venues = firebase.database().ref().child('venues');

            concert.on('child_added', snap => {
              venues.child(snapshotChildPast.val().venueID).once('value', venue => {
                console.log(venue.val());
                  this.arrayPastConcerts.push(venue.val());
              });
            });
            
          });

        });
    });

  }

  ngOnInit() {
    //called after the constructor and called  after the first ngOnChanges()

  }

  //concertId rating comment author date
  onSubmitComment(concertId, comment){
    console.log (concertId, comment)
    const artistId = "-JRHTHaIs-jNPLXOQivY";
    //const path = '/artists/' + artistId + '/concerts/' + concertId +'/comments';
    //return this.db.list(path).push({rating:6, comment:comment, date: Date.now()});
  }

}
