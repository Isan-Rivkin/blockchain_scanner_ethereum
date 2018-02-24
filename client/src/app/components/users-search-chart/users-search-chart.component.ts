import { Component, OnInit } from '@angular/core';
import {UsersCountingService} from '../../services/users-counting.service'

@Component({
  selector: 'app-users-search-chart',
  templateUrl: './users-search-chart.component.html',
  styleUrls: ['./users-search-chart.component.css'],
  providers:[UsersCountingService]
})
export class UsersSearchChartComponent implements OnInit {

// Doughnut
  public doughnutChartLabels:string[] = ['User', 'Distribuer', 'erc20', 'Contract-non-erc', 'Miner', 'Exchange',  'uUser'];
  public doughnutChartData:number[] ;
  public doughnutChartType:string = 'doughnut';

  constructor(usersCountingService:UsersCountingService) {
    //// TODO change to i.o Data (subscribe)
    this.doughnutChartData= usersCountingService.getTempData();
  }



  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }



  ngOnInit() {
  }

}
