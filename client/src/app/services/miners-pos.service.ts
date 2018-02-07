import { Injectable} from '@angular/core';
//import {Http} from "@angular/http";
import 'rxjs/add/operator/map'
//import {test_data} from '../components/d3graph/test_data'
//import {url} from './config'

import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class MinersPosService {

  private url = "http://localhost:3000";
  private socket;


  constructor() {
    this.socket = io(this.url);
  }

//socket io
  queryMiner() {
    //sent address
    this.socket.emit('get_miners');
    console.log("get_miners");
  }

  getMiner() {
    //get new data
    let observable = new Observable(observer => {

      this.socket.on('post_miners', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
