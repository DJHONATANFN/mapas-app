import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MapsService, PlacesService } from '../../services';
import {Map, Popup, Marker} from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  constructor(private placesServices: PlacesService, private mapsService:MapsService) {
  }

  ngAfterViewInit(): void {

    if (!this.placesServices.userLocation) {
      throw new Error('No hay localizacion.');
    }

    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesServices.userLocation, // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    const poput = new Popup()
    .setHTML(`
      <h6>Aqui estoy</h6>
      <span>Estoy en este lugar del mundo</span>
    `);
     new Marker({color: 'red'})
     .setLngLat(this.placesServices.userLocation)
     .setPopup(poput)
     .addTo(map);

     this.mapsService.setMap(map);


  }

}
