import { Injectable} from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map'
//import {test_data} from '../components/d3graph/test_data'

@Injectable()
export class ExplorerAgentService {

   private url = 'http://localhost:3000';

  constructor(private http:Http) {
    console.log("Task services initialized..");
  }

  // getTransactions(address){
  //   console.log("send "+ address);
  //   this.http.get('the url').then((result)=>{
  //     //result.nodes, result.edges})
  //   }
  //   //map(res=>res);
  // }



}
