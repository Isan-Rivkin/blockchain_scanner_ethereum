
import { Component } from '@angular/core';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-miner-map',
  templateUrl: './miner-map.component.html',
  styleUrls: ['./miner-map.component.css']
})
export class MinerMapComponent {
  title:string;

  constructor(){
    this.title = "Miners Map"
  }
  // google maps zoom level
  zoom: number = 5;

  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  // mapClicked($event: MouseEvent) {
  //   this.markers.push({
  //     lat: $event.coords.lat,
  //     lng: $event.coords.lng,
  //     draggable: true
  //   });
  // }

  // markerDragEnd(m: marker, $event: MouseEvent) {
  //   console.log('dragEnd', m, $event);
  // }

  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A'

    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B'

    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C'

    }
  ]
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;

}
