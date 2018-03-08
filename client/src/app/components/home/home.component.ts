import { Component, OnInit } from '@angular/core';
//import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {HomeService} from "../../services/home.service";
import {ExplorerAgentService} from "../../services/explorer-agent.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService],
})
export class HomeComponent implements OnInit {
  Openning:string = "Ethereum Blockchain explorer";
  Urls: string = "";
  Type: string = "";
  constructor(private home:HomeService) {

  }
  ngOnInit() {
    this.home.cookieRequest().subscribe(data=>{
      for(var i=0;i<data[0]['urls'].length;++i){
        this.Urls += data[0]['urls'][i];
        this.Urls += '\n';
      }
      this.Type = "Suggested resources for "+ data[0]['type'];
    });
  }

}
