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

  constructor(private entitiesService: EntitiesService) { this.filterName= "Filter By"; this.groupByNum=1 }

  ngOnInit() {
    this.getEntities();
  }

  getEntities() {
    this.entitiesService.getEntitiesFromData().subscribe(newdata => {
      this.entities = newdata;
    })
  }

  searchEntities() {
    this.entitiesService.getSearchedEntity({params:this.searchEntity,text: this.searchText});
  }

  groupByEntities(){
    this.entitiesService.getGroupByEntity({flag:this.groupByNum, group_type: this.groupByhEntity});
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
        this.filterName = "Filte By";
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
    if(this.entities.length) {
      this.newEntity = {};
    }
    this.entityForm = true;
    this.isNewForm = true;
  }

  saveEntity(entity) {
    if(this.isNewForm) {
      // add a new entity
      this.entitiesService.addEntity(entity);
    }
    this.entityForm = false;
  }

  removeEntity(entity) {
    this.entitiesService.deleteEntity(entity);
  }

  updateEntity() {
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
