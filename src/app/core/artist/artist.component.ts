import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})

export class ArtistComponent implements OnInit {

  // instance properties
  concerts: FirebaseListObservable<any[]>;
  artist: FirebaseObjectObservable<any[]>;

  constructor(private db: AngularFireDatabase) {
    //called first time before the ngOnInit()
    this.concerts = db.list('/Artist/-JRHTHaIs-jNPLXOQivY/concerts');
    this.artist = db.object('/Artist/-JRHTHaIs-jNPLXOQivY');
  }

  ngOnInit() {
    //called after the constructor and called  after the first ngOnChanges()
  }

  //concertId rating comment author date
  onSubmitComment(concertId, comment){
    console.log (concertId, comment)
    const artistId = "-JRHTHaIs-jNPLXOQivY";
    const path = '/Artist/' + artistId + '/concerts/' + concertId +'/comments';
    return this.db.list(path).push({rating:6, comment:comment, date: Date.now()});
  }

}
