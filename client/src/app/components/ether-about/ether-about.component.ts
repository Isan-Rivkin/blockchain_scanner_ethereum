import { Component} from '@angular/core';



class Article {
  title: string;
  html: string;

}

@Component({
  selector: 'app-ether-about',
  templateUrl:'./ether-about.component.html',
  styleUrls: ['./ether-about.component.css']
})


export class EtherAboutComponent  {
  flag:boolean;

  constructor( ) {
    this.flag =true;
  }

  displayPost(){
    this.flag = !this.flag;
    this.getDisplayEther();
    this.getDisplayBit();

  }

  getDisplayEther(){
     return this.flag? "" : "none";
  }
  getDisplayBit(){
    return this.flag? "none" : "";
  }

}
