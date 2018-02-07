//our root app component
'use strict';
import {Component, NgModule, OnInit, AfterViewInit, OnDestroy, ViewEncapsulation,} from '@angular/core'
import {ExplorerAgentService} from '../../services/explorer-agent.service'
//import {test_data} from './test_data'
import {test_data2} from './test_data_2'
import * as d3 from './D3config';



@Component({
  selector: 'app-d3graph',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./d3graph.component.css'],
  template: `
    <div>
      <h2>{{name}}</h2>
    </div>
    
      <div class="address-group">
        <label for="str">Address:</label>
        <input id = "str" [(ngModel)]="root"  placeholder="Enter public key" class="form-control">
        <button (click)="SendAddButton()" class="btn btn-default">Send</button>
      </div>
     
    <svg [attr.width]="960" [attr.height]="600"></svg>
  `,
  providers: [ExplorerAgentService],


})
export class D3graphComponent implements OnInit, OnDestroy {
  name:string;
  root:string;
  svg;
  color;
  simulation;
  link;
  node;
  width = 960;
  height = 600;
  data  = {
    nodes: [],
    edges: []
};
  nodeMap = new Map();
  searchArr =[];
  seen =[];
  ids;
  connection;

  constructor(private  explorerAgentService:ExplorerAgentService) {
    this.name = 'Etherscan';
    this.ids=1;
  }

  ngOnInit() {
    // console.log("on init "+ typeof (test_data2));
    // this.updateData(test_data2);
    this.connection = this.explorerAgentService.getTransactions().subscribe(newdata => {
      console.log("new data: "+ typeof (newdata));
      this.updateData(newdata);
    })
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  private SendAddButton(){

    if (this.root != null) {

      this.data = {
        nodes: [],
        edges: []
      };
      this.sendAddres(this.root);
    }
  }
  private toGraph(data){
    var nodes = data.nodes;
    var edges = data.edges;
    var final_edges = [];
    for(var i=0;i<nodes.length;i++){
      this.seen.push({address:nodes[i].address, id: this.ids});
      nodes[i].id= this.ids;
      this.ids++;
    }
    for(var i=0;i<edges.length;i++){
        var from_res =this.isSeen(edges[i].from,this.seen);
        var to_res = this.isSeen(edges[i].to,this.seen);
        if(from_res.s){
          edges[i].source = from_res.id;
        }
        if(to_res.s){
          edges[i].target = to_res.id;
        }
        if(to_res.s && from_res.s) { // valid from and to addresses

          if (edges[i].value < 1) {
            edges[i].value = 1;
          }
          if (edges[i].value > 25) {
            edges[i].value = 25;
          }
          final_edges.push(edges[i]);
        }
        // }else if(!to_res.s && from_res.s){
        //   nodes.push({value:1,address: edges[i].to,id:this.ids,type:"_uUser"});
        //   this.seen.push({address:edges[i].to, id: this.ids});
        //   this.ids++;
        //   final_edges.push(edges[i]);
        // }else if(!from_res.s && to_res.s){
        //   nodes.push({value:1,address: edges[i].from,id:this.ids,type:"_uUser"});
        //   this.seen.push({address:edges[i].from, id: this.ids});
        //   this.ids++;
        //   final_edges.push(edges[i]);
        // }else{
        //   nodes.push({value:1,address: edges[i].from,id:this.ids,type:"_uUser"});
        //   this.seen.push({address:edges[i].to, id: this.ids});
        //   this.ids++;
        //   nodes.push({value:1,address: edges[i].to,id:this.ids,type:"_uUser"});
        //   this.seen.push({address:edges[i].from, id: this.ids});
        //   this.ids++;
        //   final_edges.push(edges[i]);
        // }
    }
    return {nodes:nodes, edges:final_edges};
  }
  private isSeen(address,seenList){
    for(var i=0;i<seenList.length;i++){
      if(seenList[i].address.toLowerCase() ==address.toLowerCase()){
        return {s:true,id:seenList[i].id};
      }
    }
    return {s:false,id:null};
  }
  private attachID(setData){
    setData.nodes.forEach(node=>{
      node.address =node.address.toLowerCase();
      if(this.nodeMap.has(node.address)){

      }else{
          this.nodeMap.set(node.address,this.ids);
          node.id = this.ids;
          this.ids++;
          this.data.nodes.push(node);
      }
    });
      console.log("data: "+ this.data);
  }
  private setIDLinks(setData){

    setData.edges.forEach(edge=>{
      let fromid =this.nodeMap.get(edge.from);
      let toid =this.nodeMap.get(edge.to);
      // console.log("THE VAL : " + toid + " THE TYPE " + typeof(toid+""));
      // console.log(fromid +" "+toid);
      edge.source = fromid;//this.nodeMap.get(edge.from);
      edge.target = toid;//this.nodeMap.get(edge.to);
      // console.log("###local###");
      // console.log(edge);
      this.data.edges.push(edge);
    });

      console.log(this.data);


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

  private updateData(newData){
    var the_graph = this.toGraph(newData);
    this.data =  the_graph;
    this.data.nodes= this.data.nodes.concat(the_graph.nodes);
    this.data.edges = this.data.edges.concat(the_graph.edges);
    this.draw_graph(the_graph);
    //
   // this.attachID(newData);
   //  this.setIDLinks(newData);
   //
   //  console.log(this.data);
    //this.draw();
    // let newNode = newData.nodes;
    // let newLink = newData.links;
    // console.log("new nodes :" + newNode);
    // console.log("new links :" + newLink);
  }

  private sendAddres(addres){

    if(this.searchArr.indexOf(addres.toLowerCase())<0) {
      this.searchArr.push(addres.toLowerCase());
      this.explorerAgentService.sendAddress(addres);

      // this.explorerAgentService.getTransactions().subscribe(newdata => {
      //   console.log("nodes: " + newdata['nodes']);
      //   console.log("edges: " + newdata['edges']);
      //
      //   this.updateData(newdata);
      //
      // });


    }

  }
  // ngAfterViewInit(){
  //   console.log("ngAfterViewInit");
  //   if(this.data.edges.length>0){
  //   this.svg = d3.select("svg");
  //
  //    this.width = this.svg.attr("width");
  //    this.height = this.svg.attr("height");
  //
  //   this.color = d3.scaleOrdinal(d3.schemeCategory20);
  //   this.simulation = d3.forceSimulation()
  //     .force("link", d3.forceLink().id((d)=> { return d['id']; }))
  //     .force("charge", d3.forceManyBody())
  //     .force("center", d3.forceCenter(this.width / 2, this.height / 2));
  //
  //   this.render(this.data);
  // }
  // }

  draw(){
    d3.select("svg").selectAll('g').remove();
    this.svg = d3.select("svg");
    this.color = d3.scaleOrdinal(d3.schemeCategory20);
    this.simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id((d)=> { return d['id']; }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(this.width / 2, this.height / 2));
    this.render(this.data);
  }
  draw_graph(graph){
    d3.select("svg").selectAll('g').remove();
    this.svg = d3.select("svg");
    this.color = d3.scaleOrdinal(d3.schemeCategory20);
    this.simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id((d)=> { return d['id']; }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(this.width / 2, this.height / 2));
    this.render(graph);
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
    // for(var i=0;i<graph.edges.length;++i){
    //   console.log("---------");
    //   console.log("current edge: " + JSON.stringify(graph.edges[i]));
    //   console.log("---------");

    //}
    this.link = this.svg.append("g")
      .attr("class", "edges")
      .selectAll("line")
      .data(graph.edges)
      .enter().append("line")
      .attr("stroke-width", function(d) { if(d.value<1){return 1} else {return Math.sqrt(d.value); }});

    this.node = this.svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(graph.nodes)
      .enter().append("circle")
      .attr("r", 5)
      .attr("fill", (d)=> { return this.color(d.type); })
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
      .links(graph.edges);
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
