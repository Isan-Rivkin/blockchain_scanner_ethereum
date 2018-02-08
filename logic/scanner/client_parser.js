const utils = require('./utils');
const entities_map={
    'user' :1,
    'distribuer':2,
    "erc20":3 ,
    "contract_non_erc":4,
    'miner':5,
    'exchange':6,
    'uUser':7
};
class ClientParser{
    constructor(){
        this.ID = 1;
    }
    generateID(){
        let current = this.ID;
        this.ID++;
        return current;
    }
    buildView(entities,edges,callback){
        var nodes = [];
        var links= [];
        entities.forEach(entity=>{
            nodes.push(this.entityToNode(entity));
        });
        edges.forEach(edge=>{
            var o = this.linkFromEdge(edge,nodes);
            nodes = o.nodes;
            links.push(o.link);
        });
        callback({links:links,nodes:nodes});
    }
    entityToNode(entity){
        return {id:this.generateID(),group:entities_map[entity.type],address:entity.address.toLowerCase(),ether:entity.ether,type:entity.type,outTX:entity.outTX};
    }
    linkFromEdge(edge,nodes){
        var from_address = edge.from;
        var to_address = edge.to;
        var o = this.idFromAddress(from_address,nodes);
        nodes = o.nodes;
        var from_id = o.id;
        o = this.idFromAddress(to_address,nodes);
        nodes = o.nodes;
        var to_id = o.id;
        var value = 0;
        if(edge.value <1)
            value = 1+edge.value;
        else if(edge.value > 500)
            value = 500;
        else
            value = edge.value;
        return {nodes:nodes,link:{source:from_id,target:to_id,value:value}};
    }
    idFromAddress(address,nodes){
        var found = false;
        var final = {};
        nodes.forEach(n=>{
            if(n.address == address){
                found = true;
                final= {id:n.id,nodes:nodes};
            }
        });
        if(!found){
            let id = this.generateID();
            nodes.push({id:id,group:entities_map['uUser'],address:address,ether:0,type:'uUser',outTX:0});
            return {id:id, nodes};
        }
        return final;
    }
}

 var temp_data = {
    "nodes": [
        {"id": "1", "group": 1,"address":"0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98"},
        {"id": "2", "group": 1,"address":"0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98"},
        {"id": "3", "group": 1,"address":"0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98"},
        {"id": "4", "group": 1,"address":"0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98"},
        {"id": "5", "group": 1,"address":"0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98"},
        {"id": "6", "group": 1,"address":"0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98"},
        {"id": "7", "group": 1,"address":"0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98"}
    ],
    "links": [
        {"source": "1", "target": "2", "value": 1},
        {"source": "2", "target": "3", "value": 8},
        {"source": "3", "target": "4", "value": 10},
        {"source": "4", "target": "5", "value": 6},
        {"source": "6", "target": "6", "value": 1},
        {"source": "2", "target": "5", "value": 1},
        {"source": "3", "target": "5", "value": 1},
        {"source": "1", "target": "3", "value": 1},
        {"source": "4", "target": "5", "value": 2},
        {"source": "1", "target": "7", "value": 1}
    ]
}

var data ={ nodes:
    [ { address: '0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98',
        type: 'exchange',
        ether: '743582.7228472139',
        outTX: 4716169,
        is_valid_address: true },
        { address: '0x32be343b94f860124dc4fee278fdcbd38c102d88',
            type: 'exchange',
            ether: '31598.34262231737',
            outTX: 1143087,
            is_valid_address: true },
        { address: '0x0607B0c8cF73D916b3EF1463bb6fB9f19e9D5D98',
            type: 'user',
            ether: '1.3511024323593201',
            outTX: 6,
            is_valid_address: true } ],
        edges:
    [ { from: '0x32be343b94f860124dc4fee278fdcbd38c102d88',
        to: '0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98',
        value: '0.0000000000000000049900000000000004',
        time: 'Invalid date',
        unixTime: undefined },
        { from: '0x32be343b94f860124dc4fee278fdcbd38c102d88',
            to: '0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98',
            value: '0.00000000000000007582800001000001',
            time: 'Invalid date',
            unixTime: undefined },
        { from: '0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98',
            to: '0x4fdaebe9eac15eb5bc0170f6a36f19eaed75d8ef',
            value: '0.000000000000000069',
            time: 'Invalid date',
            unixTime: undefined },
        { from: '0x32be343b94f860124dc4fee278fdcbd38c102d88',
            to: '0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98',
            value: '0.00000000000000006985000001',
            time: 'Invalid date',
            unixTime: undefined },
        { from: '0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98',
            to: '0xa1a111bc074c9cfa781f0c38e63bd51c91b8af00',
            value: '0.000000000000000069',
            time: 'Invalid date',
            unixTime: undefined },
        { from: '0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98',
            to: '0xa1a111bc074c9cfa781f0c38e63bd51c91b8af00',
            value: '0',
            time: 'Invalid date',
            unixTime: undefined },
        { from: '0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98',
            to: '0xa1a111bc074c9cfa781f0c38e63bd51c91b8af00',
            value: '0.000000000000000069',
            time: 'Invalid date',
            unixTime: undefined },
        { from: '0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98',
            to: '0xa1a111bc074c9cfa781f0c38e63bd51c91b8af00',
            value: '0',
            time: 'Invalid date',
            unixTime: undefined },
        { from: '0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98',
            to: '0xa1a111bc074c9cfa781f0c38e63bd51c91b8af00',
            value: '0.000000000000000069',
            time: 'Invalid date',
            unixTime: undefined } ] }
var clientParser = new ClientParser();

clientParser.buildView(data.nodes,data.edges,(res)=>{
    console.log(JSON.stringify(res.nodes,null,2));
    console.log(JSON.stringify(res.links,null,2));
});