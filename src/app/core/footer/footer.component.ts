import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

// Lifecycle hook that is called after data-bound properties of a directive are initialized
export class FooterComponent implements OnInit {
  copyright = '© Copyright 2017 Concerts Database';
  owner = 'Orane REULAND';
  constructor() { }
  ngOnInit() { }
}
