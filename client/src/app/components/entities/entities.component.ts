import { Component, OnInit } from '@angular/core';
import { EntitiesService } from '../../services/entities.service';
//import { Entity } from './entities';
import { clone } from 'lodash';
import {text} from "@angular/core/src/render3/instructions";

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.css'],
  providers: [EntitiesService]
})
export class EntitiesComponent implements OnInit {

  entities;
  groupby_entities;
  entityForm: boolean = false;
  editEntityForm: boolean = false;
  isNewForm: boolean;
  newEntity: any = {};
  editedEntity: any = {};
  searchEntity: any={};
  groupByhEntity:any={};
  searchText:string;
  filterName :string;
  groupByNum;

  constructor(private entitiesService: EntitiesService) { this.filterName= "Filter By"; this.groupByNum=null; }

  ngOnInit() {
    this.getEntities();
    this.groupByhEntity.good = "good";
    this.searchEntity.good = "good";
  }

  getEntities() {
    this.entitiesService.getEntitiesFromData().subscribe(newdata => {
      this.entities = newdata;
    })
  }

  searchEntities() {
    // if(!this.searchEntity.interesting){
    //   alert("Interesting empty");
    // }
    if(!this.searchText){
      alert("Search Text empty");
    }
     else this.entitiesService.getSearchedEntity({params:this.searchEntity,text: this.searchText});
  }

  groupByEntities(){
    // if(!this.groupByhEntity.interesting){
    //   alert("Interesting empty");
    // }
    // else if(!this.groupByhEntity.type){
    //   alert("Type empty");
    // }
    if (this.filterName ==="Filter By"){
      alert("Choose filter by");
    }
    else this.entitiesService.getGroupByEntity({flag:this.groupByNum, group_type: this.groupByhEntity});
  }
  groupBy(num){
    this.groupByNum= num;
    switch (num){
      case 1:this.filterName = "Good";
      break;
      case 2:this.filterName = "Interesting";
        break;
      case 3:this.filterName = "Type";
        break;
      default:
        this.filterName = "Filter By";
    }
  }

  showEditEntityForm(entity) {
    if(!entity) {
      this.entityForm = false;
      return;
    }
    this.editEntityForm = true;
    this.editedEntity = clone(entity);
  }

  showAddEntityForm() {
    // resets form if edited entity
    if(this.entities) {
      if(this.entities.length) {
        this.newEntity = {};
      }
    }
    this.entityForm = true;
    this.isNewForm = true;
  }

  saveEntity(entity) {
    if(this.isNewForm) {
      // add a new entity
      if(entity.good==null){
        entity.good=false;
      }
      this.entitiesService.addEntity(entity);
    }
    this.entityForm = false;
  }

  removeEntity(entity) {
    this.entitiesService.deleteEntity(entity);
  }

  updateEntity() {
    if(this.editedEntity.good==null){
      this.editedEntity.good=false;
    }
    this.entitiesService.updateEntity(this.editedEntity);
    this.editEntityForm = false;
    this.editedEntity = {};
  }

  cancelNewEntity() {
    this.newEntity = {};
    this.entityForm = false;
  }

  cancelEdits() {
    this.editedEntity = {};
    this.editEntityForm = false;
  }
}
