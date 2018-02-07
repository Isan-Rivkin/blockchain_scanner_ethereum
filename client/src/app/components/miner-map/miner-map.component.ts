
import { Component, OnInit } from '@angular/core';

import { MinersPosService} from '../../services/miners-pos.service'
import {pos} from './test _data'

@Component({
  selector: 'app-miner-map',
  templateUrl: './miner-map.component.html',
  styleUrls: ['./miner-map.component.css'],
  providers: [MinersPosService]

})
export class MinerMapComponent  implements OnInit{

  title:string;
  markers;

  ngOnInit(): void {
    this.minersPosService.getMiner().subscribe(newdata => {
      var to_display = [];
      if(newdata['cords'].length < 100){

      }else{
        for(var i=0;i<newdata['cords'].length;i+=100){
          to_display.push(newdata['cords'][i]);
        }
           this.markers =to_display;
      }
    });
  }



  constructor(private  minersPosService:MinersPosService){
    this.title = "Miners Map"
    minersPosService.queryMiner();

  }
  // google maps zoom level
  zoom: number = 5;

  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }


}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
}
