import { Component, OnInit ,Input,NgModuleRef,Compiler,Injector,NgModule,ViewChild,ViewContainerRef} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";


class Article {
  title: string;
  html: string;
}

@Component({
  selector: 'app-ether-about',
  templateUrl:'./ether-about.component2.html',
  styleUrls: ['./ether-about.component.css']
})


export class EtherAboutComponent  {

  urlId;

  constructor(private route: ActivatedRoute ) {

  }
  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        console.log(params);
        this.urlId = params;
      })
  }


}
