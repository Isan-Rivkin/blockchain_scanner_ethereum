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
      this.Urls = data[0]['urls'];
      this.Type = "Suggested resources for "+ data[0]['type'];
    });
  }

}
