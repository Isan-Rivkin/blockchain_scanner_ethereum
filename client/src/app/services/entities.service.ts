
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
    this.socket.emit('list_entity');
  }

  getEntitiesFromData() {

    //get list
    let observable = new Observable(observer => {
      this.socket.on('db_ack',(status)=>{
        console.log(status.msg);
      })
      this.socket.on('search_entity_post',(list_entity) => {
        observer.next(list_entity);
      })
      this.socket.on('group_by_entity_post',(list_entity) => {
        observer.next(list_entity);
      })
      this.socket.on('list_entity_post', (list_entity) => {
        observer.next(list_entity);
      })
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;

  }


  addEntity(entity: Entity) {
    this.socket.emit('add_entity', entity);
    //this.eItems.push(entity);
    //console.log(this.eItems);
    this.socket.emit('list_entity');
  }

  updateEntity(entity: Entity) {
    this.socket.emit('edit_entity', entity);
    this.socket.emit('list_entity');
    // let index = findIndex(this.eItems, (e: Entity) => {
    //   return e.address === entity.address;
    // });
    // this.eItems[index] = entity;
  }

  deleteEntity(entity: Entity) {
    this.socket.emit('delete_entity', entity);
    this.socket.emit('list_entity');

  }


  getSearchedEntity(entity){

    console.log("SearchedEntity: " + JSON.stringify(entity));
    this.socket.emit('search_entity', entity);
  }

  getGroupByEntity(query){
    console.log("GroupByEntity: " + JSON.stringify(query  ));
    this.socket.emit('group_by_entity', query);

  }



}
