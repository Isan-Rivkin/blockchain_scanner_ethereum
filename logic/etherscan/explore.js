var request = require('request');
var moment = require('moment');

const verbose = true;

/**********************************************************/
/********************* PARAMS CONFIG  *********************/
/**********************************************************/



API_KEY = '9EVWVAFQNS1UWXAAMTXSTHY599GYPAD4T1';
my_addr = '0x0607B0c8cF73D916b3EF1463bb6fB9f19e9D5D98';
BASE_URL = 'http://api.etherscan.io/api?';

var EXCHANGE_COMMON_BALANCE = 30000; // high balance
var EXCHANGE_COMMON_TX = 100; // many txns
var DISTRIBUTER_COMMON_BALANCE = 10; // low balance
var DISTRIBUTER_COMMON_TX = 100; // many txns

module.exports.config = function(params){
    EXCHANGE_COMMON_TX = params.EXCHANGE_COMMON_TX;
    EXCHANGE_COMMON_BALANCE = params.EXCHANGE_COMMON_BALANCE;
    DISTRIBUTER_COMMON_BALANCE = params.DISTRIBUTER_COMMON_BALANCE;
    DISTRIBUTER_COMMON_TX = params.DISTRIBUTER_COMMON_TX;
};
/**********************************************************/
/********************* UTILS ******************************/
/**********************************************************/
class URLBuilder{
    txsFromAcc(addr){
        var url = BASE_URL + 'module=account&action=txlist&address='+addr+'&startblock=0&endblock=99999999&sort=asc&apikey='+API_KEY;
        return url;
    }
    balanceFromAcc(addr){
        var url=BASE_URL + 'module=account&action=balance&address='+addr+'&tag=latest&apikey='+API_KEY;
        return url;
    }
    multiple_balances_from_addr(addrs){
        var addr_str = '';
        var len = addrs.length;
        for(var i in addrs){
            if(i == len-1){
                addr_str+=addrs[i];
            }else{
                addr_str += addrs[i]+',';
            }
        }
        var url = BASE_URL+'module=account&action=balancemulti&address='+addr_str+'&tag=latest&apikey='+API_KEY;
        return url;
    }
    txs_from_acc_paginated(addr,page_num,max_records){
        var url = BASE_URL + 'module=account&action=txlist&address='+addr+'&startblock=0&endblock=99999999&page='+page_num+'&offset='+max_records+'&sort=asc&apikey='+API_KEY;
        return url;
    }
    mined_blocks_by_addr_paginated(addr,pages,max_records){
        var url = BASE_URL +'module=account&action=getminedblocks&address='+addr+'&blocktype=blocks&page='+pages+'&offset='+max_records+'&apikey='+API_KEY;
        return url;
    }
    is_tx_confirmed(txHash){
        var url = BASE_URL+'module=transaction&action=gettxreceiptstatus&txhash='+txHash+'&apikey='+API_KEY;
        return url;
    }
    erc20_total_supply(contract_addr){
        var url=BASE_URL + 'module=stats&action=tokensupply&contractaddress='+contract_addr+'&apikey='+API_KEY;
        return url;
    }
    addr_out_tx_num(addr){
        var url = BASE_URL + 'module=proxy&action=eth_getTransactionCount&address='+addr+'&tag=latest&apikey='+API_KEY;
        return url;
    }
    internal_tx_paginated(addr,pages,max_records){
        var url =BASE_URL+'module=account&action=txlistinternal&address='+addr+'&startblock=0&endblock=recent&page='+pages+'&offset='+max_records+'&sort=asc&apikey='+API_KEY;
        return url;
    }
};


function gweiToEther(gwei){
    return gwei/1000000000000000000;
}

function parseTXS(tx_list,next){
    for(tx in tx_list){
        tx_obj = tx_list[tx];
        tx_obj.eth_value = gweiToEther(tx_obj.value);
        tx_obj.dateTime = moment.unix(tx_obj.timeStamp).format("DD-MM-YYYY HH:mm:ss");
    }
    next(tx_list);
}



/**********************************************************/
/********************* LOGIC ******************************/
/**********************************************************/

class Types {
    constructor(){
        this.types = [];
        this.user = 'user';
        this.distributer = 'distribuer';
        this.erc20 = "erc20";
        this.contract_non_erc = "contract_non_erc";
        this.miner = 'miner';
        this.exchange = 'exchange';
        this.types.push(this.user,this.distributer,this.erc20,this.contract_non_erc,this.miner,this.exchange);
    }
    isType(entity) {
        return (this.types.indexOf(entity) > -1)
    }
}
function on_error(id,error){console.log("Error:",id,error)};
class Explorer{
    constructor(url_builder,API_KEY){
        this.url_builder = url_builder;
        this.API_KEY = API_KEY;
    }
}


class AccountExplorer extends Explorer{
    constructor(url_builder,API_KEY){
        super(url_builder,API_KEY);
    }
    get_blocks_mined(addr,next){
        request(this.url_builder.mined_blocks_by_addr(addr),(err,res,body)=>{
            if(err) {on_error("blocksMined",err);}
            try{
                var obj = JSON.parse(body).result;
                next(obj);
            }catch(e){
                if(verbose)
                    console.log("failed blocks mined");
            }

    });
    }
    get_blocks_mined_paginated(addr,page,max_records,next){
        request(this.url_builder.mined_blocks_by_addr_paginated(addr,page,max_records),(err,res,body)=>{
            if(err) {on_error("blocksMined",err);}
            try{
                var result = JSON.parse(body);
                result.result = result.result;
                result.entity_address = addr;
                if(result.result.length >0)
                    result.is_miner = true;
                else
                    result.is_miner = false;
                next(result);
            }catch(e){
                if(verbose)
                    if(verbose)
                    console.log("failed blocks mined paginated");
            }

    });
    }
    /*
    param: some addrress
    callback : attach account to tx

    */
    explore_acc_balance_from_addr(addr,next){
        request(this.url_builder.balanceFromAcc(addr),(err,res,body)=>{
            if(err) {on_error("exploreBalance",err);}
            try{
                var obj = JSON.parse(body);
                var wrapper = {};
                wrapper.gwei = obj.result;
                wrapper.address = addr;
                wrapper.ether = gweiToEther(wrapper.gwei);
                next(wrapper);
            }catch(e){
               // next(null);
                if(verbose)
                console.log("explore_acc_balance_from_addr error...");
            }
    });
    }
    /*
    multiple balances in a single call
    UP TO 20 AT A BATCH
    */
    explore_multiple_balances_from_addr(addrs,next){
        request(this.url_builder.multiple_balances_from_addr(addrs),(err,res,body)=>{
            if(err) {console.log("multplieAddrBal",err);}
            try{
                var obj = JSON.parse(body);
                obj = obj.result;
                obj.forEach(bal=>{
                    bal.ether = gweiToEther(bal.balance);
                });
                next(obj);
            }catch(e){
                if(verbose)
                    console.log("multiple balances error");
            }

    });
    }
    /*
    get the number of sent transactions from an address
    */
    explore_sent_tx_num_addr(addr,next){
        request(this.url_builder.addr_out_tx_num(addr),(err,res,body)=>{
            if(err) {console.log("### Error ###",err);}
            try{
                var obj ={};
                obj.num = parseInt(JSON.parse(body).result,16);
                obj.address=addr;
                next(obj);
            }catch(e){
                if(verbose)
                    console.log("send tx num addr err");
            }
    });
    }
}


class ContractExplorer extends Explorer{
    constructor(url_builder,API_KEY){
        super(url_builder,API_KEY);
    }
    get_erc20_balance(addr,next){
        request(this.url_builder.erc20_total_supply(addr),(err,res,body)=>{
            if(err) {on_error("erc20Balance",err);}
            try{
                var obj = JSON.parse(body);
                obj.address = addr;
                next(obj);
            }catch(e){
                if(verbose)
                    console.log("erc20 balance error");
            }
    });
    }
    /*
    get list of the internal transactions => only if contract
    */
    explore_internal_tx(addr,page,max_records,next){
        request(this.url_builder.internal_tx_paginated(addr,page,max_records),(err,res,body)=>{
            if(err){console.log("### Error ###",err);}
            try{
                var obj = JSON.parse(body).result;
                next(err,obj);
            }catch(e){
                if(verbose)
                    console.log(("failed internal txexplore"));
            }
    });
    }
}

class TransactionExplorer extends Explorer{
    constructor(url_builder,API_KEY){
        super(url_builder,API_KEY);
    }
    /*
    param: some address
    callback: list of txs related to that address
    */
    explore_tx_from_addr(addr,picker,next){
        request(this.url_builder.txsFromAcc(addr),(err,res,body)=>{
            if(err) {on_error("exploreTX",err);}
            var obj = JSON.parse(body)
            try{
                var tx_list = obj.result;
                if(picker != null) {
                    picker(tx_list,next);
                }else{
                    next(tx_list);
                }
            }catch(e){
                if(verbose)
                    console.log("failed to explore tx from addr");
            }
    });
    }
    /*
    To get paginated results use page=<page number> and offset=<max records to return>
    */
    explore_txs_from_addr_paginated(addr,page_num,max_records,picker,next){
        request(this.url_builder.txs_from_acc_paginated(addr,page_num,max_records),(err,res,body)=>{
            if(err) {on_error("exploreTxPaginated",err);}
            try{
                var result = JSON.parse(body).result;
                if(picker != null){
                    picker(addr,result,next);
                }else{
                    next(result);
                }
            }catch(e){
                if(verbose)
                    console.log("failed to txs from addr paginated");
            }
    });
    }
    /*
    true if txHash confirmed or false if not existing/pending
    */
    explore_is_tx_confirmed(txHash,next){
        request(this.url_builder.is_tx_confirmed(txHash),(err,res,body)=>{
            if(err) {console.log("### Error ###",err);}
            try{
                var o = JSON.parse(body);
                o = o.result.status;
                if(o=='1')
                    next(txHash,true);
                else
                    next(txHash,false);
            }catch(e){
                if(verbose)
                    console.log("failed to tx confirm");
            }
    });
    }
}

class EntityDefiner{
    constructor(AccountExplorer,TransactionExplorer,ContractExplorer){
        this.account_explorer = AccountExplorer;
        this.contract_explorer=ContractExplorer;
        this.transaction_explorer = TransactionExplorer;
        this._types = new Types();
    }
    types() {
        return this._types;
    }
    account(){
        return this.account_explorer;
    }
    contract(){
        return this.contract_explorer;
    }
    transaction(){
        return this.transaction_explorer;
    }
    async is_miner(addr,callback){
        this.account_explorer.get_blocks_mined_paginated(addr,1,2,callback);
    }
    async inRange(test_value,compared_value,delta){
        if(test_value <= (compared_value + delta) && test_value >= (compared_value - delta)){
            return true;
        }
        return true;
    }
    async is_distributer(addr,callback){
        var ether;
        this.is_miner(addr,(minerResult)=>{
            if(!minerResult.is_miner){// not miner
                this.account_explorer.explore_acc_balance_from_addr(addr,(result)=>{
                    var delta = 50;
                    if(this.inRange(result.ether,DISTRIBUTER_COMMON_BALANCE,delta)){ // balance in range
                        ether = result.ether;
                        this.account_explorer.explore_sent_tx_num_addr(addr,(sendTxNum)=>{
                            if(sendTxNum.num >= DISTRIBUTER_COMMON_TX){
                                callback({address:addr,ether: ether, sendTX: sendTxNum, is_distributer:true});
                            }else{
                                callback({address:addr,ether: ether, sendTX: sendTxNum, is_distributer:false});
                            }
                        })
                    }else{ // balance not in range
                        callback({address:addr,ether: result.ether ,is_distributer:false});
                    }
                })
            }else { // miner
                callback({address:addr,is_distributer:false});
            }
        })
    }
    /*
        if addr has balance > EXCHANGE_COMMON_BALANCE
        and tx count > EXCHANGE_COMMON_TX
    */
    async is_exchange(addr,callback){
        this.is_miner(addr,(minerResult)=>{
            if(!minerResult.is_miner){
            this.account_explorer.explore_acc_balance_from_addr(addr,(result)=>{
                if(result.ether >= EXCHANGE_COMMON_BALANCE){ // maybe -> big balance
                this.transaction_explorer.explore_txs_from_addr_paginated(addr,1,EXCHANGE_COMMON_TX,null,(res)=>{
                    if(res != null){
                    if(res.length >= EXCHANGE_COMMON_TX){ // many tx -> exchange
                        result.is_exchange = true;
                        result.txs = res.length;
                        callback(result);
                    }else{ // tx count too small -> not exchange
                        result.is_exchange = false;
                        callback(result);
                    }
                }else{
                    callback({'ERROR':'NUMBER OF TRANSACTIONS OF IS EXCHANGE = NULL','is_exchange':false});
                }
            });
            }else{ // balance too small
                result.is_exchange = false;
                callback(result);
            }
        });
        }else{
            callback({'address':addr, 'is_exchange':false});
        }
    });
    }
    // flag if someone is known
    async is_user(addr,callback){
        this.is_distributer(addr,(distributer)=>{
            if(!distributer.is_distributer){ // not distributer
                this.is_contract(addr,(ctrct)=>{
                    if(!ctrct.is_contract){ // not contract
                        this.is_miner(addr,(minerRes)=>{
                            if(!minerRes.is_miner){// not a miner
                                this.is_exchange(addr,(exchangeRes)=>{
                                    if(!exchangeRes.is_exchange){ // not exchange
                                        this.is_valid_address(addr,(res)=>{ // actuall address
                                            if(res.is_valid_address){ // user
                                                callback({address:addr, is_user: true});
                                            }else{ // not valid address
                                                callback({address:addr, is_user: false, resolved : null});
                                            }
                                        })
                                    }else{ // is exchange
                                        exchangeRes.resolved = this.types().exchange;
                                        exchangeRes.is_user = false;
                                        callback(exchangeRes);
                                    }
                                });
                            }else{ // a miner
                                minerRes.resolved = this.types().miner;
                                minerRes.is_user = false;
                                callback(minerRes);
                            }
                        })
                    }else{ // is contract
                        ctrct.resolved = this.types().contract_non_erc;
                        ctrct.is_user = false;
                        callback(ctrct);
                    }
                })
            }else{ // is distributer
                distributer.resolved= this.types().distributer;
                distributer.is_user = false;
                callback(distributer);
            }
        })
    }
    async is_contract(addr,callback){
        this.contract_explorer.explore_internal_tx(addr,1,2,(err,list)=>{
            var obj= {};
        obj.list = list;
        if(list.length >0){
            obj.is_contract = true;
        }else{
            obj.is_contract = false;
        }
        callback(obj);
    });
    }
    async is_token(addr,callback){
        this.contract_explorer.get_erc20_balance(addr,(result)=>{
            var obj = {};
        obj.result = result;
        if(result.result > 0 ){
            obj.is_token = true;
        }else{
            obj.is_token = false;
        }
        callback(obj);
    });
    }
    async is_contract_not_token(addr,callback){
        var obj = {};
        obj.addr = addr;
        this.is_contract(addr,(result)=>{ // if a contract
            if(result.is_contract){
            this.is_token(addr,(res)=>{
                if(res.is_token){ // contract buy token = false
                obj.is_contract_not_token = false;
            }else{ // contract and not token = true
                obj.is_contract_not_token = true;
            }
            callback(obj);
        });
        }else{ // not contract at all
            obj.is_contract_not_token = false;
            callback(obj);
        }
    });
    }
    async is_valid_address(addr,callback){
        this.account_explorer.explore_acc_balance_from_addr(addr,(balance)=>{
            if(balance == null || addr.length != 42)
                callback({address:addr, is_valid_address : false});
            else if(balance.ether != 0){
                callback({address:addr, is_valid_address : true});
            }else{
                this.transaction_explorer.explore_txs_from_addr_paginated(addr,1,1,null,(res)=>{
                    if(res.length > 0)
                        callback({address:addr, is_valid_address : true});
                    else
                        callback({address:addr, is_valid_address : false});
                });
            }
        })
    }
    async identify(addr,callback){
        this.is_valid_address(addr,(validAddr)=>{
            if(validAddr.is_valid_address){ //valid address
                this.is_miner(addr,(isMiner)=>{
                    if(isMiner.is_miner){ // is miner
                        this.parseEntity(addr,this.types().miner,(entity)=>{callback(entity)});
                    }else{ // not miner
                        /**/
                        this.is_exchange(addr,(isExchange)=>{
                            if(isExchange.is_exchange){ // is exchange
                                this.parseEntity(addr,this.types().exchange,(entity)=>{callback(entity)});
                            }else{ // not exchange
                                this.is_distributer(addr,isDist=>{
                                    if(isDist.is_distributer){ // is distributer
                                        this.parseEntity(addr,this.types().distributer,(entity)=>{callback(entity)});
                                    }else{ // not distributer
                                        this.is_contract(addr,isContract=>{
                                            if(isContract.is_contract){ // is contract
                                                this.is_token(addr,(isToken)=>{
                                                    if(isToken.is_token){ // is token
                                                        this.parseEntity(addr,this.types().erc20,(entity)=>{callback(entity)});
                                                    }else{ // not token
                                                        this.parseEntity(addr,this.types().contract_non_erc,(entity)=>{callback(entity)});
                                                    }
                                                });
                                            }else{ // not contract
                                                this.parseEntity(addr,this.types().user,(entity)=>{callback(entity)});
                                            }
                                        });

                                    }
                                });
                            }
                        });
                        /**/
                        // this.is_contract(addr,isContract=>{
                        //     if(isContract.is_contract){ // is contract
                        //         this.is_token(addr,(isToken)=>{
                        //             if(isToken.is_token){ // is token
                        //                 this.parseEntity(addr,this.types().erc20,(entity)=>{callback(entity)});
                        //             }else{ // not token
                        //                 this.parseEntity(addr,this.types().contract_non_erc,(entity)=>{callback(entity)});
                        //             }
                        //         });
                        //     }else{ // not contract
                        //         this.is_exchange(addr,(isExchange)=>{
                        //             if(isExchange.is_exchange){ // is exchange
                        //                 this.parseEntity(addr,this.types().exchange,(entity)=>{callback(entity)});
                        //             }else{ // not exchange
                        //                 this.is_distributer(addr,isDist=>{
                        //                     if(isDist.is_distributer){ // is distributer
                        //                         this.parseEntity(addr,this.types().distributer,(entity)=>{callback(entity)});
                        //                     }else{ // not distributer
                        //                         this.parseEntity(addr,this.types().user,(entity)=>{callback(entity)});
                        //                     }
                        //                 });
                        //             }
                        //         })
                        //     }
                        // });
                    }
                })
            }else{ // invalid address
                callback({address:addr, is_valid_address:false, type : null});
            }
        })
    }
    async parseEntity(addr,type,callback){
        var parsed = {};
        parsed.address = addr;
        parsed.type = type;
        this.account_explorer.explore_acc_balance_from_addr(addr,(balRes)=>{
            parsed.ether = balRes.ether;
            this.account_explorer.explore_sent_tx_num_addr(addr,sentTxRes=>{
                parsed.outTX = sentTxRes.num;
                parsed.is_valid_address = true;
                callback(parsed);
            })
        })
    }
}



/**********************************************************/
/********************* EXPORTS ****************************/
/**********************************************************/


module.exports.TransactionExplorer=TransactionExplorer;
module.exports.AccountExplorer = AccountExplorer;
module.exports.ContractExplorer = ContractExplorer;
module.exports.EntityDefiner = EntityDefiner;
module.exports.URLBuilder = URLBuilder;

