import { Injectable } from '@angular/core';

import {url} from './config'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import * as io from 'socket.io-client';

@Injectable()
export class EtherDataService {

  private url = url;
  private socket;

  constructor() {
    this.socket = io(this.url);
  }


  data = {
    "price": {data: [], label: 'Etherume'},
    "date": []
  };

  getTempData() {
    this.data.price.data = [0, 0, 0, 0, 0, 0, 0];
    this.data.date = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    return this.data;
  }

  queryHistory() {
    //sent address
    console.log("get_history");
    this.socket.emit('get_history');

    console.log("get_ether_price");
    this.socket.emit('get_ether_price');

    console.log("get_ether_percent");
    this.socket.emit('get_ether_percent');
  }

  getData() {
    //get new data
    let observable = new Observable(observer => {

      this.socket.on('post_history', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  getPercent() {
    //get new data
    let observable = new Observable(observer => {

      this.socket.on('post_ether_percent', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }


  getPrice() {
    //get new data
    let observable = new Observable(observer => {

      this.socket.on('post_ether_price', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }


}



