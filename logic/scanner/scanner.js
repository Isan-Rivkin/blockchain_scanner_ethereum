
API_KEY = '9EVWVAFQNS1UWXAAMTXSTHY599GYPAD4T1';
var explorer = require('../etherscan/explore')
var urlBuilder = new explorer.URLBuilder();
var accountExplorer = new explorer.AccountExplorer(urlBuilder,API_KEY);
var txExplorer = new explorer.TransactionExplorer(urlBuilder,API_KEY);
var contractExplorer = new explorer.ContractExplorer(urlBuilder,API_KEY);
var entityDefiner = new explorer.EntityDefiner(accountExplorer,txExplorer,contractExplorer);

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

