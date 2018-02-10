import { Injectable} from '@angular/core';
//import {Http} from "@angular/http";
import 'rxjs/add/operator/map'
import {temp_data2} from '../components/d3force-graph/test_data2'
import {url} from './config'


import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { IData } from '../components/d3force-graph/d3_data_interface';

import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ExplorerAgentService {


  private mockData: IData = {
    "nodes": [
      {"id": "1", "group": 1, "address": "0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98"},
      {"id": "2", "group": 1, "address": "0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98"},
      {"id": "3", "group": 1, "address": "0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98"}
    ],
    "links": [
      {"source": "1", "target": "2", "value": 1},
      {"source": "2", "target": "3", "value": 8},
      {"source": "3", "target": "1", "value": 10}
    ]
  };

  private addData: IData = {
    "nodes": [
      {"id": "4", "group": 3, "address": "0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98"},
      {"id": "5", "group": 3, "address": "0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98"},
      {"id": "6", "group": 5, "address": "0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98"}
    ],
    "links": [
      {"source": "1", "target": "4", "value": 1},
      {"source": "4", "target": "5", "value": 8},
      {"source": "5", "target": "6", "value": 10}
    ]
  };


  private dataSubject = new BehaviorSubject<IData>(this.mockData);

  $data = this.dataSubject.asObservable();



  addDAddrData(newData: IData) {
    for(var i = 0; i<newData.nodes.length; i++){
      this.mockData.nodes.push(newData.nodes[i]);
    }
    for(var i = 0; i<newData.links.length; i++){
      this.mockData.links.push(newData.links[i]);
    }
    console.log(JSON.stringify(this.mockData.nodes));
    console.log(JSON.stringify(this.mockData.links));

  this.dataSubject.next(this.mockData);

  }

  //////////////////////////

  private url = url;
  private socket;


  constructor() {
    this.socket = io(this.url);
  }


//socket io
  sendAddress(address) {
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

  getTestTransactions() {
    return temp_data2;
  }
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





