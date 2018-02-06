/*Utils for the explorer */
var moment =require('moment');
class ExplorerUtils{
     get_unique_address(addrs){
        return Array.from(new Set(addrs));
    }
    gweiToEther(gwei){
        return gwei/1000000000000000000;
    }
    async map_txns(origin,txns,callback){
        var _out = [];
        var _in =[];
        if(txns.length > 0) {
            txns.forEach(tx => {
                origin = origin.toLowerCase();
                var from = tx['from'].toLowerCase();
                var to = tx['to'].toLowerCase();
                var val = tx['value'] / 1000000000000000000; // to ether from gwei
                var time = moment.unix(tx.timeStamp).format("DD-MM-YYYY HH:mm:ss");
                if (from.toString().trim() == origin.toString().trim()) { //out
                    _out.push({
                        from: from,
                        to: to,
                        value: val,
                        time: time,
                        unixTime: tx['timeStamp']
                    })
                } else { // in
                    _in.push({
                        from: from,
                        to: to,
                        value: val,
                        time: time,
                        unixTime: tx['timeStamp']
                    })
                }
            });
            callback({out: _out, in: _in});
        }else{
            callback({empty:true});
        }
    }
    async map_from_txs(txs){
        var map = {};
        // key: addr, value: number,
        map.in = {};
        map.out = {};
        txs.forEach(tx=> {
            var from = tx.from.toLowerCase();
            var to = tx.to.toLowerCase();
            map = this.map_single_val(map,from);
            map = this.map_single_val(map,to);
        });
        return map;
    }
    map_single_val(map,addr){
        var empty = 'undefined';
        if(map.in[addr] == empty){
            map.in[addr] = 1;
        }else{
            map.in[addr] +=1;
        }
        if(map.out[addr] == empty){
            map.out[addr] =1
        }else{
            map.out[addr]=1;
        }
        return map;
    }
    printGraph(nodes,edges,unvisited_edges){
         console.log("==== nodes ==== ");
         nodes.forEach(n=>{
             console.log(n);
         });
         console.log( " ==== visited edges ====");
         edges.forEach(e=>{
             console.log(e);
         });
        if(unvisited_edges != null){
            console.log(" ==== un visited edges ==== ");
            unvisited_edges.forEach(unvisited=>{
                console.log(unvisited);
            });
        }
        console.log("nodes size= " + nodes.length);
         console.log("visited edges = " + edges.length);
         if(unvisited_edges!= null)
         console.log("unvisited edges = " + unvisited_edges.length);
    }
    getAddrsFromTXS(txns, direction){
         var outAddrs = [];
         if(txns.length>0){
            txns.forEach(tx=>{
                outAddrs.push(tx[direction]);
            })
         }
         return outAddrs;
    }
}

/*exports */

module.exports.ExplorerUtils = ExplorerUtils;
/*mini tests*/

var addrs = ['1','2','3','1','2','3','5'];
var txs = [{from:'0x1',to:'0x2'},{from:'0x1',to:'0x2'},{from:'0x2',to:'0x1'},{from:'0x3',to:'0x2'}];

const utils = new ExplorerUtils();
//console.log(utils.get_unique_address(addrs));
// utils.map_from_txs(txs).then(map=>{
//     console.log(map);
// });

