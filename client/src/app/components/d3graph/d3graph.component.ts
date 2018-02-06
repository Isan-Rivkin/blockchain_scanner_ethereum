//our root app component
import {Component, NgModule, OnInit, AfterViewInit, OnDestroy, ViewEncapsulation,} from '@angular/core'
import {ExplorerAgentService} from '../../services/explorer-agent.service'
import {test_data} from './test_data'
import * as d3 from './D3config';


@Component({
  selector: 'app-d3graph',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./d3graph.component.css'],
  template: `
    <div>
      <h2>{{name}}</h2>
    </div>
    <svg width="960" height="600"></svg>
  `,
  providers: [ExplorerAgentService],


})
export class D3graphComponent implements OnInit, AfterViewInit, OnDestroy {
  name:string;
  svg;
  color;
  simulation;
  link;
  node;
  data;
  connection;
  constructor(private  explorerAgentService:ExplorerAgentService) {
    this.name = 'Etherscan'

  }

  ngOnInit() {
    // this.connection= this.explorerAgentService.getData().subscribe(data => {
    //   this.data =data;
    // })
    //this.connection = this.explorerAgentService.test();
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }



  private showTooltip(d) {
    var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
    tooltip.transition()
        .duration(200)
        .style("opacity", .9);
    tooltip	.html("Address: " + d.address + "<br/>"  + "Type: " + d.type +"</br>"+ "Balance: " + d.balance + "<br/>")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
    }

  private hideTooltip() {
    d3.selectAll('div.tooltip')
      .remove()

  }

  private updateData(newData){

    let newNode = newData.nodes;
    let newLink = newData.links;
    console.log("new nodes :" + newNode);
    console.log("new links :" + newLink);

  }
  private sendAddres(addres){
    console.log("addr: "+ addres);
    let newData =this.explorerAgentService.getTransactions(addres);
    //this.updateData(newData);

  }

  ngAfterViewInit(){

    this.svg = d3.select("svg");

    var width = +this.svg.attr("width");
    var height = +this.svg.attr("height");

    this.color = d3.scaleOrdinal(d3.schemeCategory20);
    this.simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id((d)=> { return d['id']; }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    this.render(test_data);
  }

  ticked() {
    this.link
      .attr("x1", (d) =>{ return d.source.x; })
      .attr("y1", (d) => { return d.source.y; })
      .attr("x2", (d) => { return d.target.x; })
      .attr("y2", (d) =>{ return d.target.y; });

    this.node
      .attr("cx", (d) =>{ return d.x; })
      .attr("cy", (d)=> { return d.y; })
      .on("mouseover", (d)=>{
        this.showTooltip(d);
      })
      .on("mouseout", (d)=> {
        this.hideTooltip();
      })
      .on("click",(d)=>{
        this.sendAddres(d.address);
      });


  }


  render(graph){
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
        .on("end", (d)=>{return this.dragended(d)}));



    this.node.append("title")
      .text((d)=> { return d.id; });

    this.simulation
      .nodes(graph.nodes)
      .on("tick", ()=>{return this.ticked()});

    this.simulation.force("link")
      .links(graph.links);
  }

  dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  dragended(d) {
    if (!d3.event.active) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  dragstarted(d) {
    if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }


}
