
import { Injectable } from '@angular/core';
import { Entity } from '../components/entities/entities';
import { ENTETY_ITEMS } from '../components/entities/entity-data';
import { findIndex } from 'lodash';

import 'rxjs/add/operator/map'
//import {test_data} from '../components/d3graph/test_data'
import {url} from './config'

import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';



@Injectable()
export class EntitiesService {


  private url = url;
  private socket;

  private eItems = ENTETY_ITEMS;

  constructor(){
    this.socket = io(this.url);
  }

  getEntitiesFromData() {

    this.socket.emit('list_entity');
    this.socket.on("list_entity_post",(list_entity)=>{
      console.log(list_entity);
      return list_entity;
    })



  }

  addEntity(entity: Entity) {
    this.socket.emit('add_entity', entity);
    this.eItems.push(entity);
    console.log(this.eItems);
  }

  updateEntity(entity: Entity) {
    this.socket.on()
    let index = findIndex(this.eItems, (e: Entity) => {
      return e.address === entity.address;
    });
    this.eItems[index] = entity;
  }

  deleteEntity(entity: Entity) {
    this.eItems.splice(this.eItems.indexOf(entity), 1);
    console.log(this.eItems);
  }

  getSearchedEntity(entity, searchText){
    console.log(JSON.stringify(entity)+" "+searchText);
    return this.eItems;
  }

}
