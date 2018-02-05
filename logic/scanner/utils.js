/*Utils for the explorer */
class ExplorerUtils{
    async get_unique_address(addrs){
        return Array.from(new Set(addrs));
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
}


var addrs = ['1','2','3','1','2','3','5'];
var txs = [{from:'0x1',to:'0x2'},{from:'0x1',to:'0x2'},{from:'0x2',to:'0x1'},{from:'0x3',to:'0x2'}];

const utils = new ExplorerUtils();

utils.map_from_txs(txs).then(map=>{
    console.log(map);
});

