import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-festivals',
  templateUrl: './map-festivals.component.html',
  styleUrls: ['./map-festivals.component.css']
})
export class MapFestivalsComponent implements OnInit {

  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,
    center: L.latLng([46.879966, -121.726909])
  };

  constructor() { }

  ngOnInit() {
  }

}
