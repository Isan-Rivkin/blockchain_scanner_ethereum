//our root app component
import {Component, NgModule, OnInit, AfterViewInit,ViewChild, OnDestroy ,ViewEncapsulation, ElementRef} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {temp_data} from './test_data'
import * as d3 from './D3config'
import {ExplorerAgentService} from '../../services/explorer-agent.service'

import { IData } from './d3_data_interface';
import {test_data} from "../d3graph/test_data";

@Component({
  selector: 'app-d3-force-graph',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./d3force-graph.component.css'],
  template: `
    <div>
      <h2>Hello {{name}}</h2>
           <div class="address-group">
               <label for="str">Address:</label>
               <input id = "str" [(ngModel)]="root"  placeholder="Enter public key" class="form-control">
               <button (click)="SendAddButton()" class="btn btn-default">Send</button>
               <!--<button (click)="onClearState()" class="btn btn-default">Clear</button>-->
             </div>
    <div class = "graph">
    <svg width="1100" height="400"></svg>
    </div>
    </div>
  `,
  providers:[ExplorerAgentService]

})
export class D3forceGraphComponent implements OnInit, OnDestroy{

  @ViewChild("containerD3forceGraph") element: ElementRef;
  root:string;
  name:string;
  svg;
  color;
  simulation;
  link;
  node;
  addrData = {
    nodes: [],
    links: []
  };
  drawData;
  searchArr = [];


  constructor(private explorerAgentService:ExplorerAgentService) {
    this.name = 'Etherscan';

  }

  ngOnInit(){
    // console.log("!!!on init!!");
    // this.addrData.nodes= temp_data.nodes;
    // this.addrData.links= temp_data.links;
    // console.log(JSON.stringify(this.addrData));
    // this.drawData = this.addrData;
    //this.draw(this.drawData);

    // this.explorerAgentService.$data.subscribe(data => {
    //
    //     this.drawData = data;
    //
    //   });

  }
  private onClearState(){
    this.searchArr = [];
    this.explorerAgentService.clearData();
  }

  private SendAddButton(){

    if (this.root != null) {
      //
      // this.addrData = {
      //   nodes: [],
      //   links: []
      // };

      //TODO - count the search address type for the chart in Home Page
      this.sendAddres(this.root);
    }
  }


  ngAfterViewInit(){

    this.explorerAgentService.getTransactions().subscribe(newData=>{
      console.log("new Data: "+ JSON.stringify(newData));
      //////////////////////temp
      this.explorerAgentService.addDAddrData(temp_data);
      //////////////////////////
      //TODO- update the service with the new data
      //this.explorerAgentService.addDAddrData(newData);


    });
    this.explorerAgentService.$data.subscribe(data => {
      this.clearState();
      this.drawData = data;
      console.log("data before draw : "+ JSON.stringify(data));
      if(data.links.length!=0){
      this.draw(data);
      }
      else{alert ("Start");}
    });

  }

  addData(): void {
    let newData = {
      nodes: this.drawData.nodes,
      links: this.drawData.links
    } as IData;

    this.explorerAgentService.addDAddrData(newData);
  }




  private sendAddres(addres){

  alert(addres);
  if(this.searchArr.indexOf(addres.toLowerCase())<0) {
    this.searchArr.push(addres.toLowerCase());
    this.explorerAgentService.sendAddress(addres);
  }
  else {alert("Exist!");}

}

  private clearState(){

    d3.select('.graph').select('svg').remove();
    console.log("clear state");

    //this.data.nodes = [];
    //this.data.links = [];
    this.link = null;
    this.node  = null;
    this.simulation = null;
    this.svg = null;
    this.hideTooltip();
    this.drawData = null;


   }
  private updateData(){
    //return test data
    var newData = this.explorerAgentService.getTestTransactions();
    //console.log("new data: " + JSON.stringify(newData));

    this.clearState();
    // this.addrData.nodes.push(newData.nodes[0]);
    // this.addrData.nodes.push(newData.nodes[1]);
    // this.addrData.nodes.push(newData.nodes[2]);
    // alert("new node:" + newData.nodes[0]);
    // this.addrData.links.push(newData.links[0]);
    // this.addrData.links.push(newData.links[1]);
    // alert("new link:" + newData.links[0]);



    this.drawData = this.addrData;
    // this.drawData.node.shift();
    // this.drawData.links.shift();
    //this.draw(newData);

    //
    // var uptadedNodes =new Array (new Set(this.data.nodes.concat(newData.nodes)));
    // var uptadedLinks =new Array (new Set(this.data.links.concat(newData.links)));
    // console.log("uptadedNodes: "+ JSON.stringify(uptadedNodes));
    // console.log("uptadedLinks: "+ JSON.stringify(uptadedLinks));

    //this.draw();

  }



  private draw(data){

    d3.select('.graph').append('svg').attr("width", 1100).attr("height", 400);

    this.svg = d3.select("svg");
    var width = +this.svg.attr("width");
    var height = +this.svg.attr("height");

    this.color = d3.scaleOrdinal(d3.schemeCategory20);

    this.simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function(d) { return d['id']; }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));


    this.render(data);
  }



  private ticked() {

      this.link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
      this.node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

  }

  private render(graph){
    console.log("render");
    this.link = this.svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(graph.links)
      .enter().append("line")
      .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

    this.node = this.svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(graph.nodes)
      .enter().append("circle")
      .attr("r", 5)
      .attr("fill", (d)=> { return this.color(d.group); })
      .call(d3.drag()
        .on("start", (d)=>{return this.dragstarted(d)})
        .on("drag", (d)=>{return this.dragged(d)})
        .on("end", (d)=>{return this.dragended(d)}))
  .on("mouseover", (d)=>{
      this.showTooltip(d);
    })
      .on("mouseout", (d)=> {
        this.hideTooltip();
      })
      .on("click",(d)=>{
        this.sendAddres(d.address);
      });

    this.node.append("title")
      .text(function(d) { return d.id; });

    this.simulation
      .nodes(graph.nodes)
      .on("tick", ()=>{return this.ticked()});

    this.simulation.force("link")
      .links(graph.links);
  }

  private dragged(d) {

    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  private dragended(d) {

    if (!d3.event.active) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  private dragstarted(d) {

    if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }



  private showTooltip(d) {
    var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
    tooltip.transition()
      .duration(200)
      .style("opacity", .9);
    tooltip	.html("Address: " + d.address + "<br/>"  + "Type: " + d.type +"</br>"+ "Ether: " + d.ether + "<br/>"+ "OutTX: " + d.outTX + "<br/>"+ "Valid Address: " + d.is_valid_address + "<br/>")
      .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY - 28) + "px");
  }
  private hideTooltip() {
    d3.selectAll('div.tooltip')
      .remove()

  }



  ngOnDestroy(){

  }
}

