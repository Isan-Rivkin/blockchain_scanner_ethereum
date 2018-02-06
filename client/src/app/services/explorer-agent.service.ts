import { Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
//import * as io from 'socket.io-client';
import {test_data} from '../components/d3graph/test_data'

@Injectable()
export class ExplorerAgentService {

  // private url = 'http://localhost:3000';
  // private socket;

  getTransactions(address){
    console.log("send "+ address);
    return test_data
  }



}
