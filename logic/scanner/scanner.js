
API_KEY = '9EVWVAFQNS1UWXAAMTXSTHY599GYPAD4T1';
var explorer = require('../etherscan/explore')
var ExplorerUtils = require("./utils");
var urlBuilder = new explorer.URLBuilder();
var accountExplorer = new explorer.AccountExplorer(urlBuilder,API_KEY);
var txExplorer = new explorer.TransactionExplorer(urlBuilder,API_KEY);
var contractExplorer = new explorer.ContractExplorer(urlBuilder,API_KEY);
var entityDefiner = new explorer.EntityDefiner(accountExplorer,txExplorer,contractExplorer);
var utils = new ExplorerUtils.ExplorerUtils();
/*
*   this module is reponsible for iterating the web and retrieving addresses
*   using a subset of predfined params such as depth of the tree etc.
*   the definition of which entities to keep exploring will be used via the Explorer Module from ./etherscan
*   while iterating and building a graph the module emit's all the data it finds to external module (Client)
*   Meaning, the results come as a stream
*/

// var options = {
//     base_address:['0x0607B0c8cF73D916b3EF1463bb6fB9f19e9D5D98'],
//     depth : 2,
//     k_tx : 2,
//     val: 0.5,
//     not_before: null,
//     in_tx : true,
//     out_tx:false,
// };



// entity {address:,ether:,type:,father:,out_txns: ,in_txns:}
class Scanner{
    constructor(MAX_DEPTH,max_page,max_page_result){
        this.entityDefiner =new explorer.EntityDefiner(accountExplorer,txExplorer,contractExplorer);
        this.max_page = max_page;
        this.max_page_result = max_page_result;
        this.CURRENT_DEPTH = 0;
        this.MAX_DEPTH =MAX_DEPTH;
    }
    async one_account_scan(params,propagate){
        this.entityDefiner.identify(params.address,(entity)=>{
            if(entity.type != null){ // is entity
                this.entityDefiner.transaction().explore_txs_from_addr_paginated(entity.address,
                    1,this.max_page_result,utils.map_txns,(txs_map)=>{
                        if(!txs_map.empty){
                            entity.out_tx = txs_map.out.length;
                            entity.in_tx = txs_map.in.length;
                            propagate({entity: entity, txns:txs_map});
                        }else{
                            propagate({entity: null});
                        }
                    });
            }else{ // not valid address
                propagate({entity: null});
            }
        });
    }
    async identify_all(addrs,propagate){
        var entities = [];
        var counter = 0;
        var finish = addrs.length;
        addrs.forEach(addr=>{
            this.entityDefiner.identify(addr,(entity)=>{
                counter++;
                if(entity.type != null) { // is entity
                    entities.push(entity);
                }
                if(counter >=finish ){
                    propagate(entities);
                }
            });
        })
    }
    one_level_graph(params,callback){
        this.one_account_scan({address:params.address},(one_level)=>{
            var entitiy = one_level.entity;
            var _in = one_level.txns.in;
            var _out = one_level.txns.out;
            var out_addrs =utils.getAddrsFromTXS(_out,"to"); //to / from
            var nodes = [];
            nodes.push(entitiy);
            this.identify_all(out_addrs,(entities)=>{
                entities.forEach(e=>{
                    nodes.push(e);
                    console.log(e.type);
                });
                callback(nodes,_out);
            });
        });
    }
}


/* exports */
module.exports.Scanner = Scanner;
