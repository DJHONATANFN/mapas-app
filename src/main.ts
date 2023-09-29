import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiamhvbmF0YW5mbG9yZXMiLCJhIjoiY2t1NzNxYndiNWhqbTJ4cHFybGkwZHZvZSJ9.vM_nfei1vM2BIZ9CmP1DBg';

if (!navigator.geolocation) {
  alert('El navegador actual no soporta la Geolocalizacion.');
  throw new Error('El navegador actual no soporta la Geolocalizacion.');
}


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
