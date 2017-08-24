import { Component, OnInit } from '@angular/core';
import { Concert } from '../../shared/models/concert';
import {RatingService} from '../../shared/services/rating.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from "firebase";
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';

//If you only want the subscribe callback to get called once,
//Iyou'll need to use the rxjs take operator. take(1)
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
  public concerts: FirebaseListObservable<any[]>;
  public comments: FirebaseListObservable<any[]>;

  public artist: FirebaseObjectObservable<any[]>;
  public comment: FirebaseObjectObservable<any[]>;

  public concert: FirebaseObjectObservable<any[]>;
  public venue: FirebaseObjectObservable<any[]>;

  public listConcerts: Array<any[]>;
  public discoDgData: Array<any[]>;

  public user: Observable<firebase.User>;

  public concertRatings: FirebaseObjectObservable<any[]>;

  //When a member is marked private, it cannot be accessed from outside of its containing class
  constructor(
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    public afAuth: AngularFireAuth,
    public ratingService: RatingService,
    public http:Http
  ) {
    //called first time before the ngOnInit()

    // local variable block scoop, imunatable,  1 time initialisation, can't be something else

    //-KqOq9NrEvzw_RK2LlMH Arcade Fire
    //https://api.discogs.com/artists/281232
    //http://musicbrainz.org/ws/2/artist/52074ba6-e495-4ef3-9bb4-0703888a9f68?inc=aliases&fmt=json
    //https://en.wikipedia.org/w/api.php?action=query&titles=Arcade%20Fire&prop=revisions&rvprop=content&format=json

    const artistId: string = this.route.snapshot.paramMap.get('artistId');
    console.log(artistId);
    this.artist = db.object('/artists/' + artistId);

    // this.artist.take(1).subscribe(artistInfo => {
    //   if (!artistInfo.nameVariations) {
    //
    //   }
    //   console.log(artistInfo.id);
    //   const url = 'https://api.discogs.com/artists/' + artistInfo.id;
    //   http.get(url).subscribe(res =>{
    //     this.discoDgData = [];
    //     this.discoDgData.push(JSON.parse(res['_body']));
    //     console.log(this.discoDgData["0"]);
    //   });
    // });


    this.listConcerts = [];

    this.concerts = db.list('/artists/' + artistId + '/concerts');
    this.concerts.take(1).subscribe(concerts => {

      concerts.forEach((concertId, concertIndex) => {

        this.concert = db.object('/concerts/' + concertId.$key);
        this.concert.take(1).subscribe(concertInfo => {

          this.listConcerts.push(concertInfo);
          this.listConcerts[concertIndex]['comments'] = [];
          //console.log(this.listPastConcerts["0"].comments);

          const pastVenueID = this.listConcerts[concertIndex]['venueID'];
          this.listConcerts[concertIndex]['venueID'] = [];

          this.venue = db.object('/venues/' + pastVenueID);
          this.venue.take(1).subscribe(venue => {

            this.listConcerts[concertIndex]['venueID'].push(venue);

          });

          this.comments = db.list('/concerts/' + concertId.$key + "/comments");
          this.comments.take(1).subscribe(comments => {

            comments.forEach(commentId => {

              this.comment = db.object('/comments/' + commentId.$key);
              this.comment.take(1).subscribe(commentInfo => {

                this.listConcerts[concertIndex]['comments'].push(commentInfo);

              });
            });
          });
        });
      });
    });

  }

  ngOnInit() {
    //called after the constructor and called  after the first ngOnChanges()

  }

  onSubmitComment(concertId, comment, rating) {
    console.log("concert ID: " + concertId);
    this.user = this.afAuth.authState;
    this.user.subscribe(infouser =>{
      console.log(infouser);
    })
    // this.user.subscribe(userInfo => {
    //   const newCommentId = this.db.list("/comments").push({
    //     artistID: this.route.snapshot.paramMap.get('artistId'),
    //     comment: comment,
    //     concertID: concertId,
    //     date: Date.now(),
    //     rating: rating,
    //     userID: userInfo.uid
    //   }).key;
    //
    //   // calculation of the avrage rating for the concert. Need in the future a weighted rating
    //   // need to creat the rating before the calculation if they are not existing
    //   this.concertRatings = this.db.object("/concerts/" + concertId + "/ratings");
    //   this.concertRatings.take(1).subscribe(ratings =>{
    //     const ratingValue = ratings[rating] + 1;
    //     const numRatings = ratings["ratingNum"] + 1;
    //     const ratingsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    //     let total = 0;
    //     for (let item of ratingsArray) {
    //       if (item == rating) {
    //         total = (item * ratingValue) + total;
    //       } else {
    //         total = (item *  ratings[item]) + total;
    //       }
    //     }
    //     this.db.object("/concerts/" + concertId + "/ratings").update({ [rating]: ratingValue});
    //     this.db.object("/concerts/" + concertId + "/ratings").update({ ratingNum: numRatings});
    //     this.db.object("/concerts/" + concertId + "/ratings").update({ ratingAvg: Math.round((total/numRatings)*10)/10});
    //     this.db.object("/concerts/" + concertId + "/comments").update({ [newCommentId]: true });
    //     this.db.object("/users/" + userInfo.uid + "/comments").update({ [newCommentId]: true });
    //   });
    //     this.ratingService.ratingArtist(this.route.snapshot.paramMap.get('artistId'));
    // });

  }

}
