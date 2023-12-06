import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { conf } from 'src/core/conf';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  public ui = {
    deliveryPoints: conf.deliveryPoints,
    inputTouched: false,

    map: {
      center: conf.deliveryPoints[1].marker,
      minZoom: 12,
      zoom: 13,
      maxZoom: 20,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      restriction: {
        latLngBounds: conf.mapBounds,
      },
    },

    appFirebase: (path: string) => {
      return `https://firebasestorage.googleapis.com/v0/b/monosushi-63969.appspot.com/o/app%2F${path.replaceAll(
        '/',
        '%2F'
      )}?alt=media`;
    },

    inputRegister: () => {
      if (!this.ui.inputTouched) this.ui.inputTouched = true;
    },
  };

  @ViewChild('mapAutofill')
  public mapAutofill!: ElementRef;

  @ViewChild(GoogleMap)
  public map!: GoogleMap;
  public choice!: google.maps.Marker;

  ngAfterViewInit(): void {
    const options: google.maps.places.AutocompleteOptions = {
      bounds: conf.mapBounds,
      strictBounds: true,
      types: ['address'],
    };

    const input = this.mapAutofill.nativeElement as HTMLInputElement;
    const autofill = new google.maps.places.Autocomplete(input, options);

    this.choice = new google.maps.Marker();
    this.choice.setIcon(this.ui.appFirebase('misc/map/choice.png'));

    autofill.addListener('place_changed', () => {
      const place = autofill.getPlace();

      if (place && place.geometry && place.geometry.location) {
        if (this.map.googleMap) {
          this.map.googleMap.setCenter(place.geometry.location);
          this.map.googleMap.setZoom(15);

          this.choice.setMap(this.map.googleMap);
          this.choice.setPosition(place.geometry.location);
        }
      }
    });
  }
}
