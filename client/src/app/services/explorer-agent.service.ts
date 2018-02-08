import { Injectable} from '@angular/core';
//import {Http} from "@angular/http";
import 'rxjs/add/operator/map'
import {temp_data2} from '../components/d3force-graph/test_data2'

import {url} from './config'

import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ExplorerAgentService {

   private url = url;
    private socket;


  constructor(){
    this.socket = io(this.url);
  }

//socket io
  sendAddress(address){
    //sent address
    this.socket.emit('scan_request', address);
    console.log("send: " + address);
  }
  getTransactions() {
    //get new data
    let observable = new Observable(observer => {

      this.socket.on('scan_response', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  getTestTransactions(){
    return temp_data2;
  }

  //http
  // constructor(private http:Http) {
  //   console.log("Task services initialized..");
  // }

  // getTransactions(address){
  //   console.log("send "+ address);
  //   return this.http.get(this.url+"/scanner").map(res=>res);
  //}

  // getTransactions(address){
  //   console.log("send "+ address);
  //   this.http.get('the url').then((result)=>{
  //     //result.nodes, result.edges})
  //   }
  //   //map(res=>res);
  // }




}
