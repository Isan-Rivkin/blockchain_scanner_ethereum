import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
 import { AgmCoreModule ,} from '@agm/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsersComponent } from './components/users/users.component';
import { D3graphComponent } from './components/d3graph/d3graph.component';
import { MinerMapComponent } from './components/miner-map/miner-map.component';
import {EntitiesComponent} from'./components/entities/entities.component';
import {HomeComponent} from'./components/home/home.component';
import {HttpClientModule} from "@angular/common/http";


// const appRoutes: Routes = [
//   { path: 'Explorer', component: D3graphComponent },
//   { path: '', component: AppComponent },
// ];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsersComponent,
    D3graphComponent,
    MinerMapComponent,
    EntitiesComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyAG4nbsb-WGDISnQRgUqOShJbvzYgWzz_o'
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
