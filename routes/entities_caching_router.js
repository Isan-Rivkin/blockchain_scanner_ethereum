var express = require('express');
var router = express.Router();
var path = require('path');
var Scanner = require('../logic/scanner/scanner');
var ExplorerUtils = require("../logic/scanner/utils");
var utils = new ExplorerUtils.ExplorerUtils();
var io = null;
var scanner = new Scanner.Scanner(10,1,500);
var db = require('../logic/data/mongo_api');
var twitter = require('../logic/twitter/twitter_api');


// {address:known['EtherMine'],type:constants.ENTITIES.miner,comment:'EtherMine',good:true,interesting:2},
function constructTweet(entity){
    var openning = "New Entity: ";
    openning = openning + ' address: ' + entity.address + ' type: ' + entity.type;
    return openning;
}
module.exports = router;
module.exports = {
    router:router,
    setIO: function(iop){
        io = iop;
        io.on('connection',function(socket){
            socket.on('add_entity', function(entity){
                console.log("##########");
                console.log(entity);
                console.log("##########");
                // add entity to db
                scanner.is_valid_eth_account(entity.address,(valid)=>{
                    if(valid){
                        db.insert_entities([entity],(result)=>{
                            socket.emit('add_entity',{status:1, msg:'success'});
                            db.list_entity(entities=>{
                                socket.emit('list_entity_post',entities);
                            });
                            twitter.tweet(constructTweet(entity),(tweet,response)=>{console.log('posted tweet')});
                        });
                    }else{
                        socket.emit('db_ack',{status:0, msg:'failure adding entity to db'});
                    }
                })
            });
            socket.on('list_entity',function(){
                db.list_entity(entities=>{
                    socket.emit('list_entity_post',entities);
                });
            });
            socket.on('edit_entity',function(entity){
                // edit entity
                db.update_entity(entity,(result)=>{
                    socket.emit('db_ack',{status:1, msg:'updated entity'});
                    db.list_entity(entities=>{
                        socket.emit('list_entity_post',entities);
                    });
                });
            });
            socket.on('delete_entity',function(entity){
                db.remove_entity(entity,(result)=>{
                    socket.emit('db_ack',{status:1, msg:'removed entity'});
                    db.list_entity(entities=>{
                        socket.emit('list_entity_post',entities);
                    });
                })
            });
            socket.on('search_entity',function(query){
                //{params:this.searchEntity,text: this.searchText}

                db.query_entities({
                    type:query.params,
                    comment : query.text
                },(entities)=>{
                    socket.emit('search_entity_post',entities);
                });
            });
            socket.on('group_by_entity',function(query){
                db.group_by_good_aggregate(query,entities=>{
                    socket.emit('group_by_entity_post',entities);
                });
            });
        });
    }
}



