import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { RouterModule, Routes } from '@angular/router';
// import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsersComponent } from './components/users/users.component';
import { D3graphComponent } from './components/d3graph/d3graph.component';



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

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
