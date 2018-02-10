import {D3forceGraphComponent} from "../d3force-graph/d3force-graph.component";
import {HomeComponent} from "../home/home.component";
import {Routes} from "@angular/router";
import {MinerMapComponent} from "../miner-map/miner-map.component";

/**
 * Created by Tomer on 10/02/2018.
 */
export const routerConfig: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'explorer',
    component: D3forceGraphComponent
  },
  {
    path: 'map',
    component: MinerMapComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
