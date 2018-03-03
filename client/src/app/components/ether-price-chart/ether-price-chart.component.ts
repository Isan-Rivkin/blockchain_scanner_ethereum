import { Component, OnInit } from '@angular/core';
import {EtherDataService} from '../../services/ether-data.service'
@Component({
  selector: 'app-ether-price-chart',
  templateUrl: './ether-price-chart.component.html',
  styleUrls: ['./ether-price-chart.component.css'],
  providers: [EtherDataService]
})

export class EtherPriceChartComponent {
  ether_price =0;
  ether_percent= 0;
  chartData:{};
  constructor(private etherDataService:EtherDataService){
    etherDataService.queryHistory();
    //this.updateData();
  }

////////////////////
  ngOnInit(): void {
    //this.updateData();

    this.etherDataService.getData().subscribe(newdata => {

      //console.log("History data: "+ JSON.stringify(newdata));
      this.lineChartData.push(newdata['price']);
      this.lineChartLabels = newdata['date'];

    });

    this.etherDataService.getPrice().subscribe(price=>{
      this.ether_price = parseInt(JSON.stringify(price));
    });

    this.etherDataService.getPercent().subscribe(percent=>{
      this.ether_percent = parseInt(JSON.stringify(percent));
    });

  }

  // lineChart

  public lineChartData:Array<any> = [0]; //{data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}

  public lineChartLabels:Array<any> =[""];// ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';

  // public randomize():void {
  //   let _lineChartData:Array<any> = new Array(this.lineChartData.length);
  //   for (let i = 0; i < this.lineChartData.length; i++) {
  //     _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
  //     for (let j = 0; j < this.lineChartData[i].data.length; j++) {
  //       _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
  //     }
  //   }
  //   this.lineChartData = _lineChartData;
  // }

  // events
  // public chartClicked(e:any):void {
  //   console.log(e);
  // }
  //
  // public chartHovered(e:any):void {
  //   console.log(e);
  // }
}
