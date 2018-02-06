var express = require('express');
var router = express.Router();
var path = require('path');
var Scanner = require('../logic/scanner/scanner');
var ExplorerUtils = require("../logic/scanner/utils");
var utils = new ExplorerUtils.ExplorerUtils();

var scanner = new Scanner.Scanner(10,1,500);

/* Scanner. */
router.get('/', function(req, res, next) {
    my_addr = '0x0607B0c8cF73D916b3EF1463bb6fB9f19e9D5D98';
    var address = my_addr;
    var direction = "to";
    scanner.one_level_graph({address:address,tx_direction:direction},(nodes,edges)=>{
        res.json({nodes:nodes,edges:edges});

    });
});

module.exports = router;
