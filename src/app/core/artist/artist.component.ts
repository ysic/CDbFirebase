import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  items: FirebaseListObservable<any[]>;
  item: FirebaseObjectObservable<any[]>;

  constructor(db: AngularFireDatabase) {
    this.items = db.list('/Artist/-JRHTHaIs-jNPLXOQivY/concerts');
    this.item = db.object('/Artist/-JRHTHaIs-jNPLXOQivY');
  }

  ngOnInit() {
  }

}
