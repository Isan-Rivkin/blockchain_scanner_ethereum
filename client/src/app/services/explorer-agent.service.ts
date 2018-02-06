import { Injectable} from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map'
//import {test_data} from '../components/d3graph/test_data'

import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ExplorerAgentService {

   private url = 'http://localhost:3000';
    private socket;


  constructor(){
    this.socket = io(this.url);
  }

  // constructor(private http:Http) {
  //   console.log("Task services initialized..");
  // }

  // getTransactions(address){
  //   console.log("send "+ address);
  //   return this.http.get(this.url+"/scanner").map(res=>res);
  //}

  sendAddress(address){
    //sent address
    this.socket.emit('send_address', address);
  }
  getTransactions() {
    //get new data
    let observable = new Observable(observer => {

<<<<<<< HEAD
      this.socket.on('new_data', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }
=======
  // getTransactions(address){
  //   console.log("send "+ address);
  //   this.http.get('the url').then((result)=>{
  //     //result.nodes, result.edges})
  //   }
  //   //map(res=>res);
  // }
>>>>>>> 0dc15d65ad44f9e3883827bd885f1118d8b1a6a2



}
