//our root app component
import {Component, NgModule, OnInit, AfterViewInit, OnDestroy ,ViewEncapsulation} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {temp_data} from './test_data'
import * as d3 from './D3config'
import {ExplorerAgentService} from '../../services/explorer-agent.service'

@Component({
  selector: 'app-d3-force-graph',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./d3force-graph.component.css'],
  template: `
    <div>
      <h2>Hello {{name}}</h2>
    </div>
    <svg width="960" height="600"></svg>
  `,
  providers:[ExplorerAgentService]

})
export class D3forceGraphComponent implements OnInit, OnDestroy{
  name:string;
  svg;
  color;
  simulation;
  link;
  node;
  data = {
    nodes: [],
    links: []
  };

  constructor(private explorerAgentService:ExplorerAgentService) {
    this.name = 'Etherscan'
  }

  ngOnInit(){

    this.data.nodes= temp_data.nodes;
    this.data.links= temp_data.links;
    console.log(this.data);
    this.draw();

  }

  private sendAddres(addres){

    alert(addres)
    // if(this.searchArr.indexOf(addres.toLowerCase())<0) {
    //   this.searchArr.push(addres.toLowerCase());
    //   this.explorerAgentService.sendAddress(addres);
    // }
    this.updateData();

  }
  private updateData(){
    var newData = this.explorerAgentService.getTestTransactions();
    console.log("new data: " + JSON.stringify(newData));
    var uptadedNodes =new Array (new Set(this.data.nodes.concat(newData.nodes)));
    var uptadedLinks =new Array (new Set(this.data.links.concat(newData.links)));

    console.log("uptadedNodes: "+ JSON.stringify(uptadedNodes));
    console.log("uptadedLinks: "+ JSON.stringify(uptadedLinks));

    //this.draw();

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


  draw(){

    this.svg = d3.select("svg");
    d3.select("svg").selectAll('g').remove();

    var width = +this.svg.attr("width");
    var height = +this.svg.attr("height");

    this.color = d3.scaleOrdinal(d3.schemeCategory20);

    this.simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function(d) { console.log(d['id']) ;return d['id']; }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    this.render(this.data);
  }



  ticked() {
    this.link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

    this.node
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
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

  ngOnDestroy(){

  }
}

