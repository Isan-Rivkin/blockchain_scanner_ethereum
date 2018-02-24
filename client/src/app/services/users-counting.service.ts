import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {url} from './config'

@Injectable()
export class UsersCountingService {

  public data:number[] = [100, 20, 100, 40,80, 10,50];

  private url = url;
  private socket;

    constructor() {
    this.socket = io(this.url);
  }

  getData() {
    //get new data
    let observable = new Observable(observer => {

      this.socket.on('users_response', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  getTempData(){
      return this.data;
  }



}
