import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {routerConfig} from './top-menu.config'

import {D3forceGraphComponent} from "../d3force-graph/d3force-graph.component";
import {HomeComponent} from "../home/home.component";
import {Routes} from "@angular/router";
import {MinerMapComponent} from "../miner-map/miner-map.component";
import {componentFactoryName} from "@angular/compiler";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  routerLink: string;
  constructor(private router: Router) { }


  goHome() {

    this.router.navigate(['home']);

  }

  goMap() {
    this.router.navigate(['map']);
  }

  goExplorer() {
    this.router.navigate(['explorer']);
  }
  //TODO
  // goAbout() {
  //   this.router.navigate(routerConfig);
  // }
  ngOnInit() {
  }


}
