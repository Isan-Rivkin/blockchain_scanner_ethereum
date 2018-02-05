
/**********************************************************/
/********************* TESTS ******************************/
/**********************************************************/
API_KEY = '9EVWVAFQNS1UWXAAMTXSTHY599GYPAD4T1';
my_addr = '0x0607B0c8cF73D916b3EF1463bb6fB9f19e9D5D98';
omg_addr = '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07';
non_token = '0x7c2A856B4AeE9EDbC3A5Fdd1697C0B36bFa2131D';
some_miner = '0xea674fdde714fd979de3edf0f56aa9716b898ec8';

var explorer = require('./explore');
var urlBuilder = new explorer.URLBuilder();

/**********************************************************/
/******************** Account Explorer ********************/
/**********************************************************/

accountExplorer = new explorer.AccountExplorer(urlBuilder,API_KEY);
// get balance from one account
// accountExplorer.explore_acc_balance_from_addr(my_addr,(bal)=>{
//     console.log(bal);
// });
// get multiple balances (max 20 addrs)
// accountExplorer.explore_multiple_balances_from_addr([my_addr,omg_addr],(balances)=>{
//     console.log(balances);
// });
//list of sent transactions from a specific address
// accountExplorer.explore_sent_tx_num_addr(my_addr,(num)=>{
//     console.log(num);
// });
//get list of blocks that an address mined (is miner?)
// accountExplorer.get_blocks_mined_paginated(some_miner,1,15,(b)=>{
//     console.log(b);
// });

/**********************************************************/
/****************Transaction Explorer**********************/
/**********************************************************/

txExplorer = new explorer.TransactionExplorer(urlBuilder,API_KEY);

// explore list of transactions form an address
// txExplorer.explore_txs_from_addr_paginated(my_addr,1,15,null,(txList)=>{
//     console.log(txList);
// });


// check if some tx is confirmed (not really relevant)
// var tx = '0x0d8447bd5cd5fea23932332186d483016e298e9bceeefe7df4959de34693a8c4';
// var fake_tx = '0x0d8447bd5cd5fea23932332186d483016e238e9bceeefe7df4959de34693a8c4';
// txExplorer.explore_is_tx_confirmed(fake_tx,(tx,res)=>{
//     console.log(res);
// });



/**********************************************************/
/****************  Contract Explorer **********************/
/**********************************************************/

contractExplorer = new explorer.ContractExplorer(urlBuilder,API_KEY);

// define is a Token contract?
var kraken_wallet = '0xe853c56864a2ebe4576a807d26fdc4a0ada51919';
// contractExplorer.get_erc20_balance(non_token,(erc_balance)=>{
// 	console.log(erc_balance);
// });

// define is a contract
// contractExplorer.explore_internal_tx(non_token,1,5,(err,list)=>{
// 	console.log(list);
// });


/**********************************************************/
/********************* Entity Tests  **********************/
/**********************************************************/


/***************** Basic Classes demonstration ************/

entityDefiner = new explorer.EntityDefiner(accountExplorer,txExplorer,contractExplorer);

var tempAcc = entityDefiner.account();

// get balance from one account
// tempAcc.explore_acc_balance_from_addr(my_addr,(bal)=>{
//     console.log(bal);
// });

var tempContract = entityDefiner.contract();

// define is a Token contract?
// tempContract.get_erc20_balance(omg_addr,(erc_balance)=>{
// 	console.log(erc_balance);
// });

var tempTx = entityDefiner.transaction();

// explore list of transactions form an address
// tempTx.explore_txs_from_addr_paginated(my_addr,1,15,null,(txList)=>{
//     console.log(txList);
// });


/***************** Actual entities definitions ************/


// is some address a miner (result object with boolean)
// entityDefiner.is_miner(some_miner,(bool)=>{
// 	console.log(bool.is_miner);
// });

// is some address a contract of any kind (token or not token)
// entityDefiner.is_contract(omg_addr,(res_obj)=>{
// 	console.log(res_obj);
// });

// is some address a token erc20
// entityDefiner.is_token(omg_addr,(result)=>{
// 	console.log(result);
// });

// is addr is a contract - non token erc20
// entityDefiner.is_contract_not_token(non_token,(result)=>{
// 	console.log(result);
// });



/*
	BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG
	BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG
	BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG BUG
	On really big tx number like poloniex_wallet and bittrex returns null from general tx list explorer...

*/
var bittrex = '0xFBb1b73C4f0BDa4f67dcA266ce6Ef42f520fBB98';
var poloniex_wallet = '0x32Be343B94f860124dC4fEe278FDCBD38C102D88';
var poloniex_coldWallet = '0xb794F5eA0ba39494cE839613fffBA74279579268';

entityDefiner.is_exchange(poloniex_coldWallet,(result)=>{
    console.log(result);
});




