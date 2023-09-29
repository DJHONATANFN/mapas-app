import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places.interface';
import { PlacesApiClient } from '../api/placesApiClient';
import { MapsService } from './maps.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];


  get userLocationReady(): boolean {
    return !!this.userLocation;
  }

  deletePlaces(){
    this.places=[];
  }

  constructor(private placesapi: PlacesApiClient, private mapService:MapsService) {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {

    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },
        (err) => {
          alert('No se pudo obtener la Geolocalizacion.');
          reject();
        }
      );

    });
  }

  getPlacesByQuery(query: string = "") {
    if(query.length===0){
      this.places =[];
      this.isLoadingPlaces = false;
      return;
    }

    if(!this.userLocation) throw new Error('No hay UserLocation');
    this.isLoadingPlaces= true;
    this.placesapi.get<PlacesResponse>(`/${query}.json`,{
      params: {
        proximity: this.userLocation?.join(',')
      }
    })
      .subscribe(resp => {
        this.isLoadingPlaces= false;
        this.places = resp.features;
        this.mapService.createMarkersFromPlaces(this.places,this.userLocation!);
      });

  }
}
