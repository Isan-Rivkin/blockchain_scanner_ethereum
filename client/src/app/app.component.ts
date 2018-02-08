import { Component } from '@angular/core';
import {HomeService} from "./services/home.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HomeService],
})
export class AppComponent {
  title = 'app works!';

}
