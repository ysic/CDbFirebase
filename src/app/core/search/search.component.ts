import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../shared/services/search.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public artist: FirebaseObjectObservable<any[]>;
  public listArtists: Array<any[]>;

  constructor(public searchService: SearchService, private route: ActivatedRoute, private db: AngularFireDatabase) {
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.searchService.search(params.get('query')))
      .subscribe(queryListArtists => {
        this.listArtists = [];
        queryListArtists.forEach(artistID => {
          this.artist = this.db.object('/artists/' + artistID.$key);
          this.artist.subscribe(artistInfo => {
            this.listArtists.push(artistInfo);
          });
        });
      });
  }

}
