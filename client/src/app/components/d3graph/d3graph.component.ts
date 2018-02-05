import { Component, OnInit } from '@angular/core';
import {ExplorerAgentService} from '../../services/explorer-agent.service'

@Component({
  selector: 'app-d3graph',
  templateUrl: './d3graph.component.html',
  styleUrls: ['./d3graph.component.css']
})
export class D3graphComponent implements OnInit {

  constructor(private exploreAgentService:ExplorerAgentService) {
  }

  ngOnInit() {
  }

}
