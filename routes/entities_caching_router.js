var express = require('express');
var router = express.Router();
var path = require('path');
var Scanner = require('../logic/scanner/scanner');
var ExplorerUtils = require("../logic/scanner/utils");
var utils = new ExplorerUtils.ExplorerUtils();
var io = null;
var scanner = new Scanner.Scanner(10,1,500);
var db = require('../logic/data/mongo_api');

module.exports = router;
module.exports = {
    router:router,
    setIO: function(iop){
        io = iop;
        io.on('connection',function(socket){
            socket.on('add_entity', function(entity){
                // add entity to db
                scanner.is_valid_eth_account(entity.address,(valid)=>{
                    if(valid){
                        db.insert_entities(entity,(result)=>{
                            socket.emit('add_entity',{status:'1', msg:'success'});
                        });
                    }else{

                    }
                })
            });
            socket.on('list_entity',function(){
                // get all entitites

            });
            socket.on('edit-entity',function(entity){
                // edit entity
                // save to db
            });
            socket.on('delete-entity',function(entity){

            });
            socket.on('search-entity',function(query){

            });
            socket.on('group-by-entity',function(query){

            });
        });
    }
}



