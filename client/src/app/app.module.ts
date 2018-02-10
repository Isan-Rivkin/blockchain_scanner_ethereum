import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
 import { AgmCoreModule ,} from '@agm/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsersComponent } from './components/users/users.component';
import { MinerMapComponent } from './components/miner-map/miner-map.component';

import {EntitiesComponent} from'./components/entities/entities.component';
import {HomeComponent} from'./components/home/home.component';
import {HttpClientModule} from "@angular/common/http";

import {D3forceGraphComponent} from './components/d3force-graph/d3force-graph.component'
import {CanvasLogoComponent} from './components/canvas-logo/canvas-logo.component'
import {FooterComponent} from './components/footer/footer.component'

import {routerConfig} from './components/navbar/top-menu.config'


// const appRoutes: Routes = [
//   { path: 'Explorer', component: D3graphComponent },
//   { path: '', component: AppComponent },
// ];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsersComponent,

    MinerMapComponent,
    EntitiesComponent,

    HomeComponent,

    D3forceGraphComponent,
    CanvasLogoComponent,
    FooterComponent,



  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyAG4nbsb-WGDISnQRgUqOShJbvzYgWzz_o'
    }),
    RouterModule.forRoot(routerConfig, {useHash:true})

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
