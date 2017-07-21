import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../shared/services/search.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public searchService: SearchService, private route: ActivatedRoute,) {
    let queryValue = this.route.snapshot.paramMap.get('query');
    console.log(queryValue);
    this.searchService.search(queryValue);
    // need a refrech of the page here
  }

  ngOnInit() {
  }

}
