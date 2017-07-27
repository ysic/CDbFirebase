import { Component, OnInit } from '@angular/core';
import { Concert } from '../../shared/models/concert';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from "firebase";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';

import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})

export class ArtistComponent implements OnInit {
  // instance properties
  public futureConcerts: FirebaseListObservable<any[]>;
  public pastConcerts: FirebaseListObservable<any[]>;
  public listComments: FirebaseListObservable<any[]>;

  public artist: FirebaseObjectObservable<any[]>;
  public comment: FirebaseObjectObservable<any[]>;

  public futureConcert: FirebaseObjectObservable<any[]>;
  public futureVenue: FirebaseObjectObservable<any[]>;

  public pastConcert: FirebaseObjectObservable<any[]>;
  public pastVenue: FirebaseObjectObservable<any[]>;

  public listPastConcerts: Array<any[]>;
  public listFutureConcerts: Array<any[]>;

  public user: Observable<firebase.User>;

  public updateConcert;

  //When a member is marked private, it cannot be accessed from outside of its containing class
  constructor(
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    public afAuth: AngularFireAuth
  ) {
    //called first time before the ngOnInit()

    // local variable block scoop, imunatable,  1 time initialisation, can't be something else

    const artistId: string = this.route.snapshot.paramMap.get('artistId');
    console.log(artistId);

    // To get the object in realtime, create an object binding as a property of your component or service.
    // Then in your template, you can use the async pipe to unwrap the binding.
    this.artist = db.object('/artists/' + artistId);


    //past 5 concerts
    this.listPastConcerts = [];

    this.pastConcerts = db.list('/artists/' + artistId + '/pastConcerts');
    this.pastConcerts.subscribe(concerts => {

      concerts.forEach((concertId, concertIndex) => {

        this.pastConcert = db.object('/concerts/' + concertId.$key);
        this.pastConcert.subscribe(concertInfo => {

          this.listPastConcerts.push(concertInfo);
          this.listPastConcerts[concertIndex]['comments'] = [];
          //console.log(this.listPastConcerts["0"].comments);

          const pastVenueID = this.listPastConcerts[concertIndex]['venueID'];
          this.listPastConcerts[concertIndex]['venueID'] = [];

          this.pastVenue = db.object('/venues/' + pastVenueID);
          this.pastVenue.subscribe(venue => {

            this.listPastConcerts[concertIndex]['venueID'].push(venue);

          });

          this.listComments = db.list('/concerts/' + concertId.$key + "/comments");
          this.listComments.subscribe(comments => {

            comments.forEach(commentId => {

              this.comment = db.object('/comments/' + commentId.$key);
              this.comment.subscribe(commentInfo => {

                this.listPastConcerts[concertIndex]['comments'].push(commentInfo);

              });
            });
          });
        });
      });
    });

    // future 5 concerts
    this.listFutureConcerts = [];

    this.futureConcerts = db.list('/artists/' + artistId + '/futureConcerts');
    this.futureConcerts.subscribe(concerts => {

      concerts.forEach((concertID, concertIndex) => {

        this.futureConcert = db.object('/concerts/' + concertID.$key);
        this.futureConcert.subscribe(concertInfo => {
          this.listFutureConcerts.push(concertInfo);
          const futureVenueID = this.listFutureConcerts[concertIndex]['venueID'];
          this.listFutureConcerts[concertIndex]['venueID'] = [];

          this.futureVenue = db.object('/venues/' + futureVenueID);
          this.futureVenue.subscribe(venue => {

            this.listFutureConcerts[concertIndex]['venueID'].push(venue);
          });
        });
      });
    });

  }

  ngOnInit() {
    //called after the constructor and called  after the first ngOnChanges()

  }

  onSubmitComment(concertId, comment, rating) {

    this.user = this.afAuth.authState;
    this.user.subscribe(userInfo => {
      const newCommentId = this.db.list("/comments").push({
        artistID: this.route.snapshot.paramMap.get('artistId'),
        comment: comment,
        concertID: concertId,
        date: Date.now(),
        rating: rating,
        userID: userInfo.uid
      }).key;

      this.updateConcert = this.db.object("/concerts/" + concertId + "/comments");
      this.updateConcert.update({ [newCommentId]: true });
    });

  }

}
