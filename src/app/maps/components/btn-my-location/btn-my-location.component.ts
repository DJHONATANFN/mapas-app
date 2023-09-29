import { Component } from '@angular/core';
import { MapsService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent {

  constructor(private mapService:MapsService,
    private placesService:PlacesService){}

  gotMyLocation(){

    if(!this.placesService.userLocationReady) throw new Error('No hay ubicacion del usuario');
    if(!this.mapService.isMapReady) throw new Error('No se ha inicializado el mapa');

    this.mapService.flyTo(this.placesService.userLocation!);

  }

}
