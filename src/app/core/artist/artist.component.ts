import { Component, OnInit } from '@angular/core';
import { Concert } from '../../shared/models/concert';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
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

  public artist: FirebaseObjectObservable<any[]>;

  public futureConcert: FirebaseObjectObservable<any[]>;
  public futureVenue: FirebaseObjectObservable<any[]>;
  public pastConcert: FirebaseObjectObservable<any[]>;
  public pastVenue: FirebaseObjectObservable<any[]>;

  public listConcerts: Array<any[]>;

  //When a member is marked private, it cannot be accessed from outside of its containing class
  constructor(private db: AngularFireDatabase, private route: ActivatedRoute) {
    //called first time before the ngOnInit()

    // local variable block scoop, imunatable,  1 time initialisation, can't be something else
    // 00RHTHaIs-jNPLXOQivY
    // 44RHTHaIs-jNPLXOQivY
    const artistId: string = this.route.snapshot.paramMap.get('artistId');
    console.log(artistId);

    // To get the object in realtime, create an object binding as a property of your component or service.
    // Then in your template, you can use the async pipe to unwrap the binding.
    this.artist = db.object('/artists/' + artistId);


    //past 5 concerts
    this.listConcerts = [];
    this.pastConcerts = db.list('/artists/' + artistId + '/pastConcerts');
    this.pastConcerts.subscribe(concerts => {
      concerts.forEach(concertID => {
        this.pastConcert = db.object('/concerts/' + concertID.$key);
        this.pastConcert.subscribe(concertInfo => {
          this.listConcerts.push(concertInfo);
          this.pastVenue = db.object('/venues/' + concertInfo["venueID"]);
        });
      });
    });

    // future 5 concerts
    this.futureConcerts = db.list('/artists/' + artistId + '/futureConcerts');
    this.futureConcerts.subscribe(concerts => {
      concerts.forEach(concertID => {
        this.futureConcert = db.object('/concerts/' + concertID.$key);
        this.futureConcert.subscribe(concertInfo => {
          this.futureVenue = db.object('/venues/' + concertInfo["venueID"]);
        });
      });
    });

  }

  ngOnInit() {
    //called after the constructor and called  after the first ngOnChanges()

  }

  //concertId rating comment author date
  onSubmitComment(concertId, comment) {
    console.log(concertId, comment)
    const artistId = "-JRHTHaIs-jNPLXOQivY";
    //const path = '/artists/' + artistId + '/concerts/' + concertId +'/comments';
    //return this.db.list(path).push({rating:6, comment:comment, date: Date.now()});
  }

}
