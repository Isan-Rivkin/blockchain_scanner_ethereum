const constants = require('../constants');
var mongo = require('./mongo_api');
var known ={
    "Poloniex Wallet":"0x32Be343B94f860124dC4fEe278FDCBD38C102D88",
    "Poloniex ColdWallet":"0xb794F5eA0ba39494cE839613fffBA74279579268",
    "EtherMine":"0xea674fdde714fd979de3edf0f56aa9716b898ec8",
    "Kraken_3":"0xe853c56864a2ebe4576a807d26fdc4a0ada51919",
    "EthDev":"0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe",
    "Bittrex" : "0xFBb1b73C4f0BDa4f67dcA266ce6Ef42f520fBB98"
    };

var bad ={
    "etherdelta_2":"0x8d12A197cB00D4747a1fe03395095ce2A5CC6819"
    };



// add known entities script :

//, { $set: { type : entity.type, comment : entity.comment, good : entity.good , interesting : entity.interesting}
// var entities = [{address:known['Bittrex'],type:constants.ENTITIES.exchange,comment:'Bittrex',good:true,interesting:3},
//     {address:known['EtherMine'],type:constants.ENTITIES.miner,comment:'EtherMine',good:true,interesting:2},
//     {address:bad['etherdelta_2'],type:constants.ENTITIES.exchange,comment:'etherdelta_2',good:true,interesting:2}];
// mongo.insert_entities(entities,(result)=>{
//     console.log("inserted! ",result);
// });


// list entities
// mongo.list_entity((entities)=>{
//     console.log(entities);
// })

// update entity , good:false
// let updated = {address:bad['etherdelta_2'],type:constants.ENTITIES.exchange,comment:'etherdelta_2',good:false,interesting:2}
// mongo.update_entity(updated,(result)=>{
//     console.log(result);
// });

//delete entity
// let toDelete = {address:'0x0'};
// mongo.remove_entity(toDelete,(result)=>{
//     console.log(result);
// });

